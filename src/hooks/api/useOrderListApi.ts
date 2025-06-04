import { getOrderList } from "@/apis/OrderListApi";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useGetOrderListApi = ({ size }: { size: number }) => {
  return useInfiniteQuery({
    queryKey: ["orderItem"],
    queryFn: ({ pageParam }) => getOrderList({ lastId: pageParam, size }),
    getNextPageParam: response => {
      const lastPage = response.data;

      if (lastPage.isLast) {
        return undefined;
      }

      const lastItem = lastPage.content[lastPage.content.length - 1];
      return lastItem.orderId;
    },
    initialPageParam: undefined as string | undefined,
  });
};
