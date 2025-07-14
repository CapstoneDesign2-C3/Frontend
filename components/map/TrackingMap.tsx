"use client"

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import KakaoMap from './KakaoMap';
import searchStore from '@/store/searchStore';

function TrackingMap() {
  const {dateRange, setDateRange} = searchStore();

  return (
    <div className="flex-1">
        <KakaoMap />
      <div className="absolute left-4 top-16 bg-white rounded px-6 py-1 shadow text-sm font-medium z-10">
        <DatePicker
          selectsRange
          startDate={dateRange[0]}
          endDate={dateRange[1]}
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
