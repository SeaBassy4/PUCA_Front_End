import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getOrdenes = async () => {
  try {
    const response = await axios.get(`${API_URL}/ordenes`);
    return response.data;
  } catch (error) {
    console.error("Error al fetchear ordenes:", error);
    throw error;
  }
};
