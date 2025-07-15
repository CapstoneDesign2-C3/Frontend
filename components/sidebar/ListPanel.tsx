"use client";

import { useState } from "react";
import ObjectSummarizeForm from "./object/ObjectSummarizeForm";
import EventSummarizeForm from "./object/EventSummarizeForm";
import detectedObjectStore from "@/store/detectedObjectStore";
import searchStore from "@/store/searchStore";
import mapStore from "@/store/mapStore";
import { DetectedObject, toLocalDateTimeString } from "@/utils/objectUtils";

function ListPanel() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handleCloseSidebar = () => {
    setSidebarOpen(false)
  };
  const detectedObjects = detectedObjectStore(state => state.detectedObjects);
  const selectedObject = detectedObjectStore(state => state.selectedObject);
  const setSelectedObject = detectedObjectStore(state => state.setSelectedObject);
  const selectedVideos = detectedObjectStore(state => state.selectedVideos);
  const setSelectedVideos = detectedObjectStore(state => state.setSelectedVideos);
  const dateRange = searchStore(state => state.dateRange);
  const setTracks = mapStore(state => state.setTracks);

  const handleObjectClick = (object: DetectedObject) => {
    setSelectedObject(object);
    setTracks(object.detectedObjectId, toLocalDateTimeString(dateRange[0]), toLocalDateTimeString(dateRange[1]));
    setSelectedVideos(object.detectedObjectId, toLocalDateTimeString(dateRange[0]), toLocalDateTimeString(dateRange[1]));
    setSidebarOpen(true);
  };

  return (
    <div className="flex overflow-y-auto"><div className="flex-1 space-y-2 w-[300px] p-4 h-full">
        {detectedObjects.map(obj => (
          <ObjectSummarizeForm
            key={obj.detectedObjectId}
            object={obj}
            handleObjectClick={() => handleObjectClick(obj)}
          />
        ))}

        {/* 사이드바 */}
        {sidebarOpen && (
          <div className="w-[300px] bg-white border-l shadow-lg absolute top-0 h-full z-50 flex flex-col right-[0px]">
            <button
              className="self-end m-2 px-3 py-1 bg-gray-200 rounded"
              onClick={handleCloseSidebar}
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
                ))
              }
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ListPanel;