import React from "react";
import PageWrapper from "../components/PageWrapper";


const ReportsPage = () => {    {/*Cambiar luego*/}
  const fechas = [
    "Por definir",
    "Por definir",
    "Por definir",
    "Por definir",
    "Por definir",
    "Por definir",
    "Por definir",
    "Por definir",
  ];

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
                {fechas.map((f) => (
                  <tr key={f} className="border-t">
                    <td className="p-2">{f}</td>
                    <td className="p-2">
                      <button className="px-4 py-1 rounded bg-gray-800 text-white">
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
        <section className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">
            Seleccionar Información a Exportar
          </h2>
          
            <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
              <h3 className="text-base font-semibold">
                Informe de Ventas Día: por definir
              </h3>
              <button className="text-sm underline text-blue-600">
               
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              En este apartado usted podrá seleccionar qué columnas son
              relevantes para usted; los campos que seleccione van a formar
              parte del documento de exportación final.
            </p>

            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" />
                <span>Número de Orden</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" />
                <span>Nombre del Cliente</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" />
                <span>Cajero en Turno</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" />
                <span>Hora de la transacción</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" />
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
      </div>
    </div>
    </PageWrapper>
  );
};

export default ReportsPage;
