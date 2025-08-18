import type { Metadata } from "next";
import SideBar from "../components/sidebar/Sidebar";
import "./globals.css";
import Header from "@/components/header/Header";

export const metadata: Metadata = {
  title: "하이퍼월",
  description: "Control-Automation",
  icons: {
    icon: "/icons/favicon.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="ko" className="h-screen w-full">
      <body className="h-screen w-full flex-col">
        <Header />
        <main className="h-[95vh] w-full flex">
          <SideBar />
          {children}
        </main>
      </body>
    </html>
  );
}
