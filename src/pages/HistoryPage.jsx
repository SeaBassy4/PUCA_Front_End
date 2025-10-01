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

const HistoryPage = () => {
  const {
    data: historial,
    isLoading: loadingHistorial,
    refetch: refetchHistorial,
  } = useQuery({
    queryKey: ["historial"],
    queryFn: getOrdenes,
  });

  const [showSelectedNombreCliente, setShowSelectedNombreCliente] = useState(false);
  const [search, setSearch] = useState("");
  const [showDateTime, setShowDateTime] = useState(false);
  const [showEstado, setShowEstado] = useState(false);
  const [showTotal, setShowTotal] = useState(false);
  const [showEmpleado, setShowEmpleado] = useState(false);

  const ordenesCompletadas = 
    historial?.filter((orden) => orden.estado === "Completada"
    || orden.estado === "Cancelada" ) || [];




  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center">
      <div className="flex flex-row p-4 w-[90%]">
        <h2 className="text-2xl font-bold ">Historial de Órdenes</h2>
        <SearchBox value="" onChange={() => {}} />
      </div>
      <div className="w-full flex flex-col items-center">
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
            {ordenesCompletadas.map((orden) => (
              <tr
                key={orden.id}
                className="border-t hover:bg-gray-100 transition"
              >
                <td className="p-3">{orden.nombreCliente}</td>
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
