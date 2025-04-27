import { PopUpFormData } from "@/types/PopUpCreateFormType";
import { useCallback, useState } from "react";

export const usePopUpForm = () => {
  const [formData, setFormData] = useState<PopUpFormData>({
    popUpTitle: "",
    popUpStartDate: new Date(),
    popUpEndDate: new Date(),
    popUpOpenTime: 0,
    popUpEndTime: 0,
    reservStartDate: new Date(),
    reservEndDate: new Date(),
    reservOpenTime: 0,
    reservEndTime: 0,
    timeMaxNum: 0,
    entireMaxNum: 0,
    address: {
      address: "",
      latitude: 0,
      longitude: 0,
    },
  });

  const updateField = useCallback(
    <K extends keyof PopUpFormData>(field: K, value: PopUpFormData[K]) => {
      setFormData(prev => ({ ...prev, [field]: value }));
    },
    [],
  );

  const updateAddress = useCallback((address: PopUpFormData["address"]) => {
    setFormData(prev => ({ ...prev, address: address }));
  }, []);

  // 폼이 유효하지 않으면 false를 뱉습니다.
  // 에러 문구까지 나중에 보여준다면, isFormValid를 여러개 쪼개면 될 것 같아요
  const isFormValid = () => {
    const {
      popUpTitle,
      popUpStartDate,
      popUpEndDate,
      popUpOpenTime,
      popUpEndTime,
      reservStartDate,
      reservEndDate,
      timeMaxNum,
      entireMaxNum,
      address,
    } = formData;

    if (
      !popUpTitle ||
      !popUpOpenTime ||
      !popUpEndTime ||
      !timeMaxNum ||
      !entireMaxNum ||
      !address.address
    ) {
      return false;
    }

    if (popUpEndDate < popUpStartDate) {
      return false;
    }

    if (reservEndDate < reservStartDate) {
      return false;
    }
  };

  return { formData, updateField, updateAddress, isFormValid };
};
