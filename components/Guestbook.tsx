"use client";

import { useCallback, useEffect, useState } from "react";
import {
  fetchGuestbookPage,
  GUESTBOOK_PAGE_SIZE,
  type GuestbookEntry,
} from "@/lib/guestbook";
import BottomSheet from "@/components/BottomSheet";
import { GuestbookDeleteForm, GuestbookForm } from "@/components/GuestbookForm";

const PAGE_WINDOW = 5;
const NAME_DISPLAY_MAX = 6;

function truncateName(name: string) {
  // Array.from splits by code point so emoji aren't cut in half.
  const chars = Array.from(name);
  return chars.length > NAME_DISPLAY_MAX ? `${chars.slice(0, NAME_DISPLAY_MAX).join("")}…` : name;
}

const timeFormat = new Intl.DateTimeFormat("ko-KR", {
  timeZone: "Asia/Seoul",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

function formatTime(iso: string) {
  const p = Object.fromEntries(timeFormat.formatToParts(new Date(iso)).map((x) => [x.type, x.value]));
  return `${p.year}.${p.month}.${p.day} ${p.hour}:${p.minute}`;
}

function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  const end = Math.min(totalPages, Math.max(page + 2, PAGE_WINDOW));
  const start = Math.max(1, end - PAGE_WINDOW + 1);
  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);
  const arrowClass =
    "flex h-8 w-8 items-center justify-center rounded-full text-lg text-blossom-600 disabled:text-ink/20";

  return (
    <nav aria-label="방명록 페이지" className="flex items-center justify-center gap-1">
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        aria-label="이전 페이지"
        className={arrowClass}
      >
        &lsaquo;
      </button>
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onChange(p)}
          aria-current={p === page ? "page" : undefined}
          className={`h-8 w-8 rounded-full text-sm ${
            p === page ? "bg-blossom-400 font-medium text-white" : "text-ink/60"
          }`}
        >
          {p}
        </button>
      ))}
      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        aria-label="다음 페이지"
        className={arrowClass}
      >
        &rsaquo;
      </button>
    </nav>
  );
}

export default function Guestbook() {
  const [page, setPage] = useState(1);
  const [reloadKey, setReloadKey] = useState(0);
  const [data, setData] = useState<{ entries: GuestbookEntry[]; total: number } | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  // Kept after closing so the sheet's content stays put while it slides out.
  const [deleteTarget, setDeleteTarget] = useState<GuestbookEntry | null>(null);

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    fetchGuestbookPage(page)
      .then((result) => {
        if (cancelled) return;
        const lastPage = Math.max(1, Math.ceil(result.total / GUESTBOOK_PAGE_SIZE));
        // A deletion can empty the current page; step back to the new last page.
        if (page > lastPage) {
          setPage(lastPage);
          return;
        }
        setData(result);
        setStatus("ready");
      })
      .catch((err) => {
        if (cancelled) return;
        console.error(err);
        setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, [page, reloadKey]);

  const reload = () => setReloadKey((k) => k + 1);
  const closeForm = useCallback(() => setFormOpen(false), []);
  const closeDelete = useCallback(() => setDeleteOpen(false), []);

  const handleSubmitted = () => {
    setFormOpen(false);
    setPage(1);
    reload();
  };

  const handleDeleted = () => {
    setDeleteOpen(false);
    reload();
  };

  const totalPages = data ? Math.max(1, Math.ceil(data.total / GUESTBOOK_PAGE_SIZE)) : 1;

  return (
    <section className="flex flex-col items-center gap-6 bg-blossom-50 px-6 py-16 text-center">
      <p className="font-serif text-xs tracking-[0.3em] text-blossom-500">GUESTBOOK</p>
      <p className="text-sm leading-relaxed text-ink/70">
        두 사람에게 따뜻한
        <br />
        축하의 마음을 남겨주세요.
      </p>

      <div className="w-full">
        {status === "error" && !data ? (
          <div className="space-y-3 py-6 text-sm text-ink/60">
            <p>메시지를 불러오지 못했어요.</p>
            <button type="button" onClick={reload} className="text-blossom-600 underline">
              다시 시도
            </button>
          </div>
        ) : !data ? (
          <p className="py-10 text-sm text-ink/40">불러오는 중...</p>
        ) : data.entries.length === 0 ? (
          <p className="rounded-xl border border-dashed border-blossom-200 bg-white py-10 text-sm text-ink/50">
            첫 번째 축하 메시지를 남겨주세요.
          </p>
        ) : (
          <ul
            className={`space-y-3 transition-opacity ${status === "loading" ? "opacity-50" : ""}`}
          >
            {data.entries.map((entry) => (
              <li
                key={entry.id}
                className="relative rounded-xl bg-white px-5 py-4 text-left shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => {
                    setDeleteTarget(entry);
                    setDeleteOpen(true);
                  }}
                  aria-label={`${entry.name}님의 메시지 삭제`}
                  className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full text-lg leading-none text-ink/30 transition-colors hover:text-ink/60"
                >
                  &times;
                </button>
                <p className="whitespace-pre-wrap break-words pr-6 text-sm leading-relaxed text-ink">
                  {entry.message}
                </p>
                <div className="mt-3 flex items-center justify-between text-xs">
                  <span title={entry.name} className="font-medium text-ink/70">
                    {truncateName(entry.name)}
                  </span>
                  <time dateTime={entry.created_at} className="text-ink/40">
                    {formatTime(entry.created_at)}
                  </time>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />

      <button
        type="button"
        onClick={() => setFormOpen(true)}
        className="w-full rounded-full border-2 border-blossom-400 bg-white py-3 text-sm font-medium text-blossom-700"
      >
        메시지 남기기
      </button>

      <BottomSheet open={formOpen} onClose={closeForm} label="축하 메시지 남기기">
        <GuestbookForm onSubmitted={handleSubmitted} />
      </BottomSheet>

      <BottomSheet open={deleteOpen} onClose={closeDelete} label="메시지 삭제">
        {deleteTarget && (
          <GuestbookDeleteForm
            key={deleteTarget.id}
            entry={deleteTarget}
            onDeleted={handleDeleted}
          />
        )}
      </BottomSheet>
    </section>
  );
}
