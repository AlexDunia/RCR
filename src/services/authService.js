import axios from '@/utils/axios';
import { sanitizeInput } from '@/utils/validators';

const API_URL = '/api';
const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_DATA_KEY = 'user_data';

// Configure axios defaults
axios.defaults.withCredentials = true;

// Request interceptor for security
axios.interceptors.request.use(async (config) => {
  // Get CSRF token from meta tag (Laravel sets this)
  const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
  if (token) {
    config.headers['X-CSRF-TOKEN'] = token;
  }

  // Add auth token if available
  const authToken = localStorage.getItem(TOKEN_KEY);
  if (authToken) {
    config.headers['Authorization'] = `Bearer ${authToken}`;
  }

  // Add security headers
  config.headers['X-Requested-With'] = 'XMLHttpRequest';
  config.headers['Accept'] = 'application/json';

  return config;
});

// Response interceptor
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
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

    // Handle token expiration
    if (error.response?.status === 401) {
      try {
        // Try to refresh the token
        const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
        if (refreshToken) {
          const response = await axios.post(`${API_URL}/auth/refresh`, {
            refresh_token: refreshToken
          });

          // Update tokens
          const { token, refresh_token } = response.data;
          localStorage.setItem(TOKEN_KEY, token);
          localStorage.setItem(REFRESH_TOKEN_KEY, refresh_token);

          // Retry the original request
          error.config.headers['Authorization'] = `Bearer ${token}`;
          return axios(error.config);
        }
      } catch (refreshError) {
        // If refresh fails, logout
        authService.logout();
      }
    }
    return Promise.reject(error);
  }
);

const authService = {
  /**
   * Initialize authentication and get CSRF cookie
   */
  async initializeAuth() {
    try {
      await axios.get('/sanctum/csrf-cookie');
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
  async login({ email, password, device_name, remember = false }) {
    try {
      // Initialize auth first
      await this.initializeAuth();

      // Sanitize input
      const sanitizedData = {
        email: sanitizeInput(email.toLowerCase()),
        password: password, // Don't sanitize password
        device_name,
        remember
      };

      const response = await axios.post(`${API_URL}/auth/login`, sanitizedData);

      // Store tokens and user data if remember is true
      if (remember && response.data.token) {
        localStorage.setItem(TOKEN_KEY, response.data.token);
        if (response.data.refresh_token) {
          localStorage.setItem(REFRESH_TOKEN_KEY, response.data.refresh_token);
        }
        localStorage.setItem(USER_DATA_KEY, JSON.stringify(response.data.user));
      }

      // Set token in axios headers
      if (response.data.token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
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
      await axios.post(`${API_URL}/auth/logout`);

      // Clear auth header
      delete axios.defaults.headers.common['Authorization'];

      // Clear all stored data
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      localStorage.removeItem(USER_DATA_KEY);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always clear local storage even if logout request fails
      this.clearAuthData();
    }
  },

  /**
   * Clear all authentication data
   */
  clearAuthData() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_DATA_KEY);
    delete axios.defaults.headers.common['Authorization'];
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    return !!localStorage.getItem(TOKEN_KEY);
  },

  /**
   * Get stored user data
   */
  getStoredUserData() {
    const userData = localStorage.getItem(USER_DATA_KEY);
    return userData ? JSON.parse(userData) : null;
  },

  /**
   * Get current authenticated user
   */
  async getCurrentUser() {
    try {
      // First try to get from local storage
      const storedUser = this.getStoredUserData();
      if (storedUser) {
        return storedUser;
      }

      // If not in storage, fetch from API
      const response = await axios.get(`${API_URL}/auth/user`);
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
      const response = await axios.get(`${API_URL}/auth/verify`);
      return response.data.valid;
    } catch (error) {
      return false;
    }
  },

  /**
   * Initialize social login
   * @param {string} provider - Social provider (google, facebook, etc)
   */
  async socialLogin(provider) {
    try {
      const response = await axios.get(`${API_URL}/auth/${provider}/url`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  /**
   * Generate device fingerprint for authentication
   */
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

  /**
   * Handle authentication errors
   */
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
