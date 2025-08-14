import type { Metadata } from "next";
import CommonHeader from "../components/header/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hiperwall",
  description: "Control-Automation",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="ko" className="h-full w-full">
      <body className="h-full w-full m-0 p-0 flex flex-col">
        <CommonHeader />
        {children}
      </body>
    </html>
  );
}
