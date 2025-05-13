import { useAuthStore } from "@/stores/useAuthStore";
import axios, { AxiosError } from "axios";
import { postRefreshAccessToken } from "../user/AuthApi";
import { usePopUpReadStore } from "@/stores/usePopUpReadStore";

export const apiPopUp = axios.create({
  withCredentials: true,
});

apiPopUp.interceptors.request.use(config => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  const baseURL = import.meta.env.VITE_API_URL || "";
  const popUpId = usePopUpReadStore.getState().popupId;
  config.baseURL = `${baseURL}/popups/${popUpId}`;

  return config;
});

apiPopUp.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest?.headers["X-Retry"]
    ) {
      try {
        const refreshResponse = await postRefreshAccessToken();
        const newAccessToken = refreshResponse.data.accessToken;

        useAuthStore.getState().setLogin(newAccessToken);

        originalRequest!.headers["Authorization"] = `Bearer ${newAccessToken}`;
        originalRequest!.headers["X-Retry"] = "true";

        return axios(originalRequest!);
      } catch (refreshError) {
        useAuthStore.getState().setLogout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);
