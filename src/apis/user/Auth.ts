import Cookies from "js-cookie";
import { api } from "../config/Axios";
import {
  ApiResponse,
  LoginResponse,
  RefreshTokenResponse,
} from "@/types/api/ApiResponseType";

export const refreshAccessToken =
  async (): ApiResponse<RefreshTokenResponse> => {
    const refreshToken = Cookies.get("refreshToken");
    const response = await api.post("/auth/reissue", { refreshToken });
    return response.data;
  };

export const loginApi = async (credentials: {
  username: string;
  password: string;
}): ApiResponse<LoginResponse> => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};
