import { useQuery } from "@tanstack/react-query";
import {
  getAvgPurchase,
  getBestItems,
  getTodayEntrants,
  getTodayReservations,
} from "@/apis/DashBoardApi";
import { GetBestItemsRequest } from "@/types/api/ApiRequestType";

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

export const useBestItemsApi = (params: GetBestItemsRequest) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["top3", "dashboard", params],
    queryFn: async () => {
      const res = await getBestItems(params);
      return res.data;
    },
  });

  return { data, isError, isLoading };
};
