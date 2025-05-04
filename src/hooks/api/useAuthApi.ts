import { loginApi } from "@/apis/user/Auth";
import { QueryClient, useMutation } from "@tanstack/react-query";

const authQueryClient = new QueryClient();

export const useAuthApi = () => {
  return useMutation({
    mutationFn: loginApi,
    onSuccess: response => {
      authQueryClient.invalidateQueries({ queryKey: ["user"] });
      return response;
    },
  });
};
