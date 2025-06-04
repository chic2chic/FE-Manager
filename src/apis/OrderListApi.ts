import {
  ApiResponse,
  GetOrderListResponse,
  NoResponse,
} from "@/types/api/ApiResponseType";
import { api } from "./config/Axios";
import {
  GetOrderListRequest,
  PostChangeOrderItemRequest,
} from "@/types/api/ApiRequestType";

export const getOrderList = async ({
  lastOrderItemId,
  size,
}: GetOrderListRequest): ApiResponse<GetOrderListResponse> => {
  const response = await api.get("/order-items/", {
    params: {
      ...(lastOrderItemId && { lastOrderItemId }),
      size: size || 10,
    },
  });
  return response.data;
};

export const postChangeOrderItemStatus = async ({
  orderItemId,
  qty,
  status,
}: PostChangeOrderItemRequest): ApiResponse<NoResponse> => {
  const response = await api.post(`/order-items/status/${orderItemId}`, {
    qty,
    status,
  });
  return response.data;
};
