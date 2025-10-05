import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getCategorias = async () => {
  try {
    const response = await axios.get(`${API_URL}/categorias`);
    return response.data;
  } catch (error) {
    console.error("Error al fetchear categorias:", error);
    throw error;
  }
};

export const postCategoria = async (datos) => {
  try {
    const response = await axios.post(`${API_URL}/categorias`, datos);
    return response.data;
  } catch (error) {
    console.error("Error al crear categoria:", error);
    throw error;
  }
};

export const putCategoria = async (id, datos) => {
  try {
    const response = await axios.put(`${API_URL}/categorias/${id}`, datos);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar categoria:", error);
    throw error;
  }
};

export const deleteCategoria = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/categorias/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar categoria:", error);
    throw error;
  }
};
