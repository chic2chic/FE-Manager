import { Navigate, Outlet, useLocation } from "react-router-dom";
import CustomErrorBoundary from "@/components/boundary/CustomErrorBoundary";
import NavBar from "@/components/common/NavBar";
import { useAuthStore } from "@/stores/useAuthStore";

export default function GlobalLayout() {
  const location = useLocation();
  const { isLogin } = useAuthStore();
  const isContainNavBar =
    !["/onboarding"].some(path => location.pathname.includes(path)) && isLogin;

  if (location.pathname === "/" && isLogin) {
    return <Navigate to="/popup-list" replace />;
  } else if (location.pathname === "/" && !isLogin) {
    return <Navigate to="/onBoarding" replace />;
  }

  return (
    <div className="box-border min-h-screen flex flex-col">
      {isContainNavBar && <NavBar />}
      <div className={`flex-grow ${isContainNavBar ? "mt-[80px]" : ""}`}>
        <CustomErrorBoundary>
          <Outlet />
        </CustomErrorBoundary>
      </div>
    </div>
  );
}
