import { deletePopUp } from "@/apis/PopUpListReadApi";
import { ErrorMessage } from "@/utils/ErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const usePopUpDeleteApi = () => {
  const queryClient = useQueryClient();
  const deletePopUpMutation = useMutation({
    mutationFn: (popUpId: string) => deletePopUp(popUpId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["popUpList"] });
    },
    throwOnError: true,
    onError: error => {
      throw new Error(`상품 생성 에러 : ${ErrorMessage(error)}`);
    },
  });

  return { deletePopUpMutation };
};
