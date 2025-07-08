import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import KakaoMap from './KakaoMap';

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

interface TrackingMapProps{
  events: Event[];
  startDate: Date | null;
  endDate: Date | null;
  setDateRange: any;
}

function TrackingMap({events, startDate, endDate, setDateRange}: TrackingMapProps) {
  return (
    <div className="relative w-full h-[500px]"> {/* 원하는 높이로 조절 */}
      <div className="absolute inset-0 w-full h-full">
        <KakaoMap events={events}/>
      </div>
      {/* DatePicker를 지도 위에 겹치게 띄움 */}
      <div className="absolute left-4 top-4 bg-white rounded px-6 py-1 shadow text-sm font-medium z-10">
        <DatePicker
          selectsRange
          startDate={startDate}
          endDate={endDate}
          onChange={(update: [Date | null, Date | null]) => setDateRange(update)}
          isClearable={false}
          dateFormat="yyyy-MM-dd"
          className="w-45 text-center"
        />
      </div>
    </div>
  );
};

export default TrackingMap;
