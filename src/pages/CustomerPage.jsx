import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getCategorias } from "../services/categoria.service";
import { getProductos } from "../services/producto.service";
import { getTamaños } from "../services/tamaño.service";
import { useEffect, useState } from "react";
import ProductCard from "../components/products/ProductCard";

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
  const [categoriasFiltradas, setCategoriasFiltradas] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);

  useEffect(() => {
    if (categorias) {
      const filteredCategories = categorias.filter(
        (categoria) => categoria.activo
      );
      setCategoriasFiltradas(filteredCategories);
    }
  }, [categorias]);

  useEffect(() => {
    if (selectedCategory) {
      const filteredProducts = productos.filter(
        (product) =>
          product.activo && product.idCategoria === selectedCategory._id
      );
      setProductosFiltrados(filteredProducts);
    }
  }, [selectedCategory, productos]);

  if (loadingProductos || loadingCategorias || loadingTamaños) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="w-full flex-1 flex flex-row justify-center items-center">
      <div className="flex flex-col w-[75%] p-10 h-full">
        <h1 className="font-bold text-2xl">Selecciona Una Categoría 😎</h1>
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
                onClick={() => setSelectedCategory(categoria)}
                imgSrc={producto.imagenLink}
              ></ProductCard>
            ))}
        </div>
      </div>
      <div className="h-full w-[25%] bg-gray-200">
        <h2 className="font-bold text-xl">Tu Orden Se Creará Aquí</h2>
      </div>
    </div>
  );
};

export default CustomerPage;
