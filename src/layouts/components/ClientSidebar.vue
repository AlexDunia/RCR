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

const { onMounted: trackMount, onUnmounted: trackUnmount } = trackComponent('ClientSidebar');

onMounted(() => {
  trackMount();
  navigationFixCleanup = applyClientNavFix(router, roleStore);
  updateActiveMenu();

  if (localStorage.getItem('clientNavBroken') === 'true') {
    localStorage.removeItem('clientNavBroken');
    setTimeout(() => {
      const currentPath = route.path;
      router.replace(currentPath + '?recovered=true');
    }, 200);
  }
});

onUnmounted(() => {
  trackUnmount();
  if (navigationFixCleanup) {
    navigationFixCleanup();
  }
});

const getActiveMenuFromPath = (path) => {
  const sanitizedPath = path.replace(/[^a-zA-Z0-9-/]/g, '');

  if (route.query.from === 'agents' && (sanitizedPath.startsWith('/client-property') || sanitizedPath.startsWith('/client-properties'))) {
    return 'findagents';
  }

  if (sanitizedPath === '/client-dashboard') return 'dashboard';
  if (sanitizedPath.startsWith('/client-properties')) return 'properties';
  if (sanitizedPath.startsWith('/client-find-agents')) return 'findagents';
  if (sanitizedPath.startsWith('/client-favourites')) return 'favourites';
  if (sanitizedPath.startsWith('/client-appointments')) return 'appointments';
  if (sanitizedPath.startsWith('/client-documents')) return 'documents';
  if (sanitizedPath.startsWith('/client-profile')) return 'profile';
  if (sanitizedPath === '/client-settings') return 'settings';
  if (sanitizedPath.startsWith('/logout')) return 'logout';

  return 'dashboard';
};

const navigate = (path) => {
  if (path === route.path) {
    return;
  }

  const currentSection = getActiveMenuFromPath(route.path);
  const targetSection = getActiveMenuFromPath(path);

  if (currentSection === targetSection) {
    router.replace(path);
  } else {
    router.push(path);
  }
};

const updateActiveMenu = () => {
  activeMenu.value = getActiveMenuFromPath(route.path);
};

watch(() => route.path, updateActiveMenu, { immediate: true });
watch(() => route.query, updateActiveMenu, { immediate: true });

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
  <aside class="sidebar">
    <div class="logo-container">
      <div class="logo-section">
        <h2 class="logo">Real City</h2>
        <p class="tagline">realty inc brokerage</p>
      </div>
    </div>

    <nav class="sidebar-nav">
      <ul>
        <li v-for="item in menuItems" :key="item.key" :class="{ active: activeMenu === item.key }">
          <a href="#" :class="{ active: activeMenu === item.key }" @click.prevent="navigate(item.path)">
            <span class="icon" v-html="item.icon"></span>
            {{ item.name }}
          </a>
        </li>
      </ul>

      <div class="account-management">
        <h3>Account Management</h3>
        <ul>
          <li v-for="item in settingsMenu" :key="item.key" :class="{ active: activeMenu === item.key }">
            <a href="#" :class="{ active: activeMenu === item.key }" @click.prevent="navigate(item.path)">
              <span class="icon" v-html="item.icon"></span>
              {{ item.name }}
            </a>
          </li>
        </ul>
      </div>
    </nav>

    <div class="sidebar-footer">
      <div class="help-section">
        <div class="help-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </div>
        <span>Need Help?</span>
      </div>
      <div class="user-info">
        <div class="user-avatar">JD</div>
        <div class="user-details">
          <span class="user-name">John Doe</span>
          <span class="user-role">Client</span>
        </div>
      </div>
    </div>
  </aside>
</template>

<style scoped>
/* Base typography variables */
:root {
  --font-size-xs: 11px;
  --font-size-sm: 13px;
  --font-size-base: 14px;
  --font-size-lg: 16px;
  --font-size-xl: 20px;
  --font-size-2xl: 24px;

  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  --line-height-tight: 1.2;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;
}

.sidebar {
  width: 300px;
  min-width: 300px;
  background: #004080;
  color: white;
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: relative;
  font-family: 'Inter', sans-serif;
  font-size: var(--font-size-base);
  line-height: var(--line-height-normal);
}

/* Main heading (h1 equivalent) */
.logo {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  margin: 0;
  color: white;
  line-height: var(--line-height-tight);
}

/* Subheading (h2 equivalent) */
.account-management h3 {
  font-size: var(--font-size-xs);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: rgba(255, 255, 255, 0.5);
  margin: 0 0 8px 16px;
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-tight);
}

/* Body text - primary (navigation items) */
.sidebar-nav a {
  display: flex;
  align-items: center;
  padding: 10px 16px;
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  border-radius: 6px;
  transition: all 0.2s ease;
  line-height: var(--line-height-normal);
}

.sidebar-nav a.active {
  background: white;
  color: #004080;
  font-weight: var(--font-weight-bold);
}

/* Secondary text (tagline, help text) */
.tagline {
  font-size: var(--font-size-xs);
  margin: 2px 0 0 0;
  color: rgba(255, 255, 255, 0.7);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-tight);
}

.help-section {
  display: flex;
  align-items: center;
  padding: 8px 8px;
  color: rgba(255, 255, 255, 0.85);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: color 0.2s ease;
  border-radius: 6px;
  line-height: var(--line-height-normal);
}

/* User information typography */
.user-name {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: white;
  margin-bottom: 1px;
  line-height: var(--line-height-tight);
}

.user-role {
  font-size: var(--font-size-xs);
  color: rgba(255, 255, 255, 0.6);
  font-weight: var(--font-weight-normal);
  line-height: var(--line-height-tight);
}

.user-avatar {
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: white;
  margin-right: 12px;
}

/* Icon styling */
.icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  margin-right: 12px;
  opacity: 0.9;
}

/* Layout spacing */
.logo-container {
  padding: 20px 16px;
  margin-bottom: 8px;
}

.logo-section {
  display: flex;
  flex-direction: column;
}

.sidebar-nav {
  flex: 1;
  padding: 0 8px;
  overflow-y: auto;
}

.sidebar-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-nav li {
  margin-bottom: 2px;
}

.sidebar-nav a:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.account-management {
  margin-top: 16px;
  padding-top: 16px;
}

.sidebar-footer {
  padding: 16px;
  margin-top: auto;
}

.help-section:hover {
  background: rgba(255, 255, 255, 0.1);
}

.help-icon {
  margin-right: 12px;
  display: flex;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  padding: 8px;
  margin-top: 8px;
  border-radius: 6px;
}

.user-info:hover {
  background: rgba(255, 255, 255, 0.1);
  cursor: pointer;
}

.user-details {
  display: flex;
  flex-direction: column;
}

.sidebar-nav a.active .icon {
  color: #004080;
}
</style>
