import { defineStore } from 'pinia';
import axiosInstance from '@/utils/axios';
import { useRoleStore } from '@/stores/roleStore';

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
//   .help-section__gradient-box[data-v-f0577048] {
//     color: #0052a5;
//     border-radius: 18px;
//     min-width: 420px;
//     display: flex
// ;
//     flex-direction: column;
//     height: 320px;
//     box-shadow: 0 2px 8px rgba(0, 82, 165, 0.08);
// }

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
        // Clear all auth data first
        this.user = null;
        this.isAuthenticated = false;
        this.token = null;
        localStorage.removeItem('auth_token');
        localStorage.removeItem('remember_token');
        localStorage.removeItem('user_data');

        // Clear role data
        const roleStore = useRoleStore();
        roleStore.setRole('all');

        // Try to call logout endpoint if available
        try {
          await axiosInstance.post('/api/auth/logout');
        } catch (error) {
          console.error('Error during logout API call:', error);
          // Continue with local logout even if API call fails
        }

        // Force navigation to landing page with correct base URL
        window.location.href = '/RCR/landing';

      } catch (error) {
        console.error('Error during logout:', error);
        throw error;
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
