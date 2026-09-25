import { weddingInfo } from "@/lib/weddingInfo";

export default function Hero() {
  return (
    <section className="flex flex-col items-center gap-6 bg-gradient-to-b from-blossom-100 to-white px-6 pb-16 pt-24 text-center">
      <p className="font-serif text-sm tracking-[0.3em] text-blossom-600">
        WEDDING INVITATION
      </p>
      <h1 className="font-serif text-3xl font-medium leading-relaxed">
        {weddingInfo.groom.name}
        <span className="mx-3 text-blossom-400">&</span>
        {weddingInfo.bride.name}
      </h1>
      <p className="text-sm leading-relaxed text-ink/70">
        {weddingInfo.dateLabel}
        <br />
        {weddingInfo.timeLabel}
      </p>
      <p className="text-sm text-ink/70">{weddingInfo.venue.name}</p>
    </section>
  );
}
