"use client"

import detectedObjectStore from '@/store/detectedObjectStore';
import searchStore from '@/store/searchStore';
import SearchButton from '../SearchButton';

function FilterPanel() {
  const alias = searchStore(state => state.alias);
  const setAlias = searchStore(state => state.setAlias);
  const fetchDetectedObjects = detectedObjectStore(state => state.fetchDetectedObjects);

  const handleObjects = () => {
    fetchDetectedObjects(0, 5, alias);
  }

  return (
    <div className="p-3 border-b bg-white flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <input
          type="text"
          className="border rounded px-1 py-1 flex-1"
          placeholder="alias를 입력하세요."
          value={alias}
          onChange={e => setAlias(e.target.value)}
        />
        <SearchButton handleObjects={handleObjects}></SearchButton>
      </div>
    </div>
  );
}

export default FilterPanel;