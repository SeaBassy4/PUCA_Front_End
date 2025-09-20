import React from "react";

const OrderCard = ({ order }) => {
  //hacemos fetch de los detalles de la orden (dummy set por ahora)
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

  return (
    <div className="flex flex-col border bg-white border-gray-300 p-4 rounded-md w-full h-[250px]">
      <h1 className="font-bold text-lg">{order.nombreCliente}</h1>
      <ul className="decoration-none">
        <li>a</li>
      </ul>
    </div>
  );
};

export default OrderCard;
