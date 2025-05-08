import {
  GetPresignedUrlRequest,
  UploadImageToS3Request,
} from "@/types/api/ApiRequestType";
import { api } from "../config/Axios";
import {
  ApiResponse,
  GetPresignedUrlResponse,
} from "@/types/api/ApiResponseType";

export const getPresignedUrl = async ({
  imageFileExtension,
  imageDirectory,
}: GetPresignedUrlRequest): ApiResponse<GetPresignedUrlResponse> => {
  const response = await api.post("/images/upload-url", {
    imageFileExtension,
    imageDirectory,
  });
  return response.data;
};

export const putImageToS3 = async ({
  presignedUrl,
  imageFile,
}: UploadImageToS3Request) => {
  const response = await api.put(presignedUrl, imageFile, {
    headers: {
      "Content-Type": imageFile.type,
    },
  });
  return response.status;
};
