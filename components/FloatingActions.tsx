"use client";

import { useEffect, useState } from "react";
import { weddingInfo } from "@/lib/weddingInfo";

const SHOW_AFTER_PX = 400;

const circleClass =
  "flex h-12 w-12 items-center justify-center rounded-full bg-ink/20 text-white shadow-md backdrop-blur-sm transition-opacity duration-300";

export default function FloatingActions() {
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const share = async () => {
    const data = {
      title: document.title,
      text: `${weddingInfo.dateLabel} ${weddingInfo.timeLabel}`,
      url: location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(data);
        return;
      }
      await navigator.clipboard.writeText(data.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // The user dismissed the share sheet, or the clipboard is unavailable.
    }
  };

  return (
    <div
      className={`fixed bottom-6 right-[max(1rem,calc((100vw-28rem)/2+1rem))] z-40 flex flex-col items-center gap-3 ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      } transition-opacity duration-300`}
    >
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="맨 위로"
        className={circleClass}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path d="M6 15l6-6 6 6" />
        </svg>
      </button>
      <button
        type="button"
        onClick={share}
        aria-label="공유하기"
        className={`${circleClass} relative`}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" stroke="currentColor" strokeWidth="1.8" />
        </svg>
        {copied && (
          <span className="absolute right-14 whitespace-nowrap rounded bg-ink/80 px-2 py-1 text-xs text-white">
            링크 복사됨
          </span>
        )}
      </button>
    </div>
  );
}
