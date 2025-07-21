"use client"

import detectedObjectStore from '@/store/detectedObjectStore';
import searchStore from '@/store/searchStore';

function FilterPanel() {
  const categoryName = searchStore(state => state.categoryName);
  const setCategoryName = searchStore(state => state.setCategoryName);
  const alias = searchStore(state => state.alias);
  const setAlias = searchStore(state => state.setAlias);
  const searchInput = searchStore(state => state.searchInput);
  const setSearchInput = searchStore(state => state.setSearchInput);
  const fetchDetectedObjects = detectedObjectStore(state => state.fetchDetectedObjects);

  const handleObjects = () => {
    fetchDetectedObjects(0, 5, categoryName, alias, searchInput);
  }

  return (
    <div className="p-3 border-b bg-white flex flex-col gap-2">
      <div className="flex gap-2">
        <button className={"px-3 py-1 bg-blue-500 text-white rounded"}>
          객체
        </button>
      </div>
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
    </div>
  );
}

export default FilterPanel;