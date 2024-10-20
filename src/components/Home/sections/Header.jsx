import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { doLogout } from "../../../redux/userSlice";
import { postLogout } from "../../../services/apiServices";

export default function Header() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const account = useSelector((state) => state.user.account);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    let res = await postLogout(account.email, account.refresh_token);
    if (res /* && res.EC === 0 */) {
      //need to clear data redux
      dispatch(doLogout());
      localStorage.clear("jwt");
      navigate("/login");
    } else {
      toast.error("Error, cannot log out");
    }
  };

  return (
    <div className="navbar sticky top-0 z-50 bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content menu-sm z-[1] mt-3 w-64 rounded-box bg-base-100 p-2 shadow"
          >
            <li>
              <a href="#hero">Home</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#services">Services</a>
            </li>
            <li>
              <a>Account</a>
              <ul className="p-2">
                <li>
                  <a>Email: {account.email}</a>
                </li>
                <li>
                  <a>Username: {account.name}</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <button className="btn btn-ghost text-xl">AGV System</button>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a href="#hero">Home</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#services">Services</a>
          </li>
          {isAuthenticated ? (
            <li>
              <details>
                <summary>Account</summary>
                <ul className="p-2">
                  <li>
                    <a>Email: {account.email}</a>
                  </li>
                  <li>
                    <a>Username: {account.name}</a>
                  </li>
                </ul>
              </details>
            </li>
          ) : null}
        </ul>
      </div>
      <div className="navbar-end space-x-2">
        {isAuthenticated === false ? (
          <>
            <NavLink to="/login">
              <button className="btn btn-secondary">Login</button>
            </NavLink>

            <NavLink to="/register">
              <button className="btn btn-ghost">Register</button>
            </NavLink>
          </>
        ) : (
          <>
            {/* <NavLink to="/admin">
              <button className="btn btn-accent">Dashboard</button>
            </NavLink>

            <NavLink to="/admin/manage-orders">
              <button className="btn btn-accent">Manage Orders</button>
            </NavLink>

            <NavLink to="/admin/schedules">
              <button className="btn btn-accent">Schedules</button>
            </NavLink> */}

            <button className="btn btn-error" onClick={() => handleLogOut()}>
              Log out
            </button>
          </>
        )}
      </div>
    </div>
  );
}
