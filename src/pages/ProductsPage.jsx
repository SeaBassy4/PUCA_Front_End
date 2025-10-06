import React from "react";
import SearchBox from "../components/SearchBox";
import OptionBar from "../components/products/OptionBar";
import ProductCard from "../components/products/ProductCard";
import Modal from "../components/Modal";
import InputLabel from "../components/InputLabel";

import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { uploadImage } from "../services/storage.service";
import {
  getCategorias,
  postCategoria,
  putCategoria,
  deleteCategoria,
} from "../services/categoria.service";
import {
  getProductos,
  postProducto,
  putProducto,
  deleteProducto,
} from "../services/producto.service";
import {
  getTamaños,
  putTamaño,
  postTamaño,
  deleteTamaño,
} from "../services/tamaño.service";
import { useQuery } from "@tanstack/react-query";
import { option, s } from "framer-motion/client";
import Swal from "sweetalert2";

const ProductsPage = () => {
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

  //modal visibility states
  const [showModal, setShowModal] = useState({
    ADD_PRODUCT: false,
    EDIT_PRODUCT: false,
    ADD_CATEGORY: false,
    EDIT_CATEGORY: false,
    ADD_SIZE: false,
    EDIT_SIZE: false,
  });

  //image and product states
  const [selectedFile, setSelectedFile] = useState(null); // archivo real
  const [previewUrl, setPreviewUrl] = useState(null); // preview temporal
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    nombre: "",
    precioBase: "",
    idCategoria: "",
    descripcion: "",
    imagenLink: "",
  });

  //category states
  const [newCategory, setNewCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  //size states
  const [newSize, setNewSize] = useState({
    nombre: "",
    precioExtra: "",
  });
  const [selectedSize, setSelectedSize] = useState(null);

  //filtered lists
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [categoriasFiltradas, setCategoriasFiltradas] = useState([]);
  const [tamañosFiltrados, setTamañosFiltrados] = useState([]);

  //filters
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState(null);

  //use effects

  //filtrar por categorías activas
  useEffect(() => {
    if (!categorias) return;
    const activos = categorias.filter((categoria) => categoria.activo);
    setCategoriasFiltradas(activos);
  }, [categorias]);

  //filtrar por tamaños activos
  useEffect(() => {
    if (!tamaños) return;
    const activos = tamaños.filter((tamaño) => tamaño.activo);
    setTamañosFiltrados(activos);
  }, [tamaños]);

  //filtrar por productos activos, filtrar por categoría y búsqueda
  useEffect(() => {
    if (!productos) return;
    let activos = productos?.filter((producto) => producto.activo);

    if (selectedFilter) {
      activos = activos.filter(
        (producto) => producto.idCategoria === selectedFilter
      );
    }

    if (search.trim() !== "") {
      const query = search.toLowerCase();
      activos = activos.filter((producto) =>
        producto.nombre.toLowerCase().includes(query)
      );
    }

    setProductosFiltrados(activos);
  }, [productos, search, selectedFilter]);

  //manejo de preview de imagen al seleccionar un producto
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
    setNewProduct({
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
          <div className="flex flex-row w-full bg-[#59B03C] rounded-md justify-evenly p-4">
            <h2 className="text-white font-bold text-xl text-center items-center flex">
              Productos
            </h2>
            <SearchBox
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <select
              className="bg-white border w-[160px] border-black rounded-md p-2 px-4 hover:bg-gray-100 font-semibold"
              name="categoria"
              id="categoria"
              value={selectedFilter || ""}
              onChange={(e) => setSelectedFilter(e.target.value)}
            >
              {categoriasFiltradas.map((categoria) => (
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
                    setNewProduct(producto);
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
        <div className="w-[88%]  flex flex-col mt-2 border-b-2 borded-black pb-4">
          <div className="flex flex-row justify-between w-full">
            <span className="font-semibold text-xl">
              Categoría de Productos
            </span>
            <button
              onClick={() => setShowModal({ ...showModal, ADD_CATEGORY: true })}
              className="bg-[#19212D] font-bold text-white text-xl rounded-[5px] px-6 h-11"
            >
              Añadir
            </button>
          </div>
          <div className="max-h-[25vh] overflow-y-auto">
            {categoriasFiltradas?.map((categoria) => (
              <OptionBar
                onClick={() => {
                  setSelectedCategory(categoria);
                  setNewCategory(categoria.nombre);
                  setShowModal({ ...showModal, EDIT_CATEGORY: true });
                }}
                key={categoria._id}
                title={categoria.nombre}
              ></OptionBar>
            ))}
          </div>
        </div>
        {/* tamaño de bebida div*/}
        {/*Botones de tamaños bebidas*/}
        <div className="w-[88%] flex flex-col mt-2 border-b-2 borded-black pb-4">
          <div className="flex flex-row justify-between w-full">
            <span className="font-semibold text-xl">Tamaño de Bebidas</span>
            <button
              onClick={() => setShowModal({ ...showModal, ADD_SIZE: true })}
              className="bg-[#19212D] font-bold text-white text-xl rounded-[5px] px-6 h-11"
            >
              Añadir
            </button>
          </div>
          <div className="max-h-[25vh] overflow-y-auto">
            {tamañosFiltrados?.map((tamaño) => (
              <OptionBar
                onClick={() => {
                  setSelectedSize(tamaño);
                  setNewSize({
                    nombre: tamaño.nombre,
                    precioExtra: tamaño.precioExtra,
                  });
                  setShowModal({ ...showModal, EDIT_SIZE: true });
                }}
                key={tamaño._id}
                title={tamaño.nombre}
              ></OptionBar>
            ))}
          </div>
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
              if (!validateProduct(newProduct)) return;
              const supabaseUrl = await uploadImage(selectedFile);
              if (!supabaseUrl) {
                toast.error("Error al subir la imagen");
                return;
              }
              const productWithImage = {
                ...newProduct,
                imagenLink: supabaseUrl,
              };

              const response = await postProducto(productWithImage);

              if (response.ok) {
                refetchProductos();
                Swal.fire({
                  icon: "success",
                  title: "¡Producto agregado!",
                  text: response.message,
                  timer: 2000,
                  showConfirmButton: false,
                });
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
                setNewProduct({ ...newProduct, nombre: e.target.value });
              }}
              value={newProduct.nombre}
              placeholder="Ingrese el nombre..."
            />
            <InputLabel
              classNames="w-full"
              title="Precio"
              onChange={(e) => {
                const onlyNumbers = e.target.value.replace(/\D/g, "");
                setNewProduct({
                  ...newProduct,
                  precioBase: onlyNumbers,
                });
              }}
              value={newProduct.precioBase}
              placeholder="Ingrese el precio..."
            />
          </div>
          <div className="mb-2 flex flex-col">
            <label className="font-bold mb-2">Categoría</label>
            <select
              className="border border-gray-300 rounded-md p-2"
              name="categoria"
              id="categoria"
              value={newProduct.idCategoria || ""}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
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
              setNewProduct({
                ...newProduct,
                descripcion: e.target.value,
              });
            }}
            value={newProduct.descripcion}
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
              const confirmation = window.confirm(
                "Seguro que desea eliminar este producto?"
              );
              if (!confirmation) return;
              const response = await deleteProducto(selectedProduct._id);
              if (response.ok) {
                Swal.fire({
                  icon: "success",
                  title: "¡Producto Eliminado!",
                  text: response.message,
                  timer: 2000,
                  showConfirmButton: false,
                });
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
              if (!validateProduct(newProduct)) return;

              var supabaseUrl = selectedProduct.imagenLink;
              if (selectedFile) {
                supabaseUrl = await uploadImage(selectedFile);
                if (!supabaseUrl) {
                  toast.error("Error al subir la imagen");
                  return;
                }
              }

              const productWithImage = {
                ...newProduct,
                imagenLink: supabaseUrl,
              };

              const response = await putProducto(
                selectedProduct._id,
                productWithImage
              );

              if (response.ok) {
                Swal.fire({
                  icon: "success",
                  title: "¡Producto Actualizado!",
                  text: response.message,
                  timer: 2000,
                  showConfirmButton: false,
                });
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
                setNewProduct({ ...newProduct, nombre: e.target.value });
              }}
              value={newProduct.nombre}
              placeholder="Ingrese el nombre..."
            />
            <InputLabel
              classNames="w-full"
              title="Precio"
              onChange={(e) => {
                const onlyNumbers = e.target.value.replace(/\D/g, "");
                setNewProduct({
                  ...newProduct,
                  precioBase: onlyNumbers,
                });
              }}
              value={newProduct.precioBase}
              placeholder="Ingrese el precio..."
            />
          </div>
          <div className="mb-2 flex flex-col">
            <label className="font-bold mb-2">Categoría</label>
            <select
              className="border border-gray-300 rounded-md p-2"
              name="categoria"
              id="categoria"
              value={newProduct.idCategoria || ""}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
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
              setNewProduct({
                ...newProduct,
                descripcion: e.target.value,
              });
            }}
            value={newProduct.descripcion}
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
      {showModal.ADD_CATEGORY && (
        <Modal
          title="Añadir Categoría"
          onClose={() => {
            setShowModal({ ...showModal, ADD_CATEGORY: false });
            setNewCategory("");
          }}
          onConfirm={async () => {
            try {
              if (!newCategory) {
                toast.warning("Por favor, complete el nombre de la categoría.");
                return;
              }
              const response = await postCategoria({ nombre: newCategory });

              if (response.ok) {
                refetchCategorias();
                Swal.fire({
                  icon: "success",
                  title: "¡Categoría agregada!",
                  text: response.message,
                  timer: 2000,
                  showConfirmButton: false,
                });
                setNewCategory("");
                setShowModal({ ...showModal, ADD_CATEGORY: false });
              } else {
                toast.error(response.message);
              }
            } catch (error) {
              toast.error(error.message);
            }
          }}
        >
          <p>Indique el nombre de la nueva categoría a añadir</p>
          <div className="mt-4 w-full">
            <InputLabel
              classNames="w-full mb-4"
              title="Nombre"
              onChange={(e) => {
                setNewCategory(e.target.value);
              }}
              value={newCategory}
              placeholder="Ingrese el nombre de la categoría..."
            />
          </div>
        </Modal>
      )}
      {showModal.EDIT_CATEGORY && selectedCategory && (
        <Modal
          onClose={() => {
            setShowModal({ ...showModal, EDIT_CATEGORY: false });
            setNewCategory("");
          }}
          title={`Editar Categoría: ${selectedCategory.nombre}`}
          onConfirm={async () => {
            try {
              if (!newCategory) {
                toast.warning("Por favor, complete el nombre de la categoría.");
                return;
              }
              const response = await putCategoria(selectedCategory._id, {
                nombre: newCategory,
              });

              if (response.ok) {
                refetchCategorias();
                Swal.fire({
                  icon: "success",
                  title: "¡Categoría actualizada!",
                  text: response.message,
                  timer: 2000,
                  showConfirmButton: false,
                });
                setNewCategory("");
                setShowModal({ ...showModal, EDIT_CATEGORY: false });
              } else {
                toast.error(response.message);
              }
            } catch (error) {}
          }}
          onDelete={async () => {
            try {
              const confirmation = window.confirm(
                "Seguro que desea eliminar esta categoría?"
              );
              if (!confirmation) return;
              const response = await deleteCategoria(selectedCategory._id);
              if (response.ok) {
                refetchCategorias();
                Swal.fire({
                  icon: "success",
                  title: "¡Categoría eliminada!",
                  text: response.message,
                  timer: 2000,
                  showConfirmButton: false,
                });
                setShowModal({ ...showModal, EDIT_CATEGORY: false });
              } else {
                toast.error(response.message);
              }
            } catch (error) {
              toast.error(error.message);
            }
          }}
        >
          <p>Aquí podrá editar la categoría o eliminarla</p>
          <div className="mt-4 w-full">
            <InputLabel
              classNames="w-full mb-4"
              title="Nombre"
              onChange={(e) => {
                setNewCategory(e.target.value);
              }}
              value={newCategory}
              placeholder="Ingrese el nombre de la categoría..."
            />
          </div>
        </Modal>
      )}
      {showModal.ADD_SIZE && (
        <Modal
          title="Añadir Tamaño"
          onClose={() => {
            setShowModal({ ...showModal, ADD_SIZE: false });
            setNewSize({ nombre: "", precioExtra: "" });
          }}
          onConfirm={async () => {
            try {
              if (!newSize.nombre || !newSize.precioExtra) {
                toast.warning(
                  "Por favor, indique el nombre y el precio extra del tamaño."
                );
                return;
              }

              const response = await postTamaño({
                nombre: newSize.nombre,
                precioExtra: newSize.precioExtra,
              });

              if (response.ok) {
                refetchTamaños();
                Swal.fire({
                  icon: "success",
                  title: "¡Tamaño agregado!",
                  text: response.message,
                  timer: 2000,
                  showConfirmButton: false,
                });
                setNewSize({ nombre: "", precioExtra: "" });
                setShowModal({ ...showModal, ADD_SIZE: false });
              } else {
                toast.error(response.message);
              }
            } catch (error) {
              toast.error(error.message);
            }
          }}
        >
          <p>
            Indique el nombre del tamaño que añadirá junto con su costo extra
          </p>
          <div className="mt-4 w-full">
            <InputLabel
              classNames="w-full mb-4"
              title="Nombre"
              onChange={(e) => {
                setNewSize({ ...newSize, nombre: e.target.value });
              }}
              value={newSize.nombre}
              placeholder="Ingrese el nombre del tamaño..."
            />
            <InputLabel
              classNames="w-full mb-4"
              title="Precio Extra"
              onChange={(e) => {
                const onlyNumbers = e.target.value.replace(/\D/g, "");
                setNewSize({ ...newSize, precioExtra: onlyNumbers });
              }}
              value={newSize.precioExtra}
              placeholder="Ingrese el precio extra..."
            />
          </div>
        </Modal>
      )}
      {showModal.EDIT_SIZE && selectedSize && (
        <Modal
          title={`Editar Tamaño: ${selectedSize.nombre}`}
          onClose={() => {
            setShowModal({ ...showModal, EDIT_SIZE: false });
            setNewSize({ nombre: "", precioExtra: "" });
          }}
          onConfirm={async () => {
            try {
              if (!newSize.nombre || !newSize.precioExtra) {
                toast.warning(
                  "Por favor, indique el nombre y el precio extra del tamaño."
                );
                return;
              }

              const response = await putTamaño(selectedSize._id, {
                nombre: newSize.nombre,
                precioExtra: newSize.precioExtra,
              });

              if (response.ok) {
                refetchTamaños();
                Swal.fire({
                  icon: "success",
                  title: "¡Tamaño actualizado!",
                  text: response.message,
                  timer: 2000,
                  showConfirmButton: false,
                });
                setNewSize({ nombre: "", precioExtra: "" });
                setShowModal({ ...showModal, EDIT_SIZE: false });
              } else {
                toast.error(response.message);
              }
            } catch (error) {
              toast.error(error.message);
            }
          }}
          onDelete={async () => {
            try {
              const confirmation = window.confirm(
                "Seguro que desea eliminar este tamaño?"
              );
              if (!confirmation) return;
              const response = await deleteTamaño(selectedSize._id);
              if (response.ok) {
                refetchTamaños();
                Swal.fire({
                  icon: "success",
                  title: "¡Tamaño eliminado!",
                  text: response.message,
                  timer: 2000,
                  showConfirmButton: false,
                });
                setShowModal({ ...showModal, EDIT_SIZE: false });
              } else {
                toast.error(response.message);
              }
            } catch (error) {
              toast.error(error.message);
            }
          }}
        >
          <p>Aquí podrá modificar el tamaño seleccionado o eliminarlo.</p>
          <div className="mt-4 w-full">
            <InputLabel
              classNames="w-full mb-4"
              title="Nombre"
              onChange={(e) => {
                setNewSize({ ...newSize, nombre: e.target.value });
              }}
              value={newSize.nombre}
              placeholder="Ingrese el nombre..."
            />
            <InputLabel
              classNames="w-full mb-4"
              title="Precio Extra"
              onChange={(e) => {
                const onlyNumbers = e.target.value.replace(/\D/g, "");
                setNewSize({ ...newSize, precioExtra: onlyNumbers });
              }}
              value={newSize.precioExtra}
              placeholder="Ingrese el precio extra..."
            />
          </div>
        </Modal>
      )}
    </main>
  );
};

export default ProductsPage;
