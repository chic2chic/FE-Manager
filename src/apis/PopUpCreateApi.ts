import { PopupWithChoicesRequest } from "@/types/api/ApiRequestType";
import { api } from "./config/Axios";
import {
  ApiResponse,
  PostPopUpCreateResponse,
} from "@/types/api/ApiResponseType";

export const postPopUpCreate = async (
  request: PopupWithChoicesRequest,
): ApiResponse<PostPopUpCreateResponse> => {
  const response = await api.post("/popups", request);
  return response.data;
};
