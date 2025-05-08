import { ErrorMessage } from "@/utils/ErrorMessage";
import { ItemCreateRequest } from "@/types/api/ApiRequestType";
import { useItemCreateApi } from "@/hooks/api/useItemCreateApi";
import { ImageType } from "@/types/ImageType";

// 이 파일이 제일 중요. 이게 핵심 기능

// 아래 로직 검증. 다 있으면 api 호출
// return (
//   itemName &&
//   itemPrice &&
//   itemStock &&
//   itemMinStock &&
//   itemLocation &&
//   imageFile
// );
export const useItemCreate = () => {
  const {
    getItemPresignedUrlMutation,
    uploadItemImgToS3Mutation,
    itemCreateMutation,
  } = useItemCreateApi();

  const uploadImage = async (imageFile: File): Promise<string> => {
    // 이미지 확장자 추출
    const extension = imageFile.name
      .split(".")
      .pop()
      ?.toUpperCase() as ImageType;

    // presigned URL 요청
    const response = await getItemPresignedUrlMutation.mutateAsync({
      extension,
    });

    // console.log(response);
    const presignedUrl = response.data.preSignedUrl;
    const imageUrl = presignedUrl.split("?")[0];

    // put
    await uploadItemImgToS3Mutation.mutateAsync({
      imageFile,
      presignedUrl,
    });

    return imageUrl;
  };

  const createItem = async ({
    imageFile,
    data,
  }: {
    imageFile: File;
    data: ItemCreateRequest;
  }) => {
    try {
      const imageUrl = await uploadImage(imageFile);

      const itemForm: ItemCreateRequest = {
        ...data,
        imageUrl,
      };

      const response = await itemCreateMutation.mutateAsync(itemForm);
      return response.status;
    } catch (error) {
      throw new Error(`상품 등록 오류 ${ErrorMessage(error)}`);
    }
  };
  return { createItem };
};
