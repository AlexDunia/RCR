import axios from 'axios';

const TOKEN_KEY = 'auth_token';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  withCredentials: true
});

// Request interceptor for API calls
axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response) {
      // Handle specific error cases
      switch (error.response.status) {
        case 419: // CSRF token mismatch
          await axiosInstance.get('/sanctum/csrf-cookie');
          return axiosInstance(error.config);
        case 401: // Unauthorized
          // Only remove token, let the auth store handle the redirect
          sessionStorage.removeItem(TOKEN_KEY);
          break;
        case 403: // Forbidden
          console.error('Access forbidden');
          break;
      }
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
