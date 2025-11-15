
import React, { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { getUsuarios } from '../services/usuario.service'
import { useAuth } from '../context/AuthContext.jsx'
import {toast} from 'react-toastify'

const LoginPage = () => {
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const navigate = useNavigate();
  const { user, login } = useAuth();

  console.log("Estado actual del user:", user);

  if (user) {
     console.log("Usuario detectado, redirigiendo...", user); // DEBUG
    if (user.rol === "Administrador") {
      return <Navigate to="/productos" replace />;
    } else {
      return <Navigate to="/ordenes" replace />;
    }
  }


  const iniciarSesion = async (e) => {

    

    e.preventDefault();
    try {
      console.log("Intentando iniciar sesión con:", { correo }); // DEBUG
      const usuarios = await getUsuarios();
      console.log("Usuarios obtenidos:", usuarios); // DEBUG
      const usuarioEncontrado = usuarios.find(
        (u) => u.correo === correo && u.contraseña === contraseña
      );

      console.log("Usuario encontrado:", usuarioEncontrado); // DEBUG

      if (!usuarioEncontrado) {
        toast.error("Por favor, completa todos los campos");
        return;
      }
      if (!usuarioEncontrado.activo) {
        toast.error("Usuario inactivo. Contacta al administrador.");
        return;
      }

      console.log("Iniciando sesión para:", usuarioEncontrado.nombre, usuarioEncontrado.rol); // DEBUG

      login(usuarioEncontrado.nombre, usuarioEncontrado.rol);

      setTimeout(() => {
      if (usuarioEncontrado.rol === "Administrador") {
        navigate("/productos", { replace: true });
      } else {
        navigate("/ordenes", { replace: true });
      }
    }, 100);
    } catch (error) {
      console.error("Error al iniciar sesión" , error);
      alert("Error al iniciar sesión");
    } 
  };
  return (
    <main className='min-w-full min-h-screen bg-white overflow-hidden justify-center items-center flex'>
      <div className='w-1/3 h-screen'>
        <img className='h-full' src="./imgs/login.png" alt="Cafecito" />
      </div>

      <div className='w-2/3 h-screen flex justify-center items-center bg-gray-100'>
        <div className='w-[475px] h-[90%] border border-gray-300 rounded-md flex items-center flex-col bg-white'>

          <div className='h-1/6 w-full items-center justify-center flex flex-col'>
            <h1 className='font-bold text-3xl'>Cafetería “Bendita Patria”</h1>
          </div>

          {/* Contenedor principal centrado */}
          <form onSubmit={iniciarSesion} className='w-full h-2/3 flex flex-col items-center justify-center gap-4'>

            {/* Contenedor de formulario centrado */}
            <div className='w-full flex flex-col items-center'>
              <div className='w-[80%]'>
                <label className='block font-bold text-2xl mb-2'>Correo Electrónico</label>
                <input className='border border-gray-300 w-full rounded-sm p-1 mb-5' type="text" name="correo" id="correo" value={correo} onChange={(e) => setCorreo(e.target.value)} />
              </div>

              <div className='w-[80%]'>
                <label className='block font-bold text-2xl mb-2'>Contraseña</label>
                <input className='border border-gray-300 w-full rounded-sm p-1 mb-8' type="password" name='contra' id='contra' value={contraseña} onChange={(e) => setContraseña(e.target.value)} />
              </div>

              <div className='w-[80%]'>
                <button type='submit' className='bg-[#59B03C] text-white font-semibold w-full rounded-[10px] p-2'>Iniciar Sesión</button>
              </div>
              
            </div>

          </form>
        </div>
      </div>
    </main>
  )
}

export default LoginPage