<script setup>
import { ref, computed } from 'vue';
import { useClientStore } from '@/stores/clientStore';
import { useListingStore } from '@/stores/listingStore';

const clientStore = useClientStore();
const listingStore = useListingStore();

// Mock client ID
const clientId = 1;

// Get client details
const client = computed(() => {
  return clientStore.getClientById(clientId);
});

// Placeholder for owned properties
const ownedProperties = ref([
  {
    id: 101,
    address: '123 Main Street',
    city: 'New York',
    state: 'NY',
    price: 850000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 2100,
    status: 'Owned',
    purchaseDate: '2022-03-15',
    images: ['https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80']
  },
  {
    id: 102,
    address: '456 Park Avenue',
    city: 'New York',
    state: 'NY',
    price: 1200000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2800,
    status: 'Owned',
    purchaseDate: '2021-05-20',
    images: ['https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80']
  }
]);

// Format price for display
const formatPrice = (price) => {
  return price.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
};

// Format date for display
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};
</script>

<template>
  <div class="my-properties">
    <div class="page-header">
      <h1>My Properties</h1>
      <p class="subtitle">Manage your real estate portfolio</p>
    </div>

    <div class="properties-container">
      <div class="section-header">
        <h2>Properties Owned</h2>
      </div>

      <div class="properties-grid" v-if="ownedProperties.length > 0">
        <div class="property-card" v-for="property in ownedProperties" :key="property.id">
          <div class="property-image" :style="{ backgroundImage: `url(${property.images[0]})` }">
            <div class="property-status">{{ property.status }}</div>
          </div>
          <div class="property-info">
            <h3 class="property-price">{{ formatPrice(property.price) }}</h3>
            <p class="property-address">{{ property.address }}</p>
            <p class="property-location">{{ property.city }}, {{ property.state }}</p>
            <p class="property-specs">
              {{ property.bedrooms }} bd | {{ property.bathrooms }} ba | {{ property.sqft.toLocaleString() }} sqft
            </p>
            <p class="purchase-date">Purchased: {{ formatDate(property.purchaseDate) }}</p>
            <div class="property-actions">
              <button class="action-button">View Details</button>
              <button class="action-button secondary">Documents</button>
            </div>
          </div>
        </div>
      </div>

      <div class="empty-state" v-else>
        <h3>You don't own any properties yet</h3>
        <p>When you purchase a property, it will appear here</p>
        <router-link to="/property-search" class="primary-button">Browse Properties</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.my-properties {
  padding: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 24px;
}

.page-header h1 {
  font-size: 28px;
  margin: 0;
  color: #333;
}

.subtitle {
  color: #666;
  margin: 8px 0 0 0;
  font-size: 16px;
}

.section-header {
  margin-bottom: 16px;
}

.section-header h2 {
  font-size: 20px;
  margin: 0;
  color: #333;
}

.properties-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

.property-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s, box-shadow 0.2s;
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
  background: #006064;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.property-info {
  padding: 20px;
}

.property-price {
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: #006064;
}

.property-address {
  font-size: 16px;
  font-weight: 500;
  margin: 0 0 4px 0;
  color: #333;
}

.property-location,
.property-specs,
.purchase-date {
  margin: 4px 0;
  font-size: 14px;
  color: #666;
  line-height: 1.4;
}

.purchase-date {
  margin-top: 8px;
  font-style: italic;
}

.property-actions {
  display: flex;
  gap: 10px;
  margin-top: 16px;
}

.action-button {
  flex: 1;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  background: #006064;
  color: white;
  transition: background-color 0.2s;
}

.action-button:hover {
  background: #00796b;
}

.action-button.secondary {
  background: #f0f0f0;
  color: #333;
}

.action-button.secondary:hover {
  background: #e0e0e0;
}

.empty-state {
  background: white;
  border-radius: 12px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.empty-state h3 {
  margin: 0 0 8px 0;
  font-size: 18px;
  color: #333;
}

.empty-state p {
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
  text-decoration: none;
  transition: background-color 0.2s;
}

.primary-button:hover {
  background: #00796b;
}

@media (max-width: 768px) {
  .properties-grid {
    grid-template-columns: 1fr;
  }
}
</style>
