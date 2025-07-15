"use client";

import { useEffect, useState } from "react";
import ObjectSummarizeForm from "./object/ObjectSummarizeForm";
import EventSummarizeForm from "./object/EventSummarizeForm";
import detectedObjectStore from "@/store/detectedObjectStore";
import searchStore from "@/store/searchStore";
import mapStore from "@/store/mapStore";
import { DetectedObject, toLocalDateTimeString } from "@/utils/objectUtils";

function ListPanel() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const detectedObjects = detectedObjectStore((state) => state.detectedObjects);
  const page = detectedObjectStore((state) => state.page);
  const hasNext = detectedObjectStore((state) => state.hasNext);
  const isLoading = detectedObjectStore((state) => state.isLoading);
  const fetchDetectedObjects = detectedObjectStore((state) => state.fetchDetectedObjects);

  const selectedObject = detectedObjectStore((state) => state.selectedObject);
  const setSelectedObject = detectedObjectStore((state) => state.setSelectedObject);
  const selectedVideos = detectedObjectStore((state) => state.selectedVideos);
  const setSelectedVideos = detectedObjectStore((state) => state.setSelectedVideos);

  const dateRange = searchStore((state) => state.dateRange);
  const setTracks = mapStore((state) => state.setTracks);

  const handleObjectClick = (object: DetectedObject) => {
    setSelectedObject(object);
    setTracks(
      object.detectedObjectId,
      toLocalDateTimeString(dateRange[0]),
      toLocalDateTimeString(dateRange[1])
    );
    setSelectedVideos(
      object.detectedObjectId,
      toLocalDateTimeString(dateRange[0]),
      toLocalDateTimeString(dateRange[1])
    );
    setSidebarOpen(true);
  };

  const handlePrevPage = () => {
    if (page > 0) {
      fetchDetectedObjects(page - 1, 5);
    }
  };

  const handleNextPage = () => {
    if (hasNext) {
      fetchDetectedObjects(page + 1, 5);
    }
  };

  useEffect(() => {
    fetchDetectedObjects(0, 5);
  }, []);

  return (
    <div className="flex h-[calc(100vh-80px)] overflow-y-auto relative">
      <div className="flex-1 space-y-2 w-[300px] p-4 h-full">
        {detectedObjects.map((obj) => (
          <ObjectSummarizeForm
            key={obj.detectedObjectId}
            object={obj}
            handleObjectClick={() => handleObjectClick(obj)}
          />
        ))}

        {isLoading && (
          <div className="text-center text-gray-400 text-sm py-2">불러오는 중...</div>
        )}

        <div className="flex justify-between mt-4">
          <button
            onClick={handlePrevPage}
            disabled={page === 0 || isLoading}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            이전
          </button>
          <span className="text-sm text-gray-600">페이지 {page + 1}</span>
          <button
            onClick={handleNextPage}
            disabled={!hasNext || isLoading}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            다음
          </button>
        </div>

        {sidebarOpen && (
          <div className="w-[300px] bg-white border-l shadow-lg absolute top-0 h-full z-50 flex flex-col right-0">
            <button
              className="self-end m-2 px-3 py-1 bg-gray-200 rounded"
              onClick={() => setSidebarOpen(false)}
            >
              닫기
            </button>
            <div className="flex-1 overflow-y-auto p-4">
              <h2 className="font-bold text-lg mb-4">
                {selectedObject?.alias ?? "이름 없음"}의 이벤트 목록
              </h2>
              {selectedObject &&
                selectedVideos.map((video, idx) => (
                  <EventSummarizeForm key={video.detectionId} video={video} idx={idx + 1} />
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ListPanel;
