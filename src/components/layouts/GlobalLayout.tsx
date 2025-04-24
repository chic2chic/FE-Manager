import CustomErrorBoundary from "@/boundary/CustomErrorBoundary";
import { Outlet } from "react-router-dom";
import NavBar from "../common/NavBar";

export default function GlobalLayout() {
  return (
    <div className="box-border">
      <NavBar />
      <CustomErrorBoundary>
        <Outlet />
      </CustomErrorBoundary>
    </div>
  );
}
