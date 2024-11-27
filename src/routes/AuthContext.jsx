import React, { createContext, useState, useContext } from "react";

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

  // Función para iniciar sesión (ejemplo)
  const login = (email, password) => {
    // Lógica para autenticar al usuario
    // ...
    setIsAuthenticated(true);
    setUser({ email });
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

export { AuthContext, AuthProvider, useAuth };
