// src/api/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://127.0.0.1:8000',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  withCredentials: true // For Sanctum CSRF
});

instance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 419:
          await instance.get('/sanctum/csrf-cookie');
          return instance(error.config);
        case 401:
          sessionStorage.removeItem('auth_token');
          break;
        case 403:
          console.error('Access forbidden');
          break;
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
