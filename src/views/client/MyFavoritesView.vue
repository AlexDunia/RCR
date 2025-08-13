<template>
  <div class="my-favorites-view">
    <!-- Global Header -->
    <GlobalHeader />

    <div class="favorites-container">
      <!-- Page Header -->
      <div class="page-header">
        <div class="boxed-container">
          <h1 class="page-title">My Saved Properties</h1>
          <p class="page-subtitle">Your favorite properties from our database and TREB listings</p>
        </div>
      </div>

      <!-- Main Content -->
      <section class="favorites-section">
        <div class="boxed-container">

          <!-- Loading State -->
          <div v-if="loading" class="loading-state">
            <div class="loading-spinner"></div>
            <p>Loading your saved properties...</p>
          </div>

          <!-- Error State -->
          <div v-else-if="error" class="error-state">
            <div class="error-icon">
              <i class="fas fa-exclamation-triangle"></i>
            </div>
            <h3>Unable to load favorites</h3>
            <p>{{ error }}</p>
            <button @click="loadFavorites" class="retry-button">
              Try Again
            </button>
          </div>

          <!-- Empty State -->
          <div v-else-if="favorites.length === 0" class="empty-state">
            <div class="empty-icon">
              <i class="far fa-heart"></i>
            </div>
            <h3>No favorite properties yet</h3>
            <p>Start exploring properties and add them to your favorites by clicking the heart icon!</p>
            <router-link to="/newbuyproperties" class="browse-button">
              Browse Properties
            </router-link>
          </div>

          <!-- Favorites Grid -->
          <div v-else>
            <!-- Stats Bar -->
            <div class="stats-bar">
              <div class="stat-item">
                <span class="stat-number">{{ totalFavorites }}</span>
                <span class="stat-label">Total Favorites</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">{{ localPropertiesCount }}</span>
                <span class="stat-label">Local Properties</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">{{ trebPropertiesCount }}</span>
                <span class="stat-label">TREB Properties</span>
              </div>
            </div>

            <!-- Filter Controls -->
            <div class="filter-controls">
              <div class="search-box">
                <i class="fas fa-search"></i>
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Search your favorites..."
                  class="search-input"
                />
              </div>
              <div class="filter-buttons">
                <button
                  :class="['filter-btn', { active: activeFilter === 'all' }]"
                  @click="activeFilter = 'all'"
                >
                  All
                </button>
                <button
                  :class="['filter-btn', { active: activeFilter === 'local' }]"
                  @click="activeFilter = 'local'"
                >
                  Local Properties
                </button>
                <button
                  :class="['filter-btn', { active: activeFilter === 'treb' }]"
                  @click="activeFilter = 'treb'"
                >
                  TREB Properties
                </button>
              </div>
            </div>

            <!-- Properties Grid -->
            <div class="properties-grid">
              <div
                v-for="favorite in filteredFavorites"
                :key="favorite.id"
                class="property-card"
                @click="viewProperty(favorite)"
              >
                <div class="property-card__image-container">
                  <img
                    :src="getPropertyImage(favorite)"
                    :alt="getPropertyTitle(favorite)"
                    class="property-card__img"
                    loading="lazy"
                    @error="handleImageError"
                  />
                  <div class="property-card__type-badge">
                    {{ favorite.property_type === 'local' ? 'Local' : 'TREB' }}
                  </div>
                  <FavoriteButton
                    :property="createPropertyObject(favorite)"
                    :property-type="favorite.property_type"
                    @toggle="handleFavoriteToggle"
                    class="property-card__favorite-btn"
                  />
                </div>

                <div class="property-card__content">
                  <h3 class="property-card__title">
                    {{ getPropertyTitle(favorite) }}
                  </h3>

                  <div class="property-card__price">
                    {{ formatPrice(getPropertyPrice(favorite)) }}
                  </div>

                  <div class="property-card__address">
                    <i class="fas fa-map-marker-alt"></i>
                    {{ getPropertyAddress(favorite) }}
                  </div>

                  <div class="property-card__details">
                    <span class="detail-item" v-if="getPropertyBeds(favorite)">
                      <i class="fas fa-bed"></i>
                      {{ getPropertyBeds(favorite) }} beds
                    </span>
                    <span class="detail-item" v-if="getPropertyBaths(favorite)">
                      <i class="fas fa-bath"></i>
                      {{ getPropertyBaths(favorite) }} baths
                    </span>
                    <span class="detail-item" v-if="getPropertySize(favorite)">
                      <i class="fas fa-ruler-combined"></i>
                      {{ getPropertySize(favorite) }} sqft
                    </span>
                  </div>

                  <div class="property-card__meta">
                    <span class="favorited-date">
                      Saved {{ formatDate(favorite.created_at) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import GlobalHeader from '@/components/GlobalHeader.vue'
import FavoriteButton from '@/components/FavoriteButton.vue'
import { favoritesApi } from '@/api/favoritesApi'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

// Get user ID from route params
const userId = computed(() => route.params.userId)

// Reactive state
const favorites = ref([])
const loading = ref(false)
const error = ref(null)
const searchQuery = ref('')
const activeFilter = ref('all')

// Computed properties
const totalFavorites = computed(() => favorites.value.length)

const localPropertiesCount = computed(() =>
  favorites.value.filter(fav => fav.property_type === 'local').length
)

const trebPropertiesCount = computed(() =>
  favorites.value.filter(fav => fav.property_type === 'treb').length
)

const filteredFavorites = computed(() => {
  let filtered = favorites.value

  // Filter by type
  if (activeFilter.value !== 'all') {
    filtered = filtered.filter(fav => fav.property_type === activeFilter.value)
  }

  // Filter by search query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim()
    filtered = filtered.filter(fav => {
      const title = getPropertyTitle(fav).toLowerCase()
      const address = getPropertyAddress(fav).toLowerCase()
      return title.includes(query) || address.includes(query)
    })
  }

  return filtered
})

// Methods
const loadFavorites = async () => {
  loading.value = true
  error.value = null

  try {
    // Verify user access - only allow users to view their own favorites
    const currentUserId = authStore.user?.id
    if (!currentUserId || currentUserId.toString() !== userId.value) {
      throw new Error('You can only view your own favorites')
    }

    const response = await favoritesApi.getFavorites()

    if (response.success) {
      favorites.value = response.data || []
      console.log('Loaded favorites for user', userId.value, ':', favorites.value)
    } else {
      throw new Error(response.message || 'Failed to load favorites')
    }
  } catch (err) {
    error.value = err.message || 'An error occurred while loading favorites'
    console.error('Error loading favorites:', err)
  } finally {
    loading.value = false
  }
}

const getPropertyImage = (favorite) => {
  // For local properties, try to get image from property data
  if (favorite.property_type === 'local') {
    return favorite.property_data?.image ||
           favorite.property_data?.images?.[0] ||
           'https://res.cloudinary.com/dnuhjsckk/image/upload/v1743087291/Designer_8_1_fjvyi0.png'
  }

  // For TREB properties, use default image (TREB doesn't provide images in the basic API)
  return 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1743087291/Designer_8_1_fjvyi0.png'
}

const getPropertyTitle = (favorite) => {
  if (favorite.property_type === 'local') {
    return favorite.property_data?.name ||
           favorite.property_data?.title ||
           'Beautiful Property'
  }

  return favorite.property_data?.PublicRemarks?.substring(0, 50) + '...' ||
         `TREB Property ${favorite.property_id}` ||
         'TREB Property'
}

const getPropertyPrice = (favorite) => {
  if (favorite.property_type === 'local') {
    return favorite.property_data?.price || 0
  }

  return favorite.property_data?.ListPrice || 0
}

const getPropertyAddress = (favorite) => {
  if (favorite.property_type === 'local') {
    const data = favorite.property_data
    if (!data) return 'Address not available'

    let address = data.address || ''
    if (data.city) address += `, ${data.city}`
    if (data.state) address += `, ${data.state}`

    return address || 'Address not available'
  }

  return favorite.property_data?.Address || 'Address not available'
}

const getPropertyBeds = (favorite) => {
  if (favorite.property_type === 'local') {
    return favorite.property_data?.bedrooms || 0
  }

  return favorite.property_data?.BedroomsTotal || 0
}

const getPropertyBaths = (favorite) => {
  if (favorite.property_type === 'local') {
    return favorite.property_data?.bathrooms || 0
  }

  return favorite.property_data?.BathroomsTotalInteger || 0
}

const getPropertySize = (favorite) => {
  if (favorite.property_type === 'local') {
    return favorite.property_data?.size || 0
  }

  return favorite.property_data?.ApproximateSquareFootage || 0
}

const formatPrice = (price) => {
  if (!price || price === 0) return 'Price not available'

  const numericPrice = typeof price === 'number' ? price : Number(price.toString().replace(/[^0-9.-]+/g, ''))

  if (isNaN(numericPrice)) return 'Price not available'

  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0
  }).format(numericPrice)
}

const formatDate = (dateString) => {
  if (!dateString) return ''

  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now - date)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 1) return 'yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`

  return date.toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const handleImageError = (event) => {
  event.target.src = 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1743087291/Designer_8_1_fjvyi0.png'
}

const createPropertyObject = (favorite) => {
  // Create a property object that FavoriteButton expects
  if (favorite.property_type === 'treb') {
    return {
      ListingKey: favorite.property_id,
      ...favorite.property_data
    }
  } else {
    return {
      id: favorite.property_id,
      ...favorite.property_data
    }
  }
}

const handleFavoriteToggle = async (data) => {
  console.log('Favorite toggled:', data)

  // Remove the property from favorites list if it was unfavorited
  if (!data.isFavorited) {
    favorites.value = favorites.value.filter(fav => {
      if (data.propertyType === 'treb') {
        return !(fav.property_id === data.property.ListingKey && fav.property_type === 'treb')
      } else {
        return !(fav.property_id === data.property.id && fav.property_type === 'local')
      }
    })
  }
}

const viewProperty = (favorite) => {
  if (favorite.property_type === 'treb') {
    // Navigate to TREB property detail
    router.push(`/property/treb/${favorite.property_id}`)
  } else {
    // Navigate to local property detail
    router.push(`/property/${favorite.property_id}`)
  }
}

// Lifecycle
onMounted(() => {
  loadFavorites()
})
</script>

<style scoped>
.my-favorites-view {
  min-height: 100vh;
  background: #f8fafc;
  padding-top: 80px; /* Account for fixed header */
}

.favorites-container {
  width: 100%;
}

.page-header {
  background: #fff;
  padding: 40px 0;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 40px;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 8px 0;
}

.page-subtitle {
  font-size: 1.1rem;
  color: #666;
  margin: 0;
}

.favorites-section {
  padding: 0 0 64px 0;
}

.boxed-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.stats-bar {
  display: flex;
  gap: 24px;
  margin-bottom: 32px;
  padding: 24px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: #0052a5;
  line-height: 1;
}

.stat-label {
  font-size: 0.9rem;
  color: #666;
  margin-top: 4px;
}

.filter-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  margin-bottom: 32px;
}

.search-box {
  position: relative;
  flex: 1;
  max-width: 400px;
}

.search-box i {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #a0aec0;
  font-size: 1rem;
}

.search-input {
  width: 100%;
  padding: 12px 16px 12px 44px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  background: #fff;
  transition: border-color 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: #0052a5;
}

.filter-buttons {
  display: flex;
  gap: 8px;
}

.filter-btn {
  padding: 8px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background: #fff;
  color: #4a5568;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-btn:hover {
  border-color: #cbd5e0;
}

.filter-btn.active {
  background: #0052a5;
  color: #fff;
  border-color: #0052a5;
}

.properties-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.property-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
  border: 1px solid #e2e8f0;
}

.property-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

.property-card__image-container {
  position: relative;
  height: 240px;
  overflow: hidden;
}

.property-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.property-card__type-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background: rgba(0, 82, 165, 0.9);
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
}

.property-card__favorite-btn {
  position: absolute;
  top: 12px;
  right: 12px;
}

.property-card__content {
  padding: 20px;
}

.property-card__title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 8px 0;
  line-height: 1.3;
}

.property-card__price {
  font-size: 1.5rem;
  font-weight: 700;
  color: #0052a5;
  margin: 0 0 12px 0;
}

.property-card__address {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 16px;
}

.property-card__address i {
  color: #0052a5;
  font-size: 0.8rem;
}

.property-card__details {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e2e8f0;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #666;
  font-size: 0.9rem;
}

.detail-item i {
  color: #0052a5;
  font-size: 1rem;
}

.property-card__meta {
  text-align: center;
}

.favorited-date {
  color: #a0aec0;
  font-size: 0.8rem;
  font-style: italic;
}

.loading-state,
.error-state,
.empty-state {
  text-align: center;
  padding: 60px 24px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #e2e8f0;
  border-top: 3px solid #0052a5;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-icon,
.empty-icon {
  font-size: 4rem;
  color: #cbd5e0;
  margin-bottom: 16px;
}

.error-state .error-icon {
  color: #dc2626;
}

.error-state h3,
.empty-state h3 {
  font-size: 1.5rem;
  color: #4a5568;
  margin: 0 0 8px 0;
}

.error-state p,
.empty-state p {
  color: #666;
  margin: 0 0 24px 0;
}

.retry-button,
.browse-button {
  display: inline-block;
  padding: 12px 24px;
  background: #0052a5;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.retry-button:hover,
.browse-button:hover {
  background: #003d7a;
}

@media (max-width: 1024px) {
  .properties-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .my-favorites-view {
    padding-top: 60px;
  }

  .page-header {
    padding: 24px 0;
    margin-bottom: 24px;
  }

  .page-title {
    font-size: 1.8rem;
  }

  .boxed-container {
    padding: 0 16px;
  }

  .stats-bar {
    flex-direction: column;
    gap: 16px;
  }

  .filter-controls {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
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
}
</style>
