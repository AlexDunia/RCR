import axios from '@/utils/axios';
import { sanitizeInput } from '@/utils/validators';

const API_URL = '/api/auth';
const TOKEN_KEY = 'auth_token';
const USER_DATA_KEY = 'user_data';

// Configure axios defaults
axios.defaults.withCredentials = true;

// Request interceptor for API calls
axios.interceptors.request.use(async (config) => {
  // Add auth token if available
  const authToken = sessionStorage.getItem(TOKEN_KEY);
  if (authToken) {
    config.headers['Authorization'] = `Bearer ${authToken}`;
  }

  config.headers['Accept'] = 'application/json';
  config.headers['Content-Type'] = 'application/json';
  return config;
});

// Response interceptor
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Clear auth data and redirect to login
      authService.clearAuthData();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

const authService = {
  /**
   * Initialize authentication
   */
  async initializeAuth() {
    try {
      await axios.get(`${API_URL}/init`);
    } catch (error) {
      console.error('Failed to initialize auth:', error);
      throw error;
    }
  },

  /**
   * Login user
   * @param {Object} credentials - User credentials
   * @returns {Promise} - Response with user data and token
   */
  async login({ email, password }) {
    try {
      const sanitizedData = {
        email: sanitizeInput(email.toLowerCase()),
        password,
        device_name: 'web'
      };

      const response = await axios.post(`${API_URL}/login`, sanitizedData);

      if (response.data.token) {
        sessionStorage.setItem(TOKEN_KEY, response.data.token);
        sessionStorage.setItem(USER_DATA_KEY, JSON.stringify(response.data.user));
      }

      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  /**
   * Register new user
   * @param {Object} userData - User registration data
   * @returns {Promise} - Response with user data and token
   */
  async register({ name, email, password, role }) {
    try {
      const sanitizedData = {
        name: sanitizeInput(name),
        email: sanitizeInput(email.toLowerCase()),
        password,
        role,
        device_name: 'web'
      };

      const response = await axios.post(`${API_URL}/register`, sanitizedData);

      if (response.data.token) {
        sessionStorage.setItem(TOKEN_KEY, response.data.token);
        sessionStorage.setItem(USER_DATA_KEY, JSON.stringify(response.data.user));
      }

      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  /**
   * Logout user
   */
  async logout() {
    try {
      const token = sessionStorage.getItem(TOKEN_KEY);
      if (token) {
        await axios.post(`${API_URL}/logout`);
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.clearAuthData();
    }
  },

  /**
   * Clear all authentication data
   */
  clearAuthData() {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_DATA_KEY);
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    return !!sessionStorage.getItem(TOKEN_KEY);
  },

  /**
   * Get stored user data
   */
  getStoredUserData() {
    const userData = sessionStorage.getItem(USER_DATA_KEY);
    return userData ? JSON.parse(userData) : null;
  },

  /**
   * Get current authenticated user
   */
  async getCurrentUser() {
    try {
      const response = await axios.get(`${API_URL}/user`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  /**
   * Verify authentication token
   */
  async verifyToken() {
    try {
      const response = await axios.get(`${API_URL}/verify`);
      return response.data.valid;
    } catch {
      return false;
    }
  },

  /**
   * Initialize Google OAuth login
   */
  async googleLogin() {
    try {
      const response = await axios.get('/auth/google/url');
      window.location.href = response.data.url;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  /**
   * Handle authentication errors
   */
  handleError(error) {
    if (error.response) {
      switch (error.response.status) {
        case 422:
          return {
            status: 422,
            errors: error.response.data.errors
          };
        case 401:
          this.clearAuthData();
          return {
            status: 401,
            message: 'Invalid credentials'
          };
        case 500:
          return {
            status: 500,
            message: 'An unexpected error occurred. Please try again.'
          };
        default:
          return {
            status: error.response.status,
            message: error.response.data.message || 'An error occurred'
          };
      }
    }
    return {
      status: 0,
      message: 'Network error. Please check your connection.'
    };
  }
};

export default authService;
