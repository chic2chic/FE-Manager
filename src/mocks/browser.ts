import { setupWorker } from "msw/browser";
import { AuthHandlers } from "@/mocks/handlers/onBoarding/Auth.handlers";
import { ItemHandlers } from "@/mocks/handlers/Item.handlers";
import { ItemCreateHandlers } from "@/mocks/handlers/ItemCreate/ItemCreate.handlers";

export const handlers = [
  ...AuthHandlers,
  ...ItemHandlers,
  ...ItemCreateHandlers,
];

export const worker = setupWorker(...handlers);
