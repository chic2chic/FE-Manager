import {
  ApiResponse,
  GetAvgPurchaseResponse,
  EntrantsResponse,
  ReservationsResponse,
  GetBestItemsResponse,
  GetCongestionResponse,
  QuestionnaireListResponse,
  GetConversionResponse,
  VisitorResponse,
} from "@/types/api/ApiResponseType";
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
    const response = await apiPopUp.get(`/dashboard/surveys`);
    return response.data;
  };

export const getTodayReservations =
  async (): ApiResponse<ReservationsResponse> => {
    const response = await apiPopUp.get(`/dashboard/reservations`);
    return response.data;
  };

export const getBestItems = async (): ApiResponse<GetBestItemsResponse> => {
  const response = await apiPopUp.get(`/dashboard/trending`);
  return response.data;
};

export const getConversion = async (): ApiResponse<GetConversionResponse> => {
  const response = await apiPopUp.get(`/dashboard/conversion-ratio`);
  return response.data;
};

export const getVisitor = async (): ApiResponse<VisitorResponse> => {
  const response = await apiPopUp.get(`/dashboard/visitors`);
  return response.data;
};
