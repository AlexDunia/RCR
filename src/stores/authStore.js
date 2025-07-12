import { defineStore } from 'pinia';
import { ref } from 'vue';
import authService from '@/services/authService';

export const useAuthStore = defineStore('auth', () => {
  const token = ref(sessionStorage.getItem('auth_token') || null);
  const user = ref(null);
  const isInitialized = ref(false);

  // Initialize the auth store
  async function initialize() {
    if (isInitialized.value) return;

    try {
      await authService.initializeAuth();

      if (authService.isAuthenticated()) {
        const userData = await authService.getCurrentUser();
        user.value = userData;
      }
    } catch (error) {
      console.error('Failed to initialize auth store:', error);
      // Clear any invalid auth data
      clearAuth();
    } finally {
      isInitialized.value = true;
    }
  }

  // Set the authentication token
  function setToken(newToken) {
    token.value = newToken;
    if (newToken) {
      sessionStorage.setItem('auth_token', newToken);
    } else {
      sessionStorage.removeItem('auth_token');
    }
  }

  // Set the user data
  function setUser(userData) {
    user.value = userData;
  }

  // Clear authentication data
  function clearAuth() {
    token.value = null;
    user.value = null;
    authService.clearAuthData();
  }

  // Check if user is authenticated
  function isAuthenticated() {
    return !!token.value;
  }

  // Get current user
  function getUser() {
    return user.value;
  }

  // Logout user
  async function logout() {
    try {
      await authService.logout();
      clearAuth();
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  }

  return {
    token,
    user,
    initialize,
    setToken,
    setUser,
    clearAuth,
    isAuthenticated,
    getUser,
    logout
  };
});
