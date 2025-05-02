import axios, { AxiosError } from "axios";
import { refreshAccessToken } from "../user/auth";
import { useAuthStore } from "@/stores/useAuthStore";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
  config => {
    const token = useAuthStore.getState().token;
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

    if (error.response?.status === 401) {
      try {
        const response = await refreshAccessToken();
        if (response.data.success) {
          return axios(originalRequest!);
        }
      } catch (error) {
        useAuthStore.persist.clearStorage();
        window.location.href = "/onboarding";
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);
