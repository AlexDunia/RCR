import { useAuthStore } from '@/stores/authStore';
import { useRoleStore } from '@/stores/roleStore';

export function authGuard(to, from, next) {
  const authStore = useAuthStore();
  const roleStore = useRoleStore();
  const isAuthenticated = authStore.isLoggedIn;
  const userRole = authStore.userRole;

  // Public routes that don't require authentication
  const publicRoutes = ['Landing', 'Login', 'Signup', 'NewBuyProperties', 'AllAgents'];

  if (publicRoutes.includes(to.name)) {
    next();
    return;
  }

  // Check if user is authenticated
  if (!isAuthenticated) {
    next('/login');
    return;
  }

  // Check if route has role requirements
  if (to.meta.allowedRoles && !to.meta.allowedRoles.includes(userRole)) {
    // Redirect to appropriate dashboard based on role
    switch (userRole) {
      case 'agent':
        next('/agent-dashboard');
        break;
      case 'client':
        next('/client-dashboard');
        break;
      default:
        next('/');
    }
    return;
  }

  // If all checks pass, proceed to route
  next();
}
