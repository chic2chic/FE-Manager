import { loginApi } from "@/apis/user/Auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAuthApi = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginApi,
    onSuccess: response => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      return response;
    },
  });
};
