import { loginApi } from "@/apis/user/auth";
import { LoginErrorMsg } from "@/constants/Message";
import { useAuthStore } from "@/stores/useAuthStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const COOKIE_OPTIONS = {
  secure: false,
  sameSite: "strict" as const,
  expires: 7,
};

export const useAuth = () => {
  const queryClient = useQueryClient();
  const { login: loginAction, logout: logoutAction, isLogin } = useAuthStore();
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const login = useMutation({
    mutationFn: loginApi,
    onSuccess: response => {
      loginAction(response.data.accessToken);
      Cookies.set("refreshToken", response.data.refreshToken, COOKIE_OPTIONS);

      navigate("/popup-list");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: () => {
      setShowErrorModal(true);
    },
  });

  const logout = () => {
    logoutAction();
    Cookies.remove("refreshToken");
    navigate("/onboarding");
  };

  const handleCloseModal = () => {
    setShowErrorModal(false);
  };

  return {
    login,
    logout,
    isLogin,
    LoginErrorMsg,
    showErrorModal,
    handleCloseModal,
  };
};
