import { setupWorker } from "msw/browser";
import { AuthHandlers } from "./handlers/Auth.handlers";
import { ProductHandlers } from "./handlers/Product.handlers";

export const handlers = [...AuthHandlers, ...ProductHandlers];


export const worker = setupWorker(...handlers);



