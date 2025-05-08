import { setupWorker } from "msw/browser";
import { AuthHandlers } from "@/mocks/handlers/onBoarding/Auth.handlers";
import { ItemHandlers } from "@/mocks/handlers/Item.handlers";

export const handlers = [...AuthHandlers, ...ItemHandlers];

export const worker = setupWorker(...handlers);
