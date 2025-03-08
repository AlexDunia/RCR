<template>
  <nav class="marketing-nav">
    <router-link
      v-for="(link, index) in links"
      :key="index"
      :to="link.path"
      class="nav-link"
      :class="{ active: isActive(link) }"
    >
      <div class="nav-icon">
        <svg v-if="link.name === 'Success Plan'" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2"/>
          <path d="M8 12L11 15L16 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <svg v-if="link.name === 'My Checklist'" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2"/>
          <path d="M8 12H16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <path d="M8 8H16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <path d="M8 16H16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <svg v-if="link.name === 'Done for You'" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 12L9 16L19 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <svg v-if="link.name === 'Social Platforms'" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
          <path d="M12 8V16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <path d="M8 12H16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </div>
      {{ link.name }}
    </router-link>
  </nav>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const links = ref([
  { name: 'Success Plan', path: '/RCR/marketing-tools/success-plan' },
  { name: 'My Checklist', path: '/RCR/marketing-tools/checklist' },
  { name: 'Done for You', path: '/RCR/marketing-tools/done-for-you' },
  { name: 'Social Platforms', path: '/RCR/marketing-tools/social-platforms' }
]);

const isActive = (link) => {
  if (route.path === '/RCR/marketing-tools' && link.path === '/RCR/marketing-tools/success-plan') {
    return false;
  }
  return route.path === link.path;
};
</script>

<style scoped>
.marketing-nav {
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #E5E7EB;
  margin-bottom: 2rem;
  background: #FFFFFF;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  color: #6B7280;
  text-decoration: none;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.nav-link:hover {
  color: #2563EB;
  background: #EFF6FF;
}

.nav-link.active {
  color: #2563EB;
  background: #EFF6FF;
  font-weight: 600;
}

.nav-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
