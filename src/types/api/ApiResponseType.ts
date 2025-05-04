export type ApiResponse<T> = Promise<GlobalResponse<T>>;
export type ApiResult<T> = Promise<T>;

export type GlobalResponse<T> = {
  success: boolean;
  status: number;
  data: T;
  timestamp: string;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
};
