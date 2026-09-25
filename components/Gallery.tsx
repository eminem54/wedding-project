import Image from "next/image";
import { weddingInfo } from "@/lib/weddingInfo";
import { basePath } from "@/lib/basePath";

export default function Gallery() {
  return (
    <section className="flex flex-col items-center gap-6 bg-blossom-50 px-6 py-16 text-center">
      <p className="font-serif text-xs tracking-[0.3em] text-blossom-500">GALLERY</p>
      {weddingInfo.gallery.length === 0 ? (
        <p className="rounded-lg border border-dashed border-blossom-200 px-6 py-12 text-sm text-ink/50">
          public/gallery 폴더에 사진을 넣고
          <br />
          lib/weddingInfo.ts의 gallery 배열에 파일명을 추가하면
          <br />이 자리에 사진이 표시됩니다.
        </p>
      ) : (
        <div className="grid w-full grid-cols-2 gap-2">
          {weddingInfo.gallery.map((src) => (
            <div key={src} className="relative aspect-[3/4] overflow-hidden rounded-md bg-blossom-100">
              <Image
                src={`${basePath}/gallery/${src}`}
                alt=""
                fill
                sizes="(max-width: 448px) 50vw, 224px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
