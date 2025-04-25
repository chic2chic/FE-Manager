import GlobalLayout from "@/components/layouts/GlobalLayout";
import DashBoard from "@/pages/dashboard/DashBoard";
import ItemAddPage from "@/pages/itemAddPage/ItemAddPage";
import ItemListPage from "@/pages/itemListPage/ItemListPage";
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
      {
        path: "/products/create",
        element: <ItemAddPage />,
      },
      {
        path: "/products",
        element: <ItemListPage />,
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
