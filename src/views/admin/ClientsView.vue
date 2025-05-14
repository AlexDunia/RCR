<template>
  <div class="clients-page">
    <div class="client-finder-container">
      <div class="client-finder-header">
        <h2 class="finder-title">
          <svg class="finder-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 17L21 21" stroke="#1A4189" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="9.5" cy="9.5" r="7.5" stroke="#1A4189" stroke-width="2"/>
          </svg>
          Client Finder
        </h2>
        <p class="finder-subtitle">Search for agents across Real City database</p>
      </div>
      <div class="total-clients-display">
        <svg class="clients-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21" stroke="#2C5282" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="9" cy="7" r="4" stroke="#2C5282" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M23 21V19C22.9986 17.1771 21.765 15.5857 20 15.13" stroke="#2C5282" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M16 3.13C17.7699 3.58317 19.0078 5.17799 19.0078 7.005C19.0078 8.83201 17.7699 10.4268 16 10.88" stroke="#2C5282" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>Total Clients: <strong>{{ clientStore.clients.length }}</strong></span>
      </div>
    </div>

    <!-- Enhanced search bar -->
    <div class="search-container">
      <div class="search-bar">
        <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#9CA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <input
          type="text"
          placeholder="Search by Name, Country, State, Price range, Agent expertise, experience level..."
          v-model="searchQuery"
          @keyup.enter="searchClients"
        />
        <span class="shortcut-key">⌘ K</span>
      </div>
      <p class="search-hint">Type keywords to filter clients by name, location, or specialty</p>
    </div>

    <div class="client-results">
      <div v-if="filteredClients.length === 0" class="no-results">
        <div class="no-results-content">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 10V4C10 2.89543 10.8954 2 12 2C13.1046 2 14 2.89543 14 4V10H10Z" stroke="#A0AEC0" stroke-width="1.5"/>
            <path d="M14 14H20C21.1046 14 22 14.8954 22 16C22 17.1046 21.1046 18 20 18H14V14Z" stroke="#A0AEC0" stroke-width="1.5"/>
            <path d="M4 14H10V18H4C2.89543 18 2 17.1046 2 16C2 14.8954 2.89543 14 4 14Z" stroke="#A0AEC0" stroke-width="1.5"/>
            <path d="M12 22C13.1046 22 14 21.1046 14 20V18H10V20C10 21.1046 10.8954 22 12 22Z" stroke="#A0AEC0" stroke-width="1.5"/>
          </svg>
          <h3 class="no-results-title">No clients found</h3>
          <p class="no-results-message">We couldn't find any clients matching your search criteria.</p>
          <button class="btn-try-again" @click="searchQuery = ''">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 19L5 12L12 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Clear search
          </button>
        </div>
      </div>

      <div v-for="client in filteredClients" :key="client.id" class="client-card">
        <div class="client-info">
          <div class="avatar-container">
            <ImageWithFallback
              :src="client.profilePicture || 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739408381/Screenshot_2025-02-13_015617_mhjgby.png'"
              :alt="`${client.name}'s avatar`"
              class="client-avatar"
              :forceRefresh="true"
              fallbackSrc="/images/default-avatar.svg"
            />
            <div class="status-indicator" :class="{ 'active': client.status !== 'inactive' }"></div>
          </div>
          <div class="client-details">
            <h3 class="client-name">{{ client.name }}</h3>
            <div class="client-meta">
              <div class="location">
                <svg class="meta-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>{{ client.location || 'Not specified' }}</span>
              </div>
              <div class="specialty">
                <svg class="meta-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 15c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>{{ client.specialty || (client.interests && client.interests.length ? client.interests[0] : 'Not specified') }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="client-actions">
          <button class="btn view-profile" @click="viewClientDetails(client.id)">
            <svg class="btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="12" cy="7" r="4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            View profile
          </button>
          <button class="btn deactivate" @click="toggleClientStatus(client.id)">
            <svg class="btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            {{ client.status === 'inactive' ? 'Activate' : 'Deactivate' }}
          </button>
        </div>
      </div>

      <div v-if="isAddingClient" class="client-card add-client-form">
        <form @submit.prevent="saveNewClient">
          <h3 class="form-heading">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="form-heading-icon">
              <path d="M12 4v16m-8-8h16" stroke="#1A4189" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Add New Client
          </h3>
          <div class="form-grid">
            <div class="form-group">
              <label for="name">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="form-icon">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="#4A5568" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <circle cx="12" cy="7" r="4" stroke="#4A5568" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Full Name
              </label>
              <input type="text" id="name" v-model="newClient.name" required placeholder="John Smith">
            </div>
            <div class="form-group">
              <label for="email">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="form-icon">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#4A5568" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M22 6l-10 7L2 6" stroke="#4A5568" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Email
              </label>
              <input type="email" id="email" v-model="newClient.email" required placeholder="johnsmith@example.com">
            </div>
            <div class="form-group full-width">
              <label for="bio">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="form-icon">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0-2-.9 2-2V5c0-1.1-.9-2-2-2z" stroke="#4A5568" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M7 8.5h10M7 12h10M7 15.5h10" stroke="#4A5568" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Bio
              </label>
              <textarea id="bio" v-model="newClient.bio" rows="3" placeholder="Brief description about the client..."></textarea>
            </div>
            <div class="form-group">
              <label for="location">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="form-icon">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="#4A5568" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <circle cx="12" cy="10" r="3" stroke="#4A5568" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Location
              </label>
              <input type="text" id="location" v-model="newClient.location" placeholder="City, Country">
            </div>
            <div class="form-group">
              <label for="specialty">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="form-icon">
                  <path d="M12 15c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7z" stroke="#4A5568" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" stroke="#4A5568" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Specialty
              </label>
              <input type="text" id="specialty" v-model="newClient.specialty" placeholder="E.g. Luxury Homes, Investment Properties">
            </div>
            <div class="form-group full-width">
              <label for="profilePicture">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="form-icon">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" stroke="#4A5568" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <circle cx="8.5" cy="8.5" r="1.5" stroke="#4A5568" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M21 15l-5-5L5 21" stroke="#4A5568" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Profile Picture URL
              </label>
              <input type="text" id="profilePicture" v-model="newClient.profilePicture" placeholder="https://example.com/image.jpg">
            </div>
          </div>
          <div class="form-actions">
            <button type="button" class="btn cancel" @click="cancelAddClient">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="btn-icon">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Cancel
            </button>
            <button type="submit" class="btn save">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="btn-icon">
                <path d="M5 12l5 5L20 7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Save Client
            </button>
          </div>
        </form>
      </div>

      <button v-else class="add-client-btn" @click="isAddingClient = true">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Add New Client
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useClientStore } from '@/stores/clientStore';
import { useRouter } from 'vue-router';
import ImageWithFallback from '@/components/ImageWithFallback.vue';

// Stores
const clientStore = useClientStore();
const router = useRouter();

// State
const searchQuery = ref('');
const isAddingClient = ref(false);
const newClient = ref({
  name: '',
  email: '',
  bio: '',
  profilePicture: '',
  location: '',
  specialty: '',
  status: 'active'
});

// Computed properties
const filteredClients = computed(() => {
  console.log('Search query:', searchQuery.value); // Debug log
  console.log('All clients:', clientStore.clients); // Debug log

  if (!searchQuery.value.trim()) {
    return clientStore.clients;
  }

  const query = searchQuery.value.toLowerCase().trim();
  const filtered = clientStore.clients.filter(client => {
    const matchName = client.name?.toLowerCase().includes(query);
    const matchEmail = client.email?.toLowerCase().includes(query);
    const matchBio = client.bio?.toLowerCase().includes(query);
    const matchLocation = client.location?.toLowerCase().includes(query);
    const matchSpecialty = client.specialty?.toLowerCase().includes(query);
    const matchInterests = client.interests?.some(interest =>
      interest.toLowerCase().includes(query)
    );

    return matchName || matchEmail || matchBio || matchLocation || matchSpecialty || matchInterests;
  });

  console.log('Filtered clients:', filtered); // Debug log
  return filtered;
});

// Methods
function searchClients() {
  console.log('Searching for:', searchQuery.value);
  // The filtering is handled by the computed property
}

function viewClientDetails(clientId) {
  console.log('Viewing client details for ID:', clientId);

  // Navigate to the client profile page
  router.push(`/clients/${clientId}`);
}

function toggleClientStatus(clientId) {
  const client = clientStore.getClientById(clientId);
  if (client) {
    const newStatus = client.status === 'inactive' ? 'active' : 'inactive';
    clientStore.updateClient(clientId, { status: newStatus });
  }
}

function saveNewClient() {
  clientStore.addClient(newClient.value);

  // Reset form
  newClient.value = {
    name: '',
    email: '',
    bio: '',
    profilePicture: '',
    location: '',
    specialty: '',
    status: 'active'
  };

  isAddingClient.value = false;
}

function cancelAddClient() {
  isAddingClient.value = false;

  // Reset form
  newClient.value = {
    name: '',
    email: '',
    bio: '',
    profilePicture: '',
    location: '',
    specialty: '',
    status: 'active'
  };
}

// Lifecycle hooks
onMounted(() => {
  console.log('ClientsView mounted');
  console.log('Initial clients from store:', clientStore.clients);
  console.log('Initial search query:', searchQuery.value);

  // Add status property to clients if they don't have it
  clientStore.clients.forEach(client => {
    if (!Object.prototype.hasOwnProperty.call(client, 'status')) {
      clientStore.updateClient(client.id, { status: 'active' });
    }
  });

  // Log after initialization
  console.log('Clients after initialization:', clientStore.clients);
  console.log('Client interactions:', clientStore.clientInteractions);
});

// Watch search query for changes
watch(searchQuery, (newQuery) => {
  console.log('Search query changed:', newQuery);
  console.log('Filtered clients:', filteredClients.value);
});
</script>

<style scoped>
.clients-page {
  padding: 0 2.5rem;
  max-width: 1200px;
  margin: 0 auto 3rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  color: #2d3748;
  letter-spacing: -0.01em;
}

.client-finder-container {
  background-color: #e6f5f1;
  background-image: linear-gradient(to right, #e6f5f1, #edf7f5);
  border-radius: 1rem;
  padding: 2rem 2.5rem;
  margin-bottom: 2.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
  position: relative;
  transition: all 0.3s ease;
  border: 1px solid rgba(226, 242, 238, 0.5);
}

.client-finder-container:hover {
  box-shadow: 0 6px 12px -2px rgba(0, 0, 0, 0.08), 0 3px 6px -2px rgba(0, 0, 0, 0.05);
  transform: translateY(-2px);
}

.client-finder-header {
  margin-bottom: 0;
  max-width: 70%;
}

.finder-title {
  font-size: 1.45rem;
  font-weight: 700;
  margin: 0;
  color: #1a365d;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  letter-spacing: -0.02em;
}

.finder-icon {
  flex-shrink: 0;
}

.finder-subtitle {
  font-size: 1.05rem;
  color: #4a5568;
  margin: 0.75rem 0 0;
  font-weight: normal;
  line-height: 1.5;
}

.total-clients-display {
  position: absolute;
  top: 2rem;
  right: 2.5rem;
  font-size: 1.1rem;
  font-weight: 500;
  color: #2c5282;
  background-color: rgba(255, 255, 255, 0.6);
  padding: 0.625rem 1.25rem;
  border-radius: 0.625rem;
  backdrop-filter: blur(4px);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.8);
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.625rem;
}

.total-clients-display:hover {
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}

.clients-icon {
  flex-shrink: 0;
}

.total-clients-display strong {
  font-weight: 600;
  color: #1a4189;
}

.search-container {
  margin-bottom: 2.25rem;
}

.search-bar {
  position: relative;
  width: 100%;
}

.search-icon {
  position: absolute;
  left: 1.25rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9CA3AF;
  z-index: 1;
}

.search-bar input {
  width: 100%;
  height: 3.5rem;
  padding: 0 5.5rem 0 3.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  font-size: 1rem;
  color: #4b5563;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03);
  outline: none;
  transition: all 0.2s ease;
}

.search-bar input:focus {
  border-color: #a3bffa;
  box-shadow: 0 0 0 3px rgba(163, 191, 250, 0.3);
}

.search-bar input::placeholder {
  color: #a0aec0;
}

.search-hint {
  margin: 0.5rem 0 0 0.25rem;
  font-size: 0.85rem;
  color: #718096;
  font-style: italic;
}

.shortcut-key {
  position: absolute;
  right: 1.25rem;
  top: 50%;
  transform: translateY(-50%);
  background-color: #f7fafc;
  padding: 0.375rem 0.625rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  color: #718096;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.client-results {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.client-card {
  background-color: white;
  border-radius: 1rem;
  padding: 1.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid #f0f4f8;
  transition: all 0.25s ease-in-out;
}

.client-card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.05), 0 4px 8px rgba(0, 0, 0, 0.03);
  transform: translateY(-3px);
  border-color: #e4ebf5;
}

.no-results {
  text-align: center;
  padding: 5rem 2rem;
  color: #6b7280;
  background-color: rgba(247, 250, 252, 0.6);
  border-radius: 1rem;
  border: 1px dashed #e2e8f0;
}

.no-results-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
}

.no-results-title {
  font-size: 1.2rem;
  color: #4a5568;
  margin: 0;
  font-weight: 600;
}

.no-results-message {
  font-size: 1.125rem;
  color: #718096;
  margin: 0;
  max-width: 30rem;
  line-height: 1.5;
}

.btn-try-again {
  background-color: #ebf8ff;
  border: none;
  padding: 0.75rem 1.25rem;
  border-radius: 0.5rem;
  color: #3182ce;
  font-weight: 500;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.btn-try-again:hover {
  background-color: #bee3f8;
  color: #2b6cb0;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.client-info {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex: 1;
}

.avatar-container {
  position: relative;
}

.client-avatar {
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #f7fafc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.client-card:hover .client-avatar {
  border-color: #e2e8f0;
  transform: scale(1.05);
}

.status-indicator {
  position: absolute;
  bottom: 0.25rem;
  right: 0.25rem;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: #cbd5e0;
  border: 2px solid white;
  transition: all 0.2s ease;
}

.status-indicator.active {
  background-color: #48bb78;
}

.client-details {
  display: flex;
  flex-direction: column;
}

.client-name {
  font-size: 1.05rem;
  font-weight: 600;
  margin: 0 0 0.75rem;
  color: #1a202c;
  letter-spacing: -0.01em;
}

.client-meta {
  display: flex;
  gap: 2rem;
  font-size: 0.95rem;
  color: #718096;
  font-weight: normal;
  line-height: 1.5;
}

.location, .specialty {
  display: flex;
  align-items: center;
  gap: 0.625rem;
}

.meta-icon {
  color: #718096;
  width: 1.125rem;
  height: 1.125rem;
  flex-shrink: 0;
}

.client-actions {
  display: flex;
  gap: 1rem;
}

.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.625rem;
  padding: 0.625rem 1.25rem;
  border-radius: 0.625rem;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.25s ease;
  height: 2.75rem;
  white-space: nowrap;
}

.view-profile {
  background-color: #1a4189;
  background-image: linear-gradient(to right, #1a4189, #1e429f);
  color: white;
  border: none;
  box-shadow: 0 1px 3px rgba(26, 65, 137, 0.25);
}

.view-profile:hover {
  background-color: #153471;
  background-image: linear-gradient(to right, #153471, #1a3a8f);
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(26, 65, 137, 0.2);
}

.deactivate {
  background-color: white;
  color: #f56565;
  border: 1px solid #fed7d7;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.deactivate:hover {
  background-color: #fff5f5;
  color: #e53e3e;
  border-color: #fc8181;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transform: translateY(-2px);
}

.btn-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.add-client-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.875rem;
  padding: 1.5rem;
  border-radius: 1rem;
  border: 2px dashed #e2e8f0;
  background-color: #f7fafc;
  color: #4a5568;
  font-weight: 500;
  font-size: 1.125rem;
  cursor: pointer;
  margin-top: 1.5rem;
  transition: all 0.3s ease;
}

.add-client-btn:hover {
  border-color: #3182ce;
  color: #2b6cb0;
  background-color: #ebf8ff;
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.add-client-form {
  display: block;
  padding: 2rem;
}

.form-heading {
  margin-top: 0;
  margin-bottom: 2rem;
  font-size: 1.05rem;
  color: #2d3748;
  font-weight: 600;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 1.25rem;
  letter-spacing: -0.01em;
  display: flex;
  align-items: center;
  gap: 0.625rem;
}

.form-heading-icon {
  flex-shrink: 0;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.form-group {
  margin-bottom: 0.75rem;
}

.form-group.full-width {
  grid-column: span 2;
}

.form-group label {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.95rem;
  color: #4a5568;
  margin-bottom: 0.625rem;
  font-weight: 500;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.875rem 1.125rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.625rem;
  font-size: 1rem;
  color: #2d3748;
  background-color: #f8fafc;
  transition: all 0.2s ease;
  line-height: 1.5;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #a3bffa;
  box-shadow: 0 0 0 3px rgba(163, 191, 250, 0.3);
  background-color: white;
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: #a0aec0;
}

.form-icon {
  flex-shrink: 0;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1.25rem;
  margin-top: 2.5rem;
  border-top: 1px solid #e2e8f0;
  padding-top: 1.75rem;
}

.cancel {
  background-color: white;
  color: #718096;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.cancel:hover {
  background-color: #f7fafc;
  color: #4a5568;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transform: translateY(-1px);
}

.save {
  background-color: #1a4189;
  background-image: linear-gradient(to right, #1a4189, #1e429f);
  color: white;
  border: none;
  box-shadow: 0 1px 3px rgba(26, 65, 137, 0.25);
}

.save:hover {
  background-color: #153471;
  background-image: linear-gradient(to right, #153471, #1a3a8f);
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(26, 65, 137, 0.2);
}
</style>


