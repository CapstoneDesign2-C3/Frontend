import { DetectedObject } from "@/utils/objectUtils";
import type React from "react";

interface ObjectFormProps {
  detectedObject: DetectedObject;
  handleObjectClick?: any;
}

const ObjectSummarizeForm: React.FC<ObjectFormProps> = ({ detectedObject , handleObjectClick }) => (
  <div onClick={() => handleObjectClick(detectedObject)} className="border rounded">
    <div className="flex">
      <div className="flex-1 items-center mb-2">
        <span className="font-semibold">{detectedObject.alias ?? "이름 없음"}</span>
        <div className="text-sm text-gray-700">{detectedObject.feature}</div>
        <div className="text-xs text-gray-400 mt-1">{detectedObject.categoryName}</div>
      </div>
      <img src={detectedObject.cropImgUrl} alt={detectedObject.alias ?? "이름 없음"} className="object-cover rounded mb-2 block mx-auto" />
    </div>
  </div>
);

export default ObjectSummarizeForm;