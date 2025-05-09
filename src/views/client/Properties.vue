<template>
  <div class="client-properties">
    <h1>Find Your Dream Property</h1>
    <div class="search-bar">
      <input type="text" placeholder="Search by location, property type, or features..." />
      <button class="search-btn">Search</button>
    </div>

    <div class="filter-bar">
      <div class="filter-group">
        <label>Property Type</label>
        <select>
          <option value="">All Types</option>
          <option value="house">House</option>
          <option value="condo">Condo</option>
          <option value="townhouse">Townhouse</option>
          <option value="land">Land</option>
        </select>
      </div>

      <div class="filter-group">
        <label>Price Range</label>
        <select>
          <option value="">Any Price</option>
          <option value="100000-300000">$100k - $300k</option>
          <option value="300000-500000">$300k - $500k</option>
          <option value="500000-800000">$500k - $800k</option>
          <option value="800000-1500000">$800k - $1.5M</option>
          <option value="1500000+">$1.5M+</option>
        </select>
      </div>

      <div class="filter-group">
        <label>Bedrooms</label>
        <select>
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
        <select>
          <option value="">Any</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
        </select>
      </div>
    </div>

    <div class="properties-grid">
      <!-- Sample Property Cards -->
      <div v-for="(property, index) in properties" :key="index" class="property-card">
        <div class="property-image" :style="{ backgroundImage: `url(${property.image})` }">
          <div class="property-badge">{{ property.status }}</div>
          <button class="favorite-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
        </div>
        <div class="property-details">
          <div class="property-price">${{ property.price.toLocaleString() }}</div>
          <div class="property-address">{{ property.address }}</div>
          <div class="property-features">
            <div class="feature">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              <span>{{ property.bedrooms }} bd</span>
            </div>
            <div class="feature">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 4h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2zm0 8h14"></path>
              </svg>
              <span>{{ property.bathrooms }} ba</span>
            </div>
            <div class="feature">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2"></rect>
              </svg>
              <span>{{ property.sqft.toLocaleString() }} sqft</span>
            </div>
          </div>
        </div>
        <div class="property-actions">
          <router-link :to="`/client/properties/${property.id}`" class="view-btn">View Details</router-link>
          <button class="schedule-btn">Schedule Tour</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, defineComponent } from 'vue';

// Define component name
defineComponent({
  name: 'ClientProperties'
});

// Sample property data
const properties = reactive([
  {
    id: 1,
    address: '123 Main Street, San Francisco, CA',
    price: 1250000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1750,
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    status: 'For Sale'
  },
  {
    id: 2,
    address: '456 Oak Avenue, Los Angeles, CA',
    price: 895000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1450,
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    status: 'For Sale'
  },
  {
    id: 3,
    address: '789 Pine Road, San Diego, CA',
    price: 1450000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2100,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    status: 'New'
  },
  {
    id: 4,
    address: '42 Sunset Boulevard, Malibu, CA',
    price: 3250000,
    bedrooms: 5,
    bathrooms: 4,
    sqft: 4200,
    image: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    status: 'Featured'
  }
]);
</script>

<style scoped>
.client-properties {
  max-width: 100%;
  margin: 0;
}

h1 {
  font-size: 28px;
  margin-bottom: 20px;
  color: #2c3e50;
}

.search-bar {
  display: flex;
  margin-bottom: 20px;
}

.search-bar input {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 4px 0 0 4px;
  font-size: 16px;
}

.search-btn {
  padding: 12px 24px;
  background-color: #0a4d8c;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.search-btn:hover {
  background-color: #0b3b6b;
}

.filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 24px;
  padding: 16px;
  background-color: #f5f7fa;
  border-radius: 8px;
}

.filter-group {
  display: flex;
  flex-direction: column;
  min-width: 180px;
}

.filter-group label {
  font-size: 14px;
  margin-bottom: 8px;
  color: #4a4a4a;
}

.filter-group select {
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background-color: white;
  font-size: 14px;
}

.properties-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}

.property-card {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s, box-shadow 0.3s;
}

.property-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12);
}

.property-image {
  height: 200px;
  background-size: cover;
  background-position: center;
  position: relative;
}

.property-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 6px 12px;
  background-color: #0a4d8c;
  color: white;
  font-size: 12px;
  font-weight: 600;
  border-radius: 4px;
}

.favorite-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  background-color: white;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.favorite-btn svg {
  stroke: #ff4757;
}

.property-details {
  padding: 16px;
}

.property-price {
  font-size: 24px;
  font-weight: 700;
  color: #0a4d8c;
  margin-bottom: 8px;
}

.property-address {
  font-size: 16px;
  color: #4a4a4a;
  margin-bottom: 16px;
  line-height: 1.4;
}

.property-features {
  display: flex;
  gap: 16px;
  color: #666;
  margin-bottom: 16px;
}

.feature {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
}

.property-actions {
  display: flex;
  padding: 16px;
  border-top: 1px solid #f0f0f0;
  gap: 8px;
}

.view-btn, .schedule-btn {
  flex: 1;
  padding: 10px 0;
  text-align: center;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.view-btn {
  background-color: white;
  border: 1px solid #0a4d8c;
  color: #0a4d8c;
  text-decoration: none;
}

.view-btn:hover {
  background-color: #f0f7f7;
}

.schedule-btn {
  background-color: #0a4d8c;
  border: none;
  color: white;
}

.schedule-btn:hover {
  background-color: #0b3b6b;
}

@media (max-width: 768px) {
  .client-properties {
    padding: 16px;
  }

  .filter-bar {
    flex-direction: column;
    gap: 12px;
  }

  .filter-group {
    min-width: 100%;
  }

  .properties-grid {
    grid-template-columns: 1fr;
  }
}
</style>
