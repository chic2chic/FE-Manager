import {
  ApiResponse,
  GetAvgPurchaseResponse,
  EntrantsResponse,
  ReservationsResponse,
} from "@/types/api/ApiResponseType";
import { api } from "./config/Axios";
import { usePopUpReadStore } from "@/stores/usePopUpReadStore";

export const getAvgPurchase = async (): ApiResponse<GetAvgPurchaseResponse> => {
  const popupId = usePopUpReadStore.getState().popupId;
  const response = await api.get(
    `/popups/${popupId}/dashboard/average-purchase`,
  );
  return response.data;
};

export const getTodayEntrants = async (): ApiResponse<EntrantsResponse> => {
  const popupId = usePopUpReadStore.getState().popupId;
  const response = await api.get(`/popups/${popupId}/dashboard/entrants`);
  return response.data;
};

export const getTodayReservations =
  async (): ApiResponse<ReservationsResponse> => {
    const popupId = usePopUpReadStore.getState().popupId;
    const res = await api.get(`/popups/${popupId}/dashboard/reservations`);
    return res.data;
  };
