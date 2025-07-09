interface FilterPanelProps{
  setEvents: any;
  setObjects: any;
  selected: string;
  setSelected: any;
}

function FilterPanel({setEvents, setObjects, selected, setSelected}: FilterPanelProps){
  
  const handleEvents = () => {
    setEvents([]);
  }
  const handleObjects = () => {
    setObjects([]);
  }
  const handleSelected = (e: 'object'|'event') => {
    setSelected(e);
  }

  return (
    <div className="p-4 border-b bg-white flex flex-col gap-2">
      <div className="flex gap-2">
        <button
          className={
            selected === 'object'
              ? "px-3 py-1 bg-blue-500 text-white rounded"
              : "px-3 py-1 bg-gray-200 text-black rounded"
          }
          onClick={() => handleSelected('object')}
        >
          객체
        </button>
        <button
          className={
            selected === 'event'
              ? "px-3 py-1 bg-blue-500 text-white rounded"
              : "px-3 py-1 bg-gray-200 text-black rounded"
          }
          onClick={() => handleSelected('event')}
        >
          이벤트
        </button>
      </div>
      {selected === 'object' && (
        <div className="flex flex-col gap-2">
          <select className="border rounded px-1 py-1 flex-1">
            <option value="select">클래스를 선택하세요.</option>
            <option value="person">사람</option>
          </select>
          <input type='text' className="border rounded px-1 py-1 flex-1" placeholder='alias를 입력하세요.'/>
          <input type='text' className="border rounded px-1 py-1 flex-1" placeholder='키워드를 입력하세요.'/>
          <button className="px-3 py-1 bg-blue-500 text-white rounded" onClick={handleObjects}>검색</button>
        </div>
      )}
      {selected === 'event' && (
        <div className="flex flex-col gap-2"> 
          <select className="border rounded px-1 py-1 flex-1">
            <option value="select">이벤트를 선택하세요.</option>
            <option value="person">화재</option>
          </select>
          <input type='text' className="border rounded px-1 py-1 flex-1" placeholder='alias를 입력하세요.'/>
          <input type='text' className="border rounded px-1 py-1 flex-1" placeholder='키워드를 입력하세요.'/>
          <button className="px-3 py-1 bg-blue-500 text-white rounded" onClick={handleEvents}>검색</button>
        </div>
      )}
  
    </div>
  );
};

export default FilterPanel;
