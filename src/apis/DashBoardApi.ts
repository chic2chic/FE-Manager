import {
  ApiResponse,
  GetAvgPurchaseResponse,
  TodayReservationResponse,
} from "@/types/api/ApiResponseType";
import { api } from "./config/Axios";

export const getAvgPurchase = async (): ApiResponse<GetAvgPurchaseResponse> => {
  const popupId = 1;
  const response = await api.get(
    `/popups/${popupId}/dashboard/average-purchase`,
  );
  return response.data;
};

export const getTodayReservation =
  async (): ApiResponse<TodayReservationResponse> => {
    const popupId = 1;
    const response = await api.get(`/popups/${popupId}/dashboard/entrants`);
    return response.data;
  };
