"use client";

import { useEffect, useState, useMemo } from "react";
import { Map, MapMarker, Polyline } from "react-kakao-maps-sdk";
import useKakaoLoader from "./useKakaoLoader";
import mapStore from "@/store/mapStore";

// 타입 정의
type CameraSummary = {
  id: number;
  latitude: number;
  longitude: number;
};

type Track = {
  detectionId: number;
  latitudeY: number;
  longitudeX: number;
};

type Point = {
  id: number;
  lat: number;
  lng: number;
  type: "camera" | "track";
};

interface KakaoMapProps {
  cameras?: CameraSummary[];
  onMarkerClick?: (cameraId: number) => void;
}

// 변환 함수: cameras/tracks → Point[]
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

// SVG 마커 생성 함수
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

// 거리 계산 함수
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

// 줌 레벨 계산 함수
function getMapLevelByDistance(maxDistance: number) {
  if (maxDistance > 50) return 12;
  if (maxDistance > 30) return 10;
  if (maxDistance > 20) return 9;
  if (maxDistance > 5) return 6;
  if (maxDistance > 1) return 2;
  return 1;
}

// KakaoMap 컴포넌트
function KakaoMap({ cameras = [], onMarkerClick }: KakaoMapProps) {
  useKakaoLoader();

  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);
  const tracks = mapStore(state => state.tracks);

  // 트랙/카메라 → 포인트 변환
  const [points, type] = useMemo(() => convertToPoint(cameras, tracks), [cameras, tracks]);

  // 위치 정보 가져오기
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

  // 중심 좌표 및 경계 계산
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

  const level = useMemo(
    () =>
      points && points.length > 0
        ? getMapLevelByDistance(
            haversine(leftTop.lat, leftTop.lng, rightBottom.lat, rightBottom.lng)
          )
        : 3,
    [points, leftTop, rightBottom]
  );

  return center ? (
    <Map
      key={`${center?.lat}-${center?.lng}-${level}`}
      id="map"
      center={center}
      level={level}
      className="w-full h-screen"
    >
      {/* 트랙 마커 */}
      {type === "track" &&
        points.map((point, idx) => (
          <MapMarker
            key={point.id}
            position={{ lat: point.lat, lng: point.lng }}
            image={{
              src: getMarkerSvgDataUrl(idx + 1),
              size: { width: 40, height: 54 },
              options: { offset: { x: 20, y: 54 } },
            }}
          />
        ))}

      {/* 카메라 마커 */}
      {type === "camera" &&
        points.map((point, idx) => (
          <MapMarker
            key={point.id}
            position={{ lat: point.lat, lng: point.lng }}
            image={{
              src: getMarkerSvgDataUrl(idx + 1),
              size: { width: 40, height: 54 },
              options: { offset: { x: 20, y: 54 } },
            }}
            clickable={true}
            onClick={() => onMarkerClick && onMarkerClick(point.id)}
          />
        ))}

      {/* 트랙 선 */}
      {type === "track" && points.length > 1 && (
        <Polyline
          path={points.map(p => ({ lat: p.lat, lng: p.lng }))}
          strokeWeight={4}
          strokeColor="#2563eb"
          strokeOpacity={0.9}
          strokeStyle="solid"
        />
      )}
    </Map>
  ) : (
    <div className="w-full h-screen flex items-center justify-center">
      위치 정보를 가져오는 중...
    </div>
  );
}

export default KakaoMap;
