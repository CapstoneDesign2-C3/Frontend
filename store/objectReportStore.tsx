import { create } from "zustand";

type ObjectReportStore = {
  selectedIds: number[];
  toggleSelectedId: (id: number) => void;
  initSelectedIds: () => void;
  toggleAllOnCurrentPage: (allChecked: boolean, currentPageIds: number[]) => void;
};

const objectReportStore = create<ObjectReportStore>((set) => ({
  selectedIds: [],
  toggleSelectedId: (id) =>
    set((state) => ({
      selectedIds: state.selectedIds.includes(id)
        ? state.selectedIds.filter((i) => i !== id)
        : [...state.selectedIds, id],
    })),
  initSelectedIds: () =>
    set(() => ({
      selectedIds: [],
    })),
  toggleAllOnCurrentPage: (allChecked, currentPageIds) =>
    set((state) => ({
      selectedIds: allChecked
        ? state.selectedIds.filter((id) => !currentPageIds.includes(id))
        : Array.from(new Set([...state.selectedIds, ...currentPageIds])),
    })),
}));


export default objectReportStore;
