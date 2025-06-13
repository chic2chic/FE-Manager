import { getStockNotificationList } from "@/apis/StockNotificationListApi";
import { QUERY_KEYS } from "@/hooks/api/queryKey";
import { useQuery } from "@tanstack/react-query";

export const useStockNotificationListApi = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: QUERY_KEYS.STOCK_NOTIFICATION.INDEX,
    queryFn: async () => {
      const response = await getStockNotificationList();
      return response.data;
    },
  });

  return { data, isLoading, isError };
};
