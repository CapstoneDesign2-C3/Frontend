import Table from "@/components/table/table";

function ReportPage() {
  return(
    <div className="flex-1">
      <div className="flex justify-end">
        <button className="px-3 py-1 bg-gray-200 rounded">
          보고서 작성
        </button>
      </div>
      <Table />
    </div>
  );
}

export default ReportPage;