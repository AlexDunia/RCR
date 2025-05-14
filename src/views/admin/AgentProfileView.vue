<template>
  <div class="agent-profile-page">
    <!-- Profile header info is moved to the main app header via slots, so we don't need the original header section here -->

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
          <h2 class="section-title">{{ agent.name }} personal Information</h2>
          <div class="header-actions">
            <button class="edit-button">Edit profile as admin</button>
          </div>
        </div>

        <div class="info-container">
          <div class="info-grid">
            <div class="info-item">
              <div class="info-label">Full name</div>
              <div class="info-value">{{ agent.name }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Email</div>
              <div class="info-value">{{ agent.email }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Phone number</div>
              <div class="info-value">{{ agent.phone }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Alternate phone number</div>
              <div class="info-value">{{ agent.alternatePhone || 'Not provided' }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Agency/Company name</div>
              <div class="info-value">{{ agent.companyName || 'Real Estate Agency' }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Agency/Company description</div>
              <div class="info-value">{{ agent.bio || 'No description available' }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Specialties</div>
              <div class="info-value">{{ agent.specialties ? agent.specialties.join(', ') : 'Not specified' }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">License Number</div>
              <div class="info-value">{{ agent.licenseNumber || 'Not provided' }}</div>
            </div>
          </div>

          <div class="profile-photo-container">
            <img :src="agent.avatar || '/images/default-avatar.jpg'" alt="Large profile photo" class="profile-photo" />
          </div>
        </div>
      </div>

      <!-- Listings Tab Content -->
      <div v-if="activeTab === 'listings'" class="profile-section">
        <div class="search-filter-bar">
          <div class="search-container">
            <input
              type="text"
              placeholder="Search..."
              class="search-input"
              v-model="searchQuery"
              @input="handleSearchInput"
            />
            <span class="search-shortcut">⌘ K</span>
          </div>
          <div class="filter-dropdowns">
            <div class="filter-dropdown">
              <button class="dropdown-btn">
                Price Range ($) <span class="dropdown-arrow">▾</span>
              </button>
            </div>
            <div class="filter-dropdown">
              <button class="dropdown-btn">
                Bedrooms <span class="dropdown-arrow">▾</span>
              </button>
            </div>
            <div class="filter-dropdown">
              <button class="dropdown-btn">
                Property type <span class="dropdown-arrow">▾</span>
              </button>
            </div>
            <div class="filter-dropdown">
              <button class="dropdown-btn">
                Location <span class="dropdown-arrow">▾</span>
              </button>
            </div>
          </div>
        </div>

        <div class="property-grid">
          <div v-for="n in 3" :key="n" class="property-card">
            <div class="property-image-container">
              <img src="https://res.cloudinary.com/dnuhjsckk/image/upload/v1718259997/house1_eogyom.jpg" alt="Property" class="property-image" />
            </div>
            <div class="property-content">
              <h3 class="property-title">Cedar Grove Estates</h3>
              <p class="property-location">Austin, Texas</p>
              <p class="property-price">$25,000</p>
              <button class="view-property-btn">View property</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Documents Tab Content -->
      <div v-if="activeTab === 'documents'" class="profile-section">
        <div class="section-header">
          <h2 class="section-title">{{ agent.name }}'s Documents</h2>
          <div class="header-actions">
            <button class="edit-button" @click="uploadDocument">Upload Document</button>
          </div>
        </div>
        <div v-if="isLoadingDocuments" class="loading-state">
          <p>Loading documents...</p>
        </div>
        <div v-else-if="agentDocuments.length > 0" class="documents-list">
          <div class="table-header">
            <div class="header-cell title">Title</div>
          </div>
          <div class="document-list-container">
            <div v-for="doc in agentDocuments" :key="doc.id" class="document-card" @click="viewDocument(doc.id)">
              <div class="doc-header">
                <div class="doc-badge" :class="doc.type">{{ formatDocumentType(doc.type || 'default') }}</div>
              </div>
              <div class="doc-name" :title="doc.name">{{ truncateText(doc.name || 'Document', 25) }}</div>
              <div class="doc-date">{{ formatDate(doc.createdAt) }}</div>
            </div>
          </div>
        </div>
        <div v-else class="empty-state">
          <p>No documents found for this agent.</p>
          <button class="add-document-btn" @click="uploadDocument">Upload New Document</button>
        </div>
      </div>

      <!-- Connections Tab Content -->
      <div v-if="activeTab === 'connections'" class="profile-section">
        <div class="section-header">
          <h2 class="section-title">{{ agent.name }}'s Connections</h2>
          <div class="header-actions">
            <button class="edit-button" @click="showAddConnectionModal = true">Add Connection</button>
          </div>
        </div>
        <div v-if="isLoadingConnections" class="loading-state">
          <p>Loading connections...</p>
        </div>
        <div v-else class="connections-wrapper">
          <div class="connections-container">
            <h3 class="connections-heading">{{ agent.name }}'s Connections</h3>
            <p class="connections-subheading">See all connections {{ agent.name }} has made.</p>

            <div class="connection-tabs">
              <button
                class="connection-tab-btn"
                :class="{ active: connectionDisplayType === 'clients' }"
                @click="connectionDisplayType = 'clients'"
              >
                Clients
              </button>
              <button
                class="connection-tab-btn"
                :class="{ active: connectionDisplayType === 'agents' }"
                @click="connectionDisplayType = 'agents'"
              >
                Agents
              </button>
            </div>

            <!-- Clients View -->
            <div v-if="connectionDisplayType === 'clients'">
              <div v-if="connectedClients.length === 0" class="empty-connections">
                <p>No connected clients found.</p>
              </div>
              <div v-else class="agent-connection-list">
                <div v-for="client in connectedClientsList" :key="client.id" class="agent-connection-card">
                  <div class="agent-card-avatar">
                    <img :src="client.profilePicture" alt="Client avatar" class="agent-avatar-img" />
                  </div>
                  <div class="agent-card-content">
                    <div class="agent-info">
                      <h4 class="agent-name">{{ client.name }}</h4>
                      <div class="agent-details">
                        <div class="agent-location">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                            <circle cx="12" cy="10" r="3"/>
                          </svg>
                          {{ client.location || 'Not specified' }}
                        </div>
                      </div>
                    </div>
                    <div class="agent-actions">
                      <button class="view-profile-btn" @click="viewClientProfile(client.id)">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                          <circle cx="12" cy="12" r="3"/>
                        </svg>
                        View profile
                      </button>
                      <button class="deactivate-btn" @click="handleConnectionAction(client.connectionId, 'reject')">
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

            <!-- Agents View -->
            <div v-if="connectionDisplayType === 'agents'">
              <div v-if="connectedAgents.length === 0" class="empty-connections">
                <p>No connected agents found.</p>
              </div>
              <div v-else class="agent-connection-list">
                <div v-for="otherAgent in connectedAgents" :key="otherAgent.id" class="agent-connection-card">
                  <div class="agent-card-avatar">
                    <img :src="otherAgent.avatar" alt="Agent avatar" class="agent-avatar-img" />
                  </div>
                  <div class="agent-card-content">
                    <div class="agent-info">
                      <h4 class="agent-name">{{ otherAgent.name }}</h4>
                      <div class="agent-details">
                        <div class="agent-location">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                            <circle cx="12" cy="10" r="3"/>
                          </svg>
                          {{ otherAgent.location || 'Not specified' }}
                        </div>
                        <div class="agent-specialty">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M20 7h-9m0 0l3 3m-3-3l3-3M11 17H2m0 0l3 3M2 17l3-3"/>
                          </svg>
                          {{ otherAgent.specialty || 'Not specified' }}
                        </div>
                      </div>
                    </div>
                    <div class="agent-actions">
                      <button class="view-profile-btn" @click="viewAgentProfile(otherAgent.id)">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                          <circle cx="12" cy="12" r="3"/>
                        </svg>
                        View profile
                      </button>
                      <button class="deactivate-btn" @click="handleConnectionAction(otherAgent.connectionId, 'reject')">
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
      </div>

      <!-- Tours Tab Content -->
      <div v-if="activeTab === 'tours'" class="profile-section">
        <div class="section-header">
          <h2 class="section-title">{{ agent.name }}'s Property Tours</h2>
          <div class="header-actions">
            <button class="edit-button" @click="scheduleTour">Schedule Tour</button>
          </div>
        </div>
        <div v-if="isLoadingTours" class="loading-state">
          <p>Loading tours...</p>
        </div>
        <div v-else-if="agentTours.length > 0" class="tours-list">
          <div v-for="tour in agentTours" :key="tour.id" class="tour-card">
            <div class="tour-date">{{ formatDate(tour.date) }}</div>
            <div class="tour-details">
              <h3 class="tour-property">{{ tour.propertyName || 'Property Tour' }}</h3>
              <p class="tour-address">{{ tour.propertyAddress || 'Address not specified' }}</p>
              <div class="tour-time">{{ formatTourTime(tour.startTime, tour.endTime) }}</div>
            </div>
            <div class="tour-actions">
              <button class="view-details-btn">View Details</button>
            </div>
          </div>
        </div>
        <div v-else class="empty-state">
          <p>No property tours scheduled for this agent.</p>
          <button class="schedule-tour-btn" @click="scheduleTour">Schedule Tour</button>
        </div>
      </div>

      <!-- Tasks Tab Content -->
      <div v-if="activeTab === 'tasks'" class="profile-section">
        <div class="section-header">
          <h2 class="section-title">{{ agent.name }}'s Tasks</h2>
          <div class="header-actions">
            <button class="edit-button" @click="createTaskForAgent">Create Task</button>
          </div>
        </div>
        <div v-if="isLoadingTasks" class="loading-state">
          <p>Loading tasks...</p>
        </div>
        <div v-else-if="agentTasks.length > 0" class="tasks-list">
          <div v-for="task in agentTasks" :key="task.id" class="task-card">
            <div class="task-status" :class="task.status">{{ capitalizeFirstLetter(task.status) }}</div>
            <div class="task-details">
              <h3 class="task-title">{{ task.title }}</h3>
              <p class="task-description">{{ task.description }}</p>
              <div class="task-date">Due: {{ formatDate(task.dueDate) }}</div>
            </div>
            <div class="task-actions">
              <button class="view-task-btn" @click="viewTaskDetails(task.id)">View Details</button>
            </div>
          </div>
        </div>
        <div v-else class="empty-state">
          <p>No tasks assigned to this agent.</p>
          <button class="create-task-btn" @click="createTaskForAgent">Create Task</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, provide, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAgentStore } from '@/stores/agentStore';
import { useConnectionStore } from '@/stores/connectionStore';
import { useClientStore } from '@/stores/clientStore';

// Define the tabs
const tabs = ['bio', 'listings', 'documents', 'connections', 'tours', 'tasks'];
const activeTab = ref('bio');

// Setup route and agent store
const route = useRoute();
const router = useRouter();
const agentStore = useAgentStore();
const connectionStore = useConnectionStore();
const clientStore = useClientStore();

// Get agent data from store based on route parameter
const agentId = computed(() => parseInt(route.params.id));
const agent = computed(() => agentStore.getAgentById(agentId.value) || {
  id: agentId.value,
  name: 'Agent Not Found',
  title: 'No Data Available',
  email: '',
  phone: '',
  avatar: '/images/default-avatar.jpg'
});

// Expose agent data to parent components (for header)
provide('profileData', {
  name: computed(() => agent.value.name),
  avatar: computed(() => agent.value.avatar),
  title: computed(() => agent.value.title || 'Real Estate Agent')
});

// Handle tab change
const navigateTo = (tab) => {
  activeTab.value = tab;

  // Load data based on active tab
  if (tab === 'documents' && !agentDocuments.value.length) {
    loadDocuments();
  } else if (tab === 'connections' && (!connectedClients.value.length && !connectedAgents.value.length)) {
    loadConnections();
  } else if (tab === 'tours' && !agentTours.value.length) {
    loadTours();
  } else if (tab === 'tasks' && !agentTasks.value.length) {
    loadTasks();
  }
};

// Update tab from route query parameter on mount
onMounted(() => {
  if (route.query.tab && tabs.includes(route.query.tab)) {
    activeTab.value = route.query.tab;
  }

  // Log agent info
  console.log('Loading agent data for ID:', route.params.id);
  console.log('Agent data:', agent.value);

  // Load initial data for the active tab
  loadInitialData();
});

// Load initial data based on active tab
const loadInitialData = () => {
  if (activeTab.value === 'documents') {
    loadDocuments();
  } else if (activeTab.value === 'connections') {
    loadConnections();
  } else if (activeTab.value === 'tours') {
    loadTours();
  } else if (activeTab.value === 'tasks') {
    loadTasks();
  }
};

// Search query for filtering listings (used in template)
const searchQuery = ref('');

// Add search functionality
const handleSearchInput = () => {
  // Implement search functionality for listings
  console.log('Searching for:', searchQuery.value);
  // In a real implementation, this would filter the listings
};

// DOCUMENTS TAB FUNCTIONALITY
const isLoadingDocuments = ref(false);
const agentDocuments = ref([]);

const loadDocuments = async () => {
  isLoadingDocuments.value = true;

  try {
    // Simulate API call with timeout
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock data for demonstration
    agentDocuments.value = [
      {
        id: 1,
        name: 'Agent License',
        type: 'license',
        createdAt: new Date(2023, 5, 15)
      },
      {
        id: 2,
        name: 'Agent Agreement',
        type: 'agreement',
        createdAt: new Date(2023, 8, 22)
      },
      {
        id: 3,
        name: 'Property Listing Agreement',
        type: 'listing',
        createdAt: new Date(2023, 11, 4)
      }
    ];
  } catch (error) {
    console.error('Error loading documents:', error);
  } finally {
    isLoadingDocuments.value = false;
  }
};

const uploadDocument = () => {
  // Mock document upload
  console.log('Uploading document for agent:', agentId.value);
  // In a real implementation, this would open a file upload dialog
  alert('Document upload functionality would be implemented here.');
};

const viewDocument = (id) => {
  console.log('Viewing document:', id);
  // In a real implementation, this would open the document or redirect to a document view
  alert(`Viewing document ${id}`);
};

const formatDocumentType = (type) => {
  const types = {
    license: 'License',
    agreement: 'Agreement',
    listing: 'Listing',
    default: 'Document'
  };

  return types[type] || types.default;
};

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

// CONNECTIONS TAB FUNCTIONALITY
const isLoadingConnections = ref(false);
const connectedClients = ref([]);
const connectedClientsList = computed(() => connectedClients.value);
const connectedAgents = ref([]);
const connectionDisplayType = ref('clients');
const showAddConnectionModal = ref(false);

const loadConnections = async () => {
  isLoadingConnections.value = true;

  try {
    // Simulate API call with timeout
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock data for demonstration
    connectedClients.value = [
      {
        id: 1,
        name: 'John Doe',
        location: 'Dallas, TX',
        profilePicture: 'https://i.pravatar.cc/150?img=1',
        connectionId: 101
      },
      {
        id: 2,
        name: 'Jane Smith',
        location: 'Austin, TX',
        profilePicture: 'https://i.pravatar.cc/150?img=5',
        connectionId: 102
      }
    ];

    connectedAgents.value = [
      {
        id: 3,
        name: 'David Johnson',
        location: 'Houston, TX',
        specialty: 'Luxury Homes',
        avatar: 'https://i.pravatar.cc/150?img=3',
        connectionId: 103
      }
    ];
  } catch (error) {
    console.error('Error loading connections:', error);
  } finally {
    isLoadingConnections.value = false;
  }
};

const handleConnectionAction = (connectionId, action) => {
  console.log(`${action} connection:`, connectionId);

  if (action === 'reject') {
    // Mock deactivation by removing from the list
    connectedClients.value = connectedClients.value.filter(c => c.connectionId !== connectionId);
    connectedAgents.value = connectedAgents.value.filter(a => a.connectionId !== connectionId);
    alert(`Connection ${connectionId} deactivated.`);
  }
};

const viewClientProfile = (id) => {
  console.log('Viewing client profile:', id);
  router.push(`/admin/client/${id}`);
};

const viewAgentProfile = (id) => {
  console.log('Viewing agent profile:', id);
  router.push(`/admin/agent/${id}`);
};

// TOURS TAB FUNCTIONALITY
const isLoadingTours = ref(false);
const agentTours = ref([]);

const loadTours = async () => {
  isLoadingTours.value = true;

  try {
    // Simulate API call with timeout
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock data for demonstration
    agentTours.value = [
      {
        id: 1,
        propertyName: 'Cedar Grove Estates',
        propertyAddress: '123 Main St, Austin, TX',
        date: new Date(2023, 11, 15),
        startTime: '10:00 AM',
        endTime: '11:30 AM'
      },
      {
        id: 2,
        propertyName: 'Lakeside Manor',
        propertyAddress: '456 Lake Dr, Dallas, TX',
        date: new Date(2023, 11, 18),
        startTime: '2:00 PM',
        endTime: '3:30 PM'
      }
    ];
  } catch (error) {
    console.error('Error loading tours:', error);
  } finally {
    isLoadingTours.value = false;
  }
};

const scheduleTour = () => {
  console.log('Scheduling tour for agent:', agentId.value);

  // Get the agent's connected clients
  const connectedClients = connectionStore.getAcceptedConnectionsByUserId(agentId.value, 'agent')
    .filter(conn => conn.toType === 'client' || conn.fromType === 'client')
    .map(conn => {
      const clientId = conn.fromType === 'client' ? conn.fromId : conn.toId;
      return clientStore.getClientById(clientId);
    })
    .filter(Boolean);

  if (connectedClients.length === 0) {
    alert('This agent does not have any connected clients. Please establish connections first before scheduling tours.');
    return;
  }

  // Continue with tour scheduling logic for connected clients
  alert(`You can schedule tours for ${connectedClients.length} connected clients with this agent.`);
};

const formatTourTime = (start, end) => {
  return `${start} - ${end}`;
};

// TASKS TAB FUNCTIONALITY
const isLoadingTasks = ref(false);
const agentTasks = ref([]);

const loadTasks = async () => {
  isLoadingTasks.value = true;

  try {
    // Simulate API call with timeout
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock data for demonstration
    agentTasks.value = [
      {
        id: 1,
        title: 'Update property listing',
        description: 'Update the photos and description for property #1234',
        dueDate: new Date(2023, 11, 20),
        status: 'pending'
      },
      {
        id: 2,
        title: 'Contact client',
        description: 'Call John Doe about property viewing',
        dueDate: new Date(2023, 11, 15),
        status: 'in-progress'
      },
      {
        id: 3,
        title: 'Prepare contract',
        description: 'Prepare contract for Smith family purchase',
        dueDate: new Date(2023, 11, 30),
        status: 'completed'
      }
    ];
  } catch (error) {
    console.error('Error loading tasks:', error);
  } finally {
    isLoadingTasks.value = false;
  }
};

const createTaskForAgent = () => {
  console.log('Creating task for agent:', agentId.value);
  alert('Task creation functionality would be implemented here.');
};

const viewTaskDetails = (id) => {
  console.log('Viewing task details:', id);
  alert(`Viewing task ${id} details`);
};

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Helper function for date formatting
const formatDate = (date) => {
  if (!date) return 'N/A';

  if (typeof date === 'string') {
    date = new Date(date);
  }

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
};
</script>

<style scoped>
.agent-profile-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f9fafb;
}

.nav-container {
  margin-bottom: 2rem;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.tab-buttons {
  display: flex;
  gap: 1rem;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #f3f4f6;
}

.tab-button {
  background: none;
  border: none;
  padding: 0.75rem 1.25rem;
  font-size: 1rem;
  font-weight: 500;
  color: #6b7280;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.tab-button:hover {
  background-color: #f3f4f6;
  color: #1a4189;
}

.tab-button.active {
  background-color: #eef2ff;
  color: #1a4189;
  font-weight: 600;
}

.profile-section {
  background-color: white;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #f3f4f6;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a4189;
  margin: 0;
}

.edit-button {
  background-color: #1a4189;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.edit-button:hover {
  background-color: #0f2e61;
}

/* Improved info container layout */
.info-container {
  display: flex;
  gap: 3rem;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  flex: 1;
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
  flex: 0 0 300px;
}

.profile-photo {
  width: 100%;
  height: auto;
  border-radius: 10px;
  object-fit: cover;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Improved property grid styling */
.property-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.property-card {
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;
}

.property-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.property-image-container {
  height: 200px;
  overflow: hidden;
}

.property-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.property-card:hover .property-image {
  transform: scale(1.05);
}

.property-content {
  padding: 1.5rem;
}

.property-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a4189;
  margin: 0 0 0.5rem 0;
}

.property-location {
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.property-price {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1a4189;
  margin-bottom: 1.25rem;
}

.view-property-btn {
  width: 100%;
  background-color: #1a4189;
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.view-property-btn:hover {
  background-color: #0f2e61;
}

/* Improved search and filter styles */
.search-filter-bar {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.search-container {
  position: relative;
  flex: 1;
  min-width: 200px;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 0.875rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.search-input:focus {
  border-color: #1a4189;
  box-shadow: 0 0 0 3px rgba(26, 65, 137, 0.1);
  outline: none;
}

.search-shortcut {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background-color: #f3f4f6;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  color: #6b7280;
}

.filter-dropdowns {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.filter-dropdown {
  min-width: 150px;
}

.dropdown-btn {
  width: 100%;
  background-color: white;
  border: 1px solid #e5e7eb;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: border-color 0.2s;
}

.dropdown-btn:hover {
  border-color: #1a4189;
}

.dropdown-arrow {
  color: #6b7280;
}

/* Document and connection styles */
.documents-list, .connections-wrapper {
  margin-top: 1.5rem;
}

.document-list-container, .agent-connection-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.document-card, .agent-connection-card {
  background-color: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
}

.document-card:hover, .agent-connection-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.empty-state {
  text-align: center;
  padding: 3rem 0;
  color: #6b7280;
}

.add-document-btn {
  background-color: #1a4189;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 1rem;
}

.connection-tabs {
  display: flex;
  gap: 1rem;
  margin: 1.5rem 0;
}

.connection-tab-btn {
  background: none;
  border: none;
  padding: 0.5rem 1rem;
  color: #6b7280;
  font-weight: 500;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
}

.connection-tab-btn.active {
  color: #1a4189;
  border-bottom-color: #1a4189;
}
</style>
