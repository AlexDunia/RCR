<template>
  <nav class="task-navigation">
    <div class="nav-container">
      <router-link
        v-for="tab in taskTabs"
        :key="tab.path"
        :to="tab.path"
        class="task-nav-tab"
        :class="{ active: currentRoute === tab.path }"
      >
        <svg v-if="tab.name === 'In progress'" class="tab-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        <svg v-if="tab.name === 'Drafts'" class="tab-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
        </svg>
        <svg v-if="tab.name === 'Completed'" class="tab-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {{ tab.name }}
      </router-link>
      <div class="nav-line"></div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const currentRoute = computed(() => route.path)

const taskTabs = [
  { name: 'In progress', path: '/tasks/in-progress' },
  { name: 'Drafts', path: '/tasks/drafts' },
  { name: 'Completed', path: '/tasks/completed' }
]
</script>

<style scoped>
.task-navigation {
  margin-bottom: 2rem;
}

.nav-container {
  position: relative;
  display: flex;
  gap: 2rem;
  padding-bottom: 1rem;
}

.task-nav-tab {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  text-decoration: none;
  color: var(--gray-text, #6B7280);
  transition: all 0.2s ease;
  font-size: 14px;
  position: relative;
  z-index: 1;
  border-radius: 5px;
}

.tab-icon {
  width: 18px;
  height: 18px;
}

.task-nav-tab:hover {
  color: var(--primary-blue, #074F90);
}

.task-nav-tab.active {
  color: var(--primary-blue, rgba(7, 79, 144, 0.9));
  font-weight: 520;
  background-color: white;
  border: none;
  box-shadow: 0 2px 4px rgba(7, 79, 144, 0.2);
}

.nav-line {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: rgba(229, 231, 235, 0.3);
}

.task-nav-tab.active::after {
  content: '';
  position: absolute;
  bottom: -16px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--primary-blue, rgba(7, 79, 144, 0.6));
  transition: all 0.3s ease;
}
</style>
