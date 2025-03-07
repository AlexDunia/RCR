<script setup>
import { useRoute } from 'vue-router';
import { useHeaderStore } from '@/stores/headerStore';
import { useLayoutStore } from '@/stores/layout'; // Add this import
import { watch } from 'vue';
import Sidebar from './components/SidebarView.vue';
import Header from './components/HeaderView.vue';
import PageTransition from './components/PageTransition.vue';
import '@fontsource/poppins'; // Defaults to 400 weight
import '@fontsource/poppins/700.css'; // If you need bold

const route = useRoute();
const headerStore = useHeaderStore();
const layoutStore = useLayoutStore(); // Use the layout store

// Watch route changes and update the header title dynamically
watch(route, (to) => {
  // Update header title
  if (to.meta && to.meta.title) {
    headerStore.setTitle(to.meta.title);
  } else {
    headerStore.setTitle('Dashboard');
  }
}, { immediate: true });
</script>

<template>
  <div class="app-container" :style="{ background: layoutStore.background }">
    <Sidebar v-if="!layoutStore.hideSidebar" />
    <div class="main-content">
      <Header v-if="!layoutStore.hideHeader" />
      <PageTransition>
        <router-view></router-view>
      </PageTransition>
    </div>
  </div>
</template>

<style>
/* Ensure body and html are fullscreen */
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

/* Make app container take full width and height */
.app-container {
  display: flex;
  height: 100vh;
  width: 100vw;
  background: #F4F4F4; /* Fallback if layoutStore fails */
  overflow: hidden;
}

.app-container.no-sidebar .main-content {
  margin-left: 0;
  width: 100%;
}

.main-content {
  flex: 1;
  overflow-y: auto;
  position: relative;
}
</style>
