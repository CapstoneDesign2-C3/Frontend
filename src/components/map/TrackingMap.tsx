import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import KakaoMap from './KakaoMap';

type Track = {
  videoId: number,
  latitudeY: number,
  longitudeX: number
}

interface TrackingMapProps{
  tracks: Track[];
  startDate: Date | null;
  endDate: Date | null;
  setDateRange: any;
}

function TrackingMap({tracks, startDate, endDate, setDateRange}: TrackingMapProps) {
  return (
    <div className="flex-1">
        <KakaoMap tracks={tracks}/>
      <div className="absolute left-4 top-16 bg-white rounded px-6 py-1 shadow text-sm font-medium z-10">
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
