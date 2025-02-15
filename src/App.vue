<script setup>
import { useRoute } from "vue-router";
import { useHeaderStore } from "@/stores/headerStore";
import { watch } from "vue";
import Sidebar from "./components/SidebarView.vue";
import Header from "./components/HeaderView.vue";

const route = useRoute();
const headerStore = useHeaderStore();

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
  <div class="app-container">
    <Sidebar />
    <div class="main-content">
      <Header />
      <router-view />
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
  /* Full height */
  width: 100vw;
  /* Full width */
  background: #f5f7fa;
  overflow: hidden;
}


.main-content {
  flex: 1;
  overflow-y: auto;
}
</style>
