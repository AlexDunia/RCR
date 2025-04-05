import { computed } from 'vue';
import { hasPermission, hasAnyPermission, hasAllPermissions, getUserPermissions } from '@/services/permissionService';
import { useRoleStore } from '@/stores/roleStore';

/**
 * Composable for checking permissions in components
 * @param {Function} getUserRoleFunc - Optional function that returns the current user role
 * @returns {Object} Permission check functions
 */
export function usePermission(getUserRoleFunc) {
  // Default implementation uses roleStore if no function is provided
  const getRoleFunc = getUserRoleFunc || (() => {
    const roleStore = useRoleStore();
    return roleStore.currentRole;
  });

  // Get the current user role
  const role = computed(() => getRoleFunc());

  // Check if the user has a specific permission
  const can = (permission) => {
    return hasPermission(permission, role.value);
  };

  // Check if the user has any of the given permissions
  const canAny = (permissions) => {
    return hasAnyPermission(permissions, role.value);
  };

  // Check if the user has all of the given permissions
  const canAll = (permissions) => {
    return hasAllPermissions(permissions, role.value);
  };

  // Get all permissions for the current user
  const permissions = computed(() => {
    return getUserPermissions(role.value);
  });

  // Check if the user is an admin
  const isAdmin = computed(() => {
    return role.value === 'admin';
  });

  // Check if the user is an agent
  const isAgent = computed(() => {
    return role.value === 'agent';
  });

  return {
    can,
    canAny,
    canAll,
    permissions,
    role,
    isAdmin,
    isAgent
  };
}
