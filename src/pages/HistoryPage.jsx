import React from "react";
import SearchBox from "../components/SearchBox";
import OptionBar from "../components/products/OptionBar";
import ProductCard from "../components/products/ProductCard";
import Modal from "../components/Modal";
import InputLabel from "../components/InputLabel";

import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { uploadImage } from "../services/storage.service";
import { getCategorias } from "../services/categoria.service";
import { getProductos, postProducto } from "../services/producto.service";
import { useQuery } from "@tanstack/react-query";
import { option } from "framer-motion/client";
import { getOrdenes } from "../services/orden.service";
import { obtenerUsuarios } from "../services/usuario.service";

const HistoryPage = () => {
  const {
    data: historial,
    isLoading: loadingHistorial,
    refetch: refetchHistorial,
  } = useQuery({
    queryKey: ["historial"],
    queryFn: getOrdenes,
  });
  const {
    data: usuariosEmpleados,
    isLoading: loadingUsuariosEmpleados,
    refetch: refetchUsuariosEmpleados,
  } = useQuery({
    queryKey: ["usuariosEmpleados"],
    queryFn: obtenerUsuarios,
  });



  const [search, setSearch] = useState("");
  const [showEstado, setShowEstado] = useState("All");
  const [showTotal, setShowTotal] = useState(false);
  const [showEmpleado, setShowEmpleado] = useState("Empleado");

  const ordenesTerminadas =
    historial?.filter((orden) => {
      const matchSearch = orden.nombreCliente
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchState =
        showEstado === "All" ? orden.estado === "Completada" || orden.estado === "Cancelada" :
          orden.estado === showEstado;

      return matchSearch && matchState;
    }) || [];

  const mostrarUsuarios =
    usuariosEmpleados?.filter((usuario) => usuario.activo) || []; 

  const filtroUsuario =
    usuariosEmpleados?.filter((usuario) => {
    const matchState =
      showEmpleado === "Empleado" ? usuario.id && usuario.activo === true : 
      usuario.id === parseInt(showEmpleado);

      return matchState;
    }) || [];



  return (
    <div className="w-full flex-1 flex flex-col items-center">
      <div className="flex flex-row p-4 w-[90%] justify-evenly">
        <h2 className="text-2xl font-bold mx-4">Historial de Órdenes</h2>
        <SearchBox
          className="px-4"
          value={search}
          onChange={(e) => setSearch(e.target.value)} />
        <select
          className="bg-white border border-black rounded-md p-2 px-4 hover:bg-gray-100 font-semibold"
          name="estado"
          id="estado"
          value={showEstado}
          onChange={(e) => setShowEstado(e.target.value)}
        >
          <option value="All">Estado</option>
          <option value="Completada">Completadas</option>
          <option value="Cancelada">Canceladas</option>
        </select>
        <select
          className="bg-white border border-black rounded-md p-2 px-4 hover:bg-gray-100 font-semibold"
          name="empleado"
          id="empleado"
          value={showEmpleado}
          onChange={(e) => setShowEmpleado(e.target.value)}
        >
          
          <option value="Empleado">Empleado</option>
          {mostrarUsuarios.map((usuario) => (
            <option key={usuario.id} value={usuario.id}>
              {usuario.nombre}
            </option>
          ))}

        </select>
      </div>
      <div className="w-full flex flex-col items-center">  {/* Contenedor principal*/}
        <div className="w-[90%] overflow-x-auto bg-white border rounded-md shadow-md">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-3">Nombre Cliente</th>
                <th className="p-3">Fecha y Hora</th>
                <th className="p-3">Estado</th>
                <th className="p-3">Total</th>
                <th className="p-3">Empleado</th>
              </tr>
            </thead>
            <tbody>
              {ordenesTerminadas.map((orden) => (
                <tr
                  key={orden.id}
                  className="border-t hover:bg-gray-100 transition"
                >
                  <td className="p-3">
                    {orden.nombreCliente}
                  </td>
                  <td className="p-3">
                    {new Date(orden.fechaHora).toLocaleString("es-MX")}
                  </td>
                  <td className="p-3">{orden.estado}</td>
                  <td className="p-3 font-semibold">
                    ${orden.total.toFixed(2)}</td>
                  <td className="p-3">{orden.idUsuario?.nombre || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
