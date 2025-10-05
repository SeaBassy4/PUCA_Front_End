import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getTamaños = async () => {
  try {
    const response = await axios.get(`${API_URL}/tamanos`);
    return response.data;
  } catch (error) {
    console.error("Error al fetchear tamaños:", error);
    throw error;
  }
};

export const postTamaño = async (datos) => {
  try {
    const response = await axios.post(`${API_URL}/tamanos`, datos);
    return response.data;
  } catch (error) {
    console.error("Error al crear tamaño:", error);
    throw error;
  }
};

export const putTamaño = async (id, datos) => {
  try {
    const response = await axios.put(`${API_URL}/tamanos/${id}`, datos);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar tamaño:", error);
    throw error;
  }
};

export const deleteTamaño = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/tamanos/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar tamaño:", error);
    throw error;
  }
};
