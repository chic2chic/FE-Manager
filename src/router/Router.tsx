import GlobalLayout from "@/components/layouts/GlobalLayout";
import DashBoard from "@/pages/dashboard/DashBoard";
import OnBorading from "@/pages/onBoarding/OnBoarding";
import PopUpList from "@/pages/popUpList/PopUpList";
import { createBrowserRouter } from "react-router-dom";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <GlobalLayout />,
    children: [
      {
        path: "/dashboard",
        element: <DashBoard />,
      },
    ],
  },
  {
    path: "/onboarding",
    element: <OnBorading />,
  },
  {
    path: "/popup-list",
    element: <PopUpList />,
  },
]);
