import axios from "axios";
import { appConfig } from "@/config/app.config";

const api = axios.create({
  baseURL: appConfig.apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para incluir el token en cada petición automáticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;