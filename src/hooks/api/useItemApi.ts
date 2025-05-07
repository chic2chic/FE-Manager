import { postItem } from "@/apis/ItemAdd";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useItemApi = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postItem,
    onSuccess: response => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      return response;
    },
  });
};
