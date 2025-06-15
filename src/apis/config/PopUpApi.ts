import { useAuthStore } from "@/stores/useAuthStore";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { postRefreshAccessToken } from "../user/AuthApi";
import { usePopUpReadStore } from "@/stores/usePopUpReadStore";

interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const apiPopUp = axios.create({
  withCredentials: true,
});

let isPopUpRefreshing = false;
let popUpFailedQueue: Array<{
  resolve: (_value: any) => void;
  reject: (_error: any) => void;
}> = [];

const processPopUpQueue = (error: any, token: string | null = null) => {
  popUpFailedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });
  popUpFailedQueue = [];
};

apiPopUp.interceptors.request.use(
  config => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    const baseURL = import.meta.env.VITE_API_URL || "";
    const popUpId = usePopUpReadStore.getState().popupId;
    config.baseURL = `${baseURL}/popups/${popUpId}`;

    return config;
  },
  (error: Error) => {
    return Promise.reject(error);
  },
);

apiPopUp.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as ExtendedAxiosRequestConfig;

    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      originalRequest &&
      !originalRequest._retry
    ) {
      if (isPopUpRefreshing) {
        return new Promise((resolve, reject) => {
          popUpFailedQueue.push({ resolve, reject });
        })
          .then(token => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return apiPopUp(originalRequest);
          })
          .catch(err => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isPopUpRefreshing = true;

      try {
        const refreshResponse = await postRefreshAccessToken();
        const newAccessToken = refreshResponse.data.accessToken;

        useAuthStore.getState().setLogin(newAccessToken);
        processPopUpQueue(null, newAccessToken);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }
        return apiPopUp(originalRequest);
      } catch (refreshError) {
        processPopUpQueue(refreshError, null);
        useAuthStore.getState().setLogout();
        return Promise.reject(refreshError);
      } finally {
        isPopUpRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);
