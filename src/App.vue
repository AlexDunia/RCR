<script setup>
import { useRoute } from 'vue-router';
import { useHeaderStore } from '@/stores/headerStore';
import { useLayoutStore } from '@/stores/layout';
import { watch, computed, onMounted } from 'vue';
import Sidebar from './layouts/components/SidebarView.vue';
import Header from './layouts/components/HeaderView.vue';
import PageTransition from './ui/PageTransition.vue';
import '@fontsource/poppins'; // Defaults to 400 weight
import '@fontsource/poppins/700.css'; // If you need bold

const route = useRoute();
const headerStore = useHeaderStore();
const layoutStore = useLayoutStore();

// Computed properties for better reactivity
const hideSidebar = computed(() => layoutStore.hideSidebar);
const hideHeader = computed(() => layoutStore.hideHeader);
const background = computed(() => layoutStore.background);

// Force layout update on mount
onMounted(() => {
  console.log('App.vue mounted - Forcing initial layout update');

  // Apply route meta settings
  if (route.meta) {
    layoutStore.setLayout({
      hideSidebar: route.meta.hideSidebar || false,
      hideHeader: route.meta.hideHeader || false,
      background: route.meta.background || '#FFFFFF'
    });
  }
});

// Watch route changes and update the header title dynamically
watch(route, (to) => {
  // Update header title
  if (to.meta && to.meta.title) {
    headerStore.setTitle(to.meta.title);
  } else {
    headerStore.setTitle('Dashboard');
  }

  console.log(`App.vue - Route changed to: ${to.path}`);
  console.log(`App.vue - Layout state: hideSidebar=${hideSidebar.value}, hideHeader=${hideHeader.value}`);

  // Apply the route's meta settings
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
    <Sidebar v-if="!hideSidebar" />
    <div class="main-content" :class="{ 'full-width': hideSidebar }">
      <Header v-if="!hideHeader" />
      <PageTransition>
        <router-view :key="$route.fullPath"></router-view>
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
