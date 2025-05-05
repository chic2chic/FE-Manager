import { setupWorker } from "msw/browser";
import { ProductHandlers } from "./handlers/Product.handlers";
import { AuthHandlers } from "./handlers/onBoarding/Auth.handlers";
import { PopUpCreateHandlers } from "./handlers/popUpCreate/PopUpCreate.handlers";

export const handlers = [
  ...AuthHandlers,
  ...ProductHandlers,
  ...PopUpCreateHandlers,
];

export const worker = setupWorker(...handlers);
