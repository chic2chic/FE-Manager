import { useQuery } from "@tanstack/react-query";
import {
  getAvgPurchase,
  getTodayEntrants,
  getTodayReservations,
} from "@/apis/DashBoardApi";

export const useAvgPurchaseApi = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["avgPurchase", "dashboard"],
    queryFn: async () => {
      const res = await getAvgPurchase();
      return res.data;
    },
  });

  return { data, isError, isLoading };
};

export const useTodayEntrantsApi = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["todayEntrants", "dashboard"],
    queryFn: async () => {
      const res = await getTodayEntrants();
      return res.data;
    },
  });

  return { data, isError, isLoading };
};

export const useTodayReservationsApi = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["todayReservation", "dashboard"],
    queryFn: async () => {
      const res = await getTodayReservations();
      return res.data;
    },
  });

  return { data, isError, isLoading };
};
