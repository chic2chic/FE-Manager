import { Outlet } from "react-router-dom";
import NavBar from "../common/NavBar";
import CustomErrorBoundary from "../boundary/CustomErrorBoundary";

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
