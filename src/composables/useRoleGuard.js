// Role guard composable for handling role-based access control
import { ref } from 'vue'

// Simulated user role - in production, this would come from your auth system
const currentRole = ref('agent')

export function useRoleGuard() {
  const checkAccess = async (allowedRoles) => {
    // In production, this would make an API call to verify the user's role
    // For now, we'll just check against our simulated role
    return allowedRoles.includes(currentRole.value)
  }

  return {
    checkAccess,
    currentRole
  }
}
