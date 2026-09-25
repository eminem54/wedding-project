import { weddingInfo } from "@/lib/weddingInfo";

export default function Greeting() {
  return (
    <section className="flex flex-col items-center gap-8 px-8 py-16 text-center">
      <p className="font-serif text-xs tracking-[0.3em] text-blossom-500">
        INVITATION
      </p>
      <div className="space-y-1 text-[15px] leading-8 text-ink/80">
        {weddingInfo.greeting.map((line, i) =>
          line === "" ? <br key={i} /> : <p key={i}>{line}</p>,
        )}
      </div>
      <div className="grid w-full grid-cols-2 gap-4 pt-4 text-sm">
        <div className="space-y-1">
          <p className="font-medium">
            {weddingInfo.groom.fatherName} · {weddingInfo.groom.motherName}의
            장남
          </p>
          <p className="font-serif text-base font-bold">
            {weddingInfo.groom.name}
          </p>
        </div>
        <div className="space-y-1">
          <p className="font-medium">
            {weddingInfo.bride.fatherName} · {weddingInfo.bride.motherName}의
            차녀
          </p>
          <p className="font-serif text-base font-bold">
            {weddingInfo.bride.name}
          </p>
        </div>
      </div>
    </section>
  );
}
