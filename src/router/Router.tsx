import DefaultBoundary from "@/boundary/DefaultBoundary";
import { createBrowserRouter } from "react-router-dom";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultBoundary />,
    children: [],
  },
]);
