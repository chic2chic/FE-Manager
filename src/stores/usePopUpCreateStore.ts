import { Questions } from "@/constants/popUpCreate/Questions";
import {
  PopupCreateRequest,
  PopupWithChoicesRequest,
} from "@/types/api/ApiRequestType";
import { create } from "zustand";

const initialState: PopupWithChoicesRequest = {
  popupCreateRequest: {
    name: "",
    imageUrl: "",
    popupStartDate: new Date().toISOString().split("T")[0],
    popupEndDate: new Date().toISOString().split("T")[0],
    reservationOpenDateTime: new Date().toISOString(),
    reservationCloseDateTime: new Date().toISOString(),
    runOpenTime: "00:00:00",
    runCloseTime: "00:00:00",
    totalCapacity: 0,
    timeCapacity: 0,
    roadAddress: "",
    detailAddress: "",
    latitude: 0,
    longitude: 0,
  },
  choiceCreateRequestList: Questions.map(() => ({
    optionList: Array(2).fill(""),
  })),
};

type PopUpStore = {
  formData: PopupWithChoicesRequest;
  updatePopupField: <K extends keyof PopupCreateRequest>(
    _field: K,
    _value: PopupCreateRequest[K],
  ) => void;
  updateChoiceOptions: (_questionIndex: number, _optionList: string[]) => void;
  resetForm: () => void;
  isValidate: () => { isValid: boolean; message: string };
};

export const usePopUpCreateStore = create<PopUpStore>((set, get) => ({
  formData: { ...initialState },

  updatePopupField: (field, value) =>
    set(state => ({
      formData: {
        ...state.formData,
        popupCreateRequest: {
          ...state.formData.popupCreateRequest,
          [field]: value,
        },
      },
    })),

  updateChoiceOptions: (questionIndex, optionList) =>
    set(state => ({
      formData: {
        ...state.formData,
        choiceCreateRequestList: state.formData.choiceCreateRequestList.map(
          (choice, index) =>
            index === questionIndex ? { optionList } : choice,
        ),
      },
    })),

  isValidate: () => {
    const { popupCreateRequest, choiceCreateRequestList } = get().formData;

    if (!popupCreateRequest.name) {
      return { isValid: false, message: "팝업명을 입력해주세요" };
    }
    if (!popupCreateRequest.runOpenTime) {
      return { isValid: false, message: "운영 시작 시간을 입력해주세요" };
    }
    if (!popupCreateRequest.runCloseTime) {
      return { isValid: false, message: "운영 종료 시간을 입력해주세요" };
    }
    if (!popupCreateRequest.timeCapacity) {
      return { isValid: false, message: "시간별 수용 인원을 입력해주세요" };
    }
    if (!popupCreateRequest.totalCapacity) {
      return { isValid: false, message: "총 수용 인원을 입력해주세요" };
    }
    if (!popupCreateRequest.roadAddress) {
      return { isValid: false, message: "주소를 입력해주세요" };
    }

    if (!popupCreateRequest.detailAddress) {
      return { isValid: false, message: "상세 주소를 입력해주세요" };
    }

    // 날짜 유효성 검증
    const startDate = new Date(popupCreateRequest.popupStartDate);
    const endDate = new Date(popupCreateRequest.popupEndDate);
    if (endDate < startDate) {
      return {
        isValid: false,
        message: "팝업 종료일은 시작일 이후여야 합니다",
      };
    }

    const reservStartDate = new Date(
      popupCreateRequest.reservationOpenDateTime,
    );
    const reservEndDate = new Date(popupCreateRequest.reservationCloseDateTime);
    if (reservEndDate < reservStartDate) {
      return {
        isValid: false,
        message: "예약 종료일은 시작일 이후여야 합니다",
      };
    }

    const validateChoices = () => {
      for (const choice of choiceCreateRequestList) {
        if (choice.optionList.some(option => option.trim() === "")) {
          return false;
        }
      }
      return true;
    };

    if (!validateChoices()) {
      return {
        isValid: false,
        message: "모든 설문 항목을 입력해주세요",
      };
    }

    return { isValid: true, message: "" };
  },

  resetForm: () => set(() => ({ formData: { ...initialState } })),
}));
