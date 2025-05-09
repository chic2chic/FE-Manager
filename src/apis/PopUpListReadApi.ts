import { api } from "./config/Axios";
import {
  ApiResponse,
  GetPopUpListReadResponse,
} from "@/types/api/ApiResponseType";

export const getPopUpListRead =
  async (): ApiResponse<GetPopUpListReadResponse> => {
    const response = await api.get("/popups");
    console.log("API 응답", response.data);
    return response.data;
  };
