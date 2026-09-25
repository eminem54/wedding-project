// 청첩장에 들어가는 모든 정보를 이 파일에서 한 번에 수정할 수 있습니다.

export const weddingInfo = {
  groom: {
    name: "이지영",
    fatherName: "이태한",
    motherName: "김순애",
    phone: "010-0000-0000",
  },
  bride: {
    name: "최혜윤",
    fatherName: "최종명",
    motherName: "장경님",
    phone: "010-0000-0000",
  },
  // ISO 형식으로 입력하세요 (YYYY-MM-DDTHH:mm:ss)
  dateTimeISO: "2027-01-16T13:40:00",
  dateLabel: "2027년 01월 16일 토요일",
  timeLabel: "오후 1시 40분",
  venue: {
    name: "디노체컨벤션웨딩홀",
    address: "서울특별시 성동구 광장로 17 민자역사 6층 (성동구 행당동 168-151)",
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
  gallery: [
    "gallery-01.jpg",
    "gallery-02.jpg",
    "gallery-03.jpg",
    "gallery-04.jpg",
    "gallery-05.jpg",
    "gallery-06.jpg",
  ] as string[],
  accounts: {
    groomSide: [
      {
        role: "신랑",
        bank: "은행명",
        number: "000-0000-0000",
        holder: "신랑 이름",
      },
    ],
    brideSide: [
      {
        role: "신부",
        bank: "은행명",
        number: "000-0000-0000",
        holder: "신부 이름",
      },
    ],
  },
};
