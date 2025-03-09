<!-- src/views/documents/DocumentsLayout.vue -->
<template>
  <div class="documents-container">
    <header class="documents-header">
      <h1 class="text-xl font-semibold">Documents</h1>
      <p class="text-gray-600">Manage your docs in one place</p>
    </header>

    <div class="document-management-card">
      <div class="card-header">
        <h2 class="text-lg">Document Management</h2>
        <p class="text-gray-600">Manage your real estate docs in one place.</p>
      </div>

      <div class="tabs-container">
        <router-link
          v-for="tab in tabs"
          :key="tab.name"
          :to="tab.route"
          class="tab-button"
          :class="{ active: isActiveTab(tab.route) }"
        >
          <span class="tab-icon" v-html="tab.icon"></span>
          {{ tab.name }}
        </router-link>
      </div>

      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const tabs = [
  {
    name: 'Buyer Rep',
    route: '/documents/buyer-rep',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/></svg>'
  },
  {
    name: 'Seller Rep',
    route: '/documents/seller-rep',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/></svg>'
  },
  {
    name: 'MLS',
    route: '/documents/mls',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"/></svg>'
  },
  {
    name: 'View Docs',
    route: '/documents/view-docs',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/><path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/></svg>'
  }
]

const isActiveTab = (route) => {
  return useRoute().path === route
}
</script>

<style scoped>
.documents-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.documents-header {
  margin-bottom: 2rem;
}

.document-management-card {
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
}

.card-header {
  margin-bottom: 1.5rem;
}

.tabs-container {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 1rem;
}

.tab-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  color: #6b7280;
  transition: all 0.2s;
}

.tab-button:hover {
  background-color: #f3f4f6;
}

.tab-button.active {
  background-color: #e5e7eb;
  color: #1e40af;
}

.tab-icon {
  width: 1.25rem;
  height: 1.25rem;
}
</style>
