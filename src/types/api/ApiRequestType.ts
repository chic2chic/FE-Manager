export type LoginRequest = {
  username: string;
  password: string;
};

export type PopUpCreateRequest = {
  name: string;
  imageUrl: string;
  popupOpenDate: Date;
  popupCloseDate: Date;
  reservationOpenDateTime: number;
  reservationCloseDateTime: number;
  runOpenTime: number;
  runCloseTime: number;
  totalCapacity: number;
  timeCapacity: number;
  roadAddress: string;
  detailAddress: string;
  latitude: number;
  longitude: number;
};
