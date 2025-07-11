import { useEffect, useState } from "react";
import ObjectSummarizeForm from "./object/ObjectSummarizeForm";
import EventSummarizeForm from "./object/EventSummarizeForm";
import EventForm from "./video/VideoForm";
import axios from "axios";

type Object = {
  detectedObjectId: number,
  categoryName: string,
  cropImgUrl: string,
  alias: string | null,
  feature: string
};

type Video = {
  videoId: number;
  summary: string;
  appearedTime: string;
  exitTime: string;
  thumbnailUrl: string;
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
  startDate: Date;
  endDate: Date;
  setTracks: any;
  selected: 'object'|'event';
};

function toLocalDateTimeString(date: Date) {
  // padStart(2, '0')로 항상 2자리로 맞춤
  const yyyy = date.getFullYear();
  const MM = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const hh = String(date.getHours()).padStart(2, '0');
  const mm = String(date.getMinutes()).padStart(2, '0');
  const ss = String(date.getSeconds()).padStart(2, '0');
  return `${yyyy}-${MM}-${dd}T${hh}:${mm}:${ss}`;
}

async function fetchSelectedVideos(object: Object, startTime: string, endTime: string) {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const response = await axios.get(
    `${backendUrl}api/v1/detection/tracks`,{
    params:{
      detectedObjectId: object.detectedObjectId,
      startTime,
      endTime,
    }
  }
  );
  return response.data;
}

function ListPanel({ objects, events, startDate, endDate, setTracks, selected }: ObjectListProps) {
  const [selectedObject, setSelectedObject] = useState<Object | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedVideos, setSelectedVideos] = useState<Video[]>([]);
  const handleObjectClick = async (object: Object) => {
    setSelectedObject(object);
    setSidebarOpen(true);

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await axios.get(
        `${backendUrl}/api/v1/detection/positions`,{
        params:{
          detectedObjectId: object.detectedObjectId,
          startTime: toLocalDateTimeString(startDate),
          endTime: toLocalDateTimeString(endDate),
        }
      }
      );
      setTracks(response.data.content);
    } catch (error) {
      console.error("이벤트 데이터를 불러오지 못했습니다.", error);
      setTracks([]);
    }
  };

  const handleCloseSidebar = () => setSidebarOpen(false);

  useEffect(() => {
    if (!selectedObject) {
      setSelectedVideos([]);
      return;
    }

    fetchSelectedVideos(selectedObject, toLocalDateTimeString(startDate), toLocalDateTimeString(endDate))
      .then(data => setSelectedVideos(data))
      .catch(err => {
        console.error("비디오 트랙 데이터를 불러오지 못했습니다.", err);
        setSelectedVideos([]);
      });
  }, [selectedObject]);

  return (
    <div className="flex overflow-y-auto">
      {selected === 'object' && (<div className="flex-1 space-y-2 w-[300px] p-4 h-full">
        {objects.map(obj => (
          <ObjectSummarizeForm
            key={obj.detectedObjectId}
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
                selectedVideos.map((video) => (
                  <EventSummarizeForm key={video.videoId} video={video} object={selectedObject} />
                ))
              }
            </div>
          </div>
        )}
      </div>)}
      {selected === 'event' && (
        <div className="flex-1 space-y-2 w-[300px] p-4 h-full">
          {events.map(event => (
          <EventForm
            key={event.id}
            event={event}
            isModal={true}
          />
        ))}
        </div>
      )}
    </div>
  );
}


export default ListPanel;