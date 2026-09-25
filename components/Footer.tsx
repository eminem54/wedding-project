import { weddingInfo } from "@/lib/weddingInfo";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center gap-2 border-t border-blossom-100 px-6 py-10 text-center text-xs text-ink/40">
      <p>
        {weddingInfo.groom.name} & {weddingInfo.bride.name}
      </p>
      <p>
        {weddingInfo.dateLabel} {weddingInfo.timeLabel}
      </p>
    </footer>
  );
}
