import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getProductos = async () => {
  try {
    const response = await axios.get(`${API_URL}/productos`);
    return response.data;
  } catch (error) {
    console.error("Error al fetchear productos:", error);
    throw error;
  }
};

export const putProducto = async (id, datos) => {
  try {
    const response = await axios.put(`${API_URL}/productos/${id}`, datos);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    throw error;
  }
};

export const postProducto = async (datos) => {
  try {
    const response = await axios.post(`${API_URL}/productos`, datos);
    return response.data;
  } catch (error) {
    console.error("Error al crear producto:", error);
    throw error;
  }
};

export const deleteProducto = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/productos/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    throw error;
  }
};
