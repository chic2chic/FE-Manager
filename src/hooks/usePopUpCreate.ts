import { FileInfoExtract } from "@/utils/FileInfoExtract";
import { usePopUpCreateApi } from "./api/usePopUpCreateApi";

export const usePopUpCreate = () => {
  const { getPresignedUrlMutation, putImgToS3Mutation } = usePopUpCreateApi();

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

  return { imageUpload };
};
