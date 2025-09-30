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
