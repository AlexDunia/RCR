<template>
  <div class="search-results">
    <div class="search-results__hero">
      <div class="boxed-container">
        <h1 class="search-results__hero-title">Find Your Dream Home</h1>
        <p class="search-results__hero-subtitle">Discover the perfect property that matches your lifestyle</p>
      </div>
    </div>

    <div class="boxed-container">
      <!-- Enhanced Search Filters -->
      <div class="search-filters">
        <form @submit.prevent="handleSearch" class="search-form">
          <div class="search-input-group">
            <div class="search-input-wrapper input-icon-wrapper">
              <span class="search-icon-inside">
                <i class="fas fa-search"></i>
              </span>
              <input
                v-model="searchParams.query"
                type="text"
                class="search-input with-icon"
                placeholder="Search by property type, location, or ID…"
              >
            </div>
            <div class="filter-group">
              <div class="filter-input-wrapper">
                <span class="filter-icon">
                  <i class="fas fa-city"></i>
                </span>
                <input
                  v-model="searchParams.city"
                  type="text"
                  class="filter-input"
                  placeholder="City"
                >
              </div>
              <div class="filter-input-wrapper">
                <span class="filter-icon">
                  <i class="fas fa-dollar-sign"></i>
                </span>
                <input
                  v-model="searchParams.minPrice"
                  type="number"
                  class="filter-input"
                  placeholder="Min Price"
                >
              </div>
              <div class="filter-input-wrapper">
                <span class="filter-icon">
                  <i class="fas fa-dollar-sign"></i>
                </span>
                <input
                  v-model="searchParams.maxPrice"
                  type="number"
                  class="filter-input"
                  placeholder="Max Price"
                >
              </div>
              <div class="filter-input-wrapper">
                <span class="filter-icon">
                  <i class="fas fa-bed"></i>
                </span>
                <input
                  v-model="searchParams.bedrooms"
                  type="number"
                  class="filter-input"
                  placeholder="Bedrooms"
                >
              </div>
            </div>
            <button type="submit" class="search-btn">
              <i class="fas fa-search"></i>
              Search Properties
            </button>
          </div>
        </form>
      </div>

      <!-- Results Section -->
      <div class="search-results__content">
        <div class="search-results__header">
          <h2 class="search-results__title">Search Results</h2>
          <div class="search-results__stats" v-if="totalResults">
            {{ totalResults }} properties found
            <button class="reset-filters-btn" @click="resetFilters" v-if="hasActiveFilters">
              <i class="fas fa-times"></i>
              Clear Filters
            </button>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="propertyStore.loading" class="loading-state">
          <div class="loading-spinner"></div>
          <div class="loading-text">Discovering properties for you...</div>
        </div>

        <!-- Error State -->
        <div v-else-if="propertyStore.error" class="error-state">
          <div class="error-icon">
            <i class="fas fa-exclamation-circle"></i>
          </div>
          <div class="error-message">{{ propertyStore.error }}</div>
          <button class="retry-button" @click="handleSearch">
            <i class="fas fa-sync-alt"></i>
            Try Again
          </button>
        </div>

        <!-- Empty State -->
        <div v-else-if="!propertyStore.searchResults?.length" class="empty-state">
          <div class="empty-icon">
            <i class="fas fa-home"></i>
          </div>
          <div class="empty-message">No properties found matching your search criteria.</div>
          <p class="empty-suggestion">Try adjusting your filters or search terms.</p>
        </div>

        <!-- Results Grid -->
        <div v-else>
          <div class="property-grid">
            <router-link
              v-for="property in propertyStore.searchResults"
              :key="property.ListingKey"
              :to="`/property/${property.ListingKey}`"
              class="property-card"
          >
            <div class="property-card__image">
              <img
                v-if="property.media && property.media.length > 0"
                :src="property.media[0].MediaURL"
                :alt="property.UnparsedAddress || 'Property Image'"
                class="property-card__img"
                loading="lazy"
              />
              <div class="property-card__badges">
                <span
                  v-if="property.StandardStatus === 'Active'"
                  class="property-badge property-badge--active"
                >
                  Active
                </span>
                <span
                  v-else-if="property.StandardStatus === 'Sold'"
                  class="property-badge property-badge--sold"
                >
                  Sold
                </span>
                <span
                  v-else-if="property.StandardStatus === 'Pending'"
                  class="property-badge property-badge--pending"
                >
                  Pending
                </span>
                <span
                  class="property-badge property-badge--type"
                >
                  {{ property.PropertyType || 'Residential' }}
                </span>
              </div>
              <div class="property-card__favorite">
                <i class="far fa-heart"></i>
              </div>
            </div>
            <div class="property-card__content">
              <div class="property-card__price">${{ formatPrice(property.ListPrice) }}</div>
              <h3 class="property-card__title">{{ property.UnparsedAddress }}</h3>
              <div class="property-card__details">
                <span class="property-card__detail">
                  <i class="fas fa-bed"></i>
                  {{ property.BedroomsTotal || 'N/A' }} Beds
                </span>
                <span class="property-card__detail">
                  <i class="fas fa-bath"></i>
                  {{ property.BathroomsFull || 'N/A' }} Baths
                </span>
                <span class="property-card__detail">
                  <i class="fas fa-ruler-combined"></i>
                  {{ formatArea(property.LivingArea) || 'N/A' }} sqft
                </span>
              </div>
              <div class="property-card__location">
                <i class="fas fa-map-marker-alt"></i>
                {{ property.City }}, {{ property.StateOrProvince }}
              </div>
              <div class="property-card__hover">
                <span class="property-card__btn">View Details</span>
              </div>
            </div>
          </router-link>
          </div>

          <!-- Pagination Controls -->
          <div class="pagination" v-if="totalPages > 1">
            <button
              class="pagination__btn"
              :class="{ 'pagination__btn--disabled': currentPage === 1 }"
              :disabled="currentPage === 1"
              @click="handlePageChange(currentPage - 1)"
            >
              <i class="fas fa-chevron-left"></i>
              Previous
            </button>

            <div class="pagination__pages">
              <button
                v-for="page in displayedPages"
                :key="page"
                class="pagination__page"
                :class="{ 'pagination__page--active': page === currentPage }"
                @click="handlePageChange(page)"
              >
                {{ page }}
              </button>
            </div>

            <button
              class="pagination__btn"
              :class="{ 'pagination__btn--disabled': currentPage === totalPages }"
              :disabled="currentPage === totalPages"
              @click="handlePageChange(currentPage + 1)"
            >
              Next
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { usePropertyStore } from '@/stores/propertyStore';
import { useRoute, useRouter } from 'vue-router';

const propertyStore = usePropertyStore();
const route = useRoute();
const router = useRouter();

const currentPage = ref(1);
const itemsPerPage = 12; // Number of items per page

const searchParams = ref({
  query: '',
  city: '',
  minPrice: '',
  maxPrice: '',
  bedrooms: '',
  page: currentPage.value,
  perPage: itemsPerPage
});

// Computed properties for pagination
const totalPages = computed(() => {
  if (!propertyStore.totalResults) return 0;
  return Math.ceil(propertyStore.totalResults / itemsPerPage);
});

const displayedPages = computed(() => {
  if (totalPages.value <= 7) {
    return Array.from({ length: totalPages.value }, (_, i) => i + 1);
  }

  const pages = [];
  const current = currentPage.value;
  const total = totalPages.value;

  // Always show first page
  pages.push(1);

  if (current > 3) {
    pages.push('...');
  }

  // Show pages around current page
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
    pages.push(i);
  }

  if (current < total - 2) {
    pages.push('...');
  }

  // Always show last page
  if (total > 1) {
    pages.push(total);
  }

  return pages;
});

// Format price with commas and dollar sign
const formatPrice = (price) => {
  if (!price) return 'Price on request';
  return new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};

// Format area with commas and handle null values
const formatArea = (area) => {
  if (!area) return null;
  return new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(area);
};

// Computed property for total results count
const totalResults = computed(() => {
  return propertyStore.searchResults?.length || 0;
});

// Check if any filters are active
const hasActiveFilters = computed(() => {
  return searchParams.value.query ||
    searchParams.value.city ||
    searchParams.value.minPrice ||
    searchParams.value.maxPrice ||
    searchParams.value.bedrooms;
});

const handleSearch = async (resetPage = true) => {
  try {
    // Reset to page 1 if it's a new search
    if (resetPage) {
      currentPage.value = 1;
    }

    // Update search params with current page
    searchParams.value = {
      ...searchParams.value,
      page: currentPage.value,
      perPage: itemsPerPage
    };

    // Update URL query parameters
    const queryParams = {
      q: searchParams.value.query || undefined,
      city: searchParams.value.city || undefined,
      minPrice: searchParams.value.minPrice || undefined,
      maxPrice: searchParams.value.maxPrice || undefined,
      bedrooms: searchParams.value.bedrooms || undefined,
      page: searchParams.value.page > 1 ? searchParams.value.page : undefined,
      perPage: searchParams.value.perPage !== 12 ? searchParams.value.perPage : undefined
    };

    // Remove undefined values
    Object.keys(queryParams).forEach(key => {
      if (queryParams[key] === undefined) {
        delete queryParams[key];
      }
    });

    // Update URL without triggering a navigation
    await router.replace({
      query: queryParams
    });

    // Scroll to top before search
    window.scrollTo({ top: 0, behavior: 'smooth' });
    await propertyStore.searchProperties(searchParams.value);
  } catch (error) {
    console.error('Search failed:', error);
  }
};

const handlePageChange = async (page) => {
  if (page === '...') return;
  currentPage.value = page;
  await handleSearch(false);
};

// Reset search filters
const resetFilters = async () => {
  searchParams.value = {
    query: '',
    city: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    page: 1,
    perPage: 12
  };

  // Clear URL query parameters
  await router.replace({ query: {} });

  // Perform a new search with reset filters
  await handleSearch();
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
    perPage: parseInt(query.perPage) || 12
  };

  // Perform initial search if there are query params
  if (query.q || query.city || query.minPrice || query.maxPrice || query.bedrooms) {
    handleSearch();
  }
});
</script>

<style scoped>
/* Base Styles */
.search-results {
  min-height: 100vh;
  background: linear-gradient(to bottom, #f8fafc, #ffffff);
  font-family: 'Poppins', sans-serif;
}

.boxed-container {
  width: 85%;
  max-width: 1400px;
  margin: 0 auto;
}

/* Hero Section */
.search-results__hero {
  background: linear-gradient(135deg, #0066cc, #0052a5);
  padding: 60px 0;
  color: white;
  margin-bottom: 40px;
  position: relative;
  overflow: hidden;
}

.search-results__hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('https://res.cloudinary.com/dnuhjsckk/image/upload/v1743087291/Designer_8_1_fjvyi0.png') center/cover;
  opacity: 0.1;
  z-index: 1;
}

.search-results__hero > .boxed-container {
  position: relative;
  z-index: 2;
}

.search-results__hero-title {
  font-size: 2.8rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.search-results__hero-subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
}

/* Search Filters */
.search-filters {
  background: white;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin-top: -80px;
  position: relative;
  z-index: 3;
}

.search-form {
  width: 100%;
}

.search-input-group {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.filter-group {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.filter-input-wrapper {
  position: relative;
}

.filter-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
}

.filter-input {
  width: 100%;
  height: 52px;
  padding: 0 16px 0 48px;
  border: 1.5px solid #e2e8f0;
  border-radius: 12px;
  font-size: 15px;
  color: #1e293b;
  transition: all 0.2s ease;
  background: #f8fafc;
}

.filter-input:focus {
  border-color: #0066cc;
  outline: none;
  background: white;
  box-shadow: 0 0 0 4px rgba(0, 102, 204, 0.1);
}

.search-btn {
  height: 52px;
  padding: 0 32px;
  background: linear-gradient(135deg, #0066cc, #0052a5);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.search-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 102, 204, 0.2);
}

/* Results Section */
.search-results__content {
  padding: 40px 0;
}

.search-results__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.search-results__title {
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.search-results__stats {
  font-size: 1.1rem;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 16px;
}

.reset-filters-btn {
  padding: 8px 16px;
  background: #f1f5f9;
  border: none;
  border-radius: 8px;
  color: #64748b;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 6px;
}

.reset-filters-btn:hover {
  background: #e2e8f0;
  color: #1e293b;
}

/* Property Grid */
.property-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 32px;
  margin: 0 auto;
}

.property-card {
  position: relative;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
  border: 1px solid rgba(0, 0, 0, 0.04);
}

.property-card:hover {
  transform: translateY(-8px) scale(1.01);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
}

.property-card__image {
  position: relative;
  width: 100%;
  padding-top: 66.67%;
  overflow: hidden;
}

.property-card__img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.property-card:hover .property-card__img {
  transform: scale(1.08);
}

.property-card__badges {
  position: absolute;
  top: 16px;
  left: 16px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.property-badge {
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  color: white;
  backdrop-filter: blur(4px);
}

.property-badge--active {
  background: rgba(34, 197, 94, 0.9);
}

.property-badge--sold {
  background: rgba(239, 68, 68, 0.9);
}

.property-badge--pending {
  background: rgba(245, 158, 11, 0.9);
}

.property-badge--type {
  background: rgba(0, 102, 204, 0.9);
}

.property-card__favorite {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(4px);
}

.property-card__favorite:hover {
  transform: scale(1.1);
  background: white;
}

.property-card__content {
  padding: 24px;
  position: relative;
}

.property-card__price {
  font-size: 1.5rem;
  font-weight: 700;
  color: #0066cc;
  margin-bottom: 8px;
}

.property-card__title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 16px;
  line-height: 1.4;
}

.property-card__details {
  display: flex;
  gap: 20px;
  margin-bottom: 16px;
}

.property-card__detail {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #64748b;
  font-size: 0.875rem;
}

.property-card__location {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #64748b;
  font-size: 0.875rem;
  margin-top: 12px;
}

.property-card__hover {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 24px;
  background: linear-gradient(to top, rgba(255, 255, 255, 0.95), transparent);
  transform: translateY(100%);
  transition: transform 0.3s ease;
  display: flex;
  justify-content: center;
}

.property-card:hover .property-card__hover {
  transform: translateY(0);
}

.property-card__btn {
  padding: 12px 24px;
  background: #0066cc;
  color: white;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.875rem;
  transition: all 0.2s ease;
}

.property-card__btn:hover {
  background: #0052a5;
  transform: translateY(-2px);
}

/* Loading State */
.loading-state {
  text-align: center;
  padding: 60px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.loading-spinner {
  width: 48px;
  height: 48px;
  border: 3px solid #e2e8f0;
  border-top-color: #0066cc;
  border-radius: 50%;
  margin: 0 auto 20px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Error State */
.error-state {
  text-align: center;
  padding: 60px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.error-icon {
  font-size: 48px;
  color: #ef4444;
  margin-bottom: 20px;
}

.retry-button {
  margin-top: 24px;
  padding: 12px 32px;
  background: #0066cc;
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 24px auto 0;
}

.retry-button:hover {
  background: #0052a5;
  transform: translateY(-2px);
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 60px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.empty-icon {
  font-size: 48px;
  color: #94a3b8;
  margin-bottom: 20px;
}

.empty-message {
  font-size: 1.25rem;
  color: #1e293b;
  margin-bottom: 8px;
}

.empty-suggestion {
  color: #64748b;
  margin: 0;
}

/* Pagination Styles */
.pagination {
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
}

.pagination__btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: white;
  border: 1.5px solid #e2e8f0;
  border-radius: 12px;
  color: #1e293b;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pagination__btn:not(.pagination__btn--disabled):hover {
  background: #f8fafc;
  border-color: #cbd5e1;
  transform: translateY(-1px);
}

.pagination__btn--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: #f8fafc;
}

.pagination__pages {
  display: flex;
  align-items: center;
  gap: 8px;
}

.pagination__page {
  min-width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border: 1.5px solid #e2e8f0;
  background: white;
  color: #1e293b;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pagination__page:not(.pagination__page--active):hover {
  background: #f8fafc;
  border-color: #cbd5e1;
  transform: translateY(-1px);
}

.pagination__page--active {
  background: #0066cc;
  border-color: #0066cc;
  color: white;
  cursor: default;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .boxed-container {
    width: 90%;
  }

  .property-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
}

@media (max-width: 768px) {
  .search-results__hero {
    padding: 40px 0;
  }

  .search-results__hero-title {
    font-size: 2rem;
  }

  .search-filters {
    padding: 24px;
    margin-top: -60px;
  }

  .filter-group {
    grid-template-columns: 1fr;
  }

  .property-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .property-card {
    max-width: 100%;
  }
}

@media (max-width: 480px) {
  .boxed-container {
    width: 95%;
  }

  .search-results__hero-title {
    font-size: 1.75rem;
  }

  .search-results__hero-subtitle {
    font-size: 1rem;
  }

  .search-filters {
    padding: 20px;
    margin-top: -40px;
  }

  .property-card__content {
    padding: 20px;
  }

  .property-card__details {
    flex-wrap: wrap;
    gap: 12px;
  }
}
</style>
