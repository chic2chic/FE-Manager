import {
  GetPresignedUrlRequest,
  UploadImageToS3Request,
} from "@/types/api/ApiRequestType";
import { api } from "../config/Axios";
import {
  ApiResponse,
  GetPresignedUrlResponse,
  NoResponse,
} from "@/types/api/ApiResponseType";

export const getPresignedUrl = async ({
  fileName,
  extension,
}: GetPresignedUrlRequest): ApiResponse<GetPresignedUrlResponse> => {
  const response = await api.post("/popups/upload-url", {
    fileName,
    extension,
  });
  return response.data;
};

export const uploadImageToS3 = async ({
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

export const postImageComplete = async ({
  fileName,
  extension,
}: GetPresignedUrlRequest): ApiResponse<NoResponse> => {
  const response = await api.post("/popups/upload-complete", {
    fileName,
    extension,
  });
  return response.data;
};
