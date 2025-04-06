<template>
  <nav class="marketing-nav">
    <div class="nav-content">
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
          <svg v-if="link.name === 'Checklist Overview'" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2"/>
            <circle cx="12" cy="7" r="1" fill="currentColor"/>
            <rect x="7" y="12" width="10" height="2" rx="1" fill="currentColor"/>
            <rect x="7" y="16" width="10" height="2" rx="1" fill="currentColor"/>
          </svg>
          <svg v-if="link.name === 'Social Insights'" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <rect x="10" y="8" width="10" height="12" rx="2" stroke="currentColor" stroke-width="2"/>
            <line x1="14" y1="12" x2="16" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <line x1="14" y1="16" x2="16" y2="16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
        {{ link.name }}
      </router-link>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useRoleStore } from '@/stores/roleStore';

const route = useRoute();
const roleStore = useRoleStore();

// Check if user is admin
const isAdmin = computed(() => roleStore.currentRole === 'admin');

// Define links based on user role
const links = computed(() => {
  if (isAdmin.value) {
    // Admin-only navigation - simplified
    return [
      { name: 'Success Plan', path: '/marketing-tools/success-plan' },
      { name: 'Checklist Overview', path: '/marketing-tools/admin-checklists' },
      { name: 'Social Insights', path: '/marketing-tools/admin-social' },
      { name: 'Done for You', path: '/marketing-tools/done-for-you' }
    ];
  } else {
    // Agent navigation - keeps all options
    return [
      { name: 'Success Plan', path: '/marketing-tools/success-plan' },
      { name: 'My Checklist', path: '/marketing-tools/checklist' },
      { name: 'Done for You', path: '/marketing-tools/done-for-you' },
      { name: 'Social Platforms', path: '/marketing-tools/social-platforms' }
    ];
  }
});

const isActive = computed(() => (link) => {
  // Success Plan is active on main marketing tools page, success plan page, or plan detail page
  if (link.path === '/marketing-tools/success-plan') {
    return route.path === '/marketing-tools' ||
           route.path === '/marketing-tools/success-plan' ||
           route.path.includes('/marketing-tools/plan/');
  }
  // Admin checklists overview
  if (link.path === '/marketing-tools/admin-checklists') {
    return route.path === '/marketing-tools/admin-checklists';
  }
  // Admin social insights
  if (link.path === '/marketing-tools/admin-social') {
    return route.path === '/marketing-tools/admin-social';
  }
  // Standard path matching
  return route.path === link.path;
});
</script>

<style scoped>
.marketing-nav {
  position: fixed;
  top: 105px;
  z-index: 50;
  display: flex;
  justify-content: center;
  padding: 1.5rem 0;
  border-bottom: 1px solid #E5E7EB;
  margin-bottom: 2rem;
  background: #FFFFFF;
  width: 100%;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.nav-content {
  display: flex;
  max-width: 1300px;
  width: 100%;
  gap: 2rem;
  padding: 0 2rem;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.625rem 1.125rem;
  color: #6B7280;
  text-decoration: none;
  border-radius: 0.5rem;
  font-weight: 500;
  font-size: 0.9375rem;
  transition: all 0.2s ease;
  position: relative;
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

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: -1.5rem;
  left: 50%;
  transform: translateX(-50%);
  width: 2rem;
  height: 0.25rem;
  background-color: #2563EB;
  border-radius: 0.5rem 0.5rem 0 0;
}

.nav-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-icon svg {
  width: 1.25rem;
  height: 1.25rem;
}

@media (max-width: 768px) {
  .marketing-nav {
    position: relative;
    top: 0;
    padding: 1rem 0;
  }

  .nav-content {
    flex-direction: column;
    gap: 0.5rem;
    padding: 0 1rem;
  }

  .nav-link {
    width: 100%;
    padding: 0.75rem 1rem;
  }

  .nav-link.active::after {
    display: none;
  }
}
</style>
