import { create } from "zustand";

type PopUpFormData = {
  popUpTitle: string;
  popUpStartDate: Date;
  popUpEndDate: Date;
  popUpOpenTime: number;
  popUpEndTime: number;
  reservStartDate: Date;
  reservEndDate: Date;
  reservOpenTime: number;
  reservEndTime: number;
  timeMaxNum: number;
  entireMaxNum: number;
  address: {
    address: string;
    latitude: number;
    longitude: number;
  };
};

const initialState: PopUpFormData = {
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
};

type PopUpStore = {
  formData: PopUpFormData;
  updateField: <K extends keyof PopUpFormData>(
    _field: K,
    _value: PopUpFormData[K],
  ) => void;
  resetForm: () => void;
  validateForm: () => boolean;
};

export const usePopUpCreateStore = create<PopUpStore>((set, get) => ({
  formData: { ...initialState },
  updateField: (field, value) =>
    set(state => ({ formData: { ...state.formData, [field]: value } })),
  // 폼이 유효하지 않으면 false를 뱉습니다.
  // 에러 문구까지 나중에 보여준다면, isFormValid를 여러개 쪼개면 될 것 같아요
  validateForm: () => {
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
    } = get().formData;

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
    return true;
  },
  resetForm: () => set(() => ({ formData: { ...initialState } })),
}));
