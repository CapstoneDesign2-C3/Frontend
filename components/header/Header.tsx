import ChatbotButton from "@/components/ChatbotButton";
import Link from "next/link";

function Header() {
  return (
    <header className="h-[5vh] bg-[var(--first-color)] flex items-center justify-between px-4">
      <div className="flex items-center gap-2">
        <Link href="/">
          <img src="/icons/logo.png" alt="Hiperwall 로고" style={{ cursor: "pointer" }} className="h-[4vh]"/>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <span className="text-red-500 text-xl">●</span>
          <span className="text-sm text-gray-300">
            최근접속: 2025-06-27 16:33 (192.168.0.80)
          </span>
        </div>
        <span className="text-sm text-gray-300">관리자</span>
        <button className="bg-blue-500 hover:bg-blue-600 text-white rounded px-3 py-1 text-sm">
          로그아웃
        </button>
        <ChatbotButton />
      </div>
    </header>
  );
}

export default Header;
