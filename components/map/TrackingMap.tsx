"use client"

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import GoogleMap from './GoogleMap';
import searchStore from '@/store/searchStore';

function TrackingMap() {
  const {dateRange, setDateRange} = searchStore();

  return (
    <div className="h-full w-full">
      <GoogleMap />
      <div className="absolute left-24 top-16 white-component rounded px-6 py-1 shadow text-sm font-medium z-10">
        <DatePicker
          selectsRange
          startDate={dateRange[0]}
          endDate={dateRange[1]}
          onChange={(update: [Date | null, Date | null]) => setDateRange(update)}
          isClearable={false}
          dateFormat="yyyy-MM-dd"
          className="w-45 text-center white-component"
        />
      </div>
    </div>
  );
};

export default TrackingMap;
