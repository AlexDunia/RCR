<template>
  <div class="listings-container">
    <div class="content-area">
      <div class="header">
        <div class="header-content">
          <h2>Your properties</h2>
          <p>A list of all properties on your profile</p>
        </div>
        <div class="search">
          <input
            type="search"
            v-model="searchQuery"
            placeholder="Search properties..."
            @input="handleSearch"
            @keydown.enter.prevent="handleSearch"
            :disabled="isSearching"
            maxlength="100"
          />
          <span class="search-icon" :class="{ 'searching': isSearching }">
            {{ isSearching ? '⌛' : '⌘K' }}
          </span>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isSearching" class="search-loading">
        <div class="loading-spinner"></div>
        <p>Searching properties...</p>
      </div>

      <!-- No Results State -->
      <div v-else-if="searchQuery && !filteredProperties.length" class="no-results">
        <div class="no-results-content">
          <span class="no-results-icon">🔍</span>
          <h3>No properties found</h3>
          <p>No properties match your search "{{ searchQuery }}"</p>
        </div>
      </div>

      <!-- Property Grid -->
      <div v-else class="property-grid">
        <TransitionGroup name="property-list">
          <div
            v-for="property in filteredProperties"
            :key="property.id"
            class="property-card"
          >
            <div class="property-image">
              <img :src="property.image" :alt="property.name" />
              <button
                class="edit-button"
                @click="handleEdit(property.id)"
                :title="'Edit ' + property.name"
              >
                ✏️
              </button>
            </div>
            <div class="property-info">
              <h3 class="property-name">{{ property.name }}</h3>
              <p class="property-location">{{ property.location }}</p>
            </div>
          </div>
        </TransitionGroup>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useDebounce } from '@/composables/useDebounce';
import { sanitizeInput } from '@/utils/security';

// Mock data - Replace with API calls in production
const properties = ref([
  {
    id: 1,
    name: 'Cedar Grove Estates',
    location: 'Austin, Texas',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2075&q=80'
  },
  {
    id: 2,
    name: 'Willow Creek Villa',
    location: 'Boulder, Colorado',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2053&q=80'
  },
  {
    id: 3,
    name: 'Willow Creek Villa',
    location: 'Boulder, Colorado',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2053&q=80'
  }
]);

const searchQuery = ref('');
const isSearching = ref(false);
const searchError = ref(null);

// Debounce search to prevent excessive API calls
const debouncedSearch = useDebounce(async (query) => {
  try {
    if (!query.trim()) {
      return;
    }

    isSearching.value = true;
    searchError.value = null;

    // Sanitize input to prevent XSS
    const sanitizedQuery = sanitizeInput(query);

    // In production, this would be an API call
    // const response = await searchProperties(sanitizedQuery);

    // For now, we're using client-side filtering
    // The sanitizedQuery is used in the computed property
    searchQuery.value = sanitizedQuery;

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

  } catch (error) {
    searchError.value = 'An error occurred while searching';
    console.error('Search error:', error);
  } finally {
    isSearching.value = false;
  }
}, 300);

// Computed properties for filtered results
const filteredProperties = computed(() => {
  if (!searchQuery.value.trim()) {
    return properties.value;
  }

  const query = searchQuery.value.toLowerCase();
  return properties.value.filter(property =>
    property.name.toLowerCase().includes(query) ||
    property.location.toLowerCase().includes(query)
  );
});

// Search handler with input validation
const handleSearch = async () => {
  const query = searchQuery.value.trim();

  // Input validation
  if (query.length > 100) {
    searchError.value = 'Search query is too long';
    return;
  }

  await debouncedSearch(query);
};

// Edit handler
const handleEdit = (propertyId) => {
  // Will be implemented when backend is ready
  console.log('Edit property:', propertyId);
};

// Lifecycle hooks
onMounted(() => {
  // Future API call to fetch initial properties
  // fetchProperties();
});
</script>

<style scoped>
.listings-container {
  padding: 32px 24px;
  margin: 0 auto;
  background-color: #F9FAFB;
  min-height: 100vh;
}

.content-area {
  margin-top: 0;
  max-width: 960px;
  margin: 0 auto;
  padding: 0 16px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  padding: 0 8px;
}

.header-content h2 {
  font-size: 20px;
  font-weight: 500;
  color: #111827;
  margin: 0 0 8px 0;
  letter-spacing: -0.2px;
}

.header-content p {
  font-size: 14px;
  color: #0066FF;
  margin: 0;
  letter-spacing: -0.1px;
}

.search {
  position: relative;
  width: 320px;
}

.search input {
  width: 100%;
  padding: 12px 16px;
  padding-right: 44px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background-color: #F5F5F5;
  font-size: 14px;
  transition: all 0.2s ease;
}

.search input:focus {
  outline: none;
  border-color: #0066FF;
  background-color: #FFFFFF;
  box-shadow: 0 0 0 3px rgba(0, 102, 255, 0.1);
}

.search input::placeholder {
  color: #6B7280;
}

.search-icon {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #6B7280;
  font-size: 16px;
}

.property-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 24px;
  padding: 8px;
}

.property-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #E5E7EB;
  position: relative;
  max-width: 280px;
  margin: 0 auto;
  width: 100%;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.property-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.property-image {
  position: relative;
  width: 100%;
  height: 160px;
  overflow: hidden;
}

.property-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.edit-button {
  position: absolute;
  top: 12px;
  right: 12px;
  background: white;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.property-info {
  padding: 16px;
}

.property-name {
  font-size: 15px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 8px 0;
  letter-spacing: -0.1px;
}

.property-location {
  font-size: 13px;
  color: #6B7280;
  margin: 0;
  letter-spacing: -0.1px;
}

@media (max-width: 768px) {
  .listings-container {
    padding: 24px 16px;
  }

  .content-area {
    padding: 0 8px;
  }

  .header {
    flex-direction: column;
    align-items: stretch;
    gap: 24px;
    margin-bottom: 32px;
  }

  .search {
    width: 100%;
  }

  .property-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    padding: 4px;
  }
}

@media (max-width: 640px) {
  .listings-container {
    padding: 16px 12px;
  }

  .property-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .property-card {
    max-width: 100%;
  }

  .no-results, .search-loading {
    margin: 16px 4px;
    padding: 60px 0;
  }
}

/* New styles for search functionality */
.search input:disabled {
  background-color: #f3f4f6;
  cursor: not-allowed;
}

.search-icon.searching {
  animation: spin 1s infinite linear;
}

.search-loading {
  text-align: center;
  padding: 80px 0;
  background: #FFFFFF;
  border-radius: 12px;
  margin: 24px 8px;
  border: 1px solid #E5E7EB;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #f3f4f6;
  border-top-color: #0066FF;
  border-radius: 50%;
  margin: 0 auto 16px;
  animation: spin 1s infinite linear;
}

.no-results {
  text-align: center;
  padding: 80px 0;
  background: #FFFFFF;
  border-radius: 12px;
  margin: 24px 8px;
  border: 1px solid #E5E7EB;
}

.no-results-content {
  max-width: 300px;
  margin: 0 auto;
}

.no-results-icon {
  font-size: 32px;
  margin-bottom: 16px;
  display: block;
}

.no-results h3 {
  font-size: 18px;
  color: #111827;
  margin: 0 0 8px;
}

.no-results p {
  font-size: 14px;
  color: #6B7280;
  margin: 0;
}

/* Transition animations */
.property-list-enter-active,
.property-list-leave-active {
  transition: all 0.3s ease;
}

.property-list-enter-from,
.property-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Error state */
.search-error {
  color: #dc2626;
  font-size: 14px;
  margin-top: 8px;
}
</style>
