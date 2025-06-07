import { PopUpWithChoicesRequest } from "@/types/api/ApiRequestType";
import { api } from "./config/Axios";
import {
  ApiResponse,
  PostPopUpCreateResponse,
} from "@/types/api/ApiResponseType";
import { useAuthStore } from "@/stores/useAuthStore";

export const postPopUpCreate = async (
  request: PopUpWithChoicesRequest,
): ApiResponse<PostPopUpCreateResponse> => {
  const token = useAuthStore.getState().accessToken;

  const response = await api.post("/popups", request, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return response.data;
};
