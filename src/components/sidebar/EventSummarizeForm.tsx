import { useState } from "react";
import Modal from "../Modal";
import EventDetailForm from "./EventDetailForm";

type Event = {
  id: number;
  object_id: number;
  title: string;
  thumbnailUrl: string;
  videoUrl: string;
  desc: string;
  time: string;
  latitudeY: number;
  longitudeX: number;
};

type Object = {
  id: number,
  categoryName: string,
  cropImageUrl: string,
  alias: string | null,
  feature: string
};

interface EventSummarizeFormProps {
  event: Event;
  object: Object;
}

function EventSummarizeForm({ event, object }: EventSummarizeFormProps) {
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
        key={event.id}
        className="flex flex-col border rounded-lg shadow-sm p-3 bg-gray-50 cursor-pointer"
        onClick={handleEventDetailFormClick}
      >
        <div className="flex items-center mb-2">
          <span className="w-6 h-6 flex items-center justify-center bg-red-500 text-white rounded-full mr-2">{event.id}</span>
          <span className="font-semibold">{event.title}</span>
        </div>
        <img src={event.thumbnailUrl} alt={event.title} className="w-full h-28 object-cover rounded mb-2" />
        <div className="text-sm text-gray-700">{event.desc}</div>
        <div className="text-xs text-gray-400 mt-1">{event.time}</div>
      </div>
      <Modal open={modalOpen} onClose={handleClose}>
        <EventDetailForm event={event} object={object}/>
      </Modal>
    </>
  );
}

export default EventSummarizeForm;
