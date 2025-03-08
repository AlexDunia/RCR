<template>
  <header class="marketing-header">
    <div class="header-content">
      <h1 class="title">{{ title }}</h1>
      <p class="subtitle">{{ subtitle }}</p>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const title = computed(() => {
  const path = route.path;
  if (path.includes('/social-platforms')) return 'Social Media';
  if (path.includes('/checklist')) return 'Marketing Checklist';
  if (path.includes('/done-for-you')) return 'Done For You';
  return 'Success Plan';
});

const subtitle = computed(() => {
  const path = route.path;
  if (path.includes('/social-platforms')) return 'Manage and schedule your social media posts';
  if (path.includes('/checklist')) return 'Track your marketing activities';
  if (path.includes('/done-for-you')) return 'Pre-made marketing materials';
  return 'Create and manage your marketing plans';
});
</script>

<style scoped>
.marketing-header {
  padding: 1.5rem 0;
  margin-bottom: 2rem;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
}

.title {
  font-size: 1.875rem;
  font-weight: 600;
  color: #1E3A8A;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 1rem;
  color: #6B7280;
  max-width: 600px;
}
</style>
