import { Outlet } from "react-router-dom";
import SideBar from "./SideBar/SideBar";

export default function Admin() {
  return (
    <div className="grid grid-cols-[auto_1fr]">
      <div className="sticky top-0 h-screen self-start">
        <SideBar />
      </div>
      <div className="p-7">
        <Outlet />
      </div>
    </div>
  );
}
