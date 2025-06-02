import { defineStore } from 'pinia';
import axiosInstance from '@/utils/axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('auth_token'),
    isAuthenticated: false
  }),

  getters: {
    getUser: (state) => state.user,
    isLoggedIn: (state) => state.isAuthenticated,
    userRole: (state) => state.user?.role
  },

  actions: {
    setUser(user) {
      this.user = user;
      this.isAuthenticated = true;
    },

    setToken(token) {
      this.token = token;
      localStorage.setItem('auth_token', token);
    },

    async fetchUser() {
      try {
        const response = await axiosInstance.get('/api/user');
        this.setUser(response.data);
        return response.data;
      } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
      }
    },

    async logout() {
      try {
        await axiosInstance.post('/api/auth/logout');
      } catch (error) {
        console.error('Error during logout:', error);
      } finally {
        this.user = null;
        this.isAuthenticated = false;
        this.token = null;
        localStorage.removeItem('auth_token');
      }
    },

    checkAuth() {
      const token = localStorage.getItem('auth_token');
      if (token) {
        this.token = token;
        this.isAuthenticated = true;
        return true;
      }
      return false;
    }
  }
});
