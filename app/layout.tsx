import type { Metadata } from "next";
import CommonHeader from "../components/header/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hiperwall",
  description: "Control-Automation",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="ko">
      <body>
        <CommonHeader />
        {children}
      </body>
    </html>
  );
}
