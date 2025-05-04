import { getPresignedUrl, uploadImageToS3 } from "@/apis/image/ImageUpload";
import { postPopUpCreate } from "@/apis/PopUpCreatePage";
import { ErrorMessage } from "@/utils/ErrorMessage";
import { useMutation } from "@tanstack/react-query";

export const usePopUpCreateApi = () => {
  const getPresignedUrlMutation = useMutation({
    mutationFn: getPresignedUrl,
    onSuccess: response => {
      return response.data;
    },
    onError: error => {
      throw new Error(`PresignedUrl 발급 에러 : ${ErrorMessage(error)}`);
    },
  });

  const uploadImgToS3Mutation = useMutation({
    mutationFn: uploadImageToS3,
    onSuccess: responseStatus => {
      return responseStatus === 200;
    },
    onError: error => {
      throw new Error(`이미지 S3 업로드 에러 : ${ErrorMessage(error)}`);
    },
  });

  const popUpCreateMutation = useMutation({
    mutationFn: postPopUpCreate,
    onSuccess: response => response.data,
    onError: error => {
      throw new Error(`팝업 생성 에러 : ${ErrorMessage(error)}`);
    },
  });

  return {
    getPresignedUrlMutation,
    uploadImgToS3Mutation,
    popUpCreateMutation,
  };
};
