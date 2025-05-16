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
// import AdminHeader from './layouts/admin/AdminHeader.vue';
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
  return route.path === '/landing' || route.name === 'Landing' || roleStore.currentRole === 'all';
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
const hideHeader = computed(() => layoutStore.hideHeader || isLandingPage.value);
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

// Watch route changes to update header title
watch(route, (to) => {
  if (to.meta && to.meta.title) {
    headerStore.setTitle(to.meta.title);
  } else {
    headerStore.setTitle('Dashboard');
  }

  console.log(`App.vue - Route changed to: ${to.path}`);

  // Reset scroll position
  handleRouteChange();
}, { immediate: true });

// Add scroll management
const handleRouteChange = () => {
  const mainContent = document.querySelector('.main-content');
  if (mainContent) {
    mainContent.scrollTop = 0;
  }
};

// Add transition hooks for better performance
const handleBeforeLeave = () => {
  // Make sure we're in navigating state when transition starts
  isNavigating.value = true;
};

const handleAfterEnter = () => {
  // Clear navigation state when transition completes
  isNavigating.value = false;

  // Reset scroll position
  handleRouteChange();
};
</script>

<template>
  <div class="app-container" :style="{ background: background }">
    <!-- Dynamic sidebar based on role (only when not on landing page) -->
    <component v-if="!isLandingPage" :is="activeSidebar" :key="'sidebar-' + roleStore.currentRole" />

    <!-- Main content container with sidebar-adjusted class -->
    <div class="main-content" :class="{ 'with-sidebar': hasSidebar }">
      <Header v-if="!hideHeader"/>

      <div class="scroll-container" :class="{ 'navigating': isNavigating }">
        <router-view v-slot="{ Component, route }">
          <transition name="fade" mode="out-in" @before-leave="handleBeforeLeave" @after-enter="handleAfterEnter">
            <keep-alive include="AdminDashboardView,AgentDashboardView,ClientDashboardView">
              <component :is="Component" :key="route.fullPath" />
            </keep-alive>
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
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

#app {
  height: 100%;
  width: 100%;
}

.app-container {
  display: flex;
  height: 100vh;
  width: 100vw;
  background: #F4F4F4;
  overflow: hidden;
  transition: background 0.3s ease;
}

.hidden {
  display: none !important;
}

/* Sidebar base styles */
.admin-sidebar, .agent-sidebar, .client-sidebar {
  position: fixed;
  left: 0;
  top: 0;
  width: 250px; /* Match sidebar width from AdminSidebar.vue */
  height: 100vh;
  z-index: 10;
}

/* Main content styles */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: relative;
  transition: all 0.3s ease;
  width: 100%;
  margin-left: 0;
}

/* Apply sidebar margin when any sidebar is visible */
.main-content.with-sidebar {
  width: 100%;
}

.scroll-container {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
}

.navigating {
  pointer-events: none;
  opacity: 0.8; /* Allow content to remain slightly visible during navigation */
  transition: opacity 0.2s ease; /* Smooth transition when navigation state changes */
}

/* Improved fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
