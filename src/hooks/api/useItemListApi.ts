import { deleteItem, getItemList } from "@/apis/ItemListApi";
import { ErrorMessage } from "@/utils/ErrorMessage";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useItemListApi = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["popups"],
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
  const deleteItemMutation = useMutation({
    mutationFn: async (itemId: string) => {
      await deleteItem(itemId);
    },
    onError: error => {
      throw new Error(`아이템 삭제 에러 : ${ErrorMessage(error)}`);
    },
  });

  return { deleteItemMutation };
};
