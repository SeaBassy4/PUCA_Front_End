import { useState, useEffect } from "react";
import PageWrapper from "../components/PageWrapper";
import { select } from "framer-motion/client";
import { useQuery } from "@tanstack/react-query";
import { getOrdenes } from "../services/orden.service";
import { getDetalleOrdenes } from "../services/detalle-orden.service";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import CalendarComponent from "../components/CalendarComponent";

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
  const [detallesOrdenesFiltradas, setDetallesOrdenesFiltradas] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [opcionesSeleccionadas, setOpcionesSeleccionadas] = useState({
    numeroOrden: {
      title: "Número Orden",
      value: false,
    },
    nombreCliente: {
      title: "Nombre Cliente",
      value: false,
    },
    cajeroEnTurno: {
      title: "Cajero",
      value: false,
    },
    horaTransaccion: {
      title: "Hora Transacción",
      value: false,
    },
    estadoOrden: {
      title: "Estado Orden",
      value: false,
    },
  });

  useEffect(() => {
    if (!selectedDate || !ordenes || !detalleOrdenes) return;

    const ordenesFechaSeleccionada = ordenes.filter((orden) => {
      const fechaOrden = new Date(orden.fechaHora).toLocaleDateString("es-ES");
      return fechaOrden === selectedDate;
    });
    setOrdenesFiltradas(ordenesFechaSeleccionada);
    console.log("ordenes de fecha seleccionada ", ordenesFechaSeleccionada);

    //ahora de acuerdo a esas ordenes de la fecha correspondiente fiiltramos
    //los detalles de orden
    const detallesFiltrados = detalleOrdenes.filter((detalle) => {
      return ordenesFechaSeleccionada.some(
        (orden) => orden._id === detalle.idOrden
      );
    });
    console.log("detalles filtrados de fecha seleccionada", detallesFiltrados);
    setDetallesOrdenesFiltradas(detallesFiltrados);
  }, [selectedDate]);

  useEffect(() => {
    console.log("opciones seleccionadas", opcionesSeleccionadas);
  }, [opcionesSeleccionadas]);

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

  /* */
  const generarPDF = (opciones) => {
    if (!selectedDate) return;

    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text(`Reporte Completo - ${selectedDate}`, 14, 15);

    // Usar TODAS las columnas disponibles
    const headers = Object.keys(opciones)
      .filter((opcionKey) => opciones[opcionKey].value)
      .map((opcionKey) => opciones[opcionKey].title);

    const datos = [];

    detallesOrdenesFiltradas.map((detalleOrden) => {
      const row = [];

      const ordenAsociada = ordenesFiltradas.find(
        (orden) => orden._id === detalleOrden.idOrden
      );

      if (opciones.numeroOrden.value) {
        row.push(detalleOrden.idOrden.substring(0, 5));
      }
      if (opciones.nombreCliente.value) {
        row.push(
          ordenAsociada.nombreCliente ? ordenAsociada.nombreCliente : "N/A"
        );
      }
      if (opciones.cajeroEnTurno.value) {
        row.push(
          ordenAsociada.idUsuario ? ordenAsociada.idUsuario?.nombre : "N/A"
        );
      }
      if (opciones.horaTransaccion.value) {
        row.push(
          ordenAsociada.fechaHora
            ? new Date(ordenAsociada.fechaHora).toLocaleTimeString("es-ES")
            : "N/A"
        );
      }
      if (opciones.estadoOrden.value) {
        row.push(ordenAsociada.estado);
      }

      datos.push(row);
    });

    autoTable(doc, {
      head: [headers],
      body: datos,
      startY: 30,
      styles: { fontSize: 8 },
    });

    doc.save(`reporte-completo-${selectedDate.replace(/\//g, "-")}.pdf`);
  }; /* */

  return (
    <PageWrapper>
      <div className="p-4 w-full h-full">
        {/*Contenedor*/}
        <div className="border flex-1 border-gray-200 rounded-b-lg p-4 flex flex-row">
          {/* Historial izquierda*/}
          <section className=" rounded-lg p-4 w-full flex-1">
            <div className="h-[50%]">
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
            </div>
            <div className=""></div>
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
                        numeroOrden: {
                          ...opcionesSeleccionadas.numeroOrden,
                          value: e.target.checked,
                        },
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
                        nombreCliente: {
                          ...opcionesSeleccionadas.nombreCliente,
                          value: e.target.checked,
                        },
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
                        cajeroEnTurno: {
                          ...opcionesSeleccionadas.cajeroEnTurno,
                          value: e.target.checked,
                        },
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
                        horaTransaccion: {
                          ...opcionesSeleccionadas.horaTransaccion,
                          value: e.target.checked,
                        },
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
                        estadoOrden: {
                          ...opcionesSeleccionadas.estadoOrden,
                          value: e.target.checked,
                        },
                      })
                    }
                    type="checkbox"
                    className="w-4 h-4"
                  />
                  <span>Estado Final de la Orden</span>
                </label>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => {
                    const opcionesPersonalizadas = {
                      numeroOrden: { ...opcionesSeleccionadas.numeroOrden },
                      nombreCliente: { ...opcionesSeleccionadas.nombreCliente },
                      cajeroEnTurno: { ...opcionesSeleccionadas.cajeroEnTurno },
                      horaTransaccion: {
                        ...opcionesSeleccionadas.horaTransaccion,
                      },
                      estadoOrden: { ...opcionesSeleccionadas.estadoOrden },
                    };

                    generarPDF(opcionesPersonalizadas);
                  }}
                  className="px-5 py-2 rounded bg-gray-800 text-white"
                >
                  Exportar Selección
                </button>
                <button
                  onClick={() => {
                    const opcionesTodasTrue = {
                      numeroOrden: {
                        ...opcionesSeleccionadas.numeroOrden,
                        value: true,
                      },
                      nombreCliente: {
                        ...opcionesSeleccionadas.nombreCliente,
                        value: true,
                      },
                      cajeroEnTurno: {
                        ...opcionesSeleccionadas.cajeroEnTurno,
                        value: true,
                      },
                      horaTransaccion: {
                        ...opcionesSeleccionadas.horaTransaccion,
                        value: true,
                      },
                      estadoOrden: {
                        ...opcionesSeleccionadas.estadoOrden,
                        value: true,
                      },
                    };

                    // Pasar directamente el objeto temporal a generarPDF
                    generarPDF(opcionesTodasTrue);
                  }}
                  className="px-5 py-2 rounded bg-gray-800 text-white"
                >
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
