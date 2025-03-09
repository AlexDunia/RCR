<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const activeMenu = ref('');

// Function to determine which menu item should be active based on the current route
const getActiveMenuFromPath = (path) => {
  // Remove /RCR prefix if it exists
  const normalizedPath = path.replace('/RCR', '');

  if (normalizedPath === '/') return 'dashboard';
  if (normalizedPath.startsWith('/tasks')) return 'tasks';
  if (normalizedPath.startsWith('/completed-tasks')) return 'tasks';
  if (normalizedPath.startsWith('/manage-listings') ||
      normalizedPath.startsWith('/add-listing') ||
      normalizedPath.startsWith('/view-listings') ||
      normalizedPath.startsWith('/pending-approvals') ||
      normalizedPath.startsWith('/drafts')) return 'manage-listing';

  // For other routes, find the matching menu item
  const matchingItem = menuItems.find(item =>
    normalizedPath.startsWith(item.path.replace('/RCR', '')) && item.path !== '/'
  );

  return matchingItem ? matchingItem.key : 'dashboard';
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

const menuItems = [
  {
    name: 'Dashboard',
    key: 'dashboard',
    path: '/',
    icon: `
      <svg class="menu-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 9L12 2L21 9V20H14V14H10V20H3V9Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `
  },
  {
    name: 'Manage Listing',
    key: 'manage-listing',
    path: '/manage-listings',
    icon: `
      <svg class="menu-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" stroke-width="2"/>
        <path d="M3 10H21" stroke="currentColor" stroke-width="2"/>
        <path d="M7 14H17" stroke="currentColor" stroke-width="2"/>
      </svg>
    `
  },
  {
    name: 'Create Offer',
    key: 'create-offer',
    path: '/create-offer',
    icon: `
      <svg class="menu-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 5V19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    `
  },
  {
    name: 'Receipts & Documents',
    key: 'receipts-docs',
    path: '/receipts-docs',
    icon: `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="3" width="12" height="18" rx="2" stroke="currentColor" stroke-width="2"/>
        <path d="M9 7H15" stroke="currentColor" stroke-width="2"/>
        <path d="M9 11H15" stroke="currentColor" stroke-width="2"/>
      </svg>
    `
  },
  {
    name: 'Marketing Tools',
    key: 'marketing-tools',
    path: '/marketing-tools',
    icon: `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 10L20 4V20L4 14V10Z" stroke="currentColor" stroke-width="2"/>
      </svg>
    `
  },
  {
    name: 'Education & Training',
    key: 'education-training',
    path: '/education-training',
    icon: `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 9L12 16L22 9L12 2Z" stroke="currentColor" stroke-width="2"/>
        <path d="M12 16V22" stroke="currentColor" stroke-width="2"/>
        <path d="M7 18L12 22L17 18" stroke="currentColor" stroke-width="2"/>
      </svg>
    `
  },
  {
    name: 'Tasks',
    key: 'tasks',
    path: '/tasks',
    icon: `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 12L9 17L20 6" stroke="currentColor" stroke-width="2"/>
      </svg>
    `
  },
  {
    name: 'Tours',
    key: 'tours',
    path: '/tours',
    icon: `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
        <path d="M8 12H16" stroke="currentColor" stroke-width="2"/>
        <path d="M12 8V16" stroke="currentColor" stroke-width="2"/>
      </svg>
    `
  },
  {
    name: 'Profile',
    key: 'profile',
    path: '/profile',
    icon: `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="2"/>
        <path d="M4 20C4 16 8 14 12 14C16 14 20 16 20 20" stroke="currentColor" stroke-width="2"/>
      </svg>
    `
  }
];
</script>

<template>
  <aside class="sidebar">
    <h2 class="logo">Real <span>City</span></h2>
    <nav>
      <ul>
        <li
          v-for="item in menuItems"
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
  </aside>
</template>

<style scoped>
.sidebar {
  width: 260px;
  background: #074F90;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100vh;
}

.logo {
  font-size: 22px;
  font-weight: bold;
  animation: fadeIn 0.8s ease-in-out;
  margin-bottom: 30px;
}

.logo span {
  color: #ffcc00;
}

nav ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

nav ul li {
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

nav ul li a {
  text-decoration: none;
  color: white;
  display: flex;
  font-size: 14px;
  align-items: center;
  width: 100%;
  padding: 6px 0;
  font-weight: 400;
  transition: all 0.3s ease;
}

nav ul li.active {
  background: white;
}

nav ul li.active a {
  color: #074F90;
}

nav ul li.active .icon svg {
  stroke: #074F90;
}

.icon {
  margin-right: 12px;
  display: flex;
  align-items: center;
}

.icon svg {
  transition: all 0.3s ease;
}

/* Hover effect on non-active items */
nav ul li:not(.active):hover {
  background: #1f63bb;
}

nav ul li:not(.active):hover a {
  color: #ffcc00;
  transform: translateX(4px);
}

nav ul li:not(.active):hover .icon svg {
  stroke: #ffcc00;
  transform: rotate(3deg);
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

