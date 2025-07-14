"use client";

import { useEffect, useState } from "react";
import ObjectSummarizeForm from "./object/ObjectSummarizeForm";
import EventSummarizeForm from "./object/EventSummarizeForm";
import detectedObjectStore from "@/store/detectedObjectStore";
import searchStore from "@/store/searchStore";
import mapStore from "@/store/mapStore";

function toLocalDateTimeString(date: Date | null): string {
  if (!date) return "";
  const yyyy = date.getFullYear();
  const MM = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const hh = String(date.getHours()).padStart(2, '0');
  const mm = String(date.getMinutes()).padStart(2, '0');
  const ss = String(date.getSeconds()).padStart(2, '0');
  return `${yyyy}-${MM}-${dd}T${hh}:${mm}:${ss}`;
}


type Object = {
  detectedObjectId: number,
  categoryName: string,
  cropImgUrl: string,
  alias: string | null,
  feature: string
};

function ListPanel() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handleCloseSidebar = () => setSidebarOpen(false);
  const detectedObjects = detectedObjectStore(state => state.detectedObjects);
  const fetchDetectedObjects = detectedObjectStore(state => state.fetchDetectedObjects);
  const selectedObject = detectedObjectStore(state => state.selectedObject);
  const setSelectedObject = detectedObjectStore(state => state.setSelectedObject);
  const selectedVideos = detectedObjectStore(state => state.selectedVideos);
  const setSelectedVideos = detectedObjectStore(state => state.setSelectedVideos);
  const dateRange = searchStore(state => state.dateRange);
  const setTracks = mapStore(state => state.setTracks);

  const handleObjectClick = async (object: Object) => {
    setSelectedObject(object);
    setSelectedVideos(object.detectedObjectId, toLocalDateTimeString(dateRange[0]), toLocalDateTimeString(dateRange[1]));
    setSidebarOpen(true);
    selectedObject && setTracks(selectedObject.detectedObjectId, toLocalDateTimeString(dateRange[0]), toLocalDateTimeString(dateRange[1]));
  };

  useEffect(() => {
  fetchDetectedObjects();
  }, []);

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