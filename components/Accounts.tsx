"use client";

import { useState } from "react";
import { weddingInfo } from "@/lib/weddingInfo";

type Account = { role: string; bank: string; number: string; holder: string };

function AccountItem({ account }: { account: Account }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(account.number);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // 클립보드 API를 사용할 수 없는 환경에서는 무시합니다.
    }
  };

  return (
    <div className="flex items-center justify-between rounded-lg bg-white px-4 py-3 shadow-sm">
      <div className="text-left">
        <p className="text-xs text-ink/50">
          {account.role} · {account.bank}
        </p>
        <p className="text-sm font-medium">{account.number}</p>
        <p className="text-xs text-ink/50">예금주 {account.holder}</p>
      </div>
      <button
        onClick={handleCopy}
        className="rounded-full border border-blossom-300 px-3 py-1.5 text-xs font-medium text-blossom-700"
      >
        {copied ? "복사됨" : "복사"}
      </button>
    </div>
  );
}

export default function Accounts() {
  const [open, setOpen] = useState<"groom" | "bride" | null>(null);

  return (
    <section className="flex flex-col gap-4 px-6 py-16">
      <p className="text-center font-serif text-xs tracking-[0.3em] text-blossom-500">
        ACCOUNT
      </p>
      <p className="text-center text-sm text-ink/60">마음 전하실 곳</p>
      <div className="flex flex-col gap-3">
        {(["groom", "bride"] as const).map((side) => (
          <div key={side}>
            <button
              onClick={() => setOpen(open === side ? null : side)}
              className="flex w-full items-center justify-between rounded-full border border-blossom-200 px-5 py-3 text-sm font-medium"
            >
              {side === "groom" ? "신랑측 계좌번호" : "신부측 계좌번호"}
              <span>{open === side ? "−" : "+"}</span>
            </button>
            {open === side && (
              <div className="mt-2 flex flex-col gap-2">
                {(side === "groom" ? weddingInfo.accounts.groomSide : weddingInfo.accounts.brideSide).map(
                  (account) => (
                    <AccountItem key={account.number} account={account} />
                  )
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
