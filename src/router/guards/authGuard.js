import { useAuthStore } from '@/stores/authStore';

export function authGuard(to, from, next) {
  const authStore = useAuthStore();
  const isAuthenticated = authStore.isAuthenticated();
  const userRole = authStore.user?.role;

  // Allow access to routes marked as publicAccess in their meta
  if (to.meta.publicAccess) {
    next();
    return;
  }

  // Public routes that don't require authentication
  const publicRoutes = ['Landing', 'Login', 'Signup', 'NewBuyProperties', 'AllAgents'];

  // If going to a public route, allow it
  if (publicRoutes.includes(to.name)) {
    next();
    return;
  }

  // If not authenticated and trying to access protected route
  if (!isAuthenticated && !publicRoutes.includes(to.name)) {
    // Store the attempted URL for redirect after login
    const loginPath = '/login';
    const redirect = to.fullPath !== '/' ? `?redirect=${to.fullPath}` : '';
    next(`${loginPath}${redirect}`);
    return;
  }

  // If authenticated but trying to access auth pages (login/signup)
  if (isAuthenticated && ['Login', 'Signup'].includes(to.name)) {
    // Redirect to appropriate dashboard based on role
    switch (userRole) {
      case 'agent':
        next('/agent/dashboard');
        break;
      case 'client':
        next('/client/dashboard');
        break;
      case 'admin':
        next('/admin/dashboard');
        break;
      default:
        next('/');
    }
    return;
  }

  // Check if route has role requirements
  if (to.meta.allowedRoles && !to.meta.allowedRoles.includes(userRole)) {
    // Redirect to appropriate dashboard based on role
    switch (userRole) {
      case 'agent':
        next('/agent/dashboard');
        break;
      case 'client':
        next('/client/dashboard');
        break;
      case 'admin':
        next('/admin/dashboard');
        break;
      default:
        next('/');
    }
    return;
  }

  // If all checks pass, proceed to route
  next();
}
