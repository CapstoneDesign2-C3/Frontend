
import { Video } from "@/utils/eventUtils";
import axios from "axios";
import { useEffect, useState } from "react";


interface EventDetailFormProps {
  videoId: number;
}

function EventDetailForm({videoId}: EventDetailFormProps) {
  const [video, setVideo] = useState<Video>();

  useEffect(() => {
    async () => {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        const response = await axios.get(
          `${backendUrl}/api/v1/video/event`,
        {
          params: {
            fixedObjectId: videoId
          }
        }
        );
        setVideo(response.data);
      } catch (error) {
        console.error("비디오 데이터를 불러오지 못했습니다.", error);
      }
    };
  }, []);

  if (!video) return <div>로딩 중...</div>;
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">{video.eventCodeName}</h2>
      <div className="flex flex-col items-center justify-center text-center">
        <video
          src={video?.videoUrl}
          controls
          autoPlay
          className="w-200 h-80 rounded mb-2 bg-black"/>
      </div>
    </div>
  );
}

export default EventDetailForm;