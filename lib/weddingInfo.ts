// 청첩장에 들어가는 모든 정보를 이 파일에서 한 번에 수정할 수 있습니다.

export const weddingInfo = {
  groom: {
    name: "이 지 영",
    // 카운트다운·인터뷰에 쓰이는 짧은 이름
    firstName: "지영",
    fatherName: "이 태 한",
    motherName: "김 순 애",
    phone: "010-0000-0000",
  },
  bride: {
    name: "최 혜 윤",
    firstName: "혜윤",
    fatherName: "최 종 명",
    motherName: "장 경 님",
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
  // 웨딩 인터뷰: who가 "groom"/"bride"면 이름이 붙고, null이면 두 사람의 공동 답변입니다.
  interview: [
    {
      question: "결혼하시는 소감이 어떠세요?",
      answers: [
        { who: "groom", text: "신랑의 답변을 입력해주세요." },
        { who: "bride", text: "신부의 답변을 입력해주세요." },
      ],
    },
    {
      question: "처음에 어떻게 만나셨어요?",
      answers: [{ who: null, text: "두 사람의 답변을 입력해주세요." }],
    },
    {
      question: "신혼여행은 어디로 가시나요?",
      answers: [{ who: null, text: "두 사람의 답변을 입력해주세요." }],
    },
  ] as { question: string; answers: { who: "groom" | "bride" | null; text: string }[] }[],
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
        role: "신랑 아버지",
        bank: "은행명",
        number: "000-0000-0000",
        holder: "이태한",
      },
      {
        role: "신랑 어머니",
        bank: "은행명",
        number: "000-0000-0000",
        holder: "김순애",
      },
      {
        role: "신랑",
        bank: "은행명",
        number: "000-0000-0000",
        holder: "이지영",
      },
    ],
    brideSide: [
      {
        role: "신부 아버지",
        bank: "은행명",
        number: "000-0000-0000",
        holder: "최종명",
      },
      {
        role: "신부 어머니",
        bank: "은행명",
        number: "000-0000-0000",
        holder: "장경님",
      },
      {
        role: "신부",
        bank: "은행명",
        number: "000-0000-0000",
        holder: "최혜윤",
      },
    ],
  },
};
