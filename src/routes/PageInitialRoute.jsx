import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { Roles } from "../api";

function PageInitialRoute() {
  const { isAuthenticated, loadingUserValidation, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && !loadingUserValidation) {
      if (user.rolId === Roles.ADMIN) {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } else if (!isAuthenticated && !loadingUserValidation) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate, loadingUserValidation]);

  return null; // Este componente no renderiza nada, solo se usa para la redirección inicial
}

export default PageInitialRoute;
