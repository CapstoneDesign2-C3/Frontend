import { useKakaoLoader as useKakaoLoaderOrigin } from "react-kakao-maps-sdk"

export default function useKakaoLoader() {
  const appkey = process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY;
  if (!appkey) {
    throw new Error("카카오맵 API 키가 설정되어 있지 않습니다.");
  }
  useKakaoLoaderOrigin({
    /** 
     * ※주의※ appkey의 경우 본인의 appkey를 사용하셔야 합니다.
     * 해당 키는 docs를 위해 발급된 키 이므로, 임의로 사용하셔서는 안됩니다.
     * 
     * @참고 https://apis.map.kakao.com/web/guide/
     */
    appkey: appkey,
    libraries: ["clusterer", "drawing", "services"],
  })
}