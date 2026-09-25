"use client";

import { useCallback, useEffect, useState } from "react";
import { weddingInfo } from "@/lib/weddingInfo";
import BottomSheet from "@/components/BottomSheet";
import RsvpForm from "@/components/RsvpForm";

const PROMPT_DELAY_MS = 1200;
const HIDDEN_UNTIL_KEY = "rsvp-prompt-hidden-until";
const SUBMITTED_KEY = "rsvp-submitted";

function readStorage(key: string) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Storage can be unavailable (private mode); the prompt just shows again next visit.
  }
}

export default function Rsvp() {
  const [promptOpen, setPromptOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    if (readStorage(SUBMITTED_KEY)) return;
    const hiddenUntil = Number(readStorage(HIDDEN_UNTIL_KEY));
    if (hiddenUntil && Date.now() < hiddenUntil) return;
    const t = setTimeout(() => setPromptOpen(true), PROMPT_DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  const closePrompt = useCallback(() => setPromptOpen(false), []);
  const closeForm = useCallback(() => setFormOpen(false), []);
  const markSubmitted = useCallback(() => writeStorage(SUBMITTED_KEY, "1"), []);

  const hideForToday = () => {
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    writeStorage(HIDDEN_UNTIL_KEY, String(midnight.getTime()));
    setPromptOpen(false);
  };

  const openForm = () => {
    setPromptOpen(false);
    setFormOpen(true);
  };

  return (
    <section className="flex flex-col items-center gap-4 bg-blossom-50 px-6 py-16 text-center">
      <p className="font-serif text-xs tracking-[0.3em] text-blossom-500">R.S.V.P</p>
      <p className="text-sm leading-relaxed text-ink/70">
        참석 여부를 미리 알려주시면
        <br />
        정성껏 준비하겠습니다.
      </p>
      <button
        type="button"
        onClick={openForm}
        className="mt-2 w-full rounded-full border-2 border-blossom-400 bg-white py-3 text-sm font-medium text-blossom-700"
      >
        참석의사 전달하기
      </button>

      <BottomSheet open={promptOpen} onClose={closePrompt} label="참석 의사 전달 안내">
        <div className="text-center">
          <p className="font-serif text-xs tracking-[0.3em] text-blossom-500">R.S.V.P</p>
          <h2 className="mt-2 text-lg font-medium">참석 의사 전달</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink/70">
            축하의 마음으로 참석해주시는 모든 분들을
            <br />
            귀하게 모실 수 있도록
            <br />
            참석 여부를 미리 알려주시면 감사하겠습니다.
          </p>
        </div>

        <dl className="mt-5 grid grid-cols-[3rem_1fr] gap-y-2 rounded-xl bg-blossom-50 px-5 py-4 text-left text-sm">
          <dt className="text-ink/50">일시</dt>
          <dd>
            {weddingInfo.dateLabel} {weddingInfo.timeLabel}
          </dd>
          <dt className="text-ink/50">장소</dt>
          <dd>{weddingInfo.venue.name}</dd>
        </dl>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={hideForToday}
            className="rounded-full bg-ink/5 py-3 text-sm text-ink/60"
          >
            오늘 하루 보지 않기
          </button>
          <button
            type="button"
            onClick={openForm}
            className="rounded-full border-2 border-blossom-400 py-3 text-sm font-medium text-blossom-700"
          >
            참석의사 전달하기
          </button>
        </div>
      </BottomSheet>

      <BottomSheet open={formOpen} onClose={closeForm} label="참석 의사 전달하기">
        <RsvpForm onSubmitted={markSubmitted} onClose={closeForm} />
      </BottomSheet>
    </section>
  );
}
