import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";
import PropTypes from "prop-types";

const PrivateRoute = ({ rol }) => {
  const { isAuthenticated, user } = useAuth();
  if (rol !== null && user) {
    return isAuthenticated && Number(user?.rolId) === rol ? (
      <Outlet />
    ) : (
      <Navigate to="/login" />
    );
  }
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;

PrivateRoute.propTypes = {
  rol: PropTypes.number
};
