import {
  GetPresignedUrlRequest,
  UploadImageToS3Request,
} from "@/types/api/ApiRequestType";
import { api, apiS3 } from "../config/Axios";
import {
  ApiResponse,
  GetPresignedUrlResponse,
} from "@/types/api/ApiResponseType";

export const postCreatePresignedUrl = async ({
  imageFileExtension,
  imageDirectory,
}: GetPresignedUrlRequest): ApiResponse<GetPresignedUrlResponse> => {
  const response = await api.post("/images/presigned-url", {
    imageFileExtension,
    imageDirectory,
  });
  return response.data;
};

export const putImageToS3 = async ({
  presignedUrl,
  imageFile,
}: UploadImageToS3Request) => {
  const response = await apiS3.put(presignedUrl, imageFile, {
    headers: {
      "Content-Type": imageFile.type,
    },
  });
  return response.status;
};
