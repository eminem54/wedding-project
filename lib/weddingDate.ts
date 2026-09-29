import { weddingInfo } from "@/lib/weddingInfo";

// Read the date parts straight from the ISO string so nothing shifts with the
// viewer's timezone.
const [year, month, day] = weddingInfo.dateTimeISO.slice(0, 10).split("-").map(Number);
const weekdayIndex = new Date(year, month - 1, day).getDay();

const EN_WEEKDAYS = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
const EN_MONTHS = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];
const KO_MONTHS = [
  "일월",
  "이월",
  "삼월",
  "사월",
  "오월",
  "유월",
  "칠월",
  "팔월",
  "구월",
  "시월",
  "십일월",
  "십이월",
];

// Native Korean ordinals: 첫, 두, …, 열, 열한, …, 스무, 스물한, …, 서른한.
const KO_UNITS = ["", "한", "두", "세", "네", "다섯", "여섯", "일곱", "여덟", "아홉"];
function koOrdinal(n: number) {
  if (n === 1) return "첫";
  if (n === 20) return "스무";
  const tens = ["", "열", "스물", "서른"][Math.floor(n / 10)];
  return tens + KO_UNITS[n % 10];
}

const pad = (n: number) => String(n).padStart(2, "0");

export const weddingDate = {
  year,
  month,
  day,
  weekdayIndex,
  weekdayEn: EN_WEEKDAYS[weekdayIndex],
  monthEn: EN_MONTHS[month - 1],
  // e.g. "시월의 열 번째 날."
  poeticLines: [`${KO_MONTHS[month - 1]}의`, `${koOrdinal(day)} 번째 날.`],
  seal: `${pad(month)}.${pad(day)}`,
};
