import { create } from "zustand";
import axios from "axios";
import { BarData, LineData, PieData } from "@/utils/chartUtils";

type ChartStore = {
  eventData: PieData[];
  timeData: LineData[];
  cameraData: BarData[];
  riskData: BarData[];
  date: Date;
  fetchData: () => Promise<void>;
  setDate: (newDate: Date) => void;
};

const chartStore = create<ChartStore>((set, get) => ({
  eventData: [],
  timeData: [],
  cameraData: [],
  riskData: [],
  date: new Date(),
  fetchData: async () => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const date = get().date;
    try {
      const res = await axios.get(`${backendUrl}/api/v1/dashboard/event`, {
        params: { date: date.toISOString().slice(0, 10) },
      });
      set({ eventData: res.data });
    } catch (error) {
      set({ eventData: [] });
      console.error("통계 정보를 불러오지 못했습니다:", error);
    }

    try {
      const res = await axios.get(`${backendUrl}/api/v1/dashboard/time`, {
        params: { date: date.toISOString().slice(0, 10) },
      });
      set({ timeData: [res.data] });
    } catch (error) {
      set({ timeData: [] });
      console.error("통계 정보를 불러오지 못했습니다:", error);
    }

    try {
      const res = await axios.get(`${backendUrl}/api/v1/dashboard/camera`, {
        params: { date: date.toISOString().slice(0, 10) },
      });
      set({ cameraData: res.data });
    } catch (error) {
      set({ cameraData: [] });
      console.error("통계 정보를 불러오지 못했습니다:", error);
    }

    try {
      const res = await axios.get(`${backendUrl}/api/v1/dashboard/risk`, {
        params: { date: date.toISOString().slice(0, 10) },
      });
      set({ riskData: res.data });
    } catch (error) {
      set({ riskData: [] });
      console.error("통계 정보를 불러오지 못했습니다:", error);
    }
  },
  setDate: (newDate: Date) => set({ date: newDate }),
}));

export default chartStore;
