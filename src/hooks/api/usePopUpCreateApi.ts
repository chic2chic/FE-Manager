import { postCreatePresignedUrl, putImageToS3 } from "@/apis/image/ImageApi";
import { postPopUpCreate } from "@/apis/PopUpCreateApi";
import { ErrorMessage } from "@/utils/ErrorMessage";
import { useMutation } from "@tanstack/react-query";

export const usePopUpCreateApi = () => {
  const getPresignedUrlMutation = useMutation({
    mutationFn: postCreatePresignedUrl,
    onError: error => {
      throw new Error(`PresignedUrl 발급 에러 : ${ErrorMessage(error)}`);
    },
  });

  const putImgToS3Mutation = useMutation({
    mutationFn: putImageToS3,
    onError: error => {
      throw new Error(`이미지 S3 업로드 에러 : ${ErrorMessage(error)}`);
    },
  });

  const postPopUpCreateMutation = useMutation({
    mutationFn: postPopUpCreate,
    onError: error => {
      throw new Error(`팝업 등록 에러 : ${ErrorMessage(error)}`);
    },
  });

  return {
    getPresignedUrlMutation,
    putImgToS3Mutation,
    postPopUpCreateMutation,
  };
};
