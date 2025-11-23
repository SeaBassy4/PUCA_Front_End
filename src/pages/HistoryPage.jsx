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
import { getUsuarios } from "../services/usuario.service";

const HistoryPage = () => {
  const {
    data: ordenes,
    isLoading: ordenesLoading,
    refetch: refetchOrdenes,
  } = useQuery({
    queryKey: ["ordenes"],
    queryFn: getOrdenes,
  });
  const {
    data: empleados,
    isLoading: empleadosLoading,
    refetch: refetchEmpleados,
  } = useQuery({
    queryKey: ["empleados"],
    queryFn: getUsuarios,
  });

  const [search, setSearch] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedEmpleado, setSelectedEmpleado] = useState("");

  if (!ordenes || !empleados) {
    return <div>Cargando...</div>;
  }

  const sortedOrdenes = [...ordenes].sort((firstOrden, lastOrden) => {
    const firstOrdenTime = new Date(firstOrden.fechaHora).getTime();
    const lastOrdenTime = new Date(lastOrden.fechaHora).getTime();
    return firstOrdenTime - lastOrdenTime;
  });

  const filteredOrdenes = sortedOrdenes.filter((orden) => {
    return (
      orden.nombreCliente.toLowerCase().includes(search.toLowerCase()) &&
      (selectedState === ""
        ? orden.estado === "Completada" || orden.estado === "Cancelada"
        : orden.estado === selectedState) &&
      (orden.idUsuario?._id === selectedEmpleado || selectedEmpleado === "")
    );
  });

  const filteredEmpleados = empleados.filter((empleado) => empleado.activo);

  return (
    <div className="w-full flex-1 flex flex-col items-center ">
      <div className="flex flex-row p-4 w-[90%] justify-evenly">
        <h2 className="text-2xl font-bold mx-4">Historial de Órdenes</h2>
        <SearchBox
          className="px-4"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por cliente..."
          data-cy="search-cliente" // ← AGREGAR ESTE DATA-CY
        />
        <select
          className="bg-white border border-black rounded-md p-2 px-4 hover:bg-gray-100 font-semibold"
          name="estado"
          id="estado"
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          data-cy="select-estado" // ← AGREGAR ESTE DATA-CY
        >
          <option value="">Seleccionar</option>
          <option value="Completada">Completada</option>
          <option value="Cancelada">Cancelada</option>
        </select>
        <select
          className="bg-white border border-black rounded-md p-2 px-4 hover:bg-gray-100 font-semibold"
          name="empleado"
          id="empleado"
          value={selectedEmpleado}
          onChange={(e) => setSelectedEmpleado(e.target.value)}
          data-cy="select-empleado" // ← AGREGAR ESTE DATA-CY
        >
          {filteredEmpleados.map((empleado) => (
            <option key={empleado._id} value={empleado._id}>
              {empleado.nombre}
            </option>
          ))}
          <option value="">Seleccionar</option>
        </select>
      </div>
      <div className="w-full flex flex-col items-center">
        {" "}
        {/* Contenedor principal*/}
        <div className="w-[90%] overflow-x-auto bg-white border rounded-md shadow-md">
          <table className="w-full border-collapse max-h-screen overflow-y-auto">
            <div className="w-full bg-white border rounded-md shadow-md overflow-auto max-h-[70vh] ">
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
                  {filteredOrdenes.map((orden) => (
                    <tr
                      key={orden._id}
                      className="border-t hover:bg-gray-100 transition"
                      data-cy="orden-row" // ← AGREGAR ESTE DATA-CY EN CADA FILA
                    >
                      <td className="p-3">{orden.nombreCliente}</td>
                      <td className="p-3">
                        {new Date(orden.fechaHora).toLocaleString("es-MX")}
                      </td>
                      <td className="p-3">{orden.estado}</td>
                      <td className="p-3 font-semibold">
                        ${orden.total.toFixed(2)}
                      </td>
                      <td className="p-3">
                        {orden.idUsuario?.nombre || "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
