"use client";

import { useRouter } from "next/navigation";

interface EventFormPros {
  video: VideoSummary;
}

type VideoSummary = {
  videoId: number;
  thumbnailUrl: string;
  startTime: string;
  endTime: string;
};

function VideoForm({ video }: EventFormPros) {
  const router = useRouter();

  const handleMoveToPage = () => {
    router.push(`/video/${video.videoId}`); 
  };

  return (
    <>
      <div
        key={video.videoId}
        className="flex flex-col border rounded-lg shadow-sm p-3 bg-gray-50 cursor-pointer"
        onClick={handleMoveToPage}
      >
        <img src={video.thumbnailUrl} alt="로딩 실패" className="w-full h-28 object-cover rounded mb-2" />
        <div className="text-xs text-gray-400 mt-1">시작 시간 : {video.startTime}</div>
        <div className="text-xs text-gray-400 mt-1">종료 시간 : {video.endTime}</div>
      </div>
    </>
  );
}
export default VideoForm;
