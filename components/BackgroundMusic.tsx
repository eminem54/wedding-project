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
      audio.play().then(() => setPlaying(true)).catch(() => {});
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
        className="fixed bottom-5 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-white text-blossom-600 shadow-lg"
      >
        <span className={playing ? "animate-spin-slow" : ""}>{playing ? "♫" : "♪"}</span>
      </button>
    </>
  );
}
