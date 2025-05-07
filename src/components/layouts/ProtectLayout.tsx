import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectLayout() {
  const { isLogin } = useAuth();

  if (!isLogin) {
    return <Navigate to="/onboarding" replace />;
  }

  return <Outlet />;
}
