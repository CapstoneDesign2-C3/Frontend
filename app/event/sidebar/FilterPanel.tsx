"use client"

import searchStore from '@/store/searchStore';
import SearchButton from '@/components/SearchButton';
import { useEffect } from 'react';
import { toLocalDateTimeString } from '@/utils/objectUtils';
import eventStore from '@/store/eventStore';

function FilterPanel() {
  const eventCode = searchStore(state => state.eventCode);
  const setEventCode = searchStore(state => state.setEventCode);
  const eventCodes = searchStore(state => state.eventCodes);
  const fetchEventCodes = searchStore(state => state.fetchEventCodes);
  const startDate = searchStore(state => state.dateRange[0]);
  const endDate = searchStore(state => state.dateRange[1]);
  const fetchEvents =eventStore(state => state.fetchEvents);

  useEffect(() => {
    fetchEventCodes();
  },[]);

  const handleObjects = () => {
    console.log(eventCode)
    fetchEvents(0, 5, eventCode, toLocalDateTimeString(startDate, "start"), toLocalDateTimeString(endDate, "end"));
  }

  return (
    <div className="p-3 flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <select
          className="white-component rounded px-1 py-1 flex-1"
          value={eventCode}
          onChange={e => setEventCode(e.target.value)}
        >
          <option value="" >event code를 선택하세요.</option>
          {eventCodes.map(code => (
            <option key={code.eventCodeName} value={code.eventCodeName}>
              {code.eventCodeName}
            </option>
          ))}
        </select>
        <SearchButton handleObjects={handleObjects}></SearchButton>
      </div>
    </div>
  );
}

export default FilterPanel;