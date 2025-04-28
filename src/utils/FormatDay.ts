import type { DayOfWeek } from "@/types/CongestionType";

export const dayOfWeekMap: Record<DayOfWeek, string> = {
  mon: "월",
  tue: "화",
  wed: "수",
  thu: "목",
  fri: "금",
  sat: "토",
  sun: "일",
};

export function formatDay(day: DayOfWeek): string {
  return dayOfWeekMap[day];
}
