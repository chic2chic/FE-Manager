import GlobalLayout from "@/components/layouts/GlobalLayout";
import DashBoard from "@/pages/dashboard/DashBoard";
import ItemAddPage from "@/pages/itemAddPage/ItemAddPage";
import OnBorading from "@/pages/onBoarding/OnBoarding";
import PopUpCreate from "@/pages/popUpCreate/PopUpCreate";
import PopUpList from "@/pages/popUpList/PopUpList";
import ProductList from "@/pages/productList/ProductList";
import { createBrowserRouter } from "react-router-dom";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <GlobalLayout />,
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
  {
    path: "/onboarding",
    element: <OnBorading />,
  },
  {
    path: "/popup-list",
    element: <PopUpList />,
  },
]);
