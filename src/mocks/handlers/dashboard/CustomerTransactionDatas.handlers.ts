import { GetAvgPurchaseResponse } from "@/types/api/ApiResponseType";
import { http, HttpResponse } from "msw";

export const CustomerTransactionDatas: GetAvgPurchaseResponse = {
  totalAverageAmount: 0,
  todayAverageAmount: 0,
};

export const DashboardHandlers = [
  http.get("/popups/:popupId/dashboard/average-purchase", () => {
    return HttpResponse.json(
      {
        success: true,
        status: 200,
        data: CustomerTransactionDatas,
        timestamp: new Date().toISOString(),
      },
      { status: 200 },
    );
  }),
];
