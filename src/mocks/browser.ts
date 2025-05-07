import { setupWorker } from "msw/browser";
import { AuthHandlers } from "@/mocks/handlers/onBoarding/Auth.handlers";
import { ProductHandlers } from "@/mocks/handlers/Product.handlers";

export const handlers = [...AuthHandlers, ...ProductHandlers];

export const worker = setupWorker(...handlers);
