import { api } from "./config/Axios";
import {
  ApiResponse,
  GetPopUpListReadResponse,
  NoResponse,
} from "@/types/api/ApiResponseType";

export const getPopUpListRead =
  async (): ApiResponse<GetPopUpListReadResponse> => {
    const response = await api.get("/popups");
    return response.data;
  };

export const deletePopUp = async (popUpId: string): ApiResponse<NoResponse> => {
  const response = await api.delete(`/popups/${popUpId}`);
  return response.data;
};
