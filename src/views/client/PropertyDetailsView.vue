<template>
  <div class="property-details-page">
    <!-- Loading state -->
    <div v-if="loading" class="loading-state">
      <div class="loading-spinner"></div>
      <p>Loading property details...</p>
    </div>

    <!-- Error state -->
    <div v-else-if="error || !property" class="error-state">
      <p>{{ error || 'Property not found.' }}</p>
      <button @click="goBack" class="back-btn">
        Back to Listings
      </button>
    </div>

    <!-- Content when property is loaded -->
    <div v-else class="property-content">
      <!-- Property header with navigation and actions -->
      <div class="property-header">
        <div class="container">
          <div class="back-navigation">
            <button @click="goBack" class="back-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
              <span>Back to agent listings</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Property title section -->
      <div class="container">
        <div class="property-title-section">
          <h1>{{ property.name }}</h1>
          <div class="property-subtitle">
            <div class="property-location">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>{{ property.location }}</span>
            </div>
            <div class="property-actions">
              <button class="action-btn share-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                  <polyline points="16 6 12 2 8 6"></polyline>
                  <line x1="12" y1="2" x2="12" y2="15"></line>
                </svg>
                <span>Share</span>
              </button>
              <button class="action-btn favorite-btn" @click="toggleFavorite">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" :fill="isFavorite ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                <span>{{ isFavorite ? 'Saved' : 'Save' }}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Property image gallery -->
        <div class="property-gallery">
          <div class="gallery-main">
            <img :src="property.image" :alt="property.name" class="main-image" />
          </div>
          <div class="gallery-thumbnails">
            <img :src="property.image" :alt="property.name" class="thumbnail active" />
            <div class="thumbnail placeholder"></div>
            <div class="thumbnail placeholder"></div>
            <div class="thumbnail placeholder"></div>
            <button class="show-all-photos">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
              <span>Show all photos</span>
            </button>
          </div>
        </div>

        <!-- Property content with sidebar -->
        <div class="property-main-content">
          <div class="property-info-column">
            <!-- Property features -->
            <div class="property-section">
              <div class="property-overview">
                <div class="overview-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                  <div class="overview-text">
                    <div class="overview-value">{{ property.type || 'House' }}</div>
                    <div class="overview-label">Property Type</div>
                  </div>
                </div>
                <div class="overview-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3 22h18"></path>
                    <path d="M3 10h18"></path>
                    <path d="M14 4h6v6h-6z"></path>
                    <path d="M4 4h6v6H4z"></path>
                    <path d="M4 16h6v6H4z"></path>
                    <path d="M14 16h6v6h-6z"></path>
                  </svg>
                  <div class="overview-text">
                    <div class="overview-value">{{ property.size }} sq ft</div>
                    <div class="overview-label">Living Area</div>
                  </div>
                </div>
                <div class="overview-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </svg>
                  <div class="overview-text">
                    <div class="overview-value">{{ property.bedrooms }}</div>
                    <div class="overview-label">Bedrooms</div>
                  </div>
                </div>
                <div class="overview-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M9 6 5 10V6c0-1.1.9-2 2-2Z"></path>
                    <path d="M14 6h1c1.1 0 2 .9 2 2v1"></path>
                    <path d="M19 9v1"></path>
                    <path d="M19 15v-1"></path>
                    <path d="M14 18h1c1.1 0 2-.9 2-2v-1"></path>
                    <path d="M9 18H6c-1.1 0-2-.9-2-2v-1"></path>
                  </svg>
                  <div class="overview-text">
                    <div class="overview-value">{{ property.bathrooms }}</div>
                    <div class="overview-label">Bathrooms</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Property description -->
            <div class="property-section">
              <h2>About this property</h2>
              <div class="property-description">
                <p>{{ property.description || 'This beautiful property is located in ' + property.location + '. It features ' + property.bedrooms + ' bedrooms and ' + property.bathrooms + ' bathrooms with a total area of ' + property.size + ' square feet.' }}</p>
              </div>
            </div>

            <!-- Property features -->
            <div class="property-section">
              <h2>Property features</h2>
              <div class="features-grid">
                <div class="feature-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M8 3v3a2 2 0 0 1-2 2H3"></path>
                    <path d="M21 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3"></path>
                    <path d="M21 12H8"></path>
                  </svg>
                  <span>Parking</span>
                </div>
                <div class="feature-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5"></rect>
                    <path d="M2 7h20"></path>
                    <path d="M5 2v4"></path>
                    <path d="M19 2v4"></path>
                  </svg>
                  <span>Year built: 2020</span>
                </div>
                <div class="feature-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect width="18" height="11" x="3" y="11" rx="2"></rect>
                    <path d="M9 11V7a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4"></path>
                    <path d="M12 14v3"></path>
                    <path d="M10 17h4"></path>
                  </svg>
                  <span>Security System</span>
                </div>
                <div class="feature-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M7 19h10"></path>
                    <path d="M11 19v-8.8a2 2 0 0 0-2-2"></path>
                    <path d="M15 19v-11a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v11"></path>
                    <path d="M9 17v-5"></path>
                    <path d="M13 17v-2.5"></path>
                    <line x1="2" x2="22" y1="2" y2="22"></line>
                    <line x1="8" x2="8" y1="19" y2="22"></line>
                    <line x1="16" x2="16" y1="19" y2="22"></line>
                  </svg>
                  <span>Outdoor Space</span>
                </div>
                <div class="feature-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <span>24/7 Availability</span>
                </div>
                <div class="feature-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 12.9V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7.1A8 8 0 0 0 9 4h0a8 8 0 0 0-4.6 4.6"></path>
                    <path d="M15 4h5v5"></path>
                    <path d="m20 4-5 5"></path>
                  </svg>
                  <span>Recently Renovated</span>
                </div>
              </div>
            </div>

            <!-- Location section -->
            <div class="property-section">
              <h2>Location</h2>
              <div class="location-map-container">
                <div class="map-placeholder">
                  <div class="map-pin">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div class="map-text">{{ property.location }}</div>
                </div>
                <button class="view-on-map-btn">View on map</button>
              </div>
            </div>
          </div>

          <!-- Sidebar with contact agent -->
          <div class="property-sidebar">
            <div class="property-card">
              <div class="property-price-header">
                <div class="price-tag">{{ property.price }}</div>
              </div>

              <div class="agent-info">
                <div class="agent-contact-header">
                  <h3>Contact Agent</h3>
                </div>

                <div class="agent-details" v-if="agent">
                  <div class="agent-avatar">
                    <img :src="agent.avatar || agent.profilePicture" :alt="agent.name">
                  </div>
                  <div class="agent-contact-info">
                    <div class="agent-name">{{ agent.name }}</div>
                    <div class="agent-title">{{ agent.title || 'Real Estate Agent' }}</div>
                  </div>
                </div>

                <div class="agent-contact-form">
                  <div class="form-group">
                    <input type="text" placeholder="Your name" class="contact-input">
                  </div>
                  <div class="form-group">
                    <input type="email" placeholder="Your email" class="contact-input">
                  </div>
                  <div class="form-group">
                    <input type="tel" placeholder="Your phone" class="contact-input">
                  </div>
                  <div class="form-group">
                    <textarea placeholder="I'm interested in this property..." class="contact-textarea"></textarea>
                  </div>
                  <button class="contact-agent-btn">Contact Agent</button>
                  <div class="contact-disclaimer">
                    By contacting, you agree to our terms and privacy policy.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePropertyStore } from '@/stores/propertyStore';
import { useAgentStore } from '@/stores/agentStore';

const route = useRoute();
const router = useRouter();
const propertyStore = usePropertyStore();
const agentStore = useAgentStore();

const property = ref(null);
const agent = ref(null);
const loading = ref(true);
const error = ref(null);
const favorites = ref([]);
const isFavorite = computed(() => {
  if (!property.value) return false;
  return favorites.value.includes(property.value.id);
});

// Go back to previous page
const goBack = () => {
  if (route.query.from === 'agents') {
    router.push(`/client-find-agents/${route.params.agentId || ''}`);
  } else if (route.params.agentId) {
    router.push({
      name: 'agent-profile',
      params: { id: route.params.agentId }
    });
  } else {
    router.push('/client/properties');
  }
};

// Toggle favorite status
const toggleFavorite = () => {
  if (!property.value) return;

  const index = favorites.value.indexOf(property.value.id);
  if (index > -1) {
    favorites.value.splice(index, 1);
  } else {
    favorites.value.push(property.value.id);
  }
  localStorage.setItem('favorite-properties', JSON.stringify(favorites.value));
};

// Load property data
onMounted(async () => {
  loading.value = true;
  error.value = null;

  // Load favorites from localStorage
  const storedFavorites = localStorage.getItem('favorite-properties');
  if (storedFavorites) {
    favorites.value = JSON.parse(storedFavorites);
  }

  try {
    const propertyId = parseInt(route.params.id);
    property.value = propertyStore.getPropertyById(propertyId);

    if (!property.value) {
      error.value = `Property with ID ${propertyId} not found`;
    } else if (route.params.agentId) {
      // Load agent data if we have an agent ID
      const agentId = parseInt(route.params.agentId);
      agent.value = agentStore.getAgentById(agentId);
    }
  } catch (e) {
    error.value = `Error loading property: ${e.message}`;
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
/* Main layout */
.property-details-page {
  background-color: #f9fafb;
  min-height: 100vh;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  color: #111827;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.container {
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 32px;
}

/* Loading and error states */
.loading-state, .error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 140px 28px;
  text-align: center;
}

.loading-spinner {
  border: 2.5px solid rgba(0, 82, 204, 0.08);
  border-radius: 50%;
  border-top: 2.5px solid #0056d6;
  width: 42px;
  height: 42px;
  animation: spin 0.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  margin-bottom: 28px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.03);
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-state p {
  color: #dc2626;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 28px;
  letter-spacing: -0.01em;
  line-height: 1.6;
}

.back-btn {
  padding: 13px 26px;
  background-color: #0056d6;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14.5px;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 4px rgba(0, 86, 214, 0.15), 0 4px 6px rgba(0, 86, 214, 0.1);
  letter-spacing: -0.01em;
}

.back-btn:hover {
  background-color: #0046c0;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 86, 214, 0.2), 0 8px 16px rgba(0, 86, 214, 0.1);
}

.back-btn:active {
  transform: translateY(1px);
  box-shadow: 0 2px 4px rgba(0, 86, 214, 0.2);
}

/* Property header */
.property-header {
  background-color: white;
  border-bottom: 1px solid #f3f4f6;
  padding: 24px 0;
  margin-bottom: 36px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04), 0 4px 12px rgba(0, 0, 0, 0.02);
}

.back-navigation {
  display: flex;
  align-items: center;
}

.back-link {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #4b5563;
  background: none;
  border: none;
  padding: 8px 0;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  letter-spacing: -0.01em;
}

.back-link:hover {
  color: #0056d6;
  transform: translateX(-3px);
}

.back-link:active {
  transform: translateX(-1px);
}

.back-link svg {
  transition: transform 0.2s ease;
}

.back-link:hover svg {
  transform: translateX(-2px);
}

/* Property title section */
.property-title-section {
  margin-bottom: 38px;
}

.property-title-section h1 {
  font-size: 34px;
  font-weight: 800;
  color: #111827;
  margin: 0 0 16px 0;
  letter-spacing: -0.025em;
  line-height: 1.2;
}

.property-subtitle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
}

.property-location {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #4b5563;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -0.01em;
}

.property-location svg {
  color: #0056d6;
  flex-shrink: 0;
}

.property-actions {
  display: flex;
  gap: 16px;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: white;
  border: 1px solid #e5e7eb;
  padding: 10px 16px;
  font-size: 14px;
  color: #4b5563;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
  position: relative;
  overflow: hidden;
}

.action-btn::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0) 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.action-btn:hover {
  background-color: #f9fafb;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.04);
  transform: translateY(-2px);
}

.action-btn:hover::after {
  opacity: 1;
}

.action-btn:active {
  transform: translateY(1px);
}

.action-btn svg {
  transition: transform 0.2s ease;
}

.action-btn:hover svg {
  transform: scale(1.1);
}

.favorite-btn {
  color: #ef4444;
}

.favorite-btn svg {
  transition: all 0.2s ease;
}

.favorite-btn:hover svg {
  fill: rgba(239, 68, 68, 0.15);
}

/* Property gallery */
.property-gallery {
  margin-bottom: 48px;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 16px;
  height: 450px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08), 0 1px 5px rgba(0, 0, 0, 0.02);
}

.gallery-main {
  height: 100%;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
}

.gallery-main::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0) 60%, rgba(0,0,0,0.08) 100%);
  pointer-events: none;
}

.main-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s cubic-bezier(0.215, 0.61, 0.355, 1);
}

.gallery-main:hover .main-image {
  transform: scale(1.04);
}

.gallery-thumbnails {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 12px;
  height: 100%;
}

.thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.thumbnail:hover {
  transform: scale(1.04);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.thumbnail.placeholder {
  background: linear-gradient(135deg, #e5e7eb 0%, #f3f4f6 100%);
  position: relative;
  overflow: hidden;
}

.thumbnail.placeholder::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  right: -50%;
  bottom: -50%;
  background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0) 100%);
  animation: shimmer 2s infinite;
  transform: rotate(30deg);
}

@keyframes shimmer {
  0% { transform: translateX(-100%) rotate(30deg); }
  100% { transform: translateX(100%) rotate(30deg); }
}

.thumbnail.active {
  border: 2px solid #0056d6;
  box-shadow: 0 0 0 2px rgba(0, 86, 214, 0.15);
}

.show-all-photos {
  grid-column: 1 / 3;
  grid-row: 2 / 3;
  margin-top: auto;
  background: rgba(255, 255, 255, 0.92);
  border: none;
  border-radius: 10px;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  z-index: 2;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  letter-spacing: -0.01em;
  color: #111827;
}

.show-all-photos:hover {
  background: rgba(255, 255, 255, 0.97);
  transform: translateY(-3px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.show-all-photos:active {
  transform: translateY(-1px);
}

.show-all-photos svg {
  transition: transform 0.2s ease;
}

.show-all-photos:hover svg {
  transform: scale(1.1);
}

/* Property content with sidebar */
.property-main-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 40px;
  margin-bottom: 100px;
}

.property-info-column {
  display: flex;
  flex-direction: column;
  gap: 52px;
}

.property-section {
  margin-bottom: 0;
}

.property-section h2 {
  font-size: 24px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 24px 0;
  letter-spacing: -0.02em;
  line-height: 1.3;
}

/* Property overview */
.property-overview {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
  background-color: white;
  border-radius: 16px;
  padding: 36px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04), 0 4px 16px rgba(0, 0, 0, 0.02);
  border: 1px solid rgba(239, 241, 245, 0.8);
}

.overview-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.overview-item svg {
  color: #0056d6;
  flex-shrink: 0;
  margin-top: 4px;
  width: 24px;
  height: 24px;
  transition: transform 0.3s ease;
}

.overview-item:hover svg {
  transform: scale(1.15);
}

.overview-text {
  display: flex;
  flex-direction: column;
}

.overview-value {
  font-size: 18px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 6px;
  letter-spacing: -0.01em;
}

.overview-label {
  font-size: 14px;
  color: #6b7280;
  font-weight: 500;
  letter-spacing: -0.01em;
}

/* Property description */
.property-description {
  background-color: white;
  border-radius: 16px;
  padding: 36px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04), 0 4px 16px rgba(0, 0, 0, 0.02);
  border: 1px solid rgba(239, 241, 245, 0.8);
}

.property-description p {
  font-size: 16px;
  line-height: 1.75;
  color: #4b5563;
  margin: 0;
  font-weight: 450;
  letter-spacing: -0.01em;
}

/* Features grid */
.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  background-color: white;
  border-radius: 16px;
  padding: 36px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04), 0 4px 16px rgba(0, 0, 0, 0.02);
  border: 1px solid rgba(239, 241, 245, 0.8);
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 18px;
  background-color: #f9fafb;
  border-radius: 12px;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid #f3f4f6;
  position: relative;
  overflow: hidden;
}

.feature-item::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center, rgba(0,86,214,0.03) 0%, rgba(0,86,214,0) 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.feature-item:hover {
  background-color: #f3f4f6;
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.05);
  border-color: #e5e7eb;
}

.feature-item:hover::after {
  opacity: 1;
}

.feature-item svg {
  color: #0056d6;
  flex-shrink: 0;
  transition: transform 0.2s ease;
}

.feature-item:hover svg {
  transform: scale(1.2);
}

.feature-item span {
  font-size: 15px;
  color: #4b5563;
  font-weight: 500;
  letter-spacing: -0.01em;
}

/* Location map */
.location-map-container {
  background-color: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04), 0 4px 16px rgba(0, 0, 0, 0.02);
  border: 1px solid rgba(239, 241, 245, 0.8);
}

.map-placeholder {
  height: 280px;
  background: linear-gradient(135deg, #e6e9f0 0%, #eef1f5 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

.map-pin {
  color: #ef4444;
  margin-bottom: 14px;
  animation: bounce 2.5s infinite cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}

.map-text {
  font-size: 15px;
  color: #4b5563;
  background-color: white;
  padding: 10px 18px;
  border-radius: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  font-weight: 500;
  letter-spacing: -0.01em;
}

.view-on-map-btn {
  width: 100%;
  padding: 18px;
  background-color: white;
  border: none;
  border-top: 1px solid #f3f4f6;
  color: #0056d6;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  letter-spacing: -0.01em;
  position: relative;
  overflow: hidden;
}

.view-on-map-btn::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center, rgba(0,86,214,0.05) 0%, rgba(0,86,214,0) 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.view-on-map-btn:hover {
  background-color: #f9fafb;
}

.view-on-map-btn:hover::after {
  opacity: 1;
}

/* Property sidebar */
.property-sidebar {
  align-self: flex-start;
  position: sticky;
  top: 32px;
}

.property-card {
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04), 0 12px 24px rgba(0, 0, 0, 0.03);
  overflow: hidden;
  border: 1px solid rgba(239, 241, 245, 0.8);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.property-card:hover {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05), 0 20px 32px rgba(0, 0, 0, 0.04);
  transform: translateY(-4px);
}

.property-price-header {
  padding: 32px;
  border-bottom: 1px solid #f3f4f6;
}

.price-tag {
  font-size: 30px;
  font-weight: 800;
  color: #111827;
  letter-spacing: -0.02em;
}

.agent-info {
  padding: 32px;
}

.agent-contact-header {
  margin-bottom: 24px;
}

.agent-contact-header h3 {
  font-size: 18px;
  font-weight: 700;
  color: #111827;
  margin: 0;
  letter-spacing: -0.01em;
}

.agent-details {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 28px;
  padding-bottom: 28px;
  border-bottom: 1px solid #f3f4f6;
}

.agent-avatar {
  width: 62px;
  height: 62px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
  border: 3px solid #fff;
  position: relative;
}

.agent-avatar::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.08);
  pointer-events: none;
}

.agent-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.agent-avatar:hover img {
  transform: scale(1.08);
}

.agent-contact-info {
  flex: 1;
}

.agent-name {
  font-size: 16px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 4px;
  letter-spacing: -0.01em;
}

.agent-title {
  font-size: 14px;
  color: #6b7280;
  font-weight: 500;
  letter-spacing: -0.01em;
}

.agent-contact-form {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.contact-input, .contact-textarea {
  width: 100%;
  padding: 15px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  font-size: 15px;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
  font-weight: 450;
  color: #374151;
}

.contact-input:focus, .contact-textarea:focus {
  border-color: #0056d6;
  box-shadow: 0 0 0 3px rgba(0, 86, 214, 0.1);
  outline: none;
}

.contact-textarea {
  height: 120px;
  resize: none;
  font-family: inherit;
  line-height: 1.5;
}

.contact-agent-btn {
  padding: 16px;
  background-color: #0056d6;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 4px rgba(0, 86, 214, 0.15), 0 4px 6px rgba(0, 86, 214, 0.1);
  letter-spacing: -0.01em;
  position: relative;
  overflow: hidden;
}

.contact-agent-btn::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%);
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;
}

.contact-agent-btn:hover {
  background-color: #0046c0;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 86, 214, 0.2), 0 8px 16px rgba(0, 86, 214, 0.1);
}

.contact-agent-btn:hover::after {
  opacity: 1;
}

.contact-agent-btn:active {
  transform: translateY(1px);
  box-shadow: 0 2px 4px rgba(0, 86, 214, 0.2);
}

.contact-disclaimer {
  font-size: 13px;
  color: #9ca3af;
  text-align: center;
  line-height: 1.5;
  letter-spacing: -0.01em;
}

/* Responsive */
@media (max-width: 991px) {
  .container {
    padding: 0 28px;
  }

  .property-gallery {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    height: auto;
    gap: 16px;
  }

  .gallery-main {
    height: 350px;
  }

  .gallery-thumbnails {
    height: 180px;
  }

  .property-main-content {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .property-sidebar {
    position: static;
  }

  .property-overview {
    grid-template-columns: repeat(2, 1fr);
    padding: 28px;
    gap: 24px;
  }

  .features-grid {
    grid-template-columns: repeat(2, 1fr);
    padding: 28px;
  }

  .property-description,
  .features-grid {
    padding: 28px;
  }
}

@media (max-width: 576px) {
  .container {
    padding: 0 20px;
  }

  .property-title-section h1 {
    font-size: 28px;
  }

  .property-overview {
    grid-template-columns: 1fr;
    gap: 22px;
  }

  .features-grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .property-subtitle {
    flex-direction: column;
    align-items: flex-start;
  }

  .property-actions {
    width: 100%;
    justify-content: space-between;
  }

  .property-gallery {
    height: auto;
    margin-bottom: 32px;
  }

  .gallery-main {
    height: 240px;
  }

  .gallery-thumbnails {
    height: 120px;
  }

  .property-description p {
    font-size: 15px;
  }
}
</style>
