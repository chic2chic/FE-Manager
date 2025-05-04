import { getPresignedUrl, uploadImageToS3 } from "@/apis/image/ImageUpload";
import { postPopUpCreate } from "@/apis/PopUpCreatePage";
import { usePopUpCreateStore } from "@/stores/usePopUpCreateStore";
import { PopUpCreateRequest } from "@/types/api/ApiRequestType";
import { PopUpFormData } from "@/types/PopUpCreateFormType";
import { ErrorMessage } from "@/utils/ErrorMessage";
import { useMutation } from "@tanstack/react-query";

export type UploadS3ParamsType = {
  file: File;
  presignedUrl: string;
};

const transformFormDataToRequest = (
  formData: PopUpFormData,
): PopUpCreateRequest => {
  return {
    name: formData.popUpTitle,
    imageUrl: formData.imageUrl,
    popupOpenDate: formData.popUpStartDate,
    popupCloseDate: formData.popUpEndDate,
    reservationOpenDateTime: formData.reservOpenTime,
    reservationCloseDateTime: formData.reservEndTime,
    runOpenTime: formData.popUpOpenTime,
    runCloseTime: formData.popUpEndTime,
    totalCapacity: formData.entireMaxNum,
    timeCapacity: formData.timeMaxNum,
    roadAddress: formData.address.address,
    detailAddress: formData.address.detailAddress,
    latitude: formData.address.latitude,
    longitude: formData.address.longitude,
  };
};

export const usePopUpCreate = () => {
  const { updateField } = usePopUpCreateStore();

  const getPresignedUrlMutation = useMutation({
    mutationFn: getPresignedUrl,
    onSuccess: response => response.data,
    onError: error => {
      throw new Error(`Presigned URL 요청 실패: ${ErrorMessage(error)}`);
    },
  });

  const uploadImgToS3Mutation = useMutation({
    mutationFn: ({ presignedUrl, file }: UploadS3ParamsType) =>
      uploadImageToS3({ presignedUrl, file }),
    onError: error => {
      throw new Error(`이미지 S3 업로드 실패: ${ErrorMessage(error)}`);
    },
  });

  const createPopUpMutation = useMutation({
    mutationFn: postPopUpCreate,
    onError: error => {
      throw new Error(`팝업 등록 API 요청 실패: ${ErrorMessage(error)}`);
    },
  });

  const uploadImage = async (file: File) => {
    try {
      const { preSignedUrl } = await getPresignedUrlMutation.mutateAsync(file);

      const response = await uploadImgToS3Mutation.mutateAsync({
        presignedUrl: preSignedUrl,
        file,
      });

      const imageUrl = preSignedUrl.split("?")[0];

      updateField("imageUrl", imageUrl);

      return response;
    } catch (error) {
      throw new Error(`이미지 업로드 실패: ${ErrorMessage(error)}`);
    }
  };

  const createPopUp = async ({
    file,
    formData,
  }: {
    file: File;
    formData: PopUpFormData;
  }) => {
    try {
      await uploadImage(file);

      return await createPopUpMutation.mutateAsync(
        transformFormDataToRequest(formData),
      );
    } catch (error) {
      throw new Error(`팝업 등록 프로세스 실패: ${ErrorMessage(error)}`);
    }
  };

  return {
    uploadImage,
    createPopUp,
    isUploading:
      getPresignedUrlMutation.isPending || uploadImgToS3Mutation.isPending,
    isCreating: createPopUpMutation.isPending,
    uploadError: getPresignedUrlMutation.error || uploadImgToS3Mutation.error,
    createError: createPopUpMutation.error,
    reset: () => {
      getPresignedUrlMutation.reset();
      uploadImgToS3Mutation.reset();
      createPopUpMutation.reset();
    },
  };
};
