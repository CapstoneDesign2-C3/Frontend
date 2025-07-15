"use client";

import detectedObjectStore from "@/store/detectedObjectStore";
import { useEffect, useState } from "react";

function Table() {
  const detectedObjects = detectedObjectStore(state => state.detectedObjects);
  const fetchDetectedObjects = detectedObjectStore(state => state.fetchDetectedObjects);
  const page = detectedObjectStore(state => state.page);
  const isLoading = detectedObjectStore(state => state.isLoading);
  const hasNext = detectedObjectStore(state => state.hasNext);

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const size = 5;
  const handlePrevPage = () => {
    if (page > 0) {
      fetchDetectedObjects(page - 1, size);
    }
  };

  const handleNextPage = () => {
    if (hasNext) {
      fetchDetectedObjects(page + 1, size);
    }
  };

  useEffect(() => {
    fetchDetectedObjects(0, size);
  }, []);

  const toggleCheckbox = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
  const currentPageIds = detectedObjects.map((obj) => obj.detectedObjectId);
  const allChecked = currentPageIds.every((id) => selectedIds.includes(id));

  if (allChecked) {
    setSelectedIds((prev) =>
      prev.filter((id) => !currentPageIds.includes(id))
    );
  } else {
    setSelectedIds((prev) => Array.from(new Set([...prev, ...currentPageIds])));
  }
};

  return (
    <div className="p-4">
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2 text-left w-10">
              <input
                type="checkbox"
                onChange={toggleAll}
                checked={
                  selectedIds.length > 0 &&
                  selectedIds.length === detectedObjects.length
                }
              />
            </th>
            <th className="border p-2 text-center">ID</th>
            <th className="border p-2 text-center">class</th>
            <th className="border p-2 text-center">crop</th>
            <th className="border p-2 text-center">별칭</th>
            <th className="border p-2 text-center">특징</th>
          </tr>
        </thead>
        <tbody>
          {detectedObjects.map((obj) => (
            <tr key={obj.detectedObjectId} className="border-t hover:bg-gray-50">
              <td className="border p-2">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(obj.detectedObjectId)}
                  onChange={() => toggleCheckbox(obj.detectedObjectId)}
                />
              </td>
              <td className="border p-2 text-center">{obj.detectedObjectId}</td>
              <td className="border p-2 text-center">{obj.categoryName}</td>
              <td className="border p-2 text-center">
                <img
                  src={obj.cropImgUrl}
                  alt="crop"
                  className="w-16 h-16 object-cover rounded inline-block"
                />
              </td>
              <td className="border p-2 text-center">{obj.alias ?? "이름 없음"}</td>
              <td className="border p-2 text-center">{obj.feature}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center justify-center gap-x-2">
        <button
          onClick={handlePrevPage}
          disabled={page === 0 || isLoading}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          이전
        </button>
        <span className="text-sm text-gray-600">페이지 {page + 1}</span>
        <button
          onClick={handleNextPage}
          disabled={!hasNext || isLoading}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          다음
        </button>
      </div>
    </div>
  );
}

export default Table;
