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
  imageUrl: "",
  address: {
    address: "",
    detailAddress: "",
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
  isValidate: () => { isValid: boolean; message: string };
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
  isValidate: () => {
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
      // imageUrl,
      address,
      questions,
    } = get().formData;

    if (!popUpTitle) {
      return { isValid: false, message: "팝업명을 입력해주세요" };
    }
    if (!popUpOpenTime) {
      return { isValid: false, message: "운영 시작 시간을 입력해주세요" };
    }
    if (!popUpEndTime) {
      return { isValid: false, message: "운영 종료 시간을 입력해주세요" };
    }
    if (!timeMaxNum) {
      return { isValid: false, message: "시간별 수용 인원을 입력해주세요" };
    }
    if (!entireMaxNum) {
      return { isValid: false, message: "총 수용 인원을 입력해주세요" };
    }
    if (!address.address) {
      return { isValid: false, message: "주소를 입력해주세요" };
    }
    // TODO : 상세주소 입력 공간 UI 생성 이후 Validation 검증
    // if (!address.detailAddress) {
    //   return { isValid: false, message: "상세 주소를 입력해주세요" };
    // }
    // if (!imageUrl) {
    //   return { isValid: false, message: "이미지를 업로드해주세요" };
    // }

    if (popUpEndDate < popUpStartDate) {
      return {
        isValid: false,
        message: "팝업 종료일은 시작일 이후여야 합니다",
      };
    }
    if (reservEndDate < reservStartDate) {
      return {
        isValid: false,
        message: "예약 종료일은 시작일 이후여야 합니다",
      };
    }

    const validateQuestions = () => {
      for (const question of questions) {
        if (question.answers.some(answer => answer.trim() === "")) {
          return false;
        }
      }
      return true;
    };

    if (!validateQuestions()) {
      return {
        isValid: false,
        message: "모든 설문 항목을 입력해주세요",
      };
    }

    return { isValid: true, message: "" };
  },
  resetForm: () => set(() => ({ formData: { ...initialState } })),
}));
