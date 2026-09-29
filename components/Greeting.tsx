import { weddingInfo } from "@/lib/weddingInfo";
import { SectionTitle } from "@/components/SectionTitle";

function Parents({
  father,
  mother,
  relation,
  name,
}: {
  father: string;
  mother: string;
  relation: string;
  name: string;
}) {
  return (
    <p className="flex items-baseline justify-center gap-2 whitespace-nowrap text-[15px]">
      <span className="text-ink/80">
        {father} · {mother}
      </span>
      <span className="text-sm text-ink/50">의 {relation}</span>
      <span className="ml-1 text-[17px] font-medium text-ink">{name}</span>
    </p>
  );
}

export default function Greeting() {
  return (
    <section className="flex flex-col items-center gap-10 px-8 py-24 text-center">
      <SectionTitle>초대합니다</SectionTitle>
      <div className="text-[16px] leading-9 text-ink/85">
        {weddingInfo.greeting.map((line, i) =>
          line === "" ? <br key={i} /> : <p key={i}>{line}</p>,
        )}
      </div>
      <div className="h-px w-12 bg-sage-400" />
      <div className="space-y-3">
        <Parents
          father={weddingInfo.groom.fatherName}
          mother={weddingInfo.groom.motherName}
          relation="장남"
          name={weddingInfo.groom.name}
        />
        <Parents
          father={weddingInfo.bride.fatherName}
          mother={weddingInfo.bride.motherName}
          relation="차녀"
          name={weddingInfo.bride.name}
        />
      </div>
    </section>
  );
}
