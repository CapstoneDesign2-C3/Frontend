import axios from "axios";
import { useEffect, useState } from "react";

type Video = {
  videoId: number;
  summary: string;
  appearedTime: string;
  exitTime: string;
  thumbnailUrl: string;
};

type VideoDetail = {
  videoUrl: string,
  cameraScenery: string,
  latitude: number,
  longitude: number,
  summary: string
};

type Object = {
  detectedObjectId: number,
  categoryName: string,
  cropImgUrl: string,
  alias?: string | null,
  feature: string
};

interface EventDetailFormProps {
  video: Video;
  object?: Object;
}

function EventDetailForm({video, object}: EventDetailFormProps) {
  const [videoDetail, setVideoDetail] = useState<VideoDetail>();

  useEffect(() => {
    const fetchVideoDetail = async () => {
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        const response = await axios.get(
          `${backendUrl}/api/v1/video/${video.videoId}`
        );
        setVideoDetail(response.data);
      } catch (error) {
        console.error("비디오 세부 정보 데이터를 불러오지 못했습니다.", error);
      }
    };

    if (video && video.videoId) {
      fetchVideoDetail();
    }
  }, [video]);

  // 렌더링 예시
  if (!videoDetail) return <div>로딩 중...</div>;
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">{videoDetail?.cameraScenery}</h2>
      <div className="flex flex-col items-center justify-center text-center">
        <video
          src={videoDetail?.videoUrl}
          controls
          autoPlay
          className="w-200 h-80 rounded mb-2 bg-black"/>
      </div>
      {object && (<div>
        <h2 className="text-l mb-2">{object.alias ?? "이름 없음"}</h2>
          <div className="flex">
            <div>
              <img src={object.cropImgUrl} alt={object.alias ?? "이름 없음"} className="w-[100px] h-[100px] object-cover rounded mb-2" />
              <h2 className="text-xs mb-2">출현 | {video.appearedTime}</h2>
              <h2 className="text-xs mb-2">퇴장 | {video.exitTime}</h2>
            </div>
            <div className="w-full">
              <h2 className="text-s font-semibold mb-2">상황 요약</h2>
              <div className="border rounded bg-white p-4 max-h-[20%] w-full text-sm mb-2 flex overflow-y-auto">
                {videoDetail?.summary}
              </div>
              <h2 className="text-xs mb-2">클래스 | {object.categoryName}</h2>
              <h2 className="text-xs mb-2">특징 | {object.feature}</h2>
            </div>
          </div>
        </div>
      )}
      {!object && (
        <div className="h-full w-full max-h-[80vh]">
          <div className="flex justify-between items-center">
            <h2 className="text-s font-semibold mb-2">{video.appearedTime}</h2>
            <h2 className="text-xs mb-2">{video.exitTime}</h2>
          </div>
          <div className="border rounded bg-white p-4 w-full text-sm mb-2 overflow-y-auto max-h-40">
            {videoDetail?.summary}
          </div>
        </div>
      )}
    </div>
  );
}

export default EventDetailForm;