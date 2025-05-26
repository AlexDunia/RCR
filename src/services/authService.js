import axios from 'axios';
import { clearSensitiveData, sanitizeInput, validateEmail } from '@/utils/security';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Configure axios defaults
axios.defaults.withCredentials = true;

// Request interceptor for security
axios.interceptors.request.use(async (config) => {
  // Get CSRF token from meta tag (Laravel sets this)
  const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
  if (token) {
    config.headers['X-CSRF-TOKEN'] = token;
  }

  // Add security headers
  config.headers['X-Requested-With'] = 'XMLHttpRequest';
  config.headers['Accept'] = 'application/json';

  return config;
});

// Response interceptor
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle rate limiting
    if (error.response?.status === 429) {
      const retryAfter = error.response.headers['retry-after'];
      const minutesUntilAvailable = error.response.data.minutes_until_available;
      throw {
        message: `Too many attempts. Please try again in ${minutesUntilAvailable} minutes.`,
        status: 429,
        retryAfter: parseInt(retryAfter)
      };
    }
    return Promise.reject(error);
  }
);

const authService = {
  async initializeAuth() {
    try {
      // Get initial CSRF token and session setup
      await axios.get(`${API_URL}/auth/init`);
    } catch (error) {
      console.error('Auth initialization failed:', error);
      throw this.handleError(error);
    }
  },

  async register(userData) {
    try {
      // Initialize auth first
      await this.initializeAuth();

      // Validate and sanitize input
      const sanitizedData = {
        name: sanitizeInput(userData.name),
        email: sanitizeInput(userData.email),
        password: userData.password, // Don't sanitize password
        password_confirmation: userData.password_confirmation,
        role: userData.role
      };

      const response = await axios.post(`${API_URL}/auth/register`, sanitizedData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  async login(credentials) {
    try {
      // Initialize auth first
      await this.initializeAuth();

      // Validate email
      if (!validateEmail(credentials.email)) {
        throw new Error('Invalid email format');
      }

      const response = await axios.post(`${API_URL}/auth/login`, {
        email: sanitizeInput(credentials.email),
        password: credentials.password,
        device_name: await this.generateFingerprint()
      });

      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  async getCurrentUser() {
    try {
      const response = await axios.get(`${API_URL}/auth/user`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  async verifyToken() {
    try {
      const response = await axios.get(`${API_URL}/auth/verify`);
      return response.data;
    } catch (error) {
      this.logout();
      throw this.handleError(error);
    }
  },

  async logout() {
    try {
      await axios.post(`${API_URL}/auth/logout`, {
        device_id: await this.generateFingerprint()
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      clearSensitiveData();
      window.location.href = '/login';
    }
  },

  async generateFingerprint() {
    const fpData = [
      navigator.userAgent,
      navigator.language,
      screen.width,
      screen.height,
      new Date().getTimezoneOffset(),
      navigator.hardwareConcurrency,
      navigator.platform
    ].join('|');

    const msgBuffer = new TextEncoder().encode(fpData);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  },

  handleError(error) {
    if (error.response) {
      // Handle unauthorized or token expiration
      if (error.response.status === 401) {
        this.logout();
        return {
          status: 401,
          message: 'Session expired. Please login again.'
        };
      }

      // Return the error from the server
      return {
        status: error.response.status,
        message: error.response.data.message || 'An error occurred',
        errors: error.response.data.errors || {}
      };
    }

    // Network or other errors
    return {
      status: 500,
      message: error.message || 'Network error occurred',
      errors: {}
    };
  }
};

export default authService;
