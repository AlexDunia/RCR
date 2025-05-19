<template>
  <div class="client-agents-page">
    <!-- Filter Section -->
    <div class="filter-section">
      <div class="filter-row">
        <div class="filter-group">
          <button class="filter-button" @click="toggleFilter('priceRange')">
            {{ selectedFilters.priceRange ? selectedFilters.priceRange.label : 'Price Range ($)' }}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 9l6 6 6-6"></path>
            </svg>
          </button>
          <div v-if="activeFilter === 'priceRange'" class="filter-dropdown">
            <div v-for="range in priceRanges" :key="range.label" class="filter-option" @click="selectFilter('priceRange', range)">
              {{ range.label }}
              <span v-if="selectedFilters.priceRange === range" class="check-mark">✓</span>
            </div>
          </div>
        </div>

        <div class="filter-group">
          <button class="filter-button" @click="toggleFilter('expertise')">
            {{ selectedFilters.expertise || 'Agent expertise' }}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 9l6 6 6-6"></path>
            </svg>
          </button>
          <div v-if="activeFilter === 'expertise'" class="filter-dropdown">
            <div v-for="area in expertiseAreas" :key="area" class="filter-option" @click="selectFilter('expertise', area)">
              {{ area }}
              <span v-if="selectedFilters.expertise === area" class="check-mark">✓</span>
            </div>
          </div>
        </div>

        <div class="filter-group">
          <button class="filter-button" @click="toggleFilter('experience')">
            {{ selectedFilters.experience ? `${selectedFilters.experience} years` : 'Experience level' }}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 9l6 6 6-6"></path>
            </svg>
          </button>
          <div v-if="activeFilter === 'experience'" class="filter-dropdown">
            <div v-for="level in experienceLevels" :key="level.value" class="filter-option" @click="selectFilter('experience', level.value)">
              {{ level.label }}
              <span v-if="selectedFilters.experience === level.value" class="check-mark">✓</span>
            </div>
          </div>
        </div>

        <div class="filter-group">
          <button class="filter-button" @click="toggleFilter('rating')">
            {{ selectedFilters.rating ? `${selectedFilters.rating}+ Stars` : 'Rating' }}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 9l6 6 6-6"></path>
            </svg>
          </button>
          <div v-if="activeFilter === 'rating'" class="filter-dropdown">
            <div v-for="level in ratingLevels" :key="level.value" class="filter-option" @click="selectFilter('rating', level.value)">
              {{ level.label }}
              <span v-if="selectedFilters.rating === level.value" class="check-mark">✓</span>
            </div>
          </div>
        </div>
      </div>

      <div class="search-bar">
        <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          type="text"
          placeholder="Search by City, state..."
          v-model="searchQuery"
          @input="searchAgents"
        />
        <span class="keyboard-shortcut">⌘ K</span>
      </div>

      <!-- View Toggle Buttons moved here -->
      <div class="view-toggle">
        <button
          class="view-toggle-button"
          :class="{ active: viewMode === 'grid' }"
          @click="viewMode = 'grid'"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>
        </button>
        <button
          class="view-toggle-button"
          :class="{ active: viewMode === 'list' }"
          @click="viewMode = 'list'"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>

    <!-- Agents List with No Results Message -->
    <div v-if="filteredAgents.length === 0" class="no-results">
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
      <h3>No agents found</h3>
      <p>Try adjusting your filters or search criteria</p>
    </div>
    <div v-else class="agents-list" :class="viewMode + '-view'">
      <div v-for="agent in filteredAgents" :key="agent.id" class="agent-card">
        <div class="agent-info">
          <div class="agent-initials" :style="{ backgroundColor: getInitialsColor(agent) }">
            {{ getInitials(agent.name) }}
          </div>
          <div class="agent-details">
            <div class="agent-name-row">
              <h3>{{ agent.name }}</h3>
              <span class="experience">({{ agent.yearsOfExperience }}+ Yr of experience)</span>
            </div>
            <div class="agent-meta">
              <div class="meta-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>{{ agent.location }}</span>
              </div>
              <div class="meta-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path>
                </svg>
                <span>{{ agent.specialties?.[0] || 'No specialty' }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="agent-actions">
          <button class="action-button view-profile" @click="viewAgentProfile(agent.id)">
            View profile
          </button>
          <button
            class="action-button request-connect"
            :class="{ 'pending-request': isRequestPending(agent.id) }"
            @click="(event) => requestConnect(agent.id, event)"
          >
            {{ isRequestPending(agent.id) ? 'Cancel request' : 'Request to connect' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAgentStore } from '@/stores/agentStore';
import { useConnectionStore } from '@/stores/connectionStore';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';

const router = useRouter();
const agentStore = useAgentStore();
const connectionStore = useConnectionStore();
const toast = useToast();

// Search and filter state
const searchQuery = ref('');
const activeFilter = ref(null);
const viewMode = ref('grid');

// Filter options
const priceRanges = [
  { min: 0, max: 100000, label: 'Under $100k' },
  { min: 100000, max: 250000, label: '$100k - $250k' },
  { min: 250000, max: 500000, label: '$250k - $500k' },
  { min: 500000, max: 1000000, label: '$500k - $1M' },
  { min: 1000000, max: null, label: 'Over $1M' }
];

const expertiseAreas = [
  'Luxury Homes',
  'Waterfront Properties',
  'Commercial Properties',
  'Investment Properties',
  'Residential Properties',
  'First-Time Buyers',
  'Urban Apartments',
  'Luxury Condos'
];

const experienceLevels = [
  { value: '1-5', label: '1-5 years' },
  { value: '6-10', label: '6-10 years' },
  { value: '10+', label: '10+ years' }
];

const ratingLevels = [
  { value: 4.5, label: '4.5+ Stars' },
  { value: 4.0, label: '4.0+ Stars' },
  { value: 3.5, label: '3.5+ Stars' }
];

// Active filters
const selectedFilters = ref({
  priceRange: null,
  expertise: null,
  experience: null,
  rating: null
});

// Add state to track pending requests
const pendingRequests = ref(new Set());

// Close filter dropdown when clicking outside
const closeDropdowns = (e) => {
  if (!e.target.closest('.filter-group')) {
    activeFilter.value = null;
  }
};

// Add event listener for clicking outside
onMounted(() => {
  document.addEventListener('click', closeDropdowns);
});

onUnmounted(() => {
  document.removeEventListener('click', closeDropdowns);
});

// Computed
const filteredAgents = computed(() => {
  let result = agentStore.getAllAgents();

  // Apply search query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(agent =>
      agent.location.toLowerCase().includes(query) ||
      agent.name.toLowerCase().includes(query) ||
      agent.specialties?.some(s => s.toLowerCase().includes(query))
    );
  }

  // Apply price range filter
  if (selectedFilters.value.priceRange) {
    const range = selectedFilters.value.priceRange;
    result = result.filter(agent => {
      const avgPrice = agent.averagePropertyPrice || 0;
      return avgPrice >= range.min && (!range.max || avgPrice <= range.max);
    });
  }

  // Apply expertise filter
  if (selectedFilters.value.expertise) {
    result = result.filter(agent =>
      agent.specialties?.includes(selectedFilters.value.expertise)
    );
  }

  // Apply experience filter
  if (selectedFilters.value.experience) {
    result = result.filter(agent => {
      const [min, max] = selectedFilters.value.experience.split('-').map(Number);
      const exp = agent.yearsOfExperience || 0;
      return max ? (exp >= min && exp <= max) : exp >= min;
    });
  }

  // Apply rating filter
  if (selectedFilters.value.rating) {
    result = result.filter(agent =>
      (agent.averageRating || 0) >= selectedFilters.value.rating
    );
  }

  return result;
});

// Methods
function toggleFilter(filterName) {
  if (activeFilter.value === filterName) {
    activeFilter.value = null;
  } else {
    activeFilter.value = filterName;
  }
}

function selectFilter(type, value) {
  if (selectedFilters.value[type] === value) {
    selectedFilters.value[type] = null;
  } else {
    selectedFilters.value[type] = value;
  }
  activeFilter.value = null; // Close dropdown after selection
}

function searchAgents() {
  // Implement debounced search if needed
  console.log('Searching:', searchQuery.value);
}

function viewAgentProfile(agentId) {
  router.push(`/client-find-agents/${agentId}`);
}

// Helper function to check if request is pending
function isRequestPending(agentId) {
  return pendingRequests.value.has(agentId);
}

async function requestConnect(agentId, event) {
  try {
    // If request is pending, cancel it
    if (isRequestPending(agentId)) {
      pendingRequests.value.delete(agentId);
      const button = event.target;
      button.textContent = 'Request to connect';
      button.classList.remove('request-sent', 'pending-request');
      toast.success('Connection request cancelled');
      return;
    }

    // Show loading state
    const button = event.target;
    button.disabled = true;
    button.textContent = 'Connecting...';

    // Make API call to request connection
    const result = await connectionStore.requestConnection(
      1, // clientId (hardcoded for now, in real app get from auth)
      'client',
      agentId,
      'agent',
      'I would like to connect with you regarding real estate opportunities.'
    );

    if (result) {
    // Show success message
    toast.success('Connection request sent successfully!');

      // Update button state to show cancel option
      button.textContent = 'Cancel request';
      button.classList.add('request-sent', 'pending-request');
      pendingRequests.value.add(agentId);
    } else {
      throw new Error('Failed to send connection request');
    }
  } catch (error) {
    // Handle error
    console.error('Error requesting connection:', error);
    toast.error('Failed to send connection request. Please try again.');

    // Reset button state
    if (event && event.target) {
      const button = event.target;
      button.disabled = false;
      button.textContent = 'Request to connect';
      button.classList.remove('request-sent', 'pending-request');
    }
  } finally {
    // Re-enable button
    if (event && event.target) {
      const button = event.target;
    button.disabled = false;
    }
  }
}

function getInitials(name) {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();
}

function getInitialsColor() {
  // Using a fixed color that matches the design
  return '#1849A9';
}
</script>

<style scoped>
.client-agents-page {
  padding: 24px 32px;
  background: #F8F9FB;
  min-height: 100vh;
}

/* Filter Section */
.filter-section {
  margin-bottom: 24px;
}

.filter-row {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.filter-group {
  position: relative;
  min-width: 160px;
}

/* View toggle moved under search */
.view-toggle {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
  justify-content: flex-end;
}

.view-toggle-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid #E5E5E5;
  border-radius: 6px;
  background: white;
  color: #666666;
  cursor: pointer;
  transition: all 0.2s ease;
}

.view-toggle-button.active {
  background: #1849A9;
  color: white;
  border-color: #1849A9;
}

.view-toggle-button:hover:not(.active) {
  border-color: #1849A9;
  color: #1849A9;
}

/* Search Bar */
.search-bar {
  position: relative;
  width: 100%;
  margin-top: 16px;
}

.search-bar input {
  width: 100%;
  height: 40px;
  padding: 0 40px;
  border: 1px solid #E5E5E5;
  border-radius: 6px;
  font-size: 14px;
  color: #1A1A1A;
  background: white;
  transition: border-color 0.2s ease;
}

.search-bar input:focus {
  outline: none;
  border-color: #1849A9;
}

.search-bar input::placeholder {
  color: #666666;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #666666;
}

.keyboard-shortcut {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #666666;
  font-size: 12px;
  padding: 2px 6px;
  background: #F5F5F5;
  border-radius: 4px;
  line-height: 16px;
}

/* Filter Buttons */
.filter-button {
  width: 100%;
  height: 40px;
  padding: 0 16px;
  border: 1px solid #E5E5E5;
  border-radius: 6px;
  background: white;
  color: #1A1A1A;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-button:hover {
  border-color: #1849A9;
  color: #1849A9;
}

.filter-button svg {
  color: #666666;
}

.filter-dropdown {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  min-width: 200px;
  background: white;
  border: 1px solid #E5E5E5;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  z-index: 100;
}

.filter-option {
  padding: 10px 16px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #1A1A1A;
  transition: background-color 0.2s ease;
}

.filter-option:hover {
  background: #F5F5F5;
}

.check-mark {
  color: #1849A9;
  font-weight: 500;
}

/* No Results Message */
.no-results {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px;
  text-align: center;
  background: white;
  border-radius: 6px;
  border: 1px solid #E5E5E5;
  margin-top: 24px;
}

.no-results svg {
  color: #666666;
  margin-bottom: 16px;
}

.no-results h3 {
  font-size: 16px;
  font-weight: 600;
  color: #1A1A1A;
  margin: 0 0 8px 0;
}

.no-results p {
  font-size: 14px;
  color: #666666;
  margin: 0;
}

/* Shared Card Styles */
.agent-card {
  display: flex;
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
}

.agent-card:hover {
  border-color: rgba(24, 73, 169, 0.3);
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);
  transform: translateY(-1px);
}

.agent-info {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.agent-initials {
  width: 48px;
  height: 48px;
  min-width: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 16px;
  font-weight: 500;
  background: #1849A9;
  box-shadow: 0 2px 4px rgba(24, 73, 169, 0.15);
}

.agent-details {
  flex: 1;
}

.agent-name-row {
  margin-bottom: 4px;
}

.agent-name-row h3 {
  font-size: 16px;
  font-weight: 600;
  color: #1A1A1A;
  margin: 0;
  line-height: 24px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.experience {
  color: #666666;
  font-size: 14px;
  line-height: 20px;
  white-space: nowrap;
  padding: 2px 8px;
  background: #F5F5F5;
  border-radius: 4px;
}

.agent-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 12px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666666;
  font-size: 14px;
  line-height: 20px;
  min-width: 0;
}

.meta-item svg {
  color: #1849A9;
}

.agent-actions {
  display: flex;
  gap: 12px;
  margin-top: auto;
}

.action-button {
  flex: 1;
  height: 36px;
  padding: 0 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  text-decoration: none;
  position: relative;
  white-space: nowrap;
}

.view-profile {
  background: white;
  border: 1px solid rgba(24, 73, 169, 0.3);
  color: #1849A9;
}

.view-profile:hover {
  background: #F8FAFF;
  border-color: rgba(24, 73, 169, 0.5);
}

.request-connect {
  background: #1849A9;
  border: 1px solid #1849A9;
  color: white;
  box-shadow: 0 1px 2px rgba(24, 73, 169, 0.1);
}

.request-connect:hover {
  background: #1538A0;
  border-color: #1538A0;
  box-shadow: 0 2px 4px rgba(24, 73, 169, 0.15);
}

.request-connect.pending-request {
  background: white !important;
  border: 1px solid rgba(255, 107, 107, 0.4) !important;
  color: #FF6B6B !important;
  box-shadow: none !important;
}

.request-connect.pending-request:hover {
  background: rgba(255, 107, 107, 0.02) !important;
  border-color: rgba(255, 107, 107, 0.5) !important;
}

/* Grid View Styles */
.grid-view {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  padding: 16px 0;
}

.grid-view .agent-card {
  flex-direction: column;
  padding: 20px;
}

.grid-view .agent-info {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
}

.grid-view .agent-initials {
  width: 48px;
  height: 48px;
  min-width: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 16px;
  font-weight: 500;
  background: #1849A9;
  box-shadow: 0 2px 4px rgba(24, 73, 169, 0.15);
}

.grid-view .agent-details {
  flex: 1;
  min-width: 0;
}

.grid-view .agent-name-row {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 8px;
}

.grid-view .agent-name-row h3 {
  font-size: 16px;
  font-weight: 600;
  color: #1A1A1A;
  margin: 0;
  line-height: 24px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}

.grid-view .experience {
  color: #666666;
  font-size: 13px;
  line-height: 20px;
  white-space: nowrap;
  padding: 2px 8px;
  background: #F5F5F5;
  border-radius: 4px;
  flex-shrink: 0;
}

.grid-view .agent-meta {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.grid-view .meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666666;
  font-size: 14px;
  line-height: 20px;
}

.grid-view .meta-item svg {
  flex-shrink: 0;
  color: #1849A9;
  width: 16px;
  height: 16px;
}

.grid-view .meta-item span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.grid-view .agent-actions {
  display: flex;
  gap: 8px;
  margin-top: 16px;
}

.grid-view .action-button {
  flex: 1;
  height: 36px;
  padding: 0 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  text-decoration: none;
  position: relative;
  white-space: nowrap;
}

.grid-view .view-profile {
  background: white;
  border: 1px solid #1849A9;
  color: #1849A9;
}

.grid-view .view-profile:hover {
  background: #F8FAFF;
}

.grid-view .request-connect {
  background: #1849A9;
  border: 1px solid #1849A9;
  color: white;
}

.grid-view .request-connect:hover {
  background: #1538A0;
  border-color: #1538A0;
}

.grid-view .request-connect.pending-request {
  background: white !important;
  border: 1px solid #FF6B6B !important;
  color: #FF6B6B !important;
}

.grid-view .request-connect.pending-request:hover {
  background: #FFF5F5 !important;
}

/* Responsive Adjustments */
@media (max-width: 1200px) {
  .grid-view {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
}

@media (max-width: 768px) {
  .grid-view {
    grid-template-columns: 1fr;
  }

  .grid-view .agent-card {
    padding: 16px;
  }

  .grid-view .agent-meta {
    gap: 8px;
  }
}

/* List View Styles */
.list-view {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.list-view .agent-card {
  padding: 16px 20px;
  align-items: center;
}

.list-view .agent-info {
  display: flex;
  gap: 16px;
  flex: 1;
  min-width: 0;
}

.list-view .agent-initials {
  width: 48px;
  height: 48px;
  min-width: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 16px;
  font-weight: 500;
  background: #1849A9;
  box-shadow: 0 2px 4px rgba(24, 73, 169, 0.15);
}

.list-view .agent-actions {
  min-width: 300px;
  margin: 0;
}

/* Responsive Adjustments */
@media (max-width: 1200px) {
  .list-view .agent-actions {
    min-width: 280px;
  }
}

@media (max-width: 768px) {
  .client-agents-page {
    padding: 16px;
  }

  .agent-card {
    padding: 20px;
    gap: 16px;
  }

  .list-view .agent-card {
    flex-direction: column;
  }

  .list-view .agent-actions {
    min-width: 100%;
    margin-top: 16px;
  }

  .agent-meta {
    gap: 12px;
  }

  .filter-row {
    gap: 8px;
  }

  .action-button {
    padding: 0 16px;
  }
}
</style>
