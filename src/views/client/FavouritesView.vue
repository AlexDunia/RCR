<template>
  <div class="favourites-container">
    <!-- Main content area -->
    <div class="main-content">
      <!-- Favourite agents section -->
      <div class="favourite-section">
        <div class="favourite-header-row">
          <div class="favourite-header">
            <h2>{{ tab === 'agents' ? 'Favorite Agents' : 'Favorite Properties' }}</h2>
            <p>{{ tab === 'agents' ? 'Agents you like' : 'Properties you saved' }}</p>
          </div>
          <div class="tabs">
            <button
              class="tab-button"
              :class="{ active: tab === 'properties' }"
              @click="switchTab('properties')"
            >
              Properties
            </button>
            <button
              class="tab-button"
              :class="{ active: tab === 'agents' }"
              @click="switchTab('agents')"
            >
              Agents
            </button>
          </div>
          <div class="heart-image">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g opacity="0.18">
                <path d="M40 72C-24 36 16 0 40 20C64 0 104 36 40 72Z" fill="#F43F5E"/>
              </g>
            </svg>
          </div>
        </div>
      </div>
      <!-- Filter options below the card -->
      <div class="filter-options">
        <template v-if="tab === 'agents'">
          <div class="network-filters">
            <button
              type="button"
              class="filter-button"
              :class="{ active: activeFilter === 'network' }"
              @click="switchFilter('network')"
            >
              Your network
            </button>
            <button
              type="button"
              class="filter-button"
              :class="{ active: activeFilter === 'others' }"
              @click="switchFilter('others')"
            >
              Others
            </button>
          </div>
        </template>
        <div class="search-box">
          <input
            type="text"
            placeholder="Search..."
            v-model="searchQuery"
            @input="handleSearchInput"
            maxlength="100"
            :disabled="isSearching"
          >
          <span class="keyboard-shortcut">⌘ K</span>
        </div>
      </div>
      <!-- Agents grid -->
      <div v-if="tab === 'agents'" class="agents-grid">
        <div v-if="filteredAgents.length === 0" class="empty-state">
          <div class="empty-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <h3>No agents found</h3>
          <p v-if="activeFilter === 'network'">You don't have any connected agents yet.</p>
          <p v-else>You don't have any favorite agents yet.</p>
          <router-link to="/client-find-agents" class="browse-btn">Browse Agents</router-link>
        </div>

        <div v-for="agent in filteredAgents" :key="agent.id" class="agent-card">
          <div class="agent-info">
            <div class="agent-avatar">
              <img
                :src="agent.avatar"
                :alt="agent.name"
                @error="handleImageError($event, agent)"
              >
            </div>
            <div class="agent-details">
              <h3>{{ agent.name }} <span class="experience">({{ agent.experience }})</span></h3>
              <div class="agent-meta">
                <div class="meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  {{ agent.location }}
                </div>
                <div class="meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                  {{ agent.specialty }}
                </div>
              </div>
            </div>
            <div class="agent-actions">
              <button class="view-profile-btn" @click="viewAgentProfile(agent.id)">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
                View Profile
              </button>
              <button class="remove-favorite-btn" @click="toggleFavorite(agent.id)">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Properties grid -->
      <div v-if="tab === 'properties' && savedProperties.length === 0" class="favourites-empty">
        <div class="empty-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </div>
        <h2>No Saved Properties Yet</h2>
        <p>Properties you save will appear here so you can easily find them later.</p>
        <router-link to="/client-properties" class="browse-btn">Browse Properties</router-link>
      </div>

      <div v-if="tab === 'properties' && savedProperties.length > 0" class="properties-grid">
        <div v-for="property in savedProperties" :key="property.id" class="property-card">
          <div class="property-image">
            <img :src="property.image" :alt="property.name">
            <div class="property-badge">{{ property.status }}</div>
            <button class="favorite-btn active" @click="removeFromFavorites(property.id)" title="Remove from favorites">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
          </div>
          <div class="property-info">
            <p class="price">${{ property.price }}</p>
            <h3 class="property-name">{{ property.name }}</h3>
            <p class="location">{{ property.location }}</p>
            <div class="specs">
              <span class="spec">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                {{ property.bedrooms }} bd
              </span>
              <span class="spec">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 4h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2zm0 8h14"></path>
                </svg>
                {{ property.bathrooms }} ba
              </span>
              <span class="spec">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2"></rect>
                </svg>
                {{ property.size }} sqft
              </span>
            </div>
            <div class="property-actions">
              <button class="action-button view-button" @click="viewProperty(property.id)">
                View Details
              </button>
              <button class="action-button schedule-button" @click="scheduleViewing(property.id)">
                Schedule Viewing
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add modal component -->
    <AgentProfileModal
      v-if="showProfileModal"
      :show="showProfileModal"
      :agent="selectedAgent"
      @close="closeModal"
      @connect="handleConnectionRequest"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { usePropertyStore } from '@/stores/propertyStore';
import { useAgentStore } from '@/stores/agentStore';
import { debounce } from 'lodash-es';
import AgentProfileModal from '@/components/AgentProfileModal.vue';

const router = useRouter();
const route = useRoute();
const propertyStore = usePropertyStore();
const agentStore = useAgentStore();

// Active tab state
const tab = ref(route.query.tab || 'properties');
const activeFilter = ref(route.query.filter || 'network');
const searchQuery = ref('');
const isSearching = ref(false);

// Add state for modal
const showProfileModal = ref(false);
const selectedAgent = ref(null);

// Create debounced search function
const debouncedSearch = debounce((query) => {
  isSearching.value = true;
  try {
    // Update the filtered results
    searchQuery.value = query;
  } finally {
    isSearching.value = false;
  }
}, 300);

// Update the filteredAgents computed property
const filteredAgents = computed(() => {
  // First filter by network status
  const networkFiltered = favoriteAgents.value.filter(agent => {
    if (activeFilter.value === 'network') {
      return agent.isConnected;
    } else {
      return !agent.isConnected;
    }
  });

  // Then apply search filter if there's a search query
  if (!searchQuery.value) return networkFiltered;

  const query = searchQuery.value.toLowerCase().trim();
  return networkFiltered.filter(agent =>
    agent.name.toLowerCase().includes(query) ||
    agent.location.toLowerCase().includes(query) ||
    agent.specialty.toLowerCase().includes(query)
  );
});

// Add input sanitization function
const sanitizeSearchInput = (input) => {
  if (!input) return '';

  // Remove any HTML/script tags and trim
  const sanitized = input
    .replace(/<[^>]*>/g, '')
    .replace(/[<>]/g, '')
    .trim();

  // Limit length to prevent DOS
  return sanitized.slice(0, 100);
};

// Add search input handler
const handleSearchInput = (event) => {
  const query = event.target.value;
  // Sanitize input before processing
  const sanitizedQuery = sanitizeSearchInput(query);
  debouncedSearch(sanitizedQuery);
};

// Function to switch tabs
const switchTab = (newTab) => {
  tab.value = newTab;
  router.push({
    path: route.path,
    query: {
      ...route.query,
      tab: newTab
    }
  });
};

// Function to switch filters
const switchFilter = (filter) => {
  activeFilter.value = filter;
  router.push({
    path: route.path,
    query: {
      ...route.query,
      filter
    }
  });
};

// Get saved properties from store
const savedProperties = computed(() => propertyStore.favoriteProperties);

// Get all favorite agents from the store
const favoriteAgents = computed(() => agentStore.favoriteAgents);

// Handle image loading errors
function handleImageError(event, agent) {
  // Generate a fallback URL using UI Avatars
  const fallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(agent.name)}&background=0D47A1&color=fff`;
  event.target.src = fallbackUrl;
}

// Toggle favorite status
const toggleFavorite = (agentId) => {
  agentStore.toggleFavorite(agentId);
};

// Remove property from favorites
const removeFromFavorites = (propertyId) => {
  propertyStore.toggleFavorite(propertyId);
};

// View property details
const viewProperty = (propertyId) => {
  router.push(`/client-property/${propertyId}`);
};

// Schedule property viewing - now redirects to messages instead
const scheduleViewing = (propertyId) => {
  router.push(`/client-messages?contactAgent=${propertyId}`);
};

// View agent profile
const viewAgentProfile = (agentId) => {
  const agent = agentStore.getAgentById(agentId);
  if (agent) {
    selectedAgent.value = agent;
    showProfileModal.value = true;
  }
};

// Handle connection request
const handleConnectionRequest = async (agentId) => {
  try {
    await agentStore.sendConnectionRequest(agentId);
    // Close modal after sending request
    showProfileModal.value = false;
  } catch (err) {
    console.error('Failed to send connection request:', err);
  }
};

// Close modal
const closeModal = () => {
  showProfileModal.value = false;
  selectedAgent.value = null;
};

// Watch for route changes to update activeFilter
watch(() => route.query.filter, (newFilter) => {
  activeFilter.value = newFilter || 'network';
});

// Watch for route changes to update tab
watch(() => route.query.tab, (newTab) => {
  tab.value = newTab || 'properties';
});
</script>

<style scoped>
.favourites-container {
  width: 100%;
  margin: 0;
  padding: 0;
  font-family: 'Inter', sans-serif;
  background-color: #f8fafc;
  min-height: 100vh;
}

.main-content {
  margin-left: 0;
  padding: 0;
  max-width: 1440px;
  margin: 0 auto;
}

/* Favourite section styling */
.favourite-section {
  margin: 24px;
  background: linear-gradient(135deg, #0a4d8c 0%, #1a4189 100%);
  border-radius: 24px;
  padding: 24px 40px;
  position: relative;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  min-height: 120px;
  overflow: hidden;
}

.favourite-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E");
  opacity: 0.5;
}

.favourite-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 2;
}

.favourite-header {
  color: white;
  max-width: 60%;
}

.favourite-header h2 {
  font-size: 32px;
  font-weight: 800;
  margin-bottom: 6px;
  letter-spacing: -0.8px;
  line-height: 1.2;
  background: linear-gradient(to right, #ffffff, rgba(255, 255, 255, 0.8));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.favourite-header p {
  font-size: 15px;
  opacity: 0.9;
  margin: 0;
  font-weight: 500;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.tabs {
  display: flex;
  gap: 12px;
  align-items: center;
}

.tab-button {
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(8px);
}

.tab-button:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
  color: white;
}

.tab-button.active {
  background: white;
  color: #0a4d8c;
  border-color: white;
  font-weight: 600;
}

.heart-image {
  position: absolute;
  top: -30px;
  right: -30px;
  z-index: 1;
  pointer-events: none;
  opacity: 0.1;
  transform: rotate(-15deg);
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
}

.heart-image svg {
  width: 120px;
  height: 120px;
}

.filter-options {
  display: flex;
  gap: 16px;
  margin: 24px;
  align-items: center;
  background: transparent;
  padding: 0;
  border-radius: 0;
  box-shadow: none;
  border: none;
  position: sticky;
  top: 0;
  z-index: 10;
  backdrop-filter: blur(8px);
}

.network-filters {
  display: flex;
  gap: 8px;
  margin-right: auto;
}

.filter-button {
  padding: 10px 20px;
  background-color: #f8fafc;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #64748b;
  position: relative;
  overflow: hidden;
}

.filter-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.1), transparent);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.filter-button:hover::before {
  transform: translateX(100%);
}

.filter-button:hover {
  background-color: #f1f5f9;
  color: #0f172a;
  transform: translateY(-1px);
}

.filter-button.active {
  background-color: #0f172a;
  color: white;
  font-weight: 600;
}

.search-box {
  max-width: 300px;
  margin-left: auto;
}

.search-box input {
  width: 100%;
  padding: 12px 44px 12px 20px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  font-size: 14px;
  background-color: white;
  transition: all 0.2s ease;
  color: #0f172a;
}

.search-box input:focus {
  outline: none;
  border-color: #94a3b8;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08);
}

.keyboard-shortcut {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 12px;
  color: #94a3b8;
  font-weight: 500;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  padding: 4px 8px;
  border-radius: 6px;
}

.agents-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0;
  margin: 24px;
}

.agent-card {
  background: white;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  width: 100%;
}

.agent-card:hover {
  border-color: #cbd5e1;
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.08);
}

.agent-info {
  padding: 24px;
  display: flex;
  gap: 24px;
  align-items: center;
}

.agent-avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  position: relative;
}

.agent-avatar::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
}

.agent-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.agent-card:hover .agent-avatar img {
  transform: scale(1.05);
}

.agent-details {
  flex: 1;
  min-width: 0;
}

.agent-details h3 {
  font-size: 18px;
  font-weight: 600;
  color: #0f172a;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.experience {
  font-size: 14px;
  color: #64748b;
  font-weight: 500;
}

.agent-meta {
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #64748b;
  font-size: 14px;
  padding: 6px 12px;
  background: #f8fafc;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.meta-item:hover {
  background: #f1f5f9;
  color: #0f172a;
}

.meta-item svg {
  width: 16px;
  height: 16px;
  color: #64748b;
  transition: color 0.2s ease;
}

.meta-item:hover svg {
  color: #0f172a;
}

.agent-actions {
  display: flex;
  gap: 12px;
  margin-top: 16px;
}

.view-profile-btn,
.remove-favorite-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.view-profile-btn {
  background: #0a4d8c;
  color: white;
  border: none;
}

.view-profile-btn:hover {
  background: #083b6f;
  transform: translateY(-1px);
}

.view-profile-btn svg {
  width: 16px;
  height: 16px;
}

.remove-favorite-btn {
  background: white;
  color: #ef4444;
  border: 1px solid #ef4444;
}

.remove-favorite-btn:hover {
  background: #fef2f2;
  transform: translateY(-1px);
}

.remove-favorite-btn svg {
  width: 16px;
  height: 16px;
}

/* Empty state enhancements */
.empty-state {
  text-align: center;
  padding: 64px 24px;
  background: white;
  border-radius: 20px;
  margin: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
}

.empty-state .empty-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 24px;
  color: #94a3b8;
  opacity: 0.5;
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}

.empty-state h3 {
  font-size: 24px;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 12px;
}

.empty-state p {
  color: #64748b;
  margin-bottom: 32px;
  font-size: 16px;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

.browse-btn {
  display: inline-flex;
  align-items: center;
  padding: 12px 24px;
  background: #0f172a;
  color: white;
  border-radius: 12px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
  gap: 8px;
}

.browse-btn:hover {
  background: #1e293b;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.15);
}

.browse-btn svg {
  width: 18px;
  height: 18px;
  margin-right: 4px;
}

.properties-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  padding: 0;
  margin: 24px;
}

.property-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid #f1f5f9;
}

.property-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.property-image {
  position: relative;
  height: 240px;
  overflow: hidden;
}

.property-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.property-card:hover .property-image img {
  transform: scale(1.05);
}

.property-badge {
  position: absolute;
  top: 16px;
  left: 16px;
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  color: #0a4d8c;
  backdrop-filter: blur(4px);
}

.property-info {
  padding: 24px;
}

.price {
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 8px;
}

.property-name {
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 8px;
}

.location {
  font-size: 14px;
  color: #64748b;
  margin-bottom: 16px;
}

.specs {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
}

.spec {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #64748b;
  font-size: 14px;
}

.property-actions {
  display: flex;
  gap: 12px;
  padding: 16px 24px;
  background: #f8fafc;
  border-top: 1px solid #f1f5f9;
}

.action-button {
  flex: 1;
  padding: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;
}

.view-button {
  background: #0a4d8c;
  color: white;
  border-color: #0a4d8c;
}

.view-button:hover {
  background: #083b6f;
}

.schedule-button {
  background: white;
  color: #64748b;
}

.schedule-button:hover {
  border-color: #0a4d8c;
  color: #0a4d8c;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .agent-card {
    flex-direction: column;
    align-items: flex-start;
  }

  .agent-actions {
    margin-top: 16px;
    width: 100%;
  }

  .search-box {
    width: 100%;
    margin-top: 12px;
    margin-left: 0;
  }

  .search-box input {
    width: 100%;
  }

  .filter-options {
    flex-direction: column;
    align-items: stretch;
  }

  .network-filters {
    width: 100%;
    justify-content: center;
  }

  .favourite-section,
  .filter-options,
  .agents-grid,
  .empty-state,
  .properties-grid {
    margin: 16px;
  }
}
</style>
