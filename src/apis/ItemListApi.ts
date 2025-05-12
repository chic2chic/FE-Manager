import {
  ApiResponse,
  GetItemListResponse,
  NoResponse,
} from "@/types/api/ApiResponseType";
import { api } from "./config/Axios";
import { usePopUpReadStore } from "@/stores/usePopUpReadStore";

export const getItemList = async (): ApiResponse<GetItemListResponse> => {
  const popupId = usePopUpReadStore.getState().popupId;
  const response = await api.get(`/popups/${popupId}/items`);
  return response.data;
};

export const deleteItem = async (itemId: string): ApiResponse<NoResponse> => {
  const popupId = usePopUpReadStore.getState().popupId;
  const response = await api.delete(`/popups/${popupId}/items/${itemId}`);
  return response.data;
};
