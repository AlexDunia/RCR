<script setup>
import { useRoute, useRouter } from 'vue-router';
import { useHeaderStore } from '@/stores/headerStore';
import { useLayoutStore } from '@/stores/layout';
import { useRoleStore } from './stores/roleStore.js'; // Added explicit .js extension
import { useTaskTimer } from './composables/useTaskTimer';
import { watch, computed, onMounted, ref, nextTick } from 'vue';

import Sidebar from './layouts/components/SidebarView.vue';
import AdminSidebar from './layouts/components/AdminSidebar.vue'; // Import Admin Sidebar
import ClientSidebar from './layouts/components/ClientSidebar.vue'; // Import Client Sidebar
import Header from './layouts/components/HeaderView.vue';
import PublicHeader from '@/components/PublicHeader.vue';
import TaskNotification from './components/TaskNotification.vue';

import '@fontsource/poppins';
import '@fontsource/poppins/700.css';

const route = useRoute();
const router = useRouter();
const headerStore = useHeaderStore();
const layoutStore = useLayoutStore();
const roleStore = useRoleStore(); // Access role store
const isNavigating = ref(false);

// Initialize task timer functionality
const { showNotification, currentNotification, dismissNotification } = useTaskTimer();

// Check if on landing page
const isLandingPage = computed(() => {
  return roleStore.currentRole === 'all' || route.path === '/landing';
});

// Check if user is an admin - use only roleStore
const isAdmin = computed(() => {
  return roleStore.currentRole === 'admin';
});

// Check if user is a client
const isClient = computed(() => {
  return roleStore.currentRole === 'client';
});

// Determine if any sidebar is visible
const hasSidebar = computed(() => {
  // Don't show sidebar on landing page
  if (isLandingPage.value) return false;
  return isAdmin.value || isClient.value || (!isAdmin.value && !isClient.value); // Agent has sidebar too
});

// Computed properties for layout settings
const background = computed(() => layoutStore.background);

// Get the current active sidebar component based on role
const activeSidebar = computed(() => {
  if (isAdmin.value) return AdminSidebar;
  if (isClient.value) return ClientSidebar;
  return Sidebar; // Default to agent sidebar
});

// Force layout update on mount
onMounted(() => {
  console.log('App.vue mounted - Current role:', roleStore.currentRole);

  // Check if we need a true reload after role toggle
  const needsReload = localStorage.getItem('needsFullReload');
  if (needsReload === 'true') {
    localStorage.removeItem('needsFullReload');
    // Force browser to reload the page completely including all assets
    window.location.reload(true);
  }

  // Add global navigation handler with improved timing
  router.beforeEach((to, from, next) => {
    isNavigating.value = true;
    // Check if we are trying to navigate to the same page - prevent unnecessary transitions
    if (to.path === from.path && to.hash === from.hash) {
      isNavigating.value = false;
      return next(false);
    }

    if (to.path === '/landing') {
      roleStore.setRole('all');
    }

    next();
  });

  router.afterEach(() => {
    // Small delay to ensure components are fully rendered before removing navigation state
    setTimeout(() => {
      isNavigating.value = false;
    }, 50); // Reduced from 100ms for faster response
  });

  // Listen for router cleanup events
  window.addEventListener('router:cleanup', clearRouterCache);
});

// Enhanced router cache clearing function
const clearRouterCache = () => {
  console.log('Cleaning up router cache');
  // Force Vue's next tick to clear any pending renders
  nextTick(() => {
    // Clear any router internal state that might be stuck
    if (router && router.history) {
      // Force redraw of current route
      const currentPath = router.currentRoute.value.fullPath;
      router.replace(currentPath + '?t=' + Date.now());
    }

    // Reset navigation state in case it got stuck
    isNavigating.value = false;
  });
};

// Add scroll management
const handleRouteChange = () => {
  // Force scroll to top
  window.scrollTo(0, 0);

  // Also reset scroll position of main content
  const mainContent = document.querySelector('.main-content');
  if (mainContent) {
    mainContent.scrollTop = 0;
  }

  // Force component reload for landing page
  if (route.path === '/landing') {
    nextTick(() => {
      window.scrollTo(0, 0);
      const mainContent = document.querySelector('.main-content');
      if (mainContent) {
        mainContent.scrollTop = 0;
      }
    });
  }
};

// Add transition hooks for better performance
const handleBeforeLeave = () => {
  // Make sure we're in navigating state when transition starts
  isNavigating.value = true;
  // Force scroll to top before transition
  window.scrollTo(0, 0);
};

const handleAfterEnter = () => {
  // Clear navigation state when transition completes
  isNavigating.value = false;
  // Ensure scroll position is reset and component is properly mounted
  nextTick(() => {
    window.scrollTo(0, 0);
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
      mainContent.scrollTop = 0;
    }
  });
};

// Watch route changes to update header title and handle scroll
watch(route, (to) => {
  if (to.meta && to.meta.title) {
    headerStore.setTitle(to.meta.title);
  } else {
    headerStore.setTitle('Dashboard');
  }

  console.log(`App.vue - Route changed to: ${to.path}`);

  // Reset scroll position on route change
  handleRouteChange();
}, { immediate: true });

// Watch route changes
watch(
  () => route.path,
  (newPath) => {
    if (newPath === '/landing') {
      // Force role update when landing on landing page
      roleStore.setRole('all');
      // Force immediate scroll reset for landing page
      nextTick(() => {
        window.scrollTo(0, 0);
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
          mainContent.scrollTop = 0;
        }
      });
    }
  },
  { immediate: true }
);
</script>

<template>
  <div class="app-container" :style="{ background: background }">
    <!-- Show PublicHeader for 'all' role or landing page, but not on login/signup, and not if hideHeader is true -->
    <PublicHeader
      v-if="!route.meta.hideHeader && (roleStore.currentRole === 'all' || route.path === '/landing') && !route.path.includes('login') && !route.path.includes('signup')"
      :transparent="route.path === '/landing'"
      :is-fixed="true"
      class="z-50"
    />

    <!-- Dynamic sidebar based on role (only when not on landing page) -->
    <component v-if="!isLandingPage" :is="activeSidebar" :key="'sidebar-' + roleStore.currentRole" />

    <!-- Main content container with sidebar-adjusted class -->
    <div class="main-content" :class="{ 'with-sidebar': hasSidebar && !isLandingPage, 'landing-page': isLandingPage }">
      <!-- Show global header only if not hidden and not on landing page and not for 'all' role -->
      <Header v-if="!route.meta.hideHeader && !isLandingPage && roleStore.currentRole !== 'all'"/>

      <div class="scroll-container" :class="{ 'navigating': isNavigating }">
        <router-view v-slot="{ Component }">
          <transition
            :name="route.path === '/landing' ? 'none' : 'fade'"
            mode="out-in"
            @before-leave="handleBeforeLeave"
            @after-enter="handleAfterEnter"
          >
            <component
              :is="Component"
              :key="route.fullPath + (route.path === '/landing' ? Date.now() : '')"
            />
          </transition>
        </router-view>

        <TaskNotification
          :show="showNotification"
          :message="currentNotification?.message || ''"
          @dismiss="dismissNotification"
        />
      </div>
    </div>
  </div>
</template>

<style>
/* Reset and base styles */
html, body {
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  box-sizing: border-box;
  font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f8fafc;
}

#app {
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.app-container {
  display: flex;
  height: 100vh;
  width: 100vw;
  background: #f8fafc;
  overflow: hidden;
  margin: 0;
  padding: 0;
}

/* Sidebar base styles */
.admin-sidebar,
.agent-sidebar,
.client-sidebar {
  width: 280px;
  min-width: 280px;
  height: 100vh;
  background-color: #0a4d8c;
  color: white;
  display: flex;
  flex-direction: column;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
}

.sidebar-content {
  padding: 0 24px;
}

/* Main content styles */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f8fafc;
  max-width: 100vw;
  overflow-x: hidden;
  position: relative;
  z-index: 1;
}

/* When role is 'all', remove sidebar and header spacing */
.main-content:not(.with-sidebar) {
  margin-left: 0;
  padding-left: 0;
}

/* Ensure full width for landing page */
.main-content.landing-page {
  width: 100vw;
  max-width: 100vw;
  overflow-x: hidden;
  padding: 0;
  margin: 0;
  background-color: #fff;
  position: relative;
}

.main-content.landing-page .scroll-container {
  padding: 0;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #fff;
  position: relative;
  z-index: 1;
}

/* Header styles */
.header {
  height: 80px;
  background: white;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  z-index: 10;
}

.header-left {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0; /* Allow shrinking */
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  color: #111827;
  margin: 0;
  line-height: 1.2;
}

.page-subtitle {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
  line-height: 1.4;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px; /* Reduced from 24px */
  margin-left: auto;
  flex-shrink: 0; /* Prevent shrinking */
}

.search-container {
  max-width: 480px;
  width: 100%;
  position: relative;
  margin: 0 16px; /* Add margin instead of using gap */
  flex-shrink: 1; /* Allow search to shrink if needed */
}

.search-input {
  width: 100%;
  height: 44px;
  padding: 0 44px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background-color: #f3f4f6;
  font-size: 14px;
  color: #111827;
}

.search-input:focus {
  outline: none;
  border-color: #0a4d8c;
  background-color: white;
}

.search-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280;
}

.keyboard-shortcut {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  padding: 2px 6px;
  background: #e5e7eb;
  border-radius: 4px;
  font-size: 12px;
  color: #6b7280;
}

.notification-icon {
  position: relative;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  flex-shrink: 0;
}

.notification-icon:hover {
  background-color: #f3f4f6;
}

.notification-badge {
  position: absolute;
  top: -2px;
  right: -2px;
  background-color: #ef4444;
  color: white;
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 10px;
  font-weight: 500;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  padding: 6px;
  border-radius: 8px;
  flex-shrink: 0;
}

.user-profile:hover {
  background-color: #f3f4f6;
}

.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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

/* Content area */
.scroll-container {
  flex: 1;
  padding: 24px;
  background-color: #f8fafc;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* No transition for landing page */
.none-enter-active,
.none-leave-active {
  transition: none;
}

.none-enter-from,
.none-leave-to {
  opacity: 1;
}

/* Navigation state */
.navigating {
  pointer-events: none;
}

/* Responsive styles */
@media (max-width: 991px) {
  .admin-sidebar,
  .agent-sidebar,
  .client-sidebar {
    width: 80px;
    min-width: 80px;
  }

  .sidebar-content {
    padding: 0 16px;
  }
}

@media (max-width: 767px) {
  .admin-sidebar,
  .agent-sidebar,
  .client-sidebar {
    display: none;
  }

  .header,
  .scroll-container,
  .sidebar-content {
    padding: 0 16px;
  }

  .welcome-banner {
    margin: -16px -16px 16px -16px;
    padding: 24px 16px;
  }
}

@media (max-width: 1024px) {
  .search-container {
    max-width: 320px; /* Smaller on medium screens */
  }
  .header {
    padding: 12px 16px;
  }
}

@media (max-width: 768px) {
  .search-container {
    display: none; /* Hide search on mobile */
  }
  .header-right {
    gap: 8px;
  }
}

/* Scrollbar styles */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Make sure router view content aligns properly */
.router-view-container {
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
}

/* Welcome banner styles */
.welcome-banner {
  margin: -24px -24px 24px -24px;
  padding: 32px 24px;
  background: linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%);
  color: white;
}

.welcome-banner h1 {
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 8px 0;
  line-height: 1.2;
}

.welcome-banner p {
  font-size: 14px;
  margin: 0;
  opacity: 0.9;
  line-height: 1.4;
}

/* Content sections */
.content-section {
  margin-bottom: 24px;
}

.content-section:last-child {
  margin-bottom: 0;
}

/* Stats grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
  margin-bottom: 24px;
}

/* Add PublicHeader styles */
.public-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: transparent;
}
</style>
