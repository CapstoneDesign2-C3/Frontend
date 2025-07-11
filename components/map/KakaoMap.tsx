import { useEffect, useState } from "react";
import { Map, MapMarker, Polyline } from "react-kakao-maps-sdk";
import useKakaoLoader from "./useKakaoLoader";

type CameraSummary = {
  "id": number,
  "latitude": number,
  "longitude": number
};

type VideoSummary = {
  videoId: number;
  thumbnailUrl: string;
  startTime: string;
  endTime: string;
};

type Track = {
  videoId: number,
  latitudeY: number,
  longitudeX: number
}

interface KakaoMapProps {
  tracks?: Track[];
  cameras?: CameraSummary[] | null;
  onMarkerClick?: (camera: any) => void;
}

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

function haversine(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;
  const toRad = (deg: number) => deg * Math.PI / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat/2) ** 2 +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon/2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

function getMapLevelByDistance(maxDistance: number) {
  if (maxDistance > 50) return 12;
  if (maxDistance > 30) return 10;
  if (maxDistance > 20) return 9;
  if (maxDistance > 5) return 6;
  if (maxDistance > 1) return 2;
  return 1;
}

function KakaoMap({ tracks = [], cameras = [], onMarkerClick }: KakaoMapProps) {
  useKakaoLoader();

  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);
  
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

  const path = tracks.map(e => ({ lat: e.latitudeY, lng: e.longitudeX }));

  const minLat = Math.min(...path.map(p => p.lat));
  const maxLat = Math.max(...path.map(p => p.lat));
  const minLng = Math.min(...path.map(p => p.lng));
  const maxLng = Math.max(...path.map(p => p.lng));

  const leftTop = { lat: maxLat, lng: minLng };
  const rightBottom = { lat: minLat, lng: maxLng };

  const center =
    tracks && tracks.length > 0
      ? {
          lat: (leftTop.lat + rightBottom.lat) / 2,
          lng: (leftTop.lng + rightBottom.lng) / 2,
        }
      : position;

  const level = tracks && tracks.length > 0
      ? getMapLevelByDistance(haversine(leftTop.lat, leftTop.lng, rightBottom.lat, rightBottom.lng))
      : 3;

  return center ? (
    <Map
      id="map"
      center={center}
      level={level}
      className="w-full h-screen"
    >
      {/* 이벤트 마커 표시 */}
      {tracks.map((track, idx) => (
        <MapMarker
          key={track.videoId}
          position={{ lat: track.latitudeY, lng: track.longitudeX }}
          image={{
            src: getMarkerSvgDataUrl(idx + 1),
            size: { width: 40, height: 54 },
            options: { offset: { x: 20, y: 54 } }
          }}
        />
      ))}

      {/* 카메라 마커 표시 */}
      {cameras && cameras.map((camera, idx) => (
        <MapMarker
          key={camera.id}
          position={{ lat: camera.latitude, lng: camera.longitude }}
          image={{
            src: getMarkerSvgDataUrl(idx + 1),
            size: { width: 40, height: 54 },
            options: { offset: { x: 20, y: 54 } }
          }}
          clickable={true}
          onClick={() => onMarkerClick && onMarkerClick(camera.id)}
        />
      ))}

      {/* 폴리라인(직선) 표시 */}
      {path.length > 1 && tracks.length > 1 && (
        <Polyline
          path={path}
          strokeWeight={4}
          strokeColor="#2563eb"
          strokeOpacity={0.9}
          strokeStyle="solid"
        />
      )}
    </Map>
  ) : (
    <div className="w-full h-screen flex items-center justify-center">위치 정보를 가져오는 중...</div>
  );
}

export default KakaoMap;