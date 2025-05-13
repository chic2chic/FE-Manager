import { setupWorker } from "msw/browser";
import { AuthHandlers } from "@/mocks/handlers/onBoarding/Auth.handlers";
import { DashboardHandlers } from "./handlers/dashboard/CustomerTransactionDatas";
import { PopUpCreateHandlers } from "@/mocks/handlers/popUpCreate/PopUpCreate.handlers";
import { popUpListReadHandlers } from "@/mocks/handlers/popUpListRead/popUpListRead.handlers";
import {
  EntrantsHandlers,
  ReservationsHandlers,
} from "./handlers/dashboard/ReservationDatas";
import { ItemCreateHandlers } from "./handlers/itemCreate/ItemCreate.handlers";
import { StockNotificationListHandlers } from "@/mocks/handlers/noticeModal/StockNotificationList.handlers";
import { ItemListHandlers } from "./handlers/itemList/ItemList.handlers";
import { LogoutHandlers } from "./Logout.handlers";
import { BestItemsHandlers } from "./handlers/dashboard/BestItems";
import { CongestionReadHandlers } from "@/mocks/handlers/dashboard/CongestionRead.handlers";
import { QuestionnaireHandlers } from "./handlers/dashboard/Questionnaire";
import { ConversionReadHandlers } from "@/mocks/handlers/dashboard/ConversionRead.handlers";
import { VisitorStatsHandlers } from "./handlers/dashboard/VisitorDatas";

export const handlers = [
  ...AuthHandlers,
  ...ItemCreateHandlers,
  ...PopUpCreateHandlers,
  ...popUpListReadHandlers,
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
  ...VisitorStatsHandlers,
];

export const worker = setupWorker(...handlers);
