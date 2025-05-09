import { api } from "./config/Axios";
import {
  ApiResponse,
  GetPopUpListReadResponse,
} from "@/types/api/ApiResponseType";

export const getPopUpListRead =
  async (): ApiResponse<GetPopUpListReadResponse> => {
    const response = await api.get("/popups");
    return response.data;
  };
