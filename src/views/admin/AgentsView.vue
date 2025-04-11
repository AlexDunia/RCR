<template>
  <div class="clients-page">
    <div class="client-finder-container">
      <div class="client-finder-header">
        <h2 class="finder-title">
          <svg class="finder-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 17L21 21" stroke="#1A4189" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="9.5" cy="9.5" r="7.5" stroke="#1A4189" stroke-width="2"/>
          </svg>
          Agent Finder
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
        <span>Total Agents: <strong>{{ agents.length }}</strong></span>
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
        />
        <span class="shortcut-key">⌘ K</span>
      </div>
      <p class="search-hint">Type keywords to filter agents by name, location, or specialty</p>
    </div>

    <div class="client-results">
      <div v-if="filteredAgents.length === 0" class="no-results">
        <div class="no-results-content">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 10V4C10 2.89543 10.8954 2 12 2C13.1046 2 14 2.89543 14 4V10H10Z" stroke="#A0AEC0" stroke-width="1.5"/>
            <path d="M14 14H20C21.1046 14 22 14.8954 22 16C22 17.1046 21.1046 18 20 18H14V14Z" stroke="#A0AEC0" stroke-width="1.5"/>
            <path d="M4 14H10V18H4C2.89543 18 2 17.1046 2 16C2 14.8954 2.89543 14 4 14Z" stroke="#A0AEC0" stroke-width="1.5"/>
            <path d="M12 22C13.1046 22 14 21.1046 14 20V18H10V20C10 21.1046 10.8954 22 12 22Z" stroke="#A0AEC0" stroke-width="1.5"/>
          </svg>
          <h3 class="no-results-title">No agents found</h3>
          <p class="no-results-message">We couldn't find any agents matching your search criteria.</p>
          <button class="btn-try-again" @click="searchQuery = ''">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 19L5 12L12 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Clear search
          </button>
        </div>
      </div>

      <div v-for="agent in filteredAgents" :key="agent.id" class="client-card">
        <div class="client-info">
          <div class="avatar-container">
            <ImageWithFallback
              :src="agent.profilePicture || agent.avatar || '/images/default-avatar.jpg'"
              :alt="`${agent.name}'s avatar`"
              class="client-avatar"
              :forceRefresh="true"
              fallbackSrc="/images/default-avatar.svg"
            />
            <div class="status-indicator" :class="{ 'active': agent.status === 'active' }"></div>
          </div>
          <div class="client-details">
            <h3 class="client-name">{{ agent.name }}</h3>
            <div class="client-meta">
              <div class="location">
                <svg class="meta-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>{{ agent.location || 'Not specified' }}</span>
              </div>
              <div class="specialty">
                <svg class="meta-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 15c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>{{ agent.specialties ? agent.specialties.join(', ') : 'Not specified' }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="client-actions">
          <button class="btn view-profile" @click="viewAgentProfile(agent.id)">
            <svg class="btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="12" cy="7" r="4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            View profile
          </button>
          <button class="btn deactivate" @click="toggleAgentStatus(agent)">
            <svg class="btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            {{ agent.status === 'active' ? 'Deactivate' : 'Activate' }}
          </button>
        </div>
      </div>

      <button class="add-client-btn" @click="addNewAgent">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Add New Agent
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAgentStore } from '@/stores/agentStore';
import ImageWithFallback from '@/components/ImageWithFallback.vue';

const router = useRouter();
const agentStore = useAgentStore();

// State
const isLoading = ref(true);
const searchQuery = ref('');
const activeFilter = ref('all');

// Computed properties
const agents = computed(() => agentStore.getAllAgents());

const filteredAgents = computed(() => {
  let filtered = agents.value;

  // Filter by status
  if (activeFilter.value !== 'all') {
    filtered = filtered.filter(agent => agent.status === activeFilter.value);
  }

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(agent =>
      agent.name.toLowerCase().includes(query) ||
      agent.email.toLowerCase().includes(query) ||
      (agent.location && agent.location.toLowerCase().includes(query))
    );
  }

  return filtered;
});

// Methods
function addNewAgent() {
  // Implement agent creation logic
  console.log('Add new agent');
}

function viewAgentProfile(agentId) {
  router.push(`/admin/agent/${agentId}`);
}

function toggleAgentStatus(agent) {
  const newStatus = agent.status === 'active' ? 'inactive' : 'active';
  agentStore.updateAgentStatus(agent.id, newStatus);
}

// Load data
onMounted(async () => {
  try {
    await agentStore.fetchAgents();
  } catch (error) {
    console.error('Error loading agents:', error);
  } finally {
    isLoading.value = false;
  }
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

.shortcut-key {
  position: absolute;
  right: 1.25rem;
  top: 50%;
  transform: translateY(-50%);
  background-color: #f7fafc;
  padding: 0.25rem 0.625rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  color: #718096;
  border: 1px solid #e2e8f0;
  pointer-events: none;
}

.search-hint {
  margin: 0.5rem 0 0 0.25rem;
  font-size: 0.85rem;
  color: #718096;
  font-style: italic;
}

.client-results {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.no-results {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 20rem;
  background-color: white;
  border-radius: 1rem;
  border: 1px solid #e2e8f0;
}

.no-results-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 3rem;
  max-width: 26rem;
}

.no-results-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2d3748;
  margin: 1.5rem 0 0.75rem;
}

.no-results-message {
  font-size: 1rem;
  color: #718096;
  margin: 0 0 2rem;
  line-height: 1.6;
}

.btn-try-again {
  display: flex;
  align-items: center;
  background-color: #e6f0fb;
  color: #3182ce;
  font-weight: 500;
  padding: 0.75rem 1.25rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  gap: 0.5rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.btn-try-again:hover {
  background-color: #bee3f8;
  color: #2b6cb0;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.client-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03);
  transition: all 0.3s ease;
  border: 1px solid #f7fafc;
}

.client-card:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(0, 0, 0, 0.05);
  transform: translateY(-2px);
  border-color: #e2e8f0;
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
</style>
