import { useQuery } from "@tanstack/react-query";
import { getAvgPurchase } from "@/apis/DashBoardApi";
import type { GetAvgPurchaseResponse } from "@/types/api/ApiResponseType";

export function useDashboardApi() {
  return useQuery<GetAvgPurchaseResponse, Error>({
    queryKey: ["avgPurchase"],
    queryFn: async () => {
      const res = await getAvgPurchase();
      return res.data;
    },
    retry: 1,
  });
}
