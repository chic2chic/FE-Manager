import { usePopUpCreateStore } from "@/stores/usePopUpCreateStore";
import { usePopUpCreateApi } from "./api/usePopUpCreateApi";
import { PopUpFormData } from "@/types/PopUpCreateFormType";
import { PopUpCreateRequest } from "@/types/api/ApiRequestType";
import { FileInoExtract } from "@/utils/FileInfoExtract";
import { ErrorMessage } from "@/utils/ErrorMessage";

const transformFormDataToRequest = (
  formData: PopUpFormData,
): PopUpCreateRequest => {
  return {
    name: formData.popUpTitle,
    imageUrl: formData.imageUrl,
    popupOpenDate: formData.popUpStartDate.toISOString(),
    popupCloseDate: formData.popUpEndDate.toISOString(),
    reservationOpenDateTime: new Date(
      formData.reservStartDate.setHours(formData.reservOpenTime),
    ).toISOString(),
    reservationCloseDateTime: new Date(
      formData.reservEndDate.setHours(formData.reservEndTime),
    ).toISOString(),
    runOpenTime: formData.popUpOpenTime,
    runCloseTime: formData.popUpEndTime,
    totalCapacity: formData.entireMaxNum,
    timeCapacity: formData.timeMaxNum,
    roadAddress: formData.address.address,
    detailAddress: formData.address.detailAddress,
    latitude: formData.address.latitude,
    longitude: formData.address.longitude,
    survey: formData.questions.map(q => ({
      number: q.questionNumber,
      content: q.answers,
    })),
  };
};

export const usePopUpCreate = () => {
  const { updateField } = usePopUpCreateStore();
  const {
    getPresignedUrlMutation,
    uploadImgToS3Mutation,
    popUpCreateMutation,
  } = usePopUpCreateApi();

  const uploadImage = async (imageFile: File) => {
    const response = await getPresignedUrlMutation.mutateAsync(
      FileInoExtract(imageFile),
    );

    const presignedUrl = response.data.preSignedUrl;
    const imageUrl = presignedUrl.split("?")[0];

    await uploadImgToS3Mutation.mutateAsync({
      imageFile,
      presignedUrl: presignedUrl,
    });

    updateField("imageUrl", imageUrl);
  };

  const createPopUp = async ({
    imageFile,
    formData,
  }: {
    imageFile: File;
    formData: PopUpFormData;
  }) => {
    try {
      await uploadImage(imageFile);
      const popUpForm = transformFormDataToRequest(formData);
      const response = await popUpCreateMutation.mutateAsync(popUpForm);
      return response.status;
    } catch (error) {
      throw new Error(`팝업 등록 프로세스 에러 : ${ErrorMessage(error)}`);
    }
  };

  return { createPopUp };
};
