import { ApiResponse, GetItemListResponse } from "@/types/api/ApiResponseType";
import { api } from "./config/Axios";

export const getItemList = async (): ApiResponse<GetItemListResponse> => {
  //   const popUpId = usePopUpStore.getState(state => state.popUpId);
  const popupId = 1;
  const response = await api.get(`/popups/${popupId}/items`);
  return response.data;
};
