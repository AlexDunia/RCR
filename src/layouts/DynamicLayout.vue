<script setup>
import { computed } from 'vue';
import { useRoleStore } from '@/stores/roleStore';
import AdminLayout from '@/layouts/AdminLayout.vue';
import AgentLayout from '@/layouts/AgentLayout.vue';
import ClientLayout from '@/layouts/ClientLayout.vue';

const roleStore = useRoleStore();

// Compute the appropriate layout component based on the current role
const LayoutComponent = computed(() => {
  switch (roleStore.currentRole) {
    case 'admin':
      return AdminLayout;
    case 'agent':
      return AgentLayout;
    case 'client':
      return ClientLayout;
    default:
      return AgentLayout; // Default to agent layout
  }
});
</script>

<template>
  <component :is="LayoutComponent">
    <router-view></router-view>
  </component>
</template>

<style scoped>
/* Add any layout-specific styles here */
</style>
