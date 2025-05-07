import { ErrorMessage } from "@/utils/ErrorMessage";
import { ItemRequest } from "@/types/api/ApiRequestType";
import { useItemApi } from "@/hooks/api/useItemApi";

export const useItem = () => {
  const mutate = useItemApi();

  const createItem = async ({
    name,
    imageUrl,
    price,
    stock,
    minStock,
    location,
  }: ItemRequest) => {
    try {
      const response = await mutate.mutateAsync({
        name,
        imageUrl,
        price,
        stock,
        minStock,
        location,
      });
      return response.data;
    } catch (error) {
      throw new Error(`상품 등록 오류 ${ErrorMessage(error)}`);
    }
  };

  return { createItem, error: mutate.error };
};
