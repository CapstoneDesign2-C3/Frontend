import { useState } from "react";
import Modal from "@/components/Modal";

import { Event } from "@/utils/eventUtils";
import EventDetailForm from "./EventDetailForm";

interface EventSummarizeFormProps {
  event: Event;
}

function EventSummarizeForm({ event }: EventSummarizeFormProps) {
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
        key={event.eventUUID}
        className="flex flex-col rounded-lg shadow-sm p-3 cursor-pointer"
        onClick={handleEventDetailFormClick}
        style={{
          background:'var(--first-color)'
        }}
      >
        <div className="flex items-center mb-2">
          <span className="font-semibold">{event.eventCodeName}</span>
        </div>
        <img src={event.videoThumbnailUrl} alt="로딩 실패" className="w-full h-28 object-cover rounded mb-2" />
        <div className="text-xs text-gray-400 mt-1">등장 시간 : {event.appearedTime}</div>
        <div className="text-xs text-gray-400 mt-1">퇴장 시간 : {event.exitTime}</div>
      </div>
      
      <Modal open={modalOpen} onClose={handleClose}>
        <EventDetailForm eventId={event.eventId} />
      </Modal>
    </>
  );
}

export default EventSummarizeForm;
