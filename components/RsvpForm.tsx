"use client";

import { useState } from "react";
import {
  MESSAGE_MAX_LENGTH,
  submitRsvp,
  type RsvpMeal,
  type RsvpSide,
} from "@/lib/rsvp";
import { Field, inputClass } from "@/components/FormField";

const NAME_MAX_LENGTH = 20;
const PHONE_MAX_LENGTH = 20;
const MAX_HEADCOUNT = 10;

function Choice<T extends string | boolean>({
  options,
  value,
  onChange,
}: {
  options: { label: string; value: T }[];
  value: T | null;
  onChange: (value: T) => void;
}) {
  return (
    <div
      className="grid gap-2"
      style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}
    >
      {options.map((o) => {
        const selected = value === o.value;
        return (
          <button
            key={String(o.value)}
            type="button"
            onClick={() => onChange(o.value)}
            aria-pressed={selected}
            className={`rounded-lg border py-2.5 text-sm transition-colors ${
              selected
                ? "border-blossom-400 bg-blossom-50 font-medium text-blossom-700"
                : "border-ink/10 text-ink/60"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

type Props = {
  onSubmitted: () => void;
  onClose: () => void;
};

export default function RsvpForm({ onSubmitted, onClose }: Props) {
  const [side, setSide] = useState<RsvpSide | null>(null);
  const [attending, setAttending] = useState<boolean | null>(null);
  const [name, setName] = useState("");
  const [headcount, setHeadcount] = useState(1);
  const [meal, setMeal] = useState<RsvpMeal | null>(null);
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");

  const canSubmit =
    side !== null &&
    attending !== null &&
    name.trim() !== "" &&
    (!attending || meal !== null) &&
    status !== "submitting";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setStatus("submitting");
    try {
      await submitRsvp({
        side,
        attending,
        name: name.trim(),
        headcount: attending ? headcount : null,
        meal: attending ? meal : null,
        phone: phone.trim() || null,
        message: message.trim() || null,
      });
      setStatus("done");
      onSubmitted();
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div className="flex flex-col items-center gap-3 py-6 text-center">
        <p className="font-serif text-xs tracking-[0.3em] text-blossom-500">THANK YOU</p>
        <p className="text-lg font-medium">소중한 답변 감사합니다</p>
        <p className="text-sm text-ink/60">전해주신 마음 잘 받았습니다.</p>
        <button
          type="button"
          onClick={onClose}
          className="mt-4 w-full rounded-full bg-blossom-500 py-3.5 text-sm font-medium text-white"
        >
          닫기
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 text-left">
      <div className="text-center">
        <p className="font-serif text-xs tracking-[0.3em] text-blossom-500">R.S.V.P</p>
        <h2 className="mt-2 text-lg font-medium">참석 의사 전달하기</h2>
      </div>

      <Field label="어느 측 하객이신가요?">
        <Choice
          options={[
            { label: "신랑측", value: "groom" as const },
            { label: "신부측", value: "bride" as const },
          ]}
          value={side}
          onChange={setSide}
        />
      </Field>

      <Field label="참석 여부">
        <Choice
          options={[
            { label: "참석할게요", value: true },
            { label: "참석이 어려워요", value: false },
          ]}
          value={attending}
          onChange={setAttending}
        />
      </Field>

      <Field label="성함">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={NAME_MAX_LENGTH}
          placeholder="성함을 입력해주세요"
          autoComplete="name"
          className={inputClass}
        />
      </Field>

      {attending && (
        <>
          <Field label="동행 인원 (본인 포함)">
            <div className="flex items-center justify-between rounded-lg border border-ink/10 px-2 py-1.5">
              <button
                type="button"
                onClick={() => setHeadcount((n) => Math.max(1, n - 1))}
                disabled={headcount <= 1}
                aria-label="인원 줄이기"
                className="h-9 w-9 rounded-full text-xl text-blossom-600 disabled:text-ink/20"
              >
                −
              </button>
              <span className="text-base">{headcount}명</span>
              <button
                type="button"
                onClick={() => setHeadcount((n) => Math.min(MAX_HEADCOUNT, n + 1))}
                disabled={headcount >= MAX_HEADCOUNT}
                aria-label="인원 늘리기"
                className="h-9 w-9 rounded-full text-xl text-blossom-600 disabled:text-ink/20"
              >
                +
              </button>
            </div>
          </Field>

          <Field label="식사 여부">
            <Choice
              options={[
                { label: "예정", value: "yes" as const },
                { label: "안 함", value: "no" as const },
                { label: "미정", value: "undecided" as const },
              ]}
              value={meal}
              onChange={setMeal}
            />
          </Field>
        </>
      )}

      <Field label="연락처 (선택)">
        <input
          type="tel"
          inputMode="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/[^\d-]/g, ""))}
          maxLength={PHONE_MAX_LENGTH}
          placeholder="010-0000-0000"
          autoComplete="tel"
          className={inputClass}
        />
      </Field>

      <Field label="전달사항 (선택)">
        <div className="relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={MESSAGE_MAX_LENGTH}
            placeholder="짧은 메시지를 남겨주세요"
            className={`${inputClass} pr-14`}
          />
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-ink/40">
            {message.length}/{MESSAGE_MAX_LENGTH}
          </span>
        </div>
      </Field>

      {status === "error" && (
        <p className="text-center text-sm text-blossom-600">
          전송에 실패했어요. 잠시 후 다시 시도해주세요.
        </p>
      )}

      <button
        type="submit"
        disabled={!canSubmit}
        className="w-full rounded-full bg-blossom-500 py-3.5 text-sm font-medium text-white transition-opacity disabled:opacity-40"
      >
        {status === "submitting" ? "전송 중..." : "전달하기"}
      </button>
    </form>
  );
}
