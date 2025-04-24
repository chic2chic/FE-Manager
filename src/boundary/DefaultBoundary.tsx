import { Outlet } from "react-router-dom";

export default function DefaultBoundary() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
