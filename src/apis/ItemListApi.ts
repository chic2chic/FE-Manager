import {
  ApiResponse,
  GetItemListResponse,
  NoResponse,
} from "@/types/api/ApiResponseType";
import { ItemAddExcelRequest } from "@/types/api/ApiRequestType";
import { AxiosProgressEvent } from "axios";
import { apiPopUp } from "./config/PopUpApi";

export const getItemList = async (): ApiResponse<GetItemListResponse> => {
  const response = await apiPopUp.get(`/items`);
  return response.data;
};

export const deleteItem = async (itemId: string): ApiResponse<NoResponse> => {
  const response = await apiPopUp.delete(`/items/${itemId}`);
  return response.data;
};

export const postItemAddExcel = async ({
  excelFile,
  onProgress,
}: ItemAddExcelRequest): ApiResponse<NoResponse> => {
  const formData = new FormData();
  formData.append("itemFile", excelFile);

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

  const response = await apiPopUp.post(`/items/excel`, formData, config);
  return response.data;
};
