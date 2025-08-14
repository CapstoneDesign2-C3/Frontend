import { DetectedObject } from "@/utils/objectUtils";
import type React from "react";

interface ObjectFormProps {
  detectedObject: DetectedObject;
  handleObjectClick?: any;
}

function ObjectSummarizeForm({ detectedObject , handleObjectClick }: ObjectFormProps) {
    return (
    <div onClick={() => handleObjectClick(detectedObject)} className="rounded" style={{
      background: 'var(--first-color)'
    }}>
      <div className="flex">
        <div className="flex-1 items-center mb-2">
          <span className="font-semibold">{detectedObject.alias ?? "이름 없음"}</span>
          <div className="text-sm">{detectedObject.feature}</div>
          <div className="text-xs">{detectedObject.categoryName}</div>
        </div>
        <img src={`data:image/jpg;base64,${detectedObject.cropImg}`} alt={"crop"} className="w-12 h-24"/>
      </div>
    </div>
  );
}

export default ObjectSummarizeForm;