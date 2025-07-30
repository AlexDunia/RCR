<template>
  <div class="search-results">
    <div class="boxed-container">
      <!-- Search Filters -->
      <div class="search-filters">
        <form @submit.prevent="handleSearch" class="search-form">
          <div class="search-input-group">
            <div class="search-input-wrapper input-icon-wrapper">
              <span class="search-icon-inside">
                <i class="fas fa-home"></i>
              </span>
              <input
                v-model="searchParams.query"
                type="text"
                class="search-input with-icon"
                placeholder="Search by property type, location, or ID…"
              >
            </div>
            <div class="filter-group">
              <input
                v-model="searchParams.city"
                type="text"
                class="filter-input"
                placeholder="City"
              >
              <input
                v-model="searchParams.minPrice"
                type="number"
                class="filter-input"
                placeholder="Min Price"
              >
              <input
                v-model="searchParams.maxPrice"
                type="number"
                class="filter-input"
                placeholder="Max Price"
              >
              <input
                v-model="searchParams.bedrooms"
                type="number"
                class="filter-input"
                placeholder="Bedrooms"
              >
            </div>
            <button type="submit" class="search-btn">Search</button>
          </div>
        </form>
      </div>

      <!-- Results Section -->
      <div class="search-results__content">
        <h1 class="search-results__title">Search Results</h1>

        <!-- Loading State -->
        <div v-if="propertyStore.loading" class="loading-state">
          <div class="loading-spinner"></div>
          <div class="loading-text">Loading properties...</div>
        </div>

        <!-- Error State -->
        <div v-else-if="propertyStore.error" class="error-state">
          <div class="error-message">{{ propertyStore.error }}</div>
          <button class="retry-button" @click="handleSearch">Retry</button>
        </div>

        <!-- Empty State -->
        <div v-else-if="!propertyStore.searchResults?.length" class="empty-state">
          <div class="empty-message">No properties found matching your search criteria.</div>
        </div>

        <!-- Results Grid -->
        <div v-else class="treb-properties__grid">
          <router-link
            v-for="property in propertyStore.searchResults"
            :key="property.ListingKey"
            :to="`/property/${property.ListingKey}`"
            class="treb-property-card"
          >
            <div class="treb-property-card__image">
              <img
                v-if="property.image"
                :src="property.image"
                :alt="property.UnparsedAddress || 'Property Image'"
                class="treb-property-card__img"
                loading="lazy"
                @error="handleImageError"
              />
              <div v-else class="treb-property-card__no-image">
                <img
                  src="https://res.cloudinary.com/dnuhjsckk/image/upload/v1743087291/Designer_8_1_fjvyi0.png"
                  alt="No Image Available"
                  class="treb-property-card__img"
                  loading="lazy"
                />
              </div>
            </div>
            <div class="treb-property-card__content">
              <h3 class="treb-property-card__title">{{ property.UnparsedAddress }}</h3>
              <div class="treb-property-card__price">${{ formatPrice(property.ListPrice) }}</div>
              <div class="treb-property-card__location">
                <i class="fas fa-map-marker-alt"></i> {{ property.City }}, {{ property.StateOrProvince }}
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { usePropertyStore } from '@/stores/propertyStore';
import { useRoute, useRouter } from 'vue-router';

const propertyStore = usePropertyStore();
const route = useRoute();
const router = useRouter();

const searchParams = ref({
  query: '',
  city: '',
  minPrice: '',
  maxPrice: '',
  bedrooms: '',
  page: 1,
  perPage: 10
});

// Format price with commas
const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US').format(price);
};

const handleImageError = (event) => {
  event.target.src = 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1743087291/Designer_8_1_fjvyi0.png';
};

const handleSearch = async () => {
  try {
    await propertyStore.searchProperties(searchParams.value);
  } catch (error) {
    console.error('Search failed:', error);
  }
};

onMounted(() => {
  // Get search params from URL query
  const query = route.query;
  searchParams.value = {
    query: query.q || '',
    city: query.city || '',
    minPrice: query.minPrice || '',
    maxPrice: query.maxPrice || '',
    bedrooms: query.bedrooms || '',
    page: parseInt(query.page) || 1,
    perPage: parseInt(query.perPage) || 10
  };

  // Perform initial search if there are query params
  if (query.q || query.city || query.minPrice || query.maxPrice || query.bedrooms) {
    handleSearch();
  }
});
</script>

<style scoped>
.search-results {
  padding: 40px 0;
  min-height: 100vh;
  background: #f8fafc;
}

.search-filters {
  background: #fff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin-bottom: 32px;
}

.search-form {
  width: 100%;
}

.search-input-group {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.filter-group {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
}

.filter-input {
  height: 48px;
  padding: 0 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 15px;
  color: #64748b;
  transition: border-color 0.2s;
}

.filter-input:focus {
  border-color: #0066cc;
  outline: none;
}

.search-results__title {
  font-size: 2rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 24px;
}

/* Inherit existing styles from LandingPage.vue */
.treb-properties__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  margin: 0 auto;
}

.treb-property-card {
  position: relative;
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
}

.treb-property-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.treb-property-card__image {
  position: relative;
  width: 100%;
  padding-top: 66.67%;
  overflow: hidden;
}

.treb-property-card__img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.treb-property-card__content {
  padding: 1.5rem;
}

.treb-property-card__title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 0.75rem;
  line-height: 1.4;
}

.treb-property-card__price {
  font-size: 1.5rem;
  font-weight: 700;
  color: #0066cc;
  margin-bottom: 0.75rem;
}

.treb-property-card__location {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  font-size: 0.875rem;
}

/* Loading, Error, and Empty States */
.loading-state,
.error-state,
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.loading-spinner {
  width: 2.5rem;
  height: 2.5rem;
  border: 3px solid #e2e8f0;
  border-top-color: #0066cc;
  border-radius: 50%;
  margin: 0 auto 1rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-text,
.error-message,
.empty-message {
  font-size: 1rem;
  color: #64748b;
}

.retry-button {
  margin-top: 1rem;
  padding: 0.75rem 2rem;
  background: #0066cc;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.retry-button:hover {
  background: #0052a5;
}

@media (max-width: 768px) {
  .search-results {
    padding: 20px 0;
  }

  .search-filters {
    padding: 16px;
    margin-bottom: 24px;
  }

  .filter-group {
    grid-template-columns: 1fr;
  }

  .search-results__title {
    font-size: 1.5rem;
    margin-bottom: 16px;
  }
}
</style>
