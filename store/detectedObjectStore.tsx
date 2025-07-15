import axios from "axios";
import { create } from "zustand";

type DetectedObject = {
  detectedObjectId: number,
  categoryName: string,
  cropImgUrl: string,
  alias: string | null,
  feature: string
};

type Video = {
  detectionId : number,
  cameraScenery : string,
  thumbnailUrl : string,
  appearedTime : string,
  exitTime : string,
}

type DetectedObjectStore = {
  page: number;
  hasNext: boolean;
  isLoading: boolean;
  detectedObjects: DetectedObject[];
  setDetectedObjects: (categoryName: string, alias: string, searchInput: string) => void; 
  selectedObject: DetectedObject | null;
  setSelectedObject: (selectedObject: DetectedObject) => void;
  selectedVideos: Video[];
  setSelectedVideos: (detectedObjectId: number, startTime: string, endTime: string) => void;
  fetchDetectedObjects: (page: number, size: number) => void;
}

const detectedObjectStore = create<DetectedObjectStore>((set) => ({
  detectedObjects: [],
  page: 0,
  hasNext: true,
  isLoading: false,
  setDetectedObjects: async (categoryName: string, alias: string, searchInput: string) => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    try {
      const res = await axios.get<DetectedObject[]>(
        `${backendUrl}/api/v1/detected-object`,
        {
          params: {
            categoryName,
            alias,
            searchInput
          }
        }
      );
      set({ detectedObjects: res.data.content });
    } catch (error) {
      set({ detectedObjects: [] });
      console.error("객체 목록을 불러오지 못했습니다:", error);
    }
  },
  selectedObject: null,
  setSelectedObject: (selectedObject: DetectedObject) => set({ selectedObject: selectedObject}),
  selectedVideos: [],
  setSelectedVideos: async (detectedObjectId: number, startTime: string, endTime: string) => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    try {
      const res = await axios.get<DetectedObject[]>(`${backendUrl}/api/v1/detection/tracks`,
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
  fetchDetectedObjects: async (page, size) => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    set({ isLoading: true });
    try {
      const res = await axios.get(`${backendUrl}/api/v1/detected-object`, {
        params: { page, size },
      });

      const { content, last, number, totalPages } = res.data;

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
  }
}));

export default detectedObjectStore;