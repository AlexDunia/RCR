<script setup>
import { ref, computed, onMounted } from 'vue';
import { useListingStore } from '@/stores/listingStore';
import { useClientStore } from '@/stores/clientStore';

const listingStore = useListingStore();
const clientStore = useClientStore();

// Mock client ID for demo purposes
const clientId = 1;

// Get all listings
const allListings = computed(() => {
  return listingStore.getAllListings() || [];
});

// Filter states
const filters = ref({
  priceMin: 0,
  priceMax: 2000000,
  bedrooms: '',
  bathrooms: '',
  propertyType: '',
  keyword: '',
  sortBy: 'newest'
});

// Property types for filter
const propertyTypes = [
  'House',
  'Condo',
  'Townhouse',
  'Multi-family',
  'Land',
  'Commercial'
];

// Filtered listings based on applied filters
const filteredListings = computed(() => {
  return allListings.value.filter(listing => {
    // Price filter
    if (listing.price < filters.value.priceMin || listing.price > filters.value.priceMax) {
      return false;
    }

    // Bedrooms filter
    if (filters.value.bedrooms && parseInt(filters.value.bedrooms) !== listing.bedrooms) {
      return false;
    }

    // Bathrooms filter
    if (filters.value.bathrooms && parseInt(filters.value.bathrooms) !== listing.bathrooms) {
      return false;
    }

    // Property type filter
    if (filters.value.propertyType && filters.value.propertyType !== listing.propertyType) {
      return false;
    }

    // Keyword filter
    if (filters.value.keyword) {
      const keyword = filters.value.keyword.toLowerCase();
      const addressMatch = listing.address.toLowerCase().includes(keyword);
      const cityMatch = listing.city.toLowerCase().includes(keyword);
      const descriptionMatch = listing.description.toLowerCase().includes(keyword);

      if (!addressMatch && !cityMatch && !descriptionMatch) {
        return false;
      }
    }

    return true;
  }).sort((a, b) => {
    // Sort by selected option
    switch (filters.value.sortBy) {
      case 'priceAsc':
        return a.price - b.price;
      case 'priceDesc':
        return b.price - a.price;
      case 'newest':
        return new Date(b.listedDate) - new Date(a.listedDate);
      case 'oldest':
        return new Date(a.listedDate) - new Date(b.listedDate);
      default:
        return 0;
    }
  });
});

// Format price display
const formatPrice = (price) => {
  return price.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
};

// Get saved status of a property
const isSaved = (listingId) => {
  const clientDetails = clientStore.getClientFullDetails(clientId);
  if (!clientDetails || !clientDetails.interactions || !clientDetails.interactions.mostSavedListings) {
    return false;
  }
  return clientDetails.interactions.mostSavedListings.some(listing => listing.id === listingId);
};

// Toggle saved status
const toggleSaveProperty = (listingId) => {
  if (isSaved(listingId)) {
    // We'd normally implement removing from saved listings here
    console.log('Would unsave property', listingId);
  } else {
    clientStore.saveListingForClient(clientId, listingId);
    console.log('Saved property', listingId);
  }
};

// Clear all filters
const clearFilters = () => {
  filters.value = {
    priceMin: 0,
    priceMax: 2000000,
    bedrooms: '',
    bathrooms: '',
    propertyType: '',
    keyword: '',
    sortBy: 'newest'
  };
};

// Track property view
const viewProperty = (listingId) => {
  clientStore.trackListingView(clientId, listingId);
};

onMounted(() => {
  // Load listings if needed
  console.log(`Loaded ${allListings.value.length} properties`);
});
</script>

<template>
  <div class="property-search">
    <div class="search-header">
      <h1>Find Your Dream Home</h1>
      <p class="subtitle">Browse our extensive collection of properties</p>
    </div>

    <div class="search-container">
      <div class="filters-panel">
        <h2>Filters</h2>

        <div class="filter-group">
          <label for="keyword">Search</label>
          <input
            type="text"
            id="keyword"
            v-model="filters.keyword"
            placeholder="Address, city, or keywords"
            class="filter-input"
          >
        </div>

        <div class="filter-group">
          <label>Price Range</label>
          <div class="price-range">
            <input
              type="number"
              v-model.number="filters.priceMin"
              placeholder="Min"
              class="filter-input half"
            >
            <span class="range-separator">to</span>
            <input
              type="number"
              v-model.number="filters.priceMax"
              placeholder="Max"
              class="filter-input half"
            >
          </div>
        </div>

        <div class="filter-group">
          <label for="bedrooms">Bedrooms</label>
          <select id="bedrooms" v-model="filters.bedrooms" class="filter-input">
            <option value="">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
            <option value="5">5+</option>
          </select>
        </div>

        <div class="filter-group">
          <label for="bathrooms">Bathrooms</label>
          <select id="bathrooms" v-model="filters.bathrooms" class="filter-input">
            <option value="">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
          </select>
        </div>

        <div class="filter-group">
          <label for="propertyType">Property Type</label>
          <select id="propertyType" v-model="filters.propertyType" class="filter-input">
            <option value="">Any</option>
            <option v-for="type in propertyTypes" :key="type" :value="type">
              {{ type }}
            </option>
          </select>
        </div>

        <div class="filter-actions">
          <button @click="clearFilters" class="clear-button">Clear Filters</button>
        </div>
      </div>

      <div class="listings-panel">
        <div class="listings-header">
          <div class="results-count">
            <span>{{ filteredListings.length }} properties</span>
          </div>

          <div class="sort-options">
            <label for="sortBy">Sort by:</label>
            <select id="sortBy" v-model="filters.sortBy" class="sort-select">
              <option value="newest">Newest</option>
              <option value="priceAsc">Price (Low to High)</option>
              <option value="priceDesc">Price (High to Low)</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </div>

        <div class="listings-grid" v-if="filteredListings.length > 0">
          <div
            v-for="listing in filteredListings"
            :key="listing.id"
            class="property-card"
            @click="viewProperty(listing.id)"
          >
            <div class="property-image" :style="{ backgroundImage: `url(${listing.images[0]})` }">
              <div class="property-status" v-if="listing.status === 'New'">New</div>
              <button
                class="save-button"
                :class="{ 'saved': isSaved(listing.id) }"
                @click.stop="toggleSaveProperty(listing.id)"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z" :stroke="isSaved(listing.id) ? 'none' : 'currentColor'" :fill="isSaved(listing.id) ? 'currentColor' : 'none'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>

            <div class="property-info">
              <h3 class="property-price">{{ formatPrice(listing.price) }}</h3>
              <p class="property-specs">
                {{ listing.bedrooms }} bd | {{ listing.bathrooms }} ba | {{ listing.sqft.toLocaleString() }} sqft
              </p>
              <p class="property-address">{{ listing.address }}</p>
              <p class="property-location">{{ listing.city }}, {{ listing.state }}</p>
              <p class="property-type">{{ listing.propertyType }}</p>
            </div>
          </div>
        </div>

        <div class="no-results" v-else>
          <h3>No properties match your search criteria</h3>
          <p>Try adjusting your filters to see more results</p>
          <button @click="clearFilters" class="primary-button">Clear Filters</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.property-search {
  padding: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.search-header {
  margin-bottom: 24px;
}

.search-header h1 {
  font-size: 28px;
  margin: 0;
  color: #333;
}

.subtitle {
  color: #666;
  margin: 8px 0 0 0;
  font-size: 16px;
}

.search-container {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 24px;
}

.filters-panel {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  height: fit-content;
}

.filters-panel h2 {
  font-size: 18px;
  margin: 0 0 20px 0;
  color: #333;
}

.filter-group {
  margin-bottom: 16px;
}

.filter-group label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 6px;
  color: #555;
}

.filter-input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  color: #333;
  transition: border-color 0.2s;
}

.filter-input:focus {
  border-color: #006064;
  outline: none;
}

.price-range {
  display: flex;
  align-items: center;
}

.filter-input.half {
  width: calc(50% - 10px);
}

.range-separator {
  margin: 0 10px;
  color: #666;
}

.filter-actions {
  margin-top: 24px;
}

.clear-button {
  background: #f0f0f0;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #555;
  cursor: pointer;
  transition: background-color 0.2s;
}

.clear-button:hover {
  background: #e0e0e0;
}

.listings-panel {
  display: flex;
  flex-direction: column;
}

.listings-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.results-count {
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

.sort-options {
  display: flex;
  align-items: center;
}

.sort-options label {
  margin-right: 8px;
  font-size: 14px;
  color: #666;
}

.sort-select {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  color: #333;
  background: white;
}

.listings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.property-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
}

.property-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.property-image {
  height: 200px;
  background-size: cover;
  background-position: center;
  position: relative;
}

.property-status {
  position: absolute;
  top: 12px;
  left: 12px;
  background: #4CAF50;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.save-button {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #666;
  transition: background-color 0.2s, color 0.2s;
}

.save-button:hover {
  background: white;
}

.save-button.saved {
  color: #E91E63;
}

.property-info {
  padding: 16px;
}

.property-price {
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: #006064;
}

.property-specs,
.property-address,
.property-location {
  margin: 4px 0;
  font-size: 14px;
  color: #666;
  line-height: 1.4;
}

.property-address {
  color: #333;
  font-weight: 500;
}

.property-type {
  display: inline-block;
  background: #e6f7f7;
  color: #006064;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 12px;
  margin-top: 8px;
  font-weight: 500;
}

.no-results {
  background: white;
  border-radius: 12px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.no-results h3 {
  margin: 0 0 8px 0;
  font-size: 18px;
  color: #333;
}

.no-results p {
  margin: 0 0 20px 0;
  color: #666;
}

.primary-button {
  display: inline-block;
  background: #006064;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.primary-button:hover {
  background: #00796b;
}

@media (max-width: 920px) {
  .search-container {
    grid-template-columns: 1fr;
  }

  .filters-panel {
    margin-bottom: 20px;
  }
}

@media (max-width: 480px) {
  .property-search {
    padding: 20px;
  }

  .search-header h1 {
    font-size: 24px;
  }

  .listings-grid {
    grid-template-columns: 1fr;
  }
}
</style>
