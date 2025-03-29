<script setup>
import { ref, computed, reactive, onMounted, watch, nextTick } from 'vue';
import { usePropertyStore } from "@/stores/propertyStore";
import { useRouter, useRoute } from "vue-router";
import { debounce } from 'lodash';
// The Loader component is no longer directly used in the template
// import Loader from "@/ui/Loader.vue";

const propertyStore = usePropertyStore();
const router = useRouter();
const route = useRoute();
const activeFilter = ref('all');
const showPriceDropdown = ref(false);
const showBedroomsDropdown = ref(false);
const showPropertyTypeDropdown = ref(false);
const showLocationDropdown = ref(false);
const locationSearchQuery = ref('');
const selectedLocation = ref(null);
const requestCount = ref(0); // For rate limiting
const lastRequestTime = ref(Date.now());
const isRateLimited = ref(false);
const searchQuery = ref(''); // Search input value

// CSRF token storage - should be set from your backend
const csrfToken = ref(document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '');

// Enhanced CSRF protection with token verification and refresh
const refreshCSRFToken = async () => {
  try {
    // Call the backend to get a fresh CSRF token - this should be implemented in your backend
    const response = await fetch('/api/csrf-token', {
      method: 'GET',
      credentials: 'include', // Important for cookies
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest' // To identify AJAX requests
      }
    });

    if (response.ok) {
      const data = await response.json();
      if (data.token) {
        csrfToken.value = data.token;

        // Also update meta tag
        const metaTag = document.querySelector('meta[name="csrf-token"]');
        if (metaTag) {
          metaTag.setAttribute('content', data.token);
        }
      }
    }
  } catch (error) {
    console.error('Failed to refresh CSRF token:', error);
  }
};

// Ensure CSRF token is included in all requests
const includeCSRFToken = (params = {}) => {
  if (csrfToken.value) {
    return {
      ...params,
      _token: csrfToken.value
    };
  }
  return params;
};

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

// Price range values with validation
const priceRange = reactive({
  min: '',
  max: '',
  validation: {
    min: { error: '', valid: true },
    max: { error: '', valid: true }
  }
});

// Input validation rules
const PRICE_VALIDATION_RULES = {
  MIN_VALUE: 0,
  MAX_VALUE: 1000000000, // $1 billion max
  REGEX: /^[0-9,]*$/,
  MAX_LENGTH: 12
};

// Bedroom validation rules
const VALID_BEDROOM_OPTIONS = ['1', '2', '3', '4', '5+'];

// Sanitize price input
const sanitizePriceInput = (value) => {
  if (!value) return '';
  // Remove any non-numeric characters except commas
  return value.replace(/[^0-9,]/g, '').slice(0, PRICE_VALIDATION_RULES.MAX_LENGTH);
};

// Sanitize string for XSS protection
const sanitizeString = (str) => {
  if (!str) return '';
  // Enhanced sanitization: trim and escape HTML special characters
  // Also removes potential script injections and dangerous attributes
  const sanitized = String(str)
    .trim()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .replace(/data:/gi, '')
    .replace(/vbscript:/gi, '');

  // Additional protection against unicode-based XSS attacks
  return sanitized.replace(/&#x([0-9a-f]+);/gi, '');
};

// Validate price input
const validatePriceInput = (value, type) => {
  if (!value) {
    return { error: '', valid: true };
  }

  // First check if input matches allowed pattern
  if (!PRICE_VALIDATION_RULES.REGEX.test(value)) {
    return { error: 'Invalid characters in price', valid: false };
  }

  // Remove commas for numeric comparison
  const numericValue = parseInt(value.replace(/,/g, ''));

  if (isNaN(numericValue)) {
    return { error: 'Please enter a valid number', valid: false };
  }

  if (numericValue < PRICE_VALIDATION_RULES.MIN_VALUE) {
    return { error: 'Price cannot be negative', valid: false };
  }

  if (numericValue > PRICE_VALIDATION_RULES.MAX_VALUE) {
    return { error: 'Price exceeds maximum allowed value', valid: false };
  }

  if (type === 'max' && priceRange.min && numericValue < parseInt(priceRange.min.replace(/,/g, ''))) {
    return { error: 'Maximum price must be greater than minimum price', valid: false };
  }

  if (type === 'min' && priceRange.max && numericValue > parseInt(priceRange.max.replace(/,/g, ''))) {
    return { error: 'Minimum price must be less than maximum price', valid: false };
  }

  return { error: '', valid: true };
};

// Handle price input change with validation only
const handlePriceInput = (value, type) => {
  const sanitizedValue = sanitizePriceInput(value);
  const validation = validatePriceInput(sanitizedValue, type);

  priceRange[type] = sanitizedValue;
  priceRange.validation[type] = validation;
  // No automatic filter application - intentionally removed
};

// Rate limiting check
const checkRateLimit = () => {
  const now = Date.now();
  const timeDiff = now - lastRequestTime.value;

  // Reset counter if more than 10 seconds have passed
  if (timeDiff > 10000) {
    requestCount.value = 0;
    isRateLimited.value = false;
  }

  // Increment request count
  requestCount.value++;
  lastRequestTime.value = now;

  // Rate limit: max 10 requests per 10 seconds
  if (requestCount.value > 10) {
    isRateLimited.value = true;
    setTimeout(() => {
      isRateLimited.value = false;
      requestCount.value = 0;
    }, 10000);
    return false;
  }

  return true;
};

// Handle enter key press
const handleEnterKey = async (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    if (priceRange.validation.min.valid && priceRange.validation.max.valid) {
      // Force loading state immediately before any other operations
      isLoading.value = true;

      // Apply filter after setting loading state
      await applyPriceFilter();
      showPriceDropdown.value = false; // Close dropdown after submission
    }
  }
};

// Handle blur (clicking outside) - no longer auto-applies
const handleBlur = () => {
  // Validation only, no auto-submission
};

// Active filters tracking
const activeFilters = reactive({
  price: false,
  bedrooms: null,
  propertyType: null,
  location: null
});

// Toggle price dropdown
const togglePriceDropdown = () => {
  showPriceDropdown.value = !showPriceDropdown.value;
  // Close other dropdowns if open
  showBedroomsDropdown.value = false;
  showPropertyTypeDropdown.value = false;
  showLocationDropdown.value = false;
};

// Format price for display
const formatPrice = (price) => {
  if (!price) return '$0';
  // Remove any non-numeric characters and parse
  const numericValue = parseInt(price.replace(/[^0-9]/g, ''));
  if (isNaN(numericValue)) return '$0';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(numericValue);
};

// Selected property type tracking
const selectedPropertyTypes = ref([]);

// Get property type label for display
const getPropertyTypeLabel = () => {
  return 'Property type'; // Always display "Property type" regardless of selections
};

// Toggle property type dropdown
const togglePropertyTypeDropdown = () => {
  showPropertyTypeDropdown.value = !showPropertyTypeDropdown.value;

  // Prevent body scrolling when modal is open
  if (showPropertyTypeDropdown.value) {
    // Store current selections to restore if canceled
    tempSelectedTypes.value = [...selectedPropertyTypes.value];

    document.body.classList.add('modal-open');
    document.body.style.overflow = 'hidden'; // Ensure no scrolling

    // Force header below modal
    const header = document.querySelector('.header');
    if (header) {
      header.style.position = 'relative';
      header.style.zIndex = '10';
    }
  } else {
    // Apply current selections when closing normally
    updatePropertyType();

    document.body.classList.remove('modal-open');
    document.body.style.overflow = ''; // Restore scrolling

    // Restore header styling
    const header = document.querySelector('.header');
    if (header) {
      header.style.position = '';
      header.style.zIndex = '';
    }
  }

  // Close other dropdowns if open
  showPriceDropdown.value = false;
  showBedroomsDropdown.value = false;
  showLocationDropdown.value = false;
};

// Store temporary selections for cancellation
const tempSelectedTypes = ref([]);

// Toggle property type selection (checkbox behavior)
const togglePropertyType = (value) => {
  // Validate property type value first
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
  // No need to call updatePropertyType here as we'll apply when closing
};

// Apply property type selections to filters
const updatePropertyType = () => {
  // Validate all selections first
  const validSelections = selectedPropertyTypes.value.filter(type =>
    VALID_PROPERTY_TYPES.includes(type)
  );

  if (validSelections.length > 0) {
    activeFilters.propertyType = [...validSelections];
  } else {
    activeFilters.propertyType = null;
  }

  isLoading.value = true; // Show loading immediately
  applyFilters();
  updateURL();
};

// Close modal properly - this applies the current selection
const closePropertyTypeModal = () => {
  // Apply current selections
  updatePropertyType();

  showPropertyTypeDropdown.value = false;
  document.body.classList.remove('modal-open');
  document.body.style.overflow = ''; // Restore scrolling

  // Restore header styling
  const header = document.querySelector('.header');
  if (header) {
    header.style.position = '';
    header.style.zIndex = '';
  }
};

// Cancel property type selection (X button)
const cancelPropertyTypeSelection = () => {
  // Restore previous selections
  selectedPropertyTypes.value = [...tempSelectedTypes.value];

  showPropertyTypeDropdown.value = false;
  document.body.classList.remove('modal-open');
  document.body.style.overflow = ''; // Restore scrolling

  // Restore header styling
  const header = document.querySelector('.header');
  if (header) {
    header.style.position = '';
    header.style.zIndex = '';
  }
};

// Countries data with flags (using emoji flags)
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
  { code: 'AR', name: 'Argentina', flag: '🇦🇷' },
];

// Create a map of valid country codes for validation
const VALID_COUNTRY_CODES = countries.reduce((acc, country) => {
  acc[country.code] = true;
  return acc;
}, {});

// Filtered countries based on search
const filteredCountries = computed(() => {
  if (!locationSearchQuery.value) return countries;
  // Sanitize search query
  const query = sanitizeString(locationSearchQuery.value).toLowerCase();
  return countries.filter(country =>
    country.name.toLowerCase().includes(query)
  );
});

// Toggle location dropdown
const toggleLocationDropdown = () => {
  showLocationDropdown.value = !showLocationDropdown.value;

  // Reset search when opening
  if (showLocationDropdown.value) {
    locationSearchQuery.value = '';
  }

  // Close other dropdowns if open
  showPriceDropdown.value = false;
  showBedroomsDropdown.value = false;
  showPropertyTypeDropdown.value = false;
};

// Select location
const selectLocation = (country) => {
  // Validate country first
  if (!country || !VALID_COUNTRY_CODES[country.code]) {
    console.error('Invalid country selection attempted:', country);
    return;
  }

  // Force loading state to true immediately
  isLoading.value = true;

  selectedLocation.value = country;
  activeFilters.location = sanitizeString(country.name);
  showLocationDropdown.value = false;

  // Apply filters with guaranteed loading state
  applyFilters();
  updateURL();
};

// Get selected location with flag
const getSelectedLocationDisplay = () => {
  if (!selectedLocation.value) return 'Location';
  return sanitizeString(selectedLocation.value.name);
};

// Safely parse integer with validation
const safeParseInt = (value, defaultValue = 0) => {
  if (!value) return defaultValue;

  // Remove commas first
  const cleanValue = String(value).replace(/,/g, '');

  // Only accept valid numeric strings
  if (!/^\d+$/.test(cleanValue)) {
    return defaultValue;
  }

  const parsed = parseInt(cleanValue, 10);
  if (isNaN(parsed)) {
    return defaultValue;
  }

  return parsed;
};

// Safely validate and sanitize URL parameters
const validateURLParameter = (param, validators) => {
  if (!param) return null;

  // String parameter
  if (validators.type === 'string') {
    const sanitized = sanitizeString(param);
    if (validators.enum && !validators.enum.includes(sanitized)) {
      return null; // Not in allowed values
    }
    return sanitized;
  }

  // Numeric parameter
  if (validators.type === 'number') {
    const num = safeParseInt(param, null);
    if (num === null) return null;

    if (validators.min !== undefined && num < validators.min) {
      return null;
    }
    if (validators.max !== undefined && num > validators.max) {
      return null;
    }
    return num;
  }

  // Array parameter
  if (validators.type === 'array') {
    let items = [];

    // Handle both string and array formats
    if (typeof param === 'string') {
      items = [param];
    } else if (Array.isArray(param)) {
      items = param;
    } else {
      return null;
    }

    // Validate each item
    return items.filter(item => {
      const sanitized = sanitizeString(item);
      return validators.items.includes(sanitized);
    });
  }

  return null;
};

// Initialize filters from URL query parameters with strict validation
const initializeFiltersFromURL = () => {
  const query = route.query;

  // Initialize price range with validation
  const minPrice = validateURLParameter(query.minPrice, {
    type: 'string',
    // Additional price validation is done by validatePriceInput
  });

  if (minPrice) {
    priceRange.min = minPrice;
    priceRange.validation.min = validatePriceInput(minPrice, 'min');
  }

  const maxPrice = validateURLParameter(query.maxPrice, {
    type: 'string',
    // Additional price validation is done by validatePriceInput
  });

  if (maxPrice) {
    priceRange.max = maxPrice;
    priceRange.validation.max = validatePriceInput(maxPrice, 'max');
  }

  if ((priceRange.min || priceRange.max) &&
      priceRange.validation.min.valid &&
      priceRange.validation.max.valid) {
    activeFilters.price = true;
  }

  // Initialize category filter
  const category = validateURLParameter(query.category, {
    type: 'string',
    enum: VALID_FILTERS
  });

  if (category) {
    activeFilter.value = category;
  }

  // Initialize bedrooms filter
  const bedrooms = validateURLParameter(query.bedrooms, {
    type: 'string',
    enum: VALID_BEDROOM_OPTIONS
  });

  if (bedrooms) {
    activeFilters.bedrooms = bedrooms;
  }

  // Initialize property type filter
  const propertyTypeParam = validateURLParameter(query.propertyType, {
    type: 'array',
    items: VALID_PROPERTY_TYPES
  });

  if (propertyTypeParam && propertyTypeParam.length > 0) {
    selectedPropertyTypes.value = [...propertyTypeParam];
    activeFilters.propertyType = [...propertyTypeParam];
  }

  // Initialize location filter
  const location = validateURLParameter(query.location, {
    type: 'string'
  });

  if (location) {
    // Look for a matching country
    const foundCountry = countries.find(c => c.name === location);

    if (foundCountry) {
      selectedLocation.value = foundCountry;
      activeFilters.location = foundCountry.name;
    } else {
      // Handle custom location - still sanitized but marked differently
      activeFilters.location = location;
      selectedLocation.value = {
        name: location,
        flag: '',
        code: 'CUSTOM' // Marked as custom for special handling
      };
    }
  }
};

// Update URL with current filters - with security enhancements
const updateURL = () => {
  if (isRateLimited.value) {
    console.warn('Rate limited: Skipping URL update');
    return;
  }

  if (!checkRateLimit()) {
    return; // Don't proceed if rate limited
  }

  const query = {};

  // Add price range to query with validation
  if (priceRange.min && priceRange.validation.min.valid) {
    query.minPrice = priceRange.min;
  }

  if (priceRange.max && priceRange.validation.max.valid) {
    query.maxPrice = priceRange.max;
  }

  // Add category filter
  if (activeFilter.value !== 'all' && VALID_FILTERS.includes(activeFilter.value)) {
    query.category = activeFilter.value;
  }

  // Add other filters when they have values
  if (activeFilters.bedrooms && VALID_BEDROOM_OPTIONS.includes(activeFilters.bedrooms)) {
    query.bedrooms = activeFilters.bedrooms;
  }

  // Handle property type array
  if (activeFilters.propertyType && activeFilters.propertyType.length > 0) {
    // Filter any invalid property types
    const validTypes = activeFilters.propertyType.filter(
      type => VALID_PROPERTY_TYPES.includes(type)
    );

    if (validTypes.length > 0) {
      query.propertyType = validTypes;
    }
  }

  // Handle location with encoding
  if (activeFilters.location) {
    query.location = sanitizeString(activeFilters.location);
  }

  // Add CSRF token using the helper function
  const secureQuery = includeCSRFToken(query);

  // Update URL without reloading the page
  try {
    router.replace({ query: secureQuery }).catch(() => {});
  } catch (e) {
    console.error('Error updating URL:', e);
  }
};

// Make sure every filter action triggers the loading state
const applyPriceFilter = async () => {
  if (!priceRange.validation.min.valid || !priceRange.validation.max.valid) {
    return;
  }

  if (priceRange.min || priceRange.max) {
    activeFilters.price = true;
  } else {
    activeFilters.price = false;
  }

  if (isRateLimited.value) {
    return;
  }

  // Force loading state to true immediately
  isLoading.value = true;

  // Use nextTick to ensure DOM updates before proceeding
  await nextTick();

  // Small delay to ensure rendering has time to complete
  await new Promise(resolve => setTimeout(resolve, 30));

  // Apply filters with guaranteed loading state
  applyFilters();
  updateURL();
};

// Clear single filter
const clearFilter = (filterType) => {
  if (isRateLimited.value) {
    return;
  }

  // Force loading state to be visible
  isLoading.value = true;

  if (filterType === 'price') {
    priceRange.min = '';
    priceRange.max = '';
    activeFilters.price = false;
    priceRange.validation.min = { error: '', valid: true };
    priceRange.validation.max = { error: '', valid: true };
  } else if (filterType === 'propertyType') {
    selectedPropertyTypes.value = [];
    activeFilters.propertyType = null;
  } else if (filterType === 'location') {
    selectedLocation.value = null;
    activeFilters.location = null;
  } else if (filterType === 'all') {
    // Reset all filters
    priceRange.min = '';
    priceRange.max = '';
    activeFilters.price = false;
    priceRange.validation.min = { error: '', valid: true };
    priceRange.validation.max = { error: '', valid: true };
    activeFilters.bedrooms = null;
    activeFilters.propertyType = null;
    activeFilters.location = null;
    activeFilter.value = 'all';
    selectedPropertyTypes.value = [];
    selectedLocation.value = null;
  }

  // Apply filters with loading state
  applyFilters();
  updateURL();
};

// Count active filters
const activeFilterCount = computed(() => {
  let count = 0;
  if (activeFilters.price) count++;
  if (activeFilters.bedrooms) count++;
  if (activeFilters.propertyType) count++;
  if (activeFilters.location) count++;
  if (activeFilter.value !== 'all') count++;
  return count;
});

// Set filter
const setFilter = (filter) => {
  // Validate filter value
  if (!VALID_FILTERS.includes(filter)) {
    console.error('Invalid filter attempted:', filter);
    return;
  }

  if (isRateLimited.value) {
    return;
  }

  // Force loading state to true immediately
  isLoading.value = true;

  activeFilter.value = filter;

  // Apply filters with guaranteed loading state
  applyFilters();
  updateURL();
};

// Calculate filtered properties based on active filter - with security measures
const properties = computed(() => {
  let filtered = propertyStore.properties;

  try {
    // Apply category filter
    switch(activeFilter.value) {
      case 'sale':
        filtered = filtered.filter(p => {
          const price = safeParseInt(p.price?.replace(/[^0-9]/g, ''), 0);
          return price > 40000;
        });
        break;
      case 'rent':
        filtered = filtered.filter(p => {
          const price = safeParseInt(p.price?.replace(/[^0-9]/g, ''), 0);
          return price <= 40000;
        });
        break;
      case 'new':
        filtered = filtered.slice(-3);
        break;
    }

    // Apply price range filter if values are provided - safely
    if (priceRange.min) {
      const minPrice = safeParseInt(priceRange.min.replace(/,/g, ''), 0);
      filtered = filtered.filter(p => {
        const price = safeParseInt(p.price?.replace(/[^0-9]/g, ''), 0);
        return price >= minPrice;
      });
    }

    if (priceRange.max) {
      const maxPrice = safeParseInt(priceRange.max.replace(/,/g, ''), Number.MAX_SAFE_INTEGER);
      filtered = filtered.filter(p => {
        const price = safeParseInt(p.price?.replace(/[^0-9]/g, ''), 0);
        return price <= maxPrice;
      });
    }

    // Apply bedrooms filter - safely
    if (activeFilters.bedrooms) {
      if (activeFilters.bedrooms === '5+') {
        // Filter for 5 or more bedrooms
        filtered = filtered.filter(p => {
          const bedroomCount = safeParseInt(p.bedrooms, 0);
          return bedroomCount >= 5;
        });
      } else {
        // Filter for exact bedroom count
        filtered = filtered.filter(p => p.bedrooms === activeFilters.bedrooms);
      }
    }

    // Apply property type filter - safely
    if (activeFilters.propertyType && activeFilters.propertyType.length > 0) {
      filtered = filtered.filter(p => {
        // If property has a type that matches any of the selected types
        return activeFilters.propertyType.some(type => {
          const propertyType = sanitizeString(p.propertyType || '');
          const itemType = sanitizeString(p.type || '');

          return propertyType === type ||
                 propertyType?.includes(type) ||
                 itemType === type ||
                 itemType?.includes(type);
        });
      });
    }

    // Apply location filter - safely
    if (activeFilters.location) {
      const locationSearch = sanitizeString(activeFilters.location).toLowerCase();

      filtered = filtered.filter(p => {
        const location = sanitizeString(p.location || '').toLowerCase();
        const country = sanitizeString(p.country || '').toLowerCase();
        const city = sanitizeString(p.city || '').toLowerCase();

        return location.includes(locationSearch) ||
               country.includes(locationSearch) ||
               city.includes(locationSearch);
      });
    }
  } catch (e) {
    console.error('Error filtering properties:', e);
    // Return empty array on error to avoid exposing unfiltered data
    return [];
  }

  return filtered;
});

// View property details
const viewProperty = (propertyId) => {
  // Validate property ID format
  if (!propertyId || typeof propertyId !== 'string' && typeof propertyId !== 'number') {
    console.error('Invalid property ID:', propertyId);
    return;
  }

  // Sanitize property ID if it's a string
  const id = typeof propertyId === 'string' ? sanitizeString(propertyId) : propertyId;

  router.push(`/property/${id}`);
};

// Bedrooms options
const bedroomOptions = [
  { value: '1', label: 'One' },
  { value: '2', label: 'Two' },
  { value: '3', label: 'Three' },
  { value: '4', label: 'Four' },
  { value: '5+', label: 'Others (5+ years)' }
];

// Toggle bedrooms dropdown
const toggleBedroomsDropdown = () => {
  showBedroomsDropdown.value = !showBedroomsDropdown.value;
  // Close other dropdowns if open
  showPriceDropdown.value = false;
  showPropertyTypeDropdown.value = false;
  showLocationDropdown.value = false;
};

// Select bedroom option
const selectBedrooms = (option) => {
  // Validate bedrooms option
  if (!option || !VALID_BEDROOM_OPTIONS.includes(option.value)) {
    console.error('Invalid bedroom option:', option);
    return;
  }

  if (isRateLimited.value) {
    return;
  }

  // Force loading state to true immediately
  isLoading.value = true;

  activeFilters.bedrooms = option.value;
  showBedroomsDropdown.value = false;

  // Apply filters with guaranteed loading state
  applyFilters();
  updateURL();
};

// Close dropdowns when clicking outside
const closeDropdowns = (event) => {
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

// Property type modal overlay click handling
const handleOverlayClick = (event) => {
  // Check if the click is directly on the overlay (not its children)
  if (event.target.classList.contains('property-type-modal-overlay')) {
    closePropertyTypeModal();
  }
};

// Get label for property type value
const getPropertyTypeLabels = (selectedValues) => {
  if (!selectedValues || selectedValues.length === 0) return [];

  const labels = [];
  selectedValues.forEach(value => {
    // Sanitize value
    const sanitizedValue = sanitizeString(value);

    // Search through all property types to find the matching option
    for (const category in propertyTypes) {
      const option = propertyTypes[category].options.find(opt => opt.value === sanitizedValue);
      if (option) {
        labels.push(sanitizeString(option.label));
        break;
      }
    }
  });

  return labels;
};

// Add isLoading state for filtering
const isLoading = ref(false);

// Enhanced applyFilters with server-side validation
const applyFilters = debounce(async () => {
  console.log("Loading state active, showing loaders");

  // Force the loading state to true immediately
  // This is crucial to ensure loading shows for all filter types
  isLoading.value = true;

  // Small delay to ensure DOM updates with loading state before proceeding
  await new Promise(resolve => setTimeout(resolve, 50));

  try {
    // Only make the API call if not rate limited
    if (!isRateLimited.value) {
      // Prepare filter data with sanitized values
      const filterData = {
        category: sanitizeString(activeFilter.value),
        price: {
          min: priceRange.min ? sanitizeString(priceRange.min) : null,
          max: priceRange.max ? sanitizeString(priceRange.max) : null
        },
        bedrooms: activeFilters.bedrooms ? sanitizeString(activeFilters.bedrooms) : null,
        propertyType: activeFilters.propertyType ?
          activeFilters.propertyType.map(type => sanitizeString(type)) : null,
        location: activeFilters.location ? sanitizeString(activeFilters.location) : null
      };

      // Make server request to validate and apply filters
      const response = await fetch('/api/properties/filter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrfToken.value,
          'X-Requested-With': 'XMLHttpRequest'
        },
        credentials: 'same-origin',
        body: JSON.stringify(filterData)
      });

      if (response.ok) {
        const data = await response.json();
        // Update properties with filtered results from server
        // This ensures all filtering logic is validated server-side
        propertyStore.setFilteredProperties(data.properties);
      } else {
        console.error('Filter request failed:', response.status);
      }
    }
  } catch (error) {
    console.error('Error applying filters:', error);
  } finally {
    // Force a minimum loading time for visual feedback
    setTimeout(() => {
      console.log("Loading complete, showing filtered results");
      isLoading.value = false;
    }, 1500); // Extended delay to ensure loading is clearly visible
  }
}, 0);

// Watch for filter changes and update URL
watch([activeFilter, activeFilters], () => {
  updateURL();
}, { deep: true });

// Initialize filters from URL on component mount
onMounted(() => {
  initializeFiltersFromURL();

  // Initial CSRF token refresh
  refreshCSRFToken();

  // For production, refresh CSRF token periodically
  setInterval(() => {
    refreshCSRFToken();
  }, 30 * 60 * 1000); // Every 30 minutes
});

// Add a watch on isLoading state to track changes
watch(isLoading, (newValue) => {
  console.log(`Loading state changed to: ${newValue ? 'active' : 'inactive'}`);
}, { immediate: true });

// Create computed property to handle loading state
const displayProperties = computed(() => {
  // When in loading state, return placeholder or modified properties with loading indicators
  if (isLoading.value === true) {
    console.log("Loading state is active, showing skeleton loaders");
    // Ensure we have enough items to display during loading
    const propertyCount = Math.max(properties.value.length, 6);

    // Create array of properties or placeholders with loading state
    return Array(propertyCount).fill().map((_, i) => {
      if (i < properties.value.length) {
        // Add isLoading flag to actual properties
        return { ...properties.value[i], isLoading: true };
      } else {
        // Create placeholder items if needed
        return {
          id: `loading-${i}`,
          isLoading: true,
          name: '',
          location: '',
          price: '',
          image: ''
        };
      }
    });
  }

  // When not loading, return actual properties
  console.log("Loading complete, showing actual properties");
  return properties.value.map(prop => ({ ...prop, isLoading: false }));
});

// ... existing code ...
const validateSearchQuery = (query) => {
  if (!query) return true;

  // Basic search query validation
  const sanitized = sanitizeString(query);

  // Check for SQL injection patterns
  const sqlInjectionPattern = /(\b(select|insert|update|delete|from|where|drop|union|exec|declare|create)\b)|(['";])/i;
  if (sqlInjectionPattern.test(sanitized)) {
    console.warn('Potential SQL injection detected in search query');
    return false;
  }

  // Check for excessive special characters that might indicate an attack
  const specialCharsPattern = /[^\w\s\-.,?!]/g;
  const specialCharsCount = (sanitized.match(specialCharsPattern) || []).length;
  if (specialCharsCount > 5) {
    console.warn('Excessive special characters in search query');
    return false;
  }

  return true;
};

// Perform search with server-side validation
const performSearch = async () => {
  if (isRateLimited.value || !searchQuery.value.trim()) {
    return;
  }

  if (!checkRateLimit()) {
    return; // Don't proceed if rate limited
  }

  // Client-side validation before sending to server
  if (!validateSearchQuery(searchQuery.value)) {
    console.error('Invalid search query detected');
    searchQuery.value = ''; // Clear invalid query
    return;
  }

  // Sanitize search query
  const sanitizedQuery = sanitizeString(searchQuery.value);

  isLoading.value = true; // Show loading immediately

  try {
    // Call backend API with sanitized input and CSRF token
    const response = await fetch('/api/properties/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': csrfToken.value,
        'X-Requested-With': 'XMLHttpRequest'
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        query: sanitizedQuery,
        filters: {
          category: activeFilter.value,
          price: {
            min: priceRange.min,
            max: priceRange.max
          },
          bedrooms: activeFilters.bedrooms,
          propertyType: activeFilters.propertyType,
          location: activeFilters.location
        }
      })
    });

    if (response.ok) {
      const data = await response.json();
      // Update property store with search results
      propertyStore.setSearchResults(data.properties);
    } else {
      console.error('Search request failed:', response.status);
    }
  } catch (error) {
    console.error('Error during search:', error);
  } finally {
    setTimeout(() => {
      isLoading.value = false;
    }, 1000);
  }
};
// ... existing code ...
</script>

<template>
  <div @click="closeDropdowns">
    <!-- CSP meta tags for additional security -->
    <teleport to="head">
      <meta http-equiv="Content-Security-Policy"
            content="default-src 'self';
                    script-src 'self';
                    style-src 'self' 'unsafe-inline';
                    img-src 'self' https://res.cloudinary.com data:;
                    connect-src 'self';
                    frame-src 'none';
                    object-src 'none';">
    </teleport>

    <!-- Main content area with padding -->
    <div class="main-content">
      <!-- Hero section with background image -->
      <div class="hero-section">
        <div class="hero-content">
          <h1>All Properties</h1>
          <p>Get up to date with the latest properties for you.</p>

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
            @keydown.enter="performSearch"
            maxlength="100"
          />
          <span class="search-key">⌘ K</span>
        </div>

        <div class="filters">
          <div class="price-filter-container" @click="togglePriceDropdown">
            <div class="filter-dropdown">
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
                    :value="priceRange.min"
                    @input="(e) => handlePriceInput(e.target.value, 'min')"
                    @keydown="handleEnterKey"
                    @blur="handleBlur"
                    placeholder="Your minimum price range"
                    @click.stop
                    :class="{ 'error': !priceRange.validation.min.valid }"
                    aria-label="Minimum price"
                    autocomplete="off"
                    maxlength="12"
                  />
                  <span class="error-message" v-if="!priceRange.validation.min.valid">
                    {{ priceRange.validation.min.error }}
                  </span>
                </div>
                <div class="price-input-group">
                  <label>Max($):</label>
                  <input
                    type="text"
                    :value="priceRange.max"
                    @input="(e) => handlePriceInput(e.target.value, 'max')"
                    @keydown="handleEnterKey"
                    @blur="handleBlur"
                    placeholder="Your maximum price range"
                    @click.stop
                    :class="{ 'error': !priceRange.validation.max.valid }"
                    aria-label="Maximum price"
                    autocomplete="off"
                    maxlength="12"
                  />
                  <span class="error-message" v-if="!priceRange.validation.max.valid">
                    {{ priceRange.validation.max.error }}
                  </span>
                </div>
              </div>
              <div class="price-filter-actions">
                <button
                  @click.stop="async () => { isLoading.value = true; await applyPriceFilter(); showPriceDropdown.value = false; }"
                  :disabled="!priceRange.validation.min.valid || !priceRange.validation.max.valid"
                >
                  Done
                </button>
              </div>
            </div>
          </div>

          <div class="bedrooms-filter-container" @click="toggleBedroomsDropdown">
            <div class="filter-dropdown" :class="{ 'active': showBedroomsDropdown }">
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

          <div class="location-filter-container" @click="toggleLocationDropdown">
            <div class="filter-dropdown" :class="{ 'active': showLocationDropdown }">
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

      <!-- Property listings with transition -->
      <div class="properties-container">
        <transition-group name="property-list" tag="div" class="properties-grid">
          <div v-for="(property, index) in displayProperties" :key="property.id || index" class="property-card">
            <!-- Property card structure is preserved, with skeleton loaders for each element when loading -->
            <div class="property-image" :class="{ 'skeleton-loading': property.isLoading }">
              <div v-if="property.isLoading" class="image-skeleton"></div>
              <img v-else :src="property.image" :alt="property.name" />
              <button v-if="!property.isLoading" class="favorite-btn">
                <i class="far fa-heart"></i>
              </button>
            </div>

            <div class="property-info">
              <!-- Title with skeleton loader -->
              <h3 :class="{ 'skeleton-loading': property.isLoading }">
                <span v-if="!property.isLoading">{{ property.name }}</span>
                <span v-else class="skeleton-text"></span>
              </h3>

              <!-- Location with skeleton loader -->
              <p class="location" :class="{ 'skeleton-loading': property.isLoading }">
                <span v-if="!property.isLoading">{{ property.location }}</span>
                <span v-else class="skeleton-text"></span>
              </p>

              <!-- Price with skeleton loader -->
              <p class="price" :class="{ 'skeleton-loading': property.isLoading }">
                <span v-if="!property.isLoading">{{ property.price }}</span>
                <span v-else class="skeleton-text"></span>
              </p>

              <!-- Button with skeleton loader -->
              <div class="view-btn-container" :class="{ 'skeleton-loading': property.isLoading }">
                <button v-if="!property.isLoading" class="view-btn" @click="viewProperty(property.id)">
                  View property
                </button>
                <div v-else class="skeleton-button"></div>
              </div>
            </div>
          </div>

          <!-- No results state -->
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
  </div>

  <!-- Property Type Modal using teleport -->
  <teleport to="body">
    <div v-if="showPropertyTypeDropdown" class="property-type-modal-overlay" @click="handleOverlayClick">
      <div class="property-type-modal">
        <div class="modal-header">
          <h3>Select Property Type</h3>
          <button class="close-button" @click="cancelPropertyTypeSelection">×</button>
        </div>

        <div class="property-type-categories">
          <div class="property-type-category">
            <div class="category-label">Residential</div>
            <div class="property-type-options">
              <label class="property-option">
                <input type="checkbox" name="propertyType" value="houses" @change="togglePropertyType('houses')" :checked="selectedPropertyTypes.includes('houses')">
                <span class="custom-radio"></span>
                <span class="option-label">Houses</span>
              </label>
              <label class="property-option">
                <input type="checkbox" name="propertyType" value="apartments" @change="togglePropertyType('apartments')" :checked="selectedPropertyTypes.includes('apartments')">
                <span class="custom-radio"></span>
                <span class="option-label">Apartments</span>
              </label>
              <label class="property-option">
                <input type="checkbox" name="propertyType" value="condos" @change="togglePropertyType('condos')" :checked="selectedPropertyTypes.includes('condos')">
                <span class="custom-radio"></span>
                <span class="option-label">Condos</span>
              </label>
            </div>
          </div>
          <div class="property-type-category">
            <div class="category-label">Commercial</div>
            <div class="property-type-options">
              <label class="property-option">
                <input type="checkbox" name="propertyType" value="office_space" @change="togglePropertyType('office_space')" :checked="selectedPropertyTypes.includes('office_space')">
                <span class="custom-radio"></span>
                <span class="option-label">Office space</span>
              </label>
              <label class="property-option">
                <input type="checkbox" name="propertyType" value="retail_stores" @change="togglePropertyType('retail_stores')" :checked="selectedPropertyTypes.includes('retail_stores')">
                <span class="custom-radio"></span>
                <span class="option-label">Retail stores</span>
              </label>
              <label class="property-option">
                <input type="checkbox" name="propertyType" value="warehouse" @change="togglePropertyType('warehouse')" :checked="selectedPropertyTypes.includes('warehouse')">
                <span class="custom-radio"></span>
                <span class="option-label">Warehouse</span>
              </label>
            </div>
          </div>
          <div class="property-type-category">
            <div class="category-label">Land</div>
            <div class="property-type-options">
              <label class="property-option">
                <input type="checkbox" name="propertyType" value="plots" @change="togglePropertyType('plots')" :checked="selectedPropertyTypes.includes('plots')">
                <span class="custom-radio"></span>
                <span class="option-label">Plots(Urban or Rural)</span>
              </label>
              <label class="property-option">
                <input type="checkbox" name="propertyType" value="agricultural" @change="togglePropertyType('agricultural')" :checked="selectedPropertyTypes.includes('agricultural')">
                <span class="custom-radio"></span>
                <span class="option-label">Agricultural land</span>
              </label>
              <label class="property-option">
                <input type="checkbox" name="propertyType" value="warehouse_land" @change="togglePropertyType('warehouse_land')" :checked="selectedPropertyTypes.includes('warehouse_land')">
                <span class="custom-radio"></span>
                <span class="option-label">Warehouse</span>
              </label>
            </div>
          </div>
          <div class="property-type-category">
            <div class="category-label">Other (optional)</div>
            <div class="property-type-options">
              <label class="property-option">
                <input type="checkbox" name="propertyType" value="vacation_homes" @change="togglePropertyType('vacation_homes')" :checked="selectedPropertyTypes.includes('vacation_homes')">
                <span class="custom-radio"></span>
                <span class="option-label">Vacation homes</span>
              </label>
              <label class="property-option">
                <input type="checkbox" name="propertyType" value="multi_family" @change="togglePropertyType('multi_family')" :checked="selectedPropertyTypes.includes('multi_family')">
                <span class="custom-radio"></span>
                <span class="option-label">Multi-family homes (duplexes, triplexes).</span>
              </label>
              <label class="property-option">
                <input type="checkbox" name="propertyType" value="specialty" @change="togglePropertyType('specialty')" :checked="selectedPropertyTypes.includes('specialty')">
                <span class="custom-radio"></span>
                <span class="option-label">Specialty properties (e.g., farms, vineyards).</span>
              </label>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button class="done-button" @click="updatePropertyType(); closePropertyTypeModal()">Done</button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<style scoped>
.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 35px;
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
    justify-content: center;
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

.price-filter-container {
  position: relative;
  display: inline-block;
}

.price-dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  width: 320px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 100;
  margin-top: 10px;
  padding: 16px;
  border: 1px solid #e2e8f0;
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
  background-color: white;
}

.price-input-group input:focus {
  border-color: #0066ff;
  box-shadow: 0 0 0 2px rgba(0, 102, 255, 0.1);
}

.price-input-group input::placeholder {
  color: #cbd5e1;
}

.price-input-group input.error {
  border-color: #dc2626;
  background-color: #fff5f5;
}

.price-input-group input.error:focus {
  box-shadow: 0 0 0 2px rgba(220, 38, 38, 0.1);
}

.price-filter-actions {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
}

.price-filter-actions button {
  background-color: #0066ff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.price-filter-actions button:hover {
  background-color: #0052cc;
}

.price-filter-actions button:disabled {
  background-color: #e2e8f0;
  cursor: not-allowed;
}

/* No results styling */
.no-results {
  grid-column: 1 / -1;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 280px;
  background-color: #f9fafb;
  border-radius: 12px;
  margin: 20px 0;
  z-index: 1;
  border: 1px solid rgba(226, 232, 240, 0.7);
  box-shadow: 0 1px 3px rgba(148, 163, 184, 0.05);
}

.no-results-content {
  text-align: center;
  padding: 40px;
  max-width: 350px;
}

.no-results-icon {
  width: 45px;
  height: 45px;
  margin: 0 auto 15px;
  color: #94A3B8;
}

.no-results-content h3 {
  font-size: 17px;
  font-weight: 500;
  margin-bottom: 8px;
  color: #64748B;
}

.no-results-content p {
  font-size: 14px;
  color: #94A3B8;
  margin: 0 auto 16px;
  line-height: 1.5;
}

/* Active Filters styling */
.active-filters-container {
  margin: 15px 0 25px;
  animation: fadeIn 0.3s ease;
  background-color: #ffffff;
  padding: 16px;
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
  color: #64748B;
  font-weight: 600;
}

.clear-all-btn {
  background: none;
  border: none;
  color: #0066ff;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.2s;
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
  gap: 6px;
  padding: 6px 12px;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 13px;
  color: #64748B;
  transition: all 0.2s ease;
  animation: fadeIn 0.3s ease;
}

.filter-tag:hover {
  border-color: #cbd5e1;
  background-color: #f1f5f9;
}

.remove-tag {
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: #94a3b8;
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
  padding: 0;
  margin-left: 4px;
  transition: all 0.2s;
  width: 20px;
  height: 20px;
  border-radius: 50%;
}

.remove-tag:hover {
  background-color: #f1f5f9;
  color: #475569;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.error {
  border-color: #dc2626 !important;
}

.error-message {
  color: #dc2626;
  font-size: 12px;
  margin-top: 4px;
  display: block;
}

.no-results-actions {
  margin-top: 20px;
}

.reset-filters-btn {
  background-color: #0066ff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 102, 255, 0.15);
}

.reset-filters-btn:hover {
  background-color: #0052cc;
  transform: translateY(-1px);
  box-shadow: 0 4px 6px rgba(0, 102, 255, 0.2);
}

.reset-filters-btn:active {
    transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 102, 255, 0.15);
}

.bedrooms-filter-container {
  position: relative;
  display: inline-block;
}

.bedrooms-dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  width: 200px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 100;
  margin-top: 10px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
}

.bedrooms-options {
  display: flex;
  flex-direction: column;
}

.bedroom-option {
  padding: 12px 16px;
  font-size: 14px;
  color: #64748B;
  cursor: pointer;
  transition: all 0.2s ease;
  background: white;
}

.bedroom-option:hover {
  background-color: #f8fafc;
  color: #0066ff;
}

.bedroom-option.selected {
  background-color: #f0f7ff;
  color: #0066ff;
}

.filter-dropdown.active {
  border-color: #0066ff;
  color: #0066ff;
}

.property-type-filter-container {
  position: relative;
  display: inline-block;
}

.property-type-dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  width: 380px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  z-index: 100;
  margin-top: 10px;
  border: 1px solid #e2e8f0;
  padding: 0;
  overflow: hidden;
}

.select-property-type {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #e2e8f0;
}

.select-property-type h3 {
  font-size: 16px;
  font-weight: 500;
  color: #1e293b;
  margin: 0;
}

.close-button {
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 4px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.close-button:hover {
  color: #1e293b;
}

.property-type-categories {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;
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

.category-options {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.property-type-option {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0;
  font-size: 14px;
  color: #64748B;
  cursor: pointer;
  transition: all 0.2s ease;
  background: white;
}

.property-type-option:hover {
  color: #0066ff;
}

.property-type-option.selected {
  color: #0066ff;
}

.radio-button {
  width: 20px;
  height: 20px;
  border: 2px solid #cbd5e1;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.property-type-option:hover .radio-button {
  border-color: #0066ff;
}

.property-type-option.selected .radio-button {
  border-color: #0066ff;
}

.radio-inner {
  width: 10px;
  height: 10px;
  background-color: #0066ff;
  border-radius: 50%;
}

.property-type-actions {
  padding: 16px 20px;
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid #e2e8f0;
}

.property-type-actions button {
  background-color: #0066ff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.property-type-actions button:hover {
  background-color: #0052cc;
}

.filter-dropdown.active {
  border-color: #0066ff;
  color: #0066ff;
}

/* Property Type Modal */
.property-type-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000000; /* Ultra high z-index */
  animation: fadeIn 0.2s ease-out;
  pointer-events: all;
}

.property-type-modal {
  position: relative;
  width: 550px;
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  animation: scaleIn 0.2s ease-out;
}

/* Modal header with close button */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #e5e7eb;
}

.modal-header h3 {
  font-size: 18px;
  font-weight: 500;
  color: #374151;
  margin: 0;
}

.close-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s;
}

.close-button:hover {
  background-color: #f3f4f6;
}

/* Property type sections */
.property-type-section {
  padding: 16px 20px;
}

.section-label {
  font-size: 16px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 16px;
}

.property-type-options {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

@media (max-width: 600px) {
  .property-type-options {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 450px) {
  .property-type-options {
    grid-template-columns: 1fr;
  }
}

/* Property option styling */
.property-option {
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.property-option input[type="checkbox"] {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.custom-radio {
  width: 20px;
  height: 20px;
  border: 2px solid #cbd5e1;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.property-option input[type="checkbox"]:checked + .custom-radio::after {
  content: "";
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #0066ff;
  display: block;
}

.property-option:hover .custom-radio {
  border-color: #0066ff;
}

.property-option input[type="checkbox"]:checked + .custom-radio {
  border-color: #0066ff;
}

.option-label {
  font-size: 14px;
  color: #64748b;
  transition: color 0.2s ease;
}

.property-option:hover .option-label {
  color: #0066ff;
}

.property-option input[type="checkbox"]:checked ~ .option-label {
  color: #0066ff;
}

/* Footer with done button */
.modal-footer {
  padding: 16px 20px;
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid #e5e7eb;
}

.done-button {
  background-color: #0066ff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.done-button:hover {
  background-color: #0052cc;
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes scaleIn {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

/* Modal open state for body */
:global(.modal-open) {
  overflow: hidden !important;
  position: fixed;
  width: 100%;
  height: 100%;
}

/* Location dropdown styling */
.location-filter-container {
  position: relative;
  display: inline-block;
}

.location-dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  width: 320px;
  max-height: 400px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 100;
  margin-top: 10px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.location-search {
  padding: 12px 16px;
  border-bottom: 1px solid #e2e8f0;
}

.location-search-input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  transition: all 0.2s;
}

.location-search-input:focus {
  border-color: #0066ff;
  box-shadow: 0 0 0 2px rgba(0, 102, 255, 0.1);
}

.suggested-countries {
  overflow-y: auto;
  max-height: 300px;
}

.suggested-header {
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 600;
  color: #64748B;
  background: #f8fafc;
}

.country-option {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
  transition: all 0.2s;
  border-bottom: 1px solid #f1f5f9;
}

.country-option:hover {
  background-color: #f8fafc;
}

.country-option.selected {
  background-color: #f0f7ff;
}

.country-flag {
  margin-right: 12px;
  font-size: 16px;
}

.country-name {
  font-size: 14px;
  color: #334155;
}

/* Transitions for property list items */
.property-list-move,
.property-list-enter-active,
.property-list-leave-active {
  transition: all 0.5s ease;
}

.property-list-enter-from,
.property-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.property-list-leave-active {
  position: absolute;
}

.properties-container {
  position: relative;
  min-height: 200px;
}

/* Loading state */
.properties-loading {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
  border-radius: 12px;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #0066ff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Per-card loading state - enhanced visibility */
.property-card-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 300px;
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  border: 1px solid #eaeaea;
}

/* Remove the old spinner styles since we're using the Loader component */
.loading-spinner {
  width: 50px;
  height: 50px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #0066ff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Skeleton loading styles */
.skeleton-loading {
  position: relative;
  overflow: hidden;
}

.skeleton-loading::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0));
  animation: skeleton-shine 1.5s infinite;
}

.image-skeleton {
  width: 100%;
  height: 100%;
  background-color: #e9ecef;
  position: absolute;
  top: 0;
  left: 0;
}

.skeleton-text {
  display: block;
  height: 0.8em;
  background-color: #e9ecef;
  border-radius: 4px;
  width: 100%;
}

h3.skeleton-loading .skeleton-text {
  height: 1.2em;
  width: 90%;
}

.location.skeleton-loading .skeleton-text {
  width: 70%;
}

.price.skeleton-loading .skeleton-text {
  width: 40%;
}

.skeleton-button {
  height: 36px;
  width: 100%;
  background-color: #e9ecef;
  border-radius: 6px;
}

@keyframes skeleton-shine {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
</style>
