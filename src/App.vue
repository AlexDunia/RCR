<script setup>
import { useRoute } from 'vue-router';
import { useHeaderStore } from '@/stores/headerStore';
import { useLayoutStore } from '@/stores/layout';
import { useRoleStore } from './stores/roleStore.js'; // Added explicit .js extension
import { useTaskTimer } from './composables/useTaskTimer';
import { watch, computed, onMounted } from 'vue';

import Sidebar from './layouts/components/SidebarView.vue';
import AdminSidebar from './layouts/components/AdminSidebar.vue'; // Import Admin Sidebar
import ClientSidebar from './layouts/components/ClientSidebar.vue'; // Import Client Sidebar
import Header from './layouts/components/HeaderView.vue';
// import AdminHeader from './layouts/admin/AdminHeader.vue';
import TaskNotification from './components/TaskNotification.vue';
import PageTransition from './ui/PageTransition.vue';

import '@fontsource/poppins';
import '@fontsource/poppins/700.css';

const route = useRoute();
const headerStore = useHeaderStore();
const layoutStore = useLayoutStore();
const roleStore = useRoleStore(); // Access role store

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

// Force layout update on mount
onMounted(() => {
  console.log('App.vue mounted - Current role:', roleStore.currentRole);
  console.log('App.vue - Is admin?', roleStore.currentRole === 'admin');
  console.log('App.vue - Is client?', roleStore.currentRole === 'client');

  // Simple reactivity trigger to ensure correct sidebar is shown
  if (isAdmin.value) {
    console.log('Admin sidebar should be visible');
  } else if (isClient.value) {
    console.log('Client sidebar should be visible');
  } else {
    console.log('Agent sidebar should be visible');
  }

  // Check if we need a true reload after role toggle
  const needsReload = localStorage.getItem('needsFullReload');
  if (needsReload === 'true') {
    localStorage.removeItem('needsFullReload');
    // Force browser to reload the page completely including all assets
    window.location.reload(true);
  }
});

// Watch route changes to update header title only
watch(route, (to) => {
  if (to.meta && to.meta.title) {
    headerStore.setTitle(to.meta.title);
  } else {
    headerStore.setTitle('Dashboard');
  }

  console.log(`App.vue - Route changed to: ${to.path}`);
}, { immediate: true });

// Add scroll management
const handleRouteChange = () => {
  const mainContent = document.querySelector('.main-content');
  if (mainContent) {
    mainContent.scrollTop = 0;
  }
};

// Watch route changes
watch(route, handleRouteChange);
</script>

<template>
  <div class="app-container" :style="{ background: background }">
    <!-- CRITICAL: Each sidebar is rendered individually - no conditional visibility at DOM level -->
    <!-- Admin sidebar - only hidden with CSS when not admin -->
    <AdminSidebar class="admin-sidebar" :class="{ 'hidden': !isAdmin }" />

    <!-- Agent sidebar - only hidden with CSS when not agent -->
    <Sidebar class="agent-sidebar" :class="{ 'hidden': isAdmin || isClient }" />

    <!-- Client sidebar - only hidden with CSS when not client -->
    <ClientSidebar class="client-sidebar" :class="{ 'hidden': !isClient }" />

    <!-- Main content container with sidebar-adjusted class when needed -->
    <div class="main-content" :class="{ 'with-sidebar': hasSidebar }">
      <Header v-if="!hideHeader"/>

      <div class="scroll-container">
        <PageTransition>
          <router-view :key="$route.fullPath"></router-view>
        </PageTransition>

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
</style>
