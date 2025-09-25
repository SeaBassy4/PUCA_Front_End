import React from "react";
import OrderCard from "../components/orders/OrderCard";
import SearchBox from "../components/SearchBox";
import Modal from "../components/Modal";
import { useState, useEffect } from "react";
import { getDetalleOrdenes } from "../services/detalle-orden.service";
import { getOrdenes } from "../services/orden.service";
import { useQuery } from "@tanstack/react-query";

const OrdersPage = () => {
  //fetch ordenes
  const {
    data: ordenes,
    isLoading: ordenesLoading,
    refetch: refetchOrdenes,
  } = useQuery({
    queryKey: ["ordenes"],
    queryFn: getOrdenes,
  });

  //fetch ordenes
  const {
    data: detalleOrdenes,
    isLoading: detalleOrdenesLoading,
    refetch: refetchDetalleOrdenes,
  } = useQuery({
    queryKey: ["detalleOrdenes"],
    queryFn: getDetalleOrdenes,
  });

  //use states
  const [showCompleteOrderModal, setShowCompleteOrderModal] = useState(false);
  const [showDeleteOrderModal, setShowDeleteOrderModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [search, setSearch] = useState("");

  //effects
  useEffect(() => {
    console.log("ordenes", ordenes);
    console.log("detalle ordenes", detalleOrdenes);
  }, [ordenes, detalleOrdenes]);

  const productos =
    detalleOrdenes?.filter(
      (detalleOrden) => detalleOrden.idOrden === selectedOrder?._id
    ) || [];

  const ordenesFiltradas =
    ordenes?.filter((orden) => {
      const searchLower = search.toLowerCase();
      return orden.idUsuario.nombre.toLowerCase().includes(searchLower);
    }) || [];

  return (
    <div className="relative w-full flex-1 flex items-center justify-center">
      <div className="w-[85%] h-[80vh] border border-gray-400 flex flex-col bg-gray-100 rounded-md">
        {/* Title y SearchBar Div */}
        <div className="bg-[#59B03C] p-4 flex">
          <h2 className="font-bold text-2xl mx-4 text-white">
            Órdenes Pendientes
          </h2>
          <SearchBox
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Contenedor scrollable */}
        <div className="flex-1 w-full px-8 py-8 overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            {ordenesFiltradas.map((order) => (
              <OrderCard
                detalleOrdenes={detalleOrdenes}
                order={order}
                onComplete={() => {
                  setSelectedOrder(order);
                  setShowCompleteOrderModal((prev) => !prev);
                }}
                onDelete={() => {
                  setSelectedOrder(order);
                  setShowDeleteOrderModal((prev) => !prev);
                }}
                key={order.idOrden}
                order={order}
              />
            ))}
          </div>
        </div>
      </div>
      {showCompleteOrderModal && (
        <Modal
          onClose={() => setShowCompleteOrderModal((prev) => !prev)}
          title="Completar Orden"
          message="¿Estás seguro de que deseas completar esta orden?"
          onConfirm={() => setShowCompleteOrderModal((prev) => !prev)}
        >
          <p className="mb-2">
            Esta acción mandará esta orden al historial y la marcará como
            completada, ¿está usted seguro?
          </p>
          <ul className="my-2">
            {productos?.map((prod) => (
              <li key={prod.idProducto}>
                x{prod.cantidad} {prod.idProducto} -{" "}
                <span className="font-bold">{prod.idTamaño}</span>{" "}
              </li>
            ))}
          </ul>
          <h2 className="font-semibold text-lg my-4">
            Enviar ticket a whatsapp del cliente
          </h2>
          <SearchBox classNames="w-full" placeholder="Ejemplo: 123456789" />
        </Modal>
      )}

      {showDeleteOrderModal && (
        <Modal
          onClose={() => setShowDeleteOrderModal((prev) => !prev)}
          title="Eliminar Orden"
          message="¿Estás seguro de que deseas eliminar esta orden?"
          onConfirm={() => setShowDeleteOrderModal((prev) => !prev)}
          type={"delete"}
        >
          <p className="mb-2">
            Esta acción <span className="font-bold">eliminará</span> esta orden
            por completo, ¿está usted seguro?
          </p>
          <ul className="my-2">
            {productos?.map((prod) => (
              <li key={prod.idProducto}>
                x{prod.cantidad} {prod.idProducto} -{" "}
                <span className="font-bold">{prod.idTamaño}</span>{" "}
              </li>
            ))}
          </ul>
        </Modal>
      )}
    </div>
  );
};

export default OrdersPage;
