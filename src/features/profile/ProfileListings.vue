<!-- src/features/profile/ProfileListings.vue -->
<script setup>
import { ref, onMounted } from 'vue';
// Import will be used when API is implemented
// import { fetchListings } from '@/features/listings/listingsApi';

const listings = ref([]);
const isLoading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    // In a real app, you'd fetch user's listings from an API
    // For now we're using mock data
    // const data = await fetchUserListings();
    // listings.value = data;

    // Simulate API call with timeout
    setTimeout(() => {
      listings.value = [
        {
          id: 1,
          title: '3BR Modern House with Pool',
          price: 450000,
          address: '123 Main St, Anytown, CA 12345',
          bedrooms: 3,
          bathrooms: 2,
          sqft: 2200,
          status: 'Active',
          imageUrl: '/property-1.jpg'
        },
        {
          id: 2,
          title: 'Luxury Condo Downtown',
          price: 320000,
          address: '456 City Ave, Anytown, CA 12345',
          bedrooms: 2,
          bathrooms: 2,
          sqft: 1500,
          status: 'Pending',
          imageUrl: '/property-2.jpg'
        },
        {
          id: 3,
          title: 'Charming Cottage Near Lake',
          price: 275000,
          address: '789 Lake Dr, Anytown, CA 12345',
          bedrooms: 2,
          bathrooms: 1,
          sqft: 1200,
          status: 'Sold',
          imageUrl: '/property-3.jpg'
        }
      ];
      isLoading.value = false;
    }, 500);
  } catch (err) {
    console.error('Failed to load listings:', err);
    error.value = 'Failed to load listings. Please try again.';
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="profile-listings">
    <h2>My Listings</h2>

    <div v-if="isLoading" class="loading-state">
      Loading your listings...
    </div>

    <div v-else-if="error" class="error-message">
      {{ error }}
    </div>

    <div v-else-if="listings.length === 0" class="empty-listings">
      You don't have any listings yet.
    </div>

    <div v-else class="listings-grid">
      <div v-for="listing in listings" :key="listing.id" class="listing-card">
        <div class="listing-image">
          <img :src="listing.imageUrl || '/placeholder-property.jpg'" :alt="listing.title">
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
            <button class="edit-btn">Edit</button>
            <button class="view-btn">View</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-listings {
  padding: 20px;
}

.listings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.loading-state,
.error-message,
.empty-listings {
  padding: 20px;
  text-align: center;
  background-color: #f9f9f9;
  border-radius: 8px;
  margin-top: 20px;
}

.error-message {
  color: #e53935;
  background-color: #ffebee;
}

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
  justify-content: space-between;
}

.edit-btn,
.view-btn {
  flex: 1;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s;
}

.edit-btn {
  background-color: #f5f5f5;
  color: #333;
  margin-right: 8px;
}

.edit-btn:hover {
  background-color: #e0e0e0;
}

.view-btn {
  background-color: #1976d2;
  color: white;
}

.view-btn:hover {
  background-color: #1565c0;
}
</style>
