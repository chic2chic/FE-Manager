import { FileInfoExtract } from "@/utils/FileInfoExtract";
import { usePopUpCreateApi } from "./api/usePopUpCreateApi";
import { usePopUpCreateStore } from "@/stores/usePopUpCreateStore";

export const usePopUpCreate = () => {
  const {
    getPresignedUrlMutation,
    putImgToS3Mutation,
    postPopUpCreateMutation,
  } = usePopUpCreateApi();
  const { formData, updatePopupField } = usePopUpCreateStore();

  const imageUpload = async (imageFile: File) => {
    const presignedResponse = await getPresignedUrlMutation.mutateAsync({
      imageFileExtension: FileInfoExtract(imageFile),
      imageDirectory: "POPUP",
    });

    const presignedUrl = presignedResponse.data.presignedUrl;

    await putImgToS3Mutation.mutateAsync({
      presignedUrl,
      imageFile,
    });

    updatePopupField("imageUrl", presignedUrl);

    return presignedUrl;
  };

  const popUpCreate = async (imageFile: File) => {
    const presignedUrl = await imageUpload(imageFile);
    await postPopUpCreateMutation.mutateAsync({
      ...formData,
      popupCreateRequest: {
        ...formData.popupCreateRequest,
        imageUrl: presignedUrl.split("?")[0],
      },
    });
  };

  return { popUpCreate };
};
