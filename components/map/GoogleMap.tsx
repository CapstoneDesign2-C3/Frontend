"use client";

import { useEffect, useState, useMemo } from "react";
import { GoogleMap, Marker, Polyline, useJsApiLoader } from "@react-google-maps/api";
import mapStore from "@/store/mapStore";

// 타입 정의는 동일
type CameraSummary = { id: number; latitude: number; longitude: number; };
type Track = { detectionId: number; latitudeY: number; longitudeX: number; };
type Point = { id: number; lat: number; lng: number; type: "camera" | "track"; };
interface GoogleMapProps {
  cameras?: CameraSummary[];
  onMarkerClick?: (cameraId: number) => void;
}

// 변환 함수
function convertToPoint(
  cameras?: CameraSummary[],
  tracks?: Track[]
): [Point[], "camera" | "track" | null] {
  if (tracks && tracks.length > 0) {
    return [
      tracks.map(track => ({
        id: track.detectionId,
        lat: track.latitudeY,
        lng: track.longitudeX,
        type: "track",
      })),
      "track",
    ];
  }
  if (cameras && cameras.length > 0) {
    return [
      cameras.map(camera => ({
        id: camera.id,
        lat: camera.latitude,
        lng: camera.longitude,
        type: "camera",
      })),
      "camera",
    ];
  }
  return [[], null];
}

// SVG 마커 생성 함수 (구글맵 Marker의 icon에 url로 사용)
function getMarkerSvgDataUrl(number: number) {
  const svg = `
    <svg width="40" height="40" viewBox="0 0 40 54" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="20" cy="33" rx="16" ry="16" fill="#2563eb"/>
      <text x="20" y="40" text-anchor="middle" font-size="18" font-family="Arial" fill="#fff" font-weight="bold">${number}</text>
      <path d="M20 54C22.2091 54 24 52.2091 24 50H16C16 52.2091 17.7909 54 20 54Z" fill="#2563eb"/>
    </svg>
  `;
  return "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svg)));
}

// 거리, 줌레벨 함수 (구글맵은 zoom 1~20, level 변환 필요)
function haversine(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// 카카오맵 level → 구글맵 zoom 변환 (예시)
function getGoogleMapZoomByDistance(maxDistance: number) {
  if (maxDistance > 50) return 7;
  if (maxDistance > 30) return 9;
  if (maxDistance > 20) return 10;
  if (maxDistance > 5) return 11;
  if (maxDistance > 1) return 12;
  return 18;
}

// GoogleMap 컴포넌트
function MyGoogleMap({ cameras = [], onMarkerClick }: GoogleMapProps) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);
  const tracks = mapStore(state => state.tracks);

  const [points, type] = useMemo(() => convertToPoint(cameras, tracks), [cameras, tracks]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        () => {
          setPosition({
            lat: 37.4730459,
            lng: 127.1027386,
          });
        }
      );
    } else {
      setPosition({
        lat: 37.4730459,
        lng: 127.1027386,
      });
    }
  }, []);

  const minLat = useMemo(() => Math.min(...points.map(p => p.lat)), [points]);
  const maxLat = useMemo(() => Math.max(...points.map(p => p.lat)), [points]);
  const minLng = useMemo(() => Math.min(...points.map(p => p.lng)), [points]);
  const maxLng = useMemo(() => Math.max(...points.map(p => p.lng)), [points]);

  const leftTop = useMemo(() => ({ lat: maxLat, lng: minLng }), [maxLat, minLng]);
  const rightBottom = useMemo(() => ({ lat: minLat, lng: maxLng }), [minLat, maxLng]);

  const center = useMemo(
    () =>
      points && points.length > 0
        ? {
            lat: (leftTop.lat + rightBottom.lat) / 2,
            lng: (leftTop.lng + rightBottom.lng) / 2,
          }
        : position,
    [points, leftTop, rightBottom, position]
  );

  const zoom = useMemo(
    () =>
      points && points.length > 0
        ? getGoogleMapZoomByDistance(
            haversine(leftTop.lat, leftTop.lng, rightBottom.lat, rightBottom.lng)
          )
        : 14,
    [points, leftTop, rightBottom]
  );

  if (!isLoaded || !center) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        위치 정보를 가져오는 중...
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerClassName="w-full h-screen"
      center={center}
      zoom={zoom}
      options={{ streetViewControl: false, mapTypeControl: false }}
    >
      {type === "track" &&
        points.map((point, idx) => (
          <Marker
            key={point.id}
            position={{ lat: point.lat, lng: point.lng }}
            icon={{
              url: getMarkerSvgDataUrl(idx + 1),
              scaledSize: new window.google.maps.Size(40, 54),
              anchor: new window.google.maps.Point(20, 54),
            }}
          />
        ))}

      {type === "camera" &&
        points.map((point, idx) => (
          <Marker
            key={point.id}
            position={{ lat: point.lat, lng: point.lng }}
            icon={{
              url: getMarkerSvgDataUrl(idx + 1),
              scaledSize: new window.google.maps.Size(40, 54),
              anchor: new window.google.maps.Point(20, 54),
            }}
            onClick={() => onMarkerClick && onMarkerClick(point.id)}
          />
        ))}

      {type === "track" && points.length > 1 && (
        <Polyline
          path={points.map(p => ({ lat: p.lat, lng: p.lng }))}
          options={{
            strokeColor: "#2563eb",
            strokeOpacity: 0.9,
            strokeWeight: 4,
          }}
        />
      )}
    </GoogleMap>
  );
}

export default MyGoogleMap;
