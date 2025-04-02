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

// Check if user is an admin
const isAdmin = computed(() => roleStore.currentRole === 'admin');

// Computed properties for layout settings
const hideSidebar = computed(() => layoutStore.hideSidebar);
const hideHeader = computed(() => layoutStore.hideHeader);
const background = computed(() => layoutStore.background);

// Force layout update on mount
onMounted(() => {
  console.log('App.vue mounted - Forcing initial layout update');

  if (route.meta) {
    layoutStore.setLayout({
      hideSidebar: route.meta.hideSidebar || false,
      hideHeader: route.meta.hideHeader || false,
      background: route.meta.background || '#FFFFFF'
    });
  }
});

// Watch route changes to update header and layout
watch(route, (to) => {
  if (to.meta && to.meta.title) {
    headerStore.setTitle(to.meta.title);
  } else {
    headerStore.setTitle('Dashboard');
  }

  console.log(`App.vue - Route changed to: ${to.path}`);
  console.log(`App.vue - Layout state: hideSidebar=${hideSidebar.value}, hideHeader=${hideHeader.value}`);

  if (to.meta) {
    layoutStore.setLayout({
      hideSidebar: to.meta.hideSidebar || false,
      hideHeader: to.meta.hideHeader || false,
      background: to.meta.background || '#FFFFFF'
    });
  }
}, { immediate: true });
</script>

<template>
  <div class="app-container" :style="{ background: background }">
    <!-- Show different sidebars based on role -->
    <AdminSidebar v-if="isAdmin && !hideSidebar" />
    <Sidebar v-else-if="!hideSidebar" />

    <div class="main-content" :class="{ 'full-width': hideSidebar }">
      <!-- Show different headers if needed -->
      <!-- <AdminHeader v-if="isAdmin && !hideHeader" /> -->
      <!-- <Header v-else-if="!hideHeader" /> -->
      <Header/>

      <PageTransition>
        <router-view :key="$route.fullPath"></router-view>
      </PageTransition>

      <!-- Task Notification -->
      <TaskNotification
        :show="showNotification"
        :message="currentNotification?.message || ''"
        @dismiss="dismissNotification"
      />
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

.app-container.no-sidebar .main-content {
  margin-left: 0;
  width: 100%;
}

.main-content {
  flex: 1;
  overflow-y: auto;
  position: relative;
  transition: all 0.3s ease;
}

.main-content.full-width {
  margin-left: 0;
  width: 100%;
}
</style>
