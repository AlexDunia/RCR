<script setup>
import { useRoute } from "vue-router";
import { useHeaderStore } from "@/stores/headerStore";
import { computed, watch } from "vue";
import Sidebar from "./components/SidebarView.vue";
import Header from "./components/HeaderView.vue";
import "@fontsource/poppins"; // Defaults to 400 weight
import "@fontsource/poppins/700.css"; // If you need bold

const route = useRoute();
const headerStore = useHeaderStore();

// Compute whether to show sidebar based on route
const showSidebar = computed(() => {
  return route.name !== 'TaskCreate';
});

// Watch route changes and update the header title dynamically
watch(route, () => {
  if (route.meta && route.meta.title) {
    headerStore.setTitle(route.meta.title);
  } else {
    headerStore.setTitle("Dashboard");
  }
}, { immediate: true });
</script>

<template>
  <div class="app-container" :class="{ 'no-sidebar': !showSidebar }">
    <Sidebar v-if="showSidebar" />
    <div class="main-content">
      <Header />
      <router-view></router-view>
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
  background: #F4F4F4;
  overflow: hidden;
}

.app-container.no-sidebar .main-content {
  margin-left: 0;
  width: 100%;
}

.main-content {
  flex: 1;
  overflow-y: auto;
}
</style>
