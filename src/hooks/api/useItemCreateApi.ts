import { postItemCreate } from "@/apis/ItemCreatePage";
import { ErrorMessage } from "@/utils/ErrorMessage";
import { useMutation } from "@tanstack/react-query";

export const useItemCreateApi = () => {
  return useMutation({
    mutationFn: postItemCreate,
    onSuccess: response => response.data,
    onError: error => {
      throw new Error(`상품 생성 에러 : ${ErrorMessage(error)}`);
    },
  });
};
