<template>
  <div class="favorites-page">
    <!-- Header -->
    <div class="favorites-header">
      <h1 class="favorites-title">My Favorites</h1>
      <p class="favorites-subtitle">Manage your saved properties and agents</p>
    </div>

    <!-- Stats Cards -->
    <div class="favorites-stats">
      <div class="stat-card">
        <div class="stat-icon">
          <i class="fas fa-home"></i>
        </div>
        <div class="stat-content">
          <div class="stat-number">{{ totalProperties }}</div>
          <div class="stat-label">Properties</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">
          <i class="fas fa-user-tie"></i>
        </div>
        <div class="stat-content">
          <div class="stat-number">{{ favoriteAgents.length }}</div>
          <div class="stat-label">Agents</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">
          <i class="fas fa-calendar-alt"></i>
        </div>
        <div class="stat-content">
          <div class="stat-number">{{ totalFavorites }}</div>
          <div class="stat-label">Total</div>
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="favorites-tabs">
      <button
        class="tab-button"
        :class="{ 'tab-button--active': activeTab === 'properties' }"
        @click="activeTab = 'properties'"
      >
        <i class="fas fa-home"></i>
        Properties ({{ localProperties.length + trebProperties.length }})
      </button>

      <button
        class="tab-button"
        :class="{ 'tab-button--active': activeTab === 'agents' }"
        @click="activeTab = 'agents'"
      >
        <i class="fas fa-user-tie"></i>
        Agents ({{ favoriteAgents.length }})
      </button>
    </div>

    <!-- Properties Tab -->
    <div v-if="activeTab === 'properties'" class="favorites-content">
      <!-- Search and Filter -->
      <div class="favorites-controls">
        <div class="search-box">
          <i class="fas fa-search"></i>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search properties..."
            class="search-input"
          />
        </div>

        <div class="filter-buttons">
          <button
            class="filter-button"
            :class="{ 'filter-button--active': activeFilter === 'all' }"
            @click="activeFilter = 'all'"
          >
            All
          </button>
          <button
            class="filter-button"
            :class="{ 'filter-button--active': activeFilter === 'local' }"
            @click="activeFilter = 'local'"
          >
            My Properties
          </button>
          <button
            class="filter-button"
            :class="{ 'filter-button--active': activeFilter === 'treb' }"
            @click="activeFilter = 'treb'"
          >
            TREB Properties
          </button>
        </div>
      </div>

      <!-- Properties Grid -->
      <div v-if="filteredProperties.length > 0" class="properties-grid">
        <div
          v-for="property in filteredProperties"
          :key="getPropertyKey(property)"
          class="property-card"
        >
          <div class="property-image">
            <img
              :src="property.image || '/images/default-property.jpg'"
              :alt="getPropertyTitle(property)"
              @error="handleImageError"
            />
            <FavoriteButton
              :property="property"
              :property-type="getPropertyType(property)"
              @toggle="handlePropertyToggle"
              class="property-favorite-btn"
            />
          </div>

          <div class="property-content">
            <h3 class="property-title">{{ getPropertyTitle(property) }}</h3>
            <p class="property-address">{{ getPropertyAddress(property) }}</p>
            <div class="property-details">
              <span class="property-price">{{ formatPrice(getPropertyPrice(property)) }}</span>
              <span class="property-beds">{{ getPropertyBeds(property) }} beds</span>
              <span class="property-baths">{{ getPropertyBaths(property) }} baths</span>
            </div>
            <div class="property-actions">
              <button class="action-button action-button--primary" @click="viewProperty(property)">
                View Details
              </button>
              <button class="action-button" @click="contactAgent(property)">
                Contact Agent
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="empty-state">
        <div class="empty-icon">
          <i class="far fa-heart"></i>
        </div>
        <h3>No favorite properties yet</h3>
        <p>Start exploring properties and add them to your favorites!</p>
        <button class="action-button action-button--primary" @click="goToProperties">
          Browse Properties
        </button>
      </div>
    </div>

    <!-- Agents Tab -->
    <div v-if="activeTab === 'agents'" class="favorites-content">
      <div v-if="favoriteAgents.length > 0" class="agents-grid">
        <div
          v-for="agentId in favoriteAgents"
          :key="agentId"
          class="agent-card"
        >
          <div class="agent-avatar">
            <img
              :src="getAgentAvatar(agentId)"
              :alt="getAgentName(agentId)"
              @error="handleAgentImageError"
            />
            <FavoriteButton
              :agent-id="agentId"
              @toggle="handleAgentToggle"
              class="agent-favorite-btn"
            />
          </div>

          <div class="agent-content">
            <h3 class="agent-name">{{ getAgentName(agentId) }}</h3>
            <p class="agent-specialty">{{ getAgentSpecialty(agentId) }}</p>
            <div class="agent-contact">
              <span class="agent-phone">{{ getAgentPhone(agentId) }}</span>
              <span class="agent-email">{{ getAgentEmail(agentId) }}</span>
            </div>
            <div class="agent-actions">
              <button class="action-button action-button--primary" @click="viewAgentProfile(agentId)">
                View Profile
              </button>
              <button class="action-button" @click="contactAgent(agentId)">
                Contact
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State for Agents -->
      <div v-else class="empty-state">
        <div class="empty-icon">
          <i class="far fa-user"></i>
        </div>
        <h3>No favorite agents yet</h3>
        <p>Find and save your favorite real estate agents!</p>
        <button class="action-button action-button--primary" @click="goToAgents">
          Find Agents
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
      <div class="loading-spinner"></div>
      <p>Loading your favorites...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useFavouritesStore } from '@/stores/favouritesStore'
import { useAgentStore } from '@/stores/agentStore'
import FavoriteButton from '@/components/FavoriteButton.vue'

const router = useRouter()
const favouritesStore = useFavouritesStore()
const agentStore = useAgentStore()

// Reactive state
const activeTab = ref('properties')
const activeFilter = ref('all')
const searchQuery = ref('')
const loading = ref(false)

// Computed properties
const localProperties = computed(() => favouritesStore.getAllFavouriteProperties())
const trebProperties = computed(() => favouritesStore.getAllFavouriteTrebProperties())
const favoriteAgents = computed(() => favouritesStore.getAllFavouriteAgents())

const totalProperties = computed(() => localProperties.value.length + trebProperties.value.length)
const totalFavorites = computed(() => totalProperties.value + favoriteAgents.value.length)

const filteredProperties = computed(() => {
  let properties = []

  if (activeFilter.value === 'all' || activeFilter.value === 'local') {
    properties.push(...localProperties.value)
  }

  if (activeFilter.value === 'all' || activeFilter.value === 'treb') {
    properties.push(...trebProperties.value)
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    properties = properties.filter(property => {
      const title = getPropertyTitle(property).toLowerCase()
      const address = getPropertyAddress(property).toLowerCase()
      return title.includes(query) || address.includes(query)
    })
  }

  return properties
})

// Methods
const getPropertyKey = (property) => {
  return property.ListingKey || property.id
}

const getPropertyType = (property) => {
  return property.ListingKey ? 'treb' : 'local'
}

const getPropertyTitle = (property) => {
  return property.title || property.PublicRemarks || 'Property'
}

const getPropertyAddress = (property) => {
  return property.address || property.Address || 'Address not available'
}

const getPropertyPrice = (property) => {
  return property.price || property.ListPrice || 0
}

const getPropertyBeds = (property) => {
  return property.bedrooms || property.BedroomsTotal || 0
}

const getPropertyBaths = (property) => {
  return property.bathrooms || property.BathroomsTotalInteger || 0
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD'
  }).format(price)
}

const getAgentAvatar = (agentId) => {
  const agent = agentStore.getAgentById(agentId)
  return agent?.avatar || '/images/default-avatar.jpg'
}

const getAgentName = (agentId) => {
  const agent = agentStore.getAgentById(agentId)
  return agent?.name || 'Agent'
}

const getAgentSpecialty = (agentId) => {
  const agent = agentStore.getAgentById(agentId)
  return agent?.specialty || 'Real Estate Agent'
}

const getAgentPhone = (agentId) => {
  const agent = agentStore.getAgentById(agentId)
  return agent?.phone || 'N/A'
}

const getAgentEmail = (agentId) => {
  const agent = agentStore.getAgentById(agentId)
  return agent?.email || 'N/A'
}

const handlePropertyToggle = (data) => {
  console.log('Property favorite toggled:', data)
}

const handleAgentToggle = (data) => {
  console.log('Agent favorite toggled:', data)
}

const viewProperty = (property) => {
  if (property.ListingKey) {
    // TREB property
    router.push(`/property/treb/${property.ListingKey}`)
  } else {
    // Local property
    router.push(`/property/${property.id}`)
  }
}

const contactAgent = (propertyOrAgentId) => {
  if (typeof propertyOrAgentId === 'object') {
    // Property agent
    const agentId = propertyOrAgentId.agent_id
    router.push(`/messages?contactAgent=${agentId}`)
  } else {
    // Direct agent contact
    router.push(`/messages?contactAgent=${propertyOrAgentId}`)
  }
}

const viewAgentProfile = (agentId) => {
  router.push(`/agent/${agentId}`)
}

const goToProperties = () => {
  router.push('/properties')
}

const goToAgents = () => {
  router.push('/agents')
}

const handleImageError = (event) => {
  event.target.src = '/images/default-property.jpg'
}

const handleAgentImageError = (event) => {
  event.target.src = '/images/default-avatar.jpg'
}

onMounted(async () => {
  loading.value = true
  try {
    // Initialize favorites
    favouritesStore.initFavourites()

    // Load agents if not already loaded
    if (agentStore.getAllAgents().length === 0) {
      await agentStore.fetchAgents()
    }
  } catch (error) {
    console.error('Error loading favorites:', error)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.favorites-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.favorites-header {
  text-align: center;
  margin-bottom: 2rem;
}

.favorites-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 0.5rem;
}

.favorites-subtitle {
  font-size: 1.1rem;
  color: #718096;
}

.favorites-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-card {
  display: flex;
  align-items: center;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
}

.stat-icon i {
  color: white;
  font-size: 1.2rem;
}

.stat-content {
  flex: 1;
}

.stat-number {
  font-size: 1.8rem;
  font-weight: 700;
  color: #1a202c;
  line-height: 1;
}

.stat-label {
  font-size: 0.9rem;
  color: #718096;
  margin-top: 0.25rem;
}

.favorites-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  border-bottom: 2px solid #e2e8f0;
}

.tab-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  color: #718096;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.tab-button:hover {
  color: #4a5568;
}

.tab-button--active {
  color: #667eea;
  border-bottom-color: #667eea;
}

.tab-button i {
  font-size: 1rem;
}

.favorites-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  gap: 1rem;
}

.search-box {
  position: relative;
  flex: 1;
  max-width: 400px;
}

.search-box i {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #a0aec0;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: #667eea;
}

.filter-buttons {
  display: flex;
  gap: 0.5rem;
}

.filter-button {
  padding: 0.5rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background: white;
  color: #4a5568;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-button:hover {
  border-color: #cbd5e0;
}

.filter-button--active {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

.properties-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
}

.property-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.property-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.property-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.property-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.property-favorite-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
}

.property-content {
  padding: 1.5rem;
}

.property-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1a202c;
  margin-bottom: 0.5rem;
  line-height: 1.3;
}

.property-address {
  color: #718096;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.property-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.property-price {
  font-size: 1.1rem;
  font-weight: 600;
  color: #667eea;
}

.property-beds,
.property-baths {
  font-size: 0.9rem;
  color: #718096;
}

.property-actions {
  display: flex;
  gap: 0.5rem;
}

.action-button {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background: white;
  color: #4a5568;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-button:hover {
  border-color: #cbd5e0;
  background: #f7fafc;
}

.action-button--primary {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

.action-button--primary:hover {
  background: #5a67d8;
  border-color: #5a67d8;
}

.agents-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.agent-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.agent-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.agent-avatar {
  position: relative;
  width: 80px;
  height: 80px;
  margin: 0 auto 1rem;
}

.agent-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.agent-favorite-btn {
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
}

.agent-content {
  text-align: center;
}

.agent-name {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1a202c;
  margin-bottom: 0.5rem;
}

.agent-specialty {
  color: #718096;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.agent-contact {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #4a5568;
}

.agent-actions {
  display: flex;
  gap: 0.5rem;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: #718096;
}

.empty-icon {
  font-size: 4rem;
  color: #cbd5e0;
  margin-bottom: 1rem;
}

.empty-state h3 {
  font-size: 1.5rem;
  color: #4a5568;
  margin-bottom: 0.5rem;
}

.empty-state p {
  margin-bottom: 2rem;
}

.loading-state {
  text-align: center;
  padding: 4rem 2rem;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #e2e8f0;
  border-top: 3px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .favorites-page {
    padding: 1rem;
  }

  .favorites-title {
    font-size: 2rem;
  }

  .favorites-controls {
    flex-direction: column;
    align-items: stretch;
  }

  .search-box {
    max-width: none;
  }

  .filter-buttons {
    justify-content: center;
  }

  .properties-grid {
    grid-template-columns: 1fr;
  }

  .agents-grid {
    grid-template-columns: 1fr;
  }
}
</style>
