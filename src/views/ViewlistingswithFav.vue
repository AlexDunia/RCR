<script setup>
import { computed, onMounted, ref } from "vue";
import { useHeaderStore } from "@/stores/headerStore";
import { usePropertyStore } from "@/stores/propertyStore";
import { useRouter } from "vue-router";

// Stores
const headerStore = useHeaderStore();
const propertyStore = usePropertyStore();
const router = useRouter();

// Set header title for this page
headerStore.setTitle("Manage Listings");

// Loading and error states
const isLoading = computed(() => propertyStore.loading);
const error = computed(() => propertyStore.error);

// Filter states
const filters = ref({
  type: '',
  minPrice: null,
  maxPrice: null,
  bedrooms: null,
  bathrooms: null,
  status: ''
});

// Load properties and apply filters
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

// Toggle favorite property
const toggleFavorite = async (propertyId) => {
  try {
    await propertyStore.toggleFavorite(propertyId);
  } catch (err) {
    console.error('Failed to toggle favorite:', err);
  }
};

// Computed properties for listings
const properties = computed(() => propertyStore.filteredProperties);
const favoriteProperties = computed(() => propertyStore.favoriteProperties);
</script>

<template>
  <div class="manage-listings">
    <h2>Manage Listings</h2>

    <!-- Filters -->
    <div class="filters">
      <div class="filter-group">
        <label>Type:</label>
        <select v-model="filters.type">
          <option value="">All Types</option>
          <option value="residential">Residential</option>
          <option value="commercial">Commercial</option>
          <option value="land">Land</option>
        </select>
      </div>

      <div class="filter-group">
        <label>Price Range:</label>
        <input type="number" v-model="filters.minPrice" placeholder="Min Price">
        <input type="number" v-model="filters.maxPrice" placeholder="Max Price">
      </div>

      <div class="filter-group">
        <label>Bedrooms:</label>
        <input type="number" v-model="filters.bedrooms" min="0">
      </div>

      <div class="filter-group">
        <label>Bathrooms:</label>
        <input type="number" v-model="filters.bathrooms" min="0">
      </div>

      <div class="filter-group">
        <label>Status:</label>
        <select v-model="filters.status">
          <option value="">All Status</option>
          <option value="for_sale">For Sale</option>
          <option value="for_rent">For Rent</option>
          <option value="sold">Sold</option>
        </select>
      </div>

      <div class="filter-actions">
        <button @click="applyFilters" class="btn-primary">Apply Filters</button>
        <button @click="clearFilters" class="btn-secondary">Clear Filters</button>
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

    <!-- Properties List -->
    <div v-else-if="properties.length > 0" class="listings">
      <div v-for="property in properties" :key="property.id" class="property-card">
        <img :src="property.image" :alt="property.name" @click="router.push(`/property/${property.id}`)">

        <div class="property-info">
          <h3 @click="router.push(`/property/${property.id}`)">{{ property.name }}</h3>
          <p><strong>Location:</strong> {{ property.location }}</p>
          <p><strong>Price:</strong> ${{ property.price.toLocaleString() }}</p>
          <p><strong>Type:</strong> {{ property.type }}</p>
          <p><strong>Status:</strong> {{ property.status }}</p>
          <p v-if="property.bedrooms"><strong>Bedrooms:</strong> {{ property.bedrooms }}</p>
          <p v-if="property.bathrooms"><strong>Bathrooms:</strong> {{ property.bathrooms }}</p>
        </div>

        <!-- Favorite Button -->
        <button @click="toggleFavorite(property.id)" class="favorite-btn" :class="{ favorited: property.isFavorite }">
          <span>❤️</span>
        </button>
      </div>
    </div>

    <div v-else class="no-properties">
      <p>No listings available.</p>
    </div>
  </div>
</template>

<style scoped>
.manage-listings {
  padding: 20px;
}

.filters {
  background: white;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.filter-group label {
  font-weight: 600;
  color: #333;
}

.filter-group input,
.filter-group select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.filter-actions {
  display: flex;
  gap: 10px;
  align-items: flex-end;
}

.btn-primary,
.btn-secondary {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
}

.btn-primary {
  background: #4CAF50;
  color: white;
}

.btn-secondary {
  background: #f5f5f5;
  color: #333;
  border: 1px solid #ddd;
}

.listings {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.property-card {
  background: white;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  position: relative;
}

.property-card:hover {
  transform: translateY(-3px);
}

.property-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
}

.property-info {
  margin-top: 15px;
}

.property-info h3 {
  cursor: pointer;
  color: #333;
  margin-bottom: 10px;
}

.property-info h3:hover {
  text-decoration: underline;
}

.property-info p {
  margin: 5px 0;
  color: #666;
}

.favorite-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  background: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;
}

.favorite-btn:hover {
  transform: scale(1.1);
}

.favorite-btn.favorited span {
  color: red;
}

.loading,
.error,
.no-properties {
  text-align: center;
  padding: 40px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.error {
  color: #d32f2f;
}
</style>
