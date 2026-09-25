// 청첩장에 들어가는 모든 정보를 이 파일에서 한 번에 수정할 수 있습니다.

export const weddingInfo = {
  groom: {
    name: "신랑 이름",
    fatherName: "아버지 이름",
    motherName: "어머니 이름",
    phone: "010-0000-0000",
  },
  bride: {
    name: "신부 이름",
    fatherName: "아버지 이름",
    motherName: "어머니 이름",
    phone: "010-0000-0000",
  },
  // ISO 형식으로 입력하세요 (YYYY-MM-DDTHH:mm:ss)
  dateTimeISO: "2026-12-31T13:00:00",
  dateLabel: "2026년 12월 31일 목요일 오후 1시",
  venue: {
    name: "○○웨딩홀 3층 그랜드홀",
    address: "서울특별시 ○○구 ○○로 123",
    tel: "02-0000-0000",
  },
  greeting: [
    "저희 두 사람이",
    "새로운 시작을 함께합니다.",
    "",
    "서로 다른 길을 걸어온 저희가",
    "이제 하나의 길을 걷고자 합니다.",
    "귀한 걸음 하시어",
    "축복해 주시면 감사하겠습니다.",
  ],
  gallery: [] as string[], // public/gallery 폴더에 사진을 넣고 파일명을 배열에 추가하세요
  accounts: {
    groomSide: [{ role: "신랑", bank: "은행명", number: "000-0000-0000", holder: "신랑 이름" }],
    brideSide: [{ role: "신부", bank: "은행명", number: "000-0000-0000", holder: "신부 이름" }],
  },
};
