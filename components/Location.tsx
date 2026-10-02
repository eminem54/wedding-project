import Image from "next/image";
import { weddingInfo } from "@/lib/weddingInfo";
import { SectionTitle } from "@/components/SectionTitle";
import { basePath } from "@/lib/basePath";

export default function Location() {
  const [street, ...detail] = weddingInfo.venue.address.split(/\s*(?=\()/);
  const query = encodeURIComponent(weddingInfo.venue.name);
  const naverMapUrl = `https://map.naver.com/v5/search/${query}`;
  const kakaoMapUrl = `https://map.kakao.com/?q=${query}`;

  return (
    <section className="flex flex-col items-center gap-6 px-6 py-20 text-center">
      <SectionTitle>오시는 길</SectionTitle>
      <div className="space-y-1">
        <p className="text-base font-medium">{weddingInfo.venue.name}</p>
        <p className="text-sm text-ink/60">
          {street}
          {detail.length > 0 && (
            <>
              <br />
              {detail.join(" ")}
            </>
          )}
        </p>
        <p className="text-sm text-ink/60">{weddingInfo.venue.tel}</p>
      </div>
      <Image
        src={`${basePath}/map.jpg`}
        alt={`${weddingInfo.venue.name} 약도`}
        width={1065}
        height={1006}
        sizes="(max-width: 448px) 100vw, 400px"
        className="h-auto w-full rounded-md border border-ink/10"
      />
      <div className="flex w-full gap-3">
        <a
          href={naverMapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-md border border-sage-600 py-3 text-sm font-normal text-sage-700 transition-colors hover:bg-sage-50"
        >
          <Image
            src={`${basePath}/icons/naver-map.png`}
            alt=""
            width={20}
            height={20}
            className="h-5 w-5 rounded"
          />
          네이버 지도
        </a>
        <a
          href={kakaoMapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-md border border-sage-600 py-3 text-sm font-normal text-sage-700 transition-colors hover:bg-sage-50"
        >
          <Image
            src={`${basePath}/icons/kakao-map.png`}
            alt=""
            width={20}
            height={20}
            className="h-5 w-5 rounded"
          />
          카카오맵
        </a>
      </div>
    </section>
  );
}
