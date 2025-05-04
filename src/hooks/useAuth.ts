import { useAuthStore } from "@/stores/useAuthStore";
import { useAuthApi } from "./api/useAuthApi";
import Cookies from "js-cookie";
import { ErrorMessage } from "@/utils/ErrorMessage";
import { LoginRequest } from "@/types/api/ApiRequestType";

const COOKIE_OPTIONS = {
  secure: false,
  sameSite: "strict" as const,
  expires: 7,
};

export const useAuth = () => {
  const { isLogin, setLogin, setLogout } = useAuthStore();
  const mutate = useAuthApi();

  const login = async ({ username, password }: LoginRequest) => {
    try {
      const response = await mutate.mutateAsync({ username, password });
      setLogin(response.data.accessToken);
      Cookies.set("refreshToken", response.data.refreshToken, COOKIE_OPTIONS);
    } catch (error) {
      throw new Error(`로그인 오류 ${ErrorMessage(error)}`);
    }
  };

  const logout = () => {
    setLogout();
  };

  return { isLogin, login, logout, error: mutate.error };
};
