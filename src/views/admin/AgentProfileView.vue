<template>
  <div class="agent-profile-page">
    <div class="header">
      <button @click="goBack" class="back-button">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        <span>Back</span>
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

    <!-- Agent Profile Header -->
    <div class="profile-header">
      <div class="profile-avatar-container">
        <img :src="agent?.avatar || 'https://randomuser.me/api/portraits/women/44.jpg'" alt="Agent avatar" class="profile-avatar" />
      </div>
      <div class="profile-info">
        <h1 class="profile-name">{{ agent?.name || 'Agent Name' }}</h1>
        <div class="profile-meta">
          <div class="profile-tag">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <path d="M8 12h8M12 8v8"/>
            </svg>
            <span>{{ agent?.specialties && agent.specialties.length > 0 ? agent.specialties.join(', ') : 'No specialties listed' }}</span>
          </div>
          <div class="profile-tag">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <span>{{ agent?.location || 'Unknown Location' }}</span>
          </div>
          <div class="profile-tag">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            <span>{{ agent?.email || 'email@example.com' }}</span>
          </div>
          <div class="profile-tag">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            <span>{{ agent?.phone || '(555) 123-4567' }}</span>
          </div>
        </div>
        <p class="profile-bio">{{ agent?.bio || 'No bio available.' }}</p>
      </div>
      <div class="profile-actions">
        <button class="action-button primary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
          Contact Agent
        </button>
        <button class="action-button secondary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
          Edit Profile
        </button>
      </div>
    </div>

    <!-- Agent's Listings -->
    <div class="agent-listings">
      <h2 class="section-title">Properties Listed by {{ agent?.name }}</h2>

      <div v-if="agentListings.length === 0" class="no-listings">
        <p>This agent has no current property listings.</p>
      </div>

      <div v-else class="listings-grid">
        <div v-for="listing in agentListings" :key="listing.id" class="listing-card" @click="viewPropertyDetails(listing.id)">
          <div class="listing-image">
            <img :src="getPropertyImage(listing.id)" alt="Property image" />
            <div class="listing-price">${{ formatPrice(listing.price) }}</div>
          </div>
          <div class="listing-details">
            <h3 class="listing-title">{{ listing.title }}</h3>
            <p class="listing-address">{{ listing.address }}</p>
            <div class="listing-specs">
              <div class="spec">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
                <span>{{ listing.bedrooms }} beds</span>
              </div>
              <div class="spec">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                <span>{{ listing.bathrooms }} baths</span>
              </div>
              <div class="spec">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                </svg>
                <span>{{ listing.sqft }} sqft</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Agent's Connections -->
    <div class="agent-connections">
      <h2 class="section-title">
        Connections
        <button @click="showAddConnectionModal = true" class="add-connection-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          Add Connection
        </button>
      </h2>

      <div v-if="isLoadingConnections" class="loading-state">
        <p>Loading connections...</p>
      </div>

      <div v-else>
        <!-- Clients Section -->
        <div class="connections-section">
          <h3 class="subsection-title">Connected Clients</h3>
          <div v-if="connectedClients.length > 0" class="connections-grid">
            <div v-for="connection in connectedClients" :key="connection.id" class="connection-card">
              <div class="connection-avatar">
                <img :src="connection.client.profilePicture" alt="Client avatar" class="avatar-image" />
              </div>
              <div class="connection-details">
                <h4 class="connection-name">{{ connection.client.name }}</h4>
                <p class="connection-meta">{{ connection.client.interests?.join(', ') || 'No interests listed' }}</p>
                <p class="connection-date">Connected {{ formatDate(connection.updatedAt) }}</p>
              </div>
              <div class="connection-actions">
                <button class="action-btn view-btn" @click="viewClientProfile(connection.client.id)">
                  <span>View Profile</span>
                </button>
              </div>
            </div>
          </div>
          <div v-else class="empty-state">
            <p>No connected clients found.</p>
          </div>
        </div>

        <!-- Pending Connections Section -->
        <div class="connections-section">
          <h3 class="subsection-title">Pending Connection Requests</h3>
          <div v-if="pendingConnections.length > 0" class="connections-grid">
            <div v-for="connection in pendingConnections" :key="connection.id" class="connection-card pending">
              <div class="connection-avatar">
                <img :src="connection.client.profilePicture" alt="Client avatar" class="avatar-image" />
              </div>
              <div class="connection-details">
                <h4 class="connection-name">{{ connection.client.name }}</h4>
                <p class="connection-message">{{ connection.message }}</p>
                <p class="connection-date">Requested {{ formatDate(connection.requestedAt) }}</p>
              </div>
              <div class="connection-actions pending-actions">
                <button class="action-btn accept-btn" @click="handleConnectionAction(connection.id, 'accept')">
                  <span>Accept</span>
                </button>
                <button class="action-btn reject-btn" @click="handleConnectionAction(connection.id, 'reject')">
                  <span>Decline</span>
                </button>
              </div>
            </div>
          </div>
          <div v-else class="empty-state">
            <p>No pending connection requests.</p>
          </div>
        </div>
      </div>

      <!-- Add Connection Modal -->
      <div v-if="showAddConnectionModal" class="modal-overlay" @click.self="showAddConnectionModal = false">
        <div class="connection-modal">
          <div class="modal-header">
            <h3 class="modal-title">Connect with Clients</h3>
            <button @click="showAddConnectionModal = false" class="modal-close">&times;</button>
          </div>
          <div class="modal-body">
            <div class="search-container">
              <input
                type="text"
                v-model="connectionSearchQuery"
                placeholder="Search for clients..."
                class="search-input"
              />
            </div>

            <div class="connection-results">
              <div v-if="filteredConnectionResults.length > 0" class="result-list">
                <div
                  v-for="result in filteredConnectionResults"
                  :key="result.id"
                  class="result-item"
                  :class="{ 'already-connected': isAlreadyConnected(result.id) }"
                  @click="selectConnectionTarget(result)"
                >
                  <div class="result-avatar">
                    <img
                      :src="result.profilePicture"
                      alt="Client avatar"
                      class="avatar-image"
                    />
                  </div>
                  <div class="result-details">
                    <h4 class="result-name">{{ result.name }}</h4>
                    <p class="result-meta">
                      {{ result.interests?.join(', ') || 'No interests listed' }}
                    </p>
                  </div>
                  <div class="result-status">
                    <span v-if="isAlreadyConnected(result.id)" class="status-tag connected">Connected</span>
                    <span v-else-if="hasPendingRequest(result.id)" class="status-tag pending">Pending</span>
                    <span v-else class="status-tag">Select</span>
                  </div>
                </div>
              </div>
              <div v-else class="empty-results">
                <p>No results found. Try a different search term.</p>
              </div>
            </div>

            <div v-if="selectedTarget" class="connection-form">
              <h4 class="form-title">Send connection request to {{ selectedTarget.name }}</h4>
              <textarea
                v-model="connectionMessage"
                placeholder="Add a message to your connection request..."
                class="connection-message-input"
              ></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn-secondary"
              @click="showAddConnectionModal = false"
            >
              Cancel
            </button>
            <button
              class="btn-primary"
              @click="sendConnectionRequest"
              :disabled="!selectedTarget || isAlreadyConnected(selectedTarget?.id) || hasPendingRequest(selectedTarget?.id)"
            >
              Send Request
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAgentStore } from '@/stores/agentStore';
import { useListingStore } from '@/stores/listingStore';
import { useClientStore } from '@/stores/clientStore';
import { useConnectionStore } from '@/stores/connectionStore';

const router = useRouter();
const route = useRoute();
const agentStore = useAgentStore();
const listingStore = useListingStore();
const clientStore = useClientStore();
const connectionStore = useConnectionStore();

// Extract agent ID from route params
const agentId = computed(() => parseInt(route.params.id));

// Fetch agent data from store
const agent = computed(() => {
  return agentId.value ? agentStore.getAgentById(agentId.value) : null;
});

// Get listings by this agent
const agentListings = computed(() => {
  return agentId.value ? listingStore.getListingsByAgentId(agentId.value) : [];
});

// Format price with commas
function formatPrice(price) {
  return price ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '0';
}

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

// Navigate to property details page
function viewPropertyDetails(listingId) {
  router.push({
    name: 'PropertyDetail',
    params: { propertyId: listingId }
  });
}

// Go back function
function goBack() {
  router.back();
}

// Connections state
const isLoadingConnections = ref(true);
const showAddConnectionModal = ref(false);
const connectionSearchQuery = ref('');
const selectedTarget = ref(null);
const connectionMessage = ref('');

// Get connections for current agent
const agentConnections = computed(() => {
  const id = agentId.value;
  if (!id) return [];
  return connectionStore.getConnectionsByUserId(id, 'agent');
});

// Get connected clients
const connectedClients = computed(() => {
  return agentConnections.value
    .filter(conn =>
      (conn.status === 'accepted') &&
      ((conn.fromType === 'client' && conn.toId === agentId.value) ||
       (conn.toType === 'client' && conn.fromId === agentId.value))
    )
    .map(conn => {
      const clientId = conn.fromType === 'client' ? conn.fromId : conn.toId;
      const client = clientStore.getClientById(clientId);
      return {
        id: conn.id,
        client,
        requestedAt: conn.requestedAt,
        updatedAt: conn.updatedAt
      };
    })
    .filter(conn => conn.client); // Filter out any undefined clients
});

// Get pending connections
const pendingConnections = computed(() => {
  return connectionStore.getPendingConnectionsForUser(agentId.value, 'agent')
    .map(conn => {
      const clientEntity = clientStore.getClientById(conn.fromId);
      return {
        id: conn.id,
        client: clientEntity,
        message: conn.message,
        requestedAt: conn.requestedAt
      };
    })
    .filter(conn => conn.client); // Filter out undefined entities
});

// Filter clients for the connection modal
const filteredConnectionResults = computed(() => {
  const query = connectionSearchQuery.value.toLowerCase().trim();

  // Start with all clients
  let results = clientStore.clients;

  // If search term provided, filter by it
  if (query) {
    results = results.filter(client =>
      client.name.toLowerCase().includes(query) ||
      client.email.toLowerCase().includes(query) ||
      (client.interests && client.interests.some(i => i.toLowerCase().includes(query)))
    );
  }

  return results;
});

// Connection helper functions
function isAlreadyConnected(clientId) {
  return connectionStore.areUsersConnected(
    agentId.value,
    'agent',
    clientId,
    'client'
  );
}

function hasPendingRequest(clientId) {
  const connection = connectionStore.getConnectionBetweenUsers(
    agentId.value,
    'agent',
    clientId,
    'client'
  );

  return connection && connection.status === 'pending';
}

function selectConnectionTarget(client) {
  if (!isAlreadyConnected(client.id) && !hasPendingRequest(client.id)) {
    selectedTarget.value = client;
  }
}

function sendConnectionRequest() {
  if (!selectedTarget.value) return;

  connectionStore.requestConnection(
    agentId.value,
    'agent',
    selectedTarget.value.id,
    'client',
    connectionMessage.value
  );

  // Reset state
  connectionMessage.value = '';
  selectedTarget.value = null;
  showAddConnectionModal.value = false;

  // Show success notification (in a real app)
  alert('Connection request sent successfully!');
}

function handleConnectionAction(connectionId, action) {
  if (action === 'accept') {
    connectionStore.acceptConnection(connectionId);
  } else if (action === 'reject') {
    connectionStore.rejectConnection(connectionId);
  }
}

function viewClientProfile(clientId) {
  router.push(`/clients/${clientId}`);
}

// Format date helper
function formatDate(dateString) {
  if (!dateString) return '';

  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

onMounted(() => {
  console.log('Viewing agent with ID:', agentId.value);

  if (!agent.value) {
    console.warn('Agent not found, you may want to redirect to a 404 page');
  }

  // Load connections after a brief delay to simulate API call
  setTimeout(() => {
    isLoadingConnections.value = false;
  }, 500);
});
</script>

<style scoped>
.agent-profile-page {
  max-width: 1280px;
  margin: 0 auto;
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  color: #374151;
}

.header {
  display: flex;
  align-items: center;
  padding: 1.5rem 0;
  position: relative;
}

.back-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.125rem;
  font-weight: 500;
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

.profile-header {
  display: flex;
  align-items: flex-start;
  background-color: white;
  border-radius: 0.5rem;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.profile-avatar-container {
  margin-right: 2rem;
}

.profile-avatar {
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #f3f4f6;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.profile-info {
  flex: 1;
}

.profile-name {
  font-size: 1.75rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 0.75rem;
}

.profile-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
}

.profile-tag {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #6b7280;
}

.profile-bio {
  font-size: 0.925rem;
  line-height: 1.5;
  color: #4b5563;
  margin-top: 1rem;
}

.profile-actions {
  display: flex;
  gap: 1rem;
}

.action-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
}

.primary {
  background-color: #1a4189;
  color: white;
  border: none;
}

.secondary {
  background-color: white;
  color: #1a4189;
  border: 1px solid #1a4189;
}

.agent-listings {
  margin-bottom: 3rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.no-listings {
  padding: 2rem;
  background-color: #f9fafb;
  border-radius: 0.5rem;
  border: 1px dashed #d1d5db;
  text-align: center;
  color: #6b7280;
}

.listings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.listing-card {
  background-color: white;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.listing-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 10px 15px rgba(0, 0, 0, 0.1);
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

.listing-price {
  position: absolute;
  bottom: 0.75rem;
  left: 0.75rem;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  font-weight: 600;
}

.listing-details {
  padding: 1.25rem;
}

.listing-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.listing-address {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.listing-specs {
  display: flex;
  justify-content: space-between;
}

.spec {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.875rem;
  color: #4b5563;
}

.agent-connections {
  margin-bottom: 3rem;
}

.add-connection-btn {
  background-color: #1a4189;
  color: white;
  border: none;
  padding: 0.625rem 1.25rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.loading-state {
  padding: 2rem;
  background-color: #f9fafb;
  border-radius: 0.5rem;
  border: 1px dashed #d1d5db;
  text-align: center;
  color: #6b7280;
}

.connections-section {
  margin-bottom: 2rem;
}

.subsection-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 1rem;
}

.connections-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.connection-card {
  background-color: white;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.connection-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 10px 15px rgba(0, 0, 0, 0.1);
}

.connection-avatar {
  position: relative;
  height: 100px;
}

.connection-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.connection-details {
  padding: 1.25rem;
}

.connection-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 0.5rem;
}

.connection-meta {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 1rem;
}

.connection-date {
  font-size: 0.875rem;
  color: #6b7280;
}

.connection-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.action-btn {
  background-color: #1a4189;
  color: white;
  border: none;
  padding: 0.625rem 1.25rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
}

.view-btn {
  background-color: #1a4189;
  color: white;
  border: none;
  padding: 0.625rem 1.25rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
}

.empty-state {
  padding: 2rem;
  background-color: #f9fafb;
  border-radius: 0.5rem;
  border: 1px dashed #d1d5db;
  text-align: center;
  color: #6b7280;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.connection-modal {
  background-color: white;
  padding: 2rem;
  border-radius: 0.5rem;
  width: 50%;
  max-width: 600px;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #6b7280;
  cursor: pointer;
}

.modal-body {
  margin-bottom: 2rem;
}

.search-container {
  margin-bottom: 1rem;
}

.search-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
}

.connection-results {
  margin-bottom: 1rem;
}

.result-list {
  max-height: 300px;
  overflow-y: auto;
}

.result-item {
  display: flex;
  align-items: center;
  padding: 0.75rem;
  border-bottom: 1px solid #d1d5db;
  cursor: pointer;
}

.result-item:hover {
  background-color: #f3f4f6;
}

.result-avatar {
  margin-right: 1rem;
}

.result-avatar img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.result-details {
  flex: 1;
}

.result-name {
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
}

.result-meta {
  font-size: 0.875rem;
  color: #6b7280;
}

.result-status {
  font-size: 0.875rem;
  color: #6b7280;
}

.connection-form {
  margin-top: 1rem;
}

.form-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 1rem;
}

.connection-message-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.btn-secondary {
  background-color: white;
  color: #1a4189;
  border: 1px solid #1a4189;
  padding: 0.625rem 1.25rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
}

.btn-primary {
  background-color: #1a4189;
  color: white;
  border: none;
  padding: 0.625rem 1.25rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
}
</style>
