// Dummy data
const historialOrdenes = [
  {
    id: 1,
    cliente: "Jesús Miguel",
    fechaHora: "2025-08-24T14:59:00",
    estado: "Completada",
    total: 300,
    empleado: "Manuel Rodríguez",
  },
  {
    id: 2,
    cliente: "Ana Gómez",
    fechaHora: "2025-08-24T15:10:00",
    estado: "Pendiente",
    total: 120.5,
    empleado: "Sofía Ramírez",
  },
  {
    id: 3,
    cliente: "Carlos Hernández",
    fechaHora: "2025-08-24T15:20:00",
    estado: "Cancelada",
    total: 0,
    empleado: "Diana Pérez",
  },
  {
    id: 4,
    cliente: "Lucía Moreno",
    fechaHora: "2025-08-24T15:35:00",
    estado: "Completada",
    total: 90.75,
    empleado: "Luis Aguilar",
  },
  {
    id: 5,
    cliente: "Pedro Castillo",
    fechaHora: "2025-08-24T16:00:00",
    estado: "Completada",
    total: 60,
    empleado: "Juan Martínez",
  },
  {
    id: 6,
    cliente: "Mariana Reyes",
    fechaHora: "2025-08-24T16:15:00",
    estado: "Pendiente",
    total: 110,
    empleado: "Ana Jiménez",
  },
  {
    id: 7,
    cliente: "Fernando Díaz",
    fechaHora: "2025-08-24T16:25:00",
    estado: "Completada",
    total: 55.25,
    empleado: "Diana Pérez",
  },
  {
    id: 8,
    cliente: "José Martínez",
    fechaHora: "2025-08-24T16:40:00",
    estado: "Completada",
    total: 35,
    empleado: "Manuel Rodríguez",
  },
];

const OrdersHistoryTable = () => {
  return (
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
            {historialOrdenes.map((orden) => (
              <tr
                key={orden.id}
                className="border-t hover:bg-gray-100 transition"
              >
                <td className="p-3">{orden.cliente}</td>
                <td className="p-3">
                  {new Date(orden.fechaHora).toLocaleString("es-MX")}
                </td>
                <td className="p-3">{orden.estado}</td>
                <td className="p-3 font-semibold">${orden.total.toFixed(2)}</td>
                <td className="p-3">{orden.empleado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersHistoryTable;
