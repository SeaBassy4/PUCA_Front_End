import { useRef, useEffect } from "react";
import { Home, Package, Clock, Users, FileText, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Ajusta la ruta según tu estructura

const SideBar = ({ isOpen, setIsOpen }) => {
  const sidebarRef = useRef();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Detectar clics fuera del sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  // Función para manejar navegación
  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  // Función para manejar logout
  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsOpen(false);
  };

  return (
    <div
      ref={sidebarRef}
      className={`h-full w-[250px] bg-white flex flex-col border-r border-gray-200 fixed left-0 top-0 z-20 transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      {/* Logo */}
      <div className="px-6 py-6 border-b border-gray-300">
        <h1 className="text-2xl font-extrabold leading-tight tracking-wide">
          <span className="block">
            BENDI<span className="text-black">TA</span>
          </span>
          <span className="text-gray-700 font-normal">PATRIA</span>
        </h1>
      </div>

      {/* Vistas */}
      <div className="px-6 mt-6">
        <h2 className="text-gray-500 text-[0.75rem] font-semibold mb-4">
          VISTAS
        </h2>
        <ul className="flex flex-col gap-4">
          <li
            onClick={() => handleNavigation("/ordenes")}
            className="flex items-center gap-3 cursor-pointer hover:text-blue-600"
          >
            <Home size={18} /> <span className="text-sm">Órdenes</span>
          </li>
          <li
            onClick={() => handleNavigation("/productos")}
            className="flex items-center gap-3 cursor-pointer hover:text-blue-600"
          >
            <Package size={18} /> <span className="text-sm">Productos</span>
          </li>
          <li
            onClick={() => handleNavigation("/historial")}
            className="flex items-center gap-3 cursor-pointer hover:text-blue-600"
          >
            <Clock size={18} /> <span className="text-sm">Historial</span>
          </li>
          <li
            onClick={() => handleNavigation("/usuarios")}
            className="flex items-center gap-3 cursor-pointer hover:text-blue-600"
          >
            <Users size={18} /> <span className="text-sm">Usuarios</span>
          </li>
        </ul>
      </div>

      {/* Divider */}
      <div className="w-full h-[1px] bg-gray-300 my-6" />

      {/* Otros */}
      <div className="px-6">
        <h2 className="text-gray-500 text-[0.75rem] font-semibold mb-4">
          OTROS
        </h2>
        <ul className="flex flex-col gap-4">
          <li
            onClick={() => handleNavigation("/reportes")}
            className="flex items-center gap-3 cursor-pointer hover:text-blue-600"
          >
            <FileText size={18} /> <span className="text-sm">Reportes</span>
          </li>
          <li 
            onClick={handleLogout}
            className="flex items-center gap-3 cursor-pointer hover:text-blue-600"
          >
            <LogOut size={18} /> <span className="text-sm">Cerrar Sesión</span>
          </li>
        </ul>
      </div>

      {/* Usuario abajo */}
      <div className="mt-auto px-6 pb-6">
        <div className="bg-gray-100 border rounded-md p-3 text-center shadow-sm">
          {user ? (
            <div>
              <p className="text-sm font-medium">{user.nombre}</p>
              <p className="text-xs text-gray-500 capitalize">{user.rol}</p>
            </div>
          ) : (
            <p className="text-xs text-gray-500">No hay sesión activa</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBar;