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

export type ItemType = {
  itemId: number;
  name: string;
  price: number;
  stock: number;
  location: string;
  imageUrl: string;
};

export type ItemListType = Record<string, ItemType[]>;

export type GetAvgPurchaseResponse = {
  totalPrice: number;
  todayPrice: number;
};
