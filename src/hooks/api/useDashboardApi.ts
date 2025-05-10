import { useQuery } from "@tanstack/react-query";
import {
  getAvgPurchase,
  getCongestion,
  getTodayReservation,
} from "@/apis/DashBoardApi";

export const useCongestionApi = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["congestion", "dashboard"],
    queryFn: async () => {
      const res = await getCongestion();
      return res.data;
    },
  });

  return { data, isError, isLoading };
};

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
    queryKey: ["todayReservation", "dashboard"],
    queryFn: async () => {
      const res = await getTodayReservation();
      return res.data;
    },
  });

  return { data, isError, isLoading };
};
