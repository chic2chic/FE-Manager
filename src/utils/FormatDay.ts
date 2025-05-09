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

// YYYY-MM-DD
export function formatDateToString(date: Date): string {
  return date.toISOString().split("T")[0];
}

// 12:00:00
export function formatTimeToString(hours: number): string {
  const paddedHours = String(Math.floor(hours)).padStart(2, "0");
  return `${paddedHours}:00:00`;
}

// YYYY-MM-DDThh:mm:ss
export function formatDateTimeToString(date: Date, hours: number): string {
  const newDate = new Date(date);
  newDate.setHours(hours, 0, 0, 0);
  return newDate.toISOString().split(".")[0];
}
