import {
  ApiResponse,
  GetAvgPurchaseResponse,
  EntrantsResponse,
  ReservationsResponse,
  GetBestItemsResponse,
  GetCongestionResponse,
  QuestionnaireListResponse,
  GetConversionResponse,
  VisitorStatsResponse,
} from "@/types/api/ApiResponseType";
import { GetBestItemsRequest } from "@/types/api/ApiRequestType";
import { apiPopUp } from "./config/PopUpApi";

export const getCongestion = async (): ApiResponse<GetCongestionResponse> => {
  const response = await apiPopUp.get(`/dashboard/congestion`);
  return response.data;
};

export const getAvgPurchase = async (): ApiResponse<GetAvgPurchaseResponse> => {
  const response = await apiPopUp.get(`/dashboard/average-purchase`);
  return response.data;
};

export const getTodayEntrants = async (): ApiResponse<EntrantsResponse> => {
  const response = await apiPopUp.get(`/dashboard/entrants`);
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
    const res = await apiPopUp.get(`/dashboard/reservations`);
    return res.data;
  };

export const getBestItems = async ({
  gender,
  age,
}: GetBestItemsRequest): ApiResponse<GetBestItemsResponse> => {
  const response = await apiPopUp.get(
    `/items/trending?gender=${gender}&age=${age}`,
  );
  return response.data;
};

export const getConversion = async (): ApiResponse<GetConversionResponse> => {
  const popupId = usePopUpReadStore.getState().popupId;
  const response = await api.get(
    `/popups/${popupId}/dashboard/conversion-ratio`,
  );
  return response.data;
};

export const getVisitorStats = async (): ApiResponse<VisitorStatsResponse> => {
  const popupId = usePopUpReadStore.getState().popupId;
  const response = await api.get(`/popups/${popupId}/dashboard/visitors`);
  return response.data;
};
