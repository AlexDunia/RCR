<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
// Import will be used when API is implemented
// import { fetchListingById } from './listingsApi';

const route = useRoute();
const router = useRouter();
const propertyId = route.params.id;
const property = ref(null);
const isLoading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    // In a real app, you'd fetch the property by ID from an API
    // const data = await fetchListingById(propertyId);
    // property.value = data;

    // Simulate API call with timeout
    setTimeout(() => {
      property.value = {
        id: propertyId,
        title: '3BR Modern House with Pool',
        price: 450000,
        address: '123 Main St, Anytown, CA 12345',
        description: 'Beautiful modern home with 3 bedrooms and 2 bathrooms. Features an open floor plan, updated kitchen with stainless steel appliances, and a backyard pool.',
        bedrooms: 3,
        bathrooms: 2,
        sqft: 2200,
        lotSize: '0.25 acres',
        yearBuilt: 2015,
        status: 'Active',
        features: [
          'Swimming Pool',
          'Hardwood Floors',
          'Central AC',
          'Garage (2 spaces)',
          'Fireplace',
          'Stainless Steel Appliances'
        ],
        images: [
          '/property-1.jpg',
          '/property-1-kitchen.jpg',
          '/property-1-living.jpg',
          '/property-1-backyard.jpg'
        ],
        agent: {
          name: 'John Smith',
          phone: '(555) 123-4567',
          email: 'john.smith@example.com'
        }
      };
      isLoading.value = false;
    }, 500);
  } catch (err) {
    console.error(`Failed to load property with ID ${propertyId}:`, err);
    error.value = 'Failed to load property details. Please try again.';
    isLoading.value = false;
  }
});

const goBack = () => {
  router.back();
};
</script>

<template>
  <div class="property-detail">
    <button class="back-button" @click="goBack">
      Back to listings
    </button>

    <div v-if="isLoading" class="loading-state">
      Loading property details...
    </div>

    <div v-else-if="error" class="error-message">
      {{ error }}
    </div>

    <div v-else-if="property" class="property-content">
      <div class="property-header">
        <div class="property-title-section">
          <h1 class="property-title">{{ property.title }}</h1>
          <p class="property-address">{{ property.address }}</p>
          <div class="property-status" :class="property.status.toLowerCase()">
            {{ property.status }}
          </div>
        </div>
        <div class="property-price">
          ${{ property.price.toLocaleString() }}
        </div>
      </div>

      <div class="property-images">
        <div class="main-image">
          <img :src="property.images[0] || '/placeholder-property.jpg'" :alt="property.title">
        </div>
        <div class="thumbnail-images">
          <div v-for="(image, index) in property.images.slice(1)" :key="index" class="thumbnail">
            <img :src="image" :alt="`${property.title} - Image ${index + 2}`">
          </div>
        </div>
      </div>

      <div class="property-details">
        <div class="property-info">
          <div class="info-card">
            <div class="info-item">
              <span class="label">Bedrooms</span>
              <span class="value">{{ property.bedrooms }}</span>
            </div>
            <div class="info-item">
              <span class="label">Bathrooms</span>
              <span class="value">{{ property.bathrooms }}</span>
            </div>
            <div class="info-item">
              <span class="label">Square Feet</span>
              <span class="value">{{ property.sqft.toLocaleString() }}</span>
            </div>
            <div class="info-item">
              <span class="label">Lot Size</span>
              <span class="value">{{ property.lotSize }}</span>
            </div>
            <div class="info-item">
              <span class="label">Year Built</span>
              <span class="value">{{ property.yearBuilt }}</span>
            </div>
          </div>
        </div>

        <div class="property-description">
          <h2>Description</h2>
          <p>{{ property.description }}</p>
        </div>

        <div class="property-features">
          <h2>Features & Amenities</h2>
          <ul class="features-list">
            <li v-for="(feature, index) in property.features" :key="index">
              {{ feature }}
            </li>
          </ul>
        </div>

        <div class="property-agent">
          <h2>Contact Agent</h2>
          <div class="agent-info">
            <div class="agent-avatar">
              <img src="/agent-placeholder.jpg" alt="Agent">
            </div>
            <div class="agent-details">
              <p class="agent-name">{{ property.agent.name }}</p>
              <p class="agent-phone">{{ property.agent.phone }}</p>
              <p class="agent-email">{{ property.agent.email }}</p>
              <button class="contact-button">Contact Agent</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.property-detail {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.back-button {
  background-color: transparent;
  color: #1976d2;
  border: none;
  padding: 10px 0;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.back-button:hover {
  text-decoration: underline;
}

.loading-state,
.error-message {
  padding: 30px;
  text-align: center;
  background-color: #f9f9f9;
  border-radius: 8px;
  margin: 20px 0;
}

.error-message {
  color: #e53935;
  background-color: #ffebee;
}

.property-content {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.property-header {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 1px solid #eee;
}

.property-title {
  margin: 0 0 5px 0;
  font-size: 24px;
  color: #333;
}

.property-address {
  margin: 0 0 10px 0;
  color: #666;
  font-size: 16px;
}

.property-status {
  display: inline-block;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
}

.property-status.active {
  background-color: #4caf50;
  color: white;
}

.property-status.pending {
  background-color: #ff9800;
  color: white;
}

.property-status.sold {
  background-color: #f44336;
  color: white;
}

.property-price {
  font-size: 28px;
  font-weight: bold;
  color: #1976d2;
}

.property-images {
  padding: 20px;
}

.main-image {
  width: 100%;
  height: 400px;
  overflow: hidden;
  border-radius: 8px;
  margin-bottom: 10px;
}

.main-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumbnail-images {
  display: flex;
  gap: 10px;
}

.thumbnail {
  width: 100px;
  height: 75px;
  overflow: hidden;
  border-radius: 4px;
  cursor: pointer;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.property-details {
  padding: 20px;
}

.info-card {
  display: flex;
  flex-wrap: wrap;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
}

.info-item {
  flex: 1;
  min-width: 150px;
  margin-bottom: 15px;
}

.info-item .label {
  display: block;
  font-size: 12px;
  font-weight: 600;
  color: #666;
  margin-bottom: 5px;
}

.info-item .value {
  font-size: 18px;
  font-weight: 700;
  color: #333;
}

.property-description,
.property-features,
.property-agent {
  margin-bottom: 30px;
}

.property-description h2,
.property-features h2,
.property-agent h2 {
  font-size: 20px;
  margin-bottom: 15px;
  color: #333;
}

.property-description p {
  line-height: 1.6;
  color: #555;
}

.features-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 10px;
  list-style-type: none;
  padding: 0;
}

.features-list li {
  padding: 8px 0;
  border-bottom: 1px solid #eee;
  color: #555;
}

.agent-info {
  display: flex;
  align-items: center;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
}

.agent-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 20px;
}

.agent-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.agent-details {
  flex: 1;
}

.agent-name {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 5px 0;
  color: #333;
}

.agent-phone,
.agent-email {
  margin: 5px 0;
  color: #666;
}

.contact-button {
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;
}

.contact-button:hover {
  background-color: #1565c0;
}

@media (max-width: 768px) {
  .property-header {
    flex-direction: column;
  }

  .property-price {
    margin-top: 10px;
  }

  .main-image {
    height: 300px;
  }

  .info-item {
    min-width: 120px;
  }
}
</style>
