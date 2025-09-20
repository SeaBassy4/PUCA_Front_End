import React from "react";
import OrderCard from "../components/orders/OrderCard";

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

  return (
    <div className="w-full flex-1 flex items-center justify-center">
      <div className="w-[85%] h-[80vh] border border-gray-400 flex flex-col bg-gray-100 rounded-md">
        {/* Title y SearchBar Div */}
        <div className="bg-[#59B03C] p-4 flex">
          <h2 className="font-bold text-2xl mx-4 text-white">
            Órdenes Pendientes
          </h2>
          <input
            type="text"
            className="border border-gray-300 p-2 bg-white rounded-md mx-4"
            placeholder="Buscar órdenes..."
          />
        </div>

        {/* Contenedor scrollable */}
        <div className="flex-1 w-full px-8 py-8 overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            {ordenes.map((order) => (
              <OrderCard key={order.idOrden} order={order} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
