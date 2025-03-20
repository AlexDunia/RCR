<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const listing = ref(null);
const isLoading = ref(true);
const error = ref(null);

onMounted(async () => {
  const listingId = route.params.id;

  try {
    // In a real app, you would fetch the listing from an API
    // const response = await fetchListingById(listingId);
    // listing.value = response.data;

    // Simulate API call with timeout
    await new Promise(resolve => setTimeout(resolve, 800));

    // Mock data for demonstration
    listing.value = {
      id: listingId,
      title: 'Beautiful Modern Home in Quiet Neighborhood',
      price: 450000,
      status: 'active',
      address: '123 Maple Street',
      city: 'Anytown',
      state: 'CA',
      zip: '12345',
      description: 'This stunning property features an open floor plan with abundant natural light, high ceilings, and premium finishes throughout. The gourmet kitchen includes stainless steel appliances, granite countertops, and a spacious island. The primary suite offers a luxurious bathroom with dual vanities and a walk-in closet. Additional features include hardwood floors, a fireplace in the living room, and a beautifully landscaped backyard with a covered patio perfect for entertaining. Located in a sought-after neighborhood with excellent schools and convenient access to shopping, dining, and parks.',
      bedrooms: 4,
      bathrooms: 2.5,
      sqft: 2450,
      lotSize: '0.25 acres',
      yearBuilt: 2018,
      propertyType: 'single-family',
      images: [
        '/img/property1-1.jpg',
        '/img/property1-2.jpg',
        '/img/property1-3.jpg',
        '/img/property1-4.jpg'
      ],
      features: [
        'Central AC',
        'Hardwood Floors',
        'Fireplace',
        'Garage',
        'Stainless Steel Appliances',
        'Granite Countertops',
        'Deck/Patio'
      ],
      agent: {
        id: 'a123',
        name: 'Jane Smith',
        phone: '(555) 123-4567',
        email: 'jane.smith@example.com',
        photo: '/img/agent1.jpg'
      },
      createdAt: '2023-11-15T10:30:00Z',
      updatedAt: '2023-11-20T14:15:00Z'
    };

    isLoading.value = false;
  } catch (err) {
    console.error('Failed to fetch listing:', err);
    error.value = 'Failed to load property details. Please try again.';
    isLoading.value = false;
  }
});

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(price);
};

const getStatusClass = (status) => {
  switch (status) {
    case 'active': return 'status-active';
    case 'pending': return 'status-pending';
    case 'sold': return 'status-sold';
    case 'draft': return 'status-draft';
    default: return '';
  }
};

const getStatusLabel = (status) => {
  switch (status) {
    case 'active': return 'Active';
    case 'pending': return 'Pending';
    case 'sold': return 'Sold';
    case 'draft': return 'Draft';
    default: return status;
  }
};

const goBack = () => {
  router.back();
};

const editListing = () => {
  router.push(`/edit-listing/${listing.value.id}`);
};
</script>

<template>
  <div class="listing-detail">
    <div class="page-header">
      <button class="back-button" @click="goBack">
        Back
      </button>
      <button v-if="listing" class="edit-button" @click="editListing">
        Edit Listing
      </button>
    </div>

    <div v-if="isLoading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>Loading property details...</p>
    </div>

    <div v-else-if="error" class="error-message">
      {{ error }}
    </div>

    <div v-else-if="listing" class="listing-content">
      <h1 class="listing-title">{{ listing.title }}</h1>

      <div class="listing-header">
        <div class="price-status">
          <h2 class="listing-price">{{ formatPrice(listing.price) }}</h2>
          <span class="listing-status" :class="getStatusClass(listing.status)">
            {{ getStatusLabel(listing.status) }}
          </span>
        </div>

        <p class="listing-address">
          {{ listing.address }}, {{ listing.city }}, {{ listing.state }} {{ listing.zip }}
        </p>
      </div>

      <div class="gallery">
        <!-- In a real app, this would show actual images -->
        <div class="gallery-placeholder">
          <p>Property Images</p>
          <p class="gallery-count">{{ listing.images.length }} photos available</p>
        </div>
      </div>

      <div class="listing-details-container">
        <div class="listing-main-content">
          <div class="property-highlights">
            <div class="highlight-item">
              <span class="highlight-value">{{ listing.bedrooms }}</span>
              <span class="highlight-label">Beds</span>
            </div>
            <div class="highlight-item">
              <span class="highlight-value">{{ listing.bathrooms }}</span>
              <span class="highlight-label">Baths</span>
            </div>
            <div class="highlight-item">
              <span class="highlight-value">{{ listing.sqft.toLocaleString() }}</span>
              <span class="highlight-label">Sq Ft</span>
            </div>
            <div class="highlight-item">
              <span class="highlight-value">{{ listing.lotSize }}</span>
              <span class="highlight-label">Lot Size</span>
            </div>
            <div class="highlight-item">
              <span class="highlight-value">{{ listing.yearBuilt }}</span>
              <span class="highlight-label">Year Built</span>
            </div>
          </div>

          <div class="detail-section">
            <h3>Description</h3>
            <p class="listing-description">{{ listing.description }}</p>
          </div>

          <div class="detail-section">
            <h3>Property Details</h3>
            <div class="property-details">
              <div class="detail-item">
                <span class="detail-label">Property Type</span>
                <span class="detail-value">{{
                  listing.propertyType === 'single-family' ? 'Single Family Home' :
                  listing.propertyType === 'condo' ? 'Condo/Townhouse' :
                  listing.propertyType === 'multi-family' ? 'Multi-Family' :
                  listing.propertyType === 'land' ? 'Land/Lot' :
                  listing.propertyType === 'commercial' ? 'Commercial' :
                  listing.propertyType
                }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Year Built</span>
                <span class="detail-value">{{ listing.yearBuilt }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Square Footage</span>
                <span class="detail-value">{{ listing.sqft.toLocaleString() }} sq ft</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Lot Size</span>
                <span class="detail-value">{{ listing.lotSize }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Bedrooms</span>
                <span class="detail-value">{{ listing.bedrooms }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Bathrooms</span>
                <span class="detail-value">{{ listing.bathrooms }}</span>
              </div>
            </div>
          </div>

          <div class="detail-section">
            <h3>Features & Amenities</h3>
            <ul class="features-list">
              <li v-for="feature in listing.features" :key="feature">
                {{ feature }}
              </li>
            </ul>
          </div>
        </div>

        <div class="listing-sidebar">
          <div class="agent-card">
            <h3>Listed By</h3>
            <div class="agent-info">
              <div class="agent-photo-placeholder"></div>
              <div class="agent-details">
                <p class="agent-name">{{ listing.agent.name }}</p>
                <p class="agent-contact">{{ listing.agent.phone }}</p>
                <p class="agent-contact">{{ listing.agent.email }}</p>
              </div>
            </div>
            <button class="contact-button">Contact Agent</button>
          </div>

          <div class="listing-actions">
            <button class="action-button share-button">Share</button>
            <button class="action-button favorite-button">Save</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.listing-detail {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.back-button {
  background-color: transparent;
  color: #1976d2;
  border: none;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 8px 0;
}

.back-button:hover {
  text-decoration: underline;
}

.edit-button {
  background-color: #f5f5f5;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 8px 16px;
  font-weight: 600;
  cursor: pointer;
}

.edit-button:hover {
  background-color: #e0e0e0;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
}

.loading-spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid #1976d2;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-message {
  padding: 30px;
  text-align: center;
  color: #e53935;
  background-color: #ffebee;
  border-radius: 8px;
  margin: 40px 0;
}

.listing-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.listing-title {
  font-size: 2rem;
  margin: 0 0 10px 0;
  color: #333;
}

.listing-header {
  margin-bottom: 20px;
}

.price-status {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 10px;
}

.listing-price {
  font-size: 1.8rem;
  font-weight: 700;
  color: #333;
  margin: 0;
}

.listing-status {
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
}

.status-active {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.status-pending {
  background-color: #fff8e1;
  color: #f57f17;
}

.status-sold {
  background-color: #e3f2fd;
  color: #1565c0;
}

.status-draft {
  background-color: #f5f5f5;
  color: #757575;
}

.listing-address {
  font-size: 1.1rem;
  color: #555;
  margin: 0;
}

.gallery {
  width: 100%;
  margin-bottom: 20px;
}

.gallery-placeholder {
  height: 400px;
  background-color: #f5f5f5;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #757575;
  font-size: 1.2rem;
}

.gallery-count {
  font-size: 0.9rem;
  margin-top: 10px;
}

.listing-details-container {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 30px;
}

@media (max-width: 900px) {
  .listing-details-container {
    grid-template-columns: 1fr;
  }
}

.listing-main-content {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.property-highlights {
  display: flex;
  justify-content: space-between;
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.highlight-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.highlight-value {
  font-size: 1.4rem;
  font-weight: 700;
  color: #333;
}

.highlight-label {
  font-size: 0.9rem;
  color: #757575;
  margin-top: 5px;
}

.detail-section {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.detail-section h3 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin-top: 0;
  margin-bottom: 15px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.listing-description {
  font-size: 1rem;
  line-height: 1.6;
  color: #444;
  white-space: pre-line;
}

.property-details {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
}

.detail-item {
  display: flex;
  flex-direction: column;
}

.detail-label {
  font-size: 0.9rem;
  color: #757575;
  margin-bottom: 5px;
}

.detail-value {
  font-size: 1rem;
  color: #333;
  font-weight: 500;
}

.features-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
  padding: 0;
  margin: 0;
  list-style-type: none;
}

.features-list li {
  position: relative;
  padding-left: 25px;
  padding-bottom: 8px;
}

.features-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #4caf50;
  font-weight: bold;
}

.listing-sidebar {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-self: start;
}

.agent-card {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.agent-card h3 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin-top: 0;
  margin-bottom: 15px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.agent-info {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.agent-photo-placeholder {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: #f5f5f5;
  margin-right: 15px;
}

.agent-details {
  display: flex;
  flex-direction: column;
}

.agent-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 5px 0;
}

.agent-contact {
  font-size: 0.9rem;
  color: #757575;
  margin: 0 0 3px 0;
}

.contact-button {
  width: 100%;
  padding: 12px;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
}

.contact-button:hover {
  background-color: #1565c0;
}

.listing-actions {
  display: flex;
  gap: 10px;
}

.action-button {
  flex: 1;
  padding: 12px;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  text-align: center;
}

.share-button {
  background-color: #f5f5f5;
  color: #333;
  border: 1px solid #ddd;
}

.share-button:hover {
  background-color: #e0e0e0;
}

.favorite-button {
  background-color: #f5f5f5;
  color: #333;
  border: 1px solid #ddd;
}

.favorite-button:hover {
  background-color: #e0e0e0;
}
</style>
