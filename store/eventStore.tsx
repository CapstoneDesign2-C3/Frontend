import { Event } from "@/utils/eventUtils";
import axios from "axios";
import { create } from "zustand";

interface EventStore {
  events: Event[];
  page: number;
  hasNext: boolean;
  isLoading: boolean;
  fetchEvents: (page: number, size: number, eventCode: string, startTime: string, endTime: string) => void;
}

const eventStore = create<EventStore>((set) => (
  {
  events: [],
  page: 0,
  hasNext: true,
  isLoading: false,
  fetchEvents: async (page, size, eventCodeName, startTime, endTime) => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    set({ isLoading: true });
    try {
      const res = await axios.get(`${backendUrl}/api/v1/event`, {
      params: {
      page,
      size,
      ...(eventCodeName !== "" && { eventCodeName }),
      startTime,
      endTime
    }
    });

    const { content, last } = res.data;

    set((state) => ({
        events: content,
        page,
        hasNext: !last,
        isLoading: false,
      }));

    } catch (error) {
      set({ events: [] });
      set({ isLoading: false });
      console.error("이벤트 목록을 불러오지 못했습니다:", error);
    }
  },
  setEventCode: (events: Event[]) => set({ events: events }),
}))

export default eventStore;