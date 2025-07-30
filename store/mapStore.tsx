import { CameraSummary, Track } from "@/utils/mapUtils";
import axios from "axios";
import { create } from "zustand";

interface MapStore {
  tracks: Track[];
  cameras: CameraSummary[];
  isLoadingTracks: boolean;
  isLoadingCameras: boolean;
  initTracks: () => void;
  initCameras: () => void;
  setTracks: (
    detectedObjectId: number,
    startTime: string,
    endTime: string
  ) => Promise<void>;
  fetchCameras: () => Promise<void>;
}

const mapStore = create<MapStore>((set) => ({
  tracks: [],
  cameras: [],
  isLoadingTracks: false,
  isLoadingCameras: false,
  initTracks: () => set({ tracks: [], isLoadingTracks: false }),
  initCameras: () => set({ cameras: [], isLoadingCameras: false }),
  setTracks: async (detectedObjectId, startTime, endTime) => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    set({ isLoadingTracks: true });
    try {
      const res = await axios.get(
        `${backendUrl}/api/v1/detection/positions`,
        {
          params: {
            detectedObjectId,
            startTime,
            endTime,
          },
        }
      );
      set({ tracks: res.data, isLoadingTracks: false });
    } catch (error) {
      set({ tracks: [], isLoadingTracks: false });
      console.error("객체의 영상 목록을 불러오지 못했습니다:", error);
    }
  },
  fetchCameras: async () => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    set({ isLoadingCameras: true });

    try {
      const res = await axios.get(
        `${backendUrl}/api/v1/camera`
      );
      set({ cameras: res.data, isLoadingCameras: false });
    } catch (error) {
      set({ cameras: [], isLoadingCameras: false });
      console.error("카메라 목록을 불러오지 못했습니다:", error);
    }
  },
}));

export default mapStore;
