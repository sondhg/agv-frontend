import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PrivateRoute(props) {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" />; //ko dùng useNavigate, sẽ lỗi
  }
  return <>{props.children}</>;
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
