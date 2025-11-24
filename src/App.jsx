import React, { useEffect } from "react";
import SideBar from "./components/SideBar";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import routes from "../routes";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { div } from "framer-motion/client";
import { useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();
  const navigate = useNavigate();

  const isLoginPage = location.pathname === "/login";
  const isClienteView = location.pathname === "/";

  const isEmpleado = user?.rol === "Empleado";

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {!isLoginPage && (
        <div className="bg-[#59b03c] p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {!isClienteView && (
              <img
                src="svgs/menu.png"
                width={30}
                className="cursor-pointer"
                alt="menu"
                onClick={() => setIsOpen((prev) => !prev)}
                data-cy="menu-button"
              />
            )}

            <h1 className="text-3xl font-bold text-white">
              Cafetería "Bendita Patria"
            </h1>
          </div>
          <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
         
        </div>
      )}

      <div className="flex-1 flex w-full">{children}</div>
    </div>
  );
};

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <ToastContainer position="top-right" autoClose={3000} />
          <Layout>
            <Routes>
              {/* Rutas públicas */}
              <Route
                path="/"
                element={routes.find((r) => r.path === "/").element}
              />
              <Route
                path="/login"
                element={routes.find((r) => r.path === "/login").element}
              />

              {/* Rutas protegidas */}
              <Route
                path="/ordenes"
                element={
                  <ProtectedRoute allowedRoles={["Empleado", "Administrador"]}>
                    {routes.find((r) => r.path === "/ordenes").element}
                  </ProtectedRoute>
                }
              />
              <Route
                path="/productos"
                element={
                  <ProtectedRoute allowedRoles={["Administrador"]}>
                    {routes.find((r) => r.path === "/productos").element}
                  </ProtectedRoute>
                }
              />
              <Route
                path="/historial"
                element={
                  <ProtectedRoute allowedRoles={["Administrador"]}>
                    {routes.find((r) => r.path === "/historial").element}
                  </ProtectedRoute>
                }
              />
              <Route
                path="/usuarios"
                element={
                  <ProtectedRoute allowedRoles={["Administrador"]}>
                    {routes.find((r) => r.path === "/usuarios").element}
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reportes"
                element={
                  <ProtectedRoute allowedRoles={["Administrador"]}>
                    {routes.find((r) => r.path === "/reportes").element}
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
