<script setup>
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
      <img :src="listing.image" :alt="listing.title">
      <div class="listing-status" :class="listing.status.toLowerCase()">
        {{ listing.status }}
      </div>
    </div>
    <div class="listing-content">
      <h3 class="listing-title">{{ listing.title }}</h3>
      <p class="listing-address">{{ listing.address }}</p>
      <div class="listing-price">${{ listing.price.toLocaleString() }}</div>
      <div class="listing-details">
        <span><i class="fas fa-bed"></i> {{ listing.beds }} beds</span>
        <span><i class="fas fa-bath"></i> {{ listing.baths }} baths</span>
        <span><i class="fas fa-ruler-combined"></i> {{ listing.sqft }} sqft</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.listing-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.listing-card:hover {
  transform: translateY(-2px);
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
  top: 12px;
  right: 12px;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
}

.listing-status.active {
  background: #4CAF50;
  color: white;
}

.listing-status.pending {
  background: #FFC107;
  color: #333;
}

.listing-status.sold {
  background: #F44336;
  color: white;
}

.listing-content {
  padding: 16px;
}

.listing-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: #333;
}

.listing-address {
  font-size: 14px;
  color: #666;
  margin: 0 0 8px 0;
}

.listing-price {
  font-size: 20px;
  font-weight: 600;
  color: #2196F3;
  margin-bottom: 12px;
}

.listing-details {
  display: flex;
  gap: 16px;
  font-size: 14px;
  color: #666;
}

.listing-details span {
  display: flex;
  align-items: center;
  gap: 4px;
}

.listing-details i {
  font-size: 16px;
  color: #999;
}
</style> 