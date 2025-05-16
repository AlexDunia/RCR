import { defineStore } from 'pinia'
import { ref } from 'vue'

/**
 * Role Store - Central source of truth for user roles
 *
 * Now uses localStorage to persist role between reloads
 */
export const useRoleStore = defineStore('role', () => {
  // Get role from localStorage or default to 'all'
  const storedRole = localStorage.getItem('userRole');
  const currentRole = ref(storedRole && ['admin', 'agent', 'client', 'all'].includes(storedRole) ? storedRole : 'all');

  // Available roles
  const availableRoles = ['admin', 'agent', 'client', 'all'];

  // Function to change the current role and save to localStorage
  const setRole = (role) => {
    // Validate that the role is allowed
    if (!availableRoles.includes(role)) {
      console.error(`Role ${role} is not valid. Available roles: ${availableRoles.join(', ')}`)
      return false;
    }

    // Valid role, proceed with change
    currentRole.value = role;
    localStorage.setItem('userRole', role);

    // Set a flag to indicate images need to be reloaded
    localStorage.setItem('imagesNeedRefresh', 'true');

    console.log(`Role changed to: ${role}`);
    return true;
  };

  // Get current user info
  const getCurrentUser = () => {
    return {
      id: 'user-fixed',
      role: currentRole.value,
      name: currentRole.value === 'admin' ? 'Admin User' :
            currentRole.value === 'agent' ? 'Agent User' :
            currentRole.value === 'client' ? 'Client User' : 'User'
    };
  };

  return {
    currentRole,
    availableRoles,
    setRole,
    getCurrentUser
  }
});

// Simple utility for changing roles directly
export const roleUtil = {
  setAll: () => {
    const store = useRoleStore();
    store.setRole('all');
    console.log('Role set to all.');
  },
  setAdmin: () => {
    const store = useRoleStore();
    store.setRole('admin');
    console.log('Role set to admin.');
  },
  setAgent: () => {
    const store = useRoleStore();
    store.setRole('agent');
    console.log('Role set to agent.');
  },
  setClient: () => {
    const store = useRoleStore();
    store.setRole('client');
    console.log('Role set to client.');
  }
};
