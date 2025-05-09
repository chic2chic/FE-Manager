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

export type GetPopUpListReadResponse = {
  popupId: number;
  name: string;
  imageUrl: string;
};
