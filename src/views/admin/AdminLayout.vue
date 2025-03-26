<script setup>
// Admin Layout - serves as a container for all admin views
import { useHeaderStore } from '@/stores/headerStore';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

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
    <h1 class="page-title">{{ pageTitle }}</h1>
    <div class="admin-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.admin-layout {
  padding: 20px;
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #333;
}

.admin-content {
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 24px;
}
</style>
