"use client";

import { useEffect, useState } from "react";
import { weddingInfo } from "@/lib/weddingInfo";
import { weddingDate } from "@/lib/weddingDate";

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];
const { year, month, day: weddingDay } = weddingDate;

function getMonthCells() {
  const firstWeekday = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  const cells: (number | null)[] = Array(firstWeekday).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  return cells;
}

type Remaining = { days: number; hours: number; minutes: number; seconds: number };

function getRemaining(): Remaining {
  const diff = Math.max(0, new Date(weddingInfo.dateTimeISO).getTime() - Date.now());
  const s = Math.floor(diff / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

function Countdown() {
  const [remaining, setRemaining] = useState<Remaining | null>(null);

  useEffect(() => {
    setRemaining(getRemaining());
    const id = setInterval(() => setRemaining(getRemaining()), 1000);
    return () => clearInterval(id);
  }, []);

  const units: [keyof Remaining, string][] = [
    ["days", "Days"],
    ["hours", "Hours"],
    ["minutes", "Minutes"],
    ["seconds", "Seconds"],
  ];

  return (
    <div className="flex flex-col items-center gap-10 px-6 pt-20">
      <p className="flex items-center gap-2 text-[19px] font-normal text-ink/90">
        {weddingInfo.groom.firstName}
        <span className="text-[17px] text-ink">♥</span>
        {weddingInfo.bride.firstName}
        <span className="ml-1">결혼식까지</span>
      </p>
      <div className="grid w-full grid-cols-4 gap-3">
        {units.map(([key, label]) => (
          <div key={key} className="flex flex-col items-center gap-2">
            <span className="flex aspect-square w-full max-w-[68px] items-center justify-center rounded-full bg-sage-600 text-[22px] font-normal tabular-nums text-white shadow-md">
              {remaining ? remaining[key] : "-"}
            </span>
            <span className="text-[13px] text-ink/70">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Calendar() {
  return (
    <section className="py-20">
      <h2 className="px-6 text-[34px] font-light leading-[1.45] tracking-wider text-sage-600">
        {weddingDate.poeticLines[0]}
        <br />
        {weddingDate.poeticLines[1]}
      </h2>

      <div className="mx-4 mt-8 border-y-[3px] border-sage-600 pb-6 pt-4">
        <div className="grid grid-cols-7 text-center">
          {WEEKDAYS.map((w) => (
            <span key={w} className="py-3 text-[16px] font-medium text-ink">
              {w}
            </span>
          ))}
          {getMonthCells().map((day, i) => {
            if (day === null) return <span key={`empty-${i}`} />;
            const isWeddingDay = day === weddingDay;
            return (
              <span key={day} className="flex h-14 items-center justify-center">
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-[16px] ${
                    isWeddingDay ? "bg-sage-600 font-normal text-white shadow-sm" : "text-ink/85"
                  }`}
                  aria-label={isWeddingDay ? `${month}월 ${day}일 결혼식` : undefined}
                >
                  {day}
                </span>
              </span>
            );
          })}
        </div>
      </div>

      <Countdown />
    </section>
  );
}
