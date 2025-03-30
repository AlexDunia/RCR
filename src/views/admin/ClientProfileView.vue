<template>
  <div class="client-profile-page">
    <div class="profile-header">
      <div class="avatar-container">
        <img :src="client?.profilePicture || 'https://randomuser.me/api/portraits/men/32.jpg'" alt="Client avatar" class="profile-avatar" />
      </div>
      <h1 class="profile-name">{{ client?.name || 'Alex Dunia' }}</h1>
    </div>

    <div class="nav-container">
      <div class="tab-buttons">
        <button
          class="tab-button"
          :class="{ active: activeTab === 'bio' }"
          @click="navigateTo('bio')"
        >Bio</button>
        <button
          class="tab-button"
          :class="{ active: activeTab === 'listings' }"
          @click="navigateTo('listings')"
        >Listings</button>
        <button
          class="tab-button"
          :class="{ active: activeTab === 'documents' }"
          @click="navigateTo('documents')"
        >Documents</button>
        <button
          class="tab-button"
          :class="{ active: activeTab === 'connections' }"
          @click="navigateTo('connections')"
        >Connections</button>
        <button
          class="tab-button"
          :class="{ active: activeTab === 'tours' }"
          @click="navigateTo('tours')"
        >Tours</button>
        <button
          class="tab-button"
          :class="{ active: activeTab === 'tasks' }"
          @click="navigateTo('tasks')"
        >Tasks</button>
      </div>
    </div>

    <div class="profile-content">
      <!-- Bio Tab Content -->
      <div v-if="activeTab === 'bio'" class="profile-section">
        <div class="section-header">
          <h2 class="section-title">{{ client?.name || 'Alex Dunia' }} personal Information</h2>
          <button class="edit-button">Edit profile as admin</button>
        </div>

        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">Full name</div>
            <div class="info-value">{{ client?.name || 'Alex Dunia' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Email</div>
            <div class="info-value">{{ client?.email || 'helloduniamedia@gmail.com' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Phone number</div>
            <div class="info-value">08108725914</div>
          </div>
          <div class="info-item">
            <div class="info-label">Alternate phone number</div>
            <div class="info-value">08108725914</div>
          </div>
          <div class="info-item">
            <div class="info-label">Country of residence</div>
            <div class="info-value">123 Main Street, Los Angeles, CA 90001</div>
          </div>
        </div>

        <div class="profile-photo-container">
          <img :src="client?.profilePicture || 'https://randomuser.me/api/portraits/men/32.jpg'" alt="Large profile photo" class="profile-photo" />
        </div>
      </div>

      <!-- Listings Tab Content -->
      <div v-if="activeTab === 'listings'" class="profile-section">
        <div class="listings-header">
          <h2 class="section-title">Most Viewed</h2>
          <p class="section-subtitle">Most Viewed properties by {{ client?.name || 'Alex Dunia' }}</p>

          <div class="filter-buttons">
            <button
              class="filter-btn"
              :class="{ active: activeFilter === 'mostViewed' }"
              @click="filterListings('mostViewed')"
            >Most viewed</button>
            <button
              class="filter-btn"
              :class="{ active: activeFilter === 'saved' }"
              @click="filterListings('saved')"
            >Saved</button>
            <button
              class="filter-btn"
              :class="{ active: activeFilter === 'inquired' }"
              @click="filterListings('inquired')"
            >Inquired</button>
          </div>
        </div>

        <div v-if="filteredListings.length" class="property-list">
          <div v-for="listing in filteredListings" :key="listing.id" class="property-item" @click="viewPropertyDetails(listing.id)">
            <div class="property-image-container">
              <img
                :src="getPropertyImage(listing.id)"
                alt="Property image"
                class="property-image"
              />
            </div>
            <div class="property-details">
              <h3 class="property-title">{{ getPropertyTitle(listing.id) }}</h3>
            </div>
            <div class="view-count">
              <div class="view-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div class="view-text">{{ getViewCount(listing.id) }} views</div>
            </div>
          </div>
        </div>

        <div v-else class="empty-state">
          <p>This client hasn't viewed any property listings yet.</p>
          <button class="add-listing-btn">Recommend Properties</button>
        </div>
      </div>

      <!-- Documents Tab Content -->
      <div v-if="activeTab === 'documents'" class="profile-section">
        <div class="section-header">
          <h2 class="section-title">{{ client?.name || 'Alex Dunia' }}'s Documents</h2>
          <button class="edit-button" @click="uploadDocument">Upload Document</button>
        </div>

        <div v-if="isLoading" class="loading-state">
          <p>Loading documents...</p>
        </div>

        <div v-else-if="clientDocuments.length > 0" class="documents-list">
          <div class="table-header">
            <div class="header-cell title">Title</div>
          </div>
          <div class="document-list-container">
            <div v-for="doc in clientDocuments" :key="doc.id" class="document-card" @click="viewDocument(doc.id)">
              <div class="doc-header">
                <div class="doc-badge" :class="doc.type">{{ doc.type }}</div>
                <div v-if="doc.agents && doc.agents.length > 0" class="doc-agent">
                  {{ doc.agents[0].name }}
                </div>
              </div>
              <div class="doc-name" :title="doc.name">{{ truncateText(doc.name, 25) }}</div>
              <div class="doc-date">{{ formatDate(doc.createdAt) }}</div>
            </div>
          </div>
        </div>

        <div v-else class="empty-state">
          <p>No documents found for this client.</p>
          <button class="add-document-btn" @click="uploadDocument">Upload New Document</button>
        </div>
      </div>

      <!-- Connections Tab Content -->
      <div v-if="activeTab === 'connections'" class="profile-section">
        <div class="section-header">
          <h2 class="section-title">{{ client?.name || 'Alex Dunia' }}'s Connections</h2>
          <button class="edit-button">Add Connection</button>
        </div>
        <div class="placeholder-content">
          <p>Client's connections with agents and other clients will be displayed here.</p>
        </div>
      </div>

      <!-- Tours Tab Content -->
      <div v-if="activeTab === 'tours'" class="profile-section">
        <div class="section-header">
          <h2 class="section-title">{{ client?.name || 'Alex Dunia' }}'s Property Tours</h2>
          <button class="edit-button">Schedule Tour</button>
        </div>
        <div class="placeholder-content">
          <p>Client's scheduled and completed property tours will be displayed here.</p>
        </div>
      </div>

      <!-- Tasks Tab Content -->
      <div v-if="activeTab === 'tasks'" class="profile-section">
        <div class="section-header">
          <h2 class="section-title">{{ client?.name || 'Alex Dunia' }}'s Tasks</h2>
          <button class="edit-button">Create Task</button>
        </div>
        <div class="placeholder-content">
          <p>Tasks related to this client will be displayed here.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useClientStore } from '@/stores/clientStore';
import { useListingStore } from '@/stores/listingStore';
import { useDocumentStore } from '@/stores/documents';

const route = useRoute();
const router = useRouter();
const clientStore = useClientStore();
const listingStore = useListingStore();
const documentStore = useDocumentStore();

// Client ID from route params
const clientId = computed(() => parseInt(route.params.id));

// Active tab tracking
const activeTab = ref('bio');

// Filter tracking for listings tab
const activeFilter = ref('mostViewed');

// Client data
const clientDetails = ref(null);

// Loading state
const isLoading = ref(true);

// Client documents
const clientDocuments = computed(() => {
  return documentStore.getDocumentsByClientId(clientId.value);
});

// View document function
function viewDocument(docId) {
  console.log('Editing document:', docId);
  // Navigate to document edit page instead of view page
  router.push(`/receipts-docs/document/${docId}/edit`);
}

// Upload document function
function uploadDocument() {
  console.log('Uploading document for client:', clientId.value);
  // In a real app, you might open a modal or navigate to an upload page
  router.push(`/receipts-docs/document/new?clientId=${clientId.value}`);
}

// Get client basic info
const client = computed(() => {
  return clientId.value ? clientStore.getClientById(clientId.value) : null;
});

// Get property image based on ID
function getPropertyImage(listingId) {
  // Map specific listing IDs to the provided Cloudinary images
  const imageMap = {
    101: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548284/Rectangle_227_ncwnmz.png',
    102: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1743087291/Designer_8_1_fjvyi0.png',
    103: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548295/newtwoimage1_2_ti4hfi.png',
    105: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1718259997/house1_eogyom.jpg'
  };

  return imageMap[listingId] || 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548284/Rectangle_227_ncwnmz.png';
}

// Get filtered listings based on active filter
const filteredListings = computed(() => {
  if (!clientDetails.value?.interactions) return [];

  switch (activeFilter.value) {
    case 'saved':
      return clientDetails.value.interactions.mostSavedListings || [];
    case 'inquired':
      // In a real app, you might have 'inquiredListings' in the interactions
      // For now, just return an empty array
      return [];
    case 'mostViewed':
    default:
      return clientDetails.value.interactions.mostViewedListings || [];
  }
});

// Get view count for a listing (simulate with random number if not available)
function getViewCount(listingId) {
  // In a real app, this would come from analytics data
  const listing = listingStore.getListingById(listingId);

  // If this were a real app, we would use listing data for analytics
  if (listing) {
    console.log(`Getting view count for listing: ${listing.title}`);
  }

  // Generate a consistent view count for each property
  return 20;
}

// Navigate to property details page
function viewPropertyDetails(listingId) {
  router.push({
    name: 'PropertyDetail',
    params: { propertyId: listingId }
  });
}

// Filter listings based on active filter
function filterListings(filter) {
  activeFilter.value = filter;
  // In a real implementation, this would update the displayed listings
  // For the demo, we'll keep showing the same listings regardless of filter
}

// Navigation function
function navigateTo(tab) {
  activeTab.value = tab;

  // Update the URL with the tab as a query parameter
  router.push({
    path: `/clients/${clientId.value}`,
    query: { tab: tab }
  });
}

// Load client details on mount
onMounted(() => {
  if (clientId.value) {
    clientDetails.value = clientStore.getClientFullDetails(clientId.value);
    console.log('Client details:', clientDetails.value);

    // Set active tab from URL query parameter if available
    if (route.query.tab) {
      activeTab.value = route.query.tab;
    }

    // Set loading to false after a brief delay to simulate loading
    setTimeout(() => {
      isLoading.value = false;
    }, 500);
  }
});

// Watch for route query changes to update the active tab
watch(() => route.query.tab, (newTab) => {
  if (newTab) {
    activeTab.value = newTab;
  }
});

// Get property title based on ID
function getPropertyTitle(listingId) {
  const listing = listingStore.getListingById(listingId);
  return listing ? listing.title : 'St. Louis Residence, Columbia USA';
}

// Truncate text to specified character limit
function truncateText(text, charLimit) {
  if (!text) return '';

  if (text.length <= charLimit) return text;

  return text.substring(0, charLimit) + '...';
}

// Format date helper function
function formatDate(dateString) {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}
</script>

<style scoped>
.client-profile-page {
  max-width: 1280px;
  margin: 0 auto;
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  color: #374151;
  background-color: #fff;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 2rem 0;
  margin-left: 2rem;
}

.avatar-container {
  position: relative;
}

.profile-avatar {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.profile-name {
  font-size: 1.75rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.nav-container {
  padding: 0 2rem;
  margin: 1.5rem 0;
  margin-bottom: 2rem;
}

.tab-buttons {
  display: flex;
  gap: 0.75rem;
}

.tab-button {
  padding: 0.7rem 1.5rem;
  font-size: 0.95rem;
  font-weight: 500;
  color: #6b7280;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.tab-button:hover {
  color: #1a4189;
  border-color: #1a4189;
}

.tab-button.active {
  color: #1a4189;
  background-color: #f1f5f9;
  border-color: #e5e7eb;
  font-weight: 600;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1) inset;
}

.profile-content {
  padding: 0 2rem;
}

.profile-section {
  margin-bottom: 3rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1rem 1.5rem;
  background-color: #f1f5f9;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151;
  margin: 0;
}

.edit-button {
  padding: 0.6rem 1.2rem;
  background-color: #1a4189;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.edit-button:hover {
  background-color: #153471;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
  width: 60%;
  float: left;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.info-label {
  font-size: 0.875rem;
  color: #6b7280;
}

.info-value {
  font-size: 1rem;
  color: #111827;
  font-weight: 500;
}

.profile-photo-container {
  float: right;
  width: 35%;
  margin-top: -1rem;
}

.profile-photo {
  width: 100%;
  max-width: 300px;
  height: auto;
  border-radius: 0.75rem;
  object-fit: cover;
}

.placeholder-content {
  padding: 2rem;
  background-color: #f9fafb;
  border-radius: 0.5rem;
  border: 1px dashed #d1d5db;
  text-align: center;
  color: #6b7280;
}

.listings-header {
  background-color: #e2f2ee;
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.section-subtitle {
  font-size: 0.875rem;
  color: #4b5563;
  margin-top: 0.25rem;
  margin-bottom: 1rem;
}

.filter-buttons {
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
}

.filter-btn {
  padding: 0.5rem 1rem;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-btn:hover {
  border-color: #1a4189;
  color: #1a4189;
}

.filter-btn.active {
  background-color: #1a4189;
  color: white;
  border-color: #1a4189;
}

.property-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.property-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: white;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.2s ease;
}

.property-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-color: #d1d5db;
}

.property-image-container {
  width: 80px;
  height: 80px;
  border-radius: 0.375rem;
  overflow: hidden;
  flex-shrink: 0;
}

.property-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.property-details {
  flex: 1;
}

.property-title {
  font-size: 1rem;
  font-weight: 500;
  color: #111827;
  margin: 0;
}

.view-count {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
}

.view-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background-color: #f3f4f6;
  border-radius: 50%;
}

.view-icon svg {
  width: 16px;
  height: 16px;
  color: #6b7280;
}

.view-text {
  font-size: 0.875rem;
}

.empty-state {
  padding: 2rem;
  background-color: #f9fafb;
  border-radius: 0.5rem;
  border: 1px dashed #d1d5db;
  text-align: center;
  color: #6b7280;
}

.add-listing-btn {
  padding: 0.6rem 1.2rem;
  background-color: #1a4189;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.add-listing-btn:hover {
  background-color: #153471;
}

.loading-state {
  padding: 2rem;
  text-align: center;
  color: #6b7280;
}

.empty-state {
  padding: 2rem;
  text-align: center;
  background-color: #f9fafb;
  border-radius: 0.5rem;
  border: 1px dashed #e5e7eb;
  color: #6b7280;
  margin-top: 1rem;
}

.add-document-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #1a4189;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
}

.documents-list {
  margin-top: 1rem;
}

.table-header {
  background-color: #f9fafb;
  padding: 0.75rem 1rem;
  font-weight: 500;
  color: #4b5563;
  border-bottom: 1px solid #e5e7eb;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
}

.header-cell {
  padding: 0.5rem;
  font-size: 0.875rem;
}

.document-list-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  padding: 1rem;
  background-color: white;
  border-radius: 0 0 0.5rem 0.5rem;
  border: 1px solid #e5e7eb;
  border-top: none;
}

.document-card {
  padding: 1rem;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition: all 0.2s ease;
  cursor: pointer;
}

.document-card:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.doc-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 0.25rem;
}

.doc-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  text-transform: uppercase;
  font-weight: 500;
  width: fit-content;
}

.doc-badge.buyer-rep {
  background-color: #dbeafe;
  color: #1e40af;
}

.doc-badge.seller-rep {
  background-color: #dcfce7;
  color: #166534;
}

.doc-badge.mls {
  background-color: #e9d5ff;
  color: #6b21a8;
}

.doc-agent {
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  background-color: #f3f4f6;
  border-radius: 0.375rem;
  color: #4b5563;
  font-weight: 500;
}

.doc-name {
  font-weight: 500;
  color: #111827;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.doc-date {
  font-size: 0.75rem;
  color: #6b7280;
  margin-top: 0.25rem;
}
</style>
