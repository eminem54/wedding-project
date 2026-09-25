"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { weddingInfo } from "@/lib/weddingInfo";
import { basePath } from "@/lib/basePath";

export default function Gallery() {
  const [selected, setSelected] = useState<number | null>(null);
  const count = weddingInfo.gallery.length;

  const close = useCallback(() => setSelected(null), []);
  const showPrev = useCallback(
    () => setSelected((i) => (i === null ? null : (i - 1 + count) % count)),
    [count]
  );
  const showNext = useCallback(
    () => setSelected((i) => (i === null ? null : (i + 1) % count)),
    [count]
  );

  useEffect(() => {
    if (selected === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [selected, close, showPrev, showNext]);

  return (
    <section className="flex flex-col items-center gap-6 bg-blossom-50 px-6 py-16 text-center">
      <p className="font-serif text-xs tracking-[0.3em] text-blossom-500">GALLERY</p>
      {count === 0 ? (
        <p className="rounded-lg border border-dashed border-blossom-200 px-6 py-12 text-sm text-ink/50">
          public/gallery 폴더에 사진을 넣고
          <br />
          lib/weddingInfo.ts의 gallery 배열에 파일명을 추가하면
          <br />이 자리에 사진이 표시됩니다.
        </p>
      ) : (
        <div className="grid w-full grid-cols-2 gap-2">
          {weddingInfo.gallery.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setSelected(i)}
              aria-label={`${i + 1}번째 사진 크게 보기`}
              className="relative aspect-[3/4] overflow-hidden rounded-md bg-blossom-100"
            >
              <Image
                src={`${basePath}/gallery/${src}`}
                alt=""
                fill
                sizes="(max-width: 448px) 50vw, 224px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {selected !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-blossom-100/95 via-white/95 to-blossom-100/95 backdrop-blur-sm"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="닫기"
            className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-xl leading-none text-blossom-600 shadow-md"
          >
            &times;
          </button>

          {count > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showPrev();
                }}
                aria-label="이전 사진"
                className="absolute left-2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-2xl leading-none text-blossom-600 shadow-md"
              >
                &lsaquo;
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
                aria-label="다음 사진"
                className="absolute right-2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-2xl leading-none text-blossom-600 shadow-md"
              >
                &rsaquo;
              </button>
            </>
          )}

          <div
            className="relative h-[75vh] w-[calc(100%-2rem)] max-w-md overflow-hidden rounded-2xl bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={`${basePath}/gallery/${weddingInfo.gallery[selected]}`}
              alt=""
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}
