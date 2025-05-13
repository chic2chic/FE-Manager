import { Outlet, useLocation } from "react-router-dom";
import CustomErrorBoundary from "@/components/boundary/CustomErrorBoundary";
import NavBar from "@/components/common/NavBar";

export default function GlobalLayout() {
  const location = useLocation();
  const isContainNavBar = !["/onboarding", "/popup-list"].some(path =>
    location.pathname.includes(path),
  );
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
