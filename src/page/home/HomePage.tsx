import TrackingMap from '../../components/map/TrackingMap.tsx';
import CommonHeader from '../../components/header/Header.tsx'
import SideBar from '../../components/sidebar/SideBar.tsx';
import { useEffect, useState } from 'react';
import axios from 'axios';

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
  discoveredTime: string;
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

type Track = {
  videoId: number,
  latitudeY: number,
  longitudeX: number
}

function HomeLayout(){
  const [objects, setObjects] = useState<Object[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [dateRange, setDateRange] = useState<[Date, Date]>([
    new Date(), 
    new Date(),
  ]);
  const [startDate, endDate] = dateRange;

  useEffect(() => {
    const fetchObjects = async () => {
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        const response = await axios.get(`${backendUrl}/api/v1/detected-object`);
        setObjects(response.data);
      } catch (error) {
        console.error("오브젝트 데이터를 불러오지 못했습니다.", error);
      }
    };

    fetchObjects();
  }, []);

  return (
    <div className="h-screen w-screen">
        <CommonHeader />
      <div className="flex h-full">
          <TrackingMap tracks={tracks} startDate={startDate} endDate={endDate} setDateRange={setDateRange} />
        <SideBar
            objects={objects}
            events={events}
            startDate={startDate}
            endDate={endDate}
            setObjects={setObjects}
            setEvents={setEvents}
            setTracks={setTracks}
          />
      </div>
    </div>
  );
} 

export default HomeLayout;
