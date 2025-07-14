import { useJsApiLoader } from "@react-google-maps/api";

export default function useKakaoLoader() {
  const appkey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;
  if (!appkey) {
    throw new Error("구글맵 API 키가 설정되어 있지 않습니다.");
  }
  useJsApiLoader({
  googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!, // 환경변수에 키 저장
});

}