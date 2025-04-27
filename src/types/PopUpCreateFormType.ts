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
  address: {
    address: string;
    latitude: number;
    longitude: number;
  };
};
