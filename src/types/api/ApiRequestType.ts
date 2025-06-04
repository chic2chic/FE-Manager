export type LoginRequest = {
  username: string;
  password: string;
};

export type ItemCreateRequest = {
  popupId: number;
  name: string;
  imageUrl: string;
  price: number;
  stock: number;
  minStock: number;
  location: string;
};

export type GetPresignedUrlRequest = {
  imageFileExtension: string;
  imageDirectory: string;
};

export type UploadImageToS3Request = {
  presignedUrl: string;
  imageFile: File;
};

export type PopUpCreateRequest = {
  name: string;
  imageUrl: string;
  popupStartDate: string;
  popupEndDate: string;
  reservationOpenDateTime: string;
  reservationCloseDateTime: string;
  runOpenTime: string;
  runCloseTime: string;
  totalCapacity: number;
  timeCapacity: number;
  roadAddress: string;
  detailAddress: string;
  latitude: number;
  longitude: number;
};

export type ChoiceCreateRequest = {
  optionList: string[];
};

export type PopUpWithChoicesRequest = {
  popupCreateRequest: PopUpCreateRequest;
  choiceCreateRequestList: ChoiceCreateRequest[];
};

export type PatchItemRequest = {
  itemId: string;
  minStock: number;
};

export type ItemAddExcelRequest = {
  excelFile: File;
  onProgress?: (_percentage: number) => void;
};

export type GetOrderListRequest = {
  lastId: string | undefined;
  size: number;
};
