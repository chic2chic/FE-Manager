import { setupWorker } from "msw/browser";
import { AuthHandlers } from "./handlers/Auth.handlers";

export const handlers = [...AuthHandlers];

export const worker = setupWorker(...handlers);
