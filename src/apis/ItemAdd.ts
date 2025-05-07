import { api } from "@/apis/config/Axios";
import { ItemRequest } from "@/types/api/ApiRequestType";
import { ApiResponse, NoResponse } from "@/types/api/ApiResponseType";

export const postItem = async (data: ItemRequest): ApiResponse<NoResponse> => {
  const response = await api.post("/items", data);
  return response.data;
};

// TODO: presigned-url
