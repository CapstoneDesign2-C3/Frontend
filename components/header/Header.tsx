import ChatbotButton from "@/components/ChatbotButton";

function CommonHeader() {
  return (
    <header
    style={{
      backgroundColor: "var(--first-color)",
      color: "var(--foreground)"
    }}>
      <nav>
        <ul>
          <li className="flex space-x-10 px-6 py-3 relative">
            <a href="/home" className="hover:text-blue-400">Home</a>
            <a href="/object" className="hover:text-blue-400">Object</a>
            <a href="/event" className="hover:text-blue-400">Event</a>
            <a href="/camera" className="hover:text-blue-400">Camera</a>
            <div className="relative group">
              <a
                href="#"
                className="hover:text-blue-400"
              >
                Report
              </a>
              <div className="absolute w-20 z-50 hidden group-hover:block"
                style={{
                  backgroundColor: "var(--first-color)",
                  color: "var(--foreground)",
                }}
              >
                <a href="/report/event" className="block py-2 text-center">Event</a>
                <a href="/report/object" className="block py-2 text-center">Object</a>
              </div>
            </div>
          </li>
        </ul>
      </nav>
      <ChatbotButton />
    </header>
  );
}

export default CommonHeader;
