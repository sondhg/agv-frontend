import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Admin from "./components/Admin/Admin";
import Dashboard from "./components/Admin/Content/Dashboard/Dashboard";
import ManageOrder from "./components/Admin/Content/ManageOrders/ManageOrder";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Home from "./components/Home/Home";
import PrivateRoute from "./routes/PrivateRoute";

const NotFound = () => {
  return (
    <div className="alert-danger alert">
      404 Not Found: No data matches this URL
    </div>
  );
};

export default function Layout() {
  //!tạm bỏ className bg-dark khỏi div đầu tiên để animated card hiện border gradient
  return (
    <div className="text-white">
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/admin"
            // ! tạm tắt private route để xem đc Admin, khi hoàn thành all thì uncomment
            element={
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="manage-orders" element={<ManageOrder />} />
          </Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>

        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition:Bounce
        />
      </Suspense>
    </div>
  );
}