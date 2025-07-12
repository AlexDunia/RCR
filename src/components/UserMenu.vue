<template>
  <div class="user-menu-container">
    <div class="user-menu-trigger" @click="toggleMenu">
      <div class="user-avatar">
        {{ userInitials }}
      </div>
      <div class="user-info">
        <span class="user-name">{{ userName }}</span>
        <span class="user-role">{{ userRole }}</span>
      </div>
      <svg
        class="dropdown-icon"
        :class="{ 'dropdown-icon--open': isOpen }"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </div>

    <!-- Dropdown Menu -->
    <div v-if="isOpen" class="user-menu-dropdown">
      <div class="user-menu-header">
        <div class="user-avatar-large">
          {{ userInitials }}
        </div>
        <div class="user-info-large">
          <span class="user-name-large">{{ userName }}</span>
          <span class="user-email">{{ userEmail }}</span>
        </div>
      </div>

      <div class="menu-items">
        <router-link to="/profile" class="menu-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          Profile
        </router-link>

        <router-link to="/settings" class="menu-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
          Settings
        </router-link>

        <div class="menu-divider"></div>

        <button
          @click="handleLogout"
          class="menu-item menu-item--danger"
          :disabled="isLoading"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          {{ isLoading ? 'Logging out...' : 'Logout' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { useRoleStore } from '@/stores/roleStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const roleStore = useRoleStore();
const router = useRouter();

const isOpen = ref(false);
const isLoading = ref(false);

// User information
const userName = computed(() => authStore.user?.name || 'User');
const userEmail = computed(() => authStore.user?.email || '');
const userRole = computed(() => {
  const role = roleStore.currentRole;
  return role.charAt(0).toUpperCase() + role.slice(1);
});
const userInitials = computed(() => {
  const name = userName.value;
  if (!name) return 'U';
  const parts = name.split(' ');
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
});

// Toggle menu
const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

// Close menu when clicking outside
const closeMenu = (event) => {
  if (!event.target.closest('.user-menu-container')) {
    isOpen.value = false;
  }
};

// Add click outside listener
document.addEventListener('click', closeMenu);
onUnmounted(() => {
  document.removeEventListener('click', closeMenu);
});

// Handle logout
const handleLogout = async () => {
  try {
    // Show loading state
    isLoading.value = true;

    // Call logout from auth service
    await authStore.logout();

    // Clear any additional stored data (like role)
    roleStore.setRole('client'); // Reset to default role

    // Redirect to login page
    router.push('/login');

  } catch (error) {
    console.error('Logout failed:', error);
    // You could add a notification system here to show errors to the user
  } finally {
    isLoading.value = false;
    // Close the dropdown menu
    isOpen.value = false;
  }
};
</script>

<style scoped>
.user-menu-container {
  position: relative;
}

.user-menu-trigger {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 6px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.user-menu-trigger:hover {
  background-color: #f3f4f6;
}

.user-avatar {
  width: 32px;
  height: 32px;
  background-color: #0066cc;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-size: 14px;
  font-weight: 500;
  color: #111827;
}

.user-role {
  font-size: 12px;
  color: #6b7280;
}

.dropdown-icon {
  margin-left: 4px;
  transition: transform 0.2s;
}

.dropdown-icon--open {
  transform: rotate(180deg);
}

.user-menu-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 280px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  padding: 8px 0;
  z-index: 50;
  border: 1px solid #e5e7eb;
}

.user-menu-header {
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid #e5e7eb;
}

.user-avatar-large {
  width: 48px;
  height: 48px;
  background-color: #0066cc;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 18px;
}

.user-info-large {
  display: flex;
  flex-direction: column;
}

.user-name-large {
  font-size: 16px;
  font-weight: 600;
  color: #111827;
}

.user-email {
  font-size: 14px;
  color: #6b7280;
}

.menu-items {
  padding: 8px 0;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  color: #374151;
  text-decoration: none;
  transition: background-color 0.2s;
  font-size: 14px;
  cursor: pointer;
  border: none;
  background: none;
  width: 100%;
  text-align: left;
}

.menu-item:hover {
  background-color: #f3f4f6;
}

.menu-item svg {
  color: #6b7280;
}

.menu-item--danger {
  color: #dc2626;
}

.menu-item--danger svg {
  color: #dc2626;
}

.menu-divider {
  height: 1px;
  background-color: #e5e7eb;
  margin: 8px 0;
}
</style>
