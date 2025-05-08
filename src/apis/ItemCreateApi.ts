import { api } from "@/apis/config/Axios";
import { ItemCreateRequest } from "@/types/api/ApiRequestType";
import { ApiResponse, NoResponse } from "@/types/api/ApiResponseType";

export const postItemCreate = async (
  data: ItemCreateRequest,
): ApiResponse<NoResponse> => {
  const response = await api.post("/items", data);
  return response.data;
};
