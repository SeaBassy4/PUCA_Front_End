import React from "react";

const OrderCard = ({ order }) => {
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
  /*
  {
      idOrden: 1,
      idProducto: "Café Latte",
      idTamaño: "Grande",
      cantidad: 2,
      precioUnitario: 25.0,
    },
  */

  const productos = detalleOrdenes.filter(
    (detalleOrden) => order.idOrden === detalleOrden.idOrden
  );

  return (
    <div className="flex flex-col border relative bg-white border-gray-300 p-6 rounded-md w-full h-[250px]">
      <h1 className="font-bold text-2xl mb-3">{order.idUsuario}</h1>
      <ul className="decoration-none">
        {productos?.map((producto) => (
          <li className="text-xl">
            x{producto.cantidad} {producto.idProducto} -{" "}
            <span className="font-bold">{producto.idTamaño}</span> -{" "}
            <span className="text-green-600 font-bold">
              ${(producto.precioUnitario * producto.cantidad).toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
      <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mt-auto w-2/3">
        Completar Orden{" "}
      </button>
      {/* absolute positioned elements */}
      <img
        src="/svgs/delete.png"
        width={30}
        alt="borrar"
        className="absolute bottom-7 right-6 cursor-pointer"
      />
      <span className="absolute top-4 right-6 font-bold text-xl">
        Total: ${order.total.toFixed(2)}
      </span>
    </div>
  );
};

export default OrderCard;
