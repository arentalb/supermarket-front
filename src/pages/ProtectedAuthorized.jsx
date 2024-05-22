import { useSelector } from "react-redux";
import { getUserInfo } from "../redux/feature/auth/authSlice.js";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router";

export function ProtectedAuthorized() {
  const userInfo = useSelector(getUserInfo);
  return userInfo ? <Outlet /> : <Navigate to="/login" />;
}
