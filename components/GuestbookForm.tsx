"use client";

import { useState } from "react";
import {
  addGuestbookEntry,
  deleteGuestbookEntry,
  GUESTBOOK_MESSAGE_MAX,
  GUESTBOOK_NAME_MAX,
  GUESTBOOK_PASSWORD_MAX,
  GUESTBOOK_PASSWORD_MIN,
  type GuestbookEntry,
} from "@/lib/guestbook";
import { Field, inputClass } from "@/components/FormField";

const submitButtonClass =
  "w-full rounded-full bg-blossom-500 py-3.5 text-sm font-medium text-white transition-opacity disabled:opacity-40";

function SheetTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-center">
      <p className="font-serif text-xs tracking-[0.3em] text-blossom-500">GUESTBOOK</p>
      <h2 className="mt-2 text-lg font-medium">{children}</h2>
    </div>
  );
}

export function GuestbookForm({ onSubmitted }: { onSubmitted: () => void }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");

  const canSubmit =
    name.trim() !== "" &&
    message.trim() !== "" &&
    password.length >= GUESTBOOK_PASSWORD_MIN &&
    status !== "submitting";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setStatus("submitting");
    try {
      await addGuestbookEntry(name.trim(), message.trim(), password);
      onSubmitted();
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 text-left">
      <SheetTitle>축하 메시지 남기기</SheetTitle>

      <Field label="이름">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={GUESTBOOK_NAME_MAX}
          placeholder="이름을 입력해주세요"
          autoComplete="name"
          className={inputClass}
        />
      </Field>

      <Field label="비밀번호">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          maxLength={GUESTBOOK_PASSWORD_MAX}
          placeholder={`${GUESTBOOK_PASSWORD_MIN}자 이상 (삭제할 때 필요해요)`}
          autoComplete="new-password"
          className={inputClass}
        />
      </Field>

      <Field label="메시지">
        <div className="relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={GUESTBOOK_MESSAGE_MAX}
            rows={5}
            placeholder="두 사람에게 축하의 마음을 전해주세요"
            className={`${inputClass} resize-none pb-7`}
          />
          <span className="pointer-events-none absolute bottom-3 right-3 text-xs text-ink/40">
            {message.length}/{GUESTBOOK_MESSAGE_MAX}
          </span>
        </div>
      </Field>

      {status === "error" && (
        <p className="text-center text-sm text-blossom-600">
          등록에 실패했어요. 잠시 후 다시 시도해주세요.
        </p>
      )}

      <button type="submit" disabled={!canSubmit} className={submitButtonClass}>
        {status === "submitting" ? "등록 중..." : "남기기"}
      </button>
    </form>
  );
}

export function GuestbookDeleteForm({
  entry,
  onDeleted,
}: {
  entry: GuestbookEntry;
  onDeleted: () => void;
}) {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "wrong" | "error">("idle");

  const canSubmit = password !== "" && status !== "submitting";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setStatus("submitting");
    try {
      if (await deleteGuestbookEntry(entry.id, password)) {
        onDeleted();
      } else {
        setStatus("wrong");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 text-left">
      <SheetTitle>메시지 삭제</SheetTitle>
      <p className="text-center text-sm text-ink/70">
        {entry.name}님의 메시지를 삭제하려면
        <br />
        작성할 때 입력한 비밀번호를 입력해주세요.
      </p>

      <Field label="비밀번호">
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (status === "wrong") setStatus("idle");
          }}
          maxLength={GUESTBOOK_PASSWORD_MAX}
          autoComplete="current-password"
          className={inputClass}
        />
      </Field>

      {status === "wrong" && (
        <p className="text-center text-sm text-blossom-600">비밀번호가 일치하지 않아요.</p>
      )}
      {status === "error" && (
        <p className="text-center text-sm text-blossom-600">
          삭제에 실패했어요. 잠시 후 다시 시도해주세요.
        </p>
      )}

      <button type="submit" disabled={!canSubmit} className={submitButtonClass}>
        {status === "submitting" ? "삭제 중..." : "삭제하기"}
      </button>
    </form>
  );
}
