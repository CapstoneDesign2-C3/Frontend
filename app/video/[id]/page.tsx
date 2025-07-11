"use client";

import { useParams, useRouter } from "next/navigation";
import axios from 'axios';
import { useEffect, useState } from "react";
import ObjectSummarizeForm from "../../components/sidebar/object/ObjectSummarizeForm";
import { mock_video } from "../../components/mock/MockData";

type detectedObject = {
  detectedObjectId: number;
  categoryName: string;
  cropImgUrl: string;
  alias?: string | null;
  feature: string;
};

type Video = {
  videoUrl: string;
  cameraScenery: string;
  latitude: number;
  longitude: number;
  summary: string;
  detectedObjects: detectedObject[];
};

function VideoDetailPage() {
  const params = useParams();
  const id = params.id; // string | undefined
  const router = useRouter();

  const [video, setVideo] = useState<Video>(mock_video);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        setError(null);
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL; // 환경변수도 NEXT_PUBLIC_ 접두사 사용
        const response = await axios.get<Video>(`${backendUrl}/api/v1/video/${id}`);
        setVideo(response.data);
      } catch (e) {
        setError("데이터를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchEvent();
  }, [id]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;
  if (!video) return <div>이벤트 정보가 없습니다.</div>;

  return (
    <div className="flex p-6">
      {/* 왼쪽: 영상/상황 요약 */}
      <div className="w-[80%] p-4 overflow-hidden">
        <div className="flex flex-col gap-2 w-full h-full">
          <video
            src={video.videoUrl}
            controls
            autoPlay
            className="w-full h-80 rounded mb-2 bg-black"
          />
          <div className="flex w-full justify-between items-center">
            <h2 className="whitespace-nowrap">{video.cameraScenery}</h2>
            <div className="text-right">
              <h2 className="text-xs mb-2">위도 | {video.latitude}</h2>
              <h2 className="text-xs mb-2">경도 | {video.longitude}</h2>
            </div>
          </div>
          <h2 className="text-xl mt-4">상황 요약</h2>
          <div className="min-h-[70px] max-h-full w-full border">
            {video.summary}
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
            video.detectedObjects.map((obj) => (
              <ObjectSummarizeForm key={obj.detectedObjectId} object={obj} />
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
