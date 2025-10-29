import React, { useEffect, useState } from "react";
import SearchBox from "../components/SearchBox";
import Modal from "../components/Modal";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa"
import {  
  getUsuarios as obtenerUsuarios,
  postUsuario as crearUsuario,
  putUsuario as actualizarUsuario,
  deleteUsuario as deletearUsuario,
} from "../services/usuario.service";

const UsersTable = () => {
  const [usuarios, setUsuarios] = useState([]); //array dinamico, almacena la lista del backend
  const [search, setSearch] = useState(""); //busquedad 

  //modal state
  const [showModal, setShowModal] = useState(false);
  const [action, setAction] = useState("add"); // "agregar" | "editar"
  const [selectedUser, setSelectedUser] = useState(null);

  //datos del modal inputs
  const [form, setForm] = useState({
    nombre: "",
    celular: "",
    correo: "",
    contraseña: "",
    rol: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);  

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const data = await obtenerUsuarios();
        setUsuarios(data);
      } catch (err) {
        console.error("Error cargando usuarios:", err);
      }
    };
    fetchUsuarios();
  }, []);

  //prellenar cuando sea editar
  useEffect(() => {
    if (action === "edit" && selectedUser) {
      setForm({
        nombre: selectedUser.nombre || "",
        celular: selectedUser.celular || "",
        correo: selectedUser.correo || "",
        contraseña: "", //por seguridad, no se mostrara
        rol: selectedUser.rol || "",
      });
    }
    if (action === "add") {
      setForm({ nombre: "", celular: "", correo: "", contraseña: "", rol: "" });
    }
    setErrors({});
  }, [action, selectedUser]);

  const validate = () => {
    let newErrors = {};

    //Validar nombre
    if (!form.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio";
    } else if (form.nombre.trim().length < 2) {
      newErrors.nombre = "Debe tener al menos 2 caracteres";
    }

    //Validar celular
    if (!form.celular.trim()) {
      newErrors.celular = "El celular es obligatorio";
    } else if (!/^[0-9]+$/.test(form.celular)) {
      newErrors.celular = "Solo números permitidos";
    } else if (form.celular.length < 10) {
      newErrors.celular = "Debe tener al menos 10 dígitos";
    }

    //Validar correo
    if (!form.correo.trim()) {
      newErrors.correo = "El correo es obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)) {
      newErrors.correo = "Correo no válido";
    }

    //Validar contraseña
    if (action === "add") {
      if (!form.contraseña.trim()) {
        newErrors.contraseña = "La contraseña es obligatoria";
      }
    }

    //Validar rol
    if (!form.rol.trim()) {
      newErrors.rol = "El rol es obligatorio";
    } else if (/\d/.test(form.rol)) {
      newErrors.rol = "El rol no debe contener números";
    }

    return newErrors;
  };

  const handleAdd = () => {
    setAction("add");
    setSelectedUser(null);
    setShowModal(true);
  };

  const handleEdit = (user) => {
    setAction("edit");
    setSelectedUser(user);
    setShowModal(true);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState); // Alterna la visibilidad de la contraseña
  };

  const handleConfirm = async () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; //no continua si extiste algun error
    }

    try {
      if (action === "add") {
        await crearUsuario(form);
        Swal.fire({
          icon: "success",
          title: "¡Usuario agregado!",
          text: "El usuario se ha agregado correctamente.",
          timer: 2000,
          showConfirmButton: false,
        });
      } else if (action === "edit" && selectedUser) {
        await actualizarUsuario(selectedUser._id, form);
        Swal.fire({
          icon: "success",
          title: "¡Usuario actualizado!",
          text: "Los cambios se han guardado correctamente.",
          timer: 2000,
          showConfirmButton: false,
        });
      }

      const updatedList = await obtenerUsuarios();
      setUsuarios(updatedList);
      setShowModal(false);
    } catch (err) {
      console.error("Error al guardar usuario:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo guardar el usuario. Intenta de nuevo.",
      });
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el usuario.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgba(85, 146, 77, 1)",
      cancelButtonColor: "rgba(85, 146, 77, 1)",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) return;

    try {
      await deletearUsuario(id);
      setUsuarios((prev) => prev.filter((u) => u._id !== id));
      Swal.fire({
        icon: "success",
        title: "Usuario eliminado",
        text: "El usuario se eliminó correctamente.",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error("Error al eliminar:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo eliminar el usuario. Intenta de nuevo.",
      });
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Barra superior */}
      <div className="w-[90%] mt-4 flex items-center gap-3">
        <h2 className="text-xl font-bold">Usuarios del Sistema</h2>

        <div className="flex-1 flex">
          <div className="w-[300px]">
            <SearchBox
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <button
          onClick={handleAdd}
          className="px-4 py-2 rounded-md bg-neutral-900 text-white font-semibold hover:opacity-90"
        >
          Añadir
        </button>
      </div>

      {/*Tablita*/}
      <div className="w-[90%] mt-3 border rounded-xl shadow-sm p-4 bg-white">
        <div className="overflow-x-auto overflow-y-auto max-h-[400px]">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left rounded-md">
                <th className="p-3">Nombre</th>
                <th className="p-3">Celular</th>
                <th className="p-3">Correo</th>
                <th className="p-3">Contraseña</th>
                <th className="p-3">Rol</th>
                <th className="p-3">Acción</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => (
                <tr
                  key={u._id}
                  className="border-t hover:bg-gray-100 transition"
                >
                  <td className="p-3">{u.nombre}</td>
                  <td className="p-3">{u.celular}</td>
                  <td className="p-3">{u.correo}</td>
                  <td className="p-3">{u.contraseña ? "********" : "No definida"}</td>
                  <td className="p-3">{u.rol}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(u)}
                        className="px-4 py-2 rounded-md bg-neutral-900 text-white font-semibold hover:opacity-90"
                      > 
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(u._id)}
                        className="px-4 py-2 rounded-md bg-neutral-900 text-white font-semibold hover:opacity-90"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {usuarios.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-3 text-center text-gray-500">
                    No hay usuarios para mostrar.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <Modal
          title={action === "add" ? "Añadir Usuario" : "Editar Usuario"}
          onClose={() => setShowModal(false)}
          onConfirm={handleConfirm}
        >
          <p className="text-sm text-gray-600 mb-4">
            Aquí podrá{" "}
            {action === "add"
              ? "añadir un nuevo usuario a su sistema, ya sea empleado o administrador"
              : "editar la información del usuario seleccionado"}
            .
          </p>

          {/*Fila Nombre / Celular (dos columnas)*/}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">Nombre</label>
              <input
                name="nombre"
                value={form.nombre}
                onChange={onChange}
                className={`w-full border rounded-md p-2 outline-none focus:ring-2 ${
                  errors.celular
                    ? "border-red-500"
                    : "border-gray-300 focus:ring-[#59B03C]"
                }`}
              />
              {errors.nombre && (
                <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>
              )}
            </div>

            <div>
              <label className="block font-semibold mb-1">Celular</label>
              <input
                name="celular"
                value={form.celular}
                onChange={onChange}
                className={`w-full border rounded-md p-2 outline-none focus:ring-2 ${
                  errors.celular
                    ? "border-red-500"
                    : "border-gray-300 focus:ring-[#59B03C]"
                }`}
              />
              {errors.celular && (
                <p className="text-red-500 text-sm mt-1">{errors.celular}</p>
              )}
            </div>
          </div>

          {/*Correo*/}
          <div className="mt-4">
            <label className="block font-semibold mb-1">Correo</label>
            <input
              type="email"
              name="correo"
              value={form.correo}
              onChange={onChange}
              className={`w-full border rounded-md p-2 outline-none focus:ring-2 ${
                errors.correo
                  ? "border-red-500"
                  : "border-gray-300 focus:ring-[#59B03C]"
              }`}
            />
            {errors.correo && (
              <p className="text-red-500 text-sm mt-1">{errors.correo}</p>
            )}
          </div>

                  {/* Contraseña */}
        {(action === "add" || action === "edit") && (
          <div className="mt-4">
            <label className="block font-semibold mb-1">Contraseña Inicial</label>
            {action === "add" ? (
              <p className="text-sm text-gray-600 mb-2">
                Esta contraseña servirá para iniciar sesión la primera vez, el usuario deberá cambiarla al entrar.
              </p>
            ) : (
              <p className="text-sm text-gray-600 mb-2">
                Si deseas cambiar la contraseña de este usuario, ingrésala aquí. Si no se requiere cambiarla, deja el campo vacío.
              </p>
            )}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"} // Alterna entre "text para mostrar" y "password para ocultar"
                name="contraseña"
                value={form.contraseña}
                onChange={onChange}
                className={`w-full border rounded-md p-2 outline-none focus:ring-2 ${
                  errors.contraseña ? "border-red-500" : "border-gray-300 focus:ring-[#59B03C]"
                }`}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility} // Alternar 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Icono del ojito */}
              </button>
            </div>
            {errors.contraseña && <p className="text-red-500 text-sm mt-1">{errors.contraseña}</p>}
          </div>
        )}


          
          {/*Rol*/}
          <div className="mt-4">
            <label className="block font-semibold mb-1">Rol</label>

            <select
              name="rol"
              value={form.rol}
              onChange={onChange}
              className={`w-full border rounded-md p-2 outline-none focus:ring-2 ${
                errors.rol
                  ? "border-red-500"
                  : "border-gray-300 focus:ring-[#59B03C]"
              }`}
            >
              <option value="">Selecciona un rol</option>
              <option value="Administrador">Administrador</option>
              <option value="Empleado">Empleado</option>
            </select>

            {errors.rol && (
              <p className="text-red-500 text-sm mt-1">{errors.rol}</p>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default UsersTable;
