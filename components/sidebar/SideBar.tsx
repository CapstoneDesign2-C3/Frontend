import { useState } from "react";
import FilterPanel from "./FilterPanel";
import ListPanel from "./ListPanel";

type Object = {
  detectedObjectId: number,
  categoryName: string,
  cropImgUrl: string,
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
  startDate: Date;
  endDate: Date;
  setTracks: any;
  setObjects: any;
  setEvents: any;
};


//
function SideBar({objects, events, startDate, endDate, setTracks, setObjects, setEvents}: SideBarProps) {
  const [selected, setSelected] = useState<'object' | 'event'>('object');

  return (
    <div className="relative h-full">
      <div className="w-[300px] bg-white border-l flex flex-col h-full">
        <FilterPanel setObjects={setObjects} setEvents={setEvents} selected={selected} setSelected={setSelected}/>
        <ListPanel 
        setTracks={setTracks} 
        objects={objects} 
        events={events} 
        startDate={startDate} 
        endDate={endDate} 
        selected={selected}
        />
      </div>
    </div>
  );
}

export default SideBar;