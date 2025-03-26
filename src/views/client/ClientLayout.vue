<script setup>
// Client Layout - serves as a container for all client views
import { useHeaderStore } from '@/stores/headerStore';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const headerStore = useHeaderStore();
const route = useRoute();

// Set page title based on route meta
const pageTitle = computed(() => {
  return route.meta?.title || 'Client Dashboard';
});

// Update header title when component is mounted
headerStore.setTitle(pageTitle.value);
</script>

<template>
  <div class="client-layout">
    <h1 class="page-title">{{ pageTitle }}</h1>
    <div class="client-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.client-layout {
  padding: 20px;
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #333;
}

.client-content {
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 24px;
}
</style>
