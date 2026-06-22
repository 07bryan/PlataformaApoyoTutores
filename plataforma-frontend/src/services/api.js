import api from '../services/api';

const api = api.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080'
});

export default api;