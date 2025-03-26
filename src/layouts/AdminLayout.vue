<script setup>
import { useHeaderStore } from '@/stores/headerStore';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import AdminSidebar from '@/layouts/components/AdminSidebar.vue';
import Header from '@/layouts/components/HeaderView.vue';

const headerStore = useHeaderStore();
const route = useRoute();

// Set page title based on route meta
const pageTitle = computed(() => {
  return route.meta?.title || 'Admin Dashboard';
});

// Update header title when component is mounted
headerStore.setTitle(pageTitle.value);
</script>

<template>
  <div class="admin-layout">
    <AdminSidebar />
    <div class="main-content">
      <Header />
      <div class="content-area">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}

.content-area {
  flex: 1;
  padding: 24px;
  background-color: #f9fafb;
  overflow-y: auto;
}
</style>
