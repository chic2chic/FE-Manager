import { PopUpCreateRequest } from "@/types/api/ApiRequestType";
import { api } from "./config/Axios";
import { ApiResponse, NoResponse } from "@/types/api/ApiResponseType";

export const postPopUpCreate = async (
  formData: PopUpCreateRequest,
): ApiResponse<NoResponse> => {
  const response = await api.post("/popup", formData);
  return response.data;
};
