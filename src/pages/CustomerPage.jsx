import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getCategorias } from "../services/categoria.service";
import { getProductos } from "../services/producto.service";
import { getTamaños } from "../services/tamaño.service";
import { postOrden } from "../services/orden.service";
import { postDetalleOrden } from "../services/detalle-orden.service";
import ProductCard from "../components/products/ProductCard";
import ProductModal from "../components/ProductModal";

const CustomerPage = () => {
  const navigate = useNavigate();

  // Data fetching
  const { data: productos, isLoading: loadingProductos } = useQuery({
    queryKey: ["productos"],
    queryFn: getProductos,
  });
  const { data: categorias, isLoading: loadingCategorias } = useQuery({
    queryKey: ["categorias"],
    queryFn: getCategorias,
  });
  const { data: tamaños, isLoading: loadingTamaños } = useQuery({
    queryKey: ["tamaños"],
    queryFn: getTamaños,
  });

  // State
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [categoriasFiltradas, setCategoriasFiltradas] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [tamañosFiltrados, setTamañosFiltrados] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [total, setTotal] = useState(0);
  const [clientOrder, setClientOrder] = useState({ productos: [], total: 0 });

  // Effects
  useEffect(() => {
    if (categorias) {
      setCategoriasFiltradas(categorias.filter((c) => c.activo));
    }
  }, [categorias]);

  useEffect(() => {
    if (tamaños) {
      setTamañosFiltrados(tamaños.filter((t) => t.activo));
    }
  }, [tamaños]);

  useEffect(() => {
    if (selectedCategory && productos) {
      setProductosFiltrados(
        productos.filter(
          (p) => p.activo && p.idCategoria === selectedCategory._id
        )
      );
    }
  }, [selectedCategory, productos]);

  useEffect(() => {
    if (selectedProduct) {
      setTotal(selectedProduct.precioBase + (selectedSize?.precioExtra || 0));
    }
  }, [selectedProduct, selectedSize]);

  if (loadingProductos || loadingCategorias || loadingTamaños) {
    return <div>Cargando...</div>;
  }

  // Handlers
  const deleteProductFromOrder = (index) => {
    const filteredArray = clientOrder.productos.filter((_, i) => i !== index);
    setClientOrder((prev) => ({
      ...prev,
      productos: filteredArray,
      total: filteredArray.reduce((acc, p) => acc + p.precio, 0),
    }));
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setSelectedSize(null);
    setTotal(0);
  };

  const handleAddProduct = (selectedProduct, total) => {
    setClientOrder((prev) => {
      const foundIndex = prev.productos.findIndex((p) =>
        selectedSize
          ? p.nombre === selectedProduct.nombre &&
            p.tamaño === selectedSize.nombre
          : p.nombre === selectedProduct.nombre
      );

      let updatedProductos;
      if (foundIndex !== -1) {
        updatedProductos = prev.productos.map((p, index) =>
          index === foundIndex
            ? { ...p, cantidad: p.cantidad + 1, precio: p.precio + total }
            : p
        );
      } else {
        updatedProductos = [
          ...prev.productos,
          {
            ...selectedProduct,
            cantidad: 1,
            precio: total,
            tamaño: selectedSize?.nombre || "",
            tamañoId: selectedSize?._id || "",
            productoId: selectedProduct._id,
            precioUnitario: selectedProduct.precioBase,
          },
        ];
      }

      const newTotal = updatedProductos.reduce((acc, p) => acc + p.precio, 0);
      return { ...prev, productos: updatedProductos, total: newTotal };
    });
  };

  const handleCreateOrder = async () => {
    try {
      const nombreCliente = prompt("¿Cuál es su nombre? (Para recibir su orden)");
      if (!nombreCliente || nombreCliente.trim() === "") {
        alert("Por favor ingresa un nombre válido para tu orden.");
        return;
      }

      const newOrder = {
        idUsuario: "68e3289ed580f299becb56c1",
        nombreCliente,
        total: clientOrder.total,
      };

      const response = await postOrden(newOrder);
      const createdOrderId = response._id;

      for (const producto of clientOrder.productos) {
        const newDetalleOrden = {
          idOrden: createdOrderId,
          idProducto: producto.productoId,
          idTamaño: producto.tamañoId || null,
          cantidad: producto.cantidad,
          precioUnitario: producto.precioUnitario,
        };
        await postDetalleOrden(newDetalleOrden);
      }

      setClientOrder({ productos: [], total: 0 });
      setSelectedCategory(null);
      setSelectedProduct(null);
      setSelectedSize(null);
      setTotal(0);
      alert("Orden creada con éxito, por favor espere su pedido");
    } catch (error) {
      console.error("Error al crear la orden (desde el frontend):", error);
    }
  };

  return (
    <div className="w-full flex-1 flex flex-row justify-center items-center relative">
      {/* Botón para ir al login en esquina inferior derecha */}
      <button
        onClick={() => navigate("/login")}
        className="fixed bottom-5 right-5 bg-blue-600 text-white py-3 px-5 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
      >
        Ir al Login
      </button>

      {/* Contenedor principal */}
      <div className="flex flex-col w-[75%] p-10 h-full">
        {selectedCategory ? (
          <div className="flex flex-row gap-5">
            <div
              className="rounded-full p-2 cursor-pointer"
              onClick={() => setSelectedCategory(null)}
            >
              <img width={20} src="svgs/return_black.png" alt="Regresar" />
            </div>
            <h2 className="font-bold text-2xl flex items-center">
              Selecciona tu Alimento 😎
            </h2>
          </div>
        ) : (
          <h2 className="font-bold text-2xl">Selecciona Una Categoría 😎</h2>
        )}

        <div className="flex flex-row flex-wrap items-center justify-evenly gap-5 h-full">
          {!selectedCategory &&
            categoriasFiltradas.map((categoria) => (
              <ProductCard
                key={categoria._id}
                altText={categoria.nombre}
                title={categoria.nombre}
                onClick={() => setSelectedCategory(categoria)}
                imgSrc={categoria.imagenLink}
              />
            ))}

          {selectedCategory &&
            productosFiltrados.map((producto) => (
              <ProductCard
                key={producto._id}
                altText={producto.nombre}
                title={producto.nombre}
                onClick={() => setSelectedProduct(producto)}
                imgSrc={producto.imagenLink}
              />
            ))}
        </div>
      </div>

      {/* Sidebar orden */}
      <div className="h-full w-[30%] p-10">
        <div className="rounded-md bg-white border-gray-300 border-2 flex h-full p-4">
          {clientOrder.productos.length === 0 ? (
            <div className="flex flex-col justify-center items-center text-center">
              <h2 className="font-bold text-black text-xl mb-4">
                Tu Orden se Creará Aquí
              </h2>
              <p className="mb-4">
                Selecciona un producto para comenzar a crear tu orden.
              </p>
              <img src="coffee-cup-waiting.png" alt="coffee-cup" />
            </div>
          ) : (
            <div className="flex flex-col w-full">
              <h2 className="font-bold text-black text-xl mb-4">
                Tu Orden Actual
              </h2>
              <ul>
                {clientOrder.productos.map((producto, index) => (
                  <li
                    key={index}
                    className="mb-2 flex flex-row justify-between"
                  >
                    <p>
                      x{producto.cantidad} {producto.nombre}{" "}
                      {producto.tamaño || ""}{" "}
                      <span className="font-bold text-green-600">
                        ${producto.precio}
                      </span>
                    </p>
                    <img
                      onClick={() => deleteProductFromOrder(index)}
                      className="cursor-pointer"
                      data-cy="delete-product"
                      src="/svgs/delete.png"
                      alt="delete"
                      width={20}
                    />
                  </li>
                ))}
              </ul>
              <p className="font-bold text-lg mt-4">
                Total a Pagar:{" "}
                <span className="text-green-600">${clientOrder.total}</span>
              </p>
              <button
                onClick={handleCreateOrder}
                className="text-white bg-green-600 font-semibold py-2 px-4 my-4 rounded-md w-full"
              >
                Confirm
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal productos */}
      {selectedProduct && (
        <ProductModal
          onClose={handleCloseModal}
          title={selectedProduct.nombre}
          bannerLink={selectedCategory?.bannerLink}
          onConfirm={() => {
            if (selectedCategory?.nombre === "Bebidas" && !selectedSize) {
              alert("Por favor selecciona un tamaño antes");
              return;
            }
            handleAddProduct(selectedProduct, total);
          }}
        >
          <p className="mb-4">{selectedProduct.descripcion}</p>
          {selectedCategory?.nombre === "Bebidas" && (
            <>
              <hr className="mb-4" />
              <h2 className="mb-4">Seleccionar Tamaño</h2>
              <div className="flex flex-row w-full">
                {tamañosFiltrados.map((tamaño) => (
                  <div
                    key={tamaño._id}
                    onClick={() => setSelectedSize(tamaño)}
                    className={`rounded-md p-2 m-2 cursor-pointer bg-yellow-300 text-black ${
                      selectedSize?._id === tamaño._id ? "!bg-green-400" : ""
                    }`}
                  >
                    <p className="font-bold">{tamaño.nombre}</p>
                  </div>
                ))}
              </div>
            </>
          )}
          <hr className="my-4" />
          <p className="text-lg font-bold">
            Precio a pagar: <span className="text-green-500">${total || 0}</span>
          </p>
        </ProductModal>
      )}
    </div>
  );
};

export default CustomerPage;
