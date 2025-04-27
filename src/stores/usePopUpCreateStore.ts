import { Questions } from "@/constants/popUpCreate/Questions";
import { PopUpFormData } from "@/types/PopUpCreateFormType";
import { create } from "zustand";

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
  questions: Questions.map(q => ({ ...q, answers: Array(2).fill("") })),
};

type PopUpStore = {
  formData: PopUpFormData;
  updateField: <K extends keyof PopUpFormData>(
    _field: K,
    _value: PopUpFormData[K],
  ) => void;
  updateQuestionAnswers: (_questionNumber: number, _answers: string[]) => void;
  resetForm: () => void;
  validateForm: () => boolean;
};

export const usePopUpCreateStore = create<PopUpStore>((set, get) => ({
  formData: { ...initialState },
  updateField: (field, value) =>
    set(state => ({ formData: { ...state.formData, [field]: value } })),
  updateQuestionAnswers: (questionNumber, answers) =>
    set(state => ({
      ...state,
      formData: {
        ...state.formData,
        questions: state.formData.questions.map(q =>
          q.questionNumber === questionNumber ? { ...q, answers } : q,
        ),
      },
    })),
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
