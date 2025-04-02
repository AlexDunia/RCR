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

        <div v-if="isLoadingDocuments" class="loading-state">
          <p>Loading documents...</p>
        </div>

        <div v-else-if="clientDocuments.length > 0" class="documents-list">
          <div class="table-header">
            <div class="header-cell title">Title</div>
          </div>
          <div class="document-list-container">
            <div v-for="doc in clientDocuments" :key="doc.id" class="document-card" @click="viewDocument(doc.id)">
              <div class="doc-header">
                <div class="doc-badge" :class="doc.type">{{ formatDocumentType(doc.type) }}</div>
                <div v-if="doc.agents && doc.agents.length > 0" class="doc-agent">
                  {{ doc.agents[0].name }}
                </div>
              </div>
              <div class="doc-name" :title="doc.name">{{ truncateText(doc.name || getDocumentTitle(doc), 25) }}</div>
              <div class="doc-date">{{ formatDate(doc.createdAt) }}</div>
            </div>
          </div>
        </div>

        <div v-else class="empty-state">
          <p>No documents found for this client.</p>
          <button class="add-document-btn" @click="uploadDocument">Upload New Document</button>
        </div>

        <!-- Document Viewer Modal -->
        <div v-if="showDocumentModal" class="modal-overlay" @click.self="showDocumentModal = false">
          <div class="document-modal">
            <div class="modal-header">
              <h3 class="modal-title">{{ currentDocument ? getDocumentTitle(currentDocument) : 'Document Details' }}</h3>
              <button @click="showDocumentModal = false" class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
              <div v-if="currentDocument" class="document-details">
                <div class="details-grid">
                  <template v-if="currentDocument.type === 'buyer-rep'">
                    <div class="detail-item">
                      <span class="detail-label">Buyer Name</span>
                      <span class="detail-value">{{ currentDocument.buyerName }}</span>
                    </div>
                    <div class="detail-item">
                      <span class="detail-label">Email</span>
                      <span class="detail-value">{{ currentDocument.buyerEmail }}</span>
                    </div>
                    <div class="detail-item">
                      <span class="detail-label">Phone</span>
                      <span class="detail-value">{{ currentDocument.phoneNumber }}</span>
                    </div>
                    <div class="detail-item">
                      <span class="detail-label">Property Type</span>
                      <span class="detail-value">{{ currentDocument.propertyType }}</span>
                    </div>
                    <div class="detail-item">
                      <span class="detail-label">Budget Range</span>
                      <span class="detail-value">{{ currentDocument.budgetRange }}</span>
                    </div>
                    <div class="detail-item full-width">
                      <span class="detail-label">Additional Notes</span>
                      <span class="detail-value">{{ currentDocument.additionalNotes }}</span>
                    </div>
                  </template>

                  <template v-if="currentDocument.type === 'seller-rep'">
                    <div class="detail-item">
                      <span class="detail-label">Seller Name</span>
                      <span class="detail-value">{{ currentDocument.sellerName }}</span>
                    </div>
                    <div class="detail-item">
                      <span class="detail-label">Email</span>
                      <span class="detail-value">{{ currentDocument.sellerEmail }}</span>
                    </div>
                    <div class="detail-item">
                      <span class="detail-label">Phone</span>
                      <span class="detail-value">{{ currentDocument.phoneNumber }}</span>
                    </div>
                    <div class="detail-item">
                      <span class="detail-label">Property Type</span>
                      <span class="detail-value">{{ currentDocument.propertyType }}</span>
                    </div>
                    <div class="detail-item">
                      <span class="detail-label">Property Address</span>
                      <span class="detail-value">{{ currentDocument.propertyAddress }}</span>
                    </div>
                    <div class="detail-item">
                      <span class="detail-label">Listing Price</span>
                      <span class="detail-value">{{ currentDocument.listingPrice }}</span>
                    </div>
                    <div class="detail-item full-width">
                      <span class="detail-label">Additional Notes</span>
                      <span class="detail-value">{{ currentDocument.additionalNotes }}</span>
                    </div>
                  </template>

                  <template v-if="currentDocument.type === 'mls'">
                    <div class="detail-item">
                      <span class="detail-label">Property Address</span>
                      <span class="detail-value">{{ currentDocument.propertyAddress }}</span>
                    </div>
                    <div class="detail-item">
                      <span class="detail-label">Listing Price</span>
                      <span class="detail-value">{{ currentDocument.listingPrice }}</span>
                    </div>
                    <div class="detail-item">
                      <span class="detail-label">Bedrooms</span>
                      <span class="detail-value">{{ currentDocument.bedrooms }}</span>
                    </div>
                    <div class="detail-item">
                      <span class="detail-label">Bathrooms</span>
                      <span class="detail-value">{{ currentDocument.bathrooms }}</span>
                    </div>
                    <div class="detail-item">
                      <span class="detail-label">Square Footage</span>
                      <span class="detail-value">{{ currentDocument.squareFootage }}</span>
                    </div>
                    <div class="detail-item full-width">
                      <span class="detail-label">Property Description</span>
                      <span class="detail-value">{{ currentDocument.propertyDescription }}</span>
                    </div>
                  </template>

                  <div class="detail-item">
                    <span class="detail-label">Document ID</span>
                    <span class="detail-value">{{ currentDocument.id }}</span>
                  </div>
                  <div class="detail-item">
                    <span class="detail-label">Created Date</span>
                    <span class="detail-value">{{ formatDate(currentDocument.createdAt) }}</span>
                  </div>
                </div>

                <div class="document-files">
                  <h4 class="files-title">Attached Files</h4>
                  <div v-if="currentDocument.files && currentDocument.files.length > 0" class="files-list">
                    <div v-for="file in currentDocument.files" :key="file.id" class="file-item">
                      <div class="file-info">
                        <div class="file-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd"/>
                          </svg>
                        </div>
                        <div class="file-details">
                          <span class="file-name">{{ file.name }}</span>
                          <span class="file-size">{{ formatFileSize(file.size || 0) }}</span>
                        </div>
                      </div>
                      <div class="file-actions">
                        <button @click="viewFile(file)" class="view-file-btn">View</button>
                        <button @click="downloadFile(file)" class="download-file-btn">Download</button>
                      </div>
                    </div>
                  </div>
                  <div v-else class="no-files">
                    <p>No files attached to this document</p>
                  </div>
                </div>
              </div>
              <div v-else class="loading-document">
                <p>Loading document details...</p>
              </div>
            </div>
            <div class="modal-footer">
              <button @click="editDocument" class="btn-primary">Edit Document</button>
              <button @click="showDocumentModal = false" class="btn-secondary">Close</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Connections Tab Content -->
      <div v-if="activeTab === 'connections'" class="profile-section">
        <div class="section-header">
          <h2 class="section-title">{{ client?.name || 'Alex Dunia' }}'s Connections</h2>
          <button class="edit-button" @click="showAddConnectionModal = true">Add Connection</button>
        </div>

        <div v-if="isLoadingConnections" class="loading-state">
          <p>Loading connections...</p>
        </div>

        <div v-else class="connections-wrapper">
          <div class="connections-container">
            <h3 class="connections-heading">{{ client?.name || 'Alex Dunia' }}'s Connections</h3>
            <p class="connections-subheading">See all connections {{ client?.name || 'Alex Dunia' }} has made.</p>

            <div class="connection-tabs">
              <button
                class="connection-tab-btn"
                :class="{ active: connectionDisplayType === 'agents' }"
                @click="connectionDisplayType = 'agents'"
              >
                Agents
              </button>
              <button
                class="connection-tab-btn"
                :class="{ active: connectionDisplayType === 'clients' }"
                @click="connectionDisplayType = 'clients'"
              >
                Clients
              </button>
            </div>

            <!-- Agents View -->
            <div v-if="connectionDisplayType === 'agents'">
              <div v-if="connectedAgents.length === 0" class="empty-connections">
                <p>No connected agents found.</p>
              </div>

              <div v-else class="agent-connection-list">
                <div v-for="agent in agentCards" :key="agent.id" class="agent-connection-card">
                  <div class="agent-card-avatar">
                    <img :src="agent.avatar" alt="Agent avatar" class="agent-avatar-img" />
                  </div>
                  <div class="agent-card-content">
                    <div class="agent-info">
                      <h4 class="agent-name">{{ agent.name }} <span class="agent-experience">({{ agent.experience }} of experience)</span></h4>
                      <div class="agent-details">
                        <div class="agent-location">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                            <circle cx="12" cy="10" r="3"/>
                          </svg>
                          {{ agent.location }}
                        </div>
                        <div class="agent-specialty">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M20 7h-9m0 0l3 3m-3-3l3-3M11 17H2m0 0l3 3M2 17l3-3"/>
                          </svg>
                          {{ agent.specialty }}
                        </div>
                      </div>
                    </div>
                    <div class="agent-actions">
                      <button class="view-profile-btn" @click="viewAgentProfile(agent.id)">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                          <circle cx="12" cy="12" r="3"/>
                        </svg>
                        View profile
                      </button>
                      <button class="deactivate-btn" @click="handleConnectionAction(agent.connectionId, 'reject')">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M18 6L6 18M6 6l12 12"/>
                        </svg>
                        Deactivate
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Clients View -->
            <div v-if="connectionDisplayType === 'clients'">
              <div v-if="connectedClientsList.length === 0" class="empty-connections">
                <p>No connected clients found.</p>
              </div>

              <div v-else class="agent-connection-list">
                <div v-for="clientConn in connectedClientsList" :key="clientConn.id" class="agent-connection-card">
                  <div class="agent-card-avatar">
                    <img :src="clientConn.profilePicture" alt="Client avatar" class="agent-avatar-img" />
                  </div>
                  <div class="agent-card-content">
                    <div class="agent-info">
                      <h4 class="agent-name">{{ clientConn.name }}</h4>
                      <div class="agent-details">
                        <div class="agent-location">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                            <circle cx="12" cy="10" r="3"/>
                          </svg>
                          {{ clientConn.location || 'New York, USA' }}
                        </div>
                      </div>
                    </div>
                    <div class="agent-actions">
                      <button class="view-profile-btn" @click="viewClientProfile(clientConn.id)">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                          <circle cx="12" cy="12" r="3"/>
                        </svg>
                        View profile
                      </button>
                      <button class="deactivate-btn" @click="handleConnectionAction(clientConn.connectionId, 'reject')">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M18 6L6 18M6 6l12 12"/>
                        </svg>
                        Deactivate
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Add Connection Modal -->
        <div v-if="showAddConnectionModal" class="modal-overlay" @click.self="showAddConnectionModal = false">
          <div class="connection-modal">
            <div class="modal-header">
              <h3 class="modal-title">Add Connection</h3>
              <button @click="showAddConnectionModal = false" class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
              <div class="connection-tabs">
                <button
                  @click="connectionType = 'agent'"
                  :class="{ active: connectionType === 'agent' }"
                  class="connection-tab"
                >
                  Connect with Agent
                </button>
                <button
                  @click="connectionType = 'client'"
                  :class="{ active: connectionType === 'client' }"
                  class="connection-tab"
                >
                  Connect with Client
                </button>
              </div>

              <div class="search-container">
                <input
                  type="text"
                  v-model="connectionSearchQuery"
                  :placeholder="connectionType === 'agent' ? 'Search for agents...' : 'Search for clients...'"
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
                        :src="connectionType === 'agent' ? result.avatar : result.profilePicture"
                        :alt="connectionType === 'agent' ? 'Agent avatar' : 'Client avatar'"
                        class="avatar-image"
                      />
                    </div>
                    <div class="result-details">
                      <h4 class="result-name">{{ result.name }}</h4>
                      <p class="result-meta">
                        {{ connectionType === 'agent'
                          ? (result.specialties?.join(', ') || 'No specialties listed')
                          : (result.interests?.join(', ') || 'No interests listed')
                        }}
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
import { useAgentStore } from '@/stores/agentStore';
import { useConnectionStore } from '@/stores/connectionStore';

const route = useRoute();
const router = useRouter();
const clientStore = useClientStore();
const listingStore = useListingStore();
const documentStore = useDocumentStore();
const agentStore = useAgentStore();
const connectionStore = useConnectionStore();

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
const clientDocuments = ref([]);
const isLoadingDocuments = ref(true);

// Document Viewer State
const showDocumentModal = ref(false);
const currentDocument = ref(null);

// Connections state
const isLoadingConnections = ref(false);
const showAddConnectionModal = ref(false);
const connectionSearchQuery = ref('');
const selectedTarget = ref(null);
const connectionMessage = ref('');
const connectionType = ref('agent');
const connectionDisplayType = ref('agents');

// Random agent photos
const agentPhotos = [
  'https://randomuser.me/api/portraits/men/32.jpg',
  'https://randomuser.me/api/portraits/women/44.jpg',
  'https://randomuser.me/api/portraits/men/22.jpg',
  'https://randomuser.me/api/portraits/women/68.jpg',
  'https://randomuser.me/api/portraits/men/75.jpg',
  'https://randomuser.me/api/portraits/women/91.jpg'
];

// Computed connections
const clientConnections = computed(() => {
  const userId = clientId.value;
  if (!userId) return [];
  return connectionStore.getConnectionsByUserId(userId, 'client');
});

const connectedAgents = computed(() => {
  return clientConnections.value
    .filter(conn =>
      (conn.status === 'accepted') &&
      ((conn.fromType === 'agent' && conn.toId === clientId.value) ||
       (conn.toType === 'agent' && conn.fromId === clientId.value))
    )
    .map(conn => {
      const agentId = conn.fromType === 'agent' ? conn.fromId : conn.toId;
      const agent = agentStore.getAgentById(agentId);
      return {
        connectionId: conn.id,
        id: agentId,
        agent,
        requestedAt: conn.requestedAt,
        updatedAt: conn.updatedAt
      };
    })
    .filter(conn => conn.agent); // Filter out any undefined agents
});

// Mock data for agent cards
const agentCards = computed(() => {
  if (connectedAgents.value.length === 0) {
    return [
      {
        id: 5,
        name: 'James T. Whitfield',
        experience: '5+ Yr',
        location: 'Columbia, USA',
        specialty: 'Luxury Real Estate',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        connectionId: 1
      },
      {
        id: 8,
        name: 'Sarah Johnson',
        experience: '8+ Yr',
        location: 'Miami, USA',
        specialty: 'Commercial Properties',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        connectionId: 2
      },
      {
        id: 10,
        name: 'Michael Chen',
        experience: '3+ Yr',
        location: 'Seattle, USA',
        specialty: 'Residential Homes',
        avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
        connectionId: 3
      }
    ];
  }

  // Use real data if available
  return connectedAgents.value.map((conn, index) => {
    return {
      id: conn.id,
      name: conn.agent.name,
      experience: `${Math.floor(Math.random() * 10) + 1}+ Yr`,
      location: conn.agent.location || 'Columbia, USA',
      specialty: conn.agent.specialties ? conn.agent.specialties[0] : 'Luxury Real Estate',
      avatar: agentPhotos[index % agentPhotos.length],
      connectionId: conn.connectionId
    };
  });
});

const connectedClientsList = computed(() => {
  // Use fake data for preview
  return [
    {
      id: 2,
      name: 'Emily Rodriguez',
      profilePicture: 'https://randomuser.me/api/portraits/women/68.jpg',
      location: 'New York, USA',
      connectionId: 6
    },
    {
      id: 3,
      name: 'David Williams',
      profilePicture: 'https://randomuser.me/api/portraits/men/75.jpg',
      location: 'Los Angeles, USA',
      connectionId: 7
    }
  ];
});

const filteredConnectionResults = computed(() => {
  if (!connectionSearchQuery.value.trim()) {
    // Return all available entities if no search query
    return connectionType.value === 'agent'
      ? agentStore.getAllAgents()
      : clientStore.clients.filter(c => c.id !== clientId.value); // Exclude current client
  }

  const query = connectionSearchQuery.value.toLowerCase().trim();

  if (connectionType.value === 'agent') {
    return agentStore.getAllAgents().filter(agent =>
      agent.name.toLowerCase().includes(query) ||
      agent.email.toLowerCase().includes(query) ||
      (agent.specialties && agent.specialties.some(s => s.toLowerCase().includes(query)))
    );
  } else {
    return clientStore.clients.filter(client =>
      client.id !== clientId.value && (
        client.name.toLowerCase().includes(query) ||
        client.email.toLowerCase().includes(query) ||
        (client.interests && client.interests.some(i => i.toLowerCase().includes(query)))
      )
    );
  }
});

// Connection methods
function loadClientConnections() {
  isLoadingConnections.value = true;

  // In a real app with API, there would be an async call here
  setTimeout(() => {
    isLoadingConnections.value = false;
  }, 500);
}

function viewAgentProfile(agentId) {
  router.push(`/agent/${agentId}`);
}

function viewClientProfile(clientId) {
  router.push(`/clients/${clientId}`);
}

function handleConnectionAction(connectionId, action) {
  if (action === 'accept') {
    connectionStore.acceptConnection(connectionId);
  } else if (action === 'reject') {
    connectionStore.rejectConnection(connectionId);
    // Remove from display
    alert('Connection deactivated successfully');
  }
}

function isAlreadyConnected(targetId) {
  return connectionStore.areUsersConnected(
    clientId.value,
    'client',
    targetId,
    connectionType.value
  );
}

function hasPendingRequest(targetId) {
  const connection = connectionStore.getConnectionBetweenUsers(
    clientId.value,
    'client',
    targetId,
    connectionType.value
  );

  return connection && connection.status === 'pending';
}

function selectConnectionTarget(target) {
  if (!isAlreadyConnected(target.id) && !hasPendingRequest(target.id)) {
    selectedTarget.value = target;
  }
}

function sendConnectionRequest() {
  if (!selectedTarget.value) return;

  connectionStore.requestConnection(
    clientId.value,
    'client',
    selectedTarget.value.id,
    connectionType.value,
    connectionMessage.value
  );

  // Reset state
  connectionMessage.value = '';
  selectedTarget.value = null;
  showAddConnectionModal.value = false;

  // Show success notification (in a real app)
  alert('Connection request sent successfully!');
}

// View document function
async function viewDocument(docId) {
  try {
    console.log('Viewing document:', docId);
    const document = await documentStore.fetchDocument(docId);

    if (document) {
      currentDocument.value = document;
      showDocumentModal.value = true;
    } else {
      console.error('Document not found:', docId);
      alert('Document not found');
    }
  } catch (error) {
    console.error('Error loading document:', error);
    alert('Error loading document details');
  }
}

// Edit document function
function editDocument() {
  if (currentDocument.value) {
    showDocumentModal.value = false;
    router.push(`/admin/document/${currentDocument.value.id}/edit`);
  }
}

// Upload document function
function uploadDocument() {
  console.log('Uploading document for client:', clientId.value);
  router.push(`/admin/document/new?clientId=${clientId.value}`);
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
onMounted(async () => {
  if (clientId.value) {
    clientDetails.value = clientStore.getClientFullDetails(clientId.value);
    console.log('Client details:', clientDetails.value);

    // Set active tab from URL query parameter if available
    if (route.query.tab) {
      activeTab.value = route.query.tab;
    }

    // Load documents if on documents tab
    if (activeTab.value === 'documents') {
      await loadClientDocuments();
    } else if (activeTab.value === 'connections') {
      loadClientConnections();
    } else {
      // Set loading to false
      isLoading.value = false;
    }
  }
});

// Watch for tab changes
watch(() => activeTab.value, async (newTab) => {
  if (newTab === 'documents' && clientId.value) {
    await loadClientDocuments();
  } else if (newTab === 'connections' && clientId.value) {
    loadClientConnections();
  }
});

// Watch for route query changes
watch(() => route.query.tab, (newTab) => {
  if (newTab) {
    activeTab.value = newTab;
  }
});

// Function to load client documents
async function loadClientDocuments() {
  isLoadingDocuments.value = true;
  try {
    // Fetch documents from API
    const documents = await documentStore.fetchDocumentsByClientId(clientId.value);
    clientDocuments.value = documents;
  } catch (error) {
    console.error('Error loading documents:', error);
  } finally {
    // Set loading to false after a brief delay
    setTimeout(() => {
      isLoadingDocuments.value = false;
      isLoading.value = false;
    }, 500);
  }
}

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

// Format file size helper function
function formatFileSize(bytes) {
  if (!bytes) return '0 B';
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
}

// Get document title function
function getDocumentTitle(doc) {
  if (!doc) return '';

  switch (doc.type) {
    case 'buyer-rep':
      return `${doc.buyerName}'s Buyer Rep Agreement`;
    case 'seller-rep':
      return `${doc.sellerName}'s Seller Rep Agreement`;
    case 'mls':
      return `MLS Listing - ${doc.propertyAddress}`;
    default:
      return 'Untitled Document';
  }
}

// File handling functions
function viewFile(file) {
  if (file && file.url) {
    // Open file in a new tab
    window.open(file.url, '_blank');
  } else {
    // Show error message if file URL is not available
    console.error('File URL not available');
    // Display user-friendly notification
    alert('File preview not available. The file may be processing or unavailable.');
  }
}

function downloadFile(file) {
  if (file && file.url) {
    try {
      // Create temp link and trigger download
      const link = document.createElement('a');
      link.href = file.url;
      link.download = file.name || 'document';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      console.log('Downloading file:', file.name);
    } catch (error) {
      console.error('Error downloading file:', error);
      alert('An error occurred while downloading the file. Please try again.');
    }
  } else {
    console.error('File download URL not available');
    alert('File download not available. The file may be processing or unavailable.');
  }
}

// Format document type function
function formatDocumentType(type) {
  if (!type) return '';

  switch (type) {
    case 'buyer-rep':
      return 'Buyer';
    case 'seller-rep':
      return 'Seller';
    case 'mls':
      return 'MLS';
    default:
      return type;
  }
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

/* Document Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.document-modal {
  background-color: white;
  border-radius: 0.5rem;
  width: 90%;
  max-width: 900px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.modal-close {
  background: none;
  border: none;
  color: #6b7280;
  font-size: 1.5rem;
  cursor: pointer;
  line-height: 1;
}

.modal-body {
  padding: 1.5rem;
  overflow-y: auto;
  flex: 1;
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.detail-item.full-width {
  grid-column: 1 / -1;
}

.detail-label {
  font-size: 0.875rem;
  color: #6b7280;
}

.detail-value {
  font-size: 1rem;
  color: #111827;
  font-weight: 500;
}

.document-files {
  margin-top: 2rem;
  border-top: 1px solid #e5e7eb;
  padding-top: 1.5rem;
}

.files-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 1rem 0;
}

.files-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.file-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
}

.file-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.file-icon {
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e5e7eb;
  border-radius: 0.25rem;
  color: #6b7280;
}

.file-icon svg {
  width: 1.25rem;
  height: 1.25rem;
}

.file-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.file-name {
  font-weight: 500;
  color: #111827;
}

.file-size {
  font-size: 0.75rem;
  color: #6b7280;
}

.file-actions {
  display: flex;
  gap: 0.5rem;
}

.view-file-btn,
.download-file-btn {
  padding: 0.5rem 0.75rem;
  font-size: 0.75rem;
  border-radius: 0.25rem;
  font-weight: 500;
  cursor: pointer;
}

.view-file-btn {
  background-color: #eff6ff;
  color: #1e40af;
  border: 1px solid #bfdbfe;
}

.download-file-btn {
  background-color: #f9fafb;
  color: #4b5563;
  border: 1px solid #e5e7eb;
}

.no-files {
  padding: 2rem;
  text-align: center;
  background-color: #f9fafb;
  border-radius: 0.375rem;
  color: #6b7280;
  border: 1px dashed #e5e7eb;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  border-top: 1px solid #e5e7eb;
  background-color: #f9fafb;
}

.btn-primary {
  background-color: #1a4189;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
}

.btn-secondary {
  background-color: white;
  color: #6b7280;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  border: 1px solid #e5e7eb;
  cursor: pointer;
}

.loading-document {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  color: #6b7280;
}

.connections-wrapper {
  display: flex;
  flex-direction: column;
  background-color: #edf7f0;
  border-radius: 12px;
  padding: 24px;
}

.connections-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.connections-heading {
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.25rem;
}

.connections-subheading {
  font-size: 0.875rem;
  color: #4b5563;
  margin-bottom: 1.5rem;
}

.connection-tabs {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.connection-tab-btn {
  padding: 0.5rem 1.5rem;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s;
}

.connection-tab-btn.active {
  background-color: #1a4189;
  color: white;
  border-color: #1a4189;
}

.empty-connections {
  padding: 2rem;
  text-align: center;
  background-color: #f9fafb;
  border-radius: 0.5rem;
  border: 1px dashed #e5e7eb;
  color: #6b7280;
}

.agent-connection-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.agent-connection-card {
  display: flex;
  flex-direction: row;
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.agent-connection-card:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.agent-card-avatar {
  width: 120px;
  height: 120px;
  flex-shrink: 0;
}

.agent-avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.agent-card-content {
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
}

.agent-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.agent-name {
  font-weight: 600;
  margin: 0 0 0.5rem;
  font-size: 1rem;
  color: #111827;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.agent-experience {
  font-size: 0.85rem;
  color: #6b7280;
  font-weight: normal;
}

.agent-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.agent-location, .agent-specialty {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #4b5563;
}

.agent-location svg, .agent-specialty svg {
  width: 16px;
  height: 16px;
  color: #6b7280;
}

.agent-actions {
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  margin-top: auto;
}

.view-profile-btn, .deactivate-btn {
  flex: 1;
  padding: 0.5rem;
  font-size: 0.875rem;
  border-radius: 0.375rem;
  border: 1px solid #e5e7eb;
  background-color: #f9fafb;
  color: #374151;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  transition: background-color 0.2s;
}

.view-profile-btn {
  background-color: #f1f5f9;
  color: #1a4189;
}

.deactivate-btn {
  background-color: #f9fafb;
  color: #ef4444;
}

.view-profile-btn:hover, .deactivate-btn:hover {
  background-color: #e5e7eb;
}

.connection-modal {
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 10px 15px rgba(0, 0, 0, 0.1);
}

.connection-tabs {
  display: flex;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 1rem;
}

.connection-tab {
  flex: 1;
  padding: 0.75rem 1rem;
  text-align: center;
  background: none;
  border: none;
  color: #6b7280;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.connection-tab.active {
  color: #1a4189;
  border-bottom: 2px solid #1a4189;
}

.search-container {
  margin-bottom: 1rem;
}

.search-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  font-size: 0.95rem;
}

.connection-results {
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
}

.result-list {
  padding: 0.5rem;
}

.result-item {
  display: flex;
  align-items: center;
  padding: 0.75rem;
  border-bottom: 1px solid #f3f4f6;
  cursor: pointer;
  transition: all 0.2s;
}

.result-item:last-child {
  border-bottom: none;
}

.result-item:hover {
  background-color: #f9fafb;
}

.result-item.already-connected {
  background-color: #f3f4f6;
  opacity: 0.7;
  cursor: not-allowed;
}

.result-avatar {
  width: 40px;
  height: 40px;
  margin-right: 1rem;
}

.result-details {
  flex-grow: 1;
}

.result-name {
  font-weight: 600;
  margin: 0 0 0.25rem;
  font-size: 0.95rem;
}

.result-meta {
  font-size: 0.8rem;
  color: #6b7280;
  margin: 0;
}

.result-status {
  margin-left: 1rem;
  flex-shrink: 0;
}

.status-tag {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  border-radius: 1rem;
  background-color: #f3f4f6;
  color: #6b7280;
}

.status-tag.connected {
  background-color: #ecfdf5;
  color: #047857;
}

.status-tag.pending {
  background-color: #fffbeb;
  color: #b45309;
}

.connection-form {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
}

.form-title {
  font-size: 0.95rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.connection-message-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  font-size: 0.95rem;
  min-height: 100px;
  resize: vertical;
}

.empty-results {
  padding: 2rem;
  text-align: center;
  color: #6b7280;
  font-size: 0.95rem;
}
</style>
