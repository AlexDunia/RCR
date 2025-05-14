<template>
  <div class="properties-container">
    <!-- Hero section with background image -->
    <div class="hero-section">
      <div class="hero-content">
        <h1>Manage Listings</h1>
        <p>Here you can add, remove, and edit properties on your profile</p>
      </div>
    </div>

    <!-- Property header with dynamic background image -->
    <div class="property-header" :style="headerBackgroundStyle">
      <div class="overlay"></div>
      <div class="property-header-content">
        <h2>{{ headerTitle }}</h2>
        <p>{{ headerSubtitle }}</p>
      </div>
    </div>

    <!-- Filter tabs -->
    <div class="filter-tabs-container">
      <div class="filter-tabs">
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

    <!-- Search and filters section -->
    <div class="search-filter-container">
      <!-- Search input -->
      <div class="search-container">
        <input
          type="text"
          class="search-input"
          v-model="searchQuery"
          placeholder="Search..."
          @input="debounceSearch"
        />
        <div class="search-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
        <div class="search-shortcut">⌘ K</div>
      </div>

      <!-- Filter dropdowns -->
      <div class="filters">
        <!-- Price range filter -->
        <div class="filter-dropdown" @click.stop="togglePriceDropdown">
          <span>Price range($)</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>

        <!-- Bedrooms filter -->
        <div class="filter-dropdown" @click.stop="toggleBedroomsDropdown">
          <span>Bedrooms</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>

        <!-- Status filter -->
        <div class="filter-dropdown" @click.stop="toggleStatusDropdown">
          <span>Status</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>

        <!-- Location filter -->
        <div class="filter-dropdown" @click.stop="toggleLocationDropdown">
          <span>Location</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>

      <!-- Price Range Dropdown Content -->
      <div v-if="showPriceDropdown" class="dropdown-content price-dropdown" @click.stop>
        <div class="dropdown-header">
          <h4>Price Range</h4>
          <button class="close-btn" @click="showPriceDropdown = false">×</button>
        </div>
        <div class="price-inputs">
          <div class="input-group">
            <label for="min-price">Min Price ($)</label>
            <input
              type="text"
              id="min-price"
              v-model="priceRange.min"
              placeholder="Min"
              @keyup.enter="applyPriceFilter"
            />
          </div>
          <div class="input-group">
            <label for="max-price">Max Price ($)</label>
            <input
              type="text"
              id="max-price"
              v-model="priceRange.max"
              placeholder="Max"
              @keyup.enter="applyPriceFilter"
            />
          </div>
        </div>
        <button class="apply-btn" @click="applyPriceFilter">Apply</button>
      </div>

      <!-- Bedrooms Dropdown Content -->
      <div v-if="showBedroomsDropdown" class="dropdown-content bedrooms-dropdown" @click.stop>
        <div class="dropdown-header">
          <h4>Bedrooms</h4>
          <button class="close-btn" @click="showBedroomsDropdown = false">×</button>
        </div>
        <div class="bedroom-options">
          <div
            v-for="option in bedroomOptions"
            :key="option.value"
            class="option"
            :class="{ active: selectedBedrooms === option.value }"
            @click="selectBedrooms(option.value)"
          >
            {{ option.label }}
          </div>
        </div>
      </div>

      <!-- Status Dropdown Content -->
      <div v-if="showStatusDropdown" class="dropdown-content status-dropdown" @click.stop>
        <div class="dropdown-header">
          <h4>Status</h4>
          <button class="close-btn" @click="showStatusDropdown = false">×</button>
        </div>
        <div class="status-options">
          <div
            v-for="option in statusOptions"
            :key="option"
            class="option"
            :class="{ active: selectedStatus === option }"
            @click="selectStatus(option)"
          >
            {{ option }}
          </div>
        </div>
      </div>

      <!-- Location Dropdown Content -->
      <div v-if="showLocationDropdown" class="dropdown-content location-dropdown" @click.stop>
        <div class="dropdown-header">
          <h4>Location</h4>
          <button class="close-btn" @click="showLocationDropdown = false">×</button>
        </div>
        <div class="location-search">
          <input
            type="text"
            v-model="locationQuery"
            placeholder="Search locations..."
            @input="searchLocations"
          />
        </div>
        <div class="location-options">
          <h5>Popular Locations</h5>
          <div
            v-for="option in filteredLocations"
            :key="option"
            class="option"
            :class="{ active: selectedLocation === option }"
            @click="selectLocation(option)"
          >
            {{ option }}
          </div>
        </div>
      </div>
    </div>

    <!-- Active filters display section -->
    <div class="active-filters-container" v-if="hasActiveFilters">
      <div class="active-filters-header">
        <span>Active filters:</span>
        <button class="clear-all-btn" @click="clearAllFilters">Clear all</button>
      </div>
      <div class="active-filters-tags">
        <!-- Price filter tag -->
        <div class="filter-tag" v-if="priceRange.min || priceRange.max">
          <span>Price: ${{ priceRange.min || '0' }} - ${{ priceRange.max || 'Any' }}</span>
          <button class="remove-tag" @click="clearPriceFilter">×</button>
        </div>

        <!-- Bedrooms filter tag -->
        <div class="filter-tag" v-if="selectedBedrooms">
          <span>Bedrooms: {{ selectedBedrooms === '5+' ? '5+ Bedrooms' : `${selectedBedrooms} Bedroom${selectedBedrooms !== '1' ? 's' : ''}` }}</span>
          <button class="remove-tag" @click="clearBedroomsFilter">×</button>
        </div>

        <!-- Status filter tag -->
        <div class="filter-tag" v-if="selectedStatus">
          <span>Status: {{ selectedStatus }}</span>
          <button class="remove-tag" @click="clearStatusFilter">×</button>
        </div>

        <!-- Location filter tag -->
        <div class="filter-tag" v-if="selectedLocation">
          <span>Location: {{ selectedLocation }}</span>
          <button class="remove-tag" @click="clearLocationFilter">×</button>
        </div>

        <!-- Category filter tag -->
        <div class="filter-tag" v-if="activeFilter !== 'all'">
          <span>Category: {{ filters[activeFilter] }}</span>
          <button class="remove-tag" @click="setFilter('all')">×</button>
        </div>
      </div>
    </div>

    <div v-if="filteredProperties.length === 0" class="no-results">
      <div class="no-results-content">
        <div class="no-results-icon">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3>No properties found</h3>
        <p>Try adjusting your search or filters to find what you're looking for.</p>
      </div>
    </div>

    <div v-else class="properties-grid-container">
      <div class="properties-grid">
        <div
          v-for="property in filteredProperties"
          :key="property.id"
          class="property-card"
          @click="viewProperty(property.id)"
        >
          <div class="property-image">
            <img :src="property.image" :alt="property.name">
            <button
              class="favorite-btn"
              @click="(event) => toggleSaveProperty(event, property.id)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
          </div>
          <div class="property-info">
            <p class="price">${{ property.price }}</p>
            <h3 class="property-name">{{ property.name }}</h3>
            <p class="location">{{ property.location }}</p>
            <div class="specs">
              <span class="spec">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                {{ property.bedrooms }} bd
              </span>
              <span class="spec">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 4h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2zm0 8h14"></path>
                </svg>
                {{ property.bathrooms }} ba
              </span>
              <span class="spec">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2"></rect>
                </svg>
                {{ property.size }} sqft
              </span>
            </div>
            <div class="property-actions">
              <button class="action-button view-button" @click.stop="viewProperty(property.id)">
                View Details
              </button>
              <button class="action-button schedule-button" @click.stop="scheduleViewing(property.id)">
                Schedule Viewing
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { usePropertyStore } from '@/stores/propertyStore';

const router = useRouter();
const propertyStore = usePropertyStore();

// Get properties from store
const allProperties = computed(() => propertyStore.properties);

// Filter state
const activeFilter = ref('all');
const searchQuery = ref('');
const debouncedSearchQuery = ref('');
const searchTimeout = ref(null);

// Filter options based on screenshot
const filters = {
  all: 'All properties',
  sale: 'For sale',
  rent: 'For rent',
  new: 'New listings'
};

// Header content based on active filter
const headerContent = {
  all: {
    title: 'All Properties',
    subtitle: 'Get up to date with the latest properties for you.',
    background: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548295/newtwoimage1_2_ti4hfi.png'
  },
  sale: {
    title: 'Properties For Sale',
    subtitle: 'Find your dream property to buy in top locations.',
    background: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548295/realestate-sale_yrbhgw.jpg'
  },
  rent: {
    title: 'Properties For Rent',
    subtitle: 'Discover perfect rental properties for your lifestyle.',
    background: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548295/realestate-rent_awgchf.jpg'
  },
  new: {
    title: 'New Listings',
    subtitle: 'Be the first to see our newest property listings.',
    background: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548295/realestate-new_xtjcwy.jpg'
  }
};

// Computed properties for dynamic header content
const headerTitle = computed(() => headerContent[activeFilter.value].title);
const headerSubtitle = computed(() => headerContent[activeFilter.value].subtitle);
const headerBackgroundStyle = computed(() => ({
  backgroundImage: `url('${headerContent[activeFilter.value].background}')`
}));

// Dropdown states
const showPriceDropdown = ref(false);
const showBedroomsDropdown = ref(false);
const showStatusDropdown = ref(false);
const showLocationDropdown = ref(false);

// Filter values
const priceRange = ref({ min: '', max: '' });
const selectedBedrooms = ref('');
const selectedStatus = ref('');
const selectedLocation = ref('');

// Bedroom options
const bedroomOptions = [
  { value: '1', label: '1 Bedroom' },
  { value: '2', label: '2 Bedrooms' },
  { value: '3', label: '3 Bedrooms' },
  { value: '4', label: '4 Bedrooms' },
  { value: '5+', label: '5+ Bedrooms' }
];

// Status options
const statusOptions = ['Active', 'Pending', 'Sold', 'Foreclosure', 'New Construction'];

// Location options and search
const locationQuery = ref('');
const locationOptions = [
  'New York, NY',
  'Los Angeles, CA',
  'Chicago, IL',
  'Houston, TX',
  'Phoenix, AZ',
  'Philadelphia, PA',
  'San Antonio, TX',
  'San Diego, CA',
  'Dallas, TX',
  'San Francisco, CA'
];

const filteredLocations = computed(() => {
  if (!locationQuery.value) return locationOptions;

  return locationOptions.filter(location =>
    location.toLowerCase().includes(locationQuery.value.toLowerCase())
  );
});

// Toggle filter dropdowns
const togglePriceDropdown = () => {
  showPriceDropdown.value = !showPriceDropdown.value;
  showBedroomsDropdown.value = false;
  showStatusDropdown.value = false;
  showLocationDropdown.value = false;
};

const toggleBedroomsDropdown = () => {
  showBedroomsDropdown.value = !showBedroomsDropdown.value;
  showPriceDropdown.value = false;
  showStatusDropdown.value = false;
  showLocationDropdown.value = false;
};

const toggleStatusDropdown = () => {
  showStatusDropdown.value = !showStatusDropdown.value;
  showPriceDropdown.value = false;
  showBedroomsDropdown.value = false;
  showLocationDropdown.value = false;
};

const toggleLocationDropdown = () => {
  showLocationDropdown.value = !showLocationDropdown.value;
  showPriceDropdown.value = false;
  showBedroomsDropdown.value = false;
  showStatusDropdown.value = false;
};

// Apply filters
const applyPriceFilter = () => {
  showPriceDropdown.value = false;
};

const selectBedrooms = (value) => {
  selectedBedrooms.value = value;
  showBedroomsDropdown.value = false;
};

const selectStatus = (value) => {
  selectedStatus.value = value;
  showStatusDropdown.value = false;
};

const selectLocation = (value) => {
  selectedLocation.value = value;
  showLocationDropdown.value = false;
};

const searchLocations = () => {
  // Handled by computed property
};

// Clear filters
const clearPriceFilter = () => {
  priceRange.value = { min: '', max: '' };
};

const clearBedroomsFilter = () => {
  selectedBedrooms.value = '';
};

const clearStatusFilter = () => {
  selectedStatus.value = '';
};

const clearLocationFilter = () => {
  selectedLocation.value = '';
  locationQuery.value = '';
};

const clearAllFilters = () => {
  clearPriceFilter();
  clearBedroomsFilter();
  clearStatusFilter();
  clearLocationFilter();
  setFilter('all');
};

// Close dropdowns when clicking outside
const handleClickOutside = (event) => {
  if (showPriceDropdown.value || showBedroomsDropdown.value ||
      showStatusDropdown.value || showLocationDropdown.value) {

    // Check if the click is outside any dropdown
    const dropdowns = document.querySelectorAll('.dropdown-content');
    const triggers = document.querySelectorAll('.filter-dropdown');

    let insideDropdown = false;
    for (const dropdown of dropdowns) {
      if (dropdown.contains(event.target)) {
        insideDropdown = true;
        break;
      }
    }

    let onTrigger = false;
    for (const trigger of triggers) {
      if (trigger.contains(event.target)) {
        onTrigger = true;
        break;
      }
    }

    if (!insideDropdown && !onTrigger) {
      showPriceDropdown.value = false;
      showBedroomsDropdown.value = false;
      showStatusDropdown.value = false;
      showLocationDropdown.value = false;
    }
  }
};

// Setup and cleanup event listeners
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

// Check if any filters are active
const hasActiveFilters = computed(() => {
  return activeFilter.value !== 'all' ||
         !!priceRange.value.min ||
         !!priceRange.value.max ||
         !!selectedBedrooms.value ||
         !!selectedStatus.value ||
         !!selectedLocation.value;
});

// Set filter category
const setFilter = (filter) => {
  activeFilter.value = filter;
};

// Debounce search input
const debounceSearch = () => {
  clearTimeout(searchTimeout.value);
  searchTimeout.value = setTimeout(() => {
    debouncedSearchQuery.value = searchQuery.value;
  }, 300);
};

// Filtered properties based on active filter and search query
const filteredProperties = computed(() => {
  let result = [...allProperties.value];

  // Filter by category
  if (activeFilter.value === 'sale') {
    // Filter properties for sale
    result = result.filter(property => property.type === 'Residential');
  } else if (activeFilter.value === 'rent') {
    // Filter properties for rent
    result = result.filter(property => property.type === 'Commercial');
  } else if (activeFilter.value === 'new') {
    // Filter new listings (just for demo - in real app would check date added)
    result = result.filter((_, index) => index < 3);
  }

  // Apply price filter
  if (priceRange.value.min || priceRange.value.max) {
    const min = priceRange.value.min ? parseInt(priceRange.value.min) : 0;
    const max = priceRange.value.max ? parseInt(priceRange.value.max) : Infinity;

    result = result.filter(property => {
      // Remove $ and commas from price
      const propertyPrice = parseInt(String(property.price).replace(/[$,]/g, ''));
      return propertyPrice >= min && propertyPrice <= max;
    });
  }

  // Apply bedrooms filter
  if (selectedBedrooms.value) {
    if (selectedBedrooms.value === '5+') {
      result = result.filter(property => property.bedrooms >= 5);
    } else {
      const bedroomsCount = parseInt(selectedBedrooms.value);
      result = result.filter(property => property.bedrooms === bedroomsCount);
    }
  }

  // Apply status filter
  if (selectedStatus.value) {
    result = result.filter(property => property.status === selectedStatus.value);
  }

  // Apply location filter
  if (selectedLocation.value) {
    result = result.filter(property =>
      property.location.toLowerCase().includes(selectedLocation.value.toLowerCase())
    );
  }

  // Apply search query
  if (debouncedSearchQuery.value) {
    const query = debouncedSearchQuery.value.toLowerCase();
    result = result.filter(property =>
      property.name.toLowerCase().includes(query) ||
      property.location.toLowerCase().includes(query) ||
      property.type.toLowerCase().includes(query)
    );
  }

  return result;
});

// View property details
const viewProperty = (propertyId) => {
  router.push(`/client-property/${propertyId}`);
};

// Schedule property viewing - now redirects to messages instead
const scheduleViewing = (propertyId) => {
  router.push(`/client-messages?contactAgent=${propertyId}`);
};

// Toggle property saved status
const toggleSaveProperty = (event, propertyId) => {
  // Prevent clicking the card when clicking the save button
  event.stopPropagation();

  // In a real app, this would update the saved status in the backend
  console.log('Toggle save for property ID:', propertyId);
};
</script>

<style scoped>
.properties-container {
  width: 100%;
  margin: 0;
  padding: 0;
  font-family: 'Inter', sans-serif;
}

/* Hero section styling */
.hero-section {
  height: 110px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: #333;
  text-align: left;
  margin-bottom: 0;
  padding: 0 24px;
  border-bottom: 1px solid #eaeaea;
}

.hero-content {
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
}

.hero-content h1 {
  font-size: 28px;
  font-weight: 600;
  margin: 0 0 6px;
  color: #333;
}

.hero-content p {
  font-size: 14px;
  margin: 0;
  color: #666;
  opacity: 0.9;
}

/* Property header styling */
.property-header {
  height: 240px;
  position: relative;
  background-image: url('https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548295/newtwoimage1_2_ti4hfi.png');
  background-position: center;
  background-size: cover;
  margin-bottom: 30px;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.property-header-content {
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  color: white;
  padding: 0 40px;
  max-width: 1400px;
  margin: 0 auto;
}

.property-header-content h2 {
  font-size: 34px;
  font-weight: 600;
  margin: 0 0 10px;
}

.property-header-content p {
  font-size: 16px;
  margin: 0;
}

/* Filter tabs styling */
.filter-tabs-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
}

.filter-tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 24px;
}

.filter-tabs button {
  padding: 10px 16px;
  height: 42px;
  border: none;
  background-color: #f6f6f6;
  color: #333;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-tabs button.active {
  background-color: #0a4d8c;
  color: white;
}

.filter-tabs button:hover:not(.active) {
  background-color: #e6e6e6;
}

/* Search and filter section */
.search-filter-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 24px;
}

.search-container {
  position: relative;
  flex: 1;
  min-width: 220px;
}

.search-input {
  width: 100%;
  height: 42px;
  padding: 0 38px 0 38px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 14px;
  background-color: #fff;
}

.search-input:focus {
  outline: none;
  border-color: #0a4d8c;
  box-shadow: 0 0 0 3px rgba(10, 77, 140, 0.1);
}

.search-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
}

.search-shortcut {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background-color: #f3f4f6;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
  color: #6b7280;
}

.filters {
  display: flex;
  gap: 12px;
}

.filter-dropdown {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  height: 42px;
  padding: 0 16px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  color: #333;
  background-color: white;
  min-width: 140px;
}

.filter-dropdown:hover {
  border-color: #0a4d8c;
  color: #0a4d8c;
}

.filter-dropdown svg {
  color: #999;
}

.filter-dropdown:hover svg {
  color: #0a4d8c;
}

/* Active filters */
.active-filters-container {
  padding: 16px 20px;
  margin: 0 20px 30px;
  background-color: #f8fafc;
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
  font-weight: 600;
}

.clear-all-btn {
  background: none;
  border: none;
  color: #0a4d8c;
  font-size: 13px;
  font-weight: 500;
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
  background-color: #f0f7ff;
  border-radius: 6px;
  font-size: 13px;
  color: #0a4d8c;
}

.remove-tag {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: rgba(10, 77, 140, 0.2);
  border: none;
  color: #0a4d8c;
  font-size: 14px;
  cursor: pointer;
}

.remove-tag:hover {
  background-color: rgba(10, 77, 140, 0.3);
}

/* No results */
.no-results {
  display: flex;
  justify-content: center;
  padding: 60px 20px;
}

.no-results-content {
  text-align: center;
  max-width: 350px;
}

.no-results-icon {
  width: 48px;
  height: 48px;
  margin: 0 auto 16px;
  color: #94a3b8;
}

.no-results-content h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #334155;
}

.no-results-content p {
  font-size: 14px;
  color: #64748b;
  margin: 0;
}

/* Property grid */
.properties-grid-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
}

.properties-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.property-card {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  background-color: white;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  border: 1px solid #f0f0f0;
}

.property-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
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
  transition: transform 0.5s ease;
}

.property-card:hover .property-image img {
  transform: scale(1.05);
}

.favorite-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 36px;
  height: 36px;
  background: white;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

.favorite-btn:hover {
  transform: scale(1.1);
}

.favorite-btn svg {
  stroke: #ff4757;
}

.property-info {
  padding: 16px;
}

.price {
  font-weight: 700;
  font-size: 18px;
  color: #0a4d8c;
  margin: 0 0 8px;
}

.property-name {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 4px;
  color: #333;
  line-height: 1.4;
}

.location {
  color: #666;
  font-size: 14px;
  margin: 0 0 12px;
}

.specs {
  display: flex;
  gap: 14px;
  margin-bottom: 16px;
}

.spec {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #666;
}

.spec svg {
  color: #0a4d8c;
}

.property-actions {
  display: flex;
  gap: 10px;
}

.action-button {
  flex: 1;
  height: 36px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  text-align: center;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.view-button {
  background-color: transparent;
  border: 1px solid #0a4d8c;
  color: #0a4d8c;
}

.view-button:hover {
  background-color: rgba(10, 77, 140, 0.05);
}

.schedule-button {
  background-color: #0a4d8c;
  border: 1px solid #0a4d8c;
  color: white;
}

.schedule-button:hover {
  background-color: #0b3b6b;
}

/* Dropdown content styling */
.dropdown-content {
  position: absolute;
  z-index: 1000;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin-top: 4px;
  width: 280px;
  border: 1px solid #e0e0e0;
}

.dropdown-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f0f0f0;
}

.dropdown-header h4 {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 18px;
  color: #999;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  line-height: 1;
}

.close-btn:hover {
  color: #0a4d8c;
}

/* Price dropdown */
.price-dropdown {
  left: calc(50% - 380px);
}

.price-inputs {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.input-group {
  flex: 1;
}

.input-group label {
  display: block;
  font-size: 12px;
  margin-bottom: 6px;
  color: #666;
}

.input-group input {
  width: 100%;
  height: 36px;
  padding: 0 10px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 14px;
}

.apply-btn {
  width: 100%;
  height: 36px;
  background-color: #0a4d8c;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.apply-btn:hover {
  background-color: #0b3b6b;
}

/* Bedrooms dropdown */
.bedrooms-dropdown {
  min-width: 180px;
  left: calc(50% - 230px);
}

.bedroom-options {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

/* Status dropdown */
.status-dropdown {
  min-width: 180px;
  left: calc(50% - 80px);
}

.status-options {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

/* Location dropdown */
.location-dropdown {
  min-width: 200px;
  left: calc(50% + 70px);
}

.location-search {
  margin-bottom: 12px;
}

.location-search input {
  width: 100%;
  height: 36px;
  padding: 0 10px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 14px;
}

.location-options {
  max-height: 200px;
  overflow-y: auto;
}

.location-options h5 {
  font-size: 13px;
  font-weight: 500;
  margin: 0 0 8px;
  color: #666;
}

/* Common option styling */
.option {
  padding: 8px 10px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.option:hover {
  background-color: #f0f7ff;
  color: #0a4d8c;
}

.option.active {
  background-color: #0a4d8c;
  color: white;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .hero-section {
    height: 100px;
    padding: 0 16px;
  }

  .hero-content h1 {
    font-size: 24px;
  }

  .property-header {
    height: 180px;
  }

  .property-header-content {
    padding: 0 16px;
  }

  .property-header-content h2 {
    font-size: 28px;
  }

  .filter-tabs-container,
  .search-filter-container,
  .properties-grid-container,
  .active-filters-container {
    padding: 0 16px;
  }

  .filter-tabs {
    flex-wrap: wrap;
  }

  .search-filter-container {
    flex-direction: column;
  }

  .filters {
    flex-wrap: wrap;
  }

  .filter-dropdown {
    flex: 1;
    min-width: 120px;
  }

  .properties-grid {
    grid-template-columns: 1fr;
  }

  .dropdown-content {
    width: calc(100% - 32px);
    left: 16px !important;
    transform: none;
  }

  .price-inputs {
    flex-direction: column;
  }
}
</style>
