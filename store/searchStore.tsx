import { create } from "zustand";

interface SearchStore {
  dateRange: [Date | null, Date | null];
  setDateRange: (range: [Date | null, Date | null]) => void;
  selected: "object" | "event";
  setSelected: (selected: "object" | "event") => void;
  categoryName: string;
  setCategoryName: (categoryName: string) => void;
  videoName: string;
  setVideoName: (videoName: string) => void;
  alias: string;
  setAlias: (alias: string) => void;
  searchInput: string;
  setSearchInput: (searchInput: string) => void;
}

const searchStore = create<SearchStore>((set) => ({
  dateRange: [new Date(), new Date()],
  setDateRange: (range) => set({ dateRange: range }),
  selected: "object",
  setSelected: (selected) => set({ selected: selected }),
  categoryName: "",
  setCategoryName: (categoryName) => set({ categoryName: categoryName }),
  videoName: "",
  setVideoName: (videoName) => set({ videoName: videoName }),
  alias: "",
  setAlias: (alias) => set({ alias: alias }),
  searchInput: "",
  setSearchInput: (searchInput) => set({ searchInput: searchInput })
}))

export default searchStore;