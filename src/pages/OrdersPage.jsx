import React from "react";
import OrderCard from "../components/orders/OrderCard";
import SearchBox from "../components/SearchBox";
import Modal from "../components/Modal";
import { useState, useEffect } from "react";

const OrdersPage = () => {
  //hacemos fetch de las ordenes pendientes (dummy set por ahora)
  const ordenes = [
    {
      idOrden: 1,
      idUsuario: "Luis Aguilar",
      nombreCliente: "María López",
      fechaHora: "2025-09-20T09:30:00",
      estado: "Pendiente",
      total: 75.5,
    },
    {
      idOrden: 2,
      idUsuario: "Diana Pérez",
      nombreCliente: "Carlos Hernández",
      fechaHora: "2025-09-20T09:45:00",
      estado: "Servida",
      total: 42.0,
    },
    {
      idOrden: 3,
      idUsuario: "Juan Martínez",
      nombreCliente: "Ana Gómez",
      fechaHora: "2025-09-20T10:00:00",
      estado: "Pendiente",
      total: 120.75,
    },
    {
      idOrden: 4,
      idUsuario: "Sofía Ramírez",
      nombreCliente: "Pedro Castillo",
      fechaHora: "2025-09-20T10:15:00",
      estado: "Finiquitada",
      total: 60.0,
    },
    {
      idOrden: 5,
      idUsuario: "Carlos Torres",
      nombreCliente: "Lucía Moreno",
      fechaHora: "2025-09-20T10:30:00",
      estado: "Pendiente",
      total: 90.5,
    },
    {
      idOrden: 6,
      idUsuario: "Ana Jiménez",
      nombreCliente: "Fernando Díaz",
      fechaHora: "2025-09-20T10:45:00",
      estado: "Servida",
      total: 55.25,
    },
    {
      idOrden: 7,
      idUsuario: "Luis Aguilar",
      nombreCliente: "Mariana Reyes",
      fechaHora: "2025-09-20T11:00:00",
      estado: "Pendiente",
      total: 110.0,
    },
    {
      idOrden: 8,
      idUsuario: "Diana Pérez",
      nombreCliente: "José Martínez",
      fechaHora: "2025-09-20T11:15:00",
      estado: "Cancelada",
      total: 35.0,
    },
  ];

  //hacemos fetch de los detalles de la orden (dummy set por ahora)
  //debemos de ver que coincida el id de la "order" property y el id del "detalleOrden"
  //para mostrar los detalles de esa orden en particular que estamos recibiendo
  const detalleOrdenes = [
    {
      idOrden: 1,
      idProducto: "Café Latte",
      idTamaño: "Grande",
      cantidad: 2,
      precioUnitario: 25.0,
    },
    {
      idOrden: 1,
      idProducto: "Croissant",
      idTamaño: "Mediano",
      cantidad: 1,
      precioUnitario: 25.5,
    },
    {
      idOrden: 2,
      idProducto: "Espresso",
      idTamaño: "Pequeño",
      cantidad: 1,
      precioUnitario: 12.0,
    },
    {
      idOrden: 2,
      idProducto: "Muffin de Chocolate",
      idTamaño: "Mediano",
      cantidad: 1,
      precioUnitario: 30.0,
    },
    {
      idOrden: 3,
      idProducto: "Capuchino",
      idTamaño: "Grande",
      cantidad: 3,
      precioUnitario: 30.25,
    },
    {
      idOrden: 3,
      idProducto: "Pan de Queso",
      idTamaño: "Mediano",
      cantidad: 2,
      precioUnitario: 15.0,
    },
    {
      idOrden: 4,
      idProducto: "Café Americano",
      idTamaño: "Grande",
      cantidad: 2,
      precioUnitario: 20.0,
    },
    {
      idOrden: 4,
      idProducto: "Bagel",
      idTamaño: "Mediano",
      cantidad: 1,
      precioUnitario: 20.0,
    },
    {
      idOrden: 5,
      idProducto: "Chocolate Caliente",
      idTamaño: "Grande",
      cantidad: 1,
      precioUnitario: 35.0,
    },
    {
      idOrden: 5,
      idProducto: "Brownie",
      idTamaño: "Mediano",
      cantidad: 2,
      precioUnitario: 27.75,
    },
    {
      idOrden: 6,
      idProducto: "Latte Vainilla",
      idTamaño: "Grande",
      cantidad: 2,
      precioUnitario: 25.0,
    },
    {
      idOrden: 6,
      idProducto: "Donut",
      idTamaño: "Pequeño",
      cantidad: 1,
      precioUnitario: 5.25,
    },
    {
      idOrden: 7,
      idProducto: "Café Mocha",
      idTamaño: "Grande",
      cantidad: 2,
      precioUnitario: 30.0,
    },
    {
      idOrden: 7,
      idProducto: "Panqué",
      idTamaño: "Mediano",
      cantidad: 2,
      precioUnitario: 25.0,
    },
    {
      idOrden: 8,
      idProducto: "Té Verde",
      idTamaño: "Pequeño",
      cantidad: 1,
      precioUnitario: 10.0,
    },
    {
      idOrden: 8,
      idProducto: "Galletas",
      idTamaño: "Pequeño",
      cantidad: 2,
      precioUnitario: 12.5,
    },
  ];
  /*{
      idOrden: 1,
      idProducto: "Café Latte",
      idTamaño: "Grande",
      cantidad: 2,
      precioUnitario: 25.0,
    }, */

  //use states
  const [showCompleteOrderModal, setShowCompleteOrderModal] = useState(false);
  const [showDeleteOrderModal, setShowDeleteOrderModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [search, setSearch] = useState("");

  //effects
  useEffect(() => {
    console.log("showCompleteOrderModal:", showCompleteOrderModal);
    console.log("showDeleteOrderModal:", showDeleteOrderModal);
  }, [showCompleteOrderModal, showDeleteOrderModal]);

  const productos = detalleOrdenes.filter(
    (detalleOrden) => detalleOrden?.idOrden === selectedOrder?.idOrden
  );

  const ordenesFiltradas = ordenes.filter((orden) => {
    const searchLower = search.toLowerCase();
    return orden.idUsuario.toLowerCase().includes(searchLower);
  });

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
