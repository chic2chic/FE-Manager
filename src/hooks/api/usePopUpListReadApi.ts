import { getPopUpListRead } from "@/apis/PopUpListReadApi";
import { useQuery } from "@tanstack/react-query";

export const usePopUpListReadApi = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["popUpList"],
    queryFn: () => getPopUpListRead(),
  });

  return {
    data,
    isLoading,
    error,
  };
};
