/**
 * Vue directive for conditional rendering based on permissions
 * Usage:
 * - v-can="'permission-name'"
 * - v-can="['permission1', 'permission2']" (requires any of the permissions)
 * - v-can.all="['permission1', 'permission2']" (requires all permissions)
 * - v-can.not="'permission-name'" (negates the permission check)
 */

import { hasPermission, hasAnyPermission, hasAllPermissions } from '@/services/permissionService';
import { useRoleStore } from '@/stores/roleStore';

export default {
  mounted(el, binding) {
    const userRole = getUserRole();
    checkPermission(el, binding, userRole);
  },
  updated(el, binding) {
    const userRole = getUserRole();
    checkPermission(el, binding, userRole);
  }
};

function checkPermission(el, binding, userRole) {
  const { value, modifiers } = binding;
  let hasRequiredPermission = false;

  // Handle array of permissions or single permission
  if (Array.isArray(value)) {
    if (modifiers.all) {
      hasRequiredPermission = hasAllPermissions(value, userRole);
    } else {
      hasRequiredPermission = hasAnyPermission(value, userRole);
    }
  } else {
    hasRequiredPermission = hasPermission(value, userRole);
  }

  // Handle negation
  if (modifiers.not) {
    hasRequiredPermission = !hasRequiredPermission;
  }

  // Toggle element visibility
  if (!hasRequiredPermission) {
    // Store original display value if this is first time hiding
    if (!el.dataset.originalDisplay) {
      el.dataset.originalDisplay = el.style.display;
    }
    el.style.display = 'none';
  } else {
    // Restore original display value if it exists
    const originalDisplay = el.dataset.originalDisplay;
    if (originalDisplay !== undefined) {
      el.style.display = originalDisplay !== 'none' ? originalDisplay : '';
    }
  }
}

// Get the user's role from the roleStore
function getUserRole() {
  // Use the roleStore as the single source of truth
  const roleStore = useRoleStore();
  return roleStore.currentRole;
}
