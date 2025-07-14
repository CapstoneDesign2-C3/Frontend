import { create } from 'zustand';
import axios from 'axios';

type DetectedObject = {
  detectedObjectId: number;
  categoryName: string;
  cropImgUrl: string;
  alias: string | null;
  feature: string;
};

type Video = {
  videoUrl: string;
  cameraScenery: string;
  latitude: number;
  longitude: number;
  detectedObjects: DetectedObject[];
};

type SelectedVideoStore = {
  video: Video | null;
  loading: boolean;
  error: string | null;
  fetchVideo: (videoId: number) => Promise<void>;
};

const selectedVideoStore = create<SelectedVideoStore>((set) => ({
  video: null,
  loading: false,
  error: null,
  fetchVideo: async (videoId) => {
    set({ loading: true, error: null });
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const response = await axios.get<Video>(`${backendUrl}/api/v1/video/${videoId}`);
      set({ video: response.data, loading: false, error: null });
    } catch (error: any) {
      set({
        video: null,
        loading: false,
        error: error?.message || "Failed to fetch video",
      });
    }
  },
}));

export default selectedVideoStore;
