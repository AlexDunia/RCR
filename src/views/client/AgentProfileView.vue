<template>
  <div class="agent-profile-page">
    <!-- Loading state -->
    <div v-if="loading" class="loading-state">
      <div class="loading-spinner"></div>
      <p>Loading agent profile...</p>
    </div>

    <!-- Error state -->
    <div v-else-if="loadingError || !agent" class="error-state">
      <p>{{ loadingError || 'Agent not found.' }}</p>
      <button @click="goBack" class="back-btn">
        Back to Agents List
      </button>
    </div>

    <!-- Content when agent is loaded -->
    <div v-else class="agent-content-wrapper">
      <!-- Custom header that matches the screenshot -->
      <div class="custom-agent-header">
        <div class="agent-info-section">
          <div class="agent-avatar">
            <img :src="agent.profilePicture || agent.avatar || '/images/default-avatar.jpg'" :alt="agent.name" />
          </div>
          <div class="agent-header-details">
            <h1>{{ agent.name }}</h1>
            <p class="agent-title">{{ agent.title || getAgentTitle() }}</p>
          </div>
        </div>

        <div class="agent-actions">
          <button v-if="!isConnected && !connectionPending" @click="handleConnectClick" class="connect-btn">
            Request to connect
          </button>
          <button v-else class="icon-btn favorite-btn" :class="{ 'is-favorite': isAgentFavourite }" aria-label="Add to favorites" @click="toggleAgentFavourite">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" :fill="isAgentFavourite ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
          <button class="icon-btn message-btn" aria-label="Send message">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7a8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6a8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
          </button>
        </div>
      </div>

      <div class="agent-profile-content">
        <!-- Hidden connection buttons for functionality -->
        <div class="hidden-buttons">
          <button v-if="!isConnected && !connectionPending" @click="handleConnectClick">Connect</button>
          <button v-else-if="isConnected" @click="handleDisconnectClick">Disconnect</button>
        </div>

        <!-- Tab navigation -->
        <div class="profile-tabs-container">
          <div class="profile-tabs-row">
            <router-link
              :to="{ name: 'AgentBio', params: { id: agent?.id } }"
              class="tab-btn"
              :class="{ 'active': activeTab === 'bio' }"
            >Bio</router-link>
            <router-link
              :to="{ name: 'AgentListings', params: { id: agent?.id } }"
              class="tab-btn"
              :class="{ 'active': activeTab === 'listings' }"
              v-if="isConnected"
            >Listings</router-link>
            <router-link
              :to="{ name: 'AgentDocuments', params: { id: agent?.id } }"
              class="tab-btn"
              :class="{ 'active': activeTab === 'documents' }"
              v-if="isConnected"
            >Documents shared</router-link>
          </div>
        </div>

        <!-- Restricted access notice -->
        <div v-if="!isConnected && !connectionPending" class="restricted-access-notice">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
          <div>
            <p class="notice-title">You cannot view full profile</p>
            <p class="notice-subtitle">You need to request a connection to view full profile</p>
          </div>
        </div>

        <!-- Tab content -->
        <div class="tab-content-card">
          <!-- Bio tab -->
          <div v-if="activeTab === 'bio'" class="bio-tab-content bio-three-col">
            <div class="bio-col bio-col-left">
              <div class="detail-item">
                <div class="detail-label">Full name</div>
                <div class="detail-value">{{ agent.name }}</div>
              </div>
              <div class="detail-item detail-item-full-width">
                <div class="detail-label">About</div>
                <div :class="{'detail-value': true, 'bio-text': true, 'blurred-text': !isConnected && !connectionPending}">
                  {{ agent.bio }}
                </div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Availability</div>
                <div class="detail-value">Weekdays, 9 AM - 5 PM</div>
              </div>
            </div>
            <div class="bio-col bio-col-middle">
              <div class="detail-item">
                <div class="detail-label">Email</div>
                <div :class="{'detail-value': true, 'blurred': !isConnected && !connectionPending}">
                  {{ agent.email }}
                </div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Location</div>
                <div class="detail-value">{{ agent.location }}</div>
              </div>
            </div>
            <div class="bio-col bio-col-right">
              <div v-if="isConnected || connectionPending" class="agent-bio-image-container">
                <img :src="agent.profilePicture || agent.avatar" :alt="agent.name" class="agent-bio-image" />
              </div>
              <div v-else class="agent-bio-image-placeholder"></div>
            </div>
          </div>

          <!-- Listings tab -->
          <div v-else-if="activeTab === 'listings'" class="listings-tab-content">
            <div v-if="!isConnected && !connectionPending" class="content-locked">
              <p>Connect with this agent to view their listings.</p>
            </div>
            <div v-else>
              <!-- Search and filters bar -->
              <div class="listings-search-container">
                <div class="search-input-container">
                  <span class="search-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                  </span>
                  <input type="text" placeholder="Search..." class="listings-search">
                  <span class="search-shortcut">⌘ K</span>
                </div>

                <div class="filter-controls">
                  <div class="filter-dropdown">
                    <button class="filter-btn">
                      Price Range ($)
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </button>
                  </div>

                  <div class="filter-dropdown">
                    <button class="filter-btn">
                      Bedrooms
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </button>
                  </div>

                  <div class="filter-dropdown">
                    <button class="filter-btn">
                      Property type
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </button>
                  </div>

                  <div class="filter-dropdown">
                    <button class="filter-btn">
                      Location
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Property grid -->
              <div class="property-grid">
                <div v-for="property in agentProperties" :key="property.id" class="property-card">
                  <div class="property-image">
                    <img :src="property.image" :alt="property.name" />
                    <button class="favorite-property-btn" :class="{ 'is-favorite': isFavorite(property.id) }" @click.prevent="toggleFavorite(property.id)">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" :fill="isFavorite(property.id) ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                      </svg>
                    </button>
                  </div>
                  <div class="property-details">
                    <h3 class="property-name">{{ property.name }}</h3>
                    <div class="property-location">{{ property.location }}</div>
                    <div class="property-price">{{ property.price }}</div>
                    <button class="view-property-btn" @click="viewProperty(property.id)">View Details</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Documents tab -->
          <div v-else-if="activeTab === 'documents'" class="documents-tab-content">
            <div v-if="!isConnected && !connectionPending" class="content-locked">
              <p>Connect with this agent to view shared documents.</p>
            </div>
            <div v-else-if="documentsLoading" class="documents-loading">
              <div class="documents-loading-spinner"></div>
              <p>Loading documents...</p>
            </div>
            <div v-else-if="sharedDocuments.length === 0" class="empty-state">
              <div class="empty-state-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <p>No documents have been shared with you yet.</p>
            </div>
            <div v-else class="documents-container">
              <div class="documents-header">
                <div class="documents-search-container">
                  <span class="search-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                  </span>
                  <input type="text" placeholder="Search documents..." class="documents-search">
                </div>
              </div>

              <div class="documents-list">
                <div v-for="document in sharedDocuments" :key="document.id" class="document-card">
                  <div class="document-icon">
                    <svg v-if="document.files && document.files.length > 0 && document.files[0].type && document.files[0].type.includes('pdf')" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                    <svg v-else-if="document.files && document.files.length > 0 && document.files[0].type && document.files[0].type.includes('docx')" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                  </div>
                  <div class="document-details">
                    <h3 class="document-name">{{ document.name }}</h3>
                    <div class="document-meta">
                      <span class="document-date">Added: {{ formatDate(document.createdAt) }}</span>
                      <span v-if="document.files && document.files.length > 0" class="document-size">{{ formatFileSize(document.files[0].size) }} • {{ document.files[0].name.split('.').pop().toUpperCase() }}</span>
                    </div>
                  </div>
                  <div class="document-actions">
                    <button class="download-btn" @click="downloadDocument(document)">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Success/Pending Notice -->
        <div v-if="connectionPending" class="connection-pending-notice">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          <span>Success. Please wait for an approval</span>
          <button class="close-notice-btn" @click="connectionPending = false">&times;</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onBeforeUnmount, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAgentStore } from '@/stores/agentStore';
import { usePropertyStore } from '@/stores/propertyStore';
import { useLayoutStore } from '@/stores/layout';
import { useDocumentStore } from '@/stores/documents';
import { useFavouritesStore } from '@/stores/favouritesStore';

const route = useRoute();
const router = useRouter();
const agentStore = useAgentStore();
const propertyStore = usePropertyStore();
const layoutStore = useLayoutStore();
const documentStore = useDocumentStore();
const favouritesStore = useFavouritesStore();

// Initialize favorites
favouritesStore.initFavourites();

const agent = ref(null);
const loading = ref(true);
const activeTab = ref('bio');
const connectionPending = ref(false);
const loadingError = ref(null);
const sharedDocuments = ref([]);
const documentsLoading = ref(false);

// Check if the agent is favorited
const isAgentFavourite = computed(() => {
  if (!agent.value) return false;
  return favouritesStore.isAgentFavourite(agent.value.id);
});

// Toggle agent favorite status
const toggleAgentFavourite = () => {
  if (agent.value) {
    favouritesStore.toggleFavouriteAgent(agent.value.id);
  }
};

// Set the active tab based on the route meta
watch(() => route.meta.tab, (newTab) => {
  if (newTab) {
    activeTab.value = newTab;
  }
}, { immediate: true });

// Also watch for route changes to update the tab
watch(() => route.name, (newRouteName) => {
  if (newRouteName === 'AgentBio') {
    activeTab.value = 'bio';
  } else if (newRouteName === 'AgentListings') {
    activeTab.value = 'listings';
  } else if (newRouteName === 'AgentDocuments') {
    activeTab.value = 'documents';
  }
}, { immediate: true });

// Connection status
const isConnected = computed(() => {
  if (!agent.value || connectionPending.value) return false;
  const connections = getConnectionsFromLocalStorage();
  return connections.includes(agent.value.id);
});

const agentProperties = computed(() => {
  if (!agent.value) return [];
  const allProperties = propertyStore.properties;
  if (agent.value.id === 5) return allProperties.slice(0, 2);
  if (agent.value.id === 8) return allProperties.slice(1, 3);
  if (agent.value.id === 10) return allProperties.slice(2, 4);
  return allProperties.slice(0,1);
});

// Go back to previous page or agents list
const goBack = () => {
  router.push('/client/agents');
};

// View property details
const viewProperty = (propertyId) => {
  router.push({
    path: `/client-property/${propertyId}`,
    query: { from: 'agents' }
  });
};

// Check if a property is favorited
const isFavorite = (propertyId) => {
  return favouritesStore.isPropertyFavourite(propertyId);
};

// Toggle favorite status of a property
const toggleFavorite = (propertyId) => {
  favouritesStore.toggleFavouriteProperty(propertyId);
};

function getConnectionsFromLocalStorage() {
  const storedConnections = localStorage.getItem('agent-connections');
  return storedConnections ? JSON.parse(storedConnections) : [];
}

function saveConnectionsToLocalStorage(connections) {
  localStorage.setItem('agent-connections', JSON.stringify(connections));
}

function handleConnectClick() {
  connectionPending.value = true;
  setTimeout(() => {
    // Simulate actual connection for demo, then clear pending state
    const connections = getConnectionsFromLocalStorage();
    if (agent.value && !connections.includes(agent.value.id)) {
      connections.push(agent.value.id);
      saveConnectionsToLocalStorage(connections);
      agent.value = { ...agent.value }; // Force reactivity
    }
    connectionPending.value = false;
  }, 2000);
}

function handleDisconnectClick() {
  const connections = getConnectionsFromLocalStorage();
  if (agent.value && connections.includes(agent.value.id)) {
    const updatedConnections = connections.filter(id => id !== agent.value.id);
    saveConnectionsToLocalStorage(updatedConnections);
    agent.value = { ...agent.value }; // Force reactivity
  }
}

function getAgentTitle() {
  if (!agent.value || !agent.value.specialties || agent.value.specialties.length === 0) {
    return 'Real Estate Agent';
  }
  if (agent.value.specialties.includes('Luxury Homes') || agent.value.specialties.includes('Luxury Estates')) {
    return 'Luxury Property Specialist';
  } else if (agent.value.specialties.includes('Investment Properties')) {
    return 'Investment Property Advisor';
  } else if (agent.value.specialties.includes('First-Time Buyers')) {
    return 'First-Time Homebuyer Specialist';
  }
  return 'Senior Real Estate Agent';
}

// Get shared documents between agent and client (or generate some if none exist)
const getSharedDocuments = async () => {
  if (!agent.value) return [];

  documentsLoading.value = true;

  try {
    // For demo purposes, we'll use a fixed client ID (1) representing the current user
    const currentClientId = 1; // In a real app, this would come from auth context

    // Get all documents from the document store
    const allDocuments = documentStore.getAllDocuments();

    // Filter documents that are associated with both this agent and the current client
    let agentDocuments = allDocuments.filter(doc => {
      // Check if document has this agent ID in its agents array
      const hasAgent = doc.agents && doc.agents.some(a => a.id === agent.value.id);
      // Check if document belongs to the current client
      const hasClient = doc.clientId === currentClientId;

      return hasAgent && hasClient;
    });

    // If no documents exist, generate some sample documents for demo purposes
    if (agentDocuments.length === 0) {
      const documentTypes = [
        { name: 'Purchase Agreement', type: 'pdf', date: '2023-06-02', size: '2.4 MB' },
        { name: 'Mortgage Approval', type: 'pdf', date: '2023-05-27', size: '1.8 MB' },
        { name: 'Property Inspection Report', type: 'docx', date: '2023-05-15', size: '3.2 MB' }
      ];

      agentDocuments = documentTypes.map((doc, index) => ({
        id: `temp-${index + 1}`,
        name: doc.name,
        description: `Shared document between client and ${agent.value.name}`,
        createdAt: doc.date,
        clientId: currentClientId,
        agents: [{
          id: agent.value.id,
          name: agent.value.name,
          email: agent.value.email,
          avatar: agent.value.avatar || agent.value.profilePicture
        }],
        files: [{
          id: `file-${index + 1}`,
          name: `${doc.name.replace(/\s+/g, '')}.${doc.type}`,
          type: doc.type === 'pdf' ? 'application/pdf' : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          size: parseFileSize(doc.size)
        }]
      }));
    }

    sharedDocuments.value = agentDocuments;
  } catch (error) {
    console.error("Error fetching shared documents:", error);
  } finally {
    documentsLoading.value = false;
  }
};

// Helper function to parse file size
function parseFileSize(sizeString) {
  if (!sizeString) return 0;

  const size = parseFloat(sizeString);
  if (sizeString.includes('KB')) return size * 1024;
  if (sizeString.includes('MB')) return size * 1024 * 1024;
  if (sizeString.includes('GB')) return size * 1024 * 1024 * 1024;
  return size;
}

// Format date to readable format
function formatDate(dateString) {
  if (!dateString) return '';

  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Format file size to readable format
function formatFileSize(bytes) {
  if (!bytes || bytes === 0) return '0 Bytes';

  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return parseFloat((bytes / Math.pow(1024, i)).toFixed(1)) + ' ' + sizes[i];
}

// Download document function
function downloadDocument(document) {
  // In a real app, this would trigger the document download
  console.log("Downloading document:", document);
  alert(`Downloading ${document.name}...`);
  // In production, this would use proper download APIs
}

onMounted(async () => {
  loading.value = true;
  loadingError.value = null;

  // Hide the standard header
  layoutStore.setHeaderVisibility(false);

  try {
    const agentId = parseInt(route.params.id);

    // Delay to ensure UI is rendered properly
    await new Promise(resolve => setTimeout(resolve, 300));

    agent.value = agentStore.getAgentById(agentId);

    if (!agent.value) {
      loadingError.value = `Agent with ID ${agentId} not found`;
    } else {
      // Load shared documents when agent is found
      await getSharedDocuments();
    }
  } catch (error) {
    loadingError.value = `Error loading agent: ${error.message}`;
  } finally {
    loading.value = false;
  }
});

// Restore header when component is unmounted
onBeforeUnmount(() => {
  layoutStore.setHeaderVisibility(true);
});
</script>

<style scoped>
.agent-profile-page {
  background-color: #f9fafb;
  min-height: 100vh;
  width: 100%;
  padding-top: 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  color: #111827;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.agent-content-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.loading-state, .error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 96px 20px;
  text-align: center;
}

.loading-spinner {
  border: 2.5px solid rgba(0, 82, 204, 0.08);
  border-radius: 50%;
  border-top: 2.5px solid #0056d6;
  width: 42px;
  height: 42px;
  animation: spin 0.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  margin-bottom: 28px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.03);
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-state p {
  color: #dc2626;
  font-size: 16px;
  margin-bottom: 28px;
  font-weight: 500;
  letter-spacing: -0.01em;
  line-height: 1.6;
}

.back-btn {
  display: inline-block;
  padding: 13px 26px;
  background-color: #0056d6;
  color: white;
  border: none;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 14.5px;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 4px rgba(0, 86, 214, 0.15), 0 4px 6px rgba(0, 86, 214, 0.1);
  letter-spacing: -0.01em;
}

.back-btn:hover {
  background-color: #0046c0;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 86, 214, 0.2), 0 8px 16px rgba(0, 86, 214, 0.1);
}

.back-btn:active {
  transform: translateY(1px);
  box-shadow: 0 2px 4px rgba(0, 86, 214, 0.2);
}

.custom-agent-header {
  background-color: white;
  padding: 28px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04), 0 4px 12px rgba(0, 0, 0, 0.02);
  margin-bottom: 0;
  width: 100%;
  position: relative;
  z-index: 10;
  border-bottom: 1px solid #f3f4f6;
  margin-top: 0;
}

.agent-profile-content {
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 28px 48px;
  width: 100%;
  position: relative;
}

.agent-info-section {
  display: flex;
  align-items: center;
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 28px;
  width: 100%;
}

.agent-avatar {
  width: 76px;
  height: 76px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 26px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06), 0 2px 6px rgba(0, 0, 0, 0.03);
  border: 3px solid #fff;
  flex-shrink: 0;
  position: relative;
}

.agent-avatar::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.07);
  pointer-events: none;
}

.agent-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.agent-header-details h1 {
  font-size: 25px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 7px 0;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.agent-title {
  font-size: 15px;
  color: #4b5563;
  font-weight: 500;
  letter-spacing: -0.01em;
}

.agent-actions {
  position: absolute;
  right: 28px;
  display: flex;
  gap: 16px;
  max-width: 1180px;
  margin: 0 auto;
}

.icon-btn {
  background-color: #f9fafb;
  border: none;
  border-radius: 50%;
  width: 46px;
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.04), 0 4px 8px rgba(0, 0, 0, 0.03);
  position: relative;
  overflow: hidden;
}

.icon-btn::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 80%);
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;
}

.icon-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06), 0 8px 16px rgba(0, 0, 0, 0.04);
}

.icon-btn:hover::after {
  opacity: 0.6;
}

.icon-btn:active {
  transform: translateY(1px);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.04);
}

.icon-btn svg {
  transition: transform 0.2s ease;
}

.icon-btn:hover svg {
  transform: scale(1.1);
}

.favorite-btn {
  background-color: white;
  border: 1px solid #f1f5f9;
}

.favorite-btn svg {
  color: #f43f5e;
  fill: #fecdd3;
}

.message-btn {
  background-color: white;
  border: 1px solid #f1f5f9;
}

.message-btn svg {
  color: #0056d6;
  fill: transparent;
}

.hidden-buttons {
  display: none;
}

.profile-tabs-container {
  background-color: white;
  border-radius: 0;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
  margin-bottom: 36px;
  position: relative;
  z-index: 2;
  overflow: hidden;
  border-bottom: 1px solid #f3f4f6;
}

.profile-tabs-row {
  display: flex;
  padding: 0;
  gap: 0;
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 28px;
}

.tab-btn {
  padding: 18px 24px;
  background: none;
  border: none;
  font-size: 15px;
  font-weight: 500;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  border-bottom: 3px solid transparent;
  letter-spacing: -0.01em;
}

.tab-btn.active {
  color: #0056d6;
  font-weight: 600;
  background: transparent;
  border-bottom: 3px solid #0056d6;
}

.tab-btn::after {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: #0056d6;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.3s ease;
}

.tab-btn:not(.active):hover::after {
  transform: scaleX(0.5);
  transform-origin: left;
}

.tab-btn:not(.active):hover {
  color: #374151;
  background: transparent;
}

.tab-content-card {
  background-color: white;
  border-radius: 14px;
  padding: 36px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04), 0 6px 16px rgba(0, 0, 0, 0.02);
  margin-top: 0;
  transition: all 0.3s ease;
  border: 1px solid rgba(239, 241, 245, 0.8);
}

.restricted-access-notice {
  display: flex;
  align-items: flex-start;
  padding: 18px 22px;
  background-color: #fff;
  border-left: 4px solid #f43f5e;
  border-radius: 10px;
  margin-bottom: 36px;
  color: #111827;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03), 0 1px 2px rgba(0, 0, 0, 0.02);
}

.restricted-access-notice svg {
  margin-right: 18px;
  flex-shrink: 0;
  margin-top: 2px;
  color: #f43f5e;
  width: 20px;
  height: 20px;
}

.notice-title {
  font-weight: 600;
  font-size: 15px;
  margin: 0 0 5px 0;
  color: #111827;
  letter-spacing: -0.01em;
}

.notice-subtitle {
  font-size: 14px;
  margin: 0;
  color: #6b7280;
  line-height: 1.5;
}

.bio-tab-content.bio-three-col {
  display: grid;
  grid-template-columns: 1.2fr 1fr 1.1fr;
  gap: 52px;
  align-items: flex-start;
}

.bio-col {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.bio-col-right {
  align-items: center;
  justify-content: flex-start;
}

.agent-bio-image-placeholder {
  width: 230px;
  height: 230px;
  border-radius: 50%;
  background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
  position: relative;
  overflow: hidden;
}

.agent-bio-image-placeholder::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  right: -50%;
  bottom: -50%;
  background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%);
  animation: shimmer 2s infinite;
  transform: rotate(30deg);
}

@keyframes shimmer {
  0% { transform: translateX(-100%) rotate(30deg); }
  100% { transform: translateX(100%) rotate(30deg); }
}

.agent-bio-image-container {
  width: 230px;
  height: 230px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08), 0 6px 10px rgba(0, 0, 0, 0.04);
  position: relative;
}

.agent-bio-image-container::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.08);
  pointer-events: none;
}

.agent-bio-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 1.2s ease;
}

.agent-bio-image-container:hover .agent-bio-image {
  transform: scale(1.06);
}

.section-title {
  font-size: 18px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 26px 0;
  letter-spacing: -0.01em;
}

.profile-details-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 26px;
}

.detail-item-full-width {
  grid-column: 1 / -1;
}

.detail-item {
  position: relative;
}

.detail-label {
  font-size: 12.5px;
  color: #6b7280;
  margin-bottom: 7px;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.detail-value {
  font-size: 15px;
  color: #111827;
  line-height: 1.6;
  font-weight: 450;
}

.bio-text {
  line-height: 1.75;
}

.blurred {
  background: linear-gradient(90deg, #f3f4f6 0%, #f1f5f9 100%);
  color: transparent;
  border-radius: 6px;
  padding: 2px 0;
  user-select: none;
  display: inline-block;
  min-width: 150px;
  min-height: 1em;
  position: relative;
}

.blurred::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 100%);
  animation: shimmer 2s infinite;
}

.blurred-text {
  background: linear-gradient(135deg, #f3f4f6 0%, #f1f5f9 100%);
  color: transparent;
  border-radius: 10px;
  padding: 16px;
  user-select: none;
  min-height: 90px;
  position: relative;
}

.blurred-text::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 100%);
  animation: shimmer 2s infinite;
}

.content-locked {
  text-align: center;
  padding: 70px;
  color: #6b7280;
  font-weight: 500;
  font-size: 16px;
  letter-spacing: -0.01em;
}

.connection-pending-notice {
  position: fixed;
  bottom: 36px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #18181b;
  color: white;
  padding: 16px 28px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15), 0 4px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  gap: 14px;
  z-index: 1000;
  font-size: 15px;
  font-weight: 500;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.connection-pending-notice svg {
  color: #10b981;
}

.close-notice-btn {
  background: none;
  border: none;
  color: #94a3b8;
  font-size: 20px;
  cursor: pointer;
  padding: 0 0 0 12px;
  line-height: 1;
  transition: color 0.2s ease;
  margin-left: 8px;
}

.close-notice-btn:hover {
  color: white;
}

@media (max-width: 900px) {
  .bio-tab-content.bio-three-col {
    grid-template-columns: 1fr 1fr;
    gap: 30px;
  }
  .bio-col-right {
    grid-column: 1 / -1;
    align-items: center;
    margin-top: 24px;
  }
}

@media (max-width: 600px) {
  .agent-profile-page {
    padding: 0;
  }
  .custom-agent-header {
    padding: 22px 18px;
  }
  .agent-profile-content {
    padding: 0 18px 36px;
  }
  .bio-tab-content.bio-three-col {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  .bio-col-right {
    margin-top: 28px;
  }
  .tab-btn {
    padding: 16px 18px;
    font-size: 14px;
  }
  .tab-content-card {
    padding: 26px;
    border-radius: 12px;
  }
}

.connect-btn {
  background-color: #0056d6;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 13px 24px;
  font-size: 14.5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 4px rgba(0, 86, 214, 0.15), 0 4px 6px rgba(0, 86, 214, 0.1);
  letter-spacing: -0.01em;
  position: relative;
  overflow: hidden;
}

.connect-btn::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%);
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;
}

.connect-btn:hover {
  background-color: #0046c0;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 86, 214, 0.2), 0 8px 16px rgba(0, 86, 214, 0.1);
}

.connect-btn:hover::after {
  opacity: 1;
}

.connect-btn:active {
  transform: translateY(1px);
  box-shadow: 0 2px 4px rgba(0, 86, 214, 0.2);
}

/* Listings tab styles */
.listings-tab-content {
  padding-top: 10px;
}

.listings-search-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 36px;
  flex-wrap: wrap;
  gap: 22px;
}

.search-input-container {
  position: relative;
  width: 330px;
}

.listings-search {
  width: 100%;
  height: 50px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 0 48px 0 18px;
  font-size: 15px;
  color: #111827;
  background-color: white;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
  font-weight: 450;
}

.listings-search:focus {
  outline: none;
  border-color: #0056d6;
  box-shadow: 0 0 0 3px rgba(0, 86, 214, 0.1);
}

.search-icon {
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
}

.listings-search {
  padding-left: 48px;
}

.search-shortcut {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  background-color: #f9fafb;
  color: #6b7280;
  padding: 5px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0;
  border: 1px solid #f3f4f6;
}

.filter-controls {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.filter-dropdown {
  position: relative;
}

.filter-btn {
  display: flex;
  align-items: center;
  gap: 9px;
  height: 50px;
  padding: 0 20px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background-color: white;
  color: #374151;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
  position: relative;
  overflow: hidden;
}

.filter-btn::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0) 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.filter-btn svg {
  color: #9ca3af;
  transition: transform 0.2s ease;
}

.filter-btn:hover {
  border-color: #d1d5db;
  background-color: #f9fafb;
}

.filter-btn:hover::after {
  opacity: 1;
}

.filter-btn:hover svg {
  transform: translateY(1px);
}

.property-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
  margin-top: 16px;
}

.property-card {
  background-color: white;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05), 0 4px 12px rgba(0, 0, 0, 0.02);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(239, 241, 245, 0.8);
  position: relative;
}

.property-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 14px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.property-card:hover {
  transform: translateY(-8px);
}

.property-card:hover::after {
  opacity: 1;
}

.property-image {
  position: relative;
  height: 220px;
  overflow: hidden;
}

.property-image::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0) 70%, rgba(0,0,0,0.05) 100%);
  pointer-events: none;
  z-index: 1;
}

.property-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s cubic-bezier(0.215, 0.61, 0.355, 1);
}

.property-card:hover .property-image img {
  transform: scale(1.07);
}

.favorite-property-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 2;
}

.favorite-property-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.favorite-property-btn svg {
  stroke: #9ca3af;
  fill: none;
  transition: all 0.2s ease;
}

.favorite-property-btn:hover svg {
  stroke: #f43f5e;
}

.property-details {
  padding: 26px;
}

.property-name {
  font-size: 18px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 8px 0;
  letter-spacing: -0.01em;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.property-location {
  font-size: 15px;
  color: #6b7280;
  margin-bottom: 16px;
  font-weight: 450;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.property-price {
  font-size: 22px;
  font-weight: 700;
  color: #0056d6;
  margin-bottom: 16px;
  letter-spacing: -0.01em;
}

/* Media queries for responsive property grid */
@media (max-width: 1024px) {
  .property-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
}

@media (max-width: 640px) {
  .property-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .listings-search-container {
    flex-direction: column;
    align-items: stretch;
  }

  .search-input-container {
    width: 100%;
  }

  .filter-controls {
    width: 100%;
    overflow-x: auto;
    padding-bottom: 8px;
    justify-content: space-between;
  }
}

.view-property-btn {
  display: block;
  width: 100%;
  padding: 14px 0;
  margin-top: 20px;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  color: #0056d6;
  font-size: 15px;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  letter-spacing: -0.01em;
  position: relative;
  overflow: hidden;
}

.view-property-btn::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center, rgba(0,86,214,0.05) 0%, rgba(0,86,214,0) 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.view-property-btn:hover {
  background-color: #f3f4f6;
  border-color: #d1d5db;
  transform: translateY(-1px);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.02);
}

.view-property-btn:hover::after {
  opacity: 1;
}

.view-property-btn:active {
  transform: translateY(1px);
}

/* Document tab styles */
.documents-tab-content {
  padding-top: 10px;
}

.documents-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 0;
  text-align: center;
}

.documents-loading-spinner {
  border: 2.5px solid rgba(0, 82, 204, 0.08);
  border-radius: 50%;
  border-top: 2.5px solid #0056d6;
  width: 32px;
  height: 32px;
  animation: spin 0.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  margin-bottom: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.03);
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 0;
  text-align: center;
  color: #6b7280;
}

.empty-state-icon {
  margin-bottom: 16px;
  color: #d1d5db;
}

.empty-state p {
  font-size: 16px;
  font-weight: 500;
  color: #6b7280;
  letter-spacing: -0.01em;
}

.documents-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.documents-header {
  margin-bottom: 24px;
}

.documents-search-container {
  position: relative;
  width: 100%;
  max-width: 400px;
}

.documents-search {
  width: 100%;
  height: 48px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 0 48px;
  font-size: 15px;
  color: #111827;
  background-color: white;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
  font-weight: 450;
}

.documents-search:focus {
  outline: none;
  border-color: #0056d6;
  box-shadow: 0 0 0 3px rgba(0, 86, 214, 0.1);
}

.search-icon {
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
}

.documents-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

.document-card {
  background-color: white;
  border-radius: 14px;
  padding: 20px;
  display: flex;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05), 0 4px 12px rgba(0, 0, 0, 0.02);
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(239, 241, 245, 0.8);
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.document-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center, rgba(0,0,0,0.01) 0%, rgba(0,0,0,0) 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.document-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.document-card:hover::after {
  opacity: 1;
}

.document-icon {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f3f4f6;
  margin-right: 16px;
  flex-shrink: 0;
  color: #0056d6;
  transition: all 0.2s ease;
}

.document-card:hover .document-icon {
  background-color: #e5e7eb;
  transform: scale(1.05);
}

.document-details {
  flex: 1;
  min-width: 0;
}

.document-name {
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 4px 0;
  letter-spacing: -0.01em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.document-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 13px;
  color: #6b7280;
}

.document-date, .document-size {
  display: flex;
  align-items: center;
  gap: 4px;
}

.document-actions {
  display: flex;
  margin-left: 16px;
  opacity: 0;
  transition: opacity 0.3s ease, transform 0.2s ease;
}

.document-card:hover .document-actions {
  opacity: 1;
}

.download-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background-color: white;
  color: #0056d6;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
  position: relative;
  overflow: hidden;
}

.download-btn::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center, rgba(0,86,214,0.05) 0%, rgba(0,86,214,0) 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.download-btn svg {
  width: 18px;
  height: 18px;
  transition: transform 0.2s ease;
}

.download-btn:hover {
  background-color: #f0f5ff;
  border-color: #cce0ff;
  transform: translateY(-2px);
  box-shadow: 0 3px 8px rgba(0, 86, 214, 0.1);
}

.download-btn:hover::after {
  opacity: 1;
}

.download-btn:hover svg {
  transform: translateY(2px);
}

.download-btn:active {
  transform: translateY(0);
}

@media (max-width: 768px) {
  .document-card {
    flex-direction: column;
    align-items: flex-start;
    padding: 16px;
  }

  .document-icon {
    margin-bottom: 12px;
    margin-right: 0;
  }

  .document-actions {
    margin-left: 0;
    margin-top: 16px;
    opacity: 1;
    width: 100%;
    justify-content: space-between;
  }

  .view-btn, .download-btn {
    flex: 1;
    justify-content: center;
  }
}

/* Additional styles for router-link tabs */
.profile-tabs-row .tab-btn {
  display: inline-block;
  text-decoration: none;
  color: #4b5563;
  font-weight: 500;
  padding: 10px 22px;
  margin-right: 12px;
  border-radius: 8px;
  transition: all 0.2s ease;
  border: 1px solid transparent;
  cursor: pointer;
  font-size: 15px;
  background-color: transparent;
  position: relative;
}

.profile-tabs-row .tab-btn:hover {
  background-color: #f9fafb;
  color: #111827;
}

.profile-tabs-row .tab-btn.active {
  color: #0056d6;
  font-weight: 600;
  border-color: #e5e7eb;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.profile-tabs-row .tab-btn.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 20%;
  width: 60%;
  height: 3px;
  background-color: #0056d6;
  border-radius: 4px 4px 0 0;
}

.favorite-btn.is-favorite {
  background-color: #fff0f3;
  border-color: #fecdd3;
  box-shadow: 0 2px 8px rgba(244, 63, 94, 0.15);
}

.favorite-btn.is-favorite svg {
  color: #f43f5e;
  fill: #f43f5e;
}

.favorite-property-btn.is-favorite {
  background-color: #fff0f3;
  box-shadow: 0 2px 8px rgba(244, 63, 94, 0.2);
  transform: scale(1.1);
}

.favorite-property-btn.is-favorite svg {
  stroke: #f43f5e;
  fill: #f43f5e;
}
</style>
