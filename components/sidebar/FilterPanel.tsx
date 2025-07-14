"use client"

import detectedObjectStore from '@/store/detectedObjectStore';
import searchStore from '@/store/searchStore';

function FilterPanel() {
  const {dateRange, setDateRange, 
    selected, setSelected, 
    categoryName, setCategoryName,
     videoName, setVideoName, 
    alias, setAlias, 
    searchInput, setSearchInput} = searchStore();
  
  const setDetectedObjects = detectedObjectStore(state => state.setDetectedObjects);

  const handleSelected = (e: "object" | "event") => {
    setCategoryName("");
    setVideoName("");
    setAlias("");
    setSearchInput("");
  };

  const handleObjects = () => {
    setDetectedObjects(categoryName, alias, searchInput);
  }

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
          <select className="border rounded px-1 py-1 flex-1" value={videoName} onChange={e => setVideoName(e.target.value)}>
            <option value="select">비디오를 선택하세요.</option>
            <option value="fire">화재</option>
          </select>
          <input type="text" className="border rounded px-1 py-1 flex-1" placeholder="alias를 입력하세요." value={alias} />
          <input type="text" className="border rounded px-1 py-1 flex-1" placeholder="키워드를 입력하세요." value={searchInput}/>
          <button className="px-3 py-1 bg-blue-500 text-white rounded"> 
            검색
          </button>
        </div>
      )}
    </div>
  );
}

export default FilterPanel;