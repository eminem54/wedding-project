"use client";

import { useState } from "react";
import { weddingInfo } from "@/lib/weddingInfo";
import { SectionTitle } from "@/components/SectionTitle";

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
    <div className="flex items-center justify-between rounded-md bg-white/60 px-4 py-3 shadow-sm">
      <div className="text-left">
        <p className="text-[13px] font-normal text-ink/80">
          {account.role} · {account.bank}
        </p>
        <p className="my-0.5 text-[15px] font-medium text-ink">{account.number}</p>
        <p className="text-[13px] font-normal text-ink/80">예금주 {account.holder}</p>
      </div>
      <button
        onClick={handleCopy}
        className="rounded-md border border-sage-600 px-3 py-1.5 text-xs font-normal text-sage-700"
      >
        {copied ? "복사됨" : "복사"}
      </button>
    </div>
  );
}

export default function Accounts() {
  const [open, setOpen] = useState<"groom" | "bride" | null>(null);

  return (
    <section className="flex flex-col gap-4 px-6 py-20">
      <SectionTitle>마음 전하실 곳</SectionTitle>
      <p className="text-center text-[15px] leading-7 font-normal text-ink/80">
        참석이 어려우신 분들을 위해
        <br />
        계좌번호를 기재하였습니다.
      </p>
      <div className="flex flex-col gap-3">
        {(["groom", "bride"] as const).map((side) => (
          <div key={side}>
            <button
              onClick={() => setOpen(open === side ? null : side)}
              className="flex w-full items-center justify-between rounded-md border border-sage-600/40 bg-white/40 px-5 py-3.5 text-[15px] font-normal text-sage-700"
            >
              {side === "groom" ? "신랑측 계좌번호" : "신부측 계좌번호"}
              <span>{open === side ? "−" : "+"}</span>
            </button>
            {open === side && (
              <div className="mt-2 flex flex-col gap-2">
                {(side === "groom"
                  ? weddingInfo.accounts.groomSide
                  : weddingInfo.accounts.brideSide
                ).map((account) => (
                  <AccountItem key={account.role} account={account} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
