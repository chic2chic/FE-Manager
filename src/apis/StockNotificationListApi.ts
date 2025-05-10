import { usePopUpReadStore } from "@/stores/usePopUpReadStore";
import { api } from "./config/Axios";
import {
  ApiResponse,
  GetStockNotificationListResponse,
} from "@/types/api/ApiResponseType";

export const getStockNotificationList =
  async (): ApiResponse<GetStockNotificationListResponse> => {
    const popupId = usePopUpReadStore.getState().popupId;
    const response = await api.get(`/popups/${popupId}/notifications/stock`);
    return response.data;
  };
