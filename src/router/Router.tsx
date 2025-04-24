import GlobalLayout from "@/components/layouts/GlobalLayout";
import DashBoard from "@/pages/dashboard/DashBoard";
import Home from "@/pages/home/Home";
import { createBrowserRouter } from "react-router-dom";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <GlobalLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/dashboard",
        element: <DashBoard />,
      },
    ],
  },
]);
