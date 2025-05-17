/**
 * Router guard to check permissions before navigation
 */
import { hasPermission } from '@/services/permissionService';
import { useRoleStore } from '@/stores/roleStore';

/**
 * Permission guard for Vue Router
 * Checks if the user has the required permissions to access a route
 * Implements multiple security layers for protection
 *
 * @param {Object} to - The target route object being navigated to
 * @param {Object} from - The current route being navigated away from
 * @param {Function} next - Function to resolve the hook
 */
export default function permissionGuard(to, from, next) {
  const roleStore = useRoleStore();
  const userRole = roleStore.currentRole;

  // Allow access to public routes regardless of role
  if (to.meta.publicAccess || to.path === '/landing') {
    return next();
  }

  // If role is 'all', only allow access to landing and public routes
  if (userRole === 'all' && !to.meta.publicAccess) {
    return next('/landing');
  }

  // Skip permission check if no permissions are required
  if (!to.meta.requiredPermissions && !to.meta.allowedRoles) {
    return next();
  }

  // Check if user has required role
  if (to.meta.allowedRoles && !to.meta.allowedRoles.includes(userRole)) {
    return next({
      path: '/unauthorized',
      query: {
        redirect: to.fullPath,
        reason: 'role'
      }
    });
  }

  // Check if user has required permissions
  if (to.meta.requiredPermissions) {
    const hasRequiredPermission = to.meta.requiredPermissions.every(permission =>
      hasPermission(permission)
    );

    if (!hasRequiredPermission) {
      return next({
        path: '/unauthorized',
        query: {
          redirect: to.fullPath,
          reason: 'permission'
        }
      });
    }
  }

  // If all checks pass, proceed with navigation
  next();
}
