import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getDetalleOrdenes = async () => {
  try {
    const response = await axios.get(`${API_URL}/detalle-ordenes`);
    return response.data;
  } catch (error) {
    console.error("Error al fetchear detalles de ordenes:", error);
    throw error;
  }
};

export const postDetalleOrden = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/detalle-ordenes`, data);
    return response.data;
  } catch (error) {
    console.error("Error al crear detalle de orden:", error);
    throw error;
  }
};
