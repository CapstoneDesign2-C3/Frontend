import type React from "react";

type Object = {
  detectedObjectId: number,
  categoryName: string,
  cropImgUrl: string,
  alias?: string | null,
  feature: string
};

interface ObjectFormProps {
  object: Object;
  handleObjectClick?: any;
}

const ObjectSummarizeForm: React.FC<ObjectFormProps> = ({ object , handleObjectClick}) => (
  <div onClick={() => handleObjectClick(object)} className="border rounded">
    <div className="flex">
      <div className="flex-1 items-center mb-2">
        <span className="font-semibold">{object.alias ?? "이름 없음"}</span>
        <div className="text-sm text-gray-700">{object.feature}</div>
        <div className="text-xs text-gray-400 mt-1">{object.categoryName}</div>
      </div>
      <img src={object.cropImgUrl} alt={object.alias ?? "이름 없음"} className="object-cover rounded mb-2 block mx-auto" />
    </div>
  </div>
);

export default ObjectSummarizeForm;