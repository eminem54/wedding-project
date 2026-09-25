# wedding-project

모바일 청첩장 웹사이트 (Next.js + Tailwind CSS)

## 시작하기

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000) 에서 확인할 수 있습니다.

## 내용 수정하기

신랑/신부 이름, 예식 날짜, 장소, 연락처, 계좌번호 등 모든 정보는
`lib/weddingInfo.ts` 한 파일에서 수정합니다.

사진은 `public/gallery` 폴더에 넣고, `lib/weddingInfo.ts`의 `gallery` 배열에
파일명을 추가하면 갤러리 섹션에 표시됩니다.

## 배포

Vercel에 GitHub 저장소를 연결하면 자동으로 빌드/배포됩니다.
([Next.js 배포 문서](https://nextjs.org/docs/app/building-your-application/deploying))
