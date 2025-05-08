import { FileInfoExtract } from "@/utils/FileInfoExtract";
import { usePopUpCreateApi } from "./api/usePopUpCreateApi";
import { usePopUpCreateStore } from "@/stores/usePopUpCreateStore";

export const usePopUpCreate = () => {
  const {
    getPresignedUrlMutation,
    putImgToS3Mutation,
    postPopUpCreateMutation,
  } = usePopUpCreateApi();
  const { formData } = usePopUpCreateStore();

  const imageUpload = async (imageFile: File) => {
    const presignedResponse = await getPresignedUrlMutation.mutateAsync({
      imageFileExtension: FileInfoExtract(imageFile),
    });

    const presignedUrl = presignedResponse.data.presignedUrl;

    await putImgToS3Mutation.mutateAsync({
      presignedUrl,
      imageFile,
    });
  };

  const popUpCreate = async (imageFile: File) => {
    await imageUpload(imageFile);
    await postPopUpCreateMutation.mutateAsync(formData);
  };

  return { popUpCreate };
};
