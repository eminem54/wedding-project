// Two overlays can overlap while one slides out and the next slides in,
// so the scroll lock is reference-counted.
let scrollLocks = 0;

export function lockScroll() {
  if (scrollLocks++ === 0) document.body.style.overflow = "hidden";
}

export function unlockScroll() {
  if (--scrollLocks === 0) document.body.style.overflow = "";
}
