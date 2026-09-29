"use client";

import { useCallback, useEffect, useState } from "react";
import { weddingInfo } from "@/lib/weddingInfo";
import { lockScroll, unlockScroll } from "@/lib/scrollLock";
import { SectionTitle, primaryButtonClass } from "@/components/SectionTitle";

const ANIMATION_MS = 300;

const speakers = {
  groom: { emoji: "🤵🏻", name: weddingInfo.groom.firstName },
  bride: { emoji: "👰🏻", name: weddingInfo.bride.firstName },
};

function InterviewPage({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [mounted, setMounted] = useState(open);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (open) {
      setMounted(true);
      let inner = 0;
      const outer = requestAnimationFrame(() => {
        inner = requestAnimationFrame(() => setShown(true));
      });
      return () => {
        cancelAnimationFrame(outer);
        cancelAnimationFrame(inner);
      };
    }
    setShown(false);
    const t = setTimeout(() => setMounted(false), ANIMATION_MS);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!mounted) return;
    lockScroll();
    return unlockScroll;
  }, [mounted]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!mounted) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="웨딩 인터뷰"
      className={`paper-texture fixed inset-y-0 left-1/2 z-50 flex text-left w-full max-w-md -translate-x-1/2 flex-col transition-all duration-300 ease-out ${
        shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      <header className="relative flex h-16 shrink-0 items-center justify-center border-b border-ink/5 shadow-[0_2px_6px_rgba(0,0,0,0.05)]">
        <h2 className="text-[19px] font-normal text-ink/85">웨딩 인터뷰</h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="닫기"
          className="absolute right-4 flex h-10 w-10 items-center justify-center text-ink/60"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
          >
            <path d="M5 5l14 14M19 5L5 19" />
          </svg>
        </button>
      </header>

      <div className="flex-1 overflow-y-auto">
        {weddingInfo.interview.map((item, i) => (
          <article
            key={item.question}
            className="border-b border-dashed border-ink/15 px-6 py-10 last:border-none"
          >
            <h3 className="text-[17px] font-medium text-sage-700">
              {i + 1}.{item.question}
            </h3>
            <div className="mt-6 space-y-8">
              {item.answers.map((answer, j) => (
                <div key={j} className="text-[16px] leading-[1.9] text-ink/85">
                  {answer.who && (
                    <p>
                      <span className="mr-0.5">{speakers[answer.who].emoji}</span>
                      {speakers[answer.who].name}
                    </p>
                  )}
                  <p className="whitespace-pre-line break-keep">{answer.text}</p>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default function Interview() {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <section className="flex flex-col items-center gap-10 px-6 py-20 text-center">
      <SectionTitle>웨딩 인터뷰</SectionTitle>
      <p className="text-[16px] leading-8 text-ink/85">
        두 분의 인터뷰를 준비했습니다.
        <br />
        인터뷰를 확인해보세요.
      </p>
      <button type="button" onClick={() => setOpen(true)} className={`${primaryButtonClass} w-48`}>
        인터뷰 읽어보기
      </button>
      <InterviewPage open={open} onClose={close} />
    </section>
  );
}
