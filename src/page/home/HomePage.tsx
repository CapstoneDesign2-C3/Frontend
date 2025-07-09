import TrackingMap from '../../components/map/TrackingMap.tsx';
import CommonHeader from '../../components/header/Header.tsx'
import SideBar from '../../components/sidebar/SideBar.tsx';
import { useState } from 'react';

const mock_events = [
  {
    id: 1,
    object_id: 1,
    title: '건물 a',
    thumbnailUrl: 'https://img.freepik.com/free-photo/white-cloud-blue-sky-sea_74190-4488.jpg?semt=ais_hybrid&w=740',
    videoUrl: 'https://marketplace.canva.com/EAGrjo4uTB8/1/document_810w/canva-ma1iPfH6UOo.mp4',
    desc: '이곳은 설명입니다.',
    time: '2025-03-13 08:21:35',
    latitudeY: 37.4730459,
    longitudeX: 127.1027386,
  },{
    id: 2,
    object_id: 1,
    title: '건물 b',
    thumbnailUrl: 'https://img.hankyung.com/photo/202103/0Q.25811355.1.jpg',
    videoUrl: 'https://marketplace.canva.com/EAGrjo4uTB8/1/document_810w/canva-ma1iPfH6UOo.mp4',
    desc: '이곳은 설명입니다.',
    time: '2025-03-13 08:21:35',
    latitudeY: 37.4731459,
    longitudeX: 127.1028386,
  },{
    id: 3,
    object_id: 1,
    title: '건물 c',
    thumbnailUrl: 'https://www.greenpeace.org/static/planet4-korea-stateless/2024/06/bcc6c1bd-gp1svm5i_low-res-with-credit-line-800px.jpg',
    videoUrl: 'https://marketplace.canva.com/EAGrjo4uTB8/1/document_810w/canva-ma1iPfH6UOo.mp4',
    desc: '이곳은 설명입니다.',
    time: '2025-03-13 08:21:35',
    latitudeY: 37.4729459,
    longitudeX: 127.1029386,
  },{
    id: 4,
    object_id: 1,
    title: '건물 d',
    thumbnailUrl: 'https://cdn.koit.co.kr/news/photo/202303/110260_62625_2838.jpg',
    videoUrl: 'https://marketplace.canva.com/EAGrjo4uTB8/1/document_810w/canva-ma1iPfH6UOo.mp4',
    desc: '이곳은 설명입니다.',
    time: '2025-03-13 08:21:35',
    latitudeY: 37.4729459,
    longitudeX: 127.1030386,
  },{
    id: 5,
    object_id: 2,
    title: '건물 e',
    thumbnailUrl: 'https://m.media-amazon.com/images/I/61UhhuendiS.jpg',
    videoUrl: 'https://marketplace.canva.com/EAGrjo4uTB8/1/document_810w/canva-ma1iPfH6UOo.mp4',
    desc: '이곳은 설명입니다.',
    time: '2025-03-13 08:21:35',
    latitudeY: 33.5024459,
    longitudeX: 126.8039386,
  },{
    id: 6,
    object_id: 2,
    title: '건물 f',
    thumbnailUrl: 'https://m.media-amazon.com/images/I/61UhhuendiS.jpg',
    videoUrl: 'https://marketplace.canva.com/EAGrjo4uTB8/1/document_810w/canva-ma1iPfH6UOo.mp4',
    desc: '이곳은 설명입니다.',
    time: '2025-03-13 08:21:35',
    latitudeY: 33.5029459,
    longitudeX: 126.8024356,
  }
  
];

const mock_objects = [
  {
    detectedObjectId: 1,
    categoryName: "person",
    cropImgUrl: "https://m.media-amazon.com/images/I/61UhhuendiS.jpg",
    alias: null,
    feature: "초록색 인간"
  },
  {
    detectedObjectId: 2,
    categoryName: "person",
    cropImgUrl: "https://m.media-amazon.com/images/I/61UhhuendiS.jpg",
    alias: "pepe2",
    feature: "초록색 인간"
  },
  {
    detectedObjectId: 3,
    categoryName: "person",
    cropImgUrl: "https://m.media-amazon.com/images/I/61UhhuendiS.jpg",
    alias: "pepe3",
    feature: "초록색 인간"
  },
  {
    detectedObjectId: 4,
    categoryName: "person",
    cropImgUrl: "https://m.media-amazon.com/images/I/61UhhuendiS.jpg",
    alias: "pepe4",
    feature: "초록색 인간"
  },
  {
    detectedObjectId: 5,
    categoryName: "person",
    cropImgUrl: "https://m.media-amazon.com/images/I/61UhhuendiS.jpg",
    alias: "pepe5",
    feature: "초록색 인간"
  },
  {
    detectedObjectId: 6,
    categoryName: "person",
    cropImgUrl: "https://m.media-amazon.com/images/I/61UhhuendiS.jpg",
    alias: "pepe6",
    feature: "초록색 인간"
  },
]

type Object = {
  detectedObjectId: number,
  categoryName: string,
  cropImgUrl: string,
  alias?: string | null,
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

function HomeLayout(){
  const [objects, setObjects] = useState<Object[]>(mock_objects);
  const [events, setEvents] = useState<Event[]>(mock_events);
  const [selectedEvents, setSelectedEvents] = useState<Event[]>([]);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    new Date(),
    new Date(),
  ]);
  const [startDate, endDate] = dateRange;

  return (
    <div className="h-full w-full overflow-hidden">
      <CommonHeader />
      <div className="flex h-screen bg-gray-100">
        <div className="flex-1 relative">
          <TrackingMap events={selectedEvents} startDate={startDate} endDate={endDate} setDateRange={setDateRange} />
        </div>
        <div className="flex relative">
          <SideBar
            objects={objects}
            events={events}
            setObjects={setObjects}
            setEvents={setEvents}
            setSelectedEvents={setSelectedEvents}
          />
        </div>
      </div>
    </div>
  );
} 

export default HomeLayout;
