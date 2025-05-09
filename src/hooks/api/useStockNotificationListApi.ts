import { getStockNotificationList } from "@/apis/StockNotificationListApi";
import { useQuery } from "@tanstack/react-query";

export const useStockNotificationListApi = () => {
  const query = useQuery({
    queryKey: ["stockNotification"],
    queryFn: async () => {
      const response = await getStockNotificationList();
      return response.data;
    },
  });

  return {
    notifications: query.data,
    isLoading: query.isLoading,
    error: query.error,
  };
};
