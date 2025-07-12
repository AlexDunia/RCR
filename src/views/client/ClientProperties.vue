<template>
  <div @click="closeDropdowns">
    <!-- Main content area -->
    <div class="main-content">
      <!-- Keep existing hero section -->
      <div class="hero-section">
        <div class="hero-content">
          <h1>Find Your Dream Property</h1>
          <p>Browse through our curated selection of properties.</p>

          <!-- Filter buttons -->
          <div class="filter-buttons">
            <button
              v-for="(label, key) in filters"
              :key="key"
              :class="{ active: activeFilter === key }"
              @click="setFilter(key)"
            >
              {{ label }}
            </button>
          </div>
        </div>
      </div>

      <!-- Search and filters section -->
      <div class="search-filters">
        <div class="search-container">
          <i class="search-icon">⌕</i>
          <input
            type="text"
            placeholder="Search..."
            class="search-input"
            v-model="searchQuery"
            maxlength="100"
          />
          <span class="search-key">⌘ K</span>
        </div>

        <div class="filters">
          <!-- Price Range Filter -->
          <div class="price-filter-container">
            <div class="filter-dropdown" :class="{ 'active': showPriceDropdown }" @click="togglePriceDropdown">
              <span>Price Range ($)</span>
              <i class="fas fa-chevron-down"></i>
            </div>

            <!-- Price Range Dropdown -->
            <div v-if="showPriceDropdown" class="price-dropdown-menu">
              <div class="price-inputs">
                <div class="price-input-group">
                  <label>Min($):</label>
                  <input
                    type="text"
                    v-model="priceRange.min"
                    placeholder="Minimum price"
                    @click.stop
                  />
                </div>
                <div class="price-input-group">
                  <label>Max($):</label>
                  <input
                    type="text"
                    v-model="priceRange.max"
                    placeholder="Maximum price"
                    @click.stop
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Bedrooms Filter -->
          <div class="bedrooms-filter-container">
            <div class="filter-dropdown" :class="{ 'active': showBedroomsDropdown }" @click="toggleBedroomsDropdown">
              <span>{{ activeFilters.bedrooms ? `${activeFilters.bedrooms} Bedroom${activeFilters.bedrooms !== '1' ? 's' : ''}` : 'Bedrooms' }}</span>
              <i class="fas fa-chevron-down"></i>
            </div>

            <!-- Bedrooms Dropdown -->
            <div v-if="showBedroomsDropdown" class="bedrooms-dropdown-menu">
              <div class="bedrooms-options">
                <div
                  v-for="option in bedroomOptions"
                  :key="option.value"
                  class="bedroom-option"
                  :class="{ 'selected': activeFilters.bedrooms === option.value }"
                  @click="selectBedrooms(option)"
                >
                  {{ option.label }}
                </div>
              </div>
            </div>
          </div>

          <!-- Property Type Filter -->
          <div class="property-type-filter-container">
            <div class="filter-dropdown" :class="{ 'active': showPropertyTypeDropdown }" @click="togglePropertyTypeDropdown">
              <span>{{ getPropertyTypeLabel() }}</span>
              <i class="fas fa-chevron-down"></i>
            </div>
          </div>

          <!-- Location Filter -->
          <div class="location-filter-container">
            <div class="filter-dropdown" :class="{ 'active': showLocationDropdown }" @click="toggleLocationDropdown">
              <span>{{ getSelectedLocationDisplay() }}</span>
              <i class="fas fa-chevron-down"></i>
            </div>

            <!-- Location Dropdown -->
            <div v-if="showLocationDropdown" class="location-dropdown-menu">
              <div class="location-search">
                <input
                  type="text"
                  v-model="locationSearchQuery"
                  placeholder="Search countries..."
                  @click.stop
                  class="location-search-input"
                />
              </div>
              <div class="suggested-countries">
                <div class="suggested-header">Suggested Countries</div>
                <div
                  v-for="country in filteredCountries"
                  :key="country.code"
                  class="country-option"
                  :class="{ 'selected': selectedLocation && selectedLocation.code === country.code }"
                  @click.stop="selectLocation(country)"
                >
                  <span class="country-flag">{{ country.flag }}</span>
                  <span class="country-name">{{ country.name }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Active filters -->
      <div class="active-filters-container" v-if="activeFilterCount > 0">
        <div class="active-filters-header">
          <span>Active filters:</span>
          <button class="clear-all-btn" @click="clearFilter('all')">Clear all</button>
        </div>
        <div class="active-filters-tags">
          <!-- Price filter tag -->
          <div class="filter-tag" v-if="activeFilters.price">
            <span>Price: {{ priceRange.min ? formatPrice(priceRange.min) : '$0' }} - {{ priceRange.max ? formatPrice(priceRange.max) : 'Any' }}</span>
            <button class="remove-tag" @click="clearFilter('price')" title="Remove price filter">×</button>
          </div>

          <!-- Bedrooms filter tag -->
          <div class="filter-tag" v-if="activeFilters.bedrooms">
            <span>Bedrooms: {{ activeFilters.bedrooms === '5+' ? '5+ Bedrooms' : `${activeFilters.bedrooms} Bedroom${activeFilters.bedrooms !== '1' ? 's' : ''}` }}</span>
            <button class="remove-tag" @click="() => { activeFilters.bedrooms = null; updateURL(); }" title="Remove bedrooms filter">×</button>
          </div>

          <!-- Property type filter tags -->
          <div v-if="activeFilters.propertyType && activeFilters.propertyType.length > 0" class="filter-tag">
            <span>Property type: {{ getPropertyTypeLabels(activeFilters.propertyType).join(', ') }}</span>
            <button class="remove-tag" @click="clearFilter('propertyType')" title="Remove property type filter">×</button>
          </div>

          <!-- Location filter tag -->
          <div v-if="activeFilters.location" class="filter-tag">
            <span>Location: {{ selectedLocation ? `${selectedLocation.flag} ${selectedLocation.name}` : activeFilters.location }}</span>
            <button class="remove-tag" @click="clearFilter('location')" title="Remove location filter">×</button>
          </div>

          <!-- Category filter tag -->
          <div class="filter-tag" v-if="activeFilter !== 'all'">
            <span>Category: {{ filters[activeFilter] }}</span>
            <button class="remove-tag" @click="setFilter('all')" title="Remove category filter">×</button>
          </div>
        </div>
      </div>

      <!-- Property listings -->
      <div class="properties-container">
        <transition-group name="property-list" tag="div" class="properties-grid">
          <div v-for="property in displayProperties" :key="property.id" class="property-card">
            <div class="property-image" :class="{ 'skeleton-loading': property.isLoading }">
              <div v-if="property.isLoading" class="image-skeleton"></div>
              <img v-else :src="property.image" :alt="property.name" />
              <button
                v-if="!property.isLoading"
                class="favorite-btn"
                @click.stop="toggleSaveProperty(property.id)"
                :class="{ 'saved': isSaved(property.id) }"
              >
                <i :class="isSaved(property.id) ? 'fas fa-heart' : 'far fa-heart'"></i>
              </button>
            </div>
            <div class="property-info" :class="{ 'skeleton-loading': property.isLoading }">
              <h3>{{ property.name }}</h3>
              <p class="location">{{ property.location }}</p>
              <p class="price">{{ property.price }}</p>
              <button class="view-btn" @click="viewProperty(property.id)">View Details</button>
            </div>
          </div>

          <!-- No results message -->
          <div v-if="!isLoading && properties.length === 0" key="no-results" class="no-results">
            <div class="no-results-content">
              <svg class="no-results-icon" width="45" height="45" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 10.8889L12 4L3 10.8889" stroke="#94A3B8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M5 9.5V19C5 19.5523 5.44772 20 6 20H18C18.5523 20 19 19.5523 19 19V9.5" stroke="#94A3B8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>

              <h3>No properties found</h3>
              <p v-if="activeFilterCount > 0">
                Your filters may be too restrictive.
              </p>
              <p v-else>
                There are no properties listed at the moment.
              </p>

              <div v-if="activeFilterCount > 0" class="no-results-actions">
                <button class="reset-filters-btn" @click="clearFilter('all')">
                  Reset All Filters
                </button>
              </div>
            </div>
          </div>
        </transition-group>
      </div>
    </div>

    <!-- Property Type Modal -->
    <teleport to="body" v-if="showPropertyTypeDropdown">
      <div class="property-type-modal-overlay" @click="handleOverlayClick">
        <div class="property-type-modal" @click.stop>
          <div class="modal-header">
            <h3>Select Property Type</h3>
            <button class="close-button" @click="cancelPropertyTypeSelection">×</button>
          </div>
          <div class="property-type-categories">
            <div v-for="(category, key) in propertyTypes" :key="key" class="property-type-category">
              <div class="category-label">{{ category.label }}</div>
              <div class="property-type-options">
                <label v-for="option in category.options" :key="option.value" class="property-option">
                  <input
                    type="checkbox"
                    :value="option.value"
                    v-model="selectedPropertyTypes"
                    @change="togglePropertyType(option.value)"
                  >
                  <span class="custom-checkbox"></span>
                  <span class="option-label">{{ option.label }}</span>
                </label>
              </div>
            </div>
          </div>
          <div class="property-type-actions">
            <button @click="closePropertyTypeModal">Apply</button>
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useListingStore } from '@/stores/listingStore';
import { useClientStore } from '@/stores/clientStore';
import { useLayoutStore } from '@/stores/layout';
import { debounce } from 'lodash-es';

defineOptions({
  name: 'ClientPropertiesView'
});

const router = useRouter();
const route = useRoute();
const listingStore = useListingStore();
const clientStore = useClientStore();
const layoutStore = useLayoutStore();

// Get client ID from store or route
const clientId = computed(() => clientStore.getCurrentClientId());

// Filter options - validated options only
const filters = {
  all: 'All properties',
  sale: 'For sale',
  rent: 'For rent',
  new: 'New listings'
};

// Valid filter keys for validation
const VALID_FILTERS = Object.keys(filters);

// Property type options
const propertyTypes = {
  residential: {
    label: 'Residential',
    options: [
      { value: 'houses', label: 'Houses' },
      { value: 'apartments', label: 'Apartments' },
      { value: 'condos', label: 'Condos' }
    ]
  },
  commercial: {
    label: 'Commercial',
    options: [
      { value: 'office_space', label: 'Office space' },
      { value: 'retail_stores', label: 'Retail stores' },
      { value: 'warehouse', label: 'Warehouse' }
    ]
  },
  land: {
    label: 'Land',
    options: [
      { value: 'plots', label: 'Plots(Urban or Rural)' },
      { value: 'agricultural', label: 'Agricultural land' },
      { value: 'warehouse_land', label: 'Warehouse' }
    ]
  },
  other: {
    label: 'Other (optional)',
    options: [
      { value: 'vacation_homes', label: 'Vacation homes' },
      { value: 'multi_family', label: 'Multi-family homes (duplexes, triplexes).' },
      { value: 'specialty', label: 'Specialty properties (e.g., farms, vineyards).' }
    ]
  }
};

// Create a flat map of all valid property types for validation
const VALID_PROPERTY_TYPES = Object.values(propertyTypes).reduce((acc, category) => {
  category.options.forEach(option => {
    acc.push(option.value);
  });
  return acc;
}, []);

// Search and filter states
const searchQuery = ref('');
const activeFilter = ref('all');
const locationSearchQuery = ref('');

// Dropdown visibility states
const showPriceDropdown = ref(false);
const showBedroomsDropdown = ref(false);
const showPropertyTypeDropdown = ref(false);
const showLocationDropdown = ref(false);

// Selected values
const selectedPropertyTypes = ref([]);
const selectedLocation = ref(null);

// Price range values with validation
const priceRange = ref({
  min: '',
  max: '',
  validation: {
    min: { error: '', valid: true },
    max: { error: '', valid: true }
  }
});

// Active filters state
const activeFilters = ref({
  price: false,
  bedrooms: null,
  propertyType: null,
  location: null
});

// Bedrooms options
const bedroomOptions = [
  { value: '1', label: 'One' },
  { value: '2', label: 'Two' },
  { value: '3', label: 'Three' },
  { value: '4', label: 'Four' },
  { value: '5+', label: 'Others (5+ years)' }
];

// Valid bedroom options for validation
const VALID_BEDROOM_OPTIONS = bedroomOptions.map(opt => opt.value);

// Countries data with flags
const countries = [
  { code: 'GB', name: 'London, United Kingdom', flag: '🇬🇧' },
  { code: 'NG', name: 'Lekki, Nigeria', flag: '🇳🇬' },
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' }
];

// Create a map of valid country codes for validation
const VALID_COUNTRY_CODES = countries.reduce((acc, country) => {
  acc[country.code] = true;
  return acc;
}, {});

// Loading state
const isLoading = ref(false);

// Rate limiting state
const isRateLimited = ref(false);
const lastRequestTime = ref(0);
const MIN_REQUEST_INTERVAL = 500; // milliseconds

// Computed Properties
const filteredCountries = computed(() => {
  if (!locationSearchQuery.value) return countries;
  const query = locationSearchQuery.value.toLowerCase();
  return countries.filter(country =>
    country.name.toLowerCase().includes(query)
  );
});

// Calculate filtered properties based on active filter
const properties = computed(() => {
  let filtered = listingStore.getAllListings();

  try {
    // Apply category filter
    switch(activeFilter.value) {
      case 'sale':
        filtered = filtered.filter(p => {
          const price = parseInt(p.price?.replace(/[^0-9]/g, ''), 10) || 0;
          return price > 40000;
        });
        break;
      case 'rent':
        filtered = filtered.filter(p => {
          const price = parseInt(p.price?.replace(/[^0-9]/g, ''), 10) || 0;
          return price <= 40000;
        });
        break;
      case 'new':
        filtered = filtered.slice(-3);
        break;
    }

    // Apply price range filter
    if (priceRange.value.min) {
      const minPrice = parseInt(priceRange.value.min.replace(/,/g, ''), 10);
      filtered = filtered.filter(p => {
        const price = parseInt(p.price?.replace(/[^0-9]/g, ''), 10) || 0;
        return price >= minPrice;
      });
    }

    if (priceRange.value.max) {
      const maxPrice = parseInt(priceRange.value.max.replace(/,/g, ''), 10);
      filtered = filtered.filter(p => {
        const price = parseInt(p.price?.replace(/[^0-9]/g, ''), 10) || 0;
        return price <= maxPrice;
      });
    }

    // Apply bedrooms filter
    if (activeFilters.value.bedrooms) {
      if (activeFilters.value.bedrooms === '5+') {
        filtered = filtered.filter(p => parseInt(p.bedrooms, 10) >= 5);
      } else {
        filtered = filtered.filter(p => p.bedrooms === activeFilters.value.bedrooms);
      }
    }

    // Apply property type filter
    if (activeFilters.value.propertyType && activeFilters.value.propertyType.length > 0) {
      filtered = filtered.filter(p => {
        return activeFilters.value.propertyType.some(type => {
          return p.propertyType === type || p.type === type;
        });
      });
    }

    // Apply location filter
    if (activeFilters.value.location) {
      const locationSearch = activeFilters.value.location.toLowerCase();
      filtered = filtered.filter(p => {
        return p.location?.toLowerCase().includes(locationSearch) ||
               p.country?.toLowerCase().includes(locationSearch) ||
               p.city?.toLowerCase().includes(locationSearch);
      });
    }

    // Apply search query
    if (searchQuery.value.trim()) {
      const query = searchQuery.value.toLowerCase().trim();
      filtered = filtered.filter(p =>
        p.name?.toLowerCase().includes(query) ||
        p.location?.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query)
      );
    }
  } catch (e) {
    console.error('Error filtering properties:', e);
    return [];
  }

  return filtered;
});

// Count active filters
const activeFilterCount = computed(() => {
  let count = 0;
  if (activeFilters.value.price) count++;
  if (activeFilters.value.bedrooms) count++;
  if (activeFilters.value.propertyType) count++;
  if (activeFilters.value.location) count++;
  if (activeFilter.value !== 'all') count++;
  return count;
});

// Methods
const setFilter = (filter) => {
  if (!VALID_FILTERS.includes(filter)) {
    console.error('Invalid filter attempted:', filter);
    return;
  }

  if (isRateLimited.value) return;

  isLoading.value = true;
  activeFilter.value = filter;
  applyFilters();
  updateURL();
};

const clearFilter = (filterType) => {
  if (isRateLimited.value) return;

  isLoading.value = true;

  if (filterType === 'price') {
    priceRange.value.min = '';
    priceRange.value.max = '';
    activeFilters.value.price = false;
    priceRange.value.validation.min = { error: '', valid: true };
    priceRange.value.validation.max = { error: '', valid: true };
  } else if (filterType === 'propertyType') {
    selectedPropertyTypes.value = [];
    activeFilters.value.propertyType = null;
  } else if (filterType === 'location') {
    selectedLocation.value = null;
    activeFilters.value.location = null;
  } else if (filterType === 'all') {
    priceRange.value.min = '';
    priceRange.value.max = '';
    activeFilters.value.price = false;
    priceRange.value.validation.min = { error: '', valid: true };
    priceRange.value.validation.max = { error: '', valid: true };
    activeFilters.value.bedrooms = null;
    activeFilters.value.propertyType = null;
    activeFilters.value.location = null;
    activeFilter.value = 'all';
    selectedPropertyTypes.value = [];
    selectedLocation.value = null;
  }

  applyFilters();
  updateURL();
};

const togglePriceDropdown = () => {
  showPriceDropdown.value = !showPriceDropdown.value;
  showBedroomsDropdown.value = false;
  showPropertyTypeDropdown.value = false;
  showLocationDropdown.value = false;
};

const toggleBedroomsDropdown = () => {
  showBedroomsDropdown.value = !showBedroomsDropdown.value;
  showPriceDropdown.value = false;
  showPropertyTypeDropdown.value = false;
  showLocationDropdown.value = false;
};

const togglePropertyTypeDropdown = () => {
  showPropertyTypeDropdown.value = !showPropertyTypeDropdown.value;
  showPriceDropdown.value = false;
  showBedroomsDropdown.value = false;
  showLocationDropdown.value = false;
};

const toggleLocationDropdown = () => {
  showLocationDropdown.value = !showLocationDropdown.value;
  showPriceDropdown.value = false;
  showBedroomsDropdown.value = false;
  showPropertyTypeDropdown.value = false;

  if (showLocationDropdown.value) {
    locationSearchQuery.value = '';
  }
};

const selectBedrooms = (option) => {
  if (!VALID_BEDROOM_OPTIONS.includes(option.value)) {
    console.error('Invalid bedroom option:', option);
    return;
  }

  if (isRateLimited.value) return;

  isLoading.value = true;
  activeFilters.value.bedrooms = option.value;
  showBedroomsDropdown.value = false;
  applyFilters();
  updateURL();
};

const selectLocation = (country) => {
  if (!country || !VALID_COUNTRY_CODES[country.code]) {
    console.error('Invalid country selection attempted:', country);
    return;
  }

  isLoading.value = true;
  selectedLocation.value = country;
  activeFilters.value.location = country.name;
  showLocationDropdown.value = false;
  applyFilters();
  updateURL();
};

const togglePropertyType = (value) => {
  if (!VALID_PROPERTY_TYPES.includes(value)) {
    console.error('Invalid property type attempted:', value);
    return;
  }

  const index = selectedPropertyTypes.value.indexOf(value);
  if (index === -1) {
    selectedPropertyTypes.value.push(value);
  } else {
    selectedPropertyTypes.value.splice(index, 1);
  }
};

const updatePropertyType = () => {
  const validSelections = selectedPropertyTypes.value.filter(type =>
    VALID_PROPERTY_TYPES.includes(type)
  );

  if (validSelections.length > 0) {
    activeFilters.value.propertyType = [...validSelections];
  } else {
    activeFilters.value.propertyType = null;
  }

  isLoading.value = true;
  applyFilters();
  updateURL();
};

const closePropertyTypeModal = () => {
  updatePropertyType();
  showPropertyTypeDropdown.value = false;
};

const cancelPropertyTypeSelection = () => {
  selectedPropertyTypes.value = activeFilters.value.propertyType || [];
  showPropertyTypeDropdown.value = false;
};

const getPropertyTypeLabel = () => {
  return 'Property type';
};

const getSelectedLocationDisplay = () => {
  if (!selectedLocation.value) return 'Location';
  return selectedLocation.value.name;
};

const getPropertyTypeLabels = (selectedValues) => {
  if (!selectedValues || selectedValues.length === 0) return [];

  const labels = [];
  selectedValues.forEach(value => {
    for (const category in propertyTypes) {
      const option = propertyTypes[category].options.find(opt => opt.value === value);
      if (option) {
        labels.push(option.label);
        break;
      }
    }
  });

  return labels;
};

const formatPrice = (price) => {
  return price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  });
};

const viewProperty = (propertyId) => {
  router.push(`/client/properties/${propertyId}`);
};

const isSaved = (propertyId) => {
  const clientDetails = clientStore.getClientFullDetails(clientId);
  return clientDetails?.interactions?.mostSavedListings?.some(l => l.id === propertyId) || false;
};

const toggleSaveProperty = (propertyId) => {
  if (isSaved(propertyId)) {
    clientStore.removeSavedListing(clientId, propertyId);
  } else {
    clientStore.saveListingForClient(clientId, propertyId);
  }
};

// Apply filters with debounce
const applyFilters = debounce(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 500);
}, 300);

// Update URL with current filters
const updateURL = () => {
  if (isRateLimited.value) return;

  const query = {};

  if (priceRange.value.min) {
    query.minPrice = priceRange.value.min;
  }

  if (priceRange.value.max) {
    query.maxPrice = priceRange.value.max;
  }

  if (activeFilter.value !== 'all') {
    query.category = activeFilter.value;
  }

  if (activeFilters.value.bedrooms) {
    query.bedrooms = activeFilters.value.bedrooms;
  }

  if (activeFilters.value.propertyType && activeFilters.value.propertyType.length > 0) {
    query.propertyType = activeFilters.value.propertyType;
  }

  if (activeFilters.value.location) {
    query.location = activeFilters.value.location;
  }

  router.replace({ query });
};

// Initialize filters from URL
const initializeFiltersFromURL = () => {
  const query = route.query;

  if (query.minPrice) {
    priceRange.value.min = query.minPrice;
  }

  if (query.maxPrice) {
    priceRange.value.max = query.maxPrice;
  }

  if (query.category && VALID_FILTERS.includes(query.category)) {
    activeFilter.value = query.category;
  }

  if (query.bedrooms && VALID_BEDROOM_OPTIONS.includes(query.bedrooms)) {
    activeFilters.value.bedrooms = query.bedrooms;
  }

  if (query.propertyType) {
    const types = Array.isArray(query.propertyType) ? query.propertyType : [query.propertyType];
    const validTypes = types.filter(type => VALID_PROPERTY_TYPES.includes(type));
    if (validTypes.length > 0) {
      selectedPropertyTypes.value = validTypes;
      activeFilters.value.propertyType = validTypes;
    }
  }

  if (query.location) {
    const foundCountry = countries.find(c => c.name === query.location);
    if (foundCountry) {
      selectedLocation.value = foundCountry;
      activeFilters.value.location = foundCountry.name;
    }
  }
};

// Watch for filter changes
watch([activeFilter, activeFilters], () => {
  updateURL();
}, { deep: true });

// Initialize on mount
onMounted(() => {
  initializeFiltersFromURL();
  layoutStore.setHeaderVisibility(false);
});

onUnmounted(() => {
  layoutStore.setHeaderVisibility(true);
});

// Create computed property for display properties with loading state
const displayProperties = computed(() => {
  if (isLoading.value) {
    const propertyCount = Math.max(properties.value.length, 6);
    return Array(propertyCount).fill().map((_, i) => ({
      id: `loading-${i}`,
      isLoading: true,
      name: '',
      location: '',
      price: '',
      image: ''
    }));
  }
  return properties.value.map(prop => ({ ...prop, isLoading: false }));
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

.client-properties {
  min-height: 100vh;
  background: #fff;
  font-family: 'Poppins', sans-serif;
}

.hero-section {
  position: relative;
  height: 240px;
  border-radius: 12px;
  margin-bottom: 30px;
  overflow: hidden;
  display: flex;
  align-items: center;
  background-image: linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)),
                    url('https://res.cloudinary.com/dnuhjsckk/image/upload/v1743087291/Designer_8_1_fjvyi0.png');
  background-size: cover;
  background-position: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

.hero-content {
  width: 100%;
  padding: 0 40px;
  color: white;
  z-index: 1;
}

.hero-content h1 {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 8px;
}

.hero-content p {
  font-size: 16px;
  margin-bottom: 30px;
  font-weight: 400;
}

.filter-buttons {
  display: flex;
  gap: 16px;
}

.filter-buttons button {
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
  font-weight: 500;
}

.filter-buttons button.active {
  background-color: #0066ff;
  border-color: #0066ff;
}

.filter-buttons button:hover:not(.active) {
  background-color: rgba(255, 255, 255, 0.1);
}

/* Search and filters */
.search-filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 20px;
}

.search-container {
  position: relative;
  width: 100%;
  max-width: 300px;
  display: flex;
  align-items: center;
  background-color: #f8f8f8;
  border-radius: 6px;
  padding: 0 12px;
}

.search-icon {
  font-size: 20px;
  color: #888;
  margin-right: 8px;
  font-style: normal;
}

.search-input {
  flex: 1;
  padding: 12px 35px 12px 0;
  border: none;
  background: transparent;
  font-size: 14px;
  outline: none;
}

.search-key {
  position: absolute;
  right: 12px;
  background-color: #f1f5f9;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
  color: #64748b;
}

.filters {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.filter-dropdown {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 8px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  color: #64748b;
  background-color: white;
  min-width: 140px;
}

.filter-dropdown i {
  font-size: 12px;
}

/* Property grid */
.properties-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.property-card {
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  background-color: white;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid #eaeaea;
}

.property-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1);
}

.property-image {
  height: 200px;
  position: relative;
  overflow: hidden;
}

.property-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.property-card:hover .property-image img {
  transform: scale(1.05);
}

.favorite-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 36px;
  height: 36px;
  background: white;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

.favorite-btn:hover {
  transform: scale(1.1);
}

.favorite-btn.saved {
  background-color: #ef4444;
  color: white;
}

.property-info {
  padding: 18px;
}

.property-info h3 {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 8px;
  color: #333;
}

.location {
  color: #666;
  font-size: 14px;
  margin: 0 0 12px;
}

.price {
  font-weight: 700;
  font-size: 20px;
  color: #0066ff;
  margin: 0 0 16px;
}

.view-btn {
  width: 100%;
  padding: 10px;
  background-color: white;
  color: #0066ff;
  border: 1px solid #0066ff;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.view-btn:hover {
  background-color: #0066ff;
  color: white;
}

/* Dropdown menus */
.price-dropdown-menu,
.bedrooms-dropdown-menu,
.location-dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  width: 240px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  z-index: 100;
  margin-top: 8px;
  border: 1px solid #e2e8f0;
  padding: 8px 0;
}

.price-dropdown-menu {
  width: 320px;
  padding: 16px;
}

.price-inputs {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.price-input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.price-input-group label {
  font-size: 14px;
  color: #64748b;
  font-weight: 500;
}

.price-input-group input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  transition: all 0.2s;
}

.price-input-group input:focus {
  border-color: #0066ff;
  box-shadow: 0 0 0 2px rgba(0, 102, 255, 0.1);
}

.bedrooms-options {
  max-height: 300px;
  overflow-y: auto;
}

.bedroom-option {
  padding: 10px 16px;
  font-size: 14px;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s ease;
}

.bedroom-option:hover {
  background-color: #f8fafc;
  color: #0066ff;
}

.bedroom-option.selected {
  background-color: #f0f7ff;
  color: #0066ff;
}

/* Location dropdown */
.location-dropdown-menu {
  width: 320px;
}

.location-search {
  padding: 12px 16px;
  border-bottom: 1px solid #e2e8f0;
}

.location-search-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
}

.suggested-countries {
  max-height: 300px;
  overflow-y: auto;
}

.suggested-header {
  padding: 12px 16px;
  font-size: 12px;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.country-option {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.country-option:hover {
  background-color: #f8fafc;
}

.country-option.selected {
  background-color: #f0f7ff;
  color: #0066ff;
}

.country-flag {
  font-size: 20px;
}

.country-name {
  font-size: 14px;
  color: #64748b;
}

/* Property Type Modal */
.property-type-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.property-type-modal {
  width: 550px;
  max-width: 90vw;
  max-height: 90vh;
  background: white;
  border-radius: 12px;
  overflow: hidden;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #e2e8f0;
}

.modal-header h3 {
  font-size: 18px;
  font-weight: 500;
  color: #1e293b;
  margin: 0;
}

.close-button {
  background: none;
  border: none;
  color: #64748b;
  font-size: 24px;
  cursor: pointer;
  padding: 4px;
  line-height: 1;
}

.property-type-categories {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-height: calc(90vh - 140px);
  overflow-y: auto;
}

.property-type-category {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.category-label {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
}

.property-type-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.property-option {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
}

.property-option input[type="checkbox"] {
  display: none;
}

.custom-checkbox {
  width: 20px;
  height: 20px;
  border: 2px solid #e2e8f0;
  border-radius: 4px;
  position: relative;
  transition: all 0.2s ease;
}

.property-option:hover .custom-checkbox {
  border-color: #0066ff;
}

.property-option input[type="checkbox"]:checked + .custom-checkbox {
  background-color: #0066ff;
  border-color: #0066ff;
}

.property-option input[type="checkbox"]:checked + .custom-checkbox::after {
  content: '';
  position: absolute;
  left: 6px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.option-label {
  font-size: 14px;
  color: #64748b;
}

.property-type-actions {
  padding: 16px 20px;
  border-top: 1px solid #e2e8f0;
  display: flex;
  justify-content: flex-end;
}

.property-type-actions button {
  background-color: #0066ff;
  color: white;
  border: none;
  padding: 10px 24px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.property-type-actions button:hover {
  background-color: #0052cc;
}

/* Active filters */
.active-filters-container {
  margin-bottom: 24px;
  padding: 16px;
  background: white;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.active-filters-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.active-filters-header span {
  font-size: 14px;
  color: #64748b;
  font-weight: 500;
}

.clear-all-btn {
  background: none;
  border: none;
  color: #0066ff;
  font-size: 14px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
}

.clear-all-btn:hover {
  background-color: #f0f7ff;
}

.active-filters-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.filter-tag {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  background-color: #f8fafc;
  border-radius: 6px;
  font-size: 14px;
  color: #64748b;
}

.remove-tag {
  background: none;
  border: none;
  color: #94a3b8;
  font-size: 16px;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
}

.remove-tag:hover {
  background-color: #e2e8f0;
  color: #64748b;
}

/* No results */
.no-results {
  grid-column: 1 / -1;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 280px;
  background-color: #f9fafb;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.no-results-content {
  text-align: center;
  padding: 40px;
  max-width: 350px;
}

.no-results-icon {
  margin-bottom: 16px;
}

.no-results-content h3 {
  font-size: 18px;
  font-weight: 500;
  color: #1e293b;
  margin-bottom: 8px;
}

.no-results-content p {
  font-size: 14px;
  color: #64748b;
  margin-bottom: 16px;
}

.reset-filters-btn {
  background-color: #0066ff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
}

/* Loading states */
.skeleton-loading {
  position: relative;
  overflow: hidden;
}

.skeleton-loading::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.5) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  animation: shimmer 1.5s infinite;
}

.image-skeleton {
  width: 100%;
  height: 100%;
  background-color: #f1f5f9;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .hero-section {
    height: 280px;
  }

  .search-filters {
    flex-direction: column;
    align-items: flex-start;
  }

  .search-container {
    max-width: 100%;
  }

  .filters {
    width: 100%;
    justify-content: space-between;
  }

  .filter-dropdown {
    flex: 1;
    min-width: 100px;
  }
}

@media (max-width: 480px) {
  .filter-buttons {
    flex-wrap: wrap;
  }

  .filters {
    flex-wrap: wrap;
  }

  .filter-dropdown {
    width: calc(50% - 8px);
  }
}
</style>
