import { defineStore } from 'pinia'
import { ref } from 'vue'

const useRoleStore = defineStore('role', () => {
  // Default role set to 'admin'
  const currentRole = ref('admin')

  // Available roles - fixed to include admin
  const availableRoles = ['admin', 'agent', 'client']

  // Function to change the current role
  const setRole = (role) => {
    if (availableRoles.includes(role)) {
      currentRole.value = role
    } else {
      console.error(`Role ${role} is not valid. Available roles: ${availableRoles.join(', ')}`)
    }
  }

  return {
    currentRole,
    availableRoles,
    setRole
  }
})

export { useRoleStore }
