"use client";

import { useEffect } from "react";
import searchStore from "@/store/searchStore";
import eventStore from "@/store/eventStore";
import { toLocalDateTimeString } from "@/utils/objectUtils";
import EventSummarizeForm from "./EventSummarizeForm";

function ListPanel() {
  const page = eventStore((state) => state.page);
  const hasNext = eventStore((state) => state.hasNext);
  const isLoading = eventStore((state) => state.isLoading);
  const events = eventStore(state => state.events);
  const eventCode = searchStore(state => state.eventCode);
  const fetchEvents = eventStore(state => state.fetchEvents);
  const startDate = searchStore(state => state.dateRange[0]);
  const endDate = searchStore(state => state.dateRange[1]);

  const handlePrevPage = () => {
    if (page > 0) {
      fetchEvents(page - 1, 5, eventCode, toLocalDateTimeString(startDate, "start"), toLocalDateTimeString(endDate, "end"));
    }
  };

  const handleNextPage = () => {
    if (hasNext) {
      fetchEvents(page + 1, 5, eventCode, toLocalDateTimeString(startDate, "start"), toLocalDateTimeString(endDate, "end"));
    }
  };

  useEffect(() => {
    fetchEvents(0, 5, eventCode, toLocalDateTimeString(startDate, "start"), toLocalDateTimeString(endDate, "end"));
  }, []);

  return (
    <div className="flex h-[calc(100vh-80px)] overflow-y-auto relative">
      <div className="flex-1 space-y-2 w-[300px] p-4 h-full">
        <div className="flex justify-between mt-4">
          <button
            onClick={handlePrevPage}
            disabled={page === 0 || isLoading}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            이전
          </button>
          <span className="text-sm text-gray-600">페이지 {page + 1}</span>
          <button
            onClick={handleNextPage}
            disabled={!hasNext || isLoading}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            다음
          </button>
        </div>

        {isLoading && (
          <div className="text-center text-gray-400 text-sm py-2">불러오는 중...</div>
        )}

        {events.length === 0 && !isLoading && (
          <div className="text-center text-gray-400 text-sm py-2">
            이벤트가 없습니다.
          </div>
        )}

        {events.map(event => (
          <EventSummarizeForm
            event={event}
          />
        ))}

      </div>
    </div>
  );
}

export default ListPanel;
