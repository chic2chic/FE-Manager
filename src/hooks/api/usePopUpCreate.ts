import { getPresignedUrl, uploadImageToS3 } from "@/apis/image/ImageUpload";
import { ErrorMessage } from "@/utils/ErrorMessage";
import { useMutation } from "@tanstack/react-query";

export type UploadS3ParamsType = {
  file: File;
  presignedUrl: string;
};

export const usePopUpCreate = () => {
  const getPresignedUrlMutation = useMutation({
    mutationFn: (file: File) => getPresignedUrl(file),
    onSuccess: response => response.data,
    onError: error =>
      new Error(error instanceof Error ? error.message : String(error)),
  });

  const uploadImgToS3Mutation = useMutation({
    mutationFn: ({ file, presignedUrl }: UploadS3ParamsType) =>
      uploadImageToS3({ presignedUrl, file }),
  });

  const uploadImage = async (file: File) => {
    try {
      const presignedUrl = await getPresignedUrlMutation.mutateAsync(file);
      return await uploadImgToS3Mutation.mutateAsync({ file, presignedUrl });
    } catch (error) {
      throw new Error(`이미지 업로드 실패 : ${ErrorMessage(error)}`);
    }
  };

  return {
    uploadImage,
    isUploading:
      getPresignedUrlMutation.isPending || uploadImgToS3Mutation.isPending,
    error: getPresignedUrlMutation.error || uploadImgToS3Mutation.error,
  };
};
