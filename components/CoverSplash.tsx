"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { basePath } from "@/lib/basePath";
import { weddingDate } from "@/lib/weddingDate";

const SHOW_MS = 3400;
const FADE_MS = 900;

// "We're getting married" written across the photo as if in pencil: a mask
// sweeps left to right like a moving pen, and a noise filter roughens and
// grains the strokes like graphite on paper.
function PencilTitle() {
  return (
    <svg viewBox="0 0 400 110" className="w-full overflow-visible" aria-label="We're getting married">
      <defs>
        <filter id="pencil" x="-5%" y="-20%" width="110%" height="140%">
          {/* Slight wobble along the strokes. */}
          <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="1" seed="3" result="wobble" />
          <feDisplacementMap in="SourceGraphic" in2="wobble" scale="1.6" result="rough" />
          {/* Graphite grain: punch fine speckled holes into the strokes. */}
          <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="2" seed="8" result="grain" />
          <feColorMatrix
            in="grain"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -2.2 1.9"
            result="grainAlpha"
          />
          <feComposite in="rough" in2="grainAlpha" operator="in" />
        </filter>
        <linearGradient id="pen-edge" x1="0" x2="1">
          <stop offset="0" stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id="pen-reveal" maskUnits="userSpaceOnUse" x="-50" y="-20" width="500" height="150">
          <g className="animate-pen-reveal">
            <rect x="-460" y="-20" width="420" height="150" fill="#fff" />
            <rect x="-40" y="-20" width="40" height="150" fill="url(#pen-edge)" />
          </g>
        </mask>
      </defs>
      <g mask="url(#pen-reveal)" filter="url(#pencil)">
        <text
          x="200"
          y="72"
          textAnchor="middle"
          fontSize="50"
          className="font-script"
          fill="#fff"
          fillOpacity="0.92"
          stroke="#fff"
          strokeWidth="0.6"
        >
          We&apos;re getting married
        </text>
      </g>
    </svg>
  );
}

// Full-screen cover photo shown on arrival, then faded out to reveal the
// invitation. It is rendered in the static HTML so it appears before hydration;
// tapping skips it. While it is up, the hero's entrance animations are held
// (see .animate-fade-up in globals.css) so they play as the cover lifts.
export default function CoverSplash() {
  const [phase, setPhase] = useState<"shown" | "leaving" | "gone">("shown");

  const leave = useCallback(() => setPhase((p) => (p === "shown" ? "leaving" : p)), []);

  useEffect(() => {
    const id = setTimeout(leave, SHOW_MS);
    return () => clearTimeout(id);
  }, [leave]);

  useEffect(() => {
    if (phase !== "leaving") return;
    const id = setTimeout(() => setPhase("gone"), FADE_MS);
    return () => clearTimeout(id);
  }, [phase]);

  useEffect(() => {
    if (phase === "gone") return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  if (phase === "gone") return null;

  return (
    <div
      id="cover-splash"
      data-leaving={phase === "leaving" || undefined}
      onClick={leave}
      className="fixed inset-0 z-[60] flex justify-center bg-paper-dark transition-opacity ease-out"
      style={{ opacity: phase === "leaving" ? 0 : 1, transitionDuration: `${FADE_MS}ms` }}
    >
      <div className="relative h-full w-full max-w-md overflow-hidden">
        <Image
          src={`${basePath}/cover.webp`}
          alt=""
          fill
          priority
          sizes="(max-width: 448px) 100vw, 448px"
          className="animate-cover-zoom object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-[11%] px-6 drop-shadow-[0_1px_6px_rgba(0,0,0,0.35)]">
          <PencilTitle />
          <p className="mt-1 text-center font-garamond text-[15px] tracking-[0.3em] text-white/85 [animation-delay:2100ms] animate-fade-in">
            {weddingDate.year}. {String(weddingDate.month).padStart(2, "0")}.{" "}
            {String(weddingDate.day).padStart(2, "0")}
          </p>
        </div>
        {/* Champagne-gold glow breathing in from the screen edges. */}
        <div className="pointer-events-none absolute inset-0 animate-edge-glow shadow-[inset_0_0_28px_6px_rgba(232,201,140,0.75),inset_0_0_80px_18px_rgba(214,170,96,0.35)]" />
      </div>
    </div>
  );
}
