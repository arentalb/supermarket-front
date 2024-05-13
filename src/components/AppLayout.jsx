import { Navigation } from "./Navigation.jsx";
import { Outlet } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export function AppLayout() {
  return (
    <div className="max-w-[1200px] w-full mx-auto min-h-screen flex flex-col">
      <Navigation />
      <div className="max-w-[1100px] w-full mx-auto px-4">
        <Outlet />
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
}
