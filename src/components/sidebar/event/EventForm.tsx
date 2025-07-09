import { useState } from "react";
import Modal from "../../Modal";
import EventDetailForm from "../object/EventDetailForm";
import { useNavigate } from "react-router-dom";

type Event = {
  id: number;
  title: string;
  thumbnailUrl: string;
  videoUrl: string;
  desc: string;
  time: string;
  latitudeY: number;
  longitudeX: number;
};

interface EventFormPros {
  event: Event;
  isModal: boolean;
}

function EventForm({ event, isModal }: EventFormPros) {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleEventDetailFormClick = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleMoveToPage = () => {
    navigate(`/videos/${event.id}`);
  };

  return (
    <>
      {isModal ? (
        <>
          <div
            key={event.id}
            className="flex flex-col border rounded-lg shadow-sm p-3 bg-gray-50 cursor-pointer"
            onClick={handleEventDetailFormClick}
          >
            <div className="flex items-center mb-2">
              <span className="font-semibold">{event.title}</span>
            </div>
            <img src={event.thumbnailUrl} alt={event.title} className="w-full h-28 object-cover rounded mb-2" />
            <div className="text-sm text-gray-700">{event.desc}</div>
            <div className="text-xs text-gray-400 mt-1">{event.time}</div>
          </div>
          <Modal open={modalOpen} onClose={handleClose}>
            <EventDetailForm event={event} />
          </Modal>
        </>
      ) : (
        <div
          key={event.id}
          className="flex flex-col border rounded-lg shadow-sm p-3 bg-gray-50 cursor-pointer"
          onClick={handleMoveToPage}
        >
          <div className="flex items-center mb-2">
            <span className="font-semibold">{event.title}</span>
          </div>
          <img src={event.thumbnailUrl} alt={event.title} className="w-full h-28 object-cover rounded mb-2" />
          <div className="text-sm text-gray-700">{event.desc}</div>
          <div className="text-xs text-gray-400 mt-1">{event.time}</div>
        </div>
      )}
    </>
  );
}
export default EventForm;