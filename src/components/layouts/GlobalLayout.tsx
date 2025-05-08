import { Outlet } from "react-router-dom";
import CustomErrorBoundary from "@/components/boundary/CustomErrorBoundary";
import NavBar from "@/components/common/NavBar";

export default function GlobalLayout() {
  return (
    <div className="box-border">
      <NavBar />
      <div className="mt-[80px]">
        <CustomErrorBoundary>
          <Outlet />
        </CustomErrorBoundary>
      </div>
    </div>
  );
}
