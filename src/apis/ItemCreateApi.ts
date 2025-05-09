import { api } from "@/apis/config/Axios";
import { usePopUpReadStore } from "@/stores/usePopUpReadStore";
import { ItemCreateRequest } from "@/types/api/ApiRequestType";
import { ApiResponse, NoResponse } from "@/types/api/ApiResponseType";

export const postItemCreate = async (
  data: ItemCreateRequest,
): ApiResponse<NoResponse> => {
  const popupId = usePopUpReadStore.getState().popupId;
  const response = await api.post(`/popups/${popupId}/items`, data);
  return response.data;
};
