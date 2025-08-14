"use client"

import Table from "@/components/table/table";
import objectReportStore from "@/store/objectReportStore";
import axios from "axios";


function ObjectReportPage() {
  const selectedIds = objectReportStore(state => state.selectedIds);

  const handleCreateReport = async () => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const author = window.prompt("작성자 이름을 입력하세요.");
    if (!author) return;
    try {
      const response = await axios.post(
        `${backendUrl}/api/v1/report/create-mobile-object-track`,
        {
          mobileObjectIds: selectedIds,
          author: author
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

      const blob = new Blob([response.data], { type: response.headers["content-type"] });

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
      <div className="flex justify-end">
        <button
          className="px-3 py-1 mx-4 my-2 white-component rounded"
          onClick={handleCreateReport}
          disabled={selectedIds.length === 0} // 선택된 ID 없으면 비활성화 가능
        >
          보고서 작성
        </button>
      </div>
      <Table />
    </div>
  );
}


export default ObjectReportPage;