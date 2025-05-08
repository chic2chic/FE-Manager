import axios, { AxiosError } from "axios";
import { refreshAccessToken } from "@/apis/user/Auth";
import { useAuthStore } from "@/stores/useAuthStore";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
  config => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error: Error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest?.headers["X-Retry"]
    ) {
      try {
        const refreshResponse = await refreshAccessToken();
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
