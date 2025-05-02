import { loginApi } from "@/apis/user/auth";
import { LoginErrorMsg } from "@/constants/Message";
import { useAuthStore } from "@/stores/useAuthStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const queryClient = useQueryClient();
  const { login: loginAction, logout: logoutAction, isLogin } = useAuthStore();
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const login = useMutation({
    mutationFn: loginApi,
    onSuccess: response => {
      loginAction(response.data.accessToken);
      navigate("/popup-list");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: () => {
      setShowErrorModal(true);
    },
  });

  const logout = () => {
    logoutAction();
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
