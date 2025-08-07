import ChatbotButton from "@/components/ChatbotButton";

function CommonHeader() {
  return (
    <header className="bg-white shadow border-[1px] border-[#b1b1b1]">
      <nav>
        <ul>
          <li className="flex space-x-10 px-6 py-3 relative">
            <a href="/home" className="text-black hover:text-blue-400 font-semibold">Home</a>
            <a href="/object" className="text-black hover:text-blue-400 font-semibold">Object</a>
            <a href="/event" className="text-black hover:text-blue-400 font-semibold">Event</a>
            <a href="/camera" className="text-black hover:text-blue-400 font-semibold">Camera</a>
            <div className="relative group">
              <a
                href="#"
                className="text-black hover:text-blue-400 font-semibold"
              >
                Report
              </a>
              <div
                className="
                  absolute w-40 bg-white border rounded shadow-lg z-50
                  hidden group-hover:block
                "
              >
                <a
                  href="/report/event"
                  className="block px-4 py-2 text-black hover:bg-gray-100"
                >
                  Event
                </a>
                <a
                  href="/report/object"
                  className="block px-4 py-2 text-black hover:bg-gray-100"
                >
                  Object
                </a>
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
