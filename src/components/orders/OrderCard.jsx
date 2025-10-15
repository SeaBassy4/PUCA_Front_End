import React from "react";

const OrderCard = ({ order, onComplete, onDelete, detalleOrdenes }) => {
  const productos = detalleOrdenes.filter(
    (detalleOrden) => detalleOrden?.idOrden === order?._id
  );

  return (
    <div className="flex flex-col border relative bg-white border-gray-300 p-6 rounded-md w-full h-[250px]">
      <h1 className="font-bold text-2xl mb-3">{order.nombreCliente}</h1>
      <ul className="decoration-none">
        {productos?.map((producto) => (
          <li className="text-xl">
            x{producto.cantidad} {producto.idProducto.nombre} -{" "}
            <span className="font-bold">{producto?.idTamaño?.nombre}</span> -{" "}
            <span className="text-green-600 font-bold">
              ${(producto.precioUnitario * producto.cantidad).toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
      <button
        onClick={onComplete}
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mt-auto w-2/3"
      >
        Completar Orden{" "}
      </button>
      {/* absolute positioned elements */}
      <img
        src="/svgs/delete.png"
        width={30}
        alt="borrar"
        className="absolute bottom-7 right-6 cursor-pointer"
        onClick={onDelete}
      />
      <span className="absolute top-4 right-6 font-bold text-xl">
        Total: ${order.total.toFixed(2)}
      </span>
    </div>
  );
};

export default OrderCard;
