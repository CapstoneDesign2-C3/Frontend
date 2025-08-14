import { Video } from "@/utils/eventUtils";
import axios from "axios";
import { useEffect, useState } from "react";


interface EventDetailFormProps {
  eventId: number;
}

function EventDetailForm({eventId}: EventDetailFormProps) {
  const [video, setVideo] = useState<Video>();

  useEffect(() => {
  (async () => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const response = await axios.get(
        `${backendUrl}/api/v1/video/event`,
        {
          params: {
            eventId
          }
        }
      );
      console.log(response);
      setVideo(response.data);
    } catch (error) {
      console.error("비디오 데이터를 불러오지 못했습니다.", error);
    }
  })();
}, []);


  if (!video) return <div>로딩 중...</div>;
  return (
    <div className="white-component">
      <h2 className="text-xl font-semibold mb-2">{video.eventCodeName}</h2>
      <div className="flex flex-col items-center justify-center text-center">
        <video
          src={video?.videoUrl}
          controls
          autoPlay
          className="w-200 h-80 rounded mb-2 bg-black"/>
      </div>
      <div className="text-sm font-semibold">시작 시간 | {video.appearedTime}</div>
      <div className="text-sm font-semibold">종료 시간 | {video.exitTime}</div>
      <div className="text-sm">uuid : {video.eventUUID}</div>
      <div className="text-sm">위험 등급 : {video.eventRisk}</div>
      <div className="border w-full min-h-[100px]">
        <div className="text-m font-bold">상황 요약</div>
        <div className="text-sm">{video.summary}</div>
      </div>
    </div>
  );
}

export default EventDetailForm;