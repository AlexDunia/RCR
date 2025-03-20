// src/auth/roleChecks.js
import { computed } from 'vue';
import { useAuth } from './useAuth';

/**
 * Checks if the user has at least one of the required roles
 * @param {Array} roles - Array of roles to check
 * @returns {Function} Function that returns boolean indicating if user has required role
 */
export function useHasRole(roles) {
  const { user } = useAuth();

  return computed(() => {
    if (!user.value) return false;
    if (!roles || roles.length === 0) return true;

    return roles.includes(user.value.role);
  });
}

/**
 * Check if a route is accessible by the current user
 * @param {Object} route - Route object
 * @returns {Boolean} Whether user can access the route
 */
export function canAccessRoute(route) {
  const { isAuthenticated, user } = useAuth();

  // If route doesn't require auth, allow access
  if (!route.meta?.requiresAuth) {
    return true;
  }

  // If route requires auth but user is not authenticated, deny access
  if (route.meta?.requiresAuth && !isAuthenticated.value) {
    return false;
  }

  // If route requires specific roles, check them
  if (route.meta?.roles && route.meta.roles.length > 0) {
    if (!user.value) return false;
    return route.meta.roles.includes(user.value.role);
  }

  // If authenticated and no specific roles required, allow access
  return true;
}

/**
 * Navigation guard for Vue Router
 * @param {Object} router - Vue Router instance
 */
export function setupAuthGuard(router) {
  router.beforeEach((to, from, next) => {
    const { isAuthenticated, user } = useAuth();

    // Public route, allow access
    if (!to.meta?.requiresAuth) {
      return next();
    }

    // Route requires auth but user is not authenticated, redirect to login
    if (to.meta?.requiresAuth && !isAuthenticated.value) {
      return next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
    }

    // Check for required roles
    if (to.meta?.roles && to.meta.roles.length > 0) {
      if (!user.value || !to.meta.roles.includes(user.value.role)) {
        // Redirect to forbidden page or dashboard
        return next({ path: '/forbidden' });
      }
    }

    // User has necessary permissions, allow access
    return next();
  });
}
