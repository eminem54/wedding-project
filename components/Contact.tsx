import { weddingInfo } from "@/lib/weddingInfo";
import { SectionTitle } from "@/components/SectionTitle";

function ContactRow({ role, name, phone }: { role: string; name: string; phone: string }) {
  return (
    <li className="flex items-center justify-between border-b border-dashed border-ink/15 px-2 py-5 last:border-none">
      <div className="flex items-baseline gap-4">
        <span className="w-8 text-sm text-sage-600">{role}</span>
        <span className="whitespace-nowrap text-[17px] text-ink">{name}</span>
      </div>
      <a
        href={`tel:${phone}`}
        aria-label={`${role}에게 전화하기`}
        className="flex items-center gap-1.5 rounded-md border border-sage-600/50 px-4 py-2 text-sm text-sage-700 transition-colors hover:bg-sage-50"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
          <path d="M6.6 10.8a15.1 15.1 0 006.6 6.6l2.2-2.2a1 1 0 011-.25 11.4 11.4 0 003.6.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1z" />
        </svg>
        전화
      </a>
    </li>
  );
}

export default function Contact() {
  return (
    <section className="flex flex-col items-center gap-10 px-6 py-20">
      <SectionTitle>연락하기</SectionTitle>
      <ul className="w-full">
        <ContactRow role="신랑" name={weddingInfo.groom.name} phone={weddingInfo.groom.phone} />
        <ContactRow role="신부" name={weddingInfo.bride.name} phone={weddingInfo.bride.phone} />
      </ul>
    </section>
  );
}
