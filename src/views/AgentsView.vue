<template>
  <div class="main-content">
    <!-- Page Header -->
    <div class="header-section mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Find agents</h1>
      <p class="text-gray-600 text-sm mt-1">For Real City admin</p>
    </div>

    <!-- Agent Finder Section -->
    <div class="finder-section bg-mint-100 p-6 rounded-lg mb-6">
      <div class="finder-header">
        <h2 class="text-xl font-semibold text-gray-900">Agent Finder</h2>
        <span class="magnify-icon">🔍</span>
      </div>
      <p class="finder-subtitle text-gray-700 text-sm mt-1">Search for agents across Real City database</p>
    </div>

    <!-- Search Bar Section -->
    <div class="search-section relative mb-6">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search by Name, Country, State, Price range, Agent expertise, experience level..."
        class="search-input w-full border border-gray-300 rounded-lg py-2.5 px-4 pl-10 text-sm"
        @input="handleSearch"
      />
      <div class="search-icon absolute left-3 top-1/2 transform -translate-y-1/2">
        <i class="fas fa-search text-gray-400"></i>
      </div>
      <div class="search-shortcut absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center">
        <span class="text-xs bg-gray-100 rounded px-1.5 py-0.5 text-gray-500">⌘ K</span>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading-state flex justify-center my-8">
      <div class="spinner w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-state bg-red-50 text-red-600 p-4 rounded-lg mb-6">
      <p>{{ error }}</p>
    </div>

    <!-- Agent Cards Section -->
    <div v-else-if="agents.length > 0" class="agents-section space-y-4">
      <div
        v-for="agent in agents"
        :key="agent.id"
        class="agent-card"
      >
        <div class="flex items-center">
          <div class="mr-5">
            <img
              :src="agent.avatar"
              :alt="`${agent.name} profile`"
              class="agent-avatar"
              @error="handleImageError($event)"
            />
          </div>

          <div>
            <div class="agent-name-section">
              <h3 class="agent-name">{{ agent.name }}</h3>
              <span class="agent-experience">{{ agent.experience }}</span>
            </div>

            <div class="agent-details">
              <div class="location">
                <i class="fas fa-map-marker-alt text-gray-500 mr-2"></i>
                <span>{{ agent.location }}</span>
              </div>

              <div class="specialty">
                <i class="fas fa-home text-gray-500 mr-2"></i>
                <span>{{ agent.specialty }}</span>
              </div>
            </div>
          </div>

          <div class="agent-actions">
            <button
              class="btn view-profile"
              @click="viewProfile(agent)"
            >
              <i class="fas fa-user mr-2"></i>
              View profile
            </button>

            <button
              class="btn deactivate"
              @click="deactivateAgent(agent)"
            >
              <i class="fas fa-times-circle mr-2"></i>
              Deactivate
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="empty-state bg-gray-50 p-8 rounded-lg flex flex-col items-center justify-center">
      <i class="fas fa-users text-gray-300 text-5xl mb-4"></i>
      <h3 class="text-lg font-medium text-gray-700 mb-2">No agents found</h3>
      <p class="text-gray-500 text-center">Try adjusting your search criteria or adding new agents to the system.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useAgentStore } from '@/stores/agentStore';
import { useRouter } from 'vue-router';

// State management
const searchQuery = ref('');
const loading = ref(true);
const error = ref(null);
const agentStore = useAgentStore();
const router = useRouter();

// Direct mapping of agents with their images - database-like structure
const fallbackAgents = [
  {
    id: 1,
    name: 'Sarah Johnson',
    experience: '3+ Yr of experience',
    location: 'Columbia, USA',
    specialty: 'Luxury Homes',
    avatar: '/images/avatar-1.jpg', // Use correct image path
    active: true
  },
  {
    id: 2,
    name: 'Michael Chen',
    experience: '7+ Yr of experience',
    location: 'New York, USA',
    specialty: 'Urban Properties',
    avatar: '/images/avatar-2.jpg', // Use correct image path
    active: true
  },
  {
    id: 3,
    name: 'Jessica Ramirez',
    experience: '4+ Yr of experience',
    location: 'Miami, USA',
    specialty: 'Downtown Properties',
    avatar: '/images/avatar-3.jpg', // Use correct image path
    active: true
  },
  {
    id: 4,
    name: 'David Thompson',
    experience: '6+ Yr of experience',
    location: 'Los Angeles, USA',
    specialty: 'Luxury Estates',
    avatar: '/images/avatar-4.jpg', // Use correct image path
    active: true
  }
];

// Function to map store agent to properly formatted agent
const formatStoreAgent = (agent) => {
  return {
    id: agent.id,
    name: agent.name,
    experience: agent.specialties ? agent.specialties[0] : '',
    location: agent.location || '',
    specialty: agent.specialties ? agent.specialties[0] : '',
    // Use the avatar directly from the agent object with fallback
    avatar: agent.avatar || '/images/default-avatar.jpg',
    active: agent.status === 'active' || true
  };
};

// Computed property for filtered agents
const agents = computed(() => {
  let agentsList = [];

  // Try to use the agent store data
  if (agentStore.agents && agentStore.agents.length > 0) {
    // Map each agent with its proper format and image
    agentsList = agentStore.agents.map(agent => formatStoreAgent(agent));
  } else {
    // Use fallback agents if store is empty
    agentsList = fallbackAgents;
  }

  // Apply search filtering
  if (!searchQuery.value) return agentsList;

  const query = searchQuery.value.toLowerCase();
  return agentsList.filter(agent =>
    agent.name?.toLowerCase().includes(query) ||
    agent.location?.toLowerCase().includes(query) ||
    agent.specialty?.toLowerCase().includes(query)
  );
});

// Methods
const fetchAgents = async () => {
  loading.value = true;
  error.value = null;

  try {
    // Check if agent store has a fetchAgents method
    if (typeof agentStore.fetchAgents === 'function') {
      await agentStore.fetchAgents();

      // Check if agents were actually loaded
      if (!agentStore.agents || agentStore.agents.length === 0) {
        console.warn('No agents found in store, using fallback data');
      }
    } else {
      console.warn('agentStore.fetchAgents is not a function, using fallback data');
    }

    loading.value = false;
  } catch (err) {
    console.error('Error fetching agents:', err);
    error.value = 'Failed to load agents. Please try again later.';
    loading.value = false;
  }
};

const handleSearch = () => {
  // Sanitize input to prevent XSS (basic example)
  const sanitized = searchQuery.value.replace(/[<>]/g, '');
  searchQuery.value = sanitized;

  // Log search query (for development/debugging)
  console.log(`Searching for: ${searchQuery.value}`);
};

const viewProfile = (agent) => {
  console.log(`Viewing profile for ${agent.name}`);
  // Navigate to profile page
  router.push(`/admin/agent/${agent.id}`);
};

const deactivateAgent = (agent) => {
  console.log(`Deactivating agent ${agent.name}`);
  // Try to use the store method if available
  if (typeof agentStore.updateAgentStatus === 'function') {
    try {
      agentStore.updateAgentStatus(agent.id, 'inactive');
    } catch (err) {
      console.error('Error updating agent status:', err);
      // Handle the error (could show a notification)
    }
  } else {
    console.warn('agentStore.updateAgentStatus is not available');
    // Simple local fallback
    const index = agents.value.findIndex(a => a.id === agent.id);
    if (index !== -1) {
      agents.value[index].active = false;
    }
  }
};

const handleImageError = (event) => {
  event.target.src = '/images/default-avatar.jpg';
};

// Lifecycle hooks
onMounted(() => {
  fetchAgents();
});
</script>

<style scoped>
.main-content {
  padding: 0 2rem;
  max-width: 1200px;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-top: 1.5rem;
}

.text-2xl {
  font-size: 1.5rem;
  font-weight: 600;
  color: #374151;
  margin: 0;
}

.text-gray-600 {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0.25rem 0 0;
  font-weight: normal;
}

.finder-section {
  background-color: #e2f2ee;
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-bottom: 1.25rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.finder-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0;
}

.text-xl {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  color: #374151;
}

.finder-subtitle {
  font-size: 0.875rem;
  color: #4b5563;
  margin: 0.25rem 0 0;
  font-weight: normal;
}

.search-section {
  margin-bottom: 1.25rem;
  position: relative;
  width: 100%;
}

.search-input {
  width: 100%;
  height: 2.5rem;
  padding: 0 2.5rem 0 2.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  color: #4b5563;
  background-color: white;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  outline: none;
}

.search-input::placeholder {
  color: #9CA3AF;
}

.search-icon {
  position: absolute;
  left: 0.875rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9CA3AF;
}

.search-shortcut {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
}

.search-shortcut span {
  background-color: #f3f4f6;
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  color: #6b7280;
}

.agent-card {
  background-color: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-bottom: 1rem;
  border: 1px solid #e5e7eb;
}

.agent-card .flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.agent-avatar {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  object-fit: cover;
}

.agent-name-section {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.agent-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.agent-experience {
  color: #6b7280;
  font-size: 0.875rem;
}

.agent-details {
  display: flex;
  gap: 1.5rem;
}

.location, .specialty {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  color: #6b7280;
}

.agent-actions {
  display: flex;
  gap: 0.5rem;
  margin-left: auto;
}

.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  cursor: pointer;
}

.view-profile {
  background-color: #f3f4f6;
  color: #374151;
  border: none;
}

.view-profile:hover {
  background-color: #e5e7eb;
}

.deactivate {
  background-color: #fee2e2;
  color: #dc2626;
  border: none;
}

.deactivate:hover {
  background-color: #fecaca;
}

.empty-state {
  text-align: center;
  padding: 2rem;
  color: #6b7280;
  background-color: #f9fafb;
  border-radius: 0.5rem;
}

/* Loading Animation */
@keyframes spin {
  to { transform: rotate(360deg); }
}

.spinner {
  animation: spin 1s linear infinite;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .main-content {
    padding: 0 1rem;
  }

  .agent-card {
    flex-direction: column;
    align-items: flex-start;
  }

  .md\:flex-row {
    flex-direction: column;
  }

  .md\:mr-4 {
    margin-right: 0;
  }

  .md\:ml-auto {
    margin-left: 0;
  }

  .w-full {
    width: 100%;
  }
}
</style>
