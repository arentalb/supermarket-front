import { useSelector } from "react-redux";
import { getUserInfo } from "../redux/feature/auth/authSlice.js";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router";

export function ProtectedUserRoute() {
  const userInfo = useSelector(getUserInfo);
  return userInfo && !userInfo.isAdmin ? <Outlet /> : <Navigate to="/login" />;
}
