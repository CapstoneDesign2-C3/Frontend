import axios from "axios";
import { create } from "zustand";

type Track = {
  detectionId: number,
  latitudeY: number,
  longitudeX: number
};

interface MapStore {
  tracks: Track[];
  setTracks: (detectedObjectId: number, startTime: string, endTime: string) => Promise<void>;
}

const mapStore = create<MapStore>((set) => ({
  tracks: [],
  setTracks: async (detectedObjectId, startTime, endTime) => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    try {
      const res = await axios.get<{ content: Track[] }>(
        `${backendUrl}/api/v1/detection/positions`,
        {
          params: {
            detectedObjectId,
            startTime,
            endTime
          }
        }
      );
      set({ tracks: res.data });
    } catch (error) {
      set({ tracks: [] });
      console.error("객체의 영상 목록을 불러오지 못했습니다:", error);
    }
  }
}));

export default mapStore;
