<script setup>
import { ref, computed } from 'vue';
import { usePropertyStore } from "@/stores/propertyStore";
import { useRouter } from "vue-router";

const propertyStore = usePropertyStore();
const router = useRouter();
const activeFilter = ref('all');

// Filter options
const filters = {
  all: 'All properties',
  sale: 'For sale',
  rent: 'For rent',
  new: 'New listings'
};

// Set filter
const setFilter = (filter) => {
  activeFilter.value = filter;
};

// Calculate filtered properties based on active filter
const properties = computed(() => {
  const allProperties = propertyStore.properties;

  switch(activeFilter.value) {
    case 'sale':
      // For demo purposes, filter properties priced above $40,000 as "for sale"
      return allProperties.filter(p =>
        parseInt(p.price.replace(/[^0-9]/g, '')) > 40000
      );
    case 'rent':
      // For demo purposes, filter properties priced below $40,000 as "for rent"
      return allProperties.filter(p =>
        parseInt(p.price.replace(/[^0-9]/g, '')) <= 40000
      );
    case 'new':
      // For demo purposes, take the latest 3 properties as "new"
      return allProperties.slice(-3);
    default:
      return allProperties;
  }
});

// View property details
const viewProperty = (propertyId) => {
  router.push(`/property/${propertyId}`);
};
</script>

<template>
  <div>
    <!-- Main content area with padding -->
    <div class="main-content">
      <!-- Hero section with background image -->
      <div class="hero-section">
        <div class="hero-content">
          <h1>All Properties</h1>
          <p>Get up to date with the latest properties for you.</p>

          <!-- Filter buttons -->
          <div class="filter-buttons">
            <button
              v-for="(label, key) in filters"
              :key="key"
              :class="{ active: activeFilter === key }"
              @click="setFilter(key)"
            >
              {{ label }}
            </button>
          </div>
        </div>
      </div>

      <!-- Search and filters section -->
      <div class="search-filters">
        <div class="search-container">
          <i class="search-icon">⌕</i>
          <input type="text" placeholder="Search..." class="search-input" />
          <span class="search-key">⌘ K</span>
        </div>

        <div class="filters">
          <div class="filter-dropdown">
            <span>Price Range ($)</span>
            <i class="fas fa-chevron-down"></i>
          </div>

          <div class="filter-dropdown">
            <span>Bedrooms</span>
            <i class="fas fa-chevron-down"></i>
          </div>

          <div class="filter-dropdown">
            <span>Property type</span>
            <i class="fas fa-chevron-down"></i>
          </div>

          <div class="filter-dropdown">
            <span>Location</span>
            <i class="fas fa-chevron-down"></i>
          </div>
        </div>
      </div>

      <!-- Property listings -->
      <div class="properties-grid">
        <div v-for="(property, index) in properties" :key="index" class="property-card">
          <div class="property-image">
            <img :src="property.image" :alt="property.name" />
            <button class="favorite-btn">
              <i class="far fa-heart"></i>
            </button>
          </div>

          <div class="property-info">
            <h3>{{ property.name }}</h3>
            <p class="location">{{ property.location }}</p>
            <p class="price">{{ property.price }}</p>

            <button class="view-btn" @click="viewProperty(property.id)">
              View property
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 35px;
}

.hero-section {
  position: relative;
  height: 240px;
  border-radius: 12px;
  margin-bottom: 30px;
  overflow: hidden;
  display: flex;
  align-items: center;
  background-image: linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)),
                    url('https://res.cloudinary.com/dnuhjsckk/image/upload/v1743087291/Designer_8_1_fjvyi0.png');
  background-size: cover;
  background-position: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

.hero-content {
  width: 100%;
  padding: 0 40px;
  color: white;
  z-index: 1;
}

.hero-content h1 {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 8px;
}

.hero-content p {
  font-size: 16px;
  margin-bottom: 30px;
  font-weight: 400;
}

.filter-buttons {
  display: flex;
  gap: 16px;
}

.filter-buttons button {
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
  font-weight: 500;
}

.filter-buttons button.active {
  background-color: #0066ff;
  border-color: #0066ff;
}

.filter-buttons button:hover:not(.active) {
  background-color: rgba(255, 255, 255, 0.1);
}

/* Search and filters */
.search-filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 20px;
}

.search-container {
  position: relative;
  width: 100%;
  max-width: 300px;
  display: flex;
  align-items: center;
  background-color: #f8f8f8;
  border-radius: 6px;
  padding: 0 12px;
}

.search-icon {
  font-size: 20px;
  color: #888;
  margin-right: 8px;
  font-style: normal;
}

.search-input {
  flex: 1;
  padding: 12px 35px 12px 0;
  border: none;
  background: transparent;
  font-size: 14px;
  outline: none;
}

.search-key {
  position: absolute;
  right: 12px;
  background-color: #f1f5f9;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
  color: #64748b;
}

.filters {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.filter-dropdown {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 8px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  color: #64748b;
  background-color: white;
  min-width: 140px;
}

.filter-dropdown i {
  font-size: 12px;
}

/* Property grid */
.properties-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.property-card {
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  background-color: white;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid #eaeaea;
}

.property-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1);
}

.property-image {
  height: 200px;
  position: relative;
  overflow: hidden;
}

.property-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.property-card:hover .property-image img {
  transform: scale(1.05);
}

.favorite-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 36px;
  height: 36px;
  background: white;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

.favorite-btn:hover {
  transform: scale(1.1);
}

.property-info {
  padding: 18px;
}

.property-info h3 {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 8px;
  color: #333;
}

.location {
  color: #666;
  font-size: 14px;
  margin: 0 0 12px;
}

.price {
  font-weight: 700;
  font-size: 20px;
  color: #0066ff;
  margin: 0 0 16px;
}

.view-btn {
  width: 100%;
  padding: 10px;
  background-color: white;
  color: #0066ff;
  border: 1px solid #0066ff;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.view-btn:hover {
  background-color: #0066ff;
  color: white;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .hero-section {
    height: 280px;
  }

  .search-filters {
    flex-direction: column;
    align-items: flex-start;
  }

  .search-container {
    max-width: 100%;
  }

  .filters {
    width: 100%;
    justify-content: space-between;
  }

  .filter-dropdown {
    flex: 1;
    justify-content: center;
    min-width: 100px;
  }
}

@media (max-width: 480px) {
  .filter-buttons {
    flex-wrap: wrap;
  }

  .filters {
    flex-wrap: wrap;
  }

  .filter-dropdown {
    width: calc(50% - 8px);
  }
}
</style>
