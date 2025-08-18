"use client"

import { usePathname } from 'next/navigation';

const menuItems = [
  { href: "/home", icon: "/icons/stat.png", text: "통계" },
  { href: "/object", icon: "/icons/object.png", text: "객체추적" },
  { href: "/event", icon: "/icons/event.png", text: "감지내역" },
  { href: "/camera", icon: "/icons/camera.png", text: "카메라" },
  { href: "/report/event", icon: "/icons/report.png", text: <>객체<br />보고서 </>},
  { href: "/report/object", icon: "/icons/report.png", text: <>이벤트<br />보고서</> },
];

function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="
        w-[7vh] h-full bg-[var(--first-color)] text-[var(--foreground)]
        flex flex-col items-start left-0 top-0 z-50
      "
    >
      <nav className="w-full">
        <ul>
          {menuItems.map(item => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href} className="mb-2">
                <a
                  href={item.href}
                  className={`
                    flex flex-col items-center py-2
                    ${isActive ? "bg-[#34394e]" : "hover:bg-[#34394e]"}
                  `}
                >
                  <img
                    src={item.icon}
                    alt="로딩 실패"
                    className="w-8 h-8 mb-1"
                    style={isActive ? { filter: "brightness(1.5)" } : {}}
                  />
                  <span className="text-xs text-center">
                    {item.text}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
