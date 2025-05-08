import { postLogin } from "@/apis/user/Auth";
import { QueryClient, useMutation } from "@tanstack/react-query";

const authQueryClient = new QueryClient();

export const useAuthApi = () => {
  return useMutation({
    mutationFn: postLogin,
    onSuccess: response => {
      authQueryClient.invalidateQueries({ queryKey: ["user"] });
      return response;
    },
  });
};
