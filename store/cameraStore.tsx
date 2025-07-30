import { create } from "zustand";
import axios from "axios";
import { Camera } from "@/utils/eventUtils";

type CameraStore = {
  camera: Camera | null;
  selectCamera: (cameraId: number | null) => Promise<void>;
};

const cameraStore = create<CameraStore>((set) => ({
  camera: null,
  selectCamera: async (cameraId) => {
    if (cameraId === null) {
      set({ camera: null });
      return;
    }
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    try {
      const res = await axios.get(`${backendUrl}/api/v1/camera/${cameraId}`);
      set({ camera: res.data });
    } catch (error) {
      set({ camera: null });
      console.error("카메라 상세 정보를 불러오지 못했습니다:", error);
    }
  },
}));

export default cameraStore;
