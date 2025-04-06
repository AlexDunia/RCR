<template>
  <div class="admin-checklist-view">
    <div class="header">
      <h1>Agent Checklists Overview</h1>
      <div class="filter-controls">
        <div class="search-bar">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search checklists..."
            class="search-input"
          >
          <button v-if="searchQuery" @click="searchQuery = ''" class="clear-search">
            <span>&times;</span>
          </button>
        </div>

        <div class="filter-options">
          <select v-model="agentFilter" class="filter-select">
            <option value="all">All Agents</option>
            <option v-for="agent in uniqueAgents" :key="agent" :value="agent">{{ agent }}</option>
          </select>

          <select v-model="statusFilter" class="filter-select">
            <option value="all">All Status</option>
            <option value="draft">Draft</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>
    </div>

    <div class="admin-info-banner">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="info-icon">
        <circle cx="12" cy="12" r="10" stroke-width="2"/>
        <line x1="12" y1="8" x2="12" y2="12" stroke-width="2" stroke-linecap="round"/>
        <circle cx="12" cy="16" r="1" fill="currentColor"/>
      </svg>
      <div class="admin-info-message">
        <strong>Admin View Mode</strong>
        <span>This overview shows all agent checklists. Admins can view checklist details but cannot create or modify checklists.</span>
      </div>
    </div>

    <div class="stats-cards">
      <div class="stat-card">
        <h3>Total Checklists</h3>
        <div class="stat-value">{{ allChecklists.length }}</div>
      </div>
      <div class="stat-card">
        <h3>Completed</h3>
        <div class="stat-value">{{ completedCount }}</div>
      </div>
      <div class="stat-card">
        <h3>In Progress</h3>
        <div class="stat-value">{{ inProgressCount }}</div>
      </div>
      <div class="stat-card">
        <h3>Not Started</h3>
        <div class="stat-value">{{ notStartedCount }}</div>
      </div>
    </div>

    <div v-if="isLoading" class="loading-spinner">
      Loading checklists...
    </div>

    <div v-else-if="filteredChecklists.length === 0" class="no-checklists">
      <p>No checklists found matching your filters.</p>
    </div>

    <div v-else class="checklists-table">
      <table>
        <thead>
          <tr>
            <th @click="sortBy('title')">
              Title
              <span v-if="sortField === 'title'" class="sort-icon">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
            </th>
            <th @click="sortBy('agent')">
              Agent
              <span v-if="sortField === 'agent'" class="sort-icon">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
            </th>
            <th @click="sortBy('progress')">
              Progress
              <span v-if="sortField === 'progress'" class="sort-icon">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
            </th>
            <th @click="sortBy('creationDate')">
              Created
              <span v-if="sortField === 'creationDate'" class="sort-icon">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
            </th>
            <th @click="sortBy('status')">
              Status
              <span v-if="sortField === 'status'" class="sort-icon">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="checklist in filteredChecklists" :key="checklist.id">
            <td>{{ checklist.title }}</td>
            <td>
              <div class="agent-info" v-if="checklist.creator">
                <span>{{ checklist.creator.name }}</span>
              </div>
              <span v-else>Unknown</span>
            </td>
            <td>
              <div class="progress-indicator">
                <div class="progress-bar">
                  <div
                    class="progress-fill"
                    :style="{ width: `${checklist.progress || 0}%` }"
                    :class="{
                      'low': (checklist.progress || 0) < 30,
                      'medium': (checklist.progress || 0) >= 30 && (checklist.progress || 0) < 70,
                      'high': (checklist.progress || 0) >= 70
                    }"
                  ></div>
                </div>
                <span class="progress-text">{{ checklist.progress || 0 }}%</span>
              </div>
            </td>
            <td>{{ formatDate(checklist.creationDate) }}</td>
            <td>
              <span class="status-badge" :class="checklist.status || 'draft'">
                {{ checklist.status || 'draft' }}
              </span>
            </td>
            <td>
              <button class="view-btn" @click="viewChecklist(checklist.id)">View</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useMarketingStore } from '@/stores/marketingStore';
import { useRoleStore } from '@/stores/roleStore';

const router = useRouter();
const marketingStore = useMarketingStore();
const roleStore = useRoleStore();

// Check if user is admin
const isAdmin = computed(() => roleStore.currentRole === 'admin');

// Navigation guard
if (!isAdmin.value) {
  router.push('/marketing-tools');
}

// State
const allChecklists = ref([]);
const isLoading = ref(true);
const searchQuery = ref('');
const agentFilter = ref('all');
const statusFilter = ref('all');
const sortField = ref('creationDate');
const sortOrder = ref('desc');

// Load checklists
const loadChecklists = async () => {
  isLoading.value = true;
  try {
    await marketingStore.checklists.fetchChecklists();
    allChecklists.value = marketingStore.checklists.marketingChecklists;
  } catch (error) {
    console.error('Error loading checklists:', error);
  } finally {
    isLoading.value = false;
  }
};

// Get unique agent names from checklists
const uniqueAgents = computed(() => {
  const agents = new Set();
  allChecklists.value.forEach(checklist => {
    if (checklist.creator && checklist.creator.name) {
      agents.add(checklist.creator.name);
    }
  });
  return Array.from(agents);
});

// Filtered and sorted checklists
const filteredChecklists = computed(() => {
  let result = [...allChecklists.value];

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(checklist =>
      checklist.title.toLowerCase().includes(query) ||
      (checklist.description && checklist.description.toLowerCase().includes(query))
    );
  }

  // Apply agent filter
  if (agentFilter.value !== 'all') {
    result = result.filter(checklist =>
      checklist.creator && checklist.creator.name === agentFilter.value
    );
  }

  // Apply status filter
  if (statusFilter.value !== 'all') {
    result = result.filter(checklist =>
      checklist.status === statusFilter.value
    );
  }

  // Apply sorting
  result.sort((a, b) => {
    const aValue = getValue(a, sortField.value);
    const bValue = getValue(b, sortField.value);

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortOrder.value === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    } else {
      return sortOrder.value === 'asc'
        ? aValue - bValue
        : bValue - aValue;
    }
  });

  return result;
});

// Helper function to get values for sorting
const getValue = (checklist, field) => {
  switch (field) {
    case 'title':
      return checklist.title || '';
    case 'agent':
      return checklist.creator?.name || '';
    case 'progress':
      return checklist.progress || 0;
    case 'creationDate':
      return new Date(checklist.creationDate).getTime();
    case 'status':
      return checklist.status || '';
    default:
      return '';
  }
};

// Stats computations
const completedCount = computed(() =>
  allChecklists.value.filter(c => c.status === 'completed').length
);

const inProgressCount = computed(() =>
  allChecklists.value.filter(c => c.progress > 0 && c.status !== 'completed').length
);

const notStartedCount = computed(() =>
  allChecklists.value.filter(c => c.progress === 0 && c.status !== 'completed').length
);

// Methods
const sortBy = (field) => {
  if (sortField.value === field) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortField.value = field;
    sortOrder.value = 'asc';
  }
};

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';

  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const viewChecklist = (id) => {
  router.push(`/marketing-tools/checklist/${id}`);
};

// Lifecycle
onMounted(() => {
  loadChecklists();
});
</script>

<style scoped>
.admin-checklist-view {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.header h1 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.8rem;
}

.filter-controls {
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
}

.search-bar {
  position: relative;
}

.search-input {
  padding: 0.5rem 2rem 0.5rem 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  min-width: 200px;
}

.clear-search {
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  color: #777;
}

.filter-options {
  display: flex;
  gap: 0.5rem;
}

.filter-select {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  background-color: white;
}

.stats-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-card {
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  text-align: center;
}

.stat-card h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  color: #666;
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
  color: #2c3e50;
}

.checklists-table {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

thead {
  background-color: #f8f9fa;
}

th {
  padding: 1rem;
  font-weight: 600;
  color: #495057;
  cursor: pointer;
  white-space: nowrap;
}

td {
  padding: 1rem;
  border-top: 1px solid #ecf0f1;
  vertical-align: middle;
}

.sort-icon {
  margin-left: 0.25rem;
}

.progress-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.progress-bar {
  height: 8px;
  background-color: #eee;
  border-radius: 4px;
  width: 100px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: #4caf50;
  border-radius: 4px;
}

.progress-fill.low {
  background-color: #ff9800;
}

.progress-fill.medium {
  background-color: #2196f3;
}

.progress-fill.high {
  background-color: #4caf50;
}

.progress-text {
  min-width: 36px;
  font-size: 0.85rem;
  color: #666;
}

.status-badge {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: capitalize;
}

.status-badge.draft {
  background-color: #e9ecef;
  color: #495057;
}

.status-badge.active {
  background-color: #e3f2fd;
  color: #0d47a1;
}

.status-badge.completed {
  background-color: #e8f5e9;
  color: #1b5e20;
}

.agent-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.view-btn {
  padding: 0.35rem 0.75rem;
  background-color: #4285f4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.view-btn:hover {
  background-color: #3367d6;
}

.loading-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  color: #666;
}

.no-checklists {
  background-color: #f8f9fa;
  padding: 3rem;
  text-align: center;
  border-radius: 8px;
}

.admin-info-banner {
  background-color: #f0f9ff;
  border-left: 4px solid #0284c7;
  padding: 1rem;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-radius: 0.375rem;
}

.info-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: #0284c7;
  flex-shrink: 0;
}

.admin-info-message {
  display: flex;
  flex-direction: column;
}

.admin-info-message strong {
  color: #0284c7;
  margin-bottom: 0.25rem;
}

.admin-info-message span {
  color: #0369a1;
  font-size: 0.875rem;
}
</style>
