<template>
  <div :key="$route.fullPath" class="buy-properties-page">
    <GlobalHeader />
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <h1>Find Your Dream Home</h1>
        <p>Discover properties for sale in prime locations</p>
      </div>
    </section>

    <div class="main-container">
      <!-- Search and Filter Section -->
      <section class="search-filter-section">
        <div class="container">
          <div class="search-bar">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Search by location, property name, or features..."
              @input="handleSearch"
            />
            <button class="search-btn">Search</button>
          </div>

          <div class="filter-bar">
            <div class="filter-group">
              <label>Property Type</label>
              <select v-model="filters.propertyType">
                <option value="">All Types</option>
                <option v-for="type in propertyTypes" :key="type" :value="type">
                  {{ type }}
                </option>
              </select>
            </div>

            <div class="filter-group">
              <label>Price Range</label>
              <select v-model="filters.priceRange">
                <option value="">Any Price</option>
                <option value="0-300000">$0 - $300k</option>
                <option value="300000-500000">$300k - $500k</option>
                <option value="500000-1000000">$500k - $1M</option>
                <option value="1000000-2000000">$1M - $2M</option>
                <option value="2000000+">$2M+</option>
              </select>
            </div>

            <div class="filter-group">
              <label>Bedrooms</label>
              <select v-model="filters.bedrooms">
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="5">5+</option>
              </select>
            </div>

            <div class="filter-group">
              <label>Bathrooms</label>
              <select v-model="filters.bathrooms">
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <!-- Properties Grid -->
      <section class="properties-grid-section">
        <div class="container">
          <div class="properties-grid">
            <div v-for="property in filteredProperties" :key="property.id" class="property-card" @click="viewProperty(property.id)">
              <div class="property-image">
                <img :src="property.image" :alt="property.name">
                <div class="property-status">For Sale</div>
              </div>
              <div class="property-details">
                <h3>{{ property.name }}</h3>
                <p class="property-price">{{ property.price }}</p>
                <p class="property-location">
                  <i class="fas fa-map-marker-alt"></i>
                  {{ property.location }}
                </p>
                <div class="property-features">
                  <span><i class="fas fa-bed"></i> {{ property.bedrooms }} beds</span>
                  <span><i class="fas fa-bath"></i> {{ property.bathrooms }} baths</span>
                  <span><i class="fas fa-ruler-combined"></i> {{ property.size }} sqft</span>
                </div>
              </div>
            </div>
          </div>

          <div v-if="filteredProperties.length === 0" class="no-results">
            <h3>No properties found</h3>
            <p>Try adjusting your search criteria</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { usePropertyStore } from '@/stores/propertyStore';
import GlobalHeader from '@/components/GlobalHeader.vue';

const router = useRouter();
const propertyStore = usePropertyStore();
const searchQuery = ref('');

// Initialize store data when component is mounted
onMounted(() => {
  // Ensure store is initialized
  if (!propertyStore.properties || propertyStore.properties.length === 0) {
    // If store is empty, reinitialize it
    propertyStore.$reset();
  }
});

const filters = ref({
  propertyType: '',
  priceRange: '',
  bedrooms: '',
  bathrooms: ''
});

const propertyTypes = [
  'House',
  'Condo',
  'Townhouse',
  'Multi-family',
  'Land',
  'Commercial'
];

const filteredProperties = computed(() => {
  let properties = propertyStore.properties.filter(p => p.status === 'For Sale');

  // Apply search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    properties = properties.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.location.toLowerCase().includes(query) ||
      p.address.toLowerCase().includes(query)
    );
  }

  // Apply property type filter
  if (filters.value.propertyType) {
    properties = properties.filter(p => p.type === filters.value.propertyType);
  }

  // Apply price range filter
  if (filters.value.priceRange) {
    const [min, max] = filters.value.priceRange.split('-').map(Number);
    properties = properties.filter(p => {
      const price = parseInt(p.price.replace(/[^0-9]/g, ''));
      if (max) {
        return price >= min && price <= max;
      } else {
        return price >= min;
      }
    });
  }

  // Apply bedrooms filter
  if (filters.value.bedrooms) {
    properties = properties.filter(p => p.bedrooms >= parseInt(filters.value.bedrooms));
  }

  // Apply bathrooms filter
  if (filters.value.bathrooms) {
    properties = properties.filter(p => p.bathrooms >= parseInt(filters.value.bathrooms));
  }

  return properties;
});

const viewProperty = (propertyId) => {
  router.push(`/property/${propertyId}`);
};

const handleSearch = () => {
  // Additional search logic if needed
};
</script>

<style scoped>
.buy-properties-page {
  min-height: 100vh;
  background-color: #f8fafc;
}

.hero-section {
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3');
  background-size: cover;
  background-position: center;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
}

.hero-content h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.hero-content p {
  font-size: 1.25rem;
  opacity: 0.9;
}

.search-filter-section {
  background: white;
  padding: 2rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.search-bar {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.search-bar input {
  flex: 1;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 1rem;
}

.search-btn {
  padding: 1rem 2rem;
  background-color: #0066cc;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.search-btn:hover {
  background-color: #0052a5;
}

.filter-bar {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-group label {
  font-weight: 600;
  color: #4a5568;
}

.filter-group select {
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 0.875rem;
}

.properties-grid-section {
  padding: 3rem 0;
}

.properties-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.property-card {
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  cursor: pointer;
}

.property-card:hover {
  transform: translateY(-4px);
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

.property-status {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #0066cc;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.875rem;
  font-weight: 600;
}

.property-details {
  padding: 1.5rem;
}

.property-details h3 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: #2d3748;
}

.property-price {
  font-size: 1.5rem;
  font-weight: 700;
  color: #0066cc;
  margin-bottom: 0.5rem;
}

.property-location {
  color: #718096;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.property-features {
  display: flex;
  gap: 1rem;
  color: #4a5568;
  font-size: 0.875rem;
}

.property-features span {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.no-results {
  text-align: center;
  padding: 3rem;
  color: #718096;
}

@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 2rem;
  }

  .search-bar {
    flex-direction: column;
  }

  .filter-bar {
    grid-template-columns: 1fr;
  }
}
</style>
