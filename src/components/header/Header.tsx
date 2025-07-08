function CommonHeader() {
  return (
    <header className="header bg-white shadow border-[1px] border-[#b1b1b1]">
      <nav>
        <ul>
          <li className="flex space-x-10 px-6 py-3">
            <a href="/home" className="text-black hover:text-blue-200 font-semibold">Home</a>
            <a href="/camera" className="text-black hover:text-blue-200 font-semibold">Camera</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default CommonHeader;
