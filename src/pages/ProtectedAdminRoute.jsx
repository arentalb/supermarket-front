import { useSelector } from "react-redux";
import { getUserInfo } from "../redux/feature/auth/authSlice.js";
import { Outlet } from "react-router";
import { Navigate } from "react-router-dom";

export function ProtectedAdminRoute() {
  const userInfo = useSelector(getUserInfo);
  return userInfo && userInfo.isAdmin ? <Outlet /> : <Navigate to="/" />;
}
