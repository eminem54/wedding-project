import { weddingInfo } from "@/lib/weddingInfo";
import { weddingDate } from "@/lib/weddingDate";

const compact = (name: string) => name.replace(/\s+/g, "");

function WaxSeal({ label }: { label: string }) {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden="true">
      <defs>
        <radialGradient id="seal-body" cx="42%" cy="38%" r="70%">
          <stop offset="0%" stopColor="#a33a45" />
          <stop offset="55%" stopColor="#85242f" />
          <stop offset="100%" stopColor="#5a141c" />
        </radialGradient>
        <radialGradient id="seal-well" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#8e2a34" />
          <stop offset="100%" stopColor="#6d1a23" />
        </radialGradient>
        {/* Roughens the outline so it reads as poured wax rather than a perfect circle. */}
        <filter id="seal-edge" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="7" />
          <feDisplacementMap in="SourceGraphic" scale="9" />
        </filter>
        <filter id="seal-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#3a0d12" floodOpacity="0.35" />
        </filter>
      </defs>

      <g filter="url(#seal-shadow)">
        <circle cx="100" cy="100" r="88" fill="url(#seal-body)" filter="url(#seal-edge)" />
      </g>
      {/* Pressed ring: dark inner edge with a light rim below it for an embossed look. */}
      <circle
        cx="100"
        cy="101.5"
        r="64"
        fill="none"
        stroke="#c0606a"
        strokeOpacity="0.45"
        strokeWidth="3"
      />
      <circle
        cx="100"
        cy="100"
        r="64"
        fill="url(#seal-well)"
        stroke="#4d1017"
        strokeOpacity="0.55"
        strokeWidth="2.5"
      />
      <text
        x="100"
        y="113"
        textAnchor="middle"
        fontSize="40"
        letterSpacing="-1"
        className="font-bodoni"
        fill="#c46a73"
        fillOpacity="0.55"
      >
        {label}
      </text>
      <text
        x="100"
        y="111.5"
        textAnchor="middle"
        fontSize="40"
        letterSpacing="-1"
        className="font-bodoni"
        fill="#7a1d27"
        stroke="#4d1017"
        strokeOpacity="0.4"
        strokeWidth="0.8"
      >
        {label}
      </text>
    </svg>
  );
}

// The lower half of the cover is the back of an envelope: a V-shaped flap
// whose tip is held down by the wax seal.
function Envelope() {
  return (
    <div className="absolute inset-x-0 bottom-0 h-[42%]">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="flap-shade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#000" stopOpacity="0" />
            <stop offset="100%" stopColor="#000" stopOpacity="0.035" />
          </linearGradient>
        </defs>
        {/* Envelope body below the flap, slightly shaded. */}
        <path d="M0 0 L50 72 L100 0 L100 100 L0 100 Z" fill="url(#flap-shade)" />
        <path
          d="M0 0 L50 72"
          stroke="#d9d4cc"
          strokeWidth="1.2"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M100 0 L50 72"
          stroke="#d9b99a"
          strokeWidth="1.4"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className="absolute left-1/2 top-[72%] h-32 w-32 -translate-x-1/2 -translate-y-1/2">
        <WaxSeal label={weddingDate.seal} />
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center overflow-hidden px-6 pb-[34svh] pt-14 text-center">
      <Envelope />

      <div className="relative animate-fade-up">
        <p className="font-garamond text-[19px] tracking-wide text-ink/80">
          You are warmly invited to attend
        </p>
        <p className="mt-1 font-script text-[54px] leading-tight text-ink">The Wedding of</p>
      </div>

      <h1 className="relative mt-[12svh] flex items-center gap-6 font-gowun text-[32px] tracking-widest text-ink [animation-delay:200ms] animate-fade-up">
        <span>{compact(weddingInfo.groom.name)}</span>
        <span className="font-garamond text-[38px] italic">&amp;</span>
        <span>{compact(weddingInfo.bride.name)}</span>
      </h1>

      <div className="relative mt-[10svh] flex flex-col items-center [animation-delay:400ms] animate-fade-up">
        <p className="font-bodoni text-[13px] tracking-[0.35em] text-ink/80">
          {weddingDate.weekdayEn}
        </p>
        <div className="mt-3 flex items-center font-bodoni text-ink">
          <span className="w-16 text-right text-[12px] tracking-[0.35em]">
            {weddingDate.monthEn}
          </span>
          <span className="mx-4 h-10 w-px bg-ink/80" />
          <span className="text-[44px] font-bold leading-none tracking-[0.25em] [margin-right:-0.25em]">
            {String(weddingDate.day).padStart(2, "0")}
          </span>
          <span className="mx-4 h-10 w-px bg-ink/80" />
          <span className="w-16 text-left text-[12px] tracking-[0.35em]">{weddingDate.year}</span>
        </div>
      </div>

      <div className="relative mt-[8svh] space-y-3 text-[17px] font-normal text-ink/85 [animation-delay:600ms] animate-fade-up">
        <p>
          {/* On narrow screens the line breaks only between the date and the time. */}
          <span className="whitespace-nowrap">{weddingInfo.dateLabel}</span>{" "}
          <span className="whitespace-nowrap">{weddingInfo.timeLabel}</span>
        </p>
        <p>{weddingInfo.venue.name}</p>
      </div>
    </section>
  );
}
