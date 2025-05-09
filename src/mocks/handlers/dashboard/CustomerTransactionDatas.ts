import { GetAvgPurchaseResponse } from "@/types/api/ApiResponseType";
import { http, HttpResponse } from "msw";

export const CustomerTransactionDatas: GetAvgPurchaseResponse = {
  totalPrice: 89600,
  todayPrice: 124600,
};

export const DashboardHandlers = [
  http.get("/popups/1/dashboard/average-purchase", () => {
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
