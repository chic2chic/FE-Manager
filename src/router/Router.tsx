import GlobalLayout from "@/components/layouts/GlobalLayout";
import ProtectLayout from "@/components/layouts/ProtectLayout";
import DashBoard from "@/pages/dashboard/DashBoard";
import ItemAddPage from "@/pages/itemAddPage/ItemAddPage";
import OnBorading from "@/pages/onBoarding/OnBoarding";
import PopUpCreate from "@/pages/popUpCreate/PopUpCreate";
import PopUpList from "@/pages/popUpList/PopUpList";
import ProductList from "@/pages/productList/ProductList";
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
            element: <DashBoard />,
          },
          {
            path: "/products/create",
            element: <ItemAddPage />,
          },
          {
            path: "/products",
            element: <ProductList />,
          },
          {
            path: "/popup-create",
            element: <PopUpCreate />,
          },
        ],
      },
    ],
  },
  {
    path: "/onboarding",
    element: <OnBorading />,
  },
  {
    path: "/",
    element: <ProtectLayout />,
    children: [
      {
        path: "/popup-list",
        element: <PopUpList />,
      },
    ],
  },
]);
