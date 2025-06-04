import { ApiResponse, GetOrderListResponse } from "@/types/api/ApiResponseType";
import { api } from "./config/Axios";
import { GetOrderListRequest } from "@/types/api/ApiRequestType";

export const getOrderList = async ({
  lastId,
  size,
}: GetOrderListRequest): ApiResponse<GetOrderListResponse> => {
  const response = await api.get("/orderItems/", {
    params: {
      ...(lastId && { lastId }),
      size: size || 10,
    },
  });
  return response.data;
};
