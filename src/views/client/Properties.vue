<template>
  <div class="client-properties" @click="closeDropdowns">
    <div class="hero-section">
      <div class="hero-content">
        <h1>Find Your Dream Home</h1>
        <p>Browse through our curated selection of properties</p>
        <div class="filter-buttons">
          <button
            :class="{ active: isFilterActive('all') }"
            @click="setFilter('all')"
          >All Properties</button>
          <button
            :class="{ active: isFilterActive('buy') }"
            @click="setFilter('buy')"
          >For Sale</button>
          <button
            :class="{ active: isFilterActive('rent') }"
            @click="setFilter('rent')"
          >For Rent</button>
        </div>
      </div>
    </div>

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

        <div class="property-type-filter-container">
          <div class="filter-dropdown" :class="{ 'active': showPropertyTypeDropdown }" @click="togglePropertyTypeDropdown">
            <span>{{ getPropertyTypeLabel() }}</span>
            <i class="fas fa-chevron-down"></i>
          </div>
        </div>

        <div class="price-filter-container">
          <div class="filter-dropdown" :class="{ 'active': showPriceDropdown }" @click="togglePriceDropdown">
            <span>{{ getPriceRangeLabel() }}</span>
            <i class="fas fa-chevron-down"></i>
          </div>

          <!-- Price Range Dropdown -->
          <div v-if="showPriceDropdown" class="price-dropdown-menu" @click.stop>
            <div class="price-range-inputs">
              <div class="price-input-group">
                <label>Min($):</label>
                <input
                  type="text"
                  v-model="minPrice"
                  placeholder="Your minimum price range"
                  @input="handlePriceChange"
                  class="price-input"
                  @click.stop
                >
              </div>
              <div class="price-input-group">
                <label>Max($):</label>
                <input
                  type="text"
                  v-model="maxPrice"
                  placeholder="Your maximum price range"
                  @input="handlePriceChange"
                  class="price-input"
                  @click.stop
                >
              </div>
              <button class="price-done-btn" @click="togglePriceDropdown">Done</button>
            </div>
          </div>
        </div>

        <div class="location-filter-container">
          <div class="filter-dropdown" :class="{ 'active': showLocationDropdown }" @click="toggleLocationDropdown">
            <span>Location</span>
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
              >
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
                <span class="country-code">{{ country.code }}</span>
                <span class="country-name">{{ country.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Active Filters Section -->
    <div class="active-filters" v-if="hasActiveFilters">
      <div class="active-filters-container">
        <div class="active-filters-title">Active Filters:</div>
        <div class="filter-tags">
          <div class="filter-tag" v-if="activeFilter !== 'all'">
            <span>{{ activeFilter === 'buy' ? 'For Sale' : 'For Rent' }}</span>
            <button @click="setFilter('all')" class="remove-filter">×</button>
          </div>
          <div class="filter-tag" v-if="activeFilters.bedrooms">
            <span>{{ activeFilters.bedrooms }} Bedrooms</span>
            <button @click="clearFilter('bedrooms')" class="remove-filter">×</button>
          </div>
          <div class="filter-tag" v-if="activeFilters.propertyType?.length">
            <span>{{ getPropertyTypeLabel() }}</span>
            <button @click="clearFilter('propertyType')" class="remove-filter">×</button>
          </div>
          <div class="filter-tag" v-if="activeFilters.location">
            <span>{{ activeFilters.location }}</span>
            <button @click="clearFilter('location')" class="remove-filter">×</button>
          </div>
          <div class="filter-tag" v-if="activeFilters.priceRange">
            <span>${{ formatPrice(activeFilters.priceRange.min) }} - ${{ formatPrice(activeFilters.priceRange.max) }}</span>
            <button @click="clearFilter('priceRange')" class="remove-filter">×</button>
          </div>
          <button v-if="hasActiveFilters" @click="clearAllFilters" class="clear-all-button">
            Clear All
          </button>
        </div>
      </div>
    </div>

    <div class="properties-grid">
      <div v-if="isLoading" class="loading-state">
        <div class="loader"></div>
        <p>Loading properties...</p>
      </div>

      <div v-else-if="filteredProperties.length === 0" class="no-results">
        <h3>No properties found</h3>
        <p>Try adjusting your search criteria</p>
      </div>

      <div v-else class="property-card" v-for="property in filteredProperties" :key="property.id" @click="viewProperty(property.id)">
        <div class="property-image">
          <img :src="property.image" :alt="property.name" loading="lazy">
          <div class="property-status">{{ property.status }}</div>
          <button class="favorite-button" @click.stop="toggleFavorite()">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
        </div>
        <div class="property-details">
          <h3>{{ property.name }}</h3>
          <p class="property-price">{{ formatPrice(property.price) }}</p>
          <p class="property-location">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
              </svg>
            {{ property.location }}
          </p>
          <div class="property-features">
            <span><i class="fas fa-bed"></i> {{ property.bedrooms }} beds</span>
            <span><i class="fas fa-bath"></i> {{ property.bathrooms }} baths</span>
            <span><i class="fas fa-ruler-combined"></i> {{ property.size }} sqft</span>
            </div>
            </div>
            </div>
          </div>

    <!-- Property Type Modal -->
    <teleport to="body" v-if="showPropertyTypeDropdown">
      <div class="property-type-modal-overlay" @click="handleOverlayClick">
        <div class="property-type-modal">
          <div class="modal-header">
            <h3>Select Property Type</h3>
            <button class="close-button" @click="cancelPropertyTypeSelection">×</button>
        </div>
          <div class="property-type-categories">
            <div v-for="(category, key) in propertyTypes" :key="key" class="property-type-category">
              <div class="category-label">{{ category.label }}</div>
              <div class="property-type-options">
                <div v-for="option in category.options" :key="option.value" class="property-option">
                  <input
                    type="radio"
                    :id="option.value"
                    :value="option.value"
                    v-model="selectedPropertyType"
                    name="propertyType"
                  >
                  <label :for="option.value">{{ option.label }}</label>
        </div>
      </div>
    </div>
          </div>
          <div class="property-type-actions">
            <button class="done-button" @click="closePropertyTypeModal">Done</button>
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { usePropertyStore } from '@/stores/propertyStore';
import { debounce } from 'lodash-es';

defineOptions({
  name: 'ClientPropertiesView'
});

const router = useRouter();
const propertyStore = usePropertyStore();

// State
const searchQuery = ref('');
const activeFilter = ref('all');
const isLoading = ref(true);
const showPropertyTypeDropdown = ref(false);
const showPriceDropdown = ref(false);
const showBedroomsDropdown = ref(false);
const showLocationDropdown = ref(false);
const locationSearchQuery = ref('');
const selectedPropertyType = ref(null);
const selectedLocation = ref(null);
const tempSelectedType = ref(null);
const minPrice = ref('');
const maxPrice = ref('');

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

// Bedrooms options
const bedroomOptions = [
  { value: '1', label: 'One' },
  { value: '2', label: 'Two' },
  { value: '3', label: 'Three' },
  { value: '4', label: 'Four' },
  { value: '5+', label: 'Others (5+ years)' }
];

const VALID_BEDROOM_OPTIONS = bedroomOptions.map(opt => opt.value);

// Countries data
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
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: 'CN', name: 'China', flag: '🇨🇳' },
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦' },
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
  { code: 'NZ', name: 'New Zealand', flag: '🇳🇿' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷' },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭' },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪' },
  { code: 'TH', name: 'Thailand', flag: '🇹🇭' },
  { code: 'GH', name: 'Ghana', flag: '🇬🇭' },
  { code: 'KE', name: 'Kenya', flag: '🇰🇪' },
  { code: 'EG', name: 'Egypt', flag: '🇪🇬' },
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦' },
  { code: 'TR', name: 'Turkey', flag: '🇹🇷' },
  { code: 'IL', name: 'Israel', flag: '🇮🇱' },
  { code: 'RU', name: 'Russia', flag: '🇷🇺' },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷' }
];

// Active filters
const activeFilters = ref({
  propertyType: [],
  bedrooms: null,
  location: null,
  priceRange: null
});

// Computed properties
const filteredProperties = computed(() => {
  try {
    let properties = propertyStore.properties;
    if (!properties || properties.length === 0) {
      return [];
    }

    // Filter by type (buy/rent/all)
    if (activeFilter.value !== 'all') {
      properties = properties.filter(p =>
        p.status?.toLowerCase() === (activeFilter.value === 'buy' ? 'for sale' : 'for rent')
      );
    }

    // Filter by search query
    if (searchQuery.value.trim()) {
      const query = searchQuery.value.toLowerCase().trim();
      properties = properties.filter(p =>
        p.name?.toLowerCase().includes(query) ||
        p.location?.toLowerCase().includes(query) ||
        p.address?.toLowerCase().includes(query)
      );
    }

    // Filter by property type
    if (activeFilters.value.propertyType?.length > 0) {
      properties = properties.filter(p => {
        return activeFilters.value.propertyType.some(type => {
          const propertyType = p.type?.toLowerCase() || '';
          return propertyType === type.toLowerCase() || propertyType.includes(type.toLowerCase());
        });
      });
    }

    // Filter by bedrooms
    if (activeFilters.value.bedrooms) {
      properties = properties.filter(p => {
        const bedrooms = parseInt(p.bedrooms) || 0;
        const filterBedrooms = parseInt(activeFilters.value.bedrooms) || 0;
        return bedrooms >= filterBedrooms;
      });
    }

    // Filter by location
    if (activeFilters.value.location) {
      const locationSearch = activeFilters.value.location.toLowerCase();
      properties = properties.filter(p => {
        const location = p.location?.toLowerCase() || '';
        const country = p.country?.toLowerCase() || '';
        const city = p.city?.toLowerCase() || '';
        return location.includes(locationSearch) ||
               country.includes(locationSearch) ||
               city.includes(locationSearch);
      });
    }

    // Filter by price range
    if (activeFilters.value.priceRange) {
      const { min, max } = activeFilters.value.priceRange;
      properties = properties.filter(p => {
        const price = parseFloat(String(p.price).replace(/[^0-9.]/g, '')) || 0;
        return price >= min && (max === Infinity || price <= max);
      });
    }

    return properties;
  } catch (error) {
    console.error('Error filtering properties:', error);
    return [];
  }
});

const filteredCountries = computed(() => {
  if (!locationSearchQuery.value) return countries;
  const query = locationSearchQuery.value.toLowerCase();
  return countries.filter(country =>
    country.name.toLowerCase().includes(query) ||
    country.code.toLowerCase().includes(query)
  );
});

// Add computed property for active filters
const hasActiveFilters = computed(() => {
  return activeFilter.value !== 'all' ||
         activeFilters.value.bedrooms ||
         activeFilters.value.propertyType?.length > 0 ||
         activeFilters.value.location ||
         activeFilters.value.priceRange;
});

// Methods
const setFilter = (filter) => {
  isLoading.value = true;
  activeFilter.value = filter;

  // Reset other filters when changing main filter
  if (filter === 'all') {
    activeFilters.value = {
      propertyType: [],
      bedrooms: null,
      location: null,
      priceRange: null
    };
  }

  // Apply loading state for visual feedback
  setTimeout(() => {
    isLoading.value = false;
  }, 300);
};

const viewProperty = (id) => {
  router.push(`/client-property/${id}`);
};

const toggleFavorite = () => {
  // Implement favorite toggling logic
};

const togglePropertyTypeDropdown = () => {
  showPropertyTypeDropdown.value = !showPropertyTypeDropdown.value;
  if (showPropertyTypeDropdown.value) {
    tempSelectedType.value = selectedPropertyType.value;
    document.body.style.overflow = 'hidden';
  } else {
    updatePropertyType();
    document.body.style.overflow = '';
  }
  showPriceDropdown.value = false;
  showBedroomsDropdown.value = false;
  showLocationDropdown.value = false;
};

const toggleBedroomsDropdown = () => {
  showBedroomsDropdown.value = !showBedroomsDropdown.value;
  showPropertyTypeDropdown.value = false;
  showPriceDropdown.value = false;
  showLocationDropdown.value = false;
};

const toggleLocationDropdown = () => {
  showLocationDropdown.value = !showLocationDropdown.value;
  if (showLocationDropdown.value) {
    locationSearchQuery.value = '';
  }
  showPropertyTypeDropdown.value = false;
  showPriceDropdown.value = false;
  showBedroomsDropdown.value = false;
};

const selectBedrooms = (option) => {
  if (!VALID_BEDROOM_OPTIONS.includes(option.value)) {
    console.error('Invalid bedroom option:', option);
    return;
  }

  isLoading.value = true;
  activeFilters.value.bedrooms = option.value;
  showBedroomsDropdown.value = false;
  applyFilters();
};

const updatePropertyType = () => {
  if (selectedPropertyType.value && VALID_PROPERTY_TYPES.includes(selectedPropertyType.value)) {
    activeFilters.value.propertyType = [selectedPropertyType.value];
  } else {
    activeFilters.value.propertyType = null;
  }
  isLoading.value = true;
  applyFilters();
};

const closePropertyTypeModal = () => {
  updatePropertyType();
  showPropertyTypeDropdown.value = false;
  document.body.style.overflow = '';
};

const cancelPropertyTypeSelection = () => {
  selectedPropertyType.value = tempSelectedType.value;
  showPropertyTypeDropdown.value = false;
  document.body.style.overflow = '';
};

const handleOverlayClick = (event) => {
  if (event.target.classList.contains('property-type-modal-overlay')) {
    closePropertyTypeModal();
  }
};

const getPropertyTypeLabel = () => {
  return selectedPropertyType.value ?
    propertyTypes[selectedPropertyType.value]?.label || 'Property type' :
    'Property type';
};

const getPriceRangeLabel = () => {
  if (activeFilters.value.priceRange) {
    const { min, max } = activeFilters.value.priceRange;
    if (max === Infinity) {
      return `$${formatPrice(min)}+`;
    }
    return `$${formatPrice(min)} - $${formatPrice(max)}`;
  }
  return 'Price Range';
};

const selectLocation = (country) => {
  selectedLocation.value = country;
  activeFilters.value.location = country.name;
  showLocationDropdown.value = false;
  isLoading.value = true;
  applyFilters();
};

const handlePriceChange = () => {
  const min = parseFloat(minPrice.value) || 0;
  const max = parseFloat(maxPrice.value) || Infinity;

  if (min >= 0 && (max === Infinity || max >= min)) {
    activeFilters.value.priceRange = { min, max };
    isLoading.value = true;
    applyFilters();
  }
};

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(price);
};

// Methods for clearing filters
const clearFilter = (filterType) => {
  isLoading.value = true;
  switch (filterType) {
    case 'bedrooms':
      activeFilters.value.bedrooms = null;
      break;
    case 'propertyType':
      activeFilters.value.propertyType = [];
      selectedPropertyType.value = null;
      break;
    case 'location':
      activeFilters.value.location = null;
      selectedLocation.value = null;
      break;
    case 'priceRange':
      activeFilters.value.priceRange = null;
      minPrice.value = '';
      maxPrice.value = '';
      break;
  }
  applyFilters();
};

const clearAllFilters = () => {
  isLoading.value = true;
  activeFilter.value = 'all';
  activeFilters.value = {
    propertyType: [],
    bedrooms: null,
    location: null,
    priceRange: null
  };
  selectedPropertyType.value = null;
  selectedLocation.value = null;
  minPrice.value = '';
  maxPrice.value = '';
  applyFilters();
};

// Apply filters with debounce
const applyFilters = debounce(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 500);
}, 300);

// Add closeDropdowns method
const closeDropdowns = (event) => {
  // Only close dropdowns if clicking outside of them
  if (!event.target.closest('.price-filter-container')) {
    showPriceDropdown.value = false;
  }
  if (!event.target.closest('.bedrooms-filter-container')) {
    showBedroomsDropdown.value = false;
  }
  if (!event.target.closest('.property-type-filter-container')) {
    showPropertyTypeDropdown.value = false;
  }
  if (!event.target.closest('.location-filter-container')) {
    showLocationDropdown.value = false;
  }
};

// Update togglePriceDropdown method
const togglePriceDropdown = () => {
  showPriceDropdown.value = !showPriceDropdown.value;
  showPropertyTypeDropdown.value = false;
  showBedroomsDropdown.value = false;
  showLocationDropdown.value = false;
};

// Add a computed property to track active button state
const isFilterActive = (filter) => {
  return activeFilter.value === filter;
};

// Lifecycle hooks
onMounted(async () => {
  try {
    isLoading.value = true;
    if (typeof propertyStore.fetchProperties === 'function') {
      await propertyStore.fetchProperties();
    } else if (!propertyStore.properties || propertyStore.properties.length === 0) {
      console.warn('Property store is empty and no fetchProperties method available');
    }
  } catch (error) {
    console.error('Error fetching properties:', error);
  } finally {
    setTimeout(() => {
      isLoading.value = false;
    }, 500);
  }
});
</script>

<style scoped>
.client-properties {
  min-height: 100vh;
  background: #f8fafc;
}

.hero-section {
  position: relative;
  height: 300px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  padding: 0 40px;
  margin-bottom: 30px;
  border-radius: 12px;
  margin: 20px 20px 30px 20px;
}

.hero-content {
  color: white;
  max-width: 800px;
}

.hero-content h1 {
  font-size: 1.7em;
  margin-bottom: 1rem;
  font-weight: 600;
}

.hero-content p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.filter-buttons {
  display: flex;
  gap: 1rem;
}

.filter-buttons button {
  padding: 0.75rem 1.5rem;
  border: 2px solid white;
  background: transparent;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  font-weight: 500;
}

.filter-buttons button:hover {
  background: rgba(255, 255, 255, 0.1);
}

.filter-buttons button.active {
  background: white;
  color: #0066cc;
  border-color: white;
}

.search-filters {
  max-width: 1200px;
  margin: 0 auto 30px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  gap: 20px;
}

.search-container {
  position: relative;
  width: 300px;
  display: flex;
  align-items: center;
  background-color: #f8f8f8;
  border-radius: 6px;
  padding: 0 12px;
  flex-shrink: 0;
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
  flex-wrap: nowrap;
  align-items: center;
  margin-top: 16px;
}

.filter-dropdown {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 8px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  color: #64748b;
  background-color: white;
  width: 200px;
  box-sizing: border-box;
  white-space: nowrap;
}

.filter-dropdown.active {
  border-color: #0066ff;
  color: #0066ff;
}

/* Bedrooms dropdown */
.bedrooms-dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  width: 200px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  margin-top: 8px;
  z-index: 100;
}

.bedroom-option {
  padding: 12px 16px;
  font-size: 14px;
  color: #64748B;
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
  width: 450px;
  max-width: 90vw;
  max-height: 90vh;
  background: white;
  border-radius: 8px;
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
  font-size: 16px;
  font-weight: 500;
  color: #1e293b;
  margin: 0;
}

.close-button {
  background: none;
  border: none;
  color: #64748b;
  font-size: 20px;
  cursor: pointer;
  padding: 4px;
  line-height: 1;
}

.property-type-categories {
  padding: 16px 20px;
}

.property-type-category {
  margin-bottom: 24px;
}

.property-type-category:last-child {
  margin-bottom: 0;
}

.category-label {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 12px;
}

.property-type-options {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.property-option {
  display: flex;
  align-items: center;
  gap: 8px;
}

.property-option input[type="radio"] {
  width: 18px;
  height: 18px;
  margin: 0;
  cursor: pointer;
}

.property-option label {
  font-size: 14px;
  color: #64748b;
  cursor: pointer;
}

.property-type-actions {
  padding: 16px 20px;
  border-top: 1px solid #e2e8f0;
  display: flex;
  justify-content: flex-end;
}

.done-button {
  background-color: #0066ff;
  color: white;
  border: none;
  padding: 8px 24px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.done-button:hover {
  background-color: #0052cc;
}

/* Price Range Dropdown */
.price-dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  width: 240px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  margin-top: 8px;
  z-index: 100;
  padding: 16px;
  box-sizing: border-box;
}

.price-range-inputs {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}

.price-input-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
}

.price-input-group label {
  font-size: 13px;
  color: #64748b;
  font-weight: 500;
}

.price-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s ease;
  background: white;
  box-sizing: border-box;
}

.price-input:focus {
  border-color: #0066ff;
  box-shadow: 0 0 0 2px rgba(0, 102, 255, 0.1);
}

.price-input::placeholder {
  color: #cbd5e1;
  font-size: 13px;
}

.price-done-btn {
  background: #0066ff;
  color: white;
  border: none;
  padding: 8px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  width: 100%;
  margin-top: 4px;
}

.price-done-btn:hover {
  background: #0052cc;
}

/* Location Dropdown */
.location-dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  width: 320px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  margin-top: 8px;
  z-index: 100;
  overflow: hidden;
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

.location-search-input:focus {
  border-color: #0066ff;
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
  background: #f8fafc;
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

.country-code {
  font-size: 14px;
  color: #64748b;
  width: 32px;
}

.country-name {
  font-size: 14px;
  color: #1e293b;
}

/* Position containers */
.bedrooms-filter-container,
.property-type-filter-container,
.price-filter-container,
.location-filter-container {
  position: relative;
}

.properties-grid {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
}

.property-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
  cursor: pointer;
}

.property-card:hover {
  transform: translateY(-5px);
}

.property-image {
  position: relative;
  height: 200px;
}

.property-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.property-status {
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 5px 10px;
  background: #0066cc;
  color: white;
  border-radius: 4px;
  font-size: 0.875rem;
}

.favorite-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: white;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.favorite-button:hover {
  background: #f8fafc;
}

.property-details {
  padding: 20px;
}

.property-details h3 {
  margin: 0 0 10px;
  font-size: 1.25rem;
  color: #1a1a1a;
}

.property-price {
  font-size: 1.5rem;
  font-weight: 600;
  color: #0066cc;
  margin-bottom: 10px;
}

.property-location {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #666;
  margin-bottom: 15px;
}

.property-features {
  display: flex;
  gap: 15px;
  color: #666;
  font-size: 0.875rem;
}

.loading-state {
  grid-column: 1 / -1;
  text-align: center;
  padding: 40px;
}

.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #0066cc;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.no-results {
  grid-column: 1 / -1;
  text-align: center;
  padding: 40px;
  background: white;
  border-radius: 12px;
}

.no-results h3 {
  margin: 0 0 10px;
  color: #1a1a1a;
}

.no-results p {
  color: #666;
}

.active-filters {
  max-width: 1200px;
  margin: 0 auto 20px;
  padding: 0 20px;
}

.active-filters-container {
  background: white;
  border-radius: 8px;
    padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.active-filters-title {
  font-size: 14px;
  color: #64748b;
  margin-bottom: 12px;
}

.filter-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}

.filter-tag {
  display: flex;
  align-items: center;
  gap: 6px;
  background-color: #f0f7ff;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 14px;
  color: #0066ff;
}

.remove-filter {
  background: none;
  border: none;
  color: #0066ff;
  font-size: 18px;
  line-height: 1;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.remove-filter:hover {
  color: #0052cc;
}

.clear-all-button {
  background: none;
  border: none;
  color: #64748b;
  font-size: 14px;
  padding: 6px 12px;
  cursor: pointer;
  text-decoration: underline;
}

.clear-all-button:hover {
  color: #0066ff;
}
</style>
