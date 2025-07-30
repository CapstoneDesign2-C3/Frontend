import { EventCode } from "@/utils/eventUtils";
import axios from "axios";
import { create } from "zustand";

interface SearchStore {
  dateRange: [Date | null, Date | null];
  setDateRange: (range: [Date | null, Date | null]) => void;
  alias: string;
  setAlias: (alias: string) => void;
  eventCode: string;
  setEventCode: (eventCode: string) => void;
  eventCodes: EventCode[];
  fetchEventCodes: () => void;
}

const searchStore = create<SearchStore>((set) => ({
  dateRange: [new Date(), new Date()],
  setDateRange: (range) => set({ dateRange: range }),
  alias: "",
  setAlias: (alias) => set({ alias: alias }),
  eventCode: "",
  eventCodes: [],
  fetchEventCodes: async () => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    try {
      const res = await axios.get(`${backendUrl}/api/v1/event/code`
      );
      set({ eventCodes: res.data });
    } catch (error) {
      set({ eventCodes: [] });
      console.error("이벤트 코드 목록을 불러오지 못했습니다:", error);
    }
  },
  setEventCode: (eventCode) => set({ eventCode: eventCode }),
}))

export default searchStore;