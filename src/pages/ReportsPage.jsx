import { useState, useEffect } from "react";
import PageWrapper from "../components/PageWrapper";
import { select } from "framer-motion/client";
import { useQuery } from "@tanstack/react-query";
import { getOrdenes } from "../services/orden.service";
import { getDetalleOrdenes } from "../services/detalle-orden.service";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";

const ReportsPage = () => {
  //data fetching
  const { data: ordenes, isLoading: loadingOrdenes } = useQuery({
    queryKey: ["ordenes"],
    queryFn: getOrdenes,
  });

  const { data: detalleOrdenes, isLoading: loadingDetalles } = useQuery({
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

     const fechaSeleccionada = selectedDate.toLocaleDateString("es-ES");

    const ordenesFechaSeleccionada = ordenes.filter((orden) => {
      const fechaOrden = new Date(orden.fechaHora).toLocaleDateString("es-ES");
      return fechaOrden === fechaSeleccionada;
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
  }, [selectedDate, ordenes, detalleOrdenes]);

  
  /*
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
    if (!selectedDate) {

    alert ("Selecicone una fecha antes de exportat el pdf")
      return;

      }

    const fechaTexto = selectedDate.toLocaleDateString("es-ES");

  if (ordenesFiltradas.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Sin registros",
        text: "No hay ventas registradas para la fecha seleccionada.",
        confirmButtonColor: "rgba(85, 146, 77, 1)",
        confirmButtonText: "Entendido",
      });
      return;
    }


    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text(`Reporte Completo - ${fechaTexto}`, 14, 15);

    // Usar TODAS las columnas disponibles
    const headers = Object.keys(opciones)
      .filter((opcionKey) => opciones[opcionKey].value)
      .map((opcionKey) => opciones[opcionKey].title);

    const datos = [];

    detallesOrdenesFiltradas.forEach((detalleOrden) => {
  const ordenAsociada = ordenesFiltradas.find(
    (orden) => orden._id === detalleOrden.idOrden
  );

  const row = [];

  if (opciones.numeroOrden.value) {
    row.push(detalleOrden.idOrden.substring(0, 5));
  }
  if (opciones.nombreCliente.value) {
    row.push(ordenAsociada?.nombreCliente || "N/A");
  }
  if (opciones.cajeroEnTurno.value) {
    row.push(ordenAsociada?.idUsuario?.nombre || "N/A");
  }
  if (opciones.horaTransaccion.value) {
    row.push(
      ordenAsociada?.fechaHora
        ? new Date(ordenAsociada.fechaHora).toLocaleTimeString("es-ES")
        : "N/A"
    );
  }
  if (opciones.estadoOrden.value) {
    row.push(ordenAsociada?.estado || "N/A");
  }

  datos.push(row);
});


    autoTable(doc, {
      head: [headers],
      body: datos,
      startY: 30,
      styles: { fontSize: 8 },
    });

    doc.save(`reporte-completo-${fechaTexto.replace(/\//g, "-")}.pdf`);
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
              Seleccione una Fecha
            </h2>
              <div className="overflow-y-auto max-h-[420px]">
              <div data-cy="datepicker-wrapper" className="bg-white shadow-md rounded-lg p-4">
              <DatePicker
                
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="dd/MM/yyyy"
                inline
                maxDate={new Date()}
                
              />
                </div>
              </div>
            </div>
            <div className=""></div>
          </section>

          {/* Selección derecha */}
            <section className="bg-white shadow-lg border border-gray-200 rounded-2xl p-6 w-full flex-[2] transition-all duration-300 hover:shadow-xl">
                <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
               📝 <span>Exportar Reporte de Ventas</span>
                </h2>

                <p className="text-gray-600 text-sm mb-4">
                Selecciona una fecha y elige qué información deseas incluir en el archivo PDF.
              </p>

              <div className="flex items-center justify-between flex-wrap gap-2 mb-2">

              <h3 className="text-lg font-semibold" data-cy="selected-date">
                {selectedDate
                  ? `Informe de Ventas Día: ${selectedDate.toLocaleDateString("es-ES")}`
                  : "Seleccione una fecha para visualizar el informe"}
              </h3>

              </div>
              <p className="text-sm text-gray-600 mb-4">
                En este apartado usted podrá seleccionar qué columnas son
                relevantes para usted; los campos que seleccione van a formar
                parte del documento de exportación final.
              </p>

              <div className="space-y-2">
              {Object.keys(opcionesSeleccionadas).map((key) => (

                
                <label key= {key} className="flex items-center gap-2">
                  <input
                   data-cy={`checkbox-${key}`}
                   type="checkbox"
                   disabled = {!selectedDate}
                      checked={opcionesSeleccionadas[key].value}
                      onChange={(e) =>
                        setOpcionesSeleccionadas({
                          ...opcionesSeleccionadas,
                          [key]: {
                            ...opcionesSeleccionadas[key],
                            value: e.target.checked,
                          },
                        })
                      }
                      className="w-4 h-4 accent-green-600 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                <span>{opcionesSeleccionadas[key].title}</span>
                </label>
                ))}
                
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  data-cy="export-selection"
                onClick={() => generarPDF(opcionesSeleccionadas)}
                disabled={!selectedDate} 
                  className={`px-5 py-2 rounded text-white ${
              selectedDate
                ? "bg-gray-800 hover:bg-green-700 transition-colors duration-200"
                : "bg-gray-400 cursor-not-allowed"
            }`}

                >
                  Exportar Selección
                  
                </button>

                <button
                  onClick={() => {
                    
                    const todasTrue = Object.fromEntries(
                      Object.entries(opcionesSeleccionadas).map(([k, v]) => [
                        k,
                        { ...v, value: true },
                      ])
                    );
                    generarPDF(todasTrue);
                  }}
                  disabled={!selectedDate}
                    className={`px-5 py-2 rounded text-white ${
                    selectedDate
                      ? "bg-gray-800 hover:bg-green-700 transition-colors duration-200"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}

                >
                  Exportar Todo
                </button>
              </div>
            </section>
          
        </div>
      </div>
    </PageWrapper>
  );
};

export default ReportsPage;
