import GlobalLayout from "@/components/layouts/GlobalLayout";
import ProtectLayout from "@/components/layouts/ProtectLayout";
import DashBoardPage from "@/pages/dashboardPage/DashBoardPage";
import ItemAddPage from "@/pages/itemCreatePage/ItemCreatePage";
import ItemListPage from "@/pages/itemListPage/ItemListPage";
import OnBoradingPage from "@/pages/onBoardingPage/OnBoardingPage";
import PopUpCreatePage from "@/pages/popUpCreatePage/PopUpCreatePage";
import PopUpListPage from "@/pages/popUpListPage/PopUpListPage";
import { createBrowserRouter } from "react-router-dom";

// TODO : 리팩토링 예정 - ProtectLayout 중복 사용
export const Router = createBrowserRouter([
  {
    path: "/",
    element: <GlobalLayout />,
    children: [
      {
        path: "/",
        element: <ProtectLayout />,
        children: [
          {
            path: "dashboard",
            element: <DashBoardPage />,
          },
          {
            path: "/items/create",
            element: <ItemAddPage />,
          },
          {
            path: "/items",
            element: <ItemListPage />,
          },
          {
            path: "/popup-create",
            element: <PopUpCreatePage />,
          },
        ],
      },
    ],
  },
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
    ],
  },
]);
