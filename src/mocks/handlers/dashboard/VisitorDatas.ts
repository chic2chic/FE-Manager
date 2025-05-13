import { VisitorStatsResponse } from "@/types/api/ApiResponseType";
import { http, HttpResponse } from "msw";


export const visitorStatsMockData: VisitorStatsResponse = {
  gender: [
    { name: "남성", count: 200, ratio: 50 },
    { name: "여성", count: 200, ratio: 50 },
  ],
  age: [
    { name: "10대", count: 200, ratio: 20 },
    { name: "20대", count: 300, ratio: 30 },
    { name: "30대", count: 300, ratio: 30 },
    { name: "40대", count: 200, ratio: 20 },
  ],
};

export const VisitorStatsHandlers = [
  http.get("/popups/:popupId/dashboard/visitors", () => {
    return HttpResponse.json(
      {
        success: true,
        status: 200,
        data: visitorStatsMockData,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  }),
];
