<script setup>
import { ref, onMounted, watch, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { applyClientNavFix, trackComponent } from '@/fix-client-navigation';
import { useRoleStore } from '@/stores/roleStore';

const route = useRoute();
const router = useRouter();
const roleStore = useRoleStore();
const activeMenu = ref('');
let navigationFixCleanup = null;

// Track this component
const { onMounted: trackMount, onUnmounted: trackUnmount } = trackComponent('ClientSidebar');

// Apply client-specific navigation fixes
onMounted(() => {
  // Register component tracking
  trackMount();

  // Apply client navigation fix and store cleanup function
  navigationFixCleanup = applyClientNavFix(router, roleStore);

  // Set initial menu state
  updateActiveMenu();

  // Check if we need navigation recovery
  if (localStorage.getItem('clientNavBroken') === 'true') {
    console.log('Recovering from broken client navigation');
    localStorage.removeItem('clientNavBroken');

    // Force a reload of the current route
    setTimeout(() => {
      const currentPath = route.path;
      router.replace(currentPath + '?recovered=true');
    }, 200);
  }
});

// Clean up when component is destroyed
onUnmounted(() => {
  // Unregister component tracking
  trackUnmount();

  // Clean up navigation fixes
  if (navigationFixCleanup) {
    navigationFixCleanup();
  }
});

// Function to determine which menu item should be active based on the current route
const getActiveMenuFromPath = (path) => {
  // Sanitize path input
  const sanitizedPath = path.replace(/[^a-zA-Z0-9-/]/g, '');

  // Check for 'from' query parameter to maintain context
  if (route.query.from === 'agents' && (sanitizedPath.startsWith('/client-property') || sanitizedPath.startsWith('/client-properties'))) {
    return 'findagents';
  }

  if (sanitizedPath === '/client-dashboard') return 'dashboard';
  if (sanitizedPath.startsWith('/client-properties') || sanitizedPath.startsWith('/client-property')) return 'properties';
  if (sanitizedPath.startsWith('/client-find-agents')) return 'findagents';
  if (sanitizedPath.startsWith('/client-favourites')) return 'favourites';
  if (sanitizedPath.startsWith('/client-appointments')) return 'appointments';
  if (sanitizedPath.startsWith('/client-messages')) return 'messages';
  if (sanitizedPath.startsWith('/client-documents')) return 'documents';
  if (sanitizedPath.startsWith('/client-profile')) return 'profile';
  if (sanitizedPath.startsWith('/client-settings')) return 'settings';
  if (sanitizedPath.startsWith('/logout')) return 'logout';

  // Default to dashboard for any unrecognized paths
  return 'dashboard';
};

// Enhanced navigation handling
const navigate = (path) => {
  if (path === route.path) {
    // Already on this page, no need to navigate
    console.log('Already on this path, skipping navigation');
    return;
  }

  // Use replace instead of push for same-section navigations to avoid history buildup
  const currentSection = getActiveMenuFromPath(route.path);
  const targetSection = getActiveMenuFromPath(path);

  if (currentSection === targetSection) {
    // Same section, use replace
    router.replace(path);
  } else {
    // Different section, use push
    router.push(path);
  }
};

// Set active menu based on current route
const updateActiveMenu = () => {
  activeMenu.value = getActiveMenuFromPath(route.path);
};

// Watch for route changes and update active menu
watch(() => route.path, updateActiveMenu, { immediate: true });

// Also watch for query parameter changes
watch(() => route.query, updateActiveMenu, { immediate: true });

// Define menu items
const menuItems = [
  {
    key: 'dashboard',
    name: 'Dashboard',
    path: '/client-dashboard',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>'
  },
  {
    key: 'properties',
    name: 'Properties',
    path: '/client-properties',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>'
  },
  {
    key: 'findagents',
    name: 'Find agents',
    path: '/client-find-agents',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>'
  },
  {
    key: 'favourites',
    name: 'Favourites',
    path: '/client-favourites',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>'
  },
  {
    key: 'appointments',
    name: 'Appointments',
    path: '/client-appointments',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>'
  },
  {
    key: 'documents',
    name: 'Documents',
    path: '/client-documents',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>'
  }
];

// Define settings menu
const settingsMenu = [
  {
    key: 'profile',
    name: 'Profile',
    path: '/client-profile',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>'
  },
  {
    key: 'settings',
    name: 'Settings',
    path: '/client-settings',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>'
  },
  {
    key: 'logout',
    name: 'Logout',
    path: '/logout',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>'
  }
];
</script>

<template>
  <aside class="sidebar client-sidebar router-view-container">
    <div class="logo-container">
      <div class="logo-section">
        <h2 class="logo">Real City</h2>
        <p class="tagline">realty inc brokerage</p>
      </div>
    </div>
    <nav class="sidebar-nav">
      <ul>
        <li
          v-for="item in menuItems"
          :key="item.key"
          :class="{ active: activeMenu === item.key }"
        >
          <a
            href="#"
            :class="{ active: activeMenu === item.key }"
            @click.prevent="navigate(item.path)"
          >
            <span class="icon" v-html="item.icon"></span>
            {{ item.name }}
          </a>
        </li>
      </ul>

      <div class="account-management">
        <h3>Account Management</h3>
        <ul>
          <li
            v-for="item in settingsMenu"
            :key="item.key"
            :class="{ active: activeMenu === item.key }"
          >
            <a
              href="#"
              :class="{ active: activeMenu === item.key }"
              @click.prevent="navigate(item.path)"
            >
              <span class="icon" v-html="item.icon"></span>
              {{ item.name }}
            </a>
          </li>
        </ul>
      </div>
    </nav>
    <div class="sidebar-footer">
      <div class="help-section">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
        <span>Need Help?</span>
      </div>
      <div class="user-info">
        <div class="user-avatar">
          <span>JD</span>
        </div>
        <div class="user-details">
          <span class="user-name">John Doe</span>
          <span class="user-role">Client</span>
        </div>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 260px;
  min-width: 260px;
  background-color: #0a4d8c;
  color: white;
  display: flex;
  flex-direction: column;
  height: 100vh;
  z-index: 10;
  transition: all 0.3s ease;
  font-family: 'Inter', sans-serif;
}

.logo-container {
  padding: 20px;
  padding-bottom: 10px;
  padding-top: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo-section {
  display: flex;
  flex-direction: column;
}

.logo {
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 2px 0;
  color: white;
}

.tagline {
  font-size: 11px;
  margin: 0;
  opacity: 0.7;
  font-weight: 400;
  margin-top: -2px;
}

.sidebar-nav {
  padding: 10px 0;
  flex-grow: 1;
  overflow-y: auto;
}

.sidebar-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-nav li {
  margin-bottom: 1px;
}

.sidebar-nav a {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  transition: all 0.2s ease;
  font-size: 14px;
  gap: 12px;
  border-radius: 0;
}

.sidebar-nav a:hover {
  background-color: rgba(255, 255, 255, 0.08);
}

.sidebar-nav a.active {
  background-color: rgba(255, 255, 255, 0.15);
  font-weight: 500;
  color: white;
  border-left: 3px solid white;
}

.icon {
  display: flex;
  align-items: center;
  opacity: 0.9;
}

.account-management {
  margin-top: 20px;
  padding-top: 10px;
}

.account-management h3 {
  padding: 0 20px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 10px;
  font-weight: 500;
}

.sidebar-footer {
  padding: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.help-section {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  margin-bottom: 20px;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  cursor: pointer;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-avatar {
  width: 36px;
  height: 36px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
}

.user-details {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-size: 14px;
  font-weight: 600;
}

.user-role {
  font-size: 12px;
  opacity: 0.7;
}

/* Switch styling */
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
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
  background-color: rgba(255, 255, 255, 0.2);
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: .4s;
}

input:checked + .slider {
  background-color: #4fc3f7;
}

input:checked + .slider:before {
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
  width: 100%;
  top: 5px;
  display: flex;
  justify-content: space-between;
  padding: 0 6px;
  box-sizing: border-box;
  color: white;
  font-size: 10px;
  font-weight: bold;
  z-index: 1;
}

.toggle-labels span {
  opacity: 0.9;
}

.switch.small {
  width: 40px;
  height: 20px;
}

.switch.small .slider:before {
  height: 14px;
  width: 14px;
  left: 3px;
  bottom: 3px;
}

.switch.small input:checked + .slider:before {
  transform: translateX(20px);
}

.switch.small .toggle-labels {
  top: 3px;
  padding: 0 5px;
  font-size: 9px;
}
</style>
