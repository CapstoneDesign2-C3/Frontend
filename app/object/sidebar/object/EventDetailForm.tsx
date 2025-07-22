import { Video, VideoDetail } from "@/utils/videoUtil";
import axios from "axios";
import { useEffect, useState } from "react";


interface EventDetailFormProps {
  video: Video;
}

function EventDetailForm({video}: EventDetailFormProps) {
  const [videoDetail, setVideoDetail] = useState<VideoDetail>();

  useEffect(() => {
    const fetchVideoDetail = async () => {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        const response = await axios.get(
          `${backendUrl}/api/v1/video/mobile-detection`,
        {
          params: {
            mobileDetectionId: video.detectionId
          }
        }
        );
        setVideoDetail(response.data);
      } catch (error) {
        console.error("비디오 세부 정보 데이터를 불러오지 못했습니다.", error);
      }
    };

    if (video && video.detectionId) {
      fetchVideoDetail();
    }
  }, [video]);

  if (!videoDetail) return <div>로딩 중...</div>;
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">{video.cameraScenery}</h2>
      <div className="flex flex-col items-center justify-center text-center">
        <video
          src={videoDetail?.videoUrl}
          controls
          autoPlay
          className="w-200 h-80 rounded mb-2 bg-black"/>
      </div>
      {videoDetail && (<div>
        <h2 className="text-l mb-2">{videoDetail.detectedObjectAlias ?? "이름 없음"}</h2>
          <div className="flex">
            <div>
              <img src={videoDetail.detectedObjectCropUrl} alt={videoDetail.detectedObjectAlias ?? "이름 없음"} className="w-[100px] h-[100px] object-cover rounded mb-2" />
              <h2 className="text-xs mb-2">출현 | {video.appearedTime}</h2>
              <h2 className="text-xs mb-2">퇴장 | {video.exitTime}</h2>
            </div>
            <div className="w-full">
              <h2 className="text-s font-semibold mb-2">상황 요약</h2>
              <div className="border rounded bg-white p-4 max-h-[20%] w-full text-sm mb-2 flex overflow-y-auto">
                {videoDetail?.feature}
              </div>
              <h2 className="text-xs mb-2">클래스 | {videoDetail.categoryName}</h2>
              <h2 className="text-xs mb-2">특징 | {videoDetail.feature}</h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EventDetailForm;