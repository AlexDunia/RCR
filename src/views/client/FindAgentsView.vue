<template>
  <div class="find-agents-container">
    <!-- Search and filter section -->
    <div class="search-filters">
      <div class="search-container">
        <input type="text" v-model="searchQuery" placeholder="Search agents..." />
        <span class="search-shortcut">⌘ K</span>
      </div>

      <div class="filter-section">
        <div class="filter-tabs">
          <button class="filter-tab" :class="{ active: filterTab === 'network' }" @click="filterTab = 'network'">Your network</button>
          <button class="filter-tab" :class="{ active: filterTab === 'others' }" @click="filterTab = 'others'">Others</button>
        </div>

        <div class="filter-dropdown">
          <select v-model="locationFilter">
            <option value="">All Locations</option>
            <option value="Columbia, USA">Columbia, USA</option>
            <option value="Seattle, USA">Seattle, USA</option>
            <option value="Miami, USA">Miami, USA</option>
          </select>
        </div>

        <div class="filter-dropdown">
          <select v-model="specialtyFilter">
            <option value="">All Specialties</option>
            <option value="Luxury Real Estate">Luxury Real Estate</option>
            <option value="Commercial Properties">Commercial Properties</option>
            <option value="Residential Homes">Residential Homes</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Agent grid -->
    <div class="agent-grid">
      <div class="agent-card">
        <div class="agent-info">
          <img src="@/assets/agents/james.jpg" alt="James T. Whifield" class="agent-avatar" />
          <div class="agent-details">
            <h3>James T. Whifield <span>(5+ Yr of experience)</span></h3>
            <div class="agent-meta">
              <div class="meta-item">
                <img src="@/assets/icons/location.svg" alt="Location" />
                <span>Columbia, USA</span>
              </div>
              <div class="meta-item">
                <img src="@/assets/icons/building.svg" alt="Specialty" />
                <span>Luxury Real Estate</span>
              </div>
            </div>
          </div>
        </div>
        <div class="agent-actions">
          <button class="btn-view">
            <img src="@/assets/icons/eye.svg" alt="View" />
            View profile
          </button>
          <button class="btn-connect">
            <img src="@/assets/icons/user-plus.svg" alt="Connect" />
            Request to connect
          </button>
          <button class="btn-favorite active">
            <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Base styles */
.find-agents-container {
  background-color: #f8f9fa;
  min-height: 100vh;
  padding: 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  -webkit-font-smoothing: antialiased;
}

/* Enhanced Header */
.header {
  background-color: white;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.95);
}

.header h1 {
  font-size: 24px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
  letter-spacing: -0.02em;
}

.header p {
  color: #6b7280;
  margin: 4px 0 0;
  font-size: 14px;
  letter-spacing: -0.01em;
}

/* Improved Notification Badges */
.notification-badge {
  width: 36px;
  height: 36px;
  background-color: #f3f4f6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.2s ease;
  cursor: pointer;
}

.notification-badge:hover {
  background-color: #e5e7eb;
  transform: translateY(-1px);
}

.notification-badge:active {
  transform: translateY(0);
}

.badge {
  position: absolute;
  top: -6px;
  right: -6px;
  background-color: #dc2626;
  color: white;
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 10px;
  font-weight: 600;
  box-shadow: 0 2px 4px rgba(220, 38, 38, 0.2);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

/* Enhanced User Profile */
.user-profile {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 24px;
  cursor: pointer;
  background-color: #f3f4f6;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.user-profile:hover {
  background-color: #e5e7eb;
  border-color: #d1d5db;
}

.user-profile img:first-child {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

/* Improved Favourite Section */
.favourite-section {
  margin: 24px;
  background-color: #e8f5f0;
  border-radius: 16px;
  padding: 24px;
  position: relative;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
  background-image: linear-gradient(120deg, #e8f5f0 0%, #f0f9f6 100%);
}

/* Enhanced Toggle Buttons */
.toggle-buttons {
  display: flex;
  gap: 8px;
  background-color: rgba(255, 255, 255, 0.5);
  padding: 4px;
  border-radius: 12px;
}

.toggle-btn {
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  background-color: transparent;
  color: #1a1a1a;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.toggle-btn.active {
  background-color: #0052cc;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 82, 204, 0.2);
}

.toggle-btn:hover:not(.active) {
  background-color: rgba(255, 255, 255, 0.8);
}

/* Improved Filter Tabs */
.filter-tab {
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background-color: white;
  font-size: 14px;
  cursor: pointer;
  color: #374151;
  transition: all 0.2s ease;
}

.filter-tab:hover:not(.active) {
  border-color: #0052cc;
  color: #0052cc;
}

.filter-tab.active {
  background-color: #f3f4f6;
  border-color: #d1d5db;
  font-weight: 500;
}

/* Enhanced Search Input */
.search-container input {
  width: 100%;
  padding: 10px 36px 10px 16px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  font-size: 14px;
  background-color: white;
  transition: all 0.2s ease;
}

.search-container input:focus {
  outline: none;
  border-color: #0052cc;
  box-shadow: 0 0 0 3px rgba(0, 82, 204, 0.1);
}

.search-shortcut {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background-color: #f3f4f6;
  padding: 3px 6px;
  border-radius: 4px;
  font-size: 12px;
  color: #6b7280;
  font-weight: 500;
  border: 1px solid #e5e7eb;
}

/* Improved Agent Cards */
.agent-card {
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid transparent;
}

.agent-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border-color: #e5e7eb;
}

.agent-avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.agent-card:hover .agent-avatar {
  transform: scale(1.05);
}

.agent-details h3 {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 8px;
  letter-spacing: -0.01em;
}

/* Enhanced Action Buttons */
.btn-view, .btn-connect {
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 500;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-view {
  border: 1px solid #0052cc;
  background-color: white;
  color: #0052cc;
}

.btn-view:hover {
  background-color: #f0f7ff;
  transform: translateY(-1px);
}

.btn-connect {
  border: none;
  background-color: #0052cc;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 82, 204, 0.2);
}

.btn-connect:hover {
  background-color: #0043a6;
  transform: translateY(-1px);
  box-shadow: 0 4px 6px rgba(0, 82, 204, 0.25);
}

.btn-favorite {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-favorite:hover {
  transform: translateY(-1px) scale(1.05);
}

.btn-favorite.active {
  color: #dc2626;
  background-color: #fef2f2;
  border-color: #fecaca;
}

.btn-favorite svg {
  width: 20px;
  height: 20px;
  transition: transform 0.2s ease;
}

.btn-favorite:hover svg {
  transform: scale(1.1);
}

/* Responsive Design Improvements */
@media (max-width: 768px) {
  .header {
    padding: 16px;
  }

  .favourite-section {
    margin: 16px;
    padding: 16px;
  }

  .agent-card {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .agent-actions {
    width: 100%;
    justify-content: space-between;
  }

  .search-container {
    width: 100%;
  }

  .filters {
    flex-direction: column;
    gap: 16px;
  }

  .filter-tabs {
    width: 100%;
    justify-content: space-between;
  }
}

/* Loading States */
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.loading {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

/* Smooth Scrolling */
.agents-list {
  scroll-behavior: smooth;
}

/* Focus States */
*:focus-visible {
  outline: 2px solid #0052cc;
  outline-offset: 2px;
}
</style>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useLayoutStore } from '@/stores/layout';

const layoutStore = useLayoutStore();
const searchQuery = ref('');
const filterTab = ref('network');
const locationFilter = ref('');
const specialtyFilter = ref('');

// Hide layout header when this component mounts
onMounted(() => {
  layoutStore.setHeaderVisibility(false);
});

// Restore layout header when component unmounts
onUnmounted(() => {
  layoutStore.setHeaderVisibility(true);
});
</script>
