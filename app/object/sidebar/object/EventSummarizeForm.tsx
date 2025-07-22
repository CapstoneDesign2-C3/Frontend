import { useState } from "react";
import Modal from "@/components/Modal";
import EventDetailForm from "./EventDetailForm";
import { Video } from "@/utils/videoUtil";

interface EventSummarizeFormProps {
  video: Video;
  idx: number;
}

function EventSummarizeForm({ video, idx }: EventSummarizeFormProps) {
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
        key={video.detectionId}
        className="flex flex-col border rounded-lg shadow-sm p-3 bg-gray-50 cursor-pointer"
        onClick={handleEventDetailFormClick}
      >
        <div className="flex items-center mb-2">
          <span className="w-6 h-6 flex items-center justify-center bg-red-500 text-white rounded-full mr-2">{idx}</span>
          <span className="font-semibold">{video.cameraScenery}</span>
        </div>
        <img src={video.thumbnailUrl} alt="로딩 실패" className="w-full h-28 object-cover rounded mb-2" />
        <div className="text-xs text-gray-400 mt-1">등장 시간 : {video.appearedTime}</div>
        <div className="text-xs text-gray-400 mt-1">퇴장 시간 : {video.exitTime}</div>
      </div>
      <Modal open={modalOpen} onClose={handleClose}>
        <EventDetailForm video={video} />
      </Modal>
    </>
  );
}

export default EventSummarizeForm;
