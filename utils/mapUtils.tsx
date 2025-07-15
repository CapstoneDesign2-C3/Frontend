type CameraSummary = { id: number; latitude: number; longitude: number; };
type Track = { detectionId: number; latitudeY: number; longitudeX: number; };
export type Point = { id: number; lat: number; lng: number; type: "camera" | "track"; };

export function convertToPoint(cameras?: CameraSummary[],tracks?: Track[]): [Point[], "camera" | "track" | null] {
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


export function getMarkerSvgDataUrl(number: number) {
  const svg = `
    <svg width="40" height="40" viewBox="0 0 40 54" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="20" cy="33" rx="16" ry="16" fill="#2563eb"/>
      <text x="20" y="40" text-anchor="middle" font-size="18" font-family="Arial" fill="#fff" font-weight="bold">${number}</text>
      <path d="M20 54C22.2091 54 24 52.2091 24 50H16C16 52.2091 17.7909 54 20 54Z" fill="#2563eb"/>
    </svg>
  `;
  return "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svg)));
}


export function haversine(lat1: number, lon1: number, lat2: number, lon2: number) {
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


export function getGoogleMapZoomByDistance(maxDistance: number) {
  if (maxDistance > 50) return 7;
  if (maxDistance > 30) return 9;
  if (maxDistance > 20) return 10;
  if (maxDistance > 5) return 11;
  if (maxDistance > 1) return 12;
  return 18;
}