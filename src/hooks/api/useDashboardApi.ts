import { useQuery } from "@tanstack/react-query";
import { getAvgPurchase, getTodayReservation } from "@/apis/DashBoardApi";

export const useAvgPurchaseApi = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["avgPurchase"],
    queryFn: async () => {
      const res = await getAvgPurchase();
      return res.data;
    },
  });

  return { data, isError, isLoading };
};

export const useTodayReservationApi = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["todayReservation"],
    queryFn: async () => {
      const res = await getTodayReservation();
      return res.data;
    },
  });

  return { data, isError, isLoading };
};
