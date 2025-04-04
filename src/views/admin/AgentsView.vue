<template>
  <div class="agents-page">
    <div class="page-header">
      <div class="header-content">
        <h1>Agents</h1>
        <div class="stats">
          <div class="stat-item">
            <span class="stat-label">Total Agents</span>
            <span class="stat-value">{{ totalAgents }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Active Agents</span>
            <span class="stat-value">{{ activeAgents }}</span>
          </div>
        </div>
      </div>
      <div class="header-actions">
        <div class="search-box">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search agents by name, email, or location"
            class="search-input"
          />
        </div>
        <button class="add-agent-btn" @click="addNewAgent">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add Agent
        </button>
      </div>
    </div>

    <div class="agents-container">
      <div class="filter-section">
        <button
          class="filter-btn"
          :class="{ active: activeFilter === 'all' }"
          @click="filterAgents('all')"
        >All Agents</button>
        <button
          class="filter-btn"
          :class="{ active: activeFilter === 'active' }"
          @click="filterAgents('active')"
        >Active</button>
        <button
          class="filter-btn"
          :class="{ active: activeFilter === 'inactive' }"
          @click="filterAgents('inactive')"
        >Inactive</button>
      </div>

      <div v-if="isLoading" class="loading-state">
        <p>Loading agents...</p>
      </div>

      <div v-else-if="filteredAgents.length === 0" class="empty-state">
        <p>No agents found.</p>
      </div>

      <div v-else class="agents-grid">
        <div v-for="agent in filteredAgents" :key="agent.id" class="agent-card">
          <div class="agent-header">
            <img :src="agent.profilePicture" :alt="agent.name" class="agent-avatar" />
            <div class="agent-status" :class="agent.status">
              {{ agent.status }}
            </div>
          </div>

          <div class="agent-info">
            <h3 class="agent-name">{{ agent.name }}</h3>
            <div class="agent-details">
              <div class="detail-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span>{{ agent.location }}</span>
              </div>
              <div class="detail-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                <span>{{ agent.experience }}</span>
              </div>
              <div class="detail-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
                </svg>
                <span>{{ agent.specialties.join(', ') }}</span>
              </div>
            </div>
          </div>

          <div class="agent-stats">
            <div class="stat">
              <span class="stat-number">{{ agent.activeListings }}</span>
              <span class="stat-label">Active Listings</span>
            </div>
            <div class="stat">
              <span class="stat-number">{{ agent.totalSales }}</span>
              <span class="stat-label">Total Sales</span>
            </div>
          </div>

          <div class="agent-actions">
            <button class="action-btn view" @click="viewAgentProfile(agent.id)">
              View Profile
            </button>
            <button
              class="action-btn toggle-status"
              :class="agent.status"
              @click="toggleAgentStatus(agent)"
            >
              {{ agent.status === 'active' ? 'Deactivate' : 'Activate' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAgentStore } from '@/stores/agentStore';

const router = useRouter();
const agentStore = useAgentStore();

// State
const isLoading = ref(true);
const searchQuery = ref('');
const activeFilter = ref('all');

// Computed properties
const agents = computed(() => agentStore.getAllAgents());

const totalAgents = computed(() => agents.value.length);
const activeAgents = computed(() => agents.value.filter(agent => agent.status === 'active').length);

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
      agent.location.toLowerCase().includes(query)
    );
  }

  return filtered;
});

// Methods
function filterAgents(filter) {
  activeFilter.value = filter;
}

function addNewAgent() {
  // Implement agent creation logic
  console.log('Add new agent');
}

function viewAgentProfile(agentId) {
  router.push(`/agent/${agentId}`);
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
.agents-page {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 2rem;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.header-content h1 {
  font-size: 2rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.stats {
  display: flex;
  gap: 2rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.stat-label {
  font-size: 0.875rem;
  color: #6b7280;
}

.stat-value {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
}

.header-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.search-box {
  flex: 1;
  max-width: 400px;
}

.search-input {
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  font-size: 0.875rem;
}

.add-agent-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #1a4189;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  cursor: pointer;
}

.filter-section {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.filter-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  background: white;
  color: #6b7280;
  cursor: pointer;
  font-size: 0.875rem;
}

.filter-btn.active {
  background: #1a4189;
  color: white;
  border-color: #1a4189;
}

.loading-state {
  text-align: center;
  padding: 2rem;
  color: #6b7280;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  background: #f9fafb;
  border-radius: 0.5rem;
  color: #6b7280;
}

.agents-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
}

.agent-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1.5rem;
}

.agent-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.agent-avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
}

.agent-status {
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: capitalize;
}

.agent-status.active {
  background: #dcfce7;
  color: #166534;
}

.agent-status.inactive {
  background: #fee2e2;
  color: #991b1b;
}

.agent-info {
  margin-bottom: 1.5rem;
}

.agent-name {
  font-size: 1.125rem;
  font-weight: 500;
  color: #111827;
  margin: 0 0 0.5rem;
}

.agent-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #6b7280;
}

.agent-stats {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem 0;
  border-top: 1px solid #e5e7eb;
  border-bottom: 1px solid #e5e7eb;
}

.stat {
  flex: 1;
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a4189;
}

.stat-label {
  font-size: 0.75rem;
  color: #6b7280;
}

.agent-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  flex: 1;
  padding: 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  cursor: pointer;
  text-align: center;
}

.action-btn.view {
  background: #1a4189;
  color: white;
  border: none;
}

.action-btn.toggle-status {
  background: white;
  border: 1px solid;
}

.action-btn.toggle-status.active {
  color: #ef4444;
  border-color: #ef4444;
}

.action-btn.toggle-status.inactive {
  color: #059669;
  border-color: #059669;
}
</style>
