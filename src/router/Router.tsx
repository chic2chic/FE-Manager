import { createBrowserRouter } from "react-router-dom";
import GlobalLayout from "@/components/layouts/GlobalLayout";
import ProtectLayout from "@/components/layouts/ProtectLayout";
import DashBoardPage from "@/pages/dashboardPage";
import ItemCreatePage from "@/pages/itemCreatePage";
import ItemListPage from "@/pages/itemListPage";
import OnBoardingPage from "@/pages/onBoardingPage";
import OrderListPage from "@/pages/orderListPage";
import PopUpCreatePage from "@/pages/popUpCreatePage";
import PopUpListPage from "@/pages/popUpListPage";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <GlobalLayout />,
    children: [
      {
        path: "/onboarding",
        element: <OnBoardingPage />,
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
            path: "/dashboard",
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
          {
            path: "/order-list",
            element: <OrderListPage />,
          },
        ],
      },
    ],
  },
]);
