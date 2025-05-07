import { ErrorMessage } from "@/utils/ErrorMessage";
import { ItemCreateRequest } from "@/types/api/ApiRequestType";
import { useItemCreateApi } from "@/hooks/api/useItemCreateApi";

export const useItemCreate = () => {
  const mutate = useItemCreateApi();

  const createItem = async ({
    name,
    imageUrl,
    price,
    stock,
    minStock,
    location,
  }: ItemCreateRequest) => {
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
