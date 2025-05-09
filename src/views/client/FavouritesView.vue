<template>
  <div class="favourites-container">
    <!-- Hero section with background image -->
    <div class="hero-section">
      <div class="hero-content">
        <h1>Your Favourites</h1>
        <p>All your saved properties in one place</p>
      </div>
    </div>

    <!-- Property header with background image -->
    <div class="property-header" :style="headerBackgroundStyle">
      <div class="overlay"></div>
      <div class="property-header-content">
        <h2>Saved Properties</h2>
        <p>Properties you've saved to look at later</p>
      </div>
    </div>

    <div class="favourites-content">
      <div class="favourites-empty" v-if="savedProperties.length === 0">
        <div class="empty-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </div>
        <h2>No Saved Properties Yet</h2>
        <p>Properties you save will appear here so you can easily find them later.</p>
        <router-link to="/client-properties" class="browse-btn">Browse Properties</router-link>
      </div>

      <div class="properties-grid" v-else>
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
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { usePropertyStore } from '@/stores/propertyStore';

const router = useRouter();
const propertyStore = usePropertyStore();

// Background for header
const headerBackgroundStyle = computed(() => ({
  backgroundImage: `url('https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548295/realestate-favourites_asdf123.jpg')`
}));

// Get saved properties from store
const savedProperties = computed(() => propertyStore.favoriteProperties);

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
}

/* Hero section styling */
.hero-section {
  height: 110px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: #333;
  text-align: left;
  margin-bottom: 0;
  padding: 0 24px;
  border-bottom: 1px solid #eaeaea;
}

.hero-content {
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
}

.hero-content h1 {
  font-size: 28px;
  font-weight: 600;
  margin: 0 0 6px;
  color: #333;
}

.hero-content p {
  font-size: 14px;
  margin: 0;
  color: #666;
  opacity: 0.9;
}

/* Property header styling */
.property-header {
  height: 240px;
  position: relative;
  background-image: url('https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548295/realestate-favourites_asdf123.jpg');
  background-position: center;
  background-size: cover;
  margin-bottom: 30px;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.property-header-content {
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  color: white;
  padding: 0 40px;
  max-width: 1400px;
  margin: 0 auto;
}

.property-header-content h2 {
  font-size: 34px;
  font-weight: 600;
  margin: 0 0 10px;
}

.property-header-content p {
  font-size: 16px;
  margin: 0;
}

.favourites-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
}

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

.favorite-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 36px;
  height: 36px;
  background: white;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

.favorite-btn:hover {
  transform: scale(1.1);
}

.favorite-btn svg {
  stroke: #ff4757;
}

.favorite-btn.active svg {
  fill: #ff4757;
  stroke: #ff4757;
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
  .hero-section {
    height: 100px;
    padding: 0 16px;
  }

  .hero-content h1 {
    font-size: 24px;
  }

  .property-header {
    height: 180px;
  }

  .property-header-content {
    padding: 0 16px;
  }

  .property-header-content h2 {
    font-size: 28px;
  }

  .favourites-content {
    padding: 0 16px;
  }

  .properties-grid {
    grid-template-columns: 1fr;
  }
}
</style>
