import { useAuthStore } from "@/stores/useAuthStore";
import { ErrorMessage } from "@/utils/ErrorMessage";
import { LoginRequest } from "@/types/api/ApiRequestType";
import { useAuthApi } from "@/hooks/api/useAuthApi";

export const useAuth = () => {
  const { isLogin, setLogin, setLogout } = useAuthStore();
  const { postLoginMutation, postLogoutMutation } = useAuthApi();

  const login = async ({ username, password }: LoginRequest) => {
    try {
      const response = await postLoginMutation.mutateAsync({
        username,
        password,
      });
      setLogin(response.data.accessToken);
    } catch (error) {
      throw new Error(`로그인 오류 ${ErrorMessage(error)}`);
    }
  };

  const logout = async () => {
    const response = await postLogoutMutation.mutateAsync();
    if (response.status === 200) setLogout();
  };

  return { isLogin, login, logout };
};
