import FilterPanel from "./FilterPanel";
import ObjectList from "./ObjectList";

type Object = {
  id: number,
  categoryName: string,
  cropImageUrl: string,
  alias: string | null,
  feature: string
};

type Event = {
  id: number;
  object_id: number;
  title: string;
  thumbnailUrl: string;
  videoUrl: string;
  desc: string;
  time: string;
  latitudeY: number;
  longitudeX: number;
};

interface SideBarProps {
  objects: Object[];
  events: Event[];
  setSelectedEvents: any;
  setObjects: any;
  setEvents: any;
};


//
function SideBar({objects, events, setSelectedEvents, setObjects, setEvents}: SideBarProps) {
  return (
    <div className="relative h-full">
      <div className="w-[300px] bg-white border-l flex flex-col h-full">
        <FilterPanel setObjects={setObjects} setEvents={setEvents}/>
        <div className="overflow-y-auto">
          <ObjectList setSelectedEvents={setSelectedEvents} objects={objects} events={events}/>
        </div>
      </div>
    </div>
  );
}

export default SideBar;