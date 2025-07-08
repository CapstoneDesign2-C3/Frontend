import TrackingMap from '../../components/map/TrackingMap.tsx';
import CommonHeader from '../../components/header/Header.tsx'
import SideBar from '../../components/sidebar/SideBar.tsx';
import { useState } from 'react';

const mock_events = [
  {
    id: 1,
    object_id: 1,
    title: '건물 a',
    img: 'https://m.media-amazon.com/images/I/61UhhuendiS.jpg',
    desc: '이곳은 설명입니다.',
    time: '2025-03-13 08:21:35',
    latitudeY: 37.4730459,
    longitudeX: 127.1027386,
  },{
    id: 2,
    object_id: 1,
    title: '건물 b',
    img: 'https://m.media-amazon.com/images/I/61UhhuendiS.jpg',
    desc: '이곳은 설명입니다.',
    time: '2025-03-13 08:21:35',
    latitudeY: 37.4731459,
    longitudeX: 127.1028386,
  },{
    id: 3,
    object_id: 1,
    title: '건물 c',
    img: 'https://m.media-amazon.com/images/I/61UhhuendiS.jpg',
    desc: '이곳은 설명입니다.',
    time: '2025-03-13 08:21:35',
    latitudeY: 37.4729459,
    longitudeX: 127.1029386,
  },{
    id: 4,
    object_id: 1,
    title: '건물 d',
    img: 'https://m.media-amazon.com/images/I/61UhhuendiS.jpg',
    desc: '이곳은 설명입니다.',
    time: '2025-03-13 08:21:35',
    latitudeY: 38.0729459,
    longitudeX: 127.1029386,
  },{
    id: 5,
    object_id: 2,
    title: '건물 e',
    img: 'https://m.media-amazon.com/images/I/61UhhuendiS.jpg',
    desc: '이곳은 설명입니다.',
    time: '2025-03-13 08:21:35',
    latitudeY: 36.0729459,
    longitudeX: 127.1039386,
  },{
    id: 6,
    object_id: 2,
    title: '건물 f',
    img: 'https://m.media-amazon.com/images/I/61UhhuendiS.jpg',
    desc: '이곳은 설명입니다.',
    time: '2025-03-13 08:21:35',
    latitudeY: 32.0729459,
    longitudeX: 127.1024356,
  }
  
];

const mock_objects = [
  {
    id: 1,
    categoryName: "person",
    cropImageUrl: "https://m.media-amazon.com/images/I/61UhhuendiS.jpg",
    alias: "pepe1",
    feature: "초록색 인간"
  },
  {
    id: 2,
    categoryName: "person",
    cropImageUrl: "https://m.media-amazon.com/images/I/61UhhuendiS.jpg",
    alias: "pepe2",
    feature: "초록색 인간"
  },
  {
    id: 3,
    categoryName: "person",
    cropImageUrl: "https://m.media-amazon.com/images/I/61UhhuendiS.jpg",
    alias: "pepe3",
    feature: "초록색 인간"
  },
  {
    id: 4,
    categoryName: "person",
    cropImageUrl: "https://m.media-amazon.com/images/I/61UhhuendiS.jpg",
    alias: "pepe4",
    feature: "초록색 인간"
  },
  {
    id: 5,
    categoryName: "person",
    cropImageUrl: "https://m.media-amazon.com/images/I/61UhhuendiS.jpg",
    alias: "pepe5",
    feature: "초록색 인간"
  },
  {
    id: 6,
    categoryName: "person",
    cropImageUrl: "https://m.media-amazon.com/images/I/61UhhuendiS.jpg",
    alias: "pepe6",
    feature: "초록색 인간"
  },
  
]

type Object = {
  id: number,
  categoryName: string,
  cropImageUrl: string,
  alias: string,
  feature: string
};

type Event = {
  id: number;
  object_id: number;
  title: string;
  img: string;
  desc: string;
  time: string;
  latitudeY: number;
  longitudeX: number;
};

function CameraLayout(){
  const [objects, setObjects] = useState<Object[]>(mock_objects);
  const [events, setEvents] = useState<Event[]>(mock_events);
  const [selectedEvents, setSelectedEvents] = useState<Event[]>([]);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    new Date(),
    new Date(),
  ]);
  const [startDate, endDate] = dateRange;

  return (
    <div>
      <CommonHeader />
      <div className="flex h-screen bg-gray-100">
        <div className="flex-1 relative">
          <TrackingMap events={selectedEvents} startDate={startDate} endDate={endDate} setDateRange={setDateRange} />
        </div>
        <div className="flex relative">
          
        </div>
      </div>
    </div>
  );
} 

export default CameraLayout;
