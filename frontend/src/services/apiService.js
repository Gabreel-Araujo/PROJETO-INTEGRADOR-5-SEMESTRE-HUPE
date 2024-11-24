import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth interceptor to add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Error interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// User endpoints
export const userAPI = {
  register: (data) => api.post('/users', data),
  login: (data) => api.post('/users/login', data),
  getAll: () => api.get('/users'),
  getById: (id) => api.get(`/users/${id}`),
  update: (id, data) => api.put(`/users/${id}`, data),
  delete: (id) => api.delete(`/users/${id}`),
};

// Customer endpoints
export const customerAPI = {
  create: (data) => api.post('/customers', data),
  getAll: () => api.get('/customers'),
  getById: (id) => api.get(`/customers/${id}`),
  update: (id, data) => api.put(`/customers/${id}`, data),
  delete: (id) => api.delete(`/customers/${id}`),
};

// Entrepreneur endpoints
export const entrepreneurAPI = {
  create: (data) => api.post('/entrepreneurs', data),
  getAll: () => api.get('/entrepreneurs'),
  getById: (id) => api.get(`/entrepreneurs/${id}`),
  update: (id, data) => api.put(`/entrepreneurs/${id}`, data),
  delete: (id) => api.delete(`/entrepreneurs/${id}`),
};

// Menu endpoints
export const menuAPI = {
  create: (data) => api.post('/menu', data),
  getAll: () => api.get('/menu'),
  getById: (id) => api.get(`/menu/${id}`),
  update: (id, data) => api.put(`/menu/${id}`, data),
  delete: (id) => api.delete(`/menu/${id}`),
};

// Product endpoints
export const productAPI = {
  create: (data) => api.post('/products', data),
  getAll: (entrepreneurId) => api.get('/products', { params: { entrepreneurId } }),
  getById: (id) => api.get(`/products/${id}`),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`),
};

// Order endpoints
export const orderAPI = {
  create: (data) => api.post('/orders', data),
  getAll: () => api.get('/orders'),
  getById: (id) => api.get(`/orders/${id}`),
  update: (id, data) => api.put(`/orders/${id}`, data),
  delete: (id) => api.delete(`/orders/${id}`),
};

export default api;
