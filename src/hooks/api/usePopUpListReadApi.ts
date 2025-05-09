import { getPopUpListRead } from "@/apis/PopUpListReadApi";
import { useQuery } from "@tanstack/react-query";

export const usePopUpListReadApi = () => {
  const query = useQuery({
    queryKey: ["popUpList"],
    queryFn: async () => {
      const response = await getPopUpListRead();
      return response.data;
    },
  });

  return {
    cards: query.data,
    isLoading: query.isLoading,
    error: query.error,
  };
};
