import { api } from "./config/Axios";
import {
  ApiResponse,
  GetPopUpListReadResponse,
  NoResponse,
} from "@/types/api/ApiResponseType";
import { apiPopUp } from "./config/PopUpApi";

export const getPopUpListRead =
  async (): ApiResponse<GetPopUpListReadResponse> => {
    const response = await api.get("/popups");
    return response.data;
  };

export const deletePopUp = async (): ApiResponse<NoResponse> => {
  const response = await apiPopUp.delete("");
  return response.data;
};
