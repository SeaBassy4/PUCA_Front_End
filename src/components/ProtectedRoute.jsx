import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  console.log("ProtectedRoute - User:", user); // DEBUG
  console.log("ProtectedRoute - allowedRoles:", allowedRoles); // DEBUG

  if (!user) {
    console.log("No hay usuario, redirigiendo a login"); // DEBUG
    // Si no hay usuario logueado, redirige al login
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.rol)) {
    console.log("Rol no permitido, redirigiendo"); // DEBUG
    // Si el rol no tiene acceso, redirige según el rol
    if (user.rol === "empleado") {
      return <Navigate to="/ordenes" replace />;
    }
    // Para admin o cualquier otro rol sin permisos, redirige a clientes
    return <Navigate to="/" replace />;
  }

  console.log("Acceso permitido, renderizando children"); // DEBUG
  // Si pasa las validaciones, renderiza la página
  return children;
};

export default ProtectedRoute;