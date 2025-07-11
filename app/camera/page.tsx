"use client";

import { useEffect, useState } from 'react';
import KakaoMap from '../components/map/KakaoMap';
import EventForm from '../components/sidebar/event/EventForm';

type Camera = {
  id: number;
  scenery: string;
  latitude: number;
  longitude: number;
}

type Event = {
  id: number;
  camera_id: number;
  title: string;
  thumbnailUrl: string;
  videoUrl: string;
  desc: string;
  time: string;
  latitudeY: number;
  longitudeX: number;
};

const mock_events = [
  {
    id: 1,
    camera_id: 1,
    title: '건물 a',
    thumbnailUrl: 'https://img.freepik.com/free-photo/white-cloud-blue-sky-sea_74190-4488.jpg?semt=ais_hybrid&w=740',
    videoUrl: 'https://marketplace.canva.com/EAGrjo4uTB8/1/document_810w/canva-ma1iPfH6UOo.mp4',
    desc: '이곳은 설명입니다.',
    time: '2025-03-13 08:21:35',
    latitudeY: 37.4730459,
    longitudeX: 127.1027386,
  },{
    id: 2,
    camera_id: 1,
    title: '건물 b',
    thumbnailUrl: 'https://img.hankyung.com/photo/202103/0Q.25811355.1.jpg',
    videoUrl: 'https://marketplace.canva.com/EAGrjo4uTB8/1/document_810w/canva-ma1iPfH6UOo.mp4',
    desc: '이곳은 설명입니다.',
    time: '2025-03-13 08:21:35',
    latitudeY: 37.4731459,
    longitudeX: 127.1028386,
  },{
    id: 3,
    camera_id: 1,
    title: '건물 c',
    thumbnailUrl: 'https://www.greenpeace.org/static/planet4-korea-stateless/2024/06/bcc6c1bd-gp1svm5i_low-res-with-credit-line-800px.jpg',
    videoUrl: 'https://marketplace.canva.com/EAGrjo4uTB8/1/document_810w/canva-ma1iPfH6UOo.mp4',
    desc: '이곳은 설명입니다.',
    time: '2025-03-13 08:21:35',
    latitudeY: 37.4729459,
    longitudeX: 127.1029386,
  },{
    id: 4,
    camera_id: 1,
    title: '건물 d',
    thumbnailUrl: 'https://cdn.koit.co.kr/news/photo/202303/110260_62625_2838.jpg',
    videoUrl: 'https://marketplace.canva.com/EAGrjo4uTB8/1/document_810w/canva-ma1iPfH6UOo.mp4',
    desc: '이곳은 설명입니다.',
    time: '2025-03-13 08:21:35',
    latitudeY: 37.4729459,
    longitudeX: 127.1030386,
  },{
    id: 5,
    camera_id: 2,
    title: '건물 e',
    thumbnailUrl: 'https://m.media-amazon.com/images/I/61UhhuendiS.jpg',
    videoUrl: 'https://marketplace.canva.com/EAGrjo4uTB8/1/document_810w/canva-ma1iPfH6UOo.mp4',
    desc: '이곳은 설명입니다.',
    time: '2025-03-13 08:21:35',
    latitudeY: 33.5024459,
    longitudeX: 126.8039386,
  },{
    id: 6,
    camera_id: 2,
    title: '건물 f',
    thumbnailUrl: 'https://m.media-amazon.com/images/I/61UhhuendiS.jpg',
    videoUrl: 'https://marketplace.canva.com/EAGrjo4uTB8/1/document_810w/canva-ma1iPfH6UOo.mp4',
    desc: '이곳은 설명입니다.',
    time: '2025-03-13 08:21:35',
    latitudeY: 33.5029459,
    longitudeX: 126.8024356,
  }
  
];

const mock_cameras = [
  {
    id: 1,
    scenery: "강남 세곡천 공원 신동 아파밀리에 방면",
    latitude: 37.4730459,
    longitude: 127.1027386,
  },
  {
    id: 2,
    scenery: "강남 세곡천 공원 신동 아파밀리에 방면",
    latitude: 37.4740459,
    longitude: 127.1027386,
  },
  {
    id: 3,
    scenery: "강남 세곡천 공원 신동 아파밀리에 방면",
    latitude: 37.4750459,
    longitude: 127.1027386,
  },
  {
    id: 4,
    scenery: "강남 세곡천 공원 신동 아파밀리에 방면",
    latitude: 37.4760459,
    longitude: 127.1027386,
  },
  {
    id: 5,
    scenery: "강남 세곡천 공원 신동 아파밀리에 방면",
    latitude: 37.4770459,
    longitude: 127.1027386,
  },
];



function Camera(){
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null);
  const [selectedEvents, setSelectedEvents] = useState<Event[] | null>(null);

  function handleSelectedEvents(camera_id: number) {
    setSelectedEvents(mock_events.filter(event => event.camera_id === camera_id));
  }

  useEffect(() => {
    if (selectedCamera) {
      handleSelectedEvents(selectedCamera.id);
    }
  }, [selectedCamera]);

  return (
    <div>
      <div className="flex h-screen bg-gray-100">
        <div className="flex-1 relative">
          <KakaoMap cameras={mock_cameras} onMarkerClick={setSelectedCamera} />
        </div>
        {selectedCamera && (<div className="w-[300px] bg-white border-l flex flex-col h-full">
          <div className="flex justify-between items-center border">
            <div className="flex-1">
              <h2 className='text-xl'> {selectedCamera.scenery}</h2>
              <h2 className='text-xs'>위도 | {selectedCamera.latitude}</h2>
              <h2 className='text-xs'>경도 | {selectedCamera.longitude}</h2>
            </div>
            <button className="text-gray-400 hover:text-gray-800 text-xl" onClick={() => setSelectedCamera(null)}>
            ×
            </button>
          </div>
          <div className="overflow-y-auto">
            {selectedEvents && selectedEvents.length > 0 ? (
              selectedEvents.map((event) => (
                <EventForm key={event.id} event={event} isModal={false} />
              ))
            ) : (
              <div className="text-gray-400 p-4">이 카메라에 연결된 이벤트가 없습니다.</div>
            )}
          </div>
        </div>
        )}
      </div>
    </div>
  );
}

export default Camera;
