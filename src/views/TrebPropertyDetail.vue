<template>
  <div class="property-detail-page">
    <GlobalHeader />

    <div class="content-wrapper">
      <div v-if="loading" class="loading-state">
        <div class="loading-spinner"></div>
      </div>
      <div v-else-if="error" class="error-state">{{ error }}</div>
      <div v-else-if="!property" class="not-found-state">Property not found</div>

      <template v-else>
        <!-- Main Content -->
        <div class="main-content">
          <!-- Property Gallery -->
          <section class="gallery-section">
            <div class="main-image">
              <img
                :src="property.image || 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1743087291/Designer_8_1_fjvyi0.png'"
                :alt="property.UnparsedAddress"
                @error="handleImageError"
              >
              <!-- Status Badges -->
              <div class="floating-badges">
                <div class="status-badge" :class="property.StandardStatus.toLowerCase()">
                  <i class="fas" :class="property.StandardStatus === 'Active' ? 'fa-check-circle' : 'fa-clock'"></i>
                  {{ property.StandardStatus }}
                </div>
                <div class="transaction-type-badge">
                  <i class="fas fa-home"></i>
                  {{ property.TransactionType }}
                </div>
              </div>
              <!-- Gallery Button -->
              <router-link
                :to="`/property/${route.params.listingKey}/gallery`"
                class="gallery-button"
              >
                <i class="fas fa-images"></i>
                View Full Property Gallery
              </router-link>
            </div>
          </section>

          <!-- Essential Info -->
          <section class="essential-info">
            <div class="price-section">
              <h1 class="price">
                ${{ formatPrice(property.ListPrice) }}
                <span v-if="property.ListPriceUnit">{{ property.ListPriceUnit }}</span>
              </h1>
              <div class="mls-info">
                <span>MLS® {{ property.ListingKey }}</span>
                <span>{{ property.ListAOR }}</span>
              </div>
            </div>

            <div class="address-section">
              <h2>{{ property.UnparsedAddress }}</h2>
              <p>{{ property.City }}, {{ property.StateOrProvince }} {{ property.PostalCode }}</p>
            </div>

            <!-- Key Details -->
            <div class="key-details">
              <div v-if="isResidential" class="detail-grid">
                <div class="detail-item">
                  <span class="icon">🛏️</span>
                  <span class="value">{{ property.BedroomsTotal || 0 }}</span>
                  <span class="label">Beds</span>
                </div>
                <div class="detail-item">
                  <span class="icon">🚿</span>
                  <span class="value">{{ property.BathroomsTotalInteger || 0 }}</span>
                  <span class="label">Baths</span>
                </div>
                <div class="detail-item">
                  <span class="icon">📏</span>
                  <span class="value">{{ property.LivingAreaRange || 'N/A' }}</span>
                  <span class="label">Sq Ft</span>
                </div>
                <div class="detail-item">
                  <span class="icon">🚗</span>
                  <span class="value">{{ property.ParkingTotal || 0 }}</span>
                  <span class="label">Parking</span>
                </div>
              </div>

              <div v-else-if="isCommercial" class="detail-grid">
                <div class="detail-item">
                  <span class="icon">🏢</span>
                  <span class="value">{{ property.BuildingAreaTotal || 'N/A' }}</span>
                  <span class="label">{{ property.BuildingAreaUnits }}</span>
                </div>
                <div class="detail-item">
                  <span class="icon">💼</span>
                  <span class="value">{{ property.PropertyUse || 'N/A' }}</span>
                  <span class="label">Usage</span>
                </div>
              </div>
            </div>
          </section>

          <!-- Property Details Grid -->
          <div class="details-grid">
            <!-- Left Column -->
            <div class="left-column">
              <!-- Property Description -->
              <section class="detail-section">
                <h3>About This Property</h3>
                <p>{{ property.PublicRemarks }}</p>
              </section>

              <!-- Property Features -->
              <section class="detail-section" v-if="hasFeatures">
                <h3>Property Features</h3>
                <div class="features-grid">
                  <div v-if="property.PropertyFeatures?.length" class="feature-group">
                    <h4>Amenities</h4>
                    <ul>
                      <li v-for="feature in property.PropertyFeatures" :key="feature">
                        {{ feature }}
                      </li>
                    </ul>
                  </div>

                  <div v-if="property.InteriorFeatures?.length" class="feature-group">
                    <h4>Interior</h4>
                    <ul>
                      <li v-for="feature in property.InteriorFeatures" :key="feature">
                        {{ feature }}
                      </li>
                    </ul>
                  </div>

                  <div v-if="property.ExteriorFeatures?.length" class="feature-group">
                    <h4>Exterior</h4>
                    <ul>
                      <li v-for="feature in property.ExteriorFeatures" :key="feature">
                        {{ feature }}
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              <!-- Waterfront Features -->
              <section class="detail-section" v-if="property.WaterfrontYN">
                <h3>Waterfront Details</h3>
                <div class="waterfront-details">
                  <div class="detail-row">
                    <span class="label">Water Body:</span>
                    <span class="value">{{ property.WaterBodyName }} ({{ property.WaterBodyType }})</span>
                  </div>
                  <div class="detail-row">
                    <span class="label">Waterfront:</span>
                    <span class="value">{{ property.Waterfront?.[0] }}</span>
                  </div>
                  <div class="detail-row" v-if="property.WaterFrontageFt">
                    <span class="label">Frontage:</span>
                    <span class="value">{{ property.WaterFrontageFt }} ft</span>
                  </div>
                  <div class="waterfront-features" v-if="property.WaterfrontFeatures?.length">
                    <h4>Features:</h4>
                    <ul>
                      <li v-for="feature in property.WaterfrontFeatures" :key="feature">
                        {{ feature }}
                      </li>
                    </ul>
                  </div>
                </div>
              </section>
            </div>

            <!-- Right Column -->
            <div class="right-column">
              <!-- Building Details -->
              <section class="detail-section">
                <h3>Building Details</h3>
                <div class="details-list">
                  <div class="detail-row" v-if="property.ApproximateAge">
                    <span class="label">Age:</span>
                    <span class="value">{{ property.ApproximateAge }}</span>
                  </div>
                  <div class="detail-row" v-if="property.ArchitecturalStyle?.length">
                    <span class="label">Style:</span>
                    <span class="value">{{ property.ArchitecturalStyle.join(', ') }}</span>
                  </div>
                  <div class="detail-row" v-if="property.ConstructionMaterials?.length">
                    <span class="label">Construction:</span>
                    <span class="value">{{ property.ConstructionMaterials.join(', ') }}</span>
                  </div>
                  <div class="detail-row" v-if="property.Basement?.length">
                    <span class="label">Basement:</span>
                    <span class="value">{{ property.Basement.join(', ') }}</span>
                  </div>
                  <div class="detail-row">
                    <span class="label">Heating:</span>
                    <span class="value">{{ property.HeatType }} ({{ property.HeatSource }})</span>
                  </div>
                  <div class="detail-row">
                    <span class="label">Cooling:</span>
                    <span class="value">{{ property.Cooling?.join(', ') || 'None' }}</span>
                  </div>
                </div>
              </section>

              <!-- Lot Details -->
              <section class="detail-section" v-if="hasLotDetails">
                <h3>Lot Details</h3>
                <div class="details-list">
                  <div class="detail-row">
                    <span class="label">Dimensions:</span>
                    <span class="value">{{ property.LotWidth }} x {{ property.LotDepth }} {{ property.LotSizeUnits }}</span>
                  </div>
                  <div class="detail-row" v-if="property.LotFeatures?.length">
                    <span class="label">Features:</span>
                    <span class="value">{{ property.LotFeatures.join(', ') }}</span>
                  </div>
                </div>
              </section>

              <!-- Financial Details -->
              <section class="detail-section">
                <h3>Financial Information</h3>
                <div class="details-list">
                  <div class="detail-row">
                    <span class="label">List Price:</span>
                    <span class="value">${{ formatPrice(property.ListPrice) }}</span>
                  </div>
                  <div class="detail-row" v-if="property.TaxAnnualAmount">
                    <span class="label">Annual Taxes:</span>
                    <span class="value">${{ formatPrice(property.TaxAnnualAmount) }} ({{ property.TaxYear }})</span>
                  </div>
                  <div class="detail-row" v-if="property.AssociationFee">
                    <span class="label">Association Fee:</span>
                    <span class="value">${{ property.AssociationFee }}/month</span>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { usePropertyStore } from '@/stores/propertyStore';
import GlobalHeader from '@/components/GlobalHeader.vue';

const route = useRoute();
const propertyStore = usePropertyStore();
const loading = ref(false);
const error = ref(null);

const property = computed(() => {
  const listingKey = route.params.listingKey;
  return propertyStore.trebData?.data?.value?.find(p => p.ListingKey === listingKey) || null;
});

const isResidential = computed(() => {
  return property.value?.PropertyType?.includes('Residential');
});

const isCommercial = computed(() => {
  return property.value?.PropertyType?.includes('Commercial');
});

const hasFeatures = computed(() => {
  return property.value?.PropertyFeatures?.length ||
         property.value?.InteriorFeatures?.length ||
         property.value?.ExteriorFeatures?.length;
});

const hasLotDetails = computed(() => {
  return property.value?.LotWidth && property.value?.LotDepth;
});

const formatPrice = (price) => {
  return price ? new Intl.NumberFormat('en-US').format(price) : 'N/A';
};

const handleImageError = (event) => {
  event.target.src = 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1743087291/Designer_8_1_fjvyi0.png';
};

onMounted(() => {
  if (!propertyStore.trebData) {
    loading.value = true;
    propertyStore.getTrebData()
      .catch((err) => {
        error.value = err.message || 'Failed to load property details';
      })
      .finally(() => {
        loading.value = false;
      });
  }
});
</script>

<style scoped>
.property-detail-page {
  min-height: 100vh;
  background: #f8fafc;
}

.content-wrapper {
  padding-top: 80px; /* Height of the GlobalHeader */
  min-height: calc(100vh - 80px); /* Viewport height minus header height */
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%);
  padding: 120px 20px;
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
  opacity: 0.2;
  animation: pattern-move 20s linear infinite;
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: 0 auto;
}

.hero-content h1 {
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  background: linear-gradient(to right, #ffffff, #e2e8f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  animation: text-glow 2s ease-in-out infinite alternate;
}

.hero-content .subtitle {
  font-size: 1.75rem;
  color: #e2e8f0;
  margin-bottom: 2rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.main-content {
  max-width: 1280px;
  margin: 0 auto;
  padding: 1.5rem;
}

.gallery-section {
  position: relative;
  margin-bottom: 2rem;
}

.main-image {
  width: 100%;
  height: calc(100vh - 140px); /* Viewport height minus header and some padding */
  max-height: 600px; /* Maximum height to ensure it doesn't get too tall */
  border-radius: 1rem;
  overflow: hidden;
  position: relative;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.main-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.floating-badges {
  position: absolute;
  bottom: 20px;
  left: 20px;
  display: flex;
  gap: 1rem;
  z-index: 2;
}

.status-badge, .transaction-type-badge {
  padding: 0.75rem 1.5rem;
  border-radius: 1rem;
  font-weight: 600;
  font-size: 0.875rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.status-badge i, .transaction-type-badge i {
  font-size: 1rem;
}

.status-badge.active {
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  color: white;
}

.status-badge.active i {
  color: white;
}

.transaction-type-badge {
  color: #1E40AF;
}

.transaction-type-badge i {
  color: #1E40AF;
}

.gallery-button {
  position: absolute;
  bottom: 20px;
  right: 20px;
  padding: 0.75rem 1.5rem;
  border-radius: 1rem;
  font-weight: 600;
  font-size: 0.875rem;
  background: rgba(255, 255, 255, 0.95);
  color: #1a1a1a;
  text-decoration: none;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  z-index: 2;
}

.gallery-button i {
  font-size: 1rem;
}

.gallery-button:hover {
  background: #1E40AF;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.gallery-button:hover i {
  transform: scale(1.1);
}

@keyframes pattern-move {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 100px 100px;
  }
}

@keyframes text-glow {
  from {
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  }
  to {
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
  }
}

.essential-info {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  margin-bottom: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.price-section {
  margin-bottom: 1rem;
}

.price {
  font-size: 2.5rem;
  font-weight: 700;
  color: #0f172a;
}

.price span {
  font-size: 1rem;
  color: #64748b;
}

.mls-info {
  color: #64748b;
  font-size: 0.875rem;
}

.address-section h2 {
  font-size: 1.5rem;
  color: #0f172a;
  margin-bottom: 0.5rem;
}

.address-section p {
  color: #64748b;
}

.key-details {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e2e8f0;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
}

.detail-item {
  text-align: center;
}

.detail-item .icon {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.detail-item .value {
  font-size: 1.25rem;
  font-weight: 600;
  color: #0f172a;
  display: block;
}

.detail-item .label {
  color: #64748b;
  font-size: 0.875rem;
}

.details-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

.detail-section {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  margin-bottom: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.detail-section h3 {
  font-size: 1.25rem;
  color: #0f172a;
  margin-bottom: 1.5rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature-group h4 {
  color: #64748b;
  margin-bottom: 1rem;
}

.feature-group ul {
  list-style: none;
  padding: 0;
}

.feature-group li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #e2e8f0;
  color: #0f172a;
}

.details-list .detail-row {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid #e2e8f0;
}

.details-list .label {
  color: #64748b;
}

.details-list .value {
  color: #0f172a;
  font-weight: 500;
}

.loading-state {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #e2e8f0;
  border-top: 3px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 1024px) {
  .details-grid {
    grid-template-columns: 1fr;
  }

  .main-image {
    height: 400px;
  }
}

@media (max-width: 768px) {
  .property-detail-page {
    padding: 1rem;
  }

  .detail-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .main-image {
    height: calc(100vh - 120px);
    max-height: 400px;
  }

  .price {
    font-size: 2rem;
  }

  .content-wrapper {
    padding-top: 60px; /* Adjusted for mobile header height if different */
  }
}

@media (max-width: 640px) {
  .detail-grid {
    grid-template-columns: 1fr;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .main-image {
    height: 250px;
  }
}
</style>
