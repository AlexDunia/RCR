<template>
  <div class="client-favorites">
    <h1>Your Saved Properties here</h1>

    <div class="favorites-empty" v-if="properties.length === 0">
      <div class="empty-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      </div>
      <h2>No Saved Properties Yet</h2>
      <p>Properties you save will appear here so you can easily find them later.</p>
      <router-link to="/client/properties" class="browse-btn">Browse Properties</router-link>
    </div>

    <div class="properties-grid" v-else>
      <div v-for="(property, index) in properties" :key="index" class="property-card">
        <div class="property-image" :style="{ backgroundImage: `url(${property.image})` }">
          <div class="property-badge">{{ property.status }}</div>
          <button class="favorite-btn active" @click="removeFromFavorites(property.id)">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
        </div>
        <div class="property-details">
          <div class="property-price">${{ property.price.toLocaleString() }}</div>
          <div class="property-address">{{ property.address }}</div>
          <div class="property-features">
            <div class="feature">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              <span>{{ property.bedrooms }} bd</span>
            </div>
            <div class="feature">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 4h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2zm0 8h14"></path>
              </svg>
              <span>{{ property.bathrooms }} ba</span>
            </div>
            <div class="feature">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2"></rect>
              </svg>
              <span>{{ property.sqft.toLocaleString() }} sqft</span>
            </div>
          </div>
        </div>
        <div class="property-actions">
          <router-link :to="`/client/properties/${property.id}`" class="view-btn">View Details</router-link>
          <button class="schedule-btn">Schedule Tour</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, defineComponent } from 'vue';

// Define component name
defineComponent({
  name: 'ClientFavorites'
});

// Sample saved properties data
const properties = reactive([
  {
    id: 1,
    address: '123 Main Street, San Francisco, CA',
    price: 1250000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1750,
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    status: 'For Sale'
  },
  {
    id: 3,
    address: '789 Pine Road, San Diego, CA',
    price: 1450000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2100,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    status: 'New'
  }
]);

// Function to remove property from favorites
const removeFromFavorites = (id) => {
  const index = properties.findIndex(property => property.id === id);
  if (index !== -1) {
    properties.splice(index, 1);
  }
};
</script>

<style scoped>
.client-favorites {
  padding: 24px;
}

h1 {
  font-size: 28px;
  margin-bottom: 24px;
  color: #2c3e50;
}

.favorites-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 60px 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

.empty-icon {
  margin-bottom: 24px;
  color: #bdc3c7;
}

.favorites-empty h2 {
  font-size: 24px;
  margin-bottom: 12px;
  color: #2c3e50;
}

.favorites-empty p {
  font-size: 16px;
  color: #7f8c8d;
  margin-bottom: 24px;
  max-width: 400px;
}

.browse-btn {
  padding: 12px 24px;
  background-color: #006064;
  color: white;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.2s;
}

.browse-btn:hover {
  background-color: #00474a;
}

.properties-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}

.property-card {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s, box-shadow 0.3s;
}

.property-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12);
}

.property-image {
  height: 200px;
  background-size: cover;
  background-position: center;
  position: relative;
}

.property-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 6px 12px;
  background-color: #006064;
  color: white;
  font-size: 12px;
  font-weight: 600;
  border-radius: 4px;
}

.favorite-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  background-color: white;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.favorite-btn svg {
  stroke: #ff4757;
}

.favorite-btn.active svg {
  fill: #ff4757;
  stroke: #ff4757;
}

.property-details {
  padding: 16px;
}

.property-price {
  font-size: 24px;
  font-weight: 700;
  color: #006064;
  margin-bottom: 8px;
}

.property-address {
  font-size: 16px;
  color: #4a4a4a;
  margin-bottom: 16px;
  line-height: 1.4;
}

.property-features {
  display: flex;
  gap: 16px;
  color: #666;
  margin-bottom: 16px;
}

.feature {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
}

.property-actions {
  display: flex;
  padding: 16px;
  border-top: 1px solid #f0f0f0;
  gap: 8px;
}

.view-btn, .schedule-btn {
  flex: 1;
  padding: 10px 0;
  text-align: center;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.view-btn {
  background-color: white;
  border: 1px solid #006064;
  color: #006064;
  text-decoration: none;
}

.view-btn:hover {
  background-color: #f0f7f7;
}

.schedule-btn {
  background-color: #006064;
  border: none;
  color: white;
}

.schedule-btn:hover {
  background-color: #00474a;
}
</style>
