<script setup>
import { ref, computed, onMounted } from "vue";
import { useHeaderStore } from "@/stores/headerStore";
import { usePropertyStore } from "@/stores/propertyStore";

const headerStore = useHeaderStore();
const propertyStore = usePropertyStore();

// Set the header title for this page
headerStore.setTitle("View Listings");

// Search and filters
const searchQuery = ref('');
const filters = ref({
  type: '',
  minPrice: null,
  maxPrice: null,
  bedrooms: null,
  bathrooms: null,
  status: ''
});

// Loading and error states
const isLoading = computed(() => propertyStore.loading);
const error = computed(() => propertyStore.error);

// Filtered properties
const filteredProperties = computed(() => {
  let properties = propertyStore.properties;

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    properties = properties.filter(property =>
      property.name.toLowerCase().includes(query) ||
      property.address.toLowerCase().includes(query) ||
      property.description.toLowerCase().includes(query)
    );
  }

  return properties;
});

// Load properties on mount
onMounted(async () => {
  try {
    await propertyStore.fetchProperties();
  } catch (err) {
    console.error('Failed to fetch properties:', err);
  }
});

// Apply filters
const applyFilters = () => {
  const validFilters = Object.entries(filters.value).reduce((acc, [key, value]) => {
    if (value !== null && value !== '') {
      acc[key] = value;
    }
    return acc;
  }, {});

  propertyStore.setFilters(validFilters);
};

// Clear filters
const clearFilters = () => {
  filters.value = {
    type: '',
    minPrice: null,
    maxPrice: null,
    bedrooms: null,
    bathrooms: null,
    status: ''
  };
  propertyStore.clearFilters();
};

// Toggle favorite
const toggleFavorite = async (propertyId) => {
  try {
    await propertyStore.toggleFavorite(propertyId);
  } catch (err) {
    console.error('Failed to toggle favorite:', err);
  }
};
</script>

<template>
  <div class="manage-listings">
    <!-- Tab Navigation -->
    <div class="tab-navigation">
      <router-link to="/add-listing" replace>
        <i class="fas fa-plus-circle"></i> Add Listing
      </router-link>

      <div class="tab-item">
        <router-link to="/view-listings" class="special" replace>
          <i class="fas fa-home" id="special"></i> View Listings
        </router-link>
        <div class="special-underline"></div>
      </div>

      <router-link to="/pending-approvals" class="pend" replace>
        <i class="fas fa-clock"></i> Pending Approvals
      </router-link>
      <router-link to="/drafts" class="drafts" replace>
        <i class="fas fa-file-alt"></i> Drafts
      </router-link>
      <div class="tab-underline"></div>
    </div>
    <br/>
    <div class="second-special-underline"></div>

    <!-- Add Property & Search -->
    <div class="add-property-container">
      <div class="add-property">
        <h2>Your Properties</h2>
        <p>A list of all properties on your profile</p>
      </div>
      <!-- Search Bar -->
      <div class="search-bar">
        <svg class="search-icon" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8" stroke="black" stroke-width="1.5" fill="none" />
          <line x1="16" y1="16" x2="22" y2="22" stroke="black" stroke-width="1.5" />
        </svg>
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search by name, address, or description..."
        />
      </div>
    </div>

    <!-- Filters -->
    <div class="filters">
      <div class="filter-row">
        <div class="filter-group">
          <label>Type</label>
          <select v-model="filters.type">
            <option value="">All Types</option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="land">Land</option>
          </select>
        </div>

        <div class="filter-group">
          <label>Status</label>
          <select v-model="filters.status">
            <option value="">All Status</option>
            <option value="for_sale">For Sale</option>
            <option value="for_rent">For Rent</option>
            <option value="sold">Sold</option>
          </select>
        </div>

        <div class="filter-group">
          <label>Price Range</label>
          <div class="price-inputs">
            <input
              type="number"
              v-model="filters.minPrice"
              placeholder="Min"
            />
            <span>-</span>
            <input
              type="number"
              v-model="filters.maxPrice"
              placeholder="Max"
            />
          </div>
        </div>

        <div class="filter-group">
          <label>Bedrooms</label>
          <input
            type="number"
            v-model="filters.bedrooms"
            min="0"
            placeholder="Any"
          />
        </div>

        <div class="filter-group">
          <label>Bathrooms</label>
          <input
            type="number"
            v-model="filters.bathrooms"
            min="0"
            placeholder="Any"
          />
        </div>

        <div class="filter-actions">
          <button @click="applyFilters" class="apply-btn">Apply Filters</button>
          <button @click="clearFilters" class="clear-btn">Clear</button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="loading">
      Loading properties...
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error">
      {{ error }}
    </div>

    <!-- Properties Grid -->
    <div v-else-if="filteredProperties.length > 0" class="properties-grid">
      <div v-for="property in filteredProperties" :key="property.id" class="property-card">
        <div class="property-image">
          <img :src="property.image" :alt="property.name">
          <button
            class="favorite-btn"
            :class="{ active: property.isFavorite }"
            @click="toggleFavorite(property.id)"
          >
            <i class="fas fa-heart"></i>
          </button>
        </div>
        <div class="property-info">
          <h3>{{ property.name }}</h3>
          <p class="property-location">{{ property.address }}</p>
          <p class="property-price">${{ property.price.toLocaleString() }}</p>
          <div class="property-specs">
            <span v-if="property.bedrooms">
              <i class="fas fa-bed"></i> {{ property.bedrooms }}
            </span>
            <span v-if="property.bathrooms">
              <i class="fas fa-bath"></i> {{ property.bathrooms }}
            </span>
            <span v-if="property.size">
              <i class="fas fa-ruler-combined"></i> {{ property.size }} ft²
            </span>
          </div>
          <div class="property-status" :class="property.status">
            {{ property.status.replace('_', ' ') }}
          </div>
        </div>
      </div>
    </div>

    <!-- No Properties -->
    <div v-else class="no-properties">
      <p>No properties found.</p>
    </div>
  </div>
</template>

<style scoped>
.manage-listings {
  padding: 35px;
  max-width: 1200px;
  margin: 0 auto;
}

.tab-navigation .special {
  background: #F0EFEF;
  color: #0A397B;
  font-weight: 500;
  border: 1px solid rgba(0, 102, 255, 0.3);
}

.tab-navigation #special {
  color: #0A397B;
}

.tab-navigation .pend {
  padding-left: 15px;
  padding-right: 15px;
}

.tab-navigation .drafts {
  padding-left: 0px;
  padding-right: 0px;
}

.tab-navigation {
  display: flex;
  gap: 30px;
  margin-bottom: 10px;
}

.tab-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.tab-navigation a {
  padding: 3px 5px;
  font-size: 13.6px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.6);
  text-decoration: none;
  border-radius: 5px;
  border: 1px solid #E2E8F0;
  background: #FCFCFC;
  transition: all 0.3s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  min-width: 120px;
  width: auto;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
  text-align: center;
  white-space: nowrap;
  gap: 8px;
}

.tab-navigation a i {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.4);
}

.special-underline {
  position: absolute;
  bottom: -6px;
  left: 50%;
  top: 125%;
  width: 60%;
  height: 0.4px;
  background: #074F90;
  transform: translateX(-50%);
  border-radius: 2px;
}

.second-special-underline {
  width: 100%;
  height: 1px;
  background: rgba(7, 79, 144, 0.1);
  border-radius: 1px;
  margin-bottom: 10px;
  box-shadow: 0px 1px 3px rgba(10, 57, 123, 0.1);
}

.add-property-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  gap: 20px;
  max-width: 100%;
  overflow: hidden;
  margin-bottom: 20px;
}

.add-property {
  flex-grow: 1;
  min-width: 200px;
}

.add-property h2 {
  font-size: 22px;
  color: rgb(57, 57, 57);
  font-weight: 600;
  margin-bottom: -10px;
  letter-spacing: -0.9px;
}

.add-property p {
  font-size: 14.6px;
  color: black;
  font-weight: 500;
}

.search-bar {
  display: flex;
  align-items: center;
  background: #EAE8E8;
  border-radius: 8px;
  color: rgba(0, 0, 0, 0.4);
  padding: 12px 16px;
  width: 430px;
  transition: border 0.2s ease-in-out;
}

.search-bar:focus-within {
  border: 1.5px solid rgba(0, 102, 255, 0.3);
}

input {
  border: none;
  outline: none;
  background: transparent;
  flex: 1;
  padding-left: 8px;
  font-size: 13px;
}

input::placeholder {
  color: rgba(0, 0, 0, 0.3);
  font-weight: 500;
}

input {
  color: rgba(0, 0, 0, 0.8);
  font-weight: 400;
}

.search-icon {
  width: 16px;
  height: 16px;
  font-size: 8px;
  color: rgba(0, 0, 0, 0.2);
  font-weight: bold;
}

/* New styles for filters */
.filters {
  background: white;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.filter-row {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.filter-group {
  flex: 1;
  min-width: 150px;
}

.filter-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
  font-size: 14px;
}

.filter-group select,
.filter-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.price-inputs {
  display: flex;
  gap: 8px;
  align-items: center;
}

.price-inputs input {
  width: calc(50% - 4px);
}

.filter-actions {
  display: flex;
  gap: 10px;
  align-items: flex-end;
}

.apply-btn,
.clear-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
}

.apply-btn {
  background: #4CAF50;
  color: white;
}

.clear-btn {
  background: #f5f5f5;
  color: #333;
  border: 1px solid #ddd;
}

/* Properties Grid */
.properties-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.property-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.property-card:hover {
  transform: translateY(-3px);
}

.property-image {
  position: relative;
  height: 200px;
}

.property-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.favorite-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: white;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s;
}

.favorite-btn:hover {
  transform: scale(1.1);
}

.favorite-btn i {
  color: #666;
  font-size: 18px;
}

.favorite-btn.active i {
  color: red;
}

.property-info {
  padding: 15px;
}

.property-info h3 {
  margin: 0 0 8px;
  font-size: 18px;
  color: #333;
}

.property-location {
  color: #666;
  font-size: 14px;
  margin-bottom: 8px;
}

.property-price {
  font-size: 20px;
  font-weight: 600;
  color: #4CAF50;
  margin-bottom: 12px;
}

.property-specs {
  display: flex;
  gap: 15px;
  margin-bottom: 12px;
}

.property-specs span {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #666;
  font-size: 14px;
}

.property-specs i {
  color: #999;
}

.property-status {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  text-transform: capitalize;
}

.property-status.for_sale {
  background: #E8F5E9;
  color: #2E7D32;
}

.property-status.for_rent {
  background: #E3F2FD;
  color: #1565C0;
}

.property-status.sold {
  background: #FFEBEE;
  color: #C62828;
}

/* Loading and Error States */
.loading,
.error,
.no-properties {
  text-align: center;
  padding: 40px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

.error {
  color: #d32f2f;
}
</style>
