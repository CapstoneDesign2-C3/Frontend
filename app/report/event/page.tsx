"use client"

import axios from "axios";
import { useState } from "react";


function EventReportPage() {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleCreateReport = async () => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const author = window.prompt("작성자 이름을 입력하세요.");
    if (!author) return;
    if (!startTime || !endTime) {
      alert("시작·종료 시간을 모두 입력하세요.");
      return;
    }
    try {
      const response = await axios.post(
        `${backendUrl}/api/v1/report/create-event`,
        {
          startTime: startTime,
          endTime: endTime,
          author: author,
        },
        {
          headers: { "Content-Type": "application/json" },
          responseType: "blob",
        }
      );

      const contentDisposition = response.headers["content-disposition"];
      let fileName = "report.hwp";
      if (contentDisposition) {
        const matches = /filename="?([^"]+)"?/.exec(contentDisposition);
        if (matches && matches[1]) {
          fileName = decodeURIComponent(matches[1]);
        }
      }
      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("파일 다운로드 중 오류 발생:", error);
    }
  };

  return (
    <div className="flex-1">
      <div className="flex flex-col gap-3 max-w-xs mx-auto mt-6">
        <label>
          시작 시간
          <input
            type="datetime-local"
            value={startTime}
            onChange={e => setStartTime(e.target.value)}
            className="block border p-1 rounded w-full"
          />
        </label>
        <label>
          종료 시간
          <input
            type="datetime-local"
            value={endTime}
            onChange={e => setEndTime(e.target.value)}
            className="block border p-1 rounded w-full"
          />
        </label>
        <div className="flex justify-end">
          <button
            className="px-3 py-1 bg-gray-200 rounded white-component"
            onClick={handleCreateReport}
          >
            보고서 작성
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventReportPage;