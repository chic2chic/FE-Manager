import { TodayReservationResponse } from "@/types/api/ApiResponseType";
import {
  ReservationChartType,
} from "@/types/ReservationType";
import { http, HttpResponse } from "msw";

export const ReservationChartDatas: ReservationChartType[] = [
  { day: "월", value: 220 },
  { day: "화", value: 210 },
  { day: "수", value: 90 },
  { day: "목", value: 130 },
  { day: "금", value: 300 },
  { day: "토", value: 370 },
  { day: "일", value: 310 },
];

export const TodayReservationDatas: TodayReservationResponse = {
  reservedCount: 240,
  enteredCount: 180,
};

export const EntrantsHandlers = [
  http.get("/popups/1/dashboard/entrants", () => {
    return HttpResponse.json(
      {
        success: true,
        status: 200,
        data: TodayReservationDatas,
        timestamp: new Date().toISOString(),
      },
      { status: 200 },
    );
  }),
];