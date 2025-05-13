import GlobalLayout from "@/components/layouts/GlobalLayout";
import ProtectLayout from "@/components/layouts/ProtectLayout";
import DashBoardPage from "@/pages/dashboardPage/DashBoardPage";
import ItemCreatePage from "@/pages/itemCreatePage/ItemCreatePage";
import ItemListPage from "@/pages/itemListPage/ItemListPage";
import OnBoradingPage from "@/pages/onBoardingPage/OnBoardingPage";
import PopUpCreatePage from "@/pages/popUpCreatePage/PopUpCreatePage";
import PopUpListPage from "@/pages/popUpListPage/PopUpListPage";
import { createBrowserRouter } from "react-router-dom";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <GlobalLayout />,
    children: [
      {
        path: "/onboarding",
        element: <OnBoradingPage />,
      },
      {
        path: "/",
        element: <ProtectLayout />,
        children: [
          {
            path: "/popup-list",
            element: <PopUpListPage />,
          },
          {
            path: "dashboard",
            element: <DashBoardPage />,
          },
          {
            path: "/items/create",
            element: <ItemCreatePage />,
          },
          {
            path: "/items",
            element: <ItemListPage />,
          },
          {
            path: "/items/:itemId/edit",
            element: <ItemCreatePage />,
          },
          {
            path: "/popup-create",
            element: <PopUpCreatePage />,
          },
        ],
      },
    ],
  },
]);
