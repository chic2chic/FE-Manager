import Cookies from "js-cookie";
import { api } from "../config/Axios";
import { ApiResponse, LoginResponse } from "@/types/api/ApiResponseType";

export const refreshAccessToken = async () => {
  const refreshToken = Cookies.get("refreshToken");
  return api.post("/auth/refresh", { refreshToken });
};

export const loginApi = async (credentials: {
  username: string;
  password: string;
}): ApiResponse<LoginResponse> => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};
