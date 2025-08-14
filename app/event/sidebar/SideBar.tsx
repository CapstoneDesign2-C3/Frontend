import FilterPanel from "./FilterPanel";
import ListPanel from "./ListPanel";

function SideBar() {
  return (
    <div className="relative h-full">
      <div className="w-[300px] flex flex-col h-full">
        <FilterPanel />
        <ListPanel />
      </div>
    </div>
  );
}

export default SideBar;