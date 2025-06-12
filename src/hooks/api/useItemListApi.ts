import { deleteItem, getItemList } from "@/apis/ItemListApi";
import { QUERY_KEYS } from "@/hooks/api/queryKey";
import { ErrorMessage } from "@/utils/ErrorMessage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useItemListApi = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: QUERY_KEYS.ITEM.INDEX,
    queryFn: async () => {
      const response = await getItemList();
      return response.data;
    },
  });

  return { data, isLoading, isError };
};

export const useItemDeleteApi = () => {
  const queryClient = useQueryClient();
  const deleteItemMutation = useMutation({
    mutationFn: async (itemId: string) => {
      await deleteItem(itemId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ITEM.INDEX });
    },
    throwOnError: true,
    onError: error => {
      throw new Error(`상품 삭제 에러 : ${ErrorMessage(error)}`);
    },
  });

  return { deleteItemMutation };
};
