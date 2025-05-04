type Question = {
  questionNumber: number;
  answers: string[];
};

export type PopUpFormData = {
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
  imageUrl: string;
  address: {
    address: string;
    detailAddress: string;
    latitude: number;
    longitude: number;
  };
  questions: Question[];
};
