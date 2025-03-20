// src/auth/useAuth.js
import { ref, computed, reactive } from 'vue';
import axios from 'axios';

// Base API URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Create a reactive state that will be shared across all instances
const state = reactive({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null
});

/**
 * Custom hook for authentication state and operations
 */
export function useAuth() {
  /**
   * Initialize auth by checking for existing session
   */
  const initialize = async () => {
    state.isLoading = true;
    state.error = null;

    try {
      const token = localStorage.getItem('auth_token');

      if (token) {
        // Set default auth header
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // Verify token and get user data
        const response = await axios.get(`${API_URL}/auth/me`);

        state.user = response.data;
        state.isAuthenticated = true;
      } else {
        // No token found
        state.user = null;
        state.isAuthenticated = false;
      }
    } catch (error) {
      console.error('Authentication error:', error);
      state.error = 'Session expired or invalid';
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('auth_token');
      delete axios.defaults.headers.common['Authorization'];
    } finally {
      state.isLoading = false;
    }
  };

  /**
   * Login with email and password
   */
  const login = async (email, password) => {
    state.isLoading = true;
    state.error = null;

    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
      });

      const { token, user } = response.data;

      // Store token and set auth header
      localStorage.setItem('auth_token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Update state
      state.user = user;
      state.isAuthenticated = true;

      return user;
    } catch (error) {
      console.error('Login error:', error);
      state.error = error.response?.data?.message || 'Login failed';
      throw error;
    } finally {
      state.isLoading = false;
    }
  };

  /**
   * Logout the current user
   */
  const logout = async () => {
    state.isLoading = true;

    try {
      // Call logout endpoint
      await axios.post(`${API_URL}/auth/logout`);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local storage and auth header
      localStorage.removeItem('auth_token');
      delete axios.defaults.headers.common['Authorization'];

      // Update state
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    }
  };

  /**
   * Register a new user
   */
  const register = async (userData) => {
    state.isLoading = true;
    state.error = null;

    try {
      const response = await axios.post(`${API_URL}/auth/register`, userData);

      const { token, user } = response.data;

      // Store token and set auth header
      localStorage.setItem('auth_token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Update state
      state.user = user;
      state.isAuthenticated = true;

      return user;
    } catch (error) {
      console.error('Registration error:', error);
      state.error = error.response?.data?.message || 'Registration failed';
      throw error;
    } finally {
      state.isLoading = false;
    }
  };

  // User role helpers
  const isAdmin = computed(() => state.user?.role === 'admin');
  const isAgent = computed(() => state.user?.role === 'agent');

  return {
    // State
    user: computed(() => state.user),
    isAuthenticated: computed(() => state.isAuthenticated),
    isLoading: computed(() => state.isLoading),
    error: computed(() => state.error),

    // Role checks
    isAdmin,
    isAgent,

    // Methods
    initialize,
    login,
    logout,
    register
  };
}
