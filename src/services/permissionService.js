/**
 * Permission Service
 * Manages role-based permissions throughout the application
 */
import { useRoleStore } from '@/stores/roleStore';

// Permission definitions with descriptions
export const PERMISSIONS = {
  // Marketing Plans
  'view-marketing-plans': 'View all marketing plans',
  'create-marketing-plans': 'Create new marketing plans',
  'edit-marketing-plans': 'Edit existing marketing plans',
  'delete-marketing-plans': 'Delete marketing plans',

  // Checklists
  'view-checklists': 'View all checklists',
  'create-checklists': 'Create new checklists',
  'edit-checklists': 'Edit existing checklists',
  'delete-checklists': 'Delete checklists',

  // Social Media
  'view-social-posts': 'View social media posts',
  'create-social-posts': 'Create social media posts',
  'edit-social-posts': 'Edit social media posts',
  'delete-social-posts': 'Delete social media posts',
  'view-social-insights': 'View social media analytics',
  'access-social-profiles': 'Access social media profiles', // Only for agents

  // Templates
  'view-templates': 'View marketing templates',
  'create-templates': 'Create custom templates',
  'edit-templates': 'Edit templates'
};

// Role definitions with assigned permissions
export const ROLE_PERMISSIONS = {
  'admin': [
    'view-marketing-plans',
    'create-marketing-plans',
    'edit-marketing-plans',
    'delete-marketing-plans',
    'view-checklists',
    'create-checklists',
    'edit-checklists',
    'delete-checklists',
    'view-social-posts',
    'create-social-posts',
    'edit-social-posts',
    'delete-social-posts',
    'view-social-insights',
    // Note: 'access-social-profiles' is NOT included for admin
    'view-templates',
    'create-templates',
    'edit-templates'
  ],
  'agent': [
    'view-marketing-plans',
    'view-checklists',
    'create-checklists',
    'edit-checklists',
    'delete-checklists',
    'view-social-posts',
    'create-social-posts',
    'edit-social-posts',
    'delete-social-posts',
    'view-social-insights',
    'access-social-profiles',
    'view-templates',
    'create-templates',
    'edit-templates'
  ]
};

/**
 * Check if a user has a specific permission
 * @param {string} permission - The permission to check
 * @param {string} [userRole] - Optional user role override
 * @returns {boolean} True if the user has the permission
 */
export function hasPermission(permission, userRole) {
  // If userRole is provided, use it; otherwise get from roleStore
  const role = userRole || useRoleStore().currentRole;

  if (!role || !ROLE_PERMISSIONS[role]) {
    return false;
  }

  return ROLE_PERMISSIONS[role].includes(permission);
}

/**
 * Get all permissions for a user role
 * @param {string} [userRole] - Optional user role override
 * @returns {string[]} Array of permissions
 */
export function getUserPermissions(userRole) {
  // If userRole is provided, use it; otherwise get from roleStore
  const role = userRole || useRoleStore().currentRole;
  return ROLE_PERMISSIONS[role] || [];
}

/**
 * Check if user has any of the given permissions
 * @param {string[]} permissions - Array of permissions to check
 * @param {string} [userRole] - Optional user role override
 * @returns {boolean} True if the user has any of the permissions
 */
export function hasAnyPermission(permissions, userRole) {
  return permissions.some(permission => hasPermission(permission, userRole));
}

/**
 * Check if user has all of the given permissions
 * @param {string[]} permissions - Array of permissions to check
 * @param {string} [userRole] - Optional user role override
 * @returns {boolean} True if the user has all of the permissions
 */
export function hasAllPermissions(permissions, userRole) {
  return permissions.every(permission => hasPermission(permission, userRole));
}

export default {
  hasPermission,
  getUserPermissions,
  hasAnyPermission,
  hasAllPermissions,
  PERMISSIONS,
  ROLE_PERMISSIONS
};
