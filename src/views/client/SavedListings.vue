<script setup>
import { computed } from 'vue';
import { useClientStore } from '@/stores/clientStore';

const clientStore = useClientStore();

// Mock client ID
const clientId = 1;

// Get client details with saved listings
const clientDetails = computed(() => {
  return clientStore.getClientFullDetails(clientId);
});

// Get saved listings
const savedListings = computed(() => {
  return clientDetails.value?.interactions?.mostSavedListings || [];
});

// Format price for display
const formatPrice = (price) => {
  return price.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
};
</script>

<template>
  <div class="saved-listings">
    <div class="page-header">
      <h1>Saved Listings</h1>
      <p class="subtitle">Properties you've saved for future reference</p>
    </div>

    <div class="listings-container" v-if="savedListings.length > 0">
      <div class="listings-grid">
        <div class="property-card" v-for="property in savedListings" :key="property.id">
          <div class="property-image" :style="{ backgroundImage: `url(${property.images[0]})` }">
            <div class="property-price">{{ formatPrice(property.price) }}</div>
            <button class="remove-button">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
          <div class="property-info">
            <h3>{{ property.address }}</h3>
            <p class="property-specs">
              {{ property.bedrooms }} bd | {{ property.bathrooms }} ba | {{ property.sqft.toLocaleString() }} sqft
            </p>
            <p class="property-location">{{ property.city }}, {{ property.state }}</p>
            <div class="property-actions">
              <button class="view-button">View Details</button>
              <button class="schedule-button">Schedule Tour</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="empty-state" v-else>
      <h3>No saved properties</h3>
      <p>Save properties you're interested in to keep track of them</p>
      <router-link to="/property-search" class="primary-button">Find Properties</router-link>
    </div>
  </div>
</template>

<style scoped>
.saved-listings {
  padding: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 24px;
}

.page-header h1 {
  font-size: 28px;
  margin: 0;
  color: #333;
}

.subtitle {
  color: #666;
  margin: 8px 0 0 0;
  font-size: 16px;
}

.listings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

.property-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s, box-shadow 0.2s;
}

.property-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.property-image {
  height: 200px;
  background-size: cover;
  background-position: center;
  position: relative;
}

.property-price {
  position: absolute;
  bottom: 12px;
  left: 12px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 4px 10px;
  border-radius: 4px;
  font-weight: 500;
}

.remove-button {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(255, 255, 255, 0.9);
  color: #666;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
}

.remove-button:hover {
  background: white;
  color: #f44336;
}

.property-info {
  padding: 20px;
}

.property-info h3 {
  font-size: 16px;
  margin: 0 0 8px 0;
  color: #333;
  font-weight: 500;
}

.property-specs,
.property-location {
  margin: 4px 0;
  font-size: 14px;
  color: #666;
  line-height: 1.4;
}

.property-actions {
  display: flex;
  gap: 10px;
  margin-top: 16px;
}

.view-button,
.schedule-button {
  padding: 8px 0;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  flex: 1;
  transition: background-color 0.2s;
}

.view-button {
  background: #f0f0f0;
  color: #333;
}

.view-button:hover {
  background: #e0e0e0;
}

.schedule-button {
  background: #006064;
  color: white;
}

.schedule-button:hover {
  background: #00796b;
}

.empty-state {
  background: white;
  border-radius: 12px;
  padding: 40px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.empty-state h3 {
  margin: 0 0 8px 0;
  font-size: 18px;
  color: #333;
}

.empty-state p {
  margin: 0 0 20px 0;
  color: #666;
}

.primary-button {
  display: inline-block;
  background: #006064;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.2s;
}

.primary-button:hover {
  background: #00796b;
}

@media (max-width: 768px) {
  .listings-grid {
    grid-template-columns: 1fr;
  }
}
</style>
