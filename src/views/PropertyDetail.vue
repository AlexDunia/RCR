<template>
  <div class="property-detail">
    <div v-if="loading" class="loading-state">
      Loading property details...
    </div>
    <div v-else-if="error" class="error-state">
      {{ error }}
    </div>
    <template v-else>
      <div class="property-header">
        <div class="boxed-container">
          <h1 class="property-title">{{ property.name }}</h1>
          <div class="property-location">
            <svg class="location-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            {{ property.address }}{{ property.city ? `, ${property.city}` : '' }}{{ property.state ? `, ${property.state}` : '' }}
          </div>
        </div>
      </div>

      <div class="property-content">
        <div class="boxed-container">
          <div class="property-grid">
            <!-- Image Gallery -->
            <div class="property-gallery">
              <div class="main-image">
                <img :src="currentImage" :alt="property.name" @error="handleImageError">
              </div>
              <div class="thumbnail-grid" v-if="property.images?.length > 1">
                <button
                  v-for="(image, index) in property.images"
                  :key="index"
                  class="thumbnail"
                  :class="{ active: index === currentImageIndex }"
                  @click="currentImageIndex = index">
                  <img :src="image" :alt="`${property.name} - Image ${index + 1}`" @error="handleImageError">
                </button>
              </div>
            </div>

            <!-- Property Info -->
            <div class="property-info">
              <div class="price-section">
                <div class="property-price">${{ formatPrice(property.price) }}</div>
                <div class="property-status" :class="property.status?.toLowerCase()">
                  {{ property.status || 'For Sale' }}
                </div>
              </div>

              <div class="property-stats">
                <div class="stat-item">
                  <i class="fas fa-bed"></i>
                  <span class="stat-value">{{ property.bedrooms }}</span>
                  <span class="stat-label">Bedrooms</span>
                </div>
                <div class="stat-item">
                  <i class="fas fa-bath"></i>
                  <span class="stat-value">{{ property.bathrooms }}</span>
                  <span class="stat-label">Bathrooms</span>
                </div>
                <div class="stat-item">
                  <i class="fas fa-ruler-combined"></i>
                  <span class="stat-value">{{ property.size }}</span>
                  <span class="stat-label">Sq Ft</span>
                </div>
              </div>

              <div class="property-description">
                <h2>Description</h2>
                <p>{{ property.description }}</p>
              </div>

              <div class="property-features" v-if="property.features?.length">
                <h2>Features</h2>
                <ul class="features-list">
                  <li v-for="feature in property.features" :key="feature">
                    <i class="fas fa-check"></i>
                    {{ feature }}
                  </li>
                </ul>
              </div>

              <div class="contact-section">
                <button class="contact-btn primary">Contact Agent</button>
                <button class="contact-btn secondary">Schedule Viewing</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { usePropertyStore } from '@/stores/propertyStore';

const route = useRoute();
const propertyStore = usePropertyStore();
const loading = ref(true);
const error = ref(null);
const currentImageIndex = ref(0);

// Get property ID from route params
const propertyId = computed(() => route.params.id);

// Get current property
const property = computed(() => {
  return propertyStore.properties.find(p => p.id === propertyId.value) || {};
});

// Get current image
const currentImage = computed(() => {
  if (!property.value) return 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1743087291/Designer_8_1_fjvyi0.png';

  // Try to get images from either media.images or images field
  const images = property.value.media?.images || property.value.images || [];
  if (!images.length) {
    return 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1743087291/Designer_8_1_fjvyi0.png';
  }
  return images[currentImageIndex.value];
});

// Format price with commas
const formatPrice = (price) => {
  if (!price) return '0';
  const numericPrice = typeof price === 'number' ? price : Number(price.replace(/[^0-9.-]+/g, ''));
  return isNaN(numericPrice) ? '0' : numericPrice.toLocaleString();
};

// Handle image loading errors
function handleImageError(event) {
  event.target.src = 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1743087291/Designer_8_1_fjvyi0.png';
}

onMounted(async () => {
  try {
    loading.value = true;
    await propertyStore.fetchPropertyById(propertyId.value);
  } catch (err) {
    error.value = 'Failed to load property details';
    console.error(err);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.property-detail {
  min-height: 100vh;
  background: #f8fafc;
}

.property-header {
  background: #fff;
  padding: 40px 0;
  border-bottom: 1px solid #e2e8f0;
}

.property-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 16px 0;
}

.property-location {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
  font-size: 1.1rem;
}

.location-icon {
  width: 20px;
  height: 20px;
  color: #0052a5;
}

.property-content {
  padding: 40px 0;
}

.boxed-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.property-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 40px;
}

.property-gallery {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}

.main-image {
  width: 100%;
  height: 400px;
  overflow: hidden;
}

.main-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumbnail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 8px;
  padding: 16px;
}

.thumbnail {
  width: 100%;
  aspect-ratio: 1;
  border: none;
  padding: 0;
  cursor: pointer;
  overflow: hidden;
  border-radius: 8px;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.thumbnail.active {
  opacity: 1;
  box-shadow: 0 0 0 2px #0052a5;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.property-info {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}

.price-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.property-price {
  font-size: 2rem;
  font-weight: 700;
  color: #0052a5;
}

.property-status {
  padding: 6px 12px;
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.9rem;
}

.property-status.for-sale {
  background: #e0f2fe;
  color: #0052a5;
}

.property-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  padding: 24px 0;
  border-top: 1px solid #e2e8f0;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 24px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.stat-item i {
  font-size: 1.5rem;
  color: #0052a5;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a1a;
}

.stat-label {
  font-size: 0.9rem;
  color: #666;
}

.property-description {
  margin-bottom: 24px;
}

.property-description h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 16px 0;
}

.property-description p {
  color: #666;
  line-height: 1.6;
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.features-list li {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
}

.features-list i {
  color: #0052a5;
}

.contact-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 24px;
}

.contact-btn {
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
}

.contact-btn.primary {
  background: #0052a5;
  color: #fff;
  border: none;
}

.contact-btn.secondary {
  background: #fff;
  color: #0052a5;
  border: 2px solid #0052a5;
}

.contact-btn:hover {
  transform: translateY(-2px);
}

.loading-state,
.error-state {
  text-align: center;
  padding: 40px;
  font-size: 1.1rem;
  color: #666;
}

.error-state {
  color: #dc2626;
}

@media (max-width: 1024px) {
  .property-grid {
    grid-template-columns: 1fr;
  }

  .main-image {
    height: 300px;
  }
}

@media (max-width: 640px) {
  .property-header {
    padding: 24px 0;
  }

  .property-title {
    font-size: 1.8rem;
  }

  .property-content {
    padding: 24px 0;
  }

  .boxed-container {
    padding: 0 16px;
  }

  .main-image {
    height: 250px;
  }

  .features-list {
    grid-template-columns: 1fr;
  }

  .contact-section {
    grid-template-columns: 1fr;
  }
}
</style>
