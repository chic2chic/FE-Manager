import { postItemCreate } from "@/apis/ItemCreatePage";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useItemCreateApi = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postItemCreate,
    onSuccess: response => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      return response;
    },
  });
};
