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

  // Skip permission check if route doesn't specify requiredPermissions or allowedRoles
  if (!to.meta.requiredPermissions && !to.meta.allowedRoles) {
    return next();
  }

  // Layer 1: Check specific role restrictions if defined
  if (to.meta.allowedRoles && Array.isArray(to.meta.allowedRoles)) {
    if (!to.meta.allowedRoles.includes(userRole)) {
      console.error(`Access denied: User role ${userRole} not in allowed roles for ${to.path}`);
      return next({ name: 'Unauthorized', query: { redirect: to.fullPath, reason: 'role' } });
    }
  }

  // Layer 2: Check permissions
  if (to.meta.requiredPermissions) {
    const requiredPermissions = to.meta.requiredPermissions;
    const hasRequiredPermission = Array.isArray(requiredPermissions)
      ? requiredPermissions.some(permission => hasPermission(permission, userRole))
      : hasPermission(requiredPermissions, userRole);

    if (!hasRequiredPermission) {
      console.error(`Access denied: User lacks required permissions for ${to.path}`);
      return next({ name: 'Unauthorized', query: { redirect: to.fullPath, reason: 'permission' } });
    }
  }

  // Layer 3: Special protection for sensitive routes
  if (to.path.includes('/marketing-tools/create')) {
    if (userRole !== 'admin' || !hasPermission('create-marketing-plans', userRole)) {
      console.error(`Security breach attempt: Unauthorized access to ${to.path}`);
      return next({ name: 'Unauthorized', query: { redirect: to.fullPath, reason: 'security' } });
    }
  }

  // All checks passed, allow access
  next();
}
