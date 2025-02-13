import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";
import PropTypes from "prop-types";
import { Roles } from "../api";
import { useEffect, useState } from "react";

const PrivateRoute = ({ rol }) => {
  const { isAuthenticated, user, loadingUserValidation } = useAuth();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(loadingUserValidation);
  }, [loadingUserValidation]);
  if (loading) {
    return <div>...loading</div>;
  }

  if (rol !== Roles.WHOEVER) {
    return isAuthenticated && Number(user?.rolId) === rol ? (
      <Outlet />
    ) : (
      <Navigate to="/login" />
    );
  }
  if (isAuthenticated) {
    return <Outlet />;
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default PrivateRoute;

PrivateRoute.propTypes = {
  rol: PropTypes.number.isRequired
};
