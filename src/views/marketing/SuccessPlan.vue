<template>
  <div class="success-plan-container">
    <div class="marketing-tools-header">
      <div class="header-with-actions">
        <div>
          <h1 class="marketing-tools-title">Succezz Plan</h1>
          <p class="marketing-tools-subtitle">Create and track your success milestones with our comprehensive planning tools.</p>
        </div>

        <!-- Admin-only Create Plan button at the top -->
        <button
          v-if="canCreatePlans"
          class="create-plan-top-btn"
          @click="createNewPlan"
          v-can="'create-marketing-plans'"
        >
          <span class="btn-icon">+</span>
          Create New Plan
        </button>
      </div>

      <!-- Admin-only search and filters -->
      <div v-if="canCreatePlans" class="admin-search-filters">
        <div class="search-bar">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search plans..."
            @input="filterPlans"
          />
          <button class="search-btn">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="search-icon">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>

        <div class="filter-options">
          <div class="filter-label">Filter by:</div>

          <div class="filter-pills">
            <button
              v-for="filter in filterOptions"
              :key="filter.value"
              :class="['filter-pill', { active: activeFilters.includes(filter.value) }]"
              @click="toggleFilter(filter.value)"
            >
              {{ filter.label }}
            </button>
          </div>

          <select v-if="showAgentFilter" v-model="selectedAgent" class="agent-filter" @change="filterPlans">
            <option value="">All Agents</option>
            <option v-for="agent in availableAgents" :key="agent">{{ agent }}</option>
          </select>

          <button v-if="isFiltering" class="clear-filters" @click="clearFilters">
            Clear Filters
          </button>
        </div>
      </div>
    </div>

    <div class="marketing-tabs">
      <button
        v-for="(info, key) in ['success', 'checklist', 'done', 'social']"
        :key="key"
        :class="['marketing-tab', { active: currentTab === key }]"
        @click="handleTabChange(key)"
      >
        {{ getTabTitle(key) }}
      </button>
    </div>

    <div v-if="isLoading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>Loading plans...</p>
    </div>

    <div v-else-if="marketingStore.plans.marketingPlans.length === 0" class="empty-state">
      <div class="empty-icon">📋</div>
      <h3>No Marketing Plans Yet</h3>
      <p>Create your first marketing plan to get started</p>
      <button
        v-if="canCreatePlans"
        class="create-plan-btn"
        @click="createNewPlan"
        v-can="'create-marketing-plans'"
      >
        Create New Plan
      </button>
      <p v-else class="permission-message">Please contact an administrator to create a marketing plan</p>
    </div>

    <div v-else-if="filteredPlans.length === 0 && isFiltering" class="empty-state">
      <div class="empty-icon">🔍</div>
      <h3>No Matching Plans</h3>
      <p>No plans match your search criteria</p>
      <button class="clear-filters-btn" @click="clearFilters">Clear Filters</button>
    </div>

    <MarketingContentLoader v-else>
      <div class="success-plans">
        <!-- Add security reminder for admins -->
        <div v-if="canCreatePlans" class="security-reminder">
          <p>As an admin, you have special privileges to create marketing plans. Remember to follow company guidelines.</p>
        </div>

        <!-- Search results count for admins -->
        <div v-if="canCreatePlans && isFiltering" class="search-results-count">
          Showing {{ filteredPlans.length }} of {{ marketingStore.plans.marketingPlans.length }} plans
        </div>

        <div class="plans-container">
          <div v-for="(plan, index) in filteredPlans" :key="index" class="plan-card" @click="viewPlan(getOriginalIndex(plan))">
            <div class="plan-header">
              <div class="plan-icon" :style="{ backgroundColor: getRandomColor(plan.title) }">
                {{ getFirstLetter(plan.title) }}
              </div>
              <div class="plan-info">
                <h3>{{ plan.title }}</h3>
                <p class="date">Creation date: {{ formatDate(plan.creationDate) }}</p>

                <!-- Add creator badge if available -->
                <div v-if="plan.creator" class="creator-badge">
                  <span class="creator-name">{{ plan.creator.name }}</span>
                  <span class="creator-role" :class="plan.creator.role">{{ plan.creator.role }}</span>
                </div>
              </div>
              <button class="view-plan-btn">
                View plan
              </button>
            </div>
            <p class="description">{{ plan.strategyOverview }}</p>
            <div class="card-footer">
              <span class="status" :class="plan.status ? plan.status.toLowerCase() : 'draft'">{{ plan.status || 'Draft' }}</span>

              <!-- Show assigned agents if available -->
              <div v-if="plan.assignedAgents && plan.assignedAgents.length > 0" class="assigned-agents">
                <span class="assigned-label">Assigned to:</span>
                <span class="agent-name">{{ plan.assignedAgents.join(', ') }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MarketingContentLoader>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useMarketingStore } from '@/stores/marketingStore';
import MarketingContentLoader from '@/features/marketing/MarketingContentLoader.vue';
import { hasPermission } from '@/services/permissionService';
import { useRoleStore } from '@/stores/roleStore';

const router = useRouter();
const marketingStore = useMarketingStore();
const roleStore = useRoleStore();
const currentTab = ref('success');
const isLoading = computed(() => marketingStore.isLoading);

// Multiple security layers for checking permissions
// Layer 1: Check if the current user can create plans using permissions service
const canCreatePlans = computed(() => {
  // Base permission check
  const hasCreatePermission = hasPermission('create-marketing-plans');

  // Additional security: Double check the role directly
  const isAdminRole = roleStore.currentRole === 'admin';

  // Both conditions must be true
  return hasCreatePermission && isAdminRole;
});

// Search and filtering state
const searchQuery = ref('');
const activeFilters = ref([]);
const selectedAgent = ref('');
const filterOptions = [
  { label: 'Title', value: 'title' },
  { label: 'Description', value: 'description' },
  { label: 'Agent', value: 'agent' },
  { label: 'Status', value: 'status' }
];

// Computed property to determine if any filtering is active
const isFiltering = computed(() => {
  return searchQuery.value.trim() !== '' ||
         activeFilters.value.length > 0 ||
         selectedAgent.value !== '';
});

// Show agent filter dropdown when agent filter is selected
const showAgentFilter = computed(() => {
  return activeFilters.value.includes('agent');
});

// Get all available agents from plans
const availableAgents = computed(() => {
  const agents = new Set();

  marketingStore.plans.marketingPlans.forEach(plan => {
    if (plan.assignedAgents && plan.assignedAgents.length) {
      plan.assignedAgents.forEach(agent => agents.add(agent));
    }
    if (plan.creator && plan.creator.role === 'agent') {
      agents.add(plan.creator.name);
    }
  });

  return Array.from(agents);
});

// Filter plans based on search query and selected filters
const filteredPlans = computed(() => {
  if (!isFiltering.value) {
    return marketingStore.plans.marketingPlans;
  }

  return marketingStore.plans.marketingPlans.filter(plan => {
    let matchesSearch = true;

    // If search query is provided, check against selected filters
    if (searchQuery.value.trim() !== '') {
      const query = searchQuery.value.toLowerCase();

      // If no specific filters are selected, search in all fields
      if (activeFilters.value.length === 0) {
        matchesSearch =
          (plan.title && plan.title.toLowerCase().includes(query)) ||
          (plan.strategyOverview && plan.strategyOverview.toLowerCase().includes(query)) ||
          (plan.assignedAgents && plan.assignedAgents.some(agent => agent.toLowerCase().includes(query))) ||
          (plan.creator && plan.creator.name && plan.creator.name.toLowerCase().includes(query));
      } else {
        // Otherwise, only search in selected filters
        matchesSearch = false;

        if (activeFilters.value.includes('title') && plan.title) {
          matchesSearch = matchesSearch || plan.title.toLowerCase().includes(query);
        }

        if (activeFilters.value.includes('description') && plan.strategyOverview) {
          matchesSearch = matchesSearch || plan.strategyOverview.toLowerCase().includes(query);
        }

        if (activeFilters.value.includes('agent')) {
          const hasMatchingAssignedAgent = plan.assignedAgents &&
            plan.assignedAgents.some(agent => agent.toLowerCase().includes(query));

          const hasMatchingCreator = plan.creator &&
            plan.creator.name &&
            plan.creator.name.toLowerCase().includes(query);

          matchesSearch = matchesSearch || hasMatchingAssignedAgent || hasMatchingCreator;
        }

        if (activeFilters.value.includes('status') && plan.status) {
          matchesSearch = matchesSearch || plan.status.toLowerCase().includes(query);
        }
      }
    }

    // Additional filter for selected agent
    if (selectedAgent.value && activeFilters.value.includes('agent')) {
      const agentMatch =
        (plan.assignedAgents && plan.assignedAgents.includes(selectedAgent.value)) ||
        (plan.creator && plan.creator.name === selectedAgent.value);

      matchesSearch = matchesSearch && agentMatch;
    }

    return matchesSearch;
  });
});

// Get original index from the unfiltered array
const getOriginalIndex = (plan) => {
  return marketingStore.plans.marketingPlans.findIndex(p =>
    p.title === plan.title && p.creationDate === plan.creationDate);
};

// Toggle filter selection
const toggleFilter = (filter) => {
  const index = activeFilters.value.indexOf(filter);
  if (index === -1) {
    activeFilters.value.push(filter);
  } else {
    activeFilters.value.splice(index, 1);
  }
  filterPlans();
};

// Reset all filters
const clearFilters = () => {
  searchQuery.value = '';
  activeFilters.value = [];
  selectedAgent.value = '';
  filterPlans();
};

// Call this when filters change
const filterPlans = () => {
  // This function is here for any additional logic we may want to add
  // The filtering itself happens in the computed property
};

// Layer 2: Security verification on component mount and role changes
watch(() => roleStore.currentRole, verifyPermissions);

function verifyPermissions() {
  // If user tries to access features they shouldn't have access to, redirect
  if (window.location.href.includes('/marketing-tools/create') && !canCreatePlans.value) {
    console.error('Unauthorized access attempt detected');
    router.push('/unauthorized');
  }
}

// Fetch marketing plans when component mounts
onMounted(async () => {
  await marketingStore.plans.fetchPlans();

  // Verify permissions on mount (security layer 2)
  verifyPermissions();
});

// Layer 3: Additional security in action methods
const createNewPlan = () => {
  // Triple-check permissions before allowing action
  if (!hasPermission('create-marketing-plans') || roleStore.currentRole !== 'admin') {
    console.error('Unauthorized create plan attempt');
    return router.push('/unauthorized');
  }

  router.push('/marketing-tools/create');
};

// Expanded array of colors that work well with white text (good contrast)
// More diverse with less emphasis on purple shades
const contrastColors = [
  '#1E3A8A', // Navy Blue
  '#1D4ED8', // Royal Blue
  '#0369A1', // Ocean Blue
  '#0E7490', // Teal
  '#065F46', // Forest Green
  '#166534', // Emerald Green
  '#3F6212', // Olive Green
  '#854D0E', // Bronze
  '#92400E', // Amber
  '#9A3412', // Burnt Orange
  '#B91C1C', // Crimson
  '#991B1B', // Dark Red
  '#831843', // Burgundy
  '#701A75', // Magenta
  '#581C87', // Deep Purple
  '#4338CA', // Indigo
  '#1E40AF', // Cobalt
  '#0F172A', // Dark Slate
  '#374151', // Charcoal
  '#4B5563', // Slate Gray
  '#7E22CE', // Violet
  '#BE123C', // Ruby
  '#0F766E', // Dark Teal
  '#0C4A6E'  // Dark Cyan
];

const getTabTitle = (key) => {
  const titles = {
    success: 'Success Plan',
    checklist: 'My Checklist',
    done: 'Done for You',
    social: 'Social Platforms'
  };
  return titles[key];
};

const handleTabChange = (key) => {
  currentTab.value = key;
  switch (key) {
    case 'success':
      router.push('/marketing-tools/success-plan');
      break;
    case 'checklist':
      router.push('/marketing-tools/checklist');
      break;
    case 'done':
      router.push('/marketing-tools/done-for-you');
      break;
    case 'social':
      router.push('/marketing-tools/social-platforms');
      break;
  }
};

const viewPlan = (index) => {
  router.push(`/marketing-tools/plan/${index}`);
};

// Get the first letter of the plan title
const getFirstLetter = (title) => {
  return title && title.length > 0 ? title.charAt(0).toUpperCase() : 'P';
};

// Get a random color based on the plan title (but consistent for the same title)
const getRandomColor = (title) => {
  if (!title) return contrastColors[0];

  // Use the sum of character codes as a seed for consistent color selection
  let sum = 0;
  for (let i = 0; i < title.length; i++) {
    sum += title.charCodeAt(i);
  }

  // Use the sum to select a color from the array
  const colorIndex = sum % contrastColors.length;
  return contrastColors[colorIndex];
};

// Format date to a more readable format
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}, ${date.getFullYear()}, ${formatTime(date)}`;
};

// Format time to 12-hour format with am/pm
const formatTime = (date) => {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';

  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const minutesStr = minutes < 10 ? '0' + minutes : minutes;

  return `${hours}:${minutesStr}${ampm}`;
};
</script>

<style scoped>
.success-plan-container {
  padding: 80px 1.5rem 1.5rem 1.5rem; /* Combined padding with top padding for the fixed navigation */
}

.marketing-tools-header {
  margin-bottom: 2rem;
}

.marketing-tools-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1E3A8A;
  margin-bottom: 0.5rem;
}

.marketing-tools-subtitle {
  color: #6B7280;
  font-size: 0.875rem;
}

.marketing-tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.marketing-tab {
  padding: 0.5rem 1rem;
  background: none;
  border: none;
  font-weight: 500;
  color: #6B7280;
  cursor: pointer;
}

.marketing-tab.active {
  color: #2563EB;
  border-bottom: 2px solid #2563EB;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
}

.loading-spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid #3498db;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4rem 1rem;
  background: #f9fafb;
  border-radius: 0.5rem;
  border: 1px dashed #e5e7eb;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.empty-state h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.empty-state p {
  color: #6b7280;
  margin-bottom: 1.5rem;
}

.create-plan-btn {
  padding: 0.625rem 1.25rem;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.create-plan-btn:hover {
  background-color: #1d4ed8;
}

.plans-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.plan-card {
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 0.75rem;
  padding: 1.5rem;
  cursor: pointer;
  margin-bottom: 20px;
}

.plan-header {
  display: flex;
  align-items: center;
  margin-bottom: 1.1rem;
}

.plan-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
  margin-right: 1rem;
  flex-shrink: 0;
}

.plan-info {
  flex: 1;
}

.plan-card h3 {
  font-size: 1rem;
  font-weight: 600;
  color: #1E3A8A;
  margin: 0 0 0.25rem 0;
}

.date {
  font-size: 0.875rem;
  color: #6B7280;
  margin: 0;
}

.view-plan-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  color: #2563EB;
  background: #EFF6FF;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.view-plan-btn:hover {
  background: #DBEAFE;
}

.description {
  color: #4B5563;
  margin-bottom: 1.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 14px;
}

.card-footer {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.status {
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
}

.status.draft {
  background: #EFF6FF;
  color: #2563EB;
}

.status.active {
  background: #ECFDF5;
  color: #059669;
}

.status.archived {
  background: #F3F4F6;
  color: #6B7280;
}

.add-new {
  border: 2px dashed #E5E7EB;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
}

.add-content {
  text-align: center;
  color: #6B7280;
}

.add-icon {
  width: 2.5rem;
  height: 2.5rem;
  margin-bottom: 1rem;
}

.creator-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.25rem;
}

.creator-name {
  font-size: 0.75rem;
  color: #6b7280;
}

.creator-role {
  display: inline-block;
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-size: 0.625rem;
  font-weight: 500;
  text-transform: uppercase;
}

.creator-role.admin {
  background-color: #374151;
  color: white;
}

.creator-role.agent {
  background-color: #2563eb;
  color: white;
}

.permission-message {
  color: #EF4444;
  font-size: 0.875rem;
  margin-top: 1rem;
  padding: 0.5rem;
  background-color: #FEF2F2;
  border-radius: 0.375rem;
  max-width: 400px;
  text-align: center;
}

/* New styles for the top "Create Plan" button and header layout */
.header-with-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.create-plan-top-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.create-plan-top-btn:hover {
  background-color: #1d4ed8;
}

.btn-icon {
  font-size: 1.25rem;
  font-weight: bold;
}

.security-reminder {
  background-color: #FFFBEB;
  border-left: 4px solid #F59E0B;
  padding: 0.75rem 1rem;
  margin-bottom: 1.5rem;
  border-radius: 0.375rem;
}

.security-reminder p {
  color: #92400E;
  font-size: 0.875rem;
  margin: 0;
}

/* Admin search and filter styles */
.admin-search-filters {
  background-color: #f8fafc;
  border-radius: 0.75rem;
  padding: 1rem;
  margin-top: 1rem;
  border: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.search-bar {
  display: flex;
  position: relative;
}

.search-bar input {
  flex: 1;
  padding: 0.75rem 1rem;
  padding-right: 3rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  width: 100%;
}

.search-btn {
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 0.25rem;
}

.search-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.filter-options {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
}

.filter-label {
  color: #4b5563;
  font-size: 0.875rem;
  font-weight: 500;
}

.filter-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.filter-pill {
  background-color: #f3f4f6;
  color: #4b5563;
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.375rem 0.75rem;
  border: none;
  border-radius: 2rem;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-pill.active {
  background-color: #2563eb;
  color: white;
}

.agent-filter {
  padding: 0.375rem 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  background-color: white;
}

.clear-filters {
  background-color: #ef4444;
  color: white;
  padding: 0.375rem 0.75rem;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 500;
  margin-left: auto;
}

.search-results-count {
  color: #4b5563;
  font-size: 0.875rem;
  margin-bottom: 0.75rem;
  background-color: #f3f4f6;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  display: inline-block;
}

.clear-filters-btn {
  padding: 0.625rem 1.25rem;
  background-color: #ef4444;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.clear-filters-btn:hover {
  background-color: #dc2626;
}

/* Assigned agents display */
.assigned-agents {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: auto;
}

.assigned-label {
  font-size: 0.75rem;
  color: #6b7280;
}

.agent-name {
  font-size: 0.75rem;
  color: #1f2937;
  font-weight: 500;
  background-color: #f3f4f6;
  padding: 0.125rem 0.5rem;
  border-radius: 1rem;
}
</style>
