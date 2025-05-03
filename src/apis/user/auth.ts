import Cookies from "js-cookie";
import { api } from "../config/Axios";

export const refreshAccessToken = async () => {
  const refreshToken = Cookies.get("refreshToken");
  return api.post("/auth/refresh", { refreshToken });
};

export const loginApi = async (credentials: {
  username: string;
  password: string;
}) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};
