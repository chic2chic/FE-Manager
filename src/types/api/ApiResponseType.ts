import { ItemType } from "../ItemType";

export type ApiResponse<T> = Promise<GlobalResponse<T>>;
export type ApiResult<T> = Promise<T>;

export type GlobalResponse<T> = {
  success: boolean;
  status: number;
  data: T;
  timestamp: string;
};

export type NoResponse = null;

export type LoginResponse = {
  accessToken: string;
};

export type GetPresignedUrlResponse = {
  presignedUrl: string;
};

export type PostPopUpCreateResponse = {
  popupId: string;
};

export type GetPopUpReadResponse = {
  popupId: number;
  name: string;
  imageUrl: string;
};

export type GetPopUpListReadResponse = GetPopUpReadResponse[];

export type GetItemListResponse = Record<string, ItemType[]>;

export type ItemListType = Record<string, ItemType[]>;

export type GetAvgPurchaseResponse = {
  totalPrice: number;
  todayPrice: number;
};

export type EntrantsResponse = {
  enteredCount: number;
};

export type ReservationsResponse = {
  reservedCount: number;
  chart: ReservationChartResponse[];
};

export type ReservationChartResponse = {
  day: string;
  value: number;
};
