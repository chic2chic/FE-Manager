import { getStockNotificationList } from "@/apis/StockNotificationListApi";
import { useQuery } from "@tanstack/react-query";

export const useStockNotificationListApi = () => {
  const query = useQuery({
    queryKey: ["stockNotification"],
    queryFn: async () => {
      const response = await getStockNotificationList();
      return response.data;
    },
    refetchInterval: 10 * 60 * 1000, // 10분마다 요청
    refetchIntervalInBackground: true, // 백그라운드에서도 10분마다 요청
  });

  return {
    notifications: query.data,
    isLoading: query.isLoading,
    error: query.error,
  };
};
