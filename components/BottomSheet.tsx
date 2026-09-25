"use client";

import { useEffect, useState } from "react";

const ANIMATION_MS = 300;

// Two sheets can overlap while one slides out and the next slides in,
// so the scroll lock is reference-counted.
let scrollLocks = 0;
function lockScroll() {
  if (scrollLocks++ === 0) document.body.style.overflow = "hidden";
}
function unlockScroll() {
  if (--scrollLocks === 0) document.body.style.overflow = "";
}

type Props = {
  open: boolean;
  onClose: () => void;
  label: string;
  children: React.ReactNode;
};

export default function BottomSheet({ open, onClose, label, children }: Props) {
  const [mounted, setMounted] = useState(open);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (open) {
      setMounted(true);
      let inner = 0;
      const outer = requestAnimationFrame(() => {
        inner = requestAnimationFrame(() => setShown(true));
      });
      return () => {
        cancelAnimationFrame(outer);
        cancelAnimationFrame(inner);
      };
    }
    setShown(false);
    const t = setTimeout(() => setMounted(false), ANIMATION_MS);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!mounted) return;
    lockScroll();
    return unlockScroll;
  }, [mounted]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label={label}>
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
          shown ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />
      <div
        className={`absolute bottom-0 left-1/2 max-h-[90vh] w-full max-w-md -translate-x-1/2 overflow-y-auto rounded-t-3xl bg-white px-6 pb-8 pt-3 shadow-2xl transition-transform duration-300 ease-out ${
          shown ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="mx-auto mb-6 h-1 w-10 rounded-full bg-ink/15" />
        {children}
      </div>
    </div>
  );
}
