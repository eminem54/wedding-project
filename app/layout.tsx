import type { Metadata } from "next";
import {
  Bodoni_Moda,
  Cormorant_Garamond,
  Gowun_Batang,
  Noto_Sans_KR,
  Noto_Serif_KR,
  Pinyon_Script,
} from "next/font/google";
import "./globals.css";
import { weddingInfo } from "@/lib/weddingInfo";
import BackgroundMusic from "@/components/BackgroundMusic";
import FloatingActions from "@/components/FloatingActions";

const notoSans = Noto_Sans_KR({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const notoSerif = Noto_Serif_KR({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const script = Pinyon_Script({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
});

const garamond = Cormorant_Garamond({
  variable: "--font-garamond",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  weight: ["400", "700"],
  // next/font has no fallback metrics for Bodoni Moda and logs an error without this.
  adjustFontFallback: false,
});

// Soft brush-like serif for the couple's names on the cover.
const gowun = Gowun_Batang({
  variable: "--font-gowun",
  subsets: ["latin"],
  weight: "400",
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
  const fontVars = [notoSans, notoSerif, script, garamond, bodoni, gowun]
    .map((f) => f.variable)
    .join(" ");
  return (
    <html lang="ko" className={fontVars}>
      <body className="min-h-screen bg-paper-dark font-sans font-light text-ink antialiased">
        <div className="paper-texture mx-auto min-h-screen w-full max-w-md overflow-x-hidden shadow-xl">
          {children}
        </div>
        <BackgroundMusic />
        <FloatingActions />
      </body>
    </html>
  );
}
