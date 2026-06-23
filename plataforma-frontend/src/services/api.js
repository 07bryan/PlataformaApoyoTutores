import axios from 'axios';

const api = axios.create({
  // Vite exige el prefijo VITE_ y el uso de import.meta.env
  baseURL: import.meta.env.VITE_APP_API_URL || 'https://plataformaapoyotutores.onrender.com'
});

export default api;