<template>
  <div class="all-properties">
    <div class="page-header">
      <div class="boxed-container">
        <h1 class="page-title">All Properties</h1>
      </div>
    </div>

    <section class="properties-section">
      <div class="boxed-container">
        <div v-if="propertyStore.loading" class="loading-state">
          Loading properties...
        </div>
        <div v-else-if="propertyStore.error" class="error-state">
          {{ propertyStore.error }}
        </div>
        <div v-else-if="properties.length === 0" class="empty-state">
          No properties available at the moment.
        </div>
        <div v-else class="properties-grid">
          <router-link
            v-for="property in properties"
            :key="property.id"
            :to="`/property/${property.id}`"
            class="property-card">
            <div class="property-card__image-carousel">
              <img v-if="!property.images?.length"
                   src="https://res.cloudinary.com/dnuhjsckk/image/upload/v1743087291/Designer_8_1_fjvyi0.png"
                   :alt="property.name"
                   class="property-card__img"
                   loading="lazy">
              <template v-else>
                <img :src="property.images[0]"
                     :alt="property.name"
                     class="property-card__img"
                     loading="lazy"
                     @error="handleImageError">
              </template>
            </div>
            <div class="property-card__content">
              <h3 class="property-card__title">{{ property.name || 'Beautiful Property' }}</h3>
              <div class="property-card__price">${{ formatPrice(property.price) }}</div>
              <div class="property-card__address">
                <svg class="property-card__address-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                {{ property.address }}{{ property.city ? `, ${property.city}` : '' }}{{ property.state ? `, ${property.state}` : '' }}
              </div>
              <div class="property-card__details">
                <span class="detail-item">
                  <i class="fas fa-bed"></i> {{ property.bedrooms }} beds
                </span>
                <span class="detail-item">
                  <i class="fas fa-bath"></i> {{ property.bathrooms }} baths
                </span>
                <span class="detail-item">
                  <i class="fas fa-ruler-combined"></i> {{ property.size }} sqft
                </span>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { usePropertyStore } from '@/stores/propertyStore';

const propertyStore = usePropertyStore();

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

// Get all properties
const properties = computed(() => {
  return propertyStore.properties || [];
});

onMounted(async () => {
  await propertyStore.fetchProperties();
});
</script>

<style scoped>
.all-properties {
  min-height: 100vh;
  background: #f8fafc;
}

.page-header {
  background: #fff;
  padding: 40px 0;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 40px;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
}

.properties-section {
  padding: 0 0 64px 0;
}

.boxed-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.properties-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.property-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  border: 1px solid #e2e8f0;
}

.property-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

.property-card__img {
  width: 100%;
  height: 240px;
  object-fit: cover;
}

.property-card__content {
  padding: 20px;
}

.property-card__title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 8px 0;
}

.property-card__price {
  font-size: 1.5rem;
  font-weight: 700;
  color: #0052a5;
  margin: 0 0 12px 0;
}

.property-card__address {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 12px;
}

.property-card__address-icon {
  width: 16px;
  height: 16px;
  color: #0052a5;
}

.property-card__details {
  display: flex;
  gap: 16px;
  color: #666;
  font-size: 0.9rem;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #e2e8f0;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

.detail-item i {
  color: #0052a5;
  font-size: 1rem;
}

.loading-state,
.error-state,
.empty-state {
  text-align: center;
  padding: 40px;
  font-size: 1.1rem;
  color: #666;
}

.error-state {
  color: #dc2626;
}

@media (max-width: 1024px) {
  .properties-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .properties-grid {
    grid-template-columns: 1fr;
  }

  .page-header {
    padding: 24px 0;
    margin-bottom: 24px;
  }

  .page-title {
    font-size: 1.8rem;
  }

  .boxed-container {
    padding: 0 16px;
  }
}
</style>
