import { create } from "zustand";
import axios from "axios";

type Camera = {
  cameraId: number;
  cameraScenery: string;
  cameraLatitude: number;
  cameraLongitude: number;
  videos: any[]; // 필요에 따라 타입 지정
};

type CameraStore = {
  camera: Camera | null;
  selectCamera: (cameraId: number | null) => Promise<void>;
};

const cameraStore = create<CameraStore>((set) => ({
  camera: null,
  // cameraId를 받아 해당 카메라 상세 정보를 API에서 받아와 camera에 저장
  selectCamera: async (cameraId) => {
    if (cameraId === null) {
      set({ camera: null });
      return;
    }
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    try {
      const res = await axios.get<Camera>(`${backendUrl}/api/v1/camera/${cameraId}`);
      set({ camera: res.data });
    } catch (error) {
      set({ camera: null });
      console.error("카메라 상세 정보를 불러오지 못했습니다:", error);
    }
  },
}));

export default cameraStore;
