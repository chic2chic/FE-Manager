import { setupWorker } from "msw/browser";
import { ProductHandlers } from "./handlers/Product.handlers";
import { AuthHandlers } from "./handlers/onBoarding/Auth.handlers";

export const handlers = [...AuthHandlers, ...ProductHandlers];

export const worker = setupWorker(...handlers);
