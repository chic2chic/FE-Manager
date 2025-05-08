import {
  getItemPresignedUrl,
  uploadItemImageToS3,
} from "@/apis/image/ImageUpload";
import { postItemCreate } from "@/apis/ItemCreateApi";
import { ErrorMessage } from "@/utils/ErrorMessage";
import { useMutation } from "@tanstack/react-query";

// 에러 핸들링은 여기서만
// react query
export const useItemCreateApi = () => {
  const getItemPresignedUrlMutation = useMutation({
    mutationFn: getItemPresignedUrl,
    onError: error => {
      throw new Error(`PresignedUrl 발급 에러 : ${ErrorMessage(error)}`);
    },
  });

  const uploadItemImgToS3Mutation = useMutation({
    mutationFn: uploadItemImageToS3,
    onError: error => {
      throw new Error(`이미지 S3 업로드 에러 : ${ErrorMessage(error)}`);
    },
  });

  const itemCreateMutation = useMutation({
    mutationFn: postItemCreate,
    onError: error => {
      throw new Error(`상품 생성 에러 : ${ErrorMessage(error)}`);
    },
  });

  return {
    getItemPresignedUrlMutation,
    uploadItemImgToS3Mutation,
    itemCreateMutation,
  };
};
