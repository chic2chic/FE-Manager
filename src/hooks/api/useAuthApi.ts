import { postLogin, postLogout } from "@/apis/user/AuthApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAuthApi = () => {
  const queryClient = useQueryClient();

  const invalidateAllQueries = () => {
    queryClient.clear();
  };

  const postLoginMutation = useMutation({
    mutationFn: postLogin,
    onSuccess: invalidateAllQueries,
  });

  const postLogoutMutation = useMutation({
    mutationFn: postLogout,
    onSuccess: invalidateAllQueries,
  });

  return { postLoginMutation, postLogoutMutation };
};
