"use client";

import { useEffect, useRef, useState } from "react";
import { basePath } from "@/lib/basePath";

// Browsers only allow audible playback after a user activation, so these are the
// events that count as one (touchstart and scroll do not).
const ACTIVATION_EVENTS = ["pointerdown", "touchend", "click", "keydown"] as const;

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const removeListeners = () =>
      ACTIVATION_EVENTS.forEach((type) => document.removeEventListener(type, start));

    function start(e: Event) {
      if (buttonRef.current?.contains(e.target as Node)) return;
      audio!
        .play()
        .then(() => {
          setPlaying(true);
          removeListeners();
        })
        .catch(() => {});
    }

    ACTIVATION_EVENTS.forEach((type) => document.addEventListener(type, start));
    return removeListeners;
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => {});
    }
  };

  return (
    <>
      <audio ref={audioRef} src={`${basePath}/bgm.mp3`} loop preload="auto" />
      <button
        ref={buttonRef}
        type="button"
        onClick={toggle}
        aria-label={playing ? "배경음악 끄기" : "배경음악 켜기"}
        className="fixed right-[max(0.5rem,calc((100vw-28rem)/2+0.5rem))] top-2 z-40 flex h-10 w-10 items-center justify-center text-ink/70"
      >
        <SpeakerIcon muted={!playing} />
      </button>
    </>
  );
}

function SpeakerIcon({ muted }: { muted: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor" />
      {muted ? (
        <path d="M4 20L20 4" strokeWidth="1.8" />
      ) : (
        <>
          <path d="M15.5 9a4 4 0 010 6" />
          <path d="M18 6.5a7.5 7.5 0 010 11" />
        </>
      )}
    </svg>
  );
}
