import { Navigation } from "./Navigation.jsx";
import { Outlet } from "react-router";

export function AppLayout() {
  return (
    <div className={"max-w-[1200px] mx-auto"}>
      <Navigation />
      <div className={"max-w-[1100px] mx-auto"}>
        <Outlet />
      </div>
    </div>
  );
}
