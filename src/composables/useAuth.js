import { useRouter } from 'vue-router';
import { useRoleStore } from '@/stores/roleStore';

export function useAuth() {
  const router = useRouter();
  const roleStore = useRoleStore();

  const logout = async () => {
    try {
      // Here you would typically make an API call to your Laravel backend
      // await axios.post('/api/logout');

      // Clear role from store
      roleStore.setRole('all');

      // Clear any stored tokens or user data
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      // Redirect to landing page
      router.push('/landing');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return {
    logout
  };
}
