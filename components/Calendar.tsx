"use client";

import { useEffect, useState } from "react";
import { weddingInfo } from "@/lib/weddingInfo";

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

// Read the date parts straight from the ISO string so the calendar
// doesn't shift with the viewer's timezone.
const [year, month, weddingDay] = weddingInfo.dateTimeISO
  .slice(0, 10)
  .split("-")
  .map(Number);

function getMonthCells() {
  const firstWeekday = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  const cells: (number | null)[] = Array(firstWeekday).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  return cells;
}

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
      <p className="font-serif text-xs tracking-[0.3em] text-blossom-500">
        SAVE THE DATE
      </p>
      <p className="font-serif text-2xl leading-snug">
        {weddingInfo.dateLabel}
        <br />
        {weddingInfo.timeLabel}
      </p>

      <div className="mt-4 w-full max-w-xs border-y border-blossom-100 py-6">
        <p className="mb-4 font-serif text-lg text-blossom-600">{month}월</p>
        <div className="grid grid-cols-7 gap-y-2 text-sm">
          {WEEKDAYS.map((w, i) => (
            <span
              key={w}
              className={`pb-1 text-xs ${i === 0 ? "text-blossom-500" : "text-ink/50"}`}
            >
              {w}
            </span>
          ))}
          {getMonthCells().map((day, i) => {
            if (day === null) return <span key={`empty-${i}`} />;
            const isWeddingDay = day === weddingDay;
            const isSunday = i % 7 === 0;
            return (
              <span key={day} className="flex items-center justify-center">
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full ${
                    isWeddingDay
                      ? "bg-blossom-400 font-semibold text-white shadow-md"
                      : isSunday
                        ? "text-blossom-500"
                        : "text-ink/80"
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

      {dday !== null && (
        <p className="text-sm text-blossom-600">
          {dday > 0
            ? `D - ${dday}일`
            : dday === 0
              ? "바로 오늘입니다"
              : "축하해주셔서 감사합니다"}
        </p>
      )}
    </section>
  );
}
