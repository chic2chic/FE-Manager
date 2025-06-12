import { getOrderList, postChangeOrderItemStatus } from "@/apis/OrderListApi";
import { QUERY_KEYS } from "@/hooks/api/queryKey";
import { usePopUpReadStore } from "@/stores/usePopUpReadStore";
import { PostChangeOrderItemRequest } from "@/types/api/ApiRequestType";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export const useGetOrderListApi = ({ size }: { size: number }) => {
  const popupId = usePopUpReadStore(state => state.popupId);

  return useInfiniteQuery({
    queryKey: QUERY_KEYS.ORDER_ITEM.INDEX,
    queryFn: ({ pageParam }) =>
      getOrderList({ lastOrderItemId: pageParam, size, popupId }),
    getNextPageParam: response => {
      const lastPage = response.data;

      if (lastPage.isLast) {
        return undefined;
      }

      const lastItem = lastPage.content[lastPage.content.length - 1];
      return lastItem.orderItemId;
    },
    initialPageParam: undefined as number | undefined,
    enabled: !!popupId,
    staleTime: 0, // 항상 캐시 무효화 (websocket과 동기화)
  });
};

export const usePostChangeOrderItemStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ orderItemId, qty, status }: PostChangeOrderItemRequest) =>
      postChangeOrderItemStatus({ orderItemId, qty, status }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ORDER_ITEM.INDEX }),
  });
};
