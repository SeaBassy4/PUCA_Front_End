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

export const postOrden = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/ordenes`, data);
    return response.data;
  } catch (error) {
    console.error("Error al crear orden:", error);
    throw error;
  }
};

export const putOrden = async (id, datos) => {
  try {
    const response = await axios.put(`${API_URL}/ordenes/${id}`, datos);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar orden:", error);
    throw error;
  }
};
