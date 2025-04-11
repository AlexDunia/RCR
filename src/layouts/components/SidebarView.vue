<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useRoleStore } from '@/stores/roleStore';

const route = useRoute();
const roleStore = useRoleStore();
const activeMenu = ref('');
const currentRole = computed(() => roleStore.currentRole);

// Toggle between admin and agent roles
const toggleRole = () => {
  console.log('Toggle role from agent sidebar - Current role:', currentRole.value);

  // Set the new role first - always switching to admin from agent sidebar
  const newRole = 'admin';
  console.log('Toggling to new role:', newRole);

  // Set flag for full reload to prevent image loading issues
  localStorage.setItem('needsFullReload', 'true');

  // Apply the role change - this updates localStorage
  roleStore.setRole(newRole);

  // Force a hard page reload to ensure all resources are properly loaded
  window.location.href = window.location.href.split('#')[0] + '#/';
};

// Function to determine which menu item should be active based on the current route
const getActiveMenuFromPath = (path) => {
  // Sanitize path input
  const sanitizedPath = path.replace(/[^a-zA-Z0-9-/]/g, '');

  // Remove /RCR prefix if it exists
  const normalizedPath = sanitizedPath.replace('/RCR', '');

  // Use strict equality comparison
  if (normalizedPath === '/') return 'dashboard';
  if (normalizedPath.startsWith('/tasks')) return 'tasks';
  if (normalizedPath.startsWith('/completed-tasks')) return 'tasks';
  if (normalizedPath.startsWith('/clients')) return 'clients';
  if (normalizedPath.startsWith('/manage-listings') ||
      normalizedPath.startsWith('/add-listing') ||
      normalizedPath.startsWith('/view-listings') ||
      normalizedPath.startsWith('/pending-approvals') ||
      normalizedPath.startsWith('/drafts')) return 'manage-listing';
  if (normalizedPath.startsWith('/education-training')) return 'education-training';
  if (normalizedPath.startsWith('/profile')) return 'profile';

  // For other routes, find the matching menu item
  const matchingItem = menuItems.find(item => {
    const itemPath = item.path.replace('/RCR', '');
    return normalizedPath.startsWith(itemPath) && itemPath !== '/';
  });

  return matchingItem?.key || 'dashboard';
};

// Set active menu based on current route
const updateActiveMenu = () => {
  activeMenu.value = getActiveMenuFromPath(route.path);
};

// Watch for route changes and update active menu
watch(() => route.path, () => {
  updateActiveMenu();
}, { immediate: true });

// Initialize on component mount
onMounted(() => {
  updateActiveMenu();
});

// Define menu items as a frozen constant to prevent modification
const menuItems = Object.freeze([
  {
    name: 'Dashboard',
    key: 'dashboard',
    path: '/',
    icon: `
      <svg class="menu-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 9L12 2L21 9V20H14V14H10V20H3V9Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `
  },
  {
    name: 'Manage Listing',
    key: 'manage-listing',
    path: '/manage-listings',
    icon: `
      <svg class="menu-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" stroke-width="1.5"/>
        <path d="M3 10H21" stroke="currentColor" stroke-width="1.5"/>
        <path d="M8 15H16" stroke="currentColor" stroke-width="1.5"/>
      </svg>
    `
  },
  {
    name: 'Receipts and documents',
    key: 'receipts-docs',
    path: '/receipts-docs',
    icon: `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="3" width="12" height="18" rx="2" stroke="currentColor" stroke-width="1.5"/>
        <path d="M9 7H15" stroke="currentColor" stroke-width="1.5"/>
        <path d="M9 11H15" stroke="currentColor" stroke-width="1.5"/>
        <path d="M9 15H13" stroke="currentColor" stroke-width="1.5"/>
      </svg>
    `
  },
  {
    name: 'Marketing Tools',
    key: 'marketing-tools',
    path: '/marketing-tools',
    icon: `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 5C20 6.65685 16.4183 8 12 8C7.58172 8 4 6.65685 4 5C4 3.34315 7.58172 2 12 2C16.4183 2 20 3.34315 20 5Z" stroke="currentColor" stroke-width="1.5"/>
        <path d="M20 5V12C20 13.6569 16.4183 15 12 15C7.58172 15 4 13.6569 4 12V5" stroke="currentColor" stroke-width="1.5"/>
        <path d="M20 12V19C20 20.6569 16.4183 22 12 22C7.58172 22 4 20.6569 4 19V12" stroke="currentColor" stroke-width="1.5"/>
      </svg>
    `
  },
  {
    name: 'Education and Training',
    key: 'education-training',
    path: '/education-training',
    icon: `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="1.5"/>
        <path d="M19 9.5V16.5C19 18.5 15.5 20 12 20C8.5 20 5 18.5 5 16.5V9.5" stroke="currentColor" stroke-width="1.5"/>
      </svg>
    `
  },
  {
    name: 'Tasks',
    key: 'tasks',
    path: '/tasks',
    icon: `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="1.5"/>
        <path d="M8 12L11 15L16 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `
  },
  {
    name: 'Tours',
    key: 'tours',
    path: '/tours',
    icon: `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 20.8L10 3.19999C10 2.53725 9.47032 2 8.81818 2L5.18182 2C4.52968 2 4 2.53726 4 3.2L4 20.8C4 21.4627 4.52968 22 5.18182 22L8.81818 22C9.47032 22 10 21.4627 10 20.8Z" stroke="currentColor" stroke-width="1.5"/>
        <path d="M20 20.8L20 3.19999C20 2.53725 19.4703 2 18.8182 2L15.1818 2C14.5297 2 14 2.53726 14 3.2L14 20.8C14 21.4627 14.5297 22 15.1818 22L18.8182 22C19.4703 22 20 21.4627 20 20.8Z" stroke="currentColor" stroke-width="1.5"/>
      </svg>
    `
  },
  {
    name: 'Profile',
    key: 'profile',
    path: '/profile',
    icon: `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.5"/>
        <path d="M5 20C5 16.6863 8.13401 14 12 14C15.866 14 19 16.6863 19 20" stroke="currentColor" stroke-width="1.5"/>
      </svg>
    `
  },
  {
    name: 'Settings',
    key: 'settings',
    path: '/settings',
    icon: `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" stroke-width="1.5"/>
        <path d="M18.7273 14.5455C18.5909 14.8182 18.5909 15.1364 18.6818 15.4091L19.5 18.4091C19.5909 18.7273 19.5 19.0455 19.2727 19.2727L17.1818 21.3636C16.9545 21.5909 16.6364 21.6818 16.3182 21.5909L13.3182 20.7727C13.0455 20.6818 12.7273 20.6818 12.4545 20.8182L9.81818 22.0909C9.5 22.2273 9.09091 22.1364 8.90909 21.8636L6.81818 19.2727C6.63636 19 6.63636 18.6818 6.77273 18.4091L7.77273 15.5C7.86364 15.2273 7.86364 14.9091 7.72727 14.6364L6.45455 12C6.31818 11.7273 6.40909 11.3182 6.68182 11.1364L9.27273 9.04545C9.54545 8.86364 9.72727 8.59091 9.72727 8.27273L9.90909 5.18182C9.90909 4.86364 10.1818 4.59091 10.5 4.5L13.5 4.5C13.8182 4.5 14.0909 4.77273 14.0909 5.09091L14.2727 8.18182C14.2727 8.5 14.4545 8.77273 14.7273 8.95455L17.3182 11.0455C17.5909 11.2273 17.6818 11.6364 17.5455 11.9091L16.2727 14.5455C16.1364 14.8182 16.1364 15.1364 16.2727 15.4091L17.1818 18.5C17.2727 18.7727 17.1818 19.0909 16.9545 19.3182L14.5455 21.7273" stroke="currentColor" stroke-width="1.5"/>
      </svg>
    `
  }
]);
</script>

<template>
  <aside class="sidebar">
    <div class="logo-container">
      <div class="logo-section">
        <h2 class="logo">Real City</h2>
        <p class="tagline">realty inc brokerage</p>
      </div>
      <label class="switch small">
        <input type="checkbox" @change="toggleRole" :checked="currentRole === 'admin'">
        <span class="slider round"></span>
        <span class="toggle-labels">
          <span class="agent-label">A</span>
          <span class="admin-label">+</span>
        </span>
      </label>
    </div>
    <nav class="sidebar-nav">
      <ul>
        <li
          v-for="item in menuItems"
          :key="item.key"
          :class="{ active: activeMenu === item.key }"
        >
          <router-link
            :to="item.path"
            :class="{ active: activeMenu === item.key }"
            @click="updateActiveMenu"
          >
            <span class="icon" v-html="item.icon"></span>
            {{ item.name }}
          </router-link>
        </li>
      </ul>
    </nav>
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
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-section {
  display: flex;
  flex-direction: column;
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

.switch {
  position: relative;
  display: inline-size;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #FFEB3B;
}

input:focus + .slider {
  box-shadow: 0 0 1px #FFEB3B;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

.toggle-labels {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  padding: 0 8px;
  pointer-events: none;
  font-size: 10px;
  color: white;
}

.agent-label {
  margin-right: 5px;
}

.admin-label {
  margin-left: 5px;
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

.switch.small {
  width: 36px;
  height: 20px;
  margin-right: 5px;
}

.switch.small .slider:before {
  height: 14px;
  width: 14px;
  left: 3px;
  bottom: 3px;
}

.switch.small input:checked + .slider:before {
  -webkit-transform: translateX(16px);
  -ms-transform: translateX(16px);
  transform: translateX(16px);
}

.switch.small .toggle-labels {
  font-size: 8px;
}

.switch.small .agent-label,
.switch.small .admin-label {
  margin: 0 2px;
}
</style>
