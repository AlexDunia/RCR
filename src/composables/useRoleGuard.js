// Role guard composable for handling role-based access control
import { useRoleStore } from '@/stores/roleStore'

export function useRoleGuard() {
  const roleStore = useRoleStore()

  const checkAccess = async (allowedRoles) => {
    // In production, this would make an API call to verify the user's role
    // For now, we'll just check against our store role
    return allowedRoles.includes(roleStore.currentRole)
  }

  return {
    checkAccess,
    currentRole: roleStore.currentRole,
    availableRoles: roleStore.availableRoles,
    setRole: roleStore.setRole
  }
}