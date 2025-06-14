import { DayOfWeek } from "@/types/CongestionType";
import { ItemType } from "../ItemType";
import { OrderListItemType } from "../OrderListPageType";

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
  totalAverageAmount: number;
  todayAverageAmount: number;
};

export type EntrantsResponse = {
  entrantCount: number;
};

export type ReservationsResponse = {
  reservedCount: number;
  chart: ReservationChartResponse[];
};

export type ReservationChartResponse = {
  day: string;
  reservedCount: number;
};

export type GetStockNotificationResponse = {
  notificationId: number;
  popularity: string;
  name: string;
  minStock: number;
  notifiedAt: string;
};

export type GetStockNotificationListResponse = GetStockNotificationResponse[];

export type PatchItemResponse = {
  itemId: string;
  popupId: string;
  name: string;
  imageUrl: string;
  price: number;
  stock: number;
  minStock: number;
  location: string;
};

export type GetBestItemsResponse = {
  itemId: number;
  title: string;
  imagePath: string;
  price: number;
  stock: number;
}[];

export type GetCongestionTimeValue = {
  time: number;
  value: number;
};

export type GetCongestionResponse = Partial<
  Record<DayOfWeek, GetCongestionTimeValue[]>
>;

export type QuestionnaireListResponse = {
  totalCount: number;
  surveys: QuestionnaireResponse[];
};

export type QuestionnaireResponse = {
  surveyNumber: number;
  contents: SurveyContent[];
};

export type SurveyContent = {
  title: string;
  selectedCount: number;
  ratio: number;
};

export type GetConversionItemResponse = {
  name: string;
  interested: number;
  purchased: number;
  conversionRatio: number;
};

export type GetConversionResponse = {
  low: GetConversionItemResponse[];
  high: GetConversionItemResponse[];
};

export type VisitorResponse = {
  gender: Visitor[];
  age: Visitor[];
};

export type Visitor = {
  name: string;
  count: number;
  ratio: number;
};

export type GetOrderListResponse = {
  content: OrderListItemType[];
  isLast: boolean;
};
