"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import ObjectSummarizeForm from "../../../components/sidebar/object/ObjectSummarizeForm";
import selectedVideoStore from "@/store/selectedVideoStore";

function VideoDetailPage() {
  const params = useParams();
  const router = useRouter();
  const idParam = params.id;
  const { video, loading, error, fetchVideo } = selectedVideoStore();

  useEffect(() => {
    if (idParam !== undefined) {
      const id = Number(idParam);
      fetchVideo(id);
      console.log(video);
    }
  }, [idParam, fetchVideo]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!video) return <div>비디오 정보가 없습니다. 잠시만 기다려주세요.</div>;

  return (
    <div className="flex p-6">
      {/* 왼쪽: 영상/상황 요약 */}
      <div className="w-[80%] p-4 overflow-hidden">
        <div className="flex flex-col gap-2 w-full h-full">
          <video
            src={video.videoUrl}
            controls
            autoPlay
            className="rounded mb-2 bg-black"
          />
          <div className="flex w-full justify-between items-center">
            <h2 className="whitespace-nowrap">{video.cameraScenery}</h2>
            <div className="text-right">
              <h2 className="text-xs mb-2">위도 | {video.latitude}</h2>
              <h2 className="text-xs mb-2">경도 | {video.longitude}</h2>
            </div>
          </div>
        </div>
      </div>
      {/* 오른쪽: 객체 메뉴 */}
      <div className="w-[20%] h-full p-4 border-l flex flex-col">
        <button
          className="mb-4 text-sm text-blue-600 hover:underline self-start flex items-center gap-1"
          onClick={() => router.back()}
        >
          <span aria-hidden="true">←</span> 이전 페이지
        </button>
        <h2 className="text-xl text-center mb-4">객체 메뉴</h2>
        <div className="flex-1 max-h-screen overflow-y-auto">
          {video.detectedObjects && video.detectedObjects.length > 0 ? (
            video.detectedObjects.map((obj, idx) => (
              <ObjectSummarizeForm key={idx} object={obj} />
            ))
          ) : (
            <div className="text-gray-400 text-center py-4">감지된 객체가 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VideoDetailPage;
