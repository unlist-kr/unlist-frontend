import type { Metadata, Viewport } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const PRETENDARD_CSS =
  "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css";

export const metadata: Metadata = {
  title: "언리스트 Unlist — 노출된 내 사업 정보, 대신 지워드립니다",
  description:
    "기업정보 공개 사이트에 노출된 대표자 정보·사업장 주소·재무 추정치, 언리스트가 대신 삭제를 요청하고 재노출까지 매달 감시하는 월 구독형 정보 삭제 대행 서비스입니다.",
  keywords: [
    "기업정보 삭제",
    "개인사업자 정보 보호",
    "정보 노출 삭제 대행",
    "프라이버시",
  ],
  openGraph: {
    title: "언리스트 Unlist — 노출된 내 사업 정보, 대신 지워드립니다",
    description:
      "기업정보 공개 사이트에 흩어진 내 사업 정보를 대신 삭제 요청하고, 재노출까지 감시하는 월 구독 서비스.",
    locale: "ko_KR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="" />
        <link rel="stylesheet" href={PRETENDARD_CSS} />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
