import axios from 'axios';
import { useState } from 'react';

interface FilterPanelProps{
  setEvents: any;
  setObjects: any;
  selected: string;
  setSelected: any;
}

interface FilterPanelProps {
  setEvents: any;
  setObjects: any;
  selected: string;
  setSelected: any;
}

function FilterPanel({ setEvents, setObjects, selected, setSelected }: FilterPanelProps) {
  // 각 입력값을 위한 상태
  const [categoryName, setCategoryName] = useState<string>("");
  const [eventName, setEventName] = useState<string>("");
  const [alias, setAlias] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");

  const handleEvents = () => {
    setEvents([]);
  };

  const handleObjects = async () => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await axios.get(`${backendUrl}/api/v1/detected-object`, {
        params: {
          categoryName: categoryName || undefined, // 값이 없으면 undefined로
          alias: alias || undefined,
          searchInput: searchInput || undefined,
        },
      });
      setObjects(response.data);
    } catch (error) {
      console.error("오브젝트 데이터를 불러오지 못했습니다.", error);
    }
  };

  const handleSelected = (e: "object" | "event") => {
    setSelected(e);
    setCategoryName("");
    setEventName("");
    setAlias("");
    setSearchInput("");
  };

  return (
    <div className="p-3 border-b bg-white flex flex-col gap-2">
      <div className="flex gap-2">
        <button
          className={
            selected === "object"
              ? "px-3 py-1 bg-blue-500 text-white rounded"
              : "px-3 py-1 bg-gray-200 text-black rounded"
          }
          onClick={() => handleSelected("object")}
        >
          객체
        </button>
        <button
          className={
            selected === "event"
              ? "px-3 py-1 bg-blue-500 text-white rounded"
              : "px-3 py-1 bg-gray-200 text-black rounded"
          }
          onClick={() => handleSelected("event")}
        >
          이벤트
        </button>
      </div>
      {selected === "object" && (
        <div className="flex flex-col gap-2 pr-3">
          <select className="border rounded px-1 py-1 flex-1" value={categoryName} onChange={e => setCategoryName(e.target.value)}>
            <option value="">클래스를 선택하세요.</option>
            <option value="person">사람</option>
            <option value="car">자동차</option>
          </select>
          <input
            type="text"
            className="border rounded px-1 py-1 flex-1"
            placeholder="alias를 입력하세요."
            value={alias}
            onChange={e => setAlias(e.target.value)}
          />
          <input
            type="text"
            className="border rounded px-1 py-1 flex-1"
            placeholder="키워드를 입력하세요."
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
          />
          <button className="px-3 py-1 bg-blue-500 text-white rounded" onClick={handleObjects}>
            검색
          </button>
        </div>
      )}
      {selected === "event" && (
        <div className="flex flex-col gap-2 pr-3">
          <select className="border rounded px-1 py-1 flex-1" value={eventName} onChange={e => setEventName(e.target.value)}>
            <option value="select">이벤트를 선택하세요.</option>
            <option value="fire">화재</option>
          </select>
          <input type="text" className="border rounded px-1 py-1 flex-1" placeholder="alias를 입력하세요." value={alias} />
          <input type="text" className="border rounded px-1 py-1 flex-1" placeholder="키워드를 입력하세요." value={searchInput}/>
          <button className="px-3 py-1 bg-blue-500 text-white rounded" onClick={handleEvents}>
            검색
          </button>
        </div>
      )}
    </div>
  );
}

export default FilterPanel;
