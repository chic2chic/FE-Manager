import axios from "axios";

export const api = axios.create({
  baseURL: `http://${import.meta.env.VITE_API_URL as string}`,
});

// api.interceptors.request.use(
//   config => {
//     const token = localStorage.getItem("access_token");
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error: Error) => {
//     return Promise.reject(error);
//   },
// );

// api.interceptors.response.use(
//   response => response,
//   (error: AxiosError) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem("access_token");
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   },
// );
