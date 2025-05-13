import {
  ApiResponse,
  GetAvgPurchaseResponse,
  EntrantsResponse,
  ReservationsResponse,
  GetBestItemsResponse,
  GetCongestionResponse,
  QuestionnaireListResponse,
} from "@/types/api/ApiResponseType";
import { api } from "./config/Axios";
import { usePopUpReadStore } from "@/stores/usePopUpReadStore";
import { GetBestItemsRequest } from "@/types/api/ApiRequestType";

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

export const getTodayEntrants = async (): ApiResponse<EntrantsResponse> => {
  const popupId = usePopUpReadStore.getState().popupId;
  const response = await api.get(`/popups/${popupId}/dashboard/entrants`);
  return response.data;
};

export const getQuestionnaire =
  async (): ApiResponse<QuestionnaireListResponse> => {
    const popupId = usePopUpReadStore.getState().popupId;
    const response = await api.get(`/popups/${popupId}/dashboard/surveys`);
    return response.data;
  };

export const getTodayReservations =
  async (): ApiResponse<ReservationsResponse> => {
    const popupId = usePopUpReadStore.getState().popupId;
    const res = await api.get(`/popups/${popupId}/dashboard/reservations`);
    return res.data;
  };

export const getBestItems = async ({
  gender,
  age,
}: GetBestItemsRequest): ApiResponse<GetBestItemsResponse> => {
  const popupId = usePopUpReadStore.getState().popupId;
  const response = await api.get(
    `/popups/${popupId}/items/trending?gender=${gender}&age=${age}`,
  );
  return response.data;
};
