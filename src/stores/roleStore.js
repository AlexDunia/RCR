import { defineStore } from 'pinia'
import { ref } from 'vue'

/**
 * Role Store - Central source of truth for user roles
 *
 * Uses a fixed role, bypassing localStorage
 */
export const useRoleStore = defineStore('role', () => {
  // IMPORTANT: Fixed role value - change this line to switch roles
  const currentRole = ref('admin'); // Fixed to 'admin' - change to 'agent' when needed

  // Available roles
  const availableRoles = ['admin', 'agent', 'client'];

  // Function to change the current role (in-memory only)
  const setRole = (role) => {
    if (availableRoles.includes(role)) {
      currentRole.value = role;
      console.log(`Role changed to: ${role}`);
    } else {
      console.error(`Role ${role} is not valid. Available roles: ${availableRoles.join(', ')}`)
    }
  };

  // Get current user info
  const getCurrentUser = () => {
    return {
      id: 'user-fixed',
      role: currentRole.value,
      name: currentRole.value === 'admin' ? 'Admin User' : 'Agent User'
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
  setAdmin: () => {
    const store = useRoleStore();
    store.setRole('admin');
    console.log('Role set to admin.');
  },
  setAgent: () => {
    const store = useRoleStore();
    store.setRole('agent');
    console.log('Role set to agent.');
  }
};
