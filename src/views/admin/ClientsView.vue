<template>
  <div class="clients-page">
    <div class="page-header">
      <div class="header-content">
        <h1 class="page-title">Find Clients</h1>
        <p class="page-subtitle">For Real City admin</p>
      </div>
      <div class="header-actions">
        <button class="icon-button">
          <img src="@/assets/icons/email.svg" alt="Messages" />
        </button>
        <button class="icon-button">
          <img src="@/assets/icons/notification.svg" alt="Notifications" />
        </button>
      </div>
    </div>

    <div class="client-finder-container">
      <div class="client-finder-header">
        <h2 class="finder-title">Client Finder 🔍</h2>
        <p class="finder-subtitle">Search for agents across Real City database</p>
      </div>
    </div>

    <!-- Search bar that matches the image exactly -->
    <div class="search-container">
      <div class="search-bar">
        <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#9CA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <input
          type="text"
          placeholder="Search by Name, Country, State, Price range, Agent expertise, experience level..."
          v-model="searchQuery"
          @keyup.enter="searchClients"
        />
        <span>⌘ K</span>
      </div>
    </div>

    <div class="client-results">
      <div class="client-card">
        <div class="client-info">
          <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Client avatar" class="client-avatar" />
          <div class="client-details">
            <h3 class="client-name">Alex Dunia</h3>
            <div class="client-meta">
              <div class="location">
                <svg class="meta-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>Columbia, USA</span>
              </div>
              <div class="specialty">
                <svg class="meta-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 15c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>Luxury Real Estate</span>
              </div>
            </div>
          </div>
        </div>
        <div class="client-actions">
          <button class="btn view-profile">
            <svg class="btn-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="12" cy="7" r="4" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            View profile
          </button>
          <button class="btn deactivate">
            <svg class="btn-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M6 6l12 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Deactivate
          </button>
        </div>
      </div>

      <div class="client-card empty-card">
        <!-- Empty card to match the reference image -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// State
const searchQuery = ref('');

// Methods
const searchClients = () => {
  // In a real app, this would call an API to search clients
  console.log('Searching for:', searchQuery.value);
};
</script>

<style scoped>
.clients-page {
  padding: 0 2rem;
  max-width: 1200px;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-top: 1.5rem;
}

.header-content {
  display: flex;
  flex-direction: column;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #374151;
  margin: 0;
}

.page-subtitle {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0.25rem 0 0;
  font-weight: normal;
}

.header-actions {
  display: flex;
  gap: 0.75rem;
}

.icon-button {
  background: #f3f4f6;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.client-finder-container {
  background-color: #e2f2ee;
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-bottom: 1.25rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.client-finder-header {
  margin-bottom: 0;
}

.finder-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  color: #374151;
}

.finder-subtitle {
  font-size: 0.875rem;
  color: #4b5563;
  margin: 0.25rem 0 0;
  font-weight: normal;
}

.search-container {
  margin-bottom: 1.25rem;
}

.search-bar {
  position: relative;
  width: 100%;
}

.search-icon {
  position: absolute;
  left: 0.875rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9CA3AF;
}

.search-bar input {
  width: 100%;
  height: 2.5rem;
  padding: 0 2.5rem 0 2.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  color: #4b5563;
  background-color: white;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  outline: none;
}

.search-bar input::placeholder {
  color: #9CA3AF;
}

.search-bar span {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background-color: #f3f4f6;
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  color: #6b7280;
}

.client-results {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.client-card {
  background-color: white;
  border-radius: 0.5rem;
  padding: 1rem 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.empty-card {
  height: 5rem;
  background-color: white;
}

.client-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.client-avatar {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  object-fit: cover;
}

.client-details {
  display: flex;
  flex-direction: column;
}

.client-name {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.375rem;
  color: #111827;
}

.client-meta {
  display: flex;
  gap: 1.25rem;
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: normal;
  line-height: 1;
}

.location, .specialty {
  display: flex;
  align-items: center;
  gap: 0.375rem;
}

.meta-icon {
  color: #6b7280;
  width: 0.875rem;
  height: 0.875rem;
  flex-shrink: 0;
}

.client-actions {
  display: flex;
  gap: 0.625rem;
}

.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  padding: 0.4375rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  height: 2rem;
  white-space: nowrap;
}

.view-profile {
  background-color: #1a4189;
  color: white;
  border: none;
}

.view-profile:hover {
  background-color: #153471;
}

.deactivate {
  background-color: white;
  color: #ef4444;
  border: 1px solid #ef4444;
}

.deactivate:hover {
  background-color: #fef2f2;
}

.btn-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
