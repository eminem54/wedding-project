import type { Metadata } from "next";
import { Noto_Sans_KR, Noto_Serif_KR } from "next/font/google";
import "./globals.css";
import { weddingInfo } from "@/lib/weddingInfo";

const notoSans = Noto_Sans_KR({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const notoSerif = Noto_Serif_KR({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: `${weddingInfo.groom.name} ♥ ${weddingInfo.bride.name} 결혼합니다`,
  description: `${weddingInfo.dateLabel} ${weddingInfo.timeLabel} | ${weddingInfo.venue.name}`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${notoSans.variable} ${notoSerif.variable}`}>
      <body className="min-h-screen bg-blossom-50 font-sans text-ink antialiased">
        <div className="mx-auto min-h-screen w-full max-w-md bg-white shadow-xl">
          {children}
        </div>
      </body>
    </html>
  );
}
