import { createContext, useState, useContext, useEffect } from "react";
import { API } from "../api";
import PropTypes from "prop-types";

// Crear el contexto
const AuthContext = createContext();

// Función personalizada para usar el contexto
const useAuth = () => {
  // Obtener el valor del contexto
  const value = useContext(AuthContext);

  // Si el contexto no está disponible, lanzar un error
  if (value === undefined) {
    throw new Error("useAuth debe estar dentro de un AuthProvider");
  }

  return value;
};

// Componente proveedor del contexto
const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    validateUser();
  }, []);

  async function validateUser() {
    try {
      setLoading(true);
      const response = await fetch(`${API.URL}/authorization/validateUser`, {
        method: "GET",
        credentials: "include"
      });
      const json = await response.json();
      setUser(json.data);
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setUser(null);
      setIsAuthenticated(false);
      setLoading(false);
    }
  }
  // Función para iniciar sesión (ejemplo)
  const login = (user) => {
    // Lógica para autenticar al usuario
    // ...
    setIsAuthenticated(true);
    setUser(user);
  };

  // Función para cerrar sesión (ejemplo)
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.object
};
// eslint-disable-next-line react-refresh/only-export-components
export { AuthContext, AuthProvider, useAuth };
