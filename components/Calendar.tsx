"use client";

import { useEffect, useState } from "react";
import { weddingInfo } from "@/lib/weddingInfo";

function getDday() {
  const target = new Date(weddingInfo.dateTimeISO).getTime();
  const now = Date.now();
  return Math.ceil((target - now) / (1000 * 60 * 60 * 24));
}

export default function Calendar() {
  const [dday, setDday] = useState<number | null>(null);

  useEffect(() => {
    setDday(getDday());
  }, []);

  return (
    <section className="flex flex-col items-center gap-4 px-6 py-16 text-center">
      <p className="font-serif text-xs tracking-[0.3em] text-blossom-500">SAVE THE DATE</p>
      <p className="font-serif text-2xl">{weddingInfo.dateLabel}</p>
      {dday !== null && (
        <p className="text-sm text-blossom-600">
          {dday > 0 ? `결혼식까지 ${dday}일` : dday === 0 ? "바로 오늘입니다" : "축하해주셔서 감사합니다"}
        </p>
      )}
    </section>
  );
}
