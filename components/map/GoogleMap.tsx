"use client";

import { useEffect, useState } from "react";
import { GoogleMap, Marker, Polyline, useJsApiLoader } from "@react-google-maps/api";
import mapStore from "@/store/mapStore";
import {
  convertToPoint,
  getGoogleMapZoomByDistance,
  getMarkerSvgDataUrl,
  haversine,
} from "@/utils/mapUtils";

interface GoogleMapProps {
  onMarkerClick?: (cameraId: number) => void;
}

function MyGoogleMap({ onMarkerClick }: GoogleMapProps) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);
  const tracks = mapStore((state) => state.tracks);
  const cameras = mapStore((state) => state.cameras);
  const isLoadingTracks = mapStore((state) => state.isLoadingTracks);
  const [points, type] = convertToPoint(cameras, tracks);

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

  const minLat = Math.min(...points.map((p) => p.lat));
  const maxLat = Math.max(...points.map((p) => p.lat));
  const minLng = Math.min(...points.map((p) => p.lng));
  const maxLng = Math.max(...points.map((p) => p.lng));

  const leftTop = { lat: maxLat, lng: minLng };
  const rightBottom = { lat: minLat, lng: maxLng };

  const center =
    points.length > 0
      ? {
          lat: (leftTop.lat + rightBottom.lat) / 2,
          lng: (leftTop.lng + rightBottom.lng) / 2,
        }
      : position;

  const zoom =
    points.length > 0
      ? getGoogleMapZoomByDistance(
          haversine(leftTop.lat, leftTop.lng, rightBottom.lat, rightBottom.lng)
        )
      : 14;

  if (!isLoaded || !center) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        위치 정보를 가져오는 중...
      </div>
    );
  }

  if (isLoadingTracks) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        트랙 정보를 불러오는 중...
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerClassName="w-full h-full"
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
            onClick={() => onMarkerClick?.(point.id)}
          />
        ))}

      {type === "track" && points.length > 1 && (
        <Polyline
          path={points.map((p) => ({ lat: p.lat, lng: p.lng }))}
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
