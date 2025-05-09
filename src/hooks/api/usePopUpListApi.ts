import { getItemList } from "@/apis/ItemListApi";
import { useQuery } from "@tanstack/react-query";

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
