import { create } from "zustand";

interface SearchStore {
  dateRange: [Date | null, Date | null];
  setDateRange: (range: [Date | null, Date | null]) => void;
  alias: string;
  setAlias: (alias: string) => void;
}

const searchStore = create<SearchStore>((set) => ({
  dateRange: [new Date(), new Date()],
  setDateRange: (range) => set({ dateRange: range }),
  alias: "",
  setAlias: (alias) => set({ alias: alias }),
}))

export default searchStore;