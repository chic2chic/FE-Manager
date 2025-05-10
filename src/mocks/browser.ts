import { setupWorker } from "msw/browser";
import { AuthHandlers } from "@/mocks/handlers/onBoarding/Auth.handlers";
import { ItemCreateHandlers } from "@/mocks/handlers/ItemCreate/ItemCreate.handlers";
import { DashboardHandlers } from "./handlers/dashboard/CustomerTransactionDatas";
import { PopUpCreateHandlers } from "@/mocks/handlers/popUpCreate/PopUpCreate.handlers";
import { popUpListReadHandlers } from "@/mocks/handlers/popUpListRead/popUpListRead.handlers";
import { ItemListHandlers } from "./handlers/itemList/ItemListRead.handlers";
import {
  EntrantsHandlers,
  ReservationsHandlers,
} from "./handlers/dashboard/ReservationDatas";

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
