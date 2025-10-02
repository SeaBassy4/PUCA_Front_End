import React, { useEffect, useState } from "react";
import SearchBox from "../components/SearchBox";
import Modal from "../components/Modal";
import { obtenerUsuarios, crearUsuario, actualizarUsuario, deletearUsuario } from "../services/usuario.service";






const UsersTable = () => {
  const [usuarios, setUsuarios] = useState([]); //array dinamico, almacena la lista del backend
  const [search, setSearch] = useState("");

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
  }, [action, selectedUser]);

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

  const handleConfirm = async () => {
  try {
    if (action === "add"){
      await crearUsuario(form);   //llamada al post del usuario.service.js

    }else if (action === "edit" && selectedUser)  {

    
      await actualizarUsuario (selectedUser._id, form); //put

    }
    const updatedList = await obtenerUsuarios(); //refresh a la tabla
    setUsuarios(updatedList);
    setShowModal(false);

    }catch (err){
      console.error("Peto el guardar usuario", err)
      
    }

  };

  const handleDelete = async (id) => {
  if (!window.confirm("¿Estas completamente eguro que quieres eliminar este usuario?")) return;
  try {
    await deletearUsuario(id); //delete
    setUsuarios((prev) => prev.filter((u) => u._id !== id));
  } catch (err) {
    console.error("Peto:", err);
    
  }
};


  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Barra superior */}
      <div className="w-[90%] mt-4 flex items-center gap-3">
        <h2 className="text-xl font-bold">Usuarios del Sistema</h2>

        <div className="flex-1 flex">
          <div className="w-[300px]">
            <SearchBox value={search} onChange={(e) => setSearch(e.target.value)} />
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
        <div className="overflow-x-auto">
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
                <tr key={u._id} className="border-t hover:bg-gray-100 transition">
                  <td className="p-3">{u.nombre}</td>
                  <td className="p-3">{u.celular}</td>
                  <td className="p-3">{u.correo}</td>
                  <td className="p-3">{u.contraseña}</td>
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
            Aquí podrá {action === "add" ? "añadir un nuevo usuario a su sistema, ya sea empleado o administrador" : "editar la información del usuario seleccionado"}.
          </p>

          {/*Fila Nombre / Celular (dos columnas)*/}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">Nombre</label>
              <input
                name="nombre"
                value={form.nombre}
                onChange={onChange}
                className="w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-[#59B03C]"
                placeholder=""
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Celular</label>
              <input
                name="celular"
                value={form.celular}
                onChange={onChange}
                className="w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-[#59B03C]"
                placeholder=""
              />
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
              className="w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-[#59B03C]"
              placeholder=""
            />
          </div>

          
          <div className="mt-4">
            <label className="block font-semibold mb-1">Contraseña Inicial</label>
            <p className="text-sm text-gray-600 mb-2">
              Esta contraseña servirá para iniciar sesión la primera vez, el usuario deberá cambiarla al entrar
            </p>
            <input
              type="password"
              name="contraseña"
              value={form.contraseña}
              onChange={onChange}
              className="w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-[#59B03C]"
              placeholder=""
            />
          </div>

          {/*Rol*/}
          <div className="mt-4">
            <label className="block font-semibold mb-1">Rol</label>
            
            <input
              name="rol"
              value={form.rol}
              onChange={onChange}
              className="w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-[#59B03C]"
              placeholder=""
            />

          </div>

        </Modal>
      )}
    </div>
  );
};

export default UsersTable;
