import { setupWorker } from "msw/browser";
import { AuthHandlers } from "@/mocks/handlers/onBoarding/Auth.handlers";
import { ItemCreateHandlers } from "@/mocks/handlers/itemCreate/ItemCreate.handlers";
import { DashboardHandlers } from "@/mocks/handlers/dashboard/CustomerTransactionDatas";
import { PopUpCreateHandlers } from "@/mocks/handlers/popUpCreate/PopUpCreate.handlers";
import { PopUpListReadHandlers } from "@/mocks/handlers/popUpListRead/PopUpListRead.handlers";
import { ItemListHandlers } from "@/mocks/handlers/itemList/ItemListRead.handlers";
import { StockNotificationListHandlers } from "@/mocks/handlers/noticeModal/StockNotificationList.handlers";

export const handlers = [
  ...AuthHandlers,
  ...ItemCreateHandlers,
  ...PopUpCreateHandlers,
  ...PopUpListReadHandlers,
  ...ItemListHandlers,
  ...DashboardHandlers,
  ...StockNotificationListHandlers,
];

export const worker = setupWorker(...handlers);
