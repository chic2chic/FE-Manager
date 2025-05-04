export type LoginRequest = {
  username: string;
  password: string;
};

export type PopUpCreateRequest = {
  name: string;
  imageUrl: string;
  popupOpenDate: string;
  popupCloseDate: string;
  reservationOpenDateTime: string;
  reservationCloseDateTime: string;
  runOpenTime: number;
  runCloseTime: number;
  totalCapacity: number;
  timeCapacity: number;
  roadAddress: string;
  detailAddress: string;
  latitude: number;
  longitude: number;
  survey: {
    number: number;
    content: string[];
  }[];
};

export type LoginRequest = {
  username: string;
  password: string;
};

export type GetPresignedUrlRequest = {
  fileName: string;
  extension: string;
};

export type UploadImageToS3Request = {
  presignedUrl: string;
  imageFile: File;
};
