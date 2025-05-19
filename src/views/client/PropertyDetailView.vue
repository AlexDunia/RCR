<template>
  <div class="property-detail-page">
    <div class="header">
      <button @click="goBack" class="back-button">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        <span>Back to My Properties</span>
      </button>
      <div class="header-subtitle">Property Details</div>

      <div class="header-actions">
        <button class="icon-button favorite-button" :class="{ active: isFavorite }" @click="toggleFavorite">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
        <button class="icon-button share-button" @click="shareProperty">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="18" cy="5" r="3"/>
            <circle cx="6" cy="12" r="3"/>
            <circle cx="18" cy="19" r="3"/>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
          </svg>
        </button>
        <div class="client-avatar" @click="router.push('/client-dashboard')">
          <div class="avatar-circle">CD</div>
          <span class="client-name">Client User</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </div>
      </div>
    </div>

    <div v-if="isLoading" class="loading-state">
      <div class="loader"></div>
      <p>Loading property details...</p>
    </div>

    <div v-else-if="!property" class="error-state">
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      <h3>Property Not Found</h3>
      <p>The property you're looking for doesn't exist or you don't have permission to view it.</p>
      <button class="primary-button" @click="router.push('/client-properties')">View All Properties</button>
    </div>

    <div v-else class="property-content">
      <div class="image-gallery">
        <div class="main-image">
          <img :src="currentImage" :alt="property.name" class="property-image" />
          <div class="image-navigation">
            <button @click="prevImage" class="nav-button prev" :disabled="currentImageIndex === 0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button @click="nextImage" class="nav-button next" :disabled="currentImageIndex >= property.images.length - 1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
        <div class="thumbnails">
          <img
            v-for="(image, index) in property.images"
            :key="index"
            :src="image"
            :alt="`${property.name} thumbnail ${index + 1}`"
            :class="{ active: currentImageIndex === index }"
            @click="setCurrentImage(index)"
            class="thumbnail"
          />
        </div>
      </div>

      <div class="property-details-container">
        <div class="property-header">
          <div class="property-title-section">
            <h1 class="property-title">{{ property.name }}</h1>
            <p class="property-address">{{ property.address || property.location }}</p>
            <div class="property-type">{{ property.type || 'Residential' }}</div>
          </div>
          <div class="property-price-section">
            <div class="price-label">Price</div>
            <div class="price-value">{{ property.price }}</div>
          </div>
        </div>

        <div class="property-specs">
          <div class="spec-item">
            <div class="spec-title">Bedroom</div>
            <div class="spec-value">{{ property.bedrooms }}</div>
          </div>
          <div class="spec-item">
            <div class="spec-title">Bathroom</div>
            <div class="spec-value">{{ property.bathrooms }}</div>
          </div>
          <div class="spec-item">
            <div class="spec-title">Square feet</div>
            <div class="spec-value">{{ property.size }}ft</div>
          </div>
          <div class="spec-item">
            <div class="spec-title">Year Built</div>
            <div class="spec-value">{{ property.yearBuilt || '2010' }}</div>
          </div>
        </div>

        <div class="property-description">
          <h2 class="description-title">Description</h2>
          <p class="description-text">{{ property.description }}</p>
        </div>

        <div class="agent-card">
          <div class="agent-info">
            <img class="agent-avatar" src="https://res.cloudinary.com/dnuhjsckk/image/upload/v1739408381/Screenshot_2025-02-13_015617_mhjgby.png" alt="Agent avatar">
            <div>
              <h3 class="agent-name">Jane Doe</h3>
              <div class="agent-meta">
                <div class="agent-title">Real Estate Agent</div>
                <div class="agent-phone">(555) 123-4567</div>
              </div>
            </div>
          </div>
          <div class="agent-actions">
            <button class="action-button contact-agent" @click="contactAgent">
              Contact Agent
            </button>
          </div>
        </div>

        <div class="property-actions">
          <div class="property-actions-note">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            <span>Please contact your agent to schedule viewings.</span>
          </div>
          <button class="action-button contact-agent-primary" @click="contactAgent">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            Contact Agent
          </button>
          <button class="action-button request-info" @click="requestInfo">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
            Request Information
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { usePropertyStore } from '@/stores/propertyStore';

const router = useRouter();
const route = useRoute();
const propertyStore = usePropertyStore();
const propertyId = ref(parseInt(route.params.id || route.query.id));
const isLoading = ref(true);
const isFavorite = ref(false);
const currentImageIndex = ref(0);

// Get property from store based on ID
const property = computed(() => {
  const found = propertyStore.properties.find(p => p.id === propertyId.value);
  return found;
});

// Get current image for the gallery
const currentImage = computed(() => {
  if (!property.value || !property.value.images || property.value.images.length === 0) {
    return property.value?.image || '';
  }
  return property.value.images[currentImageIndex.value];
});

// Navigation functions for image gallery
const nextImage = () => {
  if (property.value?.images && currentImageIndex.value < property.value.images.length - 1) {
    currentImageIndex.value++;
  }
};

const prevImage = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--;
  }
};

const setCurrentImage = (index) => {
  currentImageIndex.value = index;
};

// Toggle favorite status
const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value;
  // In a real app, this would call an API to save the favorite status
  console.log(`Property ${propertyId.value} favorite status: ${isFavorite.value}`);
};

// Share property
const shareProperty = () => {
  if (navigator.share) {
    navigator.share({
      title: property.value?.name || 'Property Listing',
      text: `Check out this property: ${property.value?.name}`,
      url: window.location.href
    }).catch(err => {
      console.log('Error sharing:', err);
    });
  } else {
    // Fallback for browsers that don't support Web Share API
    alert(`Share this link: ${window.location.href}`);
  }
};

// Request more information
const requestInfo = () => {
  router.push(`/client-messages?requestInfo=${propertyId.value}`);
};

// Contact agent
const contactAgent = () => {
  router.push(`/client-messages?contactAgent=${propertyId.value}`);
};

// Navigate back
const goBack = () => {
  router.push('/client-properties');
};

onMounted(async () => {
  console.log('Viewing property with ID:', propertyId.value);

  // Simulate loading
  setTimeout(() => {
    isLoading.value = false;

    if (!property.value) {
      console.warn('Property not found, you may want to redirect to a 404 page');
    }
  }, 1000);
});
</script>

<style scoped>
.property-detail-page {
  max-width: 1280px;
  margin: 0 auto;
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  background-color: #f9fafb;
  color: #374151;
  padding: 0 1.5rem;
}

.header {
  display: flex;
  align-items: center;
  padding: 1.5rem 0;
  position: relative;
  flex-wrap: wrap;
  gap: 1rem;
}

.back-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.125rem;
  font-weight: 600;
  color: #374151;
}

.header-subtitle {
  font-size: 0.875rem;
  color: #6b7280;
  margin-left: 0.25rem;
  margin-top: 0.25rem;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-left: auto;
  flex-wrap: wrap;
}

.icon-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  border: 1px solid #e5e7eb;
  background-color: white;
  color: #6b7280;
  cursor: pointer;
}

.icon-button.active {
  color: #ef4444;
  fill: #ef4444;
}

.icon-button.active svg {
  fill: #ef4444;
}

.client-avatar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.avatar-circle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: #1a4189;
  color: white;
  font-weight: 600;
}

.client-name {
  font-size: 0.875rem;
  font-weight: 500;
}

/* Loading state */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 0;
}

.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #1a4189;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Error state */
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4rem 0;
}

.error-state svg {
  color: #6b7280;
  margin-bottom: 1rem;
}

.error-state h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.error-state p {
  font-size: 1rem;
  color: #6b7280;
  max-width: 24rem;
  margin-bottom: 1.5rem;
}

.primary-button {
  padding: 0.75rem 1.5rem;
  font-weight: 500;
  border-radius: 0.375rem;
  background-color: #1a4189;
  color: white;
  border: none;
  cursor: pointer;
}

/* Property Content */
.property-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-bottom: 3rem;
}

/* Image Gallery */
.image-gallery {
  width: 100%;
}

.main-image {
  position: relative;
  width: 100%;
  height: 400px;
  border-radius: 0.5rem;
  overflow: hidden;
  margin-bottom: 1rem;
}

.property-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-navigation {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
}

.nav-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.8);
  border: none;
  cursor: pointer;
  color: #374151;
  transition: background-color 0.2s;
}

.nav-button:hover {
  background-color: rgba(255, 255, 255, 0.9);
}

.nav-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.thumbnails {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
}

.thumbnail {
  width: 80px;
  height: 60px;
  border-radius: 0.25rem;
  object-fit: cover;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.thumbnail:hover {
  opacity: 0.9;
}

.thumbnail.active {
  opacity: 1;
  border: 2px solid #1a4189;
}

/* Property Details */
.property-details-container {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
}

.property-header {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.property-title-section {
  flex: 1;
  min-width: 300px;
}

.property-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 0.5rem;
}

.property-address {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0 0 0.5rem;
}

.property-type {
  font-size: 0.875rem;
  color: #6b7280;
}

.property-price-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
}

.price-label {
  font-size: 0.875rem;
  color: #6b7280;
}

.price-value {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a4189;
}

.property-specs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem 0;
  border-top: 1px solid #e5e7eb;
  border-bottom: 1px solid #e5e7eb;
}

.spec-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.spec-title {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.25rem;
}

.spec-value {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
}

.property-description {
  margin-bottom: 2rem;
}

.description-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 1rem;
}

.description-text {
  font-size: 0.875rem;
  line-height: 1.5;
  color: #4b5563;
}

/* Agent Card */
.agent-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background-color: #f3f4f6;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.agent-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.agent-avatar {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  object-fit: cover;
}

.agent-name {
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 0.25rem;
}

.agent-meta {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.875rem;
  color: #6b7280;
}

.action-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.contact-agent {
  background-color: #1a4189;
  color: white;
  border: none;
}

.contact-agent:hover {
  background-color: #133267;
}

/* Property Actions */
.property-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

.contact-agent-primary {
  width: 100%;
  background-color: #1a4189;
  color: white;
  border: none;
}

.contact-agent-primary:hover {
  background-color: #133267;
}

.request-info {
  width: 100%;
  background-color: white;
  color: #1a4189;
  border: 1px solid #1a4189;
}

.request-info:hover {
  background-color: #f0f7ff;
}

/* Property Actions Note */
.property-actions-note {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  margin-bottom: 1rem;
  padding: 10px;
  border-radius: 6px;
  background-color: #f9f9fa;
  font-size: 13px;
  color: #666;
}

.property-actions-note svg {
  color: #1a4189;
  flex-shrink: 0;
}

/* Media Queries */
@media (min-width: 768px) {
  .property-content {
    flex-direction: row;
    align-items: flex-start;
  }

  .image-gallery {
    flex: 1;
    min-width: 0;
  }

  .property-details-container {
    flex: 1;
    min-width: 0;
  }
}

@media (max-width: 767px) {
  .property-header {
    flex-direction: column;
  }

  .property-price-section {
    align-items: flex-start;
  }

  .thumbnail {
    width: 60px;
    height: 45px;
  }
}

.property-detail {
  padding: 24px 32px;
  background: #F8F9FB;
  min-height: 100vh;
}

.property-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
}

.header-left {
  flex: 1;
  min-width: 280px;
}

.property-title {
  font-size: 24px;
  font-weight: 600;
  color: #1A1A1A;
  margin: 0 0 8px 0;
}

.property-location {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666666;
  font-size: 16px;
}

.header-right {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.action-button {
  height: 40px;
  padding: 0 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.property-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
}

.main-content {
  background: white;
  border-radius: 12px;
  border: 1px solid #E5E5E5;
  overflow: hidden;
}

.image-gallery {
  position: relative;
  aspect-ratio: 16/9;
  overflow: hidden;
}

.main-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumbnail-strip {
  display: flex;
  gap: 12px;
  padding: 16px;
  overflow-x: auto;
  scrollbar-width: thin;
}

.thumbnail {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  cursor: pointer;
  object-fit: cover;
  transition: opacity 0.2s;
}

.property-info {
  padding: 24px;
}

.info-section {
  margin-bottom: 32px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #1A1A1A;
  margin: 0 0 16px 0;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #F8F9FB;
  border-radius: 8px;
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.sidebar-card {
  background: white;
  border-radius: 12px;
  border: 1px solid #E5E5E5;
  padding: 24px;
}

.price-section {
  text-align: center;
  margin-bottom: 24px;
}

.price {
  font-size: 28px;
  font-weight: 600;
  color: #1A1A1A;
  margin: 0;
}

.price-details {
  color: #666666;
  font-size: 14px;
  margin-top: 4px;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-size: 14px;
  font-weight: 500;
  color: #1A1A1A;
}

.form-input {
  width: 100%;
  height: 40px;
  padding: 0 12px;
  border: 1px solid #E5E5E5;
  border-radius: 8px;
  font-size: 14px;
}

.form-textarea {
  width: 100%;
  height: 100px;
  padding: 12px;
  border: 1px solid #E5E5E5;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
}

.submit-button {
  width: 100%;
  height: 40px;
  background: #1849A9;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}

.submit-button:hover {
  background: #0F3175;
}

/* Responsive Breakpoints */
@media (max-width: 1200px) {
  .property-content {
    grid-template-columns: 3fr 2fr;
  }
}

@media (max-width: 992px) {
  .property-content {
    grid-template-columns: 1fr;
  }

  .sidebar {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .sidebar-card {
    flex: 1;
    min-width: 300px;
  }
}

@media (max-width: 768px) {
  .property-detail {
    padding: 16px;
  }

  .property-header {
    flex-direction: column;
    gap: 16px;
  }

  .header-right {
    width: 100%;
    justify-content: stretch;
  }

  .action-button {
    flex: 1;
    justify-content: center;
  }

  .property-title {
    font-size: 20px;
  }

  .property-location {
    font-size: 14px;
  }

  .property-info {
    padding: 16px;
  }

  .features-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }

  .sidebar-card {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .thumbnail {
    width: 60px;
    height: 60px;
  }

  .feature-item {
    padding: 8px;
    font-size: 13px;
  }

  .price {
    font-size: 24px;
  }
}
</style>
