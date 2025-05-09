import {
  ApiResponse,
  GetAvgPurchaseResponse,
} from "@/types/api/ApiResponseType";
import { api } from "./config/Axios";

export const getAvgPurchase = async (): ApiResponse<GetAvgPurchaseResponse> => {
  const response = await api.get("/CustomerTransactionDatas");
  return response.data;
};
