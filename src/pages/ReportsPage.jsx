import { useState, useEffect } from "react";
import PageWrapper from "../components/PageWrapper";
import { select } from "framer-motion/client";
import { useQuery } from "@tanstack/react-query";
import { getOrdenes } from "../services/orden.service";
import { getDetalleOrdenes } from "../services/detalle-orden.service";

const ReportsPage = () => {
  //data fetching
  const { data: ordenes } = useQuery({
    queryKey: ["ordenes"],
    queryFn: getOrdenes,
  });

  const { data: detalleOrdenes } = useQuery({
    queryKey: ["detalleOrdenes"],
    queryFn: getDetalleOrdenes,
  });

  //use states
  const [ordenesFiltradas, setOrdenesFiltradas] = useState([]);
  const [detalleOrdenesFiltradas, setDetalleOrdenesFiltradas] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [opcionesSeleccionadas, setOpcionesSeleccionadas] = useState({
    numeroOrden: false,
    nombreCliente: false,
    cajeroEnTurno: false,
    horaTransaccion: false,
    estadoOrden: false,
  });

  useEffect(() => {
    if (!selectedDate || !ordenes || !detalleOrdenes) return;

    const nuevasOrdenes = ordenes.filter((orden) => {
      const fechaOrden = new Date(orden.fechaHora).toLocaleDateString("es-ES");
      return fechaOrden === selectedDate;
    });
    setOrdenesFiltradas(nuevasOrdenes);

    const nuevasDetallesOrdenes = detalleOrdenes.filter((detalleOrden) => {
      const matchingIdOrden = nuevasOrdenes.find(
        (orden) => orden._id === detalleOrden.idOrden
      );
      return matchingIdOrden?._id === detalleOrden.idOrden;
    });

    setDetalleOrdenesFiltradas(nuevasDetallesOrdenes);

    console.log("detalles ordenes filtradas ", nuevasDetallesOrdenes);
    console.log("ordenes filtradas ", nuevasOrdenes);
  }, [selectedDate]);

  //fechas ultimos 30 dias
  const generarFechasUltimos30Dias = () => {
    const fechas = [];

    for (let i = 0; i < 30; i++) {
      const fecha = new Date();
      fecha.setDate(fecha.getDate() - i);
      fechas.push(fecha.toLocaleDateString("es-ES"));
    }
    return fechas;
  };
  const fechas = generarFechasUltimos30Dias();

  //pdf generation logic
  const generarPDF = () => {
    if (!selectedDate) return;
  };

  return (
    <PageWrapper>
      <div className="p-4">
        {/*Contenedor*/}
        <div className="border border-gray-200 rounded-b-lg p-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Historial izquierda*/}
          <section className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">
              Historial de Reportes de Ventas
            </h2>
            <div className="overflow-y-auto max-h-[420px]">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-200 text-left">
                    <th className="p-2 font-medium">Fecha Creación</th>
                    <th className="p-2 font-medium">Archivos</th>
                  </tr>
                </thead>
                <tbody>
                  {fechas.map((fecha, index) => (
                    <tr key={index} className="border-t">
                      <td className="p-2">{fecha}</td>
                      <td className="p-2">
                        <button
                          onClick={() => setSelectedDate(fecha)}
                          className="px-4 py-1 rounded bg-gray-800 text-white"
                        >
                          Elegir
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Selección derecha */}
          {selectedDate && (
            <section className="border rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-4">
                Seleccionar Información a Exportar
              </h2>

              <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                <h3 className="text-lg font-semibold">
                  Informe de Ventas Día: {selectedDate}
                </h3>
                <button className="text-sm underline text-blue-600"></button>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                En este apartado usted podrá seleccionar qué columnas son
                relevantes para usted; los campos que seleccione van a formar
                parte del documento de exportación final.
              </p>

              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    onChange={(e) =>
                      setOpcionesSeleccionadas({
                        ...opcionesSeleccionadas,
                        numeroOrden: e.target.checked,
                      })
                    }
                    type="checkbox"
                    className="w-4 h-4"
                  />
                  <span>Número de Orden</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    onChange={(e) =>
                      setOpcionesSeleccionadas({
                        ...opcionesSeleccionadas,
                        nombreCliente: e.target.checked,
                      })
                    }
                    type="checkbox"
                    className="w-4 h-4"
                  />
                  <span>Nombre del Cliente</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    onChange={(e) =>
                      setOpcionesSeleccionadas({
                        ...opcionesSeleccionadas,
                        cajeroEnTurno: e.target.checked,
                      })
                    }
                    type="checkbox"
                    className="w-4 h-4"
                  />
                  <span>Cajero en Turno</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    onChange={(e) =>
                      setOpcionesSeleccionadas({
                        ...opcionesSeleccionadas,
                        horaTransaccion: e.target.checked,
                      })
                    }
                    type="checkbox"
                    className="w-4 h-4"
                  />
                  <span>Hora de la transacción</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    onChange={(e) =>
                      setOpcionesSeleccionadas({
                        ...opcionesSeleccionadas,
                        estadoOrden: e.target.checked,
                      })
                    }
                    type="checkbox"
                    className="w-4 h-4"
                  />
                  <span>Estado Final de la Orden</span>
                </label>
              </div>

              <div className="flex gap-4 mt-6">
                <button className="px-5 py-2 rounded bg-gray-800 text-white">
                  Exportar Selección
                </button>
                <button className="px-5 py-2 rounded bg-gray-800 text-white">
                  Exportar Todo
                </button>
              </div>
            </section>
          )}
        </div>
      </div>
    </PageWrapper>
  );
};

export default ReportsPage;
