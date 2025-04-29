import {
  ReservationChartType,
  TodayReservationType,
} from "@/types/ReservationType";

export const ReservationChartDatas: ReservationChartType[] = [
  { day: "월", value: 220 },
  { day: "화", value: 210 },
  { day: "수", value: 90 },
  { day: "목", value: 130 },
  { day: "금", value: 300 },
  { day: "토", value: 370 },
  { day: "일", value: 310 },
];

export const TodayReservationDatas: TodayReservationType = {
  reservedCount: 240,
  enteredCount: 180,
};
