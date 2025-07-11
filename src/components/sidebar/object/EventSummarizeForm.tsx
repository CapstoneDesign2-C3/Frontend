import { useState } from "react";
import Modal from "../../Modal";
import EventDetailForm from "./EventDetailForm";

type Object = {
  detectedObjectId: number,
  categoryName: string,
  cropImgUrl: string,
  alias?: string | null,
  feature: string
};

type Video = {
  videoId: number;
  summary: string;
  appearedTime: string;
  exitTime: string;
  thumbnailUrl: string;
};

interface EventSummarizeFormProps {
  video: Video;
  object: Object;
}

function EventSummarizeForm({ video, object }: EventSummarizeFormProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleEventDetailFormClick = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div
        key={video.videoId}
        className="flex flex-col border rounded-lg shadow-sm p-3 bg-gray-50 cursor-pointer"
        onClick={handleEventDetailFormClick}
      >
        <div className="flex items-center mb-2">
          <span className="w-6 h-6 flex items-center justify-center bg-red-500 text-white rounded-full mr-2">{video.videoId}</span>
          <span className="font-semibold">{video.summary}</span>
        </div>
        <img src={video.thumbnailUrl} alt={video.summary} className="w-full h-28 object-cover rounded mb-2" />
        <div className="text-sm text-gray-700">{video.summary}</div>
        <div className="text-xs text-gray-400 mt-1">등장 시간 : {video.appearedTime}</div>
        <div className="text-xs text-gray-400 mt-1">퇴장 시간 : {video.exitTime}</div>
      </div>
      <Modal open={modalOpen} onClose={handleClose}>
        <EventDetailForm video={video} object={object}/>
      </Modal>
    </>
  );
}

export default EventSummarizeForm;
