<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useNavigationStore } from '@/stores/navigation';
import { useRoleStore } from '@/stores/roleStore';

const route = useRoute();
const router = useRouter();
const navigationStore = useNavigationStore();
const roleStore = useRoleStore();
const activeMenu = ref('');

// Function to determine which menu item should be active based on the current route
const getActiveMenuFromPath = (path) => {
  // Sanitize path input
  const sanitizedPath = path.replace(/[^a-zA-Z0-9-/]/g, '');

  // Remove /RCR prefix if it exists
  const normalizedPath = sanitizedPath.replace('/RCR', '');

<<<<<<< Updated upstream:src/components/SidebarView.vue
  // Use strict equality comparison
  if (normalizedPath === '/') return 'dashboard';
  if (normalizedPath.startsWith('/tasks')) return 'tasks';
  if (normalizedPath.startsWith('/completed-tasks')) return 'tasks';
  if (normalizedPath.startsWith('/manage-listings') ||
      normalizedPath.startsWith('/add-listing') ||
      normalizedPath.startsWith('/view-listings') ||
      normalizedPath.startsWith('/pending-approvals') ||
      normalizedPath.startsWith('/drafts')) return 'manage-listing';
  if (normalizedPath.startsWith('/education-training')) return 'education-training';

  // For other routes, find the matching menu item
  const matchingItem = menuItems.find(item => {
    const itemPath = item.path.replace('/RCR', '');
    return normalizedPath.startsWith(itemPath) && itemPath !== '/';
=======
  // Find matching menu item by path
  const currentMenuItems = navigationStore.menuItems;
  const matchingItem = currentMenuItems.find(item => {
    // Check if the path exactly matches or starts with the menu item path
    return normalizedPath === item.path ||
           (normalizedPath.startsWith(item.path) && item.path !== '/');
>>>>>>> Stashed changes:src/layouts/components/SidebarView.vue
  });

  return matchingItem?.key || 'dashboard';
};

// Set active menu based on current route
const updateActiveMenu = () => {
  activeMenu.value = getActiveMenuFromPath(route.path);
};

// Change role function
const changeRole = (role) => {
  roleStore.setRole(role);

  // Redirect to the appropriate dashboard based on role
  switch(role) {
    case 'admin':
      router.push('/admin/dashboard');
      break;
    case 'agent':
      router.push('/agent/dashboard');
      break;
    case 'client':
      router.push('/client/dashboard');
      break;
    default:
      router.push('/');
  }
};

// Watch for route changes and update active menu
watch(() => route.path, () => {
  updateActiveMenu();
}, { immediate: true });

// Watch for role changes
watch(() => roleStore.currentRole, () => {
  updateActiveMenu();
});

// Initialize on component mount
onMounted(() => {
  updateActiveMenu();
});
</script>

<template>
  <aside class="sidebar">
    <div class="logo-container">
      <h2 class="logo">Real City</h2>
      <p class="tagline">realty inc brokerage</p>
    </div>
    <nav class="sidebar-nav">
      <ul>
        <li
          v-for="item in navigationStore.menuItems"
          :key="item.key"
          :class="{ active: activeMenu === item.key }"
        >
          <router-link
            :to="item.path"
            :class="{ active: activeMenu === item.key }"
          >
            <span class="icon" v-html="item.icon"></span>
            {{ item.name }}
          </router-link>
        </li>
      </ul>
    </nav>
    <div class="account-section">
      <h3>Account Management</h3>
      <div class="role-switcher">
        <div class="role-label">Current Role: {{ roleStore.currentRole }}</div>
        <select
          class="role-select"
          v-model="roleStore.currentRole"
          @change="changeRole(roleStore.currentRole)"
        >
          <option v-for="role in roleStore.availableRoles" :key="role" :value="role">
            {{ role.charAt(0).toUpperCase() + role.slice(1) }}
          </option>
        </select>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 230px;
  background: #004080;
  color: white;
  padding: 25px;
  padding-right: 35px;
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: 'Poppins', sans-serif;
  overflow: hidden;
}

.sidebar-nav {
  flex: 1;
}

.logo-container {
  padding: 1px 1px 18px 20px;
}

.logo {
  font-size: 22px;
  font-weight: 600;
  animation: fadeIn 0.8s ease-in-out;
  margin: 0 0 2px 0;
  letter-spacing: -0.5px;
}

.tagline {
  font-size: 11px;
  margin: 0;
  opacity: 0.7;
  font-weight: 400;
  letter-spacing: -0.3px;
}

nav ul {
  list-style: none;
  padding: 0;
  margin: 8px 0 0 0;
  display: flex;
  flex-direction: column;
}

nav ul li {
  margin: 0;
  cursor: pointer;
  margin-bottom: 10px;
  transition: all 0.3s ease;
}

nav ul li a {
  text-decoration: none;
  color: white;
  display: flex;
  font-size: 14px;
  align-items: center;
  width: 100%;
  padding: 10px 20px;
  font-weight: 400;
  transition: all 0.3s ease;
}

nav ul li.active {
  background: white;
  padding: 1px;
  padding-right:5px;
  border-radius: 10px;
}

nav ul li.active a {
  color: #004080;
  font-weight: 500;
}

nav ul li.active .icon svg {
  stroke: #004080;
}

.icon {
  margin-right: 15px;
  display: flex;
  align-items: center;
}

.icon svg {
  width: 16px;
  height: 16px;
  stroke-width: 1.5;
  transition: all 0.3s ease;
}

/* Hover effect for non-active items */
nav ul li:not(.active):hover {
  background: rgba(255, 255, 255, 0.1);
}

nav ul li:not(.active):hover a {
  transform: translateX(2px);
}

.account-section {
  margin-top: auto;
  padding: 20px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.account-section h3 {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 10px;
  padding-left: 20px;
}

.role-switcher {
  padding: 0 20px;
}

.role-label {
  font-size: 12px;
  opacity: 0.8;
  margin-bottom: 8px;
}

.role-select {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 8px 10px;
  border-radius: 4px;
  width: 100%;
  font-size: 14px;
}

.role-select option {
  background: #004080;
}

/* Fade-in animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
