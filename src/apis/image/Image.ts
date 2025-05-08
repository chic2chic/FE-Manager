import {
  ApiResponse,
  GetPresignedUrlResponse,
} from "@/types/api/ApiResponseType";
import { api, apiS3 } from "../config/Axios";
import { PresignedUrlRequest } from "@/types/api/ApiRequestType";

export const postCreatePresignedUrl = async ({
  imageFileExtension,
}: PresignedUrlRequest): ApiResponse<GetPresignedUrlResponse> => {
  const response = await api.post("/popups/upload-url", imageFileExtension);
  return response.data;
};

export const putImgToS3 = async ({
  presignedUrl,
  imageFile,
}: {
  presignedUrl: string;
  imageFile: File;
}) => {
  const response = await apiS3.put(presignedUrl, imageFile);
  return response.status;
};
