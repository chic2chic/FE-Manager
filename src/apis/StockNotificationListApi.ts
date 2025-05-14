import {
  ApiResponse,
  GetStockNotificationListResponse,
} from "@/types/api/ApiResponseType";
import { apiPopUp } from "./config/PopUpApi";

export const getStockNotificationList =
  async (): ApiResponse<GetStockNotificationListResponse> => {
    const response = await apiPopUp.get(`/notifications/stock`);
    return response.data;
  };
