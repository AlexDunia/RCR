<template>
  <div class="property-detail-page">
    <div class="header">
      <button @click="goBack" class="back-button">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        <span>Manage  my Listings</span>
      </button>
      <div class="header-subtitle">Real city admin</div>

      <div class="header-actions">
        <button class="icon-button">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
          </svg>
        </button>
        <button class="icon-button">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
        </button>
        <div class="admin-avatar">
          <div class="avatar-circle">PA</div>
          <span class="admin-name">Precious Admin</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </div>
      </div>
    </div>

    <div class="agent-card">
      <div class="agent-info">
        <img
          :src="agent?.avatar || 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739408381/Screenshot_2025-02-13_015617_mhjgby.png'"
          alt="Agent"
          class="agent-avatar"
        />
        <div class="agent-details">
          <h2 class="agent-name">{{ agent?.name || 'Amy Daniels' }}</h2>
          <div class="agent-meta">
            <div class="location-tag">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <span>{{ formattedAgentLocation }}</span>
            </div>
            <div class="specialty-tag">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <path d="M8 12h8M12 8v8"/>
              </svg>
              <span>{{ formattedAgentSpecialty }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="agent-actions">
        <button class="action-button view-profile" @click="viewAgentProfile">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
          View profile
        </button>
        <button class="action-button deactivate">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M15 9l-6 6M9 9l6 6"/>
          </svg>
          Deactivate
        </button>
      </div>
    </div>

    <div class="property-content">
      <div class="property-image-container">
        <img :src="propertyImage" alt="Property" class="property-image" />
      </div>
      <div class="property-details-container">
        <h1 class="property-title">{{ property?.title || 'Home One' }}</h1>
        <p class="property-address">{{ property?.address || 'House address will be written here' }}</p>
        <div class="property-type">Type: {{ property?.type || 'Multi-Family Home' }}</div>

        <div class="property-specs">
          <div class="spec-item">
            <div class="spec-title">Bedroom</div>
            <div class="spec-value">{{ property?.bedrooms || 5 }}</div>
          </div>
          <div class="spec-item">
            <div class="spec-title">Bathroom</div>
            <div class="spec-value">{{ property?.bathrooms || 10 }}</div>
          </div>
          <div class="spec-item">
            <div class="spec-title">Square feet</div>
            <div class="spec-value">{{ property?.sqft || 2000 }}ft</div>
          </div>
          <div class="spec-item">
            <div class="spec-title">Price</div>
            <div class="spec-value">${{ formatPrice(property?.price) }}</div>
          </div>
        </div>

        <div class="property-description">
          <h2 class="description-title">Description</h2>
          <p class="description-text">
            {{ property?.description || 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.' }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useListingStore } from '@/stores/listingStore';
import { useAgentStore } from '@/stores/agentStore';

const router = useRouter();
const route = useRoute();
const listingStore = useListingStore();
const agentStore = useAgentStore();

// Extract property ID from route params
const propertyId = computed(() => parseInt(route.params.propertyId));

// Fetch property data from store
const property = computed(() => {
  return propertyId.value ? listingStore.getListingById(propertyId.value) : null;
});

// Get agent data
const agent = computed(() => {
  if (!property.value?.agentId) return null;
  return agentStore.getAgentById(property.value.agentId);
});

// Format agent location tag to show "Location, Specialty"
const formattedAgentLocation = computed(() => {
  if (!agent.value) return 'Unknown Location';
  const location = agent.value.location || 'Unknown Location';
  return `${location}`;
});

// Format agent specialty tag
const formattedAgentSpecialty = computed(() => {
  if (!agent.value) return 'Luxury Homes';
  return agent.value.specialties && agent.value.specialties.length > 0
    ? agent.value.specialties[0]
    : 'Luxury Homes';
});

// Image to display - if property has photos use the first one, otherwise use default
const propertyImage = computed(() => {
  // Check property value exists
  if (!property.value) {
    console.warn('Property not found');
    return 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548284/Rectangle_227_ncwnmz.png';
  }

  // First check if we have real photos in the property data
  if (property.value.photos && property.value.photos.length > 0) {
    // Check if the photo URL is a placeholder or example URL
    const firstPhoto = property.value.photos[0];
    if (!firstPhoto.includes('example') && !firstPhoto.includes('placeholder')) {
      console.log('Using real photo from property data:', firstPhoto);
      return firstPhoto;
    }
  }

  // If no valid photos or using example URLs, use our Cloudinary image map
  const imageMap = {
    101: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548284/Rectangle_227_ncwnmz.png',
    102: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1743087291/Designer_8_1_fjvyi0.png',
    103: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548295/newtwoimage1_2_ti4hfi.png',
    105: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1718259997/house1_eogyom.jpg'
  };

  console.log('Using imageMap for property ID:', propertyId.value);
  return imageMap[propertyId.value] || 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548284/Rectangle_227_ncwnmz.png';
});

// Format price with commas
function formatPrice(price) {
  return price ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '0';
}

// View agent profile
function viewAgentProfile() {
  if (agent.value) {
    router.push({
      name: 'AgentProfileDetail',
      params: { id: agent.value.id }
    });
  } else {
    console.warn('No agent associated with this property');
  }
}

// Go back function
function goBack() {
  router.push('/clients');
}

onMounted(() => {
  console.log('Viewing property with ID:', propertyId.value);

  if (!property.value) {
    console.warn('Property not found, you may want to redirect to a 404 page');
  }
});
</script>

<style scoped>
.property-detail-page {
  max-width: 1280px;
  margin: 0 auto;
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  background-color: #f9fafb;
  color: #374151;
  padding: 0 1.5rem;
}

.header {
  display: flex;
  align-items: center;
  padding: 1.5rem 0;
  position: relative;
  flex-wrap: wrap;
  gap: 1rem;
}

.back-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.125rem;
  font-weight: 600;
  color: #374151;
}

.header-subtitle {
  font-size: 0.875rem;
  color: #6b7280;
  margin-left: 0.25rem;
  margin-top: 0.25rem;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-left: auto;
  flex-wrap: wrap;
}

.icon-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  border: 1px solid #e5e7eb;
  background-color: white;
  color: #6b7280;
  cursor: pointer;
}

.admin-avatar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.avatar-circle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: #1a4189;
  color: white;
  font-weight: 600;
}

.admin-name {
  font-size: 0.875rem;
  font-weight: 500;
}

.agent-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background-color: white;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  flex-wrap: wrap;
  gap: 1rem;
}

.agent-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
  min-width: 280px;
}

.agent-avatar {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  object-fit: cover;
}

.agent-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 0.5rem;
}

.agent-meta {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.location-tag, .specialty-tag {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #6b7280;
}

.agent-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.action-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
}

.view-profile {
  background-color: #1a4189;
  color: white;
  border: none;
}

.deactivate {
  background-color: white;
  color: #ef4444;
  border: 1px solid #ef4444;
}

.property-content {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

.property-image-container {
  flex: 1;
  min-width: 300px;
  max-width: 500px;
  border-radius: 0.5rem;
  overflow: hidden;
}

.property-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.5rem;
}

.property-details-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 300px;
}

.property-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 0.5rem;
}

.property-address {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0 0 0.5rem;
}

.property-type {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 1.5rem;
}

.property-specs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.spec-item {
  background-color: white;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.spec-title {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.25rem;
}

.spec-value {
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
}

.property-description {
  background-color: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.description-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 1rem;
}

.description-text {
  font-size: 0.875rem;
  line-height: 1.5;
  color: #4b5563;
}
</style>
