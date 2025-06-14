import { getOrderList, postChangeOrderItemStatus } from "@/apis/OrderListApi";
import { PostChangeOrderItemRequest } from "@/types/api/ApiRequestType";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export const useGetOrderListApi = ({
  size,
  popupId,
}: {
  size: number;
  popupId: number;
}) => {
  return useInfiniteQuery({
    queryKey: ["orderItem"],
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
  });
};

export const usePostChangeOrderItemStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ orderItemId, qty, status }: PostChangeOrderItemRequest) =>
      postChangeOrderItemStatus({ orderItemId, qty, status }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["orderItem"] }),
  });
};
