import {
  ApiResponse,
  GetAvgPurchaseResponse,
} from "@/types/api/ApiResponseType";
import { api } from "./config/Axios";

export const getAvgPurchase = async (): ApiResponse<GetAvgPurchaseResponse> => {
  const popupId = 1;
  const response = await api.get(
    `/popups/${popupId}/dashboard/average-purchase`,
  );
  return response.data;
};
