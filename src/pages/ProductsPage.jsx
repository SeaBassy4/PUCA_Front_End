import React from "react";
import SearchBox from "../components/SearchBox";
import OptionBar from "../components/products/OptionBar";
import ProductCard from "../components/products/ProductCard";
import Modal from "../components/Modal";
import InputLabel from "../components/InputLabel";

import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { uploadImage } from "../services/storage.service";
import { getCategorias } from "../services/categoria.service";
import {
  getProductos,
  postProducto,
  putProducto,
  deleteProducto,
} from "../services/producto.service";
import { useQuery } from "@tanstack/react-query";
import { option, s } from "framer-motion/client";

const ProductsPage = () => {
  const {
    data: productos,
    isLoading: loadingProductos,
    refetch: refetchProductos,
  } = useQuery({
    queryKey: ["productos"],
    queryFn: getProductos,
  });
  const { data: categorias, isLoading: loadingCategorias } = useQuery({
    queryKey: ["categorias"],
    queryFn: getCategorias,
  });

  const [selectedFile, setSelectedFile] = useState(null); // archivo real
  const [previewUrl, setPreviewUrl] = useState(null); // preview temporal
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    precioBase: "",
    idCategoria: "",
    descripcion: "",
    imagenLink: "",
  });
  const [showModal, setShowModal] = useState({
    ADD_PRODUCT: false,
    EDIT_PRODUCT: false,
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [categoriasFiltrados, setCategoriasFiltrados] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    console.log("nuevo Producto: ", nuevoProducto);
  }, [nuevoProducto]);

  useEffect(() => {
    if (!categorias) return;

    const filtrados = categorias.filter((categoria) => categoria.activo);
    setCategoriasFiltrados(filtrados);
  }, [categorias]);

  useEffect(() => {
    if (!productos) return;

    let filtrados = productos?.filter((producto) => producto.activo);

    if (selectedCategory) {
      filtrados = filtrados.filter(
        (producto) => producto.idCategoria === selectedCategory
      );
    }

    if (search.trim() !== "") {
      const query = search.toLowerCase();
      filtrados = filtrados.filter((producto) =>
        producto.nombre.toLowerCase().includes(query)
      );
    }

    setProductosFiltrados(filtrados);
  }, [productos, search, selectedCategory]);

  useEffect(() => {
    setPreviewUrl(selectedProduct?.imagenLink || null);
  }, [selectedProduct]);

  //functions
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const validateProduct = (object) => {
    if (
      object.nombre === "" ||
      object.precioBase === "" ||
      object.idCategoria === "" ||
      object.descripcion === ""
    ) {
      toast.warning("Por favor, complete todos los campos obligatorios.");
      return false;
    }
    if (!object.imagenLink && selectedFile === null) {
      toast.warning("Por favor, seleccione una imagen.");
      return false;
    }

    return true;
  };

  const cleanProductObject = () => {
    setNuevoProducto({
      nombre: "",
      precioBase: "",
      descripcion: "",
      idCategoria: "",
      imagenLink: "",
    });
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  return (
    <main className="flex w-full max-h-screen">
      <div className="w-2/3 h-full flex items-center justify-center">
        <div className="p-10 w-3xl flex flex-row flex-wrap items-center justify-between gap-4">
          <div className="flex flex-row p-4 w-full bg-[#59B03C] rounded-md justify-evenly">
            <h2 className="font-semibold text-xl text-white">
              Productos en Venta
            </h2>
            <SearchBox
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <select
              className="bg-white border border-black rounded-md p-2 px-4 hover:bg-gray-100 font-semibold"
              name="categoria"
              id="categoria"
              value={selectedCategory || ""}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categoriasFiltrados.map((categoria) => (
                <option key={categoria._id} value={categoria._id}>
                  {categoria.nombre}
                </option>
              ))}
              <option value="">Seleccionar</option>
            </select>
            <button
              onClick={() => setShowModal({ ...showModal, ADD_PRODUCT: true })}
              className="bg-[#19212D] font-bold text-white text-xl rounded-[5px] px-6 h-11"
            >
              Añadir
            </button>
          </div>

          {/* Contenedor de cards de alimentos */}
          <div className="w-full overflow-y-auto h-[60vh] border-1 rounded-[10px] border-gray-500 flex flex-row flex-wrap items-center p-6 gap-6">
            {loadingProductos ? (
              <p>Cargando productos...</p>
            ) : (
              productosFiltrados.map((producto) => (
                <ProductCard
                  key={producto._id}
                  onClick={() => {
                    setShowModal({ ...showModal, EDIT_PRODUCT: true });
                    setSelectedProduct(producto);
                    setNuevoProducto(producto);
                  }}
                  title={producto?.nombre}
                  altText={producto?.nombre}
                  imgSrc={producto?.imagenLink}
                ></ProductCard>
              ))
            )}
          </div>
        </div>
      </div>
      {/* lado derecho */}
      <div className="w-full h-full flex flex-col items-center justify-center  ">
        {/* Categoría div*/}
        {/*Botones de categoría*/}
        <div className="w-[88%] flex flex-col mt-2 border-b-2 borded-black pb-4">
          <div className="flex flex-row justify-between w-full">
            <span className="font-semibold text-xl">
              Categoría de Productos
            </span>
            <button className="bg-[#19212D] font-bold text-white text-xl rounded-[5px] px-6 h-11">
              Añadir
            </button>
          </div>
          <OptionBar title="Bebidas"></OptionBar>
          <OptionBar title="Alimentos"></OptionBar>
        </div>
        {/* tamaño de bebida div*/}
        {/*Botones de tamaños bebidas*/}
        <div className="w-[88%] flex flex-col mt-2 border-b-2 borded-black pb-4">
          <div className="flex flex-row justify-between w-full">
            <span className="font-semibold text-xl">Tamaño de Bebidas</span>
            <button className="bg-[#19212D] font-bold text-white text-xl rounded-[5px] px-6 h-11">
              Añadir
            </button>
          </div>
          <OptionBar title="Chico"></OptionBar>
          <OptionBar title="Mediano"></OptionBar>
          <OptionBar title="Grande"></OptionBar>
        </div>
      </div>
      {showModal.ADD_PRODUCT && (
        <Modal
          onClose={() => {
            setShowModal({ ...showModal, ADD_PRODUCT: false });
            cleanProductObject();
          }}
          title="Añadir Producto"
          onConfirm={async () => {
            try {
              if (!validateProduct(nuevoProducto)) return;
              const supabaseUrl = await uploadImage(selectedFile);
              if (!supabaseUrl) {
                toast.error("Error al subir la imagen");
                return;
              }
              const productWithImage = {
                ...nuevoProducto,
                imagenLink: supabaseUrl,
              };

              const response = await postProducto(productWithImage);

              if (response.ok) {
                refetchProductos();
                toast.success(response.message);
                cleanProductObject();
                setShowModal({ ...showModal, ADD_PRODUCT: false });
              } else {
                toast.error(response.message);
              }
            } catch (error) {
              toast.error(error.message);
            }
          }}
        >
          <p>
            Aquí podrá añadir un nuevo producto para añadirlo al área de ventas
          </p>
          <div className="my-2 gap-5 flex justify-around">
            <InputLabel
              classNames="w-full"
              title="Nombre Producto"
              onChange={(e) => {
                setNuevoProducto({ ...nuevoProducto, nombre: e.target.value });
              }}
              value={nuevoProducto.nombre}
              placeholder="Ingrese el nombre..."
            />
            <InputLabel
              classNames="w-full"
              title="Precio"
              onChange={(e) => {
                const onlyNumbers = e.target.value.replace(/\D/g, "");
                setNuevoProducto({
                  ...nuevoProducto,
                  precioBase: onlyNumbers,
                });
              }}
              value={nuevoProducto.precioBase}
              placeholder="Ingrese el precio..."
            />
          </div>
          <div className="mb-2 flex flex-col">
            <label className="font-bold mb-2">Categoría</label>
            <select
              className="border border-gray-300 rounded-md p-2"
              name="categoria"
              id="categoria"
              value={nuevoProducto.idCategoria || ""}
              onChange={(e) =>
                setNuevoProducto({
                  ...nuevoProducto,
                  idCategoria: e.target.value,
                })
              }
            >
              {categorias.map((categoria) => (
                <option key={categoria._id} value={categoria._id}>
                  {categoria.nombre}
                </option>
              ))}
              <option value="">Seleccionar</option>
            </select>
          </div>

          <InputLabel
            classNames="w-full mb-4"
            title="Descripción"
            onChange={(e) => {
              setNuevoProducto({
                ...nuevoProducto,
                descripcion: e.target.value,
              });
            }}
            value={nuevoProducto.descripcion}
            placeholder="Ingrese la descripción..."
          />
          <div className="flex flex-row w-full justify-between">
            <span className="font-bold mb-2">Imagen de Presentación</span>
            <button
              onClick={() => document.getElementById("fileInput").click()}
              className="bg-[#19212D] font-bold text-white rounded-[5px] px-4"
            >
              Añadir
            </button>
            <input
              onChange={handleFileChange}
              id="fileInput"
              type="file"
              accept="image/*"
              className="hidden"
            />
          </div>
          <div className="flex justify-center items-center w-full">
            <img
              className="w-30 h-30 m-5"
              src={previewUrl}
              alt="placeholder image"
            />
          </div>
        </Modal>
      )}
      {showModal.EDIT_PRODUCT && selectedProduct && (
        <Modal
          onClose={() => {
            setShowModal({ ...showModal, EDIT_PRODUCT: false });
            cleanProductObject();
          }}
          title={`Editar Producto: ${selectedProduct.nombre}`}
          onDelete={async () => {
            try {
              const response = await deleteProducto(selectedProduct._id);
              if (response.ok) {
                toast.success(response.message);
                setShowModal({ ...showModal, EDIT_PRODUCT: false });
                cleanProductObject();
                refetchProductos();
              } else {
                toast.error(response.message);
              }
            } catch (error) {
              toast.error(error.message);
            }
          }}
          onConfirm={async () => {
            try {
              if (!validateProduct(nuevoProducto)) return;

              var supabaseUrl = selectedProduct.imagenLink;
              if (selectedFile) {
                supabaseUrl = await uploadImage(selectedFile);
                if (!supabaseUrl) {
                  toast.error("Error al subir la imagen");
                  return;
                }
              }

              const productWithImage = {
                ...nuevoProducto,
                imagenLink: supabaseUrl,
              };

              const response = await putProducto(
                selectedProduct._id,
                productWithImage
              );

              if (response.ok) {
                toast.success(response.message);
                setShowModal({ ...showModal, EDIT_PRODUCT: false });
                cleanProductObject();
                refetchProductos();
              } else {
                toast.error(response.message);
              }
            } catch (error) {
              toast.error(error.message);
            }
          }}
        >
          <p>
            Aquí podrá modificar un producto existente perteneciente al área de
            ventas
          </p>
          <div className="my-2 gap-5 flex justify-around">
            <InputLabel
              classNames="w-full"
              title="Nombre Producto"
              onChange={(e) => {
                setNuevoProducto({ ...nuevoProducto, nombre: e.target.value });
              }}
              value={nuevoProducto.nombre}
              placeholder="Ingrese el nombre..."
            />
            <InputLabel
              classNames="w-full"
              title="Precio"
              onChange={(e) => {
                const onlyNumbers = e.target.value.replace(/\D/g, "");
                setNuevoProducto({
                  ...nuevoProducto,
                  precioBase: onlyNumbers,
                });
              }}
              value={nuevoProducto.precioBase}
              placeholder="Ingrese el precio..."
            />
          </div>
          <div className="mb-2 flex flex-col">
            <label className="font-bold mb-2">Categoría</label>
            <select
              className="border border-gray-300 rounded-md p-2"
              name="categoria"
              id="categoria"
              value={nuevoProducto.idCategoria || ""}
              onChange={(e) =>
                setNuevoProducto({
                  ...nuevoProducto,
                  idCategoria: e.target.value,
                })
              }
            >
              {categorias.map((categoria) => (
                <option key={categoria._id} value={categoria._id}>
                  {categoria.nombre}
                </option>
              ))}
              <option value="">Seleccionar</option>
            </select>
          </div>

          <InputLabel
            classNames="w-full mb-4"
            title="Descripción"
            onChange={(e) => {
              setNuevoProducto({
                ...nuevoProducto,
                descripcion: e.target.value,
              });
            }}
            value={nuevoProducto.descripcion}
            placeholder="Ingrese la descripción..."
          />
          <div className="flex flex-row w-full justify-between">
            <span className="font-bold mb-2">Imagen de Presentación</span>
            <button
              onClick={() => document.getElementById("fileInput").click()}
              className="bg-[#19212D] font-bold text-white rounded-[5px] px-4"
            >
              Añadir
            </button>
            <input
              onChange={handleFileChange}
              id="fileInput"
              type="file"
              accept="image/*"
              className="hidden"
            />
          </div>
          <div className="flex justify-center items-center w-full">
            <img
              className="w-30 h-30 m-5"
              src={previewUrl || selectedProduct.imagenLink}
              alt="placeholder image"
            />
          </div>
        </Modal>
      )}
    </main>
  );
};

export default ProductsPage;
