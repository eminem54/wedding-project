import { weddingInfo } from "@/lib/weddingInfo";

function ContactRow({ label, phone }: { label: string; phone: string }) {
  return (
    <div className="flex items-center justify-between border-b border-blossom-100 py-3 text-sm last:border-none">
      <span className="text-ink/70">{label}</span>
      <div className="flex gap-2">
        <a
          href={`tel:${phone}`}
          className="rounded-full bg-blossom-100 px-4 py-1.5 text-blossom-700"
        >
          전화
        </a>
        <a
          href={`sms:${phone}`}
          className="rounded-full bg-blossom-100 px-4 py-1.5 text-blossom-700"
        >
          문자
        </a>
      </div>
    </div>
  );
}

export default function Contact() {
  return (
    <section className="flex flex-col gap-6 bg-blossom-50 px-8 py-16">
      <p className="text-center font-serif text-xs tracking-[0.3em] text-blossom-500">CONTACT</p>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="mb-2 text-center text-sm font-medium">신랑측</p>
          <ContactRow label={weddingInfo.groom.name} phone={weddingInfo.groom.phone} />
        </div>
        <div>
          <p className="mb-2 text-center text-sm font-medium">신부측</p>
          <ContactRow label={weddingInfo.bride.name} phone={weddingInfo.bride.phone} />
        </div>
      </div>
    </section>
  );
}
