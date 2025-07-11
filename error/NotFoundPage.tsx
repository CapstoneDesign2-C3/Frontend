import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">404 NOT FOUND</h1>
      <p className="text-lg text-gray-600 mb-6">페이지를 찾을 수 없습니다.</p>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        onClick={() => navigate(-1)}
      >
        ← 이전 페이지로 이동
      </button>
    </div>
  );
}

export default NotFoundPage;
