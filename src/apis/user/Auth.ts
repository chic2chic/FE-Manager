import { api } from "@/apis/config/Axios";
import { ApiResponse, LoginResponse } from "@/types/api/ApiResponseType";

export const refreshAccessToken = async (): ApiResponse<LoginResponse> => {
  const response = await api.post("/auth/reissue");
  return response.data;
};

export const loginApi = async (credentials: {
  username: string;
  password: string;
}): ApiResponse<LoginResponse> => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};
