import {
  ItemCreateRequest,
  PatchItemRequest,
} from "@/types/api/ApiRequestType";
import {
  ApiResponse,
  NoResponse,
  PatchItemResponse,
} from "@/types/api/ApiResponseType";
import { apiPopUp } from "./config/PopUpApi";

export const postItemCreate = async (
  data: ItemCreateRequest,
): ApiResponse<NoResponse> => {
  const response = await apiPopUp.post(`/items`, data);
  return response.data;
};

export const patchItem = async ({
  itemId,
  minStock,
}: PatchItemRequest): ApiResponse<PatchItemResponse> => {
  const response = await apiPopUp.patch(`/items/${itemId}`, {
    minStock,
  });
  return response.data;
};
