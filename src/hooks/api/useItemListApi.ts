import { deleteItem, getItemList } from "@/apis/ItemListApi";
import { ErrorMessage } from "@/utils/ErrorMessage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useItemListApi = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["itemList"],
    queryFn: async () => {
      const response = await getItemList();
      return response.data;
    },
  });

  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
  };
};

export const useItemDeleteApi = () => {
  const queryClient = useQueryClient();
  const deleteItemMutation = useMutation({
    mutationFn: async (itemId: string) => {
      await deleteItem(itemId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["itemList"] });
    },
    throwOnError: true,
    onError: error => {
      throw new Error(`아이템 삭제 에러 : ${ErrorMessage(error)}`);
    },
  });

  return { deleteItemMutation };
};
