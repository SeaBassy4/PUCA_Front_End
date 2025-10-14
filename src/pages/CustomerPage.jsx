import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getCategorias } from "../services/categoria.service";
import { getProductos } from "../services/producto.service";
import { getTamaños } from "../services/tamaño.service";
import { postOrden } from "../services/orden.service";
import { postDetalleOrden } from "../services/detalle-orden.service";
import { useEffect, useState } from "react";
import ProductCard from "../components/products/ProductCard";
import ProductModal from "../components/ProductModal";
import { div } from "framer-motion/client";
const CustomerPage = () => {
  //Data fetching
  const {
    data: productos,
    isLoading: loadingProductos,
    refetch: refetchProductos,
  } = useQuery({
    queryKey: ["productos"],
    queryFn: getProductos,
  });
  const {
    data: categorias,
    isLoading: loadingCategorias,
    refetch: refetchCategorias,
  } = useQuery({
    queryKey: ["categorias"],
    queryFn: getCategorias,
  });
  const {
    data: tamaños,
    isLoading: loadingTamaños,
    refetch: refetchTamaños,
  } = useQuery({
    queryKey: ["tamaños"],
    queryFn: getTamaños,
  });

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [categoriasFiltradas, setCategoriasFiltradas] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [tamañosFiltrados, setTamañosFiltrados] = useState([]);
  const [total, setTotal] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [clientOrder, setClientOrder] = useState({
    productos: [], //{cantidad, nombre, precio, tamaño}
    total: 0,
  });

  useEffect(() => {
    if (categorias) {
      const filteredCategories = categorias.filter(
        (categoria) => categoria.activo
      );
      setCategoriasFiltradas(filteredCategories);
    }
  }, [categorias]);

  useEffect(() => {
    if (tamaños) {
      const filteredSizes = tamaños.filter((tamaño) => tamaño.activo);
      setTamañosFiltrados(filteredSizes);
    }
  }, [tamaños]);

  useEffect(() => {
    if (selectedCategory) {
      const filteredProducts = productos.filter(
        (product) =>
          product.activo && product.idCategoria === selectedCategory._id
      );
      console.log("productos filtrados; ", filteredProducts);
      console.log("categoria seleccionada: ", selectedCategory);

      setProductosFiltrados(filteredProducts);
    }
  }, [selectedCategory, productos]);

  useEffect(() => {
    const totalPrice = selectedSize?.precioExtra + selectedProduct?.precioBase;
    setTotal(totalPrice);
  }, [selectedSize]);

  useEffect(() => {
    setTotal(selectedProduct?.precioBase);
  }, [selectedProduct]);

  if (loadingProductos || loadingCategorias || loadingTamaños) {
    return <div>Cargando...</div>;
  }

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
            ? {
                ...p,
                cantidad: p.cantidad + 1,
                precio: p.precio + total,
              }
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
            tamañoId: selectedSize._id,
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
      //tenemos que crear la orden para que  todos los detalle orden
      //puedan apuntar a ella

      /*const nuevaOrden = new Orden({
      idUsuario,
      nombreCliente,
      fechaHora: new Date(),
      estado,
      total,
    }); */

      const nombreCliente = prompt(
        "¿Cuál es su nombre? (Para recibir su orden)"
      );

      const newOrder = {
        idUsuario: "Aqui va el id del usuario cuando tengamos login",
        nombreCliente: nombreCliente,
        fechaHora: new Date(),
        total: clientOrder.total,
      };

      const response = await postOrden(newOrder);
      const createdOrderId = response._id; //ahora con ese Id creamos detalles Ordenes

      /*    
      const nuevoDetalleOrden = new DetalleOrden({
      idOrden,
      idProducto,
      idTamaño,
      cantidad,
      precioUnitario,
    }); */

      for (const producto of clientOrder.productos) {
        const newDetalleOrden = {
          idOrden: createdOrderId,
          idProducto: producto.productoId,
          idTamaño: producto.tamañoId,
          cantidad: producto.cantidad,
          precioUnitario: producto.precioUnitario,
        };

        await postDetalleOrden(newDetalleOrden);
      }
    } catch (error) {
      console.error("Error al crear la orden:", error);
    }
  };

  return (
    <div className="w-full flex-1 flex flex-row justify-center items-center">
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
              ></ProductCard>
            ))}
          {selectedCategory &&
            productosFiltrados.map((producto) => (
              <ProductCard
                key={producto._id}
                altText={producto.nombre}
                title={producto.nombre}
                onClick={() => setSelectedProduct(producto)}
                imgSrc={producto.imagenLink}
              ></ProductCard>
            ))}
        </div>
      </div>
      <div className="h-full w-[30%] p-10">
        <div className="rounded-md bg-white border-gray-300 border-2 flex h-full p-4">
          {clientOrder.productos.length === 0 ? (
            <div className="flex flex-col justify-center items-center text-center">
              <h2 className="font-bold text-black text-xl mb-4">
                Tu Orden se Creará Aquí
              </h2>
              <p className="mb-4">
                Selecciona un producto para comenzar a crear tu orden, puedes
                añadir varios.
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
                  <li key={index} className="mb-2">
                    x{producto.cantidad} {producto.nombre}{" "}
                    {producto.tamaño || ""}{" "}
                    <span className="font-bold text-green-600">
                      ${producto.precio}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="font-bold text-lg mt-4">
                Total a Pagar:{" "}
                <span className="text-green-600">${clientOrder.total}</span>
              </p>
              <button
                onClick={async () => await handleCreateOrder()}
                className="text-white bg-green-600 font-semibold py-2 px-4 my-4 rounded-md w-full"
              >
                Confirm
              </button>
            </div>
          )}
        </div>
      </div>
      {/*Modal de Bebidas*/}
      {selectedProduct && selectedCategory.nombre === "Bebidas" ? (
        <ProductModal
          onClose={() => handleCloseModal()}
          title={selectedProduct.nombre}
          bannerLink={selectedCategory.bannerLink}
          onConfirm={() => {
            if (!selectedSize) {
              alert("Por favor selecciona un tamaño antes");
              return;
            }
            handleAddProduct(selectedProduct, total);
          }}
        >
          <p className="mb-4">{selectedProduct.descripcion}</p>
          <hr className="mb-4" />
          <h2 className="mb-4">Seleccionar Tamaño</h2>
          <div className="flex flex-row w-full">
            {tamañosFiltrados.map((tamaño) => {
              return (
                <div
                  onClick={() => setSelectedSize(tamaño)}
                  key={tamaño._id}
                  className={`rounded-md p-2 m-2 cursor-pointer bg-yellow-300 text-black ${
                    selectedSize?._id === tamaño._id ? "!bg-green-400" : ""
                  }`}
                >
                  <p className="font-bold">{tamaño.nombre}</p>
                </div>
              );
            })}
          </div>
          <hr className="my-4" />
          <p className="text-lg font-bold">
            Precio a pagar:{" "}
            <span className="font-bold text-green-500">${total || 0}</span>
          </p>
        </ProductModal>
      ) : (
        selectedProduct && (
          <ProductModal
            onClose={() => {
              handleCloseModal();
            }}
            title={selectedProduct.nombre}
            bannerLink={selectedCategory.bannerLink}
            onConfirm={() => {
              handleAddProduct(selectedProduct, total);
            }}
          >
            <p className="mb-4">{selectedProduct.descripcion}</p>
            <hr className="mb-4" />
            <p className="text-lg font-bold">
              Precio a pagar:{" "}
              <span className="font-bold text-green-500">${total || 0}</span>
            </p>
          </ProductModal>
        )
      )}
    </div>
  );
};

export default CustomerPage;
