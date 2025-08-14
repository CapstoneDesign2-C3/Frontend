import FilterPanel from "./FilterPanel";
import ListPanel from "./ListPanel";

function SideBar() {
  return (
    <div className="relative w-[300px] flex flex-col h-full">
      <FilterPanel />
      <ListPanel />
    </div>
  );
}

export default SideBar;