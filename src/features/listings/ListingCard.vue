<!-- src/features/listings/ListingCard.vue -->
<script setup>
import { defineProps } from 'vue';

defineProps({
  listing: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div class="listing-card">
    <div class="listing-image">
      <img
        :src="listing.imageUrl || '/placeholder-property.jpg'"
        :alt="listing.title"
      />
      <div class="listing-status" :class="listing.status.toLowerCase()">
        {{ listing.status }}
      </div>
    </div>

    <div class="listing-content">
      <h3 class="listing-title">{{ listing.title }}</h3>
      <p class="listing-price">${{ listing.price.toLocaleString() }}</p>
      <p class="listing-address">{{ listing.address }}</p>

      <div class="listing-features">
        <div class="feature">
          <span class="feature-value">{{ listing.bedrooms }}</span>
          <span class="feature-label">Beds</span>
        </div>
        <div class="feature">
          <span class="feature-value">{{ listing.bathrooms }}</span>
          <span class="feature-label">Baths</span>
        </div>
        <div class="feature">
          <span class="feature-value">{{ listing.sqft.toLocaleString() }}</span>
          <span class="feature-label">Sq Ft</span>
        </div>
      </div>

      <div class="listing-actions">
        <button class="view-btn">View Details</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.listing-card {
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.listing-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.listing-image {
  position: relative;
  height: 200px;
}

.listing-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.listing-status {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
}

.listing-status.active {
  background-color: #4caf50;
  color: white;
}

.listing-status.pending {
  background-color: #ff9800;
  color: white;
}

.listing-status.sold {
  background-color: #f44336;
  color: white;
}

.listing-content {
  padding: 15px;
}

.listing-title {
  margin-top: 0;
  margin-bottom: 5px;
  font-size: 18px;
}

.listing-price {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin: 5px 0;
}

.listing-address {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
}

.listing-features {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  border-top: 1px solid #eee;
  padding-top: 10px;
}

.feature {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.feature-value {
  font-weight: bold;
  font-size: 16px;
}

.feature-label {
  font-size: 12px;
  color: #666;
}

.listing-actions {
  display: flex;
  justify-content: center;
}

.view-btn {
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s;
}

.view-btn:hover {
  background-color: #1565c0;
}
</style>
