import {
  ApiResponse,
  GetAvgPurchaseResponse,
  EntrantsResponse,
  GetCongestionResponse,
} from "@/types/api/ApiResponseType";
import { api } from "./config/Axios";
import { usePopUpReadStore } from "@/stores/usePopUpReadStore";

export const getCongestion = async (): ApiResponse<GetCongestionResponse> => {
  const popupId = usePopUpReadStore.getState().popupId;
  const response = await api.get(`/popups/${popupId}/dashboard/congestion`);
  return response.data;
};

export const getAvgPurchase = async (): ApiResponse<GetAvgPurchaseResponse> => {
  const popupId = usePopUpReadStore.getState().popupId;
  const response = await api.get(
    `/popups/${popupId}/dashboard/average-purchase`,
  );
  return response.data;
};

export const getTodayReservation = async (): ApiResponse<EntrantsResponse> => {
  const popupId = usePopUpReadStore.getState().popupId;
  const response = await api.get(`/popups/${popupId}/dashboard/entrants`);
  return response.data;
};
