import { weddingInfo } from "@/lib/weddingInfo";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center gap-2 px-6 pb-14 pt-10 text-center text-xs text-ink/40">
      <p>
        {weddingInfo.groom.name} & {weddingInfo.bride.name}
      </p>
      <p>
        {weddingInfo.dateLabel} {weddingInfo.timeLabel}
      </p>
    </footer>
  );
}
