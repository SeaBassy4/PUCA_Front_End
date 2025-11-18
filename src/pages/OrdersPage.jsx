import React from "react";
import OrderCard from "../components/orders/OrderCard";
import SearchBox from "../components/SearchBox";
import Modal from "../components/Modal";
import { useState, useEffect } from "react";
import { getDetalleOrdenes } from "../services/detalle-orden.service";
import {
  getOrdenes,
  putOrden,
  enviarTicketWhatsapp,
} from "../services/orden.service";
import { useQuery } from "@tanstack/react-query";
import { validatePhoneNumber } from "../utils/validatePhoneNumber";
import { toast } from "react-toastify";

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
  const [filteredDetalleOrdenes, setFilteredDetalleOrdenes] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [search, setSearch] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const ORDER_STATE = {
    COMPLETADA: "Completada",
    PENDIENTE: "Pendiente",
    CANCELADA: "Cancelada",
  };

  //effects
  useEffect(() => {
    if (!ordenes || !detalleOrdenes || !selectedOrder) {
      return;
    }

    const filtered = detalleOrdenes.filter(
      (detalle) => detalle.idOrden === selectedOrder._id
    );

    console.log("Filtered Detalle Ordenes:", filtered);
    console.log("Selected Order:", selectedOrder);

    setFilteredDetalleOrdenes(filtered);
  }, [selectedOrder]);

  useEffect(() => {
    setPhoneNumber("");
  }, [showCompleteOrderModal]);

  const productos =
    detalleOrdenes?.filter(
      (detalleOrden) => detalleOrden.idOrden === selectedOrder?._id
    ) || [];

  const ordenesFiltradas =
    ordenes?.filter((orden) => {
      const matchSearch = orden.nombreCliente
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchState = orden.estado === ORDER_STATE.PENDIENTE;

      return matchSearch && matchState;
    }) || [];

  return (
    <>
      {ordenesLoading || detalleOrdenesLoading ? (
        <div className="flex items-center justify-center h-screen">
          <p className="text-3xl text-black">Cargando...</p>
        </div>
      ) : (
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
              {ordenesFiltradas.length === 0 ? (
                <p className=" text-2xl text-center text-gray-500">
                  No hay órdenes pendientes
                </p>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {ordenesFiltradas.map((order) => (
                    <OrderCard
                      key={order._id}
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
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
          {showCompleteOrderModal && (
            <Modal
              onClose={() => {
                setShowCompleteOrderModal((prev) => !prev);
              }}
              title="Completar Orden"
              message="¿Estás seguro de que deseas completar esta orden?"
              onConfirm={async () => {
                if (!validatePhoneNumber(phoneNumber)) {
                  toast.warning(
                    "El celular debe ser de 10 dígitos o dejarse vacío"
                  );
                  return;
                }
                const completedOrder = {
                  ...selectedOrder,
                  estado: ORDER_STATE.COMPLETADA,
                };
                const response = await putOrden(
                  selectedOrder?._id,
                  completedOrder
                );

                if (response.ok) {
                  refetchOrdenes();
                  toast.success(response.message);
                  setShowCompleteOrderModal((prev) => !prev);
                  if (phoneNumber) {
                    //mandamos un post al back y el back se encarga de hacer el pdf y enviarlo al numero indicado
                    const whatsappResponse = await enviarTicketWhatsapp({
                      orden: selectedOrder,
                      detalleOrdenes: filteredDetalleOrdenes,
                      celular: phoneNumber,
                    });

                    if (whatsappResponse.ok) {
                      toast.success(whatsappResponse.message);
                    }
                  }
                } else {
                  toast.error(response.message);
                }
              }}
            >
              <p className="mb-2">
                Esta acción mandará esta orden al historial y la marcará como
                completada, ¿está usted seguro?
              </p>
              <ul className="my-2">
                {/* son en realidad los "detalleOrdenes" */}
                {productos?.map((prod) => (
                  <li key={prod._id}>
                    x{prod.cantidad} {prod?.idProducto?.nombre} -{" "}
                    <span className="font-bold">{prod?.idTamaño?.nombre}</span>{" "}
                  </li>
                ))}
              </ul>
              <h2 className="font-semibold text-lg my-4">
                Enviar ticket a whatsapp del cliente
              </h2>
              <SearchBox
                value={phoneNumber}
                onChange={(e) => {
                  const onlyNumbers = e.target.value.replace(/\D/g, "");
                  setPhoneNumber(onlyNumbers);
                }}
                classNames="w-full"
                placeholder="Ejemplo: 6622334455"
              />
            </Modal>
          )}

          {showDeleteOrderModal && (
            <Modal
              onClose={() => setShowDeleteOrderModal((prev) => !prev)}
              title="Cancelar Orden"
              message="¿Estás seguro de que deseas cancelar esta orden?"
              onConfirm={async () => {
                const canceledOrder = {
                  ...selectedOrder,
                  estado: ORDER_STATE.CANCELADA,
                };
                const response = await putOrden(
                  selectedOrder?._id,
                  canceledOrder
                );

                if (response.ok) {
                  refetchOrdenes();
                  toast.success(response.message);
                  setShowDeleteOrderModal((prev) => !prev);
                } else {
                  toast.error(response.message);
                }
              }}
              type={"delete"}
            >
              <p className="mb-2">
                Esta acción <span className="font-bold">cancelará</span> esta
                orden (aún saldrá en reportes), ¿está usted seguro?
              </p>
              <ul className="my-2">
                {productos?.map((prod) => (
                  <li key={prod._id}>
                    x{prod.cantidad} {prod.idProducto.nombre} -{" "}
                    <span className="font-bold">{prod.idTamaño?.nombre}</span>{" "}
                  </li>
                ))}
              </ul>
            </Modal>
          )}
        </div>
      )}
    </>
  );
};

export default OrdersPage;
