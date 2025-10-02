

import axios from "axios"; //Axios para hacer peticiones por http, Get, Post, etc


const API = import.meta.env.VITE_API_URL; 

export const obtenerUsuarios = async () => {         
  const { data } = await axios.get(`${API}/usuarios`); //Consultar todos los users
  console.log("API =>", API);

  return data;
};

export const crearUsuario = async (usuario) => {      
  const { data } = await axios.post(`${API}/usuarios`, usuario);
  return data;
};

export const actualizarUsuario = async (id, usuario) => {
  const { data } = await axios.put(`${API}/usuarios/${id}`, usuario); //put actualiza el usuario existente
  return data;
};

export const deletearUsuario = async (id) => {
  const { data } = await axios.delete(`${API}/usuarios/${id}`); //Mediante URL
  return data;
};
