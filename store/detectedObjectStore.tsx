import { DetectedObject } from "@/utils/objectUtils";
import { Video } from "@/utils/videoUtils";
import axios from "axios";
import { create } from "zustand";

type DetectedObjectStore = {
  page: number;
  hasNext: boolean;
  isLoading: boolean;
  detectedObjects: DetectedObject[];
  selectedObject: DetectedObject | null;
  setSelectedObject: (selectedObject: DetectedObject) => void;
  selectedVideos: Video[];
  setSelectedVideos: (detectedObjectId: number, startTime: string, endTime: string) => void;
  fetchDetectedObjects: (page: number, size: number, categoryName?: string, alias?: string, searchInput?: string) => void;
  fetchAlias: (alias: string, detectedObjectId: number) => void;
}

const detectedObjectStore = create<DetectedObjectStore>((set) => ({
  detectedObjects: [],
  page: 0,
  hasNext: true,
  isLoading: false,
  selectedObject: null,
  setSelectedObject: (selectedObject: DetectedObject) => set({ selectedObject: selectedObject}),
  selectedVideos: [],
  setSelectedVideos: async (detectedObjectId: number, startTime: string, endTime: string) => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    try {
      const res = await axios.get(`${backendUrl}/api/v1/detection/tracks`,
        {
          params: {
            detectedObjectId: detectedObjectId,
            startTime: startTime,
            endTime: endTime
          }
        }
      );
      set({ selectedVideos: res.data.content });
    } catch (error) {
      set({ selectedVideos: [] });
      console.error("객체의 영상 목록을 불러오지 못했습니다:", error);
    }
  },
  fetchDetectedObjects: async (page, size, alias) => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    set({ isLoading: true });
    try {
      const res = await axios.get(`${backendUrl}/api/v1/detected-object`, {
        params: {
        page,
        size,
        ...(alias !== "" && { alias }),
      }
      });

      const { content, last } = res.data;

      set((state) => ({
        detectedObjects: content,
        page,
        hasNext: !last,
        isLoading: false,
      }));
    } catch (error) {
      set({ isLoading: false });
      console.error("객체 목록을 불러오지 못했습니다:", error);
    }
  },
  fetchAlias: async (alias, detectedObjectId) => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    try {
      const res = await axios.put(`${backendUrl}/api/v1/detected-object/${detectedObjectId}`, alias, {
        headers: { 'Content-Type': 'text/plain' }
      });
      window.location.reload();
    } catch (error) {
      console.error("별칭 변경에 실패했습니다.", error);
    }
  },
}));

export default detectedObjectStore;