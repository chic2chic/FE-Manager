import { deletePopUp } from "@/apis/PopUpListReadApi";
import { ErrorMessage } from "@/utils/ErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const usePopUpDeleteApi = () => {
  const queryClient = useQueryClient();
  const deletePopUpMutation = useMutation({
    mutationFn: (popupId: string) => deletePopUp(popupId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["popUpList"] });
    },
    onError: error => {
      throw new Error(`상품 생성 에러 : ${ErrorMessage(error)}`);
    },
  });

  return { deletePopUpMutation };
};
