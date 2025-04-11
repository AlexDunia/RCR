<script setup>
import { useRoute } from 'vue-router';
import { useHeaderStore } from '@/stores/headerStore';
import { useLayoutStore } from '@/stores/layout';
import { useRoleStore } from './stores/roleStore.js'; // Added explicit .js extension
import { useTaskTimer } from './composables/useTaskTimer';
import { watch, computed, onMounted } from 'vue';

import Sidebar from './layouts/components/SidebarView.vue';
import AdminSidebar from './layouts/components/AdminSidebar.vue'; // Import Admin Sidebar
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

// Computed properties for layout settings
const hideHeader = computed(() => layoutStore.hideHeader);
const background = computed(() => layoutStore.background);

// Force layout update on mount
onMounted(() => {
  console.log('App.vue mounted - Current role:', roleStore.currentRole);
  console.log('App.vue - Is admin?', roleStore.currentRole === 'admin');

  // Simple reactivity trigger to ensure correct sidebar is shown
  if (isAdmin.value) {
    console.log('Admin sidebar should be visible');
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
    <AdminSidebar :class="{ 'hidden': !isAdmin }" />

    <!-- Agent sidebar - only hidden with CSS when admin -->
    <Sidebar :class="{ 'hidden': isAdmin }" />

    <!-- Main content never has full-width class -->
    <div class="main-content">
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

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: relative;
  transition: all 0.3s ease;
}

.scroll-container {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
}
</style>
