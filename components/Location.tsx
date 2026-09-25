import { weddingInfo } from "@/lib/weddingInfo";

export default function Location() {
  const [street, ...detail] = weddingInfo.venue.address.split(/\s*(?=\()/);
  const query = encodeURIComponent(weddingInfo.venue.name);
  const naverMapUrl = `https://map.naver.com/v5/search/${query}`;
  const kakaoMapUrl = `https://map.kakao.com/?q=${query}`;

  return (
    <section className="flex flex-col items-center gap-6 px-6 py-16 text-center">
      <p className="font-serif text-xs tracking-[0.3em] text-blossom-500">LOCATION</p>
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
      <div className="flex w-full gap-3">
        <a
          href={naverMapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 rounded-full border border-blossom-300 py-3 text-sm font-medium text-blossom-700 transition-colors hover:bg-blossom-50"
        >
          네이버 지도
        </a>
        <a
          href={kakaoMapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 rounded-full border border-blossom-300 py-3 text-sm font-medium text-blossom-700 transition-colors hover:bg-blossom-50"
        >
          카카오맵
        </a>
      </div>
    </section>
  );
}
