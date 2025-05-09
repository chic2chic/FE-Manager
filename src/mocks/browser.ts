import { setupWorker } from "msw/browser";
import { AuthHandlers } from "@/mocks/handlers/onBoarding/Auth.handlers";
import { DashboardHandlers } from "./handlers/dashboard/CustomerTransactionDatas";
import { PopUpCreateHandlers } from "@/mocks/handlers/popUpCreate/PopUpCreate.handlers";
import { popUpListReadHandlers } from "@/mocks/handlers/popUpListRead/popUpListRead.handlers";
import { ItemCreateHandlers } from "./handlers/itemCreate/ItemCreate.handlers";
import {
  EntrantsHandlers,
  ReservationsHandlers,
} from "./handlers/dashboard/ReservationDatas";
import { ItemListHandlers } from "./handlers/itemList/ItemList.handlers";

export const handlers = [
  ...AuthHandlers,
  ...ItemCreateHandlers,
  ...PopUpCreateHandlers,
  ...popUpListReadHandlers,
  ...ItemListHandlers,
  ...DashboardHandlers,
  ...EntrantsHandlers,
  ...ReservationsHandlers,
];

export const worker = setupWorker(...handlers);
