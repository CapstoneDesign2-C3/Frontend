import { useState } from "react";
import ObjectSummarizeForm from "./ObjectSummarizeForm";
import EventSummarizeForm from "./EventSummarizeForm";

type Object = {
  id: number,
  categoryName: string,
  cropImageUrl: string,
  alias: string | null,
  feature: string
};

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

type ObjectListProps = {
  objects: Object[];
  events: Event[];
  setSelectedEvents: any;
};

function ObjectList({ objects, events, setSelectedEvents }: ObjectListProps) {
  const [selectedObject, setSelectedObject] = useState<Object | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleObjectClick = (object: Object) => {
    setSelectedObject(object);
    setSidebarOpen(true);

    const relatedEvents = events.filter(e => e.object_id === object.id);
    setSelectedEvents(relatedEvents);
  };

  const handleCloseSidebar = () => setSidebarOpen(false);

  const selectedEvents = selectedObject
    ? events.filter(e => e.object_id === selectedObject.id)
    : [];

  return (
    <div className="flex">
      <div className="flex-1 space-y-2 w-[300px] p-4 h-full">
        {objects.map(obj => (
          <ObjectSummarizeForm
            key={obj.id}
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
                selectedEvents.map((event) => (
                  <EventSummarizeForm key={event.id} event={event} object={selectedObject} />
                ))
              }
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


export default ObjectList;