import { Navigate, Outlet, useLocation } from "react-router-dom";
import CustomErrorBoundary from "@/components/boundary/CustomErrorBoundary";
import NavBar from "@/components/common/NavBar";

export default function GlobalLayout() {
  const location = useLocation();
  const isContainNavBar = !["/onboarding"].some(path =>
    location.pathname.includes(path),
  );

  if (location.pathname === "/") {
    return <Navigate to="/popup-list" replace />;
  }

  return (
    <div className="box-border">
      {isContainNavBar && <NavBar />}
      <div className={isContainNavBar ? "mt-[80px]" : ""}>
        <CustomErrorBoundary>
          <Outlet />
        </CustomErrorBoundary>
      </div>
    </div>
  );
}
