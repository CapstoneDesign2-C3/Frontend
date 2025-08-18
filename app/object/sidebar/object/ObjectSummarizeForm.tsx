"use client"

import detectedObjectStore from "@/store/detectedObjectStore";
import { DetectedObject } from "@/utils/objectUtils";
import type React from "react";

interface ObjectFormProps {
  detectedObject: DetectedObject;
  handleObjectClick?: any;
}

function ObjectSummarizeForm({ detectedObject , handleObjectClick }: ObjectFormProps) {
    const fetchAlias = detectedObjectStore(state => state.fetchAlias);
    const handleEditClick = (e: any) => {
    e.stopPropagation();
    const newAlias = window.prompt("새로운 이름(alias)을 입력하세요.", detectedObject.alias ?? "");
    if (newAlias !== null && newAlias.trim() !== "") {
      fetchAlias(newAlias, detectedObject.detectedObjectId);
    }
  };

    return (
    <div onClick={() => handleObjectClick(detectedObject)} className="rounded" style={{
      background: 'var(--first-color)'
    }}>
      <div className="flex">
        <div className="flex-1 items-center mb-2">
          <div className="flex gap-2">
            <div className="font-semibold">{detectedObject.alias ?? "이름 없음"}</div>
            <button
              className="p-1 hover:bg-gray-100 rounded"
              style={{ lineHeight: 0 }}
              onClick={handleEditClick}
              type="button"
            >
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                <path d="M2 14.5V18h3.5l10.1-10.1-3.5-3.5L2 14.5zM17.7 6.3c.4-.4.4-1 0-1.4l-2.6-2.6c-.4-.4-1-.4-1.4 0l-1.8 1.8 3.5 3.5 1.8-1.8z" fill="#888"/>
              </svg>
            </button>
          </div>
          <div className="text-sm">{detectedObject.feature}</div>
          <div className="text-xs">{detectedObject.categoryName}</div>
        </div>
        <img src={`data:image/jpg;base64,${detectedObject.cropImg}`} alt={"crop"} className="w-12 h-24"/>
      </div>
    </div>
  );
}

export default ObjectSummarizeForm;