import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function AdminRole() {
  const { getUserData } = useAuth();

  return getUserData("user.role") === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/unAuthorized" />
  );
}
