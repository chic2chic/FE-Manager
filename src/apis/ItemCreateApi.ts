import { api } from "@/apis/config/Axios";
import { usePopUpReadStore } from "@/stores/usePopUpReadStore";
import {
  ItemCreateRequest,
  PatchItemRequest,
} from "@/types/api/ApiRequestType";
import {
  ApiResponse,
  NoResponse,
  PatchItemResponse,
} from "@/types/api/ApiResponseType";

export const postItemCreate = async (
  data: ItemCreateRequest,
): ApiResponse<NoResponse> => {
  const popupId = usePopUpReadStore.getState().popupId;
  const response = await api.post(`/popups/${popupId}/items`, data);
  return response.data;
};

export const patchItem = async ({
  itemId,
  minStock,
}: PatchItemRequest): ApiResponse<PatchItemResponse> => {
  const popupId = usePopUpReadStore.getState().popupId;
  const response = await api.patch(`/popups/${popupId}/items/${itemId}`, {
    minStock,
  });
  return response.data;
};
