import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function ProtectedRoute() {
  const { getUserData } = useAuth();

  if (getUserData("isLoggedIn")) {
    return <Outlet />;
  } else return <Navigate to="/signIn" />;
}
