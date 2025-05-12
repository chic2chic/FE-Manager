import { api } from "@/apis/config/Axios";
import { LoginRequest } from "@/types/api/ApiRequestType";
import {
  ApiResponse,
  LoginResponse,
  NoResponse,
} from "@/types/api/ApiResponseType";

export const postRefreshAccessToken = async (): ApiResponse<LoginResponse> => {
  const response = await api.post("/auth/reissue");
  return response.data;
};

export const postLogin = async (
  credentials: LoginRequest,
): ApiResponse<LoginResponse> => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};

export const postLogout = async (): ApiResponse<NoResponse> => {
  const response = await api.post("/managers/logout");
  return response.data;
};
