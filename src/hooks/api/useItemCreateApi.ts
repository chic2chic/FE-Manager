import { postCreatePresignedUrl, putImageToS3 } from "@/apis/image/ImageApi";
import { patchItem, postItemCreate } from "@/apis/ItemCreateApi";
import { ErrorMessage } from "@/utils/ErrorMessage";
import { useMutation } from "@tanstack/react-query";

export const useItemCreateApi = () => {
  const getItemPresignedUrlMutation = useMutation({
    mutationFn: postCreatePresignedUrl,
    onError: error => {
      throw new Error(`PresignedUrl 발급 에러 : ${ErrorMessage(error)}`);
    },
  });

  const uploadItemImgToS3Mutation = useMutation({
    mutationFn: putImageToS3,
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

  const patchItemMutation = useMutation({
    mutationFn: patchItem,
    onError: error => {
      throw new Error(`아이템 패치 에러 : ${ErrorMessage(error)}`);
    },
  });

  return {
    getItemPresignedUrlMutation,
    uploadItemImgToS3Mutation,
    itemCreateMutation,
    patchItemMutation,
  };
};
