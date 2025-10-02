import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getUsuarios = async () => {
  try {
    const response = await axios.get(`${API_URL}/usuarios`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    throw error;
  }
};

export const postUsuario = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/usuarios`, data);
    return response.data;
  } catch (error) {
    console.error("Error al crear usuario:", error);
    throw error;
  }
};

export const putUsuario = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/usuarios/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    throw error;
  }
};

export const deleteUsuario = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/usuarios/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    throw error;
  }
};
