import {
  ApiResponse,
  GetItemListResponse,
  NoResponse,
} from "@/types/api/ApiResponseType";
import { api } from "./config/Axios";
import { usePopUpReadStore } from "@/stores/usePopUpReadStore";
import { ItemAddExcelRequest } from "@/types/api/ApiRequestType";
import { AxiosProgressEvent } from "axios";

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

export const postItemAddExcel = async ({
  excelFile,
  onProgress,
}: ItemAddExcelRequest): ApiResponse<NoResponse> => {
  const popupId = usePopUpReadStore.getState().popupId;
  const formData = new FormData();
  formData.append("form-data", excelFile);

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: (progressEvent: AxiosProgressEvent) => {
      if (onProgress && progressEvent.total) {
        const percentage = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total,
        );
        onProgress(percentage);
      }
    },
  };

  const response = await api.post(
    `/popups/${popupId}/items/excel`,
    formData,
    config,
  );
  return response.data;
};
