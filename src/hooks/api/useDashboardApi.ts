import { useQuery } from "@tanstack/react-query";
import { getAvgPurchase } from "@/apis/DashBoardApi";

export const useDashboardApi = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["avgPurchase"],
    queryFn: async () => {
      const res = await getAvgPurchase();
      return res.data;
    },
  });

  return { data, isError, isLoading };
};
