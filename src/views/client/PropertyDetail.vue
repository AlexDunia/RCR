<template>
  <div class="property-detail">
    <div class="back-nav">
      <router-link to="/client/properties" class="back-link">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Back to Properties
      </router-link>
    </div>

    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Loading property details...</p>
    </div>

    <div v-else-if="!propertyData" class="error-state">
      <p>Property not found. The property may have been removed or you don't have access.</p>
      <router-link to="/client/properties" class="btn-primary">View All Properties</router-link>
    </div>

    <template v-else>
      <div class="property-header">
        <h1>{{ propertyData.address }}</h1>
        <div class="property-price">${{ formatPrice(propertyData.price) }}</div>
      </div>

      <div class="property-gallery">
        <div class="main-image" :style="{ backgroundImage: `url(${mainImage})` }">
          <button class="favorite-btn" :class="{ active: isFavorite }" @click="toggleFavorite">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
        </div>
        <div class="thumbnail-images">
          <div
            v-for="(image, index) in propertyImages"
            :key="index"
            class="thumbnail"
            :style="{ backgroundImage: `url(${image})` }"
            @click="setMainImage(image)"
          ></div>
        </div>
      </div>

      <div class="property-content">
        <div class="property-main">
          <div class="property-section">
            <div class="property-overview">
              <div class="overview-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                <div class="overview-content">
                  <div class="overview-value">{{ propertyData.bedrooms }}</div>
                  <div class="overview-label">Bedrooms</div>
                </div>
              </div>
              <div class="overview-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 4h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2zm0 8h14"></path>
                </svg>
                <div class="overview-content">
                  <div class="overview-value">{{ propertyData.bathrooms }}</div>
                  <div class="overview-label">Bathrooms</div>
                </div>
              </div>
              <div class="overview-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                </svg>
                <div class="overview-content">
                  <div class="overview-value">{{ formatNumber(propertyData.size || 0) }}</div>
                  <div class="overview-label">Square Feet</div>
                </div>
              </div>
              <div class="overview-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <path d="M3 9h18"></path>
                </svg>
                <div class="overview-content">
                  <div class="overview-value">{{ propertyData.type }}</div>
                  <div class="overview-label">Property Type</div>
                </div>
              </div>
            </div>
          </div>

          <div class="property-section">
            <h2 class="section-title">About This Property</h2>
            <p class="property-description">{{ propertyData.description }}</p>
          </div>

          <div class="property-section">
            <h2 class="section-title">Features</h2>
            <div class="features-list">
              <div v-for="(feature, index) in propertyFeatures" :key="index" class="feature-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                {{ feature }}
              </div>
            </div>
          </div>
        </div>

        <div class="property-sidebar">
          <div class="contact-card">
            <div class="agent-profile">
              <img :src="agentPhoto" :alt="agentName" class="agent-photo" />
              <div class="agent-info">
                <div class="agent-name">{{ agentName }}</div>
                <div class="agent-title">Real Estate Agent</div>
              </div>
            </div>
            <div class="contact-methods">
              <a :href="`tel:${agentPhone}`" class="contact-btn call-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                Call
              </a>
              <a :href="`mailto:${agentEmail}`" class="contact-btn email-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                Email
              </a>
            </div>

            <div class="schedule-tour">
              <button class="tour-btn" @click="scheduleTour">Schedule a Tour</button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { usePropertyStore } from '@/stores/propertyStore';
import { useRoleStore } from '@/stores/roleStore';

// Get route and extract property ID
const route = useRoute();
const propertyId = route.params.id;

// Initialize stores
const propertyStore = usePropertyStore();
const roleStore = useRoleStore();

// Set up reactive state
const loading = ref(true);
const isFavorite = ref(false);
const mainImage = ref('');

// Get property data from store
const propertyData = computed(() => {
  return propertyStore.properties.find(p => p.id == propertyId);
});

// Computed properties for the view
const propertyImages = computed(() => {
  if (!propertyData.value) return [];
  // If there are multiple images in an array, use those
  if (propertyData.value.images && Array.isArray(propertyData.value.images)) {
    return propertyData.value.images;
  }
  // Otherwise create an array with the main image
  return propertyData.value.image ? [propertyData.value.image] : [];
});

const propertyFeatures = computed(() => {
  if (!propertyData.value) return [];
  // If features is defined and is an array, use it
  if (propertyData.value.features && Array.isArray(propertyData.value.features)) {
    return propertyData.value.features;
  }
  // Otherwise create default features based on property data
  return [
    `${propertyData.value.bedrooms} Bedrooms`,
    `${propertyData.value.bathrooms} Bathrooms`,
    `${formatNumber(propertyData.value.size || 0)} Square Feet`,
    propertyData.value.type || 'Residential Property',
    propertyData.value.location || 'Great Location',
    'Modern Amenities'
  ];
});

// Agent information
const agentName = computed(() => {
  if (propertyData.value && propertyData.value.agent) {
    return propertyData.value.agent.name;
  }
  return 'Contact Agent';
});

const agentPhoto = computed(() => {
  if (propertyData.value && propertyData.value.agent && propertyData.value.agent.photo) {
    return propertyData.value.agent.photo;
  }
  return 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80';
});

const agentPhone = computed(() => {
  if (propertyData.value && propertyData.value.agent && propertyData.value.agent.phone) {
    return propertyData.value.agent.phone;
  }
  return '(555) 123-4567';
});

const agentEmail = computed(() => {
  if (propertyData.value && propertyData.value.agent && propertyData.value.agent.email) {
    return propertyData.value.agent.email;
  }
  return 'contact@realcityrealty.com';
});

// Helper methods
const formatPrice = (price) => {
  if (!price) return '0';
  return price.toLocaleString();
};

const formatNumber = (num) => {
  if (!num) return '0';
  return num.toLocaleString();
};

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value;
  // In a real app, you would update this state in a backend or store
  console.log(`Property ${propertyId} favorite status: ${isFavorite.value}`);
};

const setMainImage = (imageUrl) => {
  mainImage.value = imageUrl;
};

const scheduleTour = () => {
  alert(`Tour scheduling for property ${propertyId}. This feature is coming soon!`);
};

// Lifecycle hooks
onMounted(async () => {
  // Ensure user is in client role
  if (roleStore.currentRole !== 'client') {
    roleStore.currentRole = 'client';
  }

  try {
    // If needed, fetch property data - assuming it might already be in the store
    // If your store doesn't auto-fetch, uncomment the following:
    // await propertyStore.fetchProperties();

    // Set the main image to display
    if (propertyData.value) {
      // Use the first image or the main image property
      mainImage.value = propertyData.value.image ||
                         (propertyData.value.images && propertyData.value.images.length > 0
                          ? propertyData.value.images[0] : '');
    }
  } catch (error) {
    console.error('Error fetching property details:', error);
  } finally {
    loading.value = false;
  }

  // If no property found after loading, we might want to show an error
  if (!loading.value && !propertyData.value) {
    console.error(`Property with ID ${propertyId} not found`);
  }
});
</script>

<style scoped>
.property-detail {
  max-width: 100%;
  margin: 0;
}

.back-nav {
  margin-bottom: 24px;
}

.back-link {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #0a4d8c;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.back-link:hover {
  color: #0b3b6b;
}

.loading-state, .error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 96, 100, 0.1);
  border-left-color: #006064;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-state p {
  margin-bottom: 20px;
  color: #d32f2f;
}

.btn-primary {
  display: inline-block;
  padding: 10px 20px;
  background-color: #006064;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 500;
  transition: background-color 0.2s;
}

.btn-primary:hover {
  background-color: #00474a;
}

.property-header {
  margin-bottom: 24px;
}

.property-header h1 {
  font-size: 28px;
  margin: 0 0 8px 0;
  color: #2c3e50;
}

.property-price {
  font-size: 24px;
  font-weight: 700;
  color: #006064;
}

.property-gallery {
  margin-bottom: 24px;
}

.main-image {
  height: 400px;
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  margin-bottom: 8px;
  position: relative;
}

.favorite-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: all 0.2s;
}

.favorite-btn svg {
  color: #bdc3c7;
  transition: all 0.2s;
}

.favorite-btn.active svg {
  color: #ff4757;
  fill: #ff4757;
}

.favorite-btn:hover {
  transform: scale(1.1);
}

.thumbnail-images {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 8px;
}

.thumbnail {
  width: 100px;
  height: 80px;
  flex-shrink: 0;
  background-size: cover;
  background-position: center;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.thumbnail:hover {
  opacity: 0.8;
}

.property-content {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 24px;
}

.property-section {
  margin-bottom: 32px;
}

.section-title {
  font-size: 20px;
  margin: 0 0 16px 0;
  color: #2c3e50;
}

.property-overview {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 16px;
  background-color: #f8f9fa;
  padding: 24px;
  border-radius: 8px;
}

.overview-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.overview-item svg {
  color: #006064;
}

.overview-content {
  display: flex;
  flex-direction: column;
}

.overview-value {
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
}

.overview-label {
  font-size: 14px;
  color: #7f8c8d;
}

.property-description {
  font-size: 16px;
  line-height: 1.6;
  color: #34495e;
}

.features-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 0;
  color: #34495e;
}

.feature-item svg {
  color: #006064;
}

.property-sidebar {
  position: sticky;
  top: 24px;
}

.contact-card {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 24px;
  border: 1px solid #e1e1e1;
}

.agent-profile {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.agent-photo {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
}

.agent-name {
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
}

.agent-title {
  font-size: 14px;
  color: #7f8c8d;
}

.contact-methods {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 24px;
}

.contact-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.2s;
}

.call-btn {
  background-color: #e3f2fd;
  color: #1976d2;
}

.call-btn:hover {
  background-color: #bbdefb;
}

.email-btn {
  background-color: #e8f5e9;
  color: #388e3c;
}

.email-btn:hover {
  background-color: #c8e6c9;
}

.tour-btn {
  width: 100%;
  padding: 12px;
  background-color: #006064;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.tour-btn:hover {
  background-color: #00474a;
}

@media (max-width: 1024px) {
  .property-content {
    grid-template-columns: 1fr;
  }

  .property-sidebar {
    position: static;
    margin-top: 24px;
  }
}

@media (max-width: 768px) {
  .property-overview {
    grid-template-columns: repeat(2, 1fr);
  }

  .features-list {
    grid-template-columns: 1fr;
  }

  .main-image {
    height: 300px;
  }
}

@media (max-width: 480px) {
  .property-detail {
    padding: 16px;
  }

  .main-image {
    height: 250px;
  }

  .property-header h1 {
    font-size: 24px;
  }

  .thumbnail {
    width: 80px;
    height: 60px;
  }
}
</style>
