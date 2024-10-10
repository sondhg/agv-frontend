import { Outlet } from "react-router-dom";
import "./Admin.scss";
import SideBar from "./SideBar/SideBar";

export default function Admin() {
  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <SideBar />
      </div>
      <div className="admin-content">
        <div className="admin-header"></div>
        <div className="admin-main">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
