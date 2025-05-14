<template>
  <div class="client-agents-page">
    <div class="search-container">
      <div class="search-wrapper">
        <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          type="text"
          placeholder="Search by name, specialty, location..."
          v-model="searchQuery"
          @input="searchAgents"
          class="search-input"
        />
      </div>
      <div class="filters">
        <div class="filter">
          <select v-model="filters.specialty" class="filter-select">
            <option value="">All Specialties</option>
            <option value="luxury">Luxury Properties</option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="investment">Investment Properties</option>
          </select>
        </div>
        <div class="filter">
          <select v-model="filters.location" class="filter-select">
            <option value="">All Locations</option>
            <option value="san-francisco">San Francisco</option>
            <option value="los-angeles">Los Angeles</option>
            <option value="san-diego">San Diego</option>
            <option value="miami">Miami</option>
          </select>
        </div>
        <div class="filter">
          <select v-model="filters.experience" class="filter-select">
            <option value="">Any Experience</option>
            <option value="1-5">1-5 years</option>
            <option value="6-10">6-10 years</option>
            <option value="10+">10+ years</option>
          </select>
        </div>
      </div>
    </div>

    <div class="agents-header">
      <h2>Your Client Advisors</h2>
      <p>Connect with the perfect advisor to help you find your dream home</p>
      <p v-if="isLoading" class="loading-message">
        <svg class="loading-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="2" x2="12" y2="6"></line>
          <line x1="12" y1="18" x2="12" y2="22"></line>
          <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
          <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
          <line x1="2" y1="12" x2="6" y2="12"></line>
          <line x1="18" y1="12" x2="22" y2="12"></line>
          <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
          <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
        </svg>
        Loading advisors...
      </p>
      <p v-else-if="agentsFromStore.length === 0" class="error-message">
        No agents found. Please check the agent store.
      </p>
      <div v-else class="agent-debug">
        <small>Found {{ agentsFromStore.length }} agents with IDs: {{ agentsFromStore.map(a => a.id).join(', ') }}</small>
      </div>
    </div>

    <div v-if="!isLoading" class="agents-grid">
      <div v-for="agent in filteredAgents" :key="agent.id" class="agent-card">
        <div class="agent-photo">
          <img
            :src="agent.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(agent.name)}&background=1a4189&color=fff`"
            :alt="agent.name"
            @error="handleImageError($event, agent)"
          />
          <div class="agent-status" :class="{ 'online': agent.status === 'online' }"></div>
        </div>
        <div class="agent-info">
          <div class="agent-name">{{ agent.name }}</div>
          <div class="agent-title">{{ agent.title }}</div>
          <div class="agent-location">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span>{{ agent.location }}</span>
          </div>
          <div class="agent-ratings">
            <div class="stars">
              <span v-for="n in 5" :key="n" class="star" :class="{ 'filled': n <= agent.rating }">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </span>
            </div>
            <span class="rating-text">{{ agent.rating.toFixed(1) }} ({{ agent.reviewCount }} reviews)</span>
          </div>
          <div class="agent-specialties">
            <span v-for="(specialty, index) in agent.specialties" :key="index" class="specialty-tag">
              {{ specialty }}
            </span>
          </div>
        </div>
        <div class="agent-stats">
          <div class="stat">
            <div class="stat-value">{{ agent.experience }}</div>
            <div class="stat-label">Years</div>
          </div>
          <div class="stat">
            <div class="stat-value">{{ agent.closedDeals }}</div>
            <div class="stat-label">Deals</div>
          </div>
          <div class="stat">
            <div class="stat-value">${{ formatPrice(agent.volumeSold) }}</div>
            <div class="stat-label">Volume</div>
          </div>
        </div>
        <div class="agent-actions">
          <button class="view-profile-btn" @click="viewAgentProfile(agent.id)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            View Profile
          </button>
          <button class="contact-btn" @click="contactAgent(agent.id)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
            Contact
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAgentStore } from '@/stores/agentStore';

const router = useRouter();
const agentStore = useAgentStore();
const searchQuery = ref('');
const filters = reactive({
  specialty: '',
  location: '',
  experience: ''
});
const isLoading = ref(true);

// Get agents from the agentStore
const agentsFromStore = computed(() => {
  const storeAgents = agentStore.getAllAgents();

  // Map store agents to the format expected by this component
  return storeAgents.map(agent => ({
    id: agent.id,
    name: agent.name,
    title: getAgentTitle(agent),
    photo: agent.profilePicture || agent.avatar,
    location: agent.location,
    rating: agent.averageRating,
    reviewCount: agent.reviews.length,
    experience: agent.yearsOfExperience,
    closedDeals: Math.floor(Math.random() * 200) + 50, // Mock data
    volumeSold: (Math.floor(Math.random() * 40) + 10) * 1000000, // Mock data
    specialties: agent.specialties,
    status: agent.status === 'active' ? (Math.random() > 0.5 ? 'online' : 'away') : 'offline'
  }));
});

// On component mount, fetch the agents
onMounted(async () => {
  try {
    await agentStore.fetchAgents();
  } catch (error) {
    console.error('Error loading agents:', error);
  } finally {
    isLoading.value = false;
  }
});

// Helper function to get agent title based on specialties
function getAgentTitle(agent) {
  if (agent.specialties.includes('Luxury Homes') || agent.specialties.includes('Luxury Estates')) {
    return 'Luxury Property Specialist';
  } else if (agent.specialties.includes('Investment Properties')) {
    return 'Investment Property Advisor';
  } else if (agent.specialties.includes('First-Time Buyers') || agent.specialties.includes('First-Time Homebuyers')) {
    return 'First-Time Homebuyer Specialist';
  }
  return 'Senior Real Estate Agent';
}

// Filter agents based on search query and filters
const filteredAgents = computed(() => {
  let result = [...agentsFromStore.value];

  // Apply search query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(agent =>
      agent.name.toLowerCase().includes(query) ||
      agent.title.toLowerCase().includes(query) ||
      agent.location.toLowerCase().includes(query) ||
      agent.specialties.some(s => s.toLowerCase().includes(query))
    );
  }

  // Apply specialty filter
  if (filters.specialty) {
    result = result.filter(agent =>
      agent.specialties.some(s => s.toLowerCase().includes(filters.specialty.toLowerCase()))
    );
  }

  // Apply location filter
  if (filters.location) {
    const locationKey = filters.location.replace('-', ' ');
    result = result.filter(agent =>
      agent.location.toLowerCase().includes(locationKey)
    );
  }

  // Apply experience filter
  if (filters.experience) {
    if (filters.experience === '1-5') {
      result = result.filter(agent => agent.experience >= 1 && agent.experience <= 5);
    } else if (filters.experience === '6-10') {
      result = result.filter(agent => agent.experience >= 6 && agent.experience <= 10);
    } else if (filters.experience === '10+') {
      result = result.filter(agent => agent.experience > 10);
    }
  }

  return result;
});

// Search function with debounce
const searchAgents = () => {
  // In a real app, we might implement debouncing here
  console.log('Searching for:', searchQuery.value);
};

// Format price to show as 2.4M instead of 2400000
const formatPrice = (price) => {
  if (price >= 1000000) {
    return (price / 1000000).toFixed(1) + 'M';
  } else if (price >= 1000) {
    return (price / 1000).toFixed(0) + 'K';
  }
  return price.toString();
};

// Navigate to agent profile
const viewAgentProfile = (agentId) => {
  router.push(`/client-find-agents/${agentId}`);
};

// Open contact modal
const contactAgent = (agentId) => {
  // In a real app, this would open a contact modal or redirect to a contact page
  console.log('Contact agent:', agentId);
};

// Handle image loading errors
function handleImageError(event, agent) {
  // Replace with fallback image when the original image fails to load
  event.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(agent.name)}&background=1a4189&color=fff`;
}
</script>

<style scoped>
.client-agents-page {
  padding: 24px;
}

.search-container {
  background-color: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin-bottom: 32px;
}

.search-wrapper {
  position: relative;
  margin-bottom: 16px;
}

.search-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
}

.search-input {
  width: 100%;
  padding: 12px 16px 12px 48px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: #1a4189;
  box-shadow: 0 0 0 3px rgba(26, 65, 137, 0.1);
}

.filters {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.filter {
  flex: 1;
  min-width: 120px;
}

.filter-select {
  width: 100%;
  padding: 10px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  background-color: white;
  cursor: pointer;
}

.filter-select:focus {
  outline: none;
  border-color: #1a4189;
}

.agents-header {
  margin-bottom: 24px;
}

.agents-header h2 {
  font-size: 24px;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 8px 0;
}

.agents-header p {
  font-size: 16px;
  color: #64748b;
  margin: 0;
}

.agents-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}

.agent-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.agent-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.agent-photo {
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 16px auto;
}

.agent-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.agent-status {
  position: absolute;
  bottom: 4px;
  right: 4px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #94a3b8;
  border: 2px solid white;
}

.agent-status.online {
  background-color: #22c55e;
}

.agent-info {
  text-align: center;
  margin-bottom: 24px;
}

.agent-name {
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 4px;
}

.agent-title {
  font-size: 14px;
  color: #64748b;
  margin-bottom: 12px;
}

.agent-location {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  font-size: 14px;
  margin-bottom: 12px;
  gap: 4px;
}

.agent-ratings {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 16px;
}

.stars {
  display: flex;
  gap: 2px;
  margin-bottom: 4px;
}

.star {
  color: #cbd5e1;
}

.star.filled {
  color: #f59e0b;
}

.star.filled svg {
  fill: #f59e0b;
}

.rating-text {
  font-size: 13px;
  color: #64748b;
}

.agent-specialties {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
}

.specialty-tag {
  background-color: #e6f0ff;
  color: #1a4189;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
}

.agent-stats {
  display: flex;
  justify-content: space-around;
  margin-bottom: 24px;
  padding: 16px 0;
  border-top: 1px solid #e5e7eb;
  border-bottom: 1px solid #e5e7eb;
}

.stat {
  text-align: center;
}

.stat-value {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
}

.stat-label {
  font-size: 12px;
  color: #64748b;
}

.agent-actions {
  display: flex;
  gap: 12px;
  margin-top: auto;
}

.view-profile-btn, .contact-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.view-profile-btn {
  background-color: #e5e7eb;
  color: #1e293b;
}

.view-profile-btn:hover {
  background-color: #d1d5db;
}

.contact-btn {
  background-color: #1a4189;
  color: white;
}

.contact-btn:hover {
  background-color: #153170;
}

.agent-debug {
  font-size: 12px;
  color: #666;
  margin-top: 8px;
}

.loading-message {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 40px 0;
  color: #1a4189;
  font-size: 18px;
}

.loading-icon {
  margin-right: 12px;
  animation: spin 1.5s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-message {
  color: #e53e3e;
  text-align: center;
  margin: 40px 0;
  font-size: 16px;
}

@media (max-width: 768px) {
  .client-agents-page {
    padding: 16px;
  }

  .filters {
    flex-direction: column;
    gap: 12px;
  }

  .filter {
    width: 100%;
  }

  .agents-grid {
    grid-template-columns: 1fr;
  }
}
</style>
