import { api } from "@/apis/config/Axios";
import { ItemCreateRequest } from "@/types/api/ApiRequestType";
import { ApiResponse, NoResponse } from "@/types/api/ApiResponseType";

export const postItemCreate = async (
  data: ItemCreateRequest,
): ApiResponse<NoResponse> => {
  //   const popUpId = usePopUpStore.getState(state => state.popUpId);
  const popUpId = 1;
  const response = await api.post(`/popups/${popUpId}/items`, data);
  return response.data;
};
