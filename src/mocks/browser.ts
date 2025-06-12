import { setupWorker } from "msw/browser";
import { AuthHandlers } from "@/mocks/handlers/onBoarding/Auth.handlers";
import { PopUpCreateHandlers } from "@/mocks/handlers/popUpCreate/PopUpCreate.handlers";
import { ItemCreateHandlers } from "./handlers/itemCreate/ItemCreate.handlers";
import { StockNotificationListHandlers } from "@/mocks/handlers/noticeModal/StockNotificationList.handlers";
import { ItemListHandlers } from "./handlers/itemList/ItemList.handlers";
import { LogoutHandlers } from "./Logout.handlers";
import { CongestionReadHandlers } from "@/mocks/handlers/dashboard/CongestionRead.handlers";
import { ConversionReadHandlers } from "@/mocks/handlers/dashboard/ConversionRead.handlers";
import { DashboardHandlers } from "./handlers/dashboard/CustomerTransactionDatas.handlers";
import {
  EntrantsHandlers,
  ReservationsHandlers,
} from "./handlers/dashboard/ReservationDatas.handlers";
import { BestItemsHandlers } from "./handlers/dashboard/BestItems.handlers";
import { QuestionnaireHandlers } from "./handlers/dashboard/Questionnaire.handlers";
import { VisitorHandlers } from "./handlers/dashboard/VisitorDatas.handlers";
import { PopUpListReadHandlers } from "./handlers/popUpListRead/PopUpListRead.handlers";
import { OrderListHandlers } from "./handlers/orderList/OrderList.handlers";

export const handlers = [
  ...AuthHandlers,
  ...ItemCreateHandlers,
  ...PopUpCreateHandlers,
  ...PopUpListReadHandlers,
  ...ItemListHandlers,
  ...DashboardHandlers,
  ...EntrantsHandlers,
  ...ReservationsHandlers,
  ...StockNotificationListHandlers,
  ...LogoutHandlers,
  ...BestItemsHandlers,
  ...CongestionReadHandlers,
  ...QuestionnaireHandlers,
  ...ConversionReadHandlers,
  ...VisitorHandlers,
  ...OrderListHandlers,
];

export const worker = setupWorker(...handlers);
