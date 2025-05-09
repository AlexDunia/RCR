<template>
  <div class="favourites-container">
    <!-- Main content area -->
    <div class="main-content">
      <div class="header">
        <h1>Find agents</h1>
        <p>Find and filter agents</p>
      </div>

      <!-- Favourite agents section -->
      <div class="favourite-section">
        <div class="favourite-header">
          <h2>Favourite agents</h2>
          <p>Agents you like</p>
        </div>

        <div class="tabs">
          <button class="tab-button" :class="{ active: activeTab === 'properties' }" @click="activeTab = 'properties'">
            Properties
          </button>
          <button class="tab-button" :class="{ active: activeTab === 'agents' }" @click="activeTab = 'agents'">
            Agents
          </button>
        </div>

        <!-- Filter options -->
        <div class="filter-options">
          <button class="filter-button" :class="{ active: activeFilter === 'network' }" @click="activeFilter = 'network'">
            Your network
          </button>
          <button class="filter-button" :class="{ active: activeFilter === 'others' }" @click="activeFilter = 'others'">
            Others
          </button>
          <div class="search-box">
            <input type="text" placeholder="Search..." v-model="searchQuery">
            <span class="keyboard-shortcut">⌘ K</span>
          </div>
        </div>

        <!-- Agents grid -->
        <div v-if="activeTab === 'agents'" class="agents-grid">
          <div v-for="agent in filteredAgents" :key="agent.id" class="agent-card">
            <div class="agent-info">
              <div class="agent-avatar">
                <img :src="agent.avatar" :alt="agent.name">
              </div>
              <div class="agent-details">
                <h3>{{ agent.name }} <span class="experience">({{ agent.experience }})</span></h3>
                <div class="agent-location">
                  <span class="location-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </span>
                  {{ agent.location }}
                </div>
                <div class="agent-specialty">
                  <span class="specialty-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </span>
                  {{ agent.specialty }}
                </div>
              </div>
            </div>
            <div class="agent-actions">
              <button class="action-btn view-profile">
                <span class="action-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </span>
                View profile
              </button>
              <button class="action-btn request-connect">
                <span class="action-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="8.5" cy="7" r="4"></circle>
                    <line x1="20" y1="8" x2="20" y2="14"></line>
                    <line x1="23" y1="11" x2="17" y2="11"></line>
                  </svg>
                </span>
                Request to connect
              </button>
              <button class="favorite-btn" :class="{ active: agent.favorite }" @click="toggleFavorite(agent.id)">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="agent.favorite ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Properties grid (original code) -->
        <div v-if="activeTab === 'properties' && savedProperties.length === 0" class="favourites-empty">
          <div class="empty-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </div>
          <h2>No Saved Properties Yet</h2>
          <p>Properties you save will appear here so you can easily find them later.</p>
          <router-link to="/client-properties" class="browse-btn">Browse Properties</router-link>
        </div>

        <div v-if="activeTab === 'properties' && savedProperties.length > 0" class="properties-grid">
          <div v-for="property in savedProperties" :key="property.id" class="property-card">
            <div class="property-image">
              <img :src="property.image" :alt="property.name">
              <div class="property-badge">{{ property.status }}</div>
              <button class="favorite-btn active" @click="removeFromFavorites(property.id)">
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
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { usePropertyStore } from '@/stores/propertyStore';

const router = useRouter();
const propertyStore = usePropertyStore();

// Active tab state
const activeTab = ref('agents');
const activeFilter = ref('network');
const searchQuery = ref('');

// Get saved properties from store
const savedProperties = computed(() => propertyStore.favoriteProperties);

// Mock agent data
const agents = ref([
  {
    id: 1,
    name: 'James T. Whifield',
    experience: '5+ Yr of experience',
    location: 'Columbia, USA',
    specialty: 'Luxury Real Estate',
    avatar: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548295/agent1_asdf123.jpg',
    favorite: true
  },
  {
    id: 2,
    name: 'Amanda Rodriguez',
    experience: '8+ Yr of experience',
    location: 'Miami, USA',
    specialty: 'Commercial Properties',
    avatar: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548295/agent2_asdf123.jpg',
    favorite: true
  }
]);

// Filter agents based on search query
const filteredAgents = computed(() => {
  if (!searchQuery.value) return agents.value;
  const query = searchQuery.value.toLowerCase();
  return agents.value.filter(agent =>
    agent.name.toLowerCase().includes(query) ||
    agent.location.toLowerCase().includes(query) ||
    agent.specialty.toLowerCase().includes(query)
  );
});

// Toggle favorite status
const toggleFavorite = (agentId) => {
  const agent = agents.value.find(a => a.id === agentId);
  if (agent) {
    agent.favorite = !agent.favorite;
  }
};

// Remove property from favorites
const removeFromFavorites = (propertyId) => {
  propertyStore.toggleFavorite(propertyId);
};

// View property details
const viewProperty = (propertyId) => {
  router.push(`/client-property/${propertyId}`);
};

// Schedule property viewing
const scheduleViewing = (propertyId) => {
  router.push(`/client-appointments/schedule?propertyId=${propertyId}`);
};
</script>

<style scoped>
.favourites-container {
  width: 100%;
  margin: 0;
  padding: 0;
  font-family: 'Inter', sans-serif;
  background-color: #f5f7fa;
  min-height: 100vh;
}

.main-content {
  margin-left: 0; /* Sidebar should be handled by a layout component */
  padding: 0;
}

/* Header styling */
.header {
  padding: 20px 24px;
  background-color: #fff;
  border-bottom: 1px solid #eaeaea;
}

.header h1 {
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 6px;
  color: #333;
}

.header p {
  font-size: 14px;
  margin: 0;
  color: #666;
}

/* Favourite section styling */
.favourite-section {
  margin: 20px 24px;
  background-color: #e8f5f0;
  border-radius: 12px;
  padding: 20px;
}

.favourite-header {
  margin-bottom: 16px;
}

.favourite-header h2 {
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 6px;
}

.favourite-header p {
  font-size: 14px;
  margin: 0;
  color: #666;
}

/* Tabs styling */
.tabs {
  display: flex;
  gap: 6px;
  margin-bottom: 16px;
}

.tab-button {
  padding: 8px 20px;
  border: none;
  background-color: #fff;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
}

.tab-button.active {
  background-color: #0a4d8c;
  color: white;
}

/* Filter options */
.filter-options {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  align-items: center;
}

.filter-button {
  padding: 8px 16px;
  border: 1px solid #e1e4e8;
  background-color: #fff;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-button.active {
  background-color: #f0f4f8;
  border-color: #c8d1e0;
}

.search-box {
  margin-left: auto;
  position: relative;
}

.search-box input {
  padding: 8px 36px 8px 12px;
  border: 1px solid #e1e4e8;
  border-radius: 4px;
  font-size: 14px;
  width: 240px;
  background-color: #fff;
}

.keyboard-shortcut {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 12px;
  color: #999;
  background-color: #f0f4f8;
  padding: 2px 6px;
  border-radius: 3px;
}

/* Agents grid */
.agents-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

.agent-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.agent-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.agent-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
}

.agent-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.agent-details h3 {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 6px;
}

.experience {
  font-weight: normal;
  color: #666;
  font-size: 14px;
}

.agent-location, .agent-specialty {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #666;
  margin-bottom: 4px;
}

.location-icon, .specialty-icon {
  color: #777;
}

.agent-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #e1e4e8;
  background-color: #fff;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.view-profile {
  color: #0a4d8c;
}

.request-connect {
  background-color: #0a4d8c;
  color: white;
  border-color: #0a4d8c;
}

.favorite-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e1e4e8;
  background-color: #fff;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #ff3b30;
}

.favorite-btn.active {
  background-color: #fff8f8;
  border-color: #ffcccb;
}

.favorite-btn svg {
  stroke: #ff3b30;
}

.favorite-btn.active svg {
  fill: #ff3b30;
}

/* Preserve property styling from original */
.favourites-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 60px 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  margin: 30px 0;
}

.empty-icon {
  margin-bottom: 24px;
  color: #bdc3c7;
}

.favourites-empty h2 {
  font-size: 24px;
  margin-bottom: 12px;
  color: #2c3e50;
}

.favourites-empty p {
  font-size: 16px;
  color: #7f8c8d;
  margin-bottom: 24px;
  max-width: 400px;
}

.browse-btn {
  padding: 12px 24px;
  background-color: #0a4d8c;
  color: white;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.2s;
}

.browse-btn:hover {
  background-color: #083c6d;
}

.properties-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.property-card {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  background-color: white;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  border: 1px solid #f0f0f0;
}

.property-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
}

.property-image {
  position: relative;
  height: 200px;
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
  top: 12px;
  left: 12px;
  padding: 6px 12px;
  background-color: #0a4d8c;
  color: white;
  font-size: 12px;
  font-weight: 600;
  border-radius: 4px;
}

.property-info {
  padding: 16px;
}

.price {
  font-weight: 700;
  font-size: 18px;
  color: #0a4d8c;
  margin: 0 0 8px;
}

.property-name {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 4px;
  color: #333;
  line-height: 1.4;
}

.location {
  color: #666;
  font-size: 14px;
  margin: 0 0 12px;
}

.specs {
  display: flex;
  gap: 14px;
  margin-bottom: 16px;
}

.spec {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #666;
}

.spec svg {
  color: #0a4d8c;
}

.property-actions {
  display: flex;
  gap: 10px;
}

.action-button {
  flex: 1;
  height: 36px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  text-align: center;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.view-button {
  background-color: transparent;
  border: 1px solid #0a4d8c;
  color: #0a4d8c;
}

.view-button:hover {
  background-color: rgba(10, 77, 140, 0.05);
}

.schedule-button {
  background-color: #0a4d8c;
  border: 1px solid #0a4d8c;
  color: white;
}

.schedule-button:hover {
  background-color: #0b3b6b;
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
    flex-wrap: wrap;
  }
}
</style>
