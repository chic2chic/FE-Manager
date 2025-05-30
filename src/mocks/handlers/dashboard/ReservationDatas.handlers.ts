import {
  EntrantsResponse,
  ReservationChartResponse,
  ReservationsResponse,
} from "@/types/api/ApiResponseType";
import { http, HttpResponse } from "msw";

// export const ReservationChartDatas: ReservationChartResponse[] = [
//   { day: "월", value: 220 },
//   { day: "화", value: 210 },
//   { day: "수", value: 90 },
//   { day: "목", value: 130 },
//   { day: "금", value: 300 },
//   { day: "토", value: 370 },
//   { day: "일", value: 310 },
// ];

export const ReservationChartDatas: ReservationChartResponse[] = [
  { day: "월", reservedCount: 1 },
  { day: "화", reservedCount: 2 },
  { day: "수", reservedCount: 3 },
  { day: "목", reservedCount: 0 },
  { day: "금", reservedCount: 4 },
  { day: "토", reservedCount: 0 },
  { day: "일", reservedCount: 1 },
];

export const TodayEntrantsDatas: EntrantsResponse = {
  entrantCount: 0,
};

export const TodayReservationDatas: ReservationsResponse = {
  reservedCount: 200,
  chart: ReservationChartDatas,
};

export const EntrantsHandlers = [
  http.get("/popups/:popupId/dashboard/entrants", () => {
    return HttpResponse.json(
      {
        success: true,
        status: 200,
        data: TodayEntrantsDatas,
        timestamp: new Date().toISOString(),
      },
      { status: 200 },
    );
  }),
];

export const ReservationsHandlers = [
  http.get("/popups/:popupId/dashboard/reservations", () => {
    return HttpResponse.json(
      {
        success: true,
        status: 200,
        data: TodayReservationDatas,
        // data: { reservedCount: 0, chart: [] } as ReservationsResponse,
        timestamp: new Date().toISOString(),
      },
      { status: 200 },
    );
  }),
];
