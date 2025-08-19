import { defineStore } from 'pinia';
import { ref } from 'vue';
import authService from '@/services/authService';

export const useAuthStore = defineStore('auth', () => {
  const token = ref(sessionStorage.getItem('auth_token') || null);
  const user = ref(null);

  function setToken(newToken) {
    token.value = newToken;
    if (newToken) {
      sessionStorage.setItem('auth_token', newToken);
    } else {
      sessionStorage.removeItem('auth_token');
    }
  }

  function setUser(userData) {
    user.value = userData;
    if (userData && userData.role) {
      localStorage.setItem('userRole', userData.role);
    } else {
      localStorage.removeItem('userRole');
    }
  }

  function isAuthenticated() {
    return !!token.value;
  }

  async function initialize() {
    try {
      const userData = await authService.initializeAuth();
      if (userData) {
        setUser(userData);
      }
      return userData;
    } catch (error) {
      console.error('Auth initialization failed:', error);
      throw error;
    }
  }

  async function logout() {
    try {
      await authService.logout();
      setToken(null);
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  return { token, user, setToken, setUser, isAuthenticated, initialize, logout };
});