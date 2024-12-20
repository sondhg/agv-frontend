import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Admin from "./components/Admin/Admin";
import Dashboard from "./components/Admin/Content/Dashboard/DashBoard";
import ManageOrder from "./components/Admin/Content/ManageOrders/ManageOrder";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Home from "./components/Home/Home";
import PrivateRoute from "./routes/PrivateRoute";
import AGVs from "./components/Admin/Content/AGVs/AGVs";
import Schedules from "./components/Admin/Content/Schedules/Schedules";

const NotFound = () => {
  return (
    <div className="alert-danger alert">
      404 Not Found: No data matches this URL
    </div>
  );
};

export default function Layout() {
  return (
    <div className="text-white">
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/admin"
            // ! tạm tắt private route để xem đc Admin, khi hoàn thành all thì uncomment
            element={
              // <PrivateRoute>
              <Admin />
              // </PrivateRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="manage-orders" element={<ManageOrder />} />
            <Route path="schedules" element={<Schedules />} />
            <Route path="agvs" element={<AGVs />} />
          </Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Suspense>
    </div>
  );
}
