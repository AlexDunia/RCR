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
  return isAdmin.value || isClient.value || (!isAdmin.value && !isClient.value); // Agent has sidebar too
});

// Computed properties for layout settings
const hideHeader = computed(() => layoutStore.hideHeader);
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

  // Add global navigation handler
  router.beforeEach((to, from, next) => {
    isNavigating.value = true;
    next();
  });

  router.afterEach(() => {
    // Set a small delay to ensure components are fully rendered
    setTimeout(() => {
      isNavigating.value = false;
    }, 100);
  });

  // Listen for router cleanup events
  window.addEventListener('router:cleanup', clearRouterCache);
});

// Clear any router cache that might be causing issues
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
</script>

<template>
  <div class="app-container" :style="{ background: background }">
    <!-- Dynamic sidebar based on role -->
    <component :is="activeSidebar" :key="'sidebar-' + roleStore.currentRole" />

    <!-- Main content container with sidebar-adjusted class -->
    <div class="main-content" :class="{ 'with-sidebar': hasSidebar }">
      <Header v-if="!hideHeader"/>

      <div class="scroll-container" :class="{ 'navigating': isNavigating }">
        <router-view v-slot="{ Component, route }">
          <transition name="fade" mode="out-in">
            <keep-alive v-if="route.meta.keepAlive">
              <component :is="Component" :key="route.fullPath" />
            </keep-alive>
            <component v-else :is="Component" :key="route.fullPath" />
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
  width: 260px;
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
  width: calc(100% - 260px);
  margin-left: 260px;
}

.scroll-container {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
}

.navigating {
  pointer-events: none;
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
