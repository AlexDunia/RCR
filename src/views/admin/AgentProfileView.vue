<template>
  <div class="agent-profile-page">
    <div class="profile-header">
      <div class="avatar-container">
        <img :src="agent?.avatar || '/images/avatar-1.jpg'" alt="Agent avatar" class="profile-avatar" />
      </div>
      <div class="agent-info">
        <h1 class="profile-name">{{ agent?.name || 'Alex Dunia' }}</h1>
        <p class="agent-title">Senior Real Estate Agent</p>
      </div>
    </div>

    <div class="nav-container">
      <div class="tab-buttons">
        <button
          class="tab-button"
          :class="{ active: activeTab === 'bio' }"
          @click="navigateTo('bio')"
        >Bio</button>
        <button
          class="tab-button"
          :class="{ active: activeTab === 'listings' }"
          @click="navigateTo('listings')"
        >Listings</button>
        <button
          class="tab-button"
          :class="{ active: activeTab === 'documents' }"
          @click="navigateTo('documents')"
        >Documents</button>
        <button
          class="tab-button"
          :class="{ active: activeTab === 'connections' }"
          @click="navigateTo('connections')"
        >Connections</button>
        <button
          class="tab-button"
          :class="{ active: activeTab === 'tours' }"
          @click="navigateTo('tours')"
        >Tours</button>
        <button
          class="tab-button"
          :class="{ active: activeTab === 'tasks' }"
          @click="navigateTo('tasks')"
        >Tasks</button>
      </div>
    </div>

    <div class="profile-content">
      <!-- Bio Tab Content -->
      <div v-if="activeTab === 'bio'" class="profile-section">
        <div class="section-header">
          <h2 class="section-title">{{ agent?.name || 'Alex Dunia' }} personal Information</h2>
          <button class="edit-button">Edit profile as admin</button>
        </div>

        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">Full name</div>
            <div class="info-value">{{ agent?.name || 'Alex Dunia' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Email</div>
            <div class="info-value">{{ agent?.email || 'helloduniamedia@gmail.com' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Phone number</div>
            <div class="info-value">{{ agent?.phone || '08108725914' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Alternate phone number</div>
            <div class="info-value">{{ agent?.alternatePhone || '08108725914' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Agency/Company name</div>
            <div class="info-value">Soft branded real estate foundations limited.</div>
          </div>
          <div class="info-item">
            <div class="info-label">Agency/Company description</div>
            <div class="info-value">A real housing estate that wants your convenience, comfort and happiness.</div>
          </div>
        </div>

        <div class="profile-photo-container">
          <img src="/images/agent-profile.jpg" alt="Large profile photo" class="profile-photo" />
        </div>
      </div>

      <!-- Listings Tab Content -->
      <div v-if="activeTab === 'listings'" class="profile-section">
        <div class="search-filter-bar">
          <div class="search-container">
            <input type="text" placeholder="Search..." class="search-input" />
            <span class="search-shortcut">⌘ K</span>
          </div>
          <div class="filter-dropdowns">
            <div class="filter-dropdown">
              <button class="dropdown-btn">
                Price Range ($) <span class="dropdown-arrow">▾</span>
              </button>
            </div>
            <div class="filter-dropdown">
              <button class="dropdown-btn">
                Bedrooms <span class="dropdown-arrow">▾</span>
              </button>
            </div>
            <div class="filter-dropdown">
              <button class="dropdown-btn">
                Property type <span class="dropdown-arrow">▾</span>
              </button>
            </div>
            <div class="filter-dropdown">
              <button class="dropdown-btn">
                Location <span class="dropdown-arrow">▾</span>
              </button>
            </div>
          </div>
        </div>

        <div class="property-grid">
          <div v-for="n in 3" :key="n" class="property-card">
            <div class="property-image-container">
              <img src="https://res.cloudinary.com/dnuhjsckk/image/upload/v1718259997/house1_eogyom.jpg" alt="Property" class="property-image" />
            </div>
            <div class="property-content">
              <h3 class="property-title">Cedar Grove Estates</h3>
              <p class="property-location">Austin, Texas</p>
              <p class="property-price">$25,000</p>
              <button class="view-property-btn">View property</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';

// Define the tabs
const tabs = ['bio', 'listings', 'documents', 'connections', 'tours', 'tasks'];
const activeTab = ref('listings');

// Agent data
const agent = reactive({
  id: 5,
  name: 'Alex Dunia',
  title: 'Senior Real Estate Agent',
  email: 'alex.dunia@realtor.com',
  phone: '+1 (555) 123-4567',
  agency: 'Premium Real Estate Group',
  experience: '8 years',
  languages: 'English, Spanish',
  description: 'Alex is a dedicated real estate professional with over 8 years of experience in luxury and residential properties. Known for exceptional client service and market knowledge.',
  avatar: '/images/agent-5.jpg',
  ratings: {
    average: 4.8,
    count: 157
  }
});

// Listings data
const listings = ref([
  {
    id: 1,
    title: 'Modern Apartment with Ocean View',
    location: 'Miami Beach, FL',
    price: '$985,000',
    image: '/images/property-1.jpg',
    bedrooms: 3,
    bathrooms: 2,
    area: '1,850 sqft',
    status: 'For Sale'
  },
  {
    id: 2,
    title: 'Downtown Luxury Condo',
    location: 'Chicago, IL',
    price: '$750,000',
    image: '/images/property-2.jpg',
    bedrooms: 2,
    bathrooms: 2,
    area: '1,200 sqft',
    status: 'For Sale'
  },
  {
    id: 3,
    title: 'Spacious Family Home',
    location: 'Austin, TX',
    price: '$1,250,000',
    image: '/images/property-3.jpg',
    bedrooms: 4,
    bathrooms: 3,
    area: '2,800 sqft',
    status: 'For Sale'
  },
  {
    id: 4,
    title: 'Charming Suburban Cottage',
    location: 'Portland, OR',
    price: '$625,000',
    image: '/images/property-4.jpg',
    bedrooms: 3,
    bathrooms: 2,
    area: '1,650 sqft',
    status: 'For Sale'
  },
  {
    id: 5,
    title: 'Urban Loft with City Views',
    location: 'Seattle, WA',
    price: '$890,000',
    image: '/images/property-5.jpg',
    bedrooms: 1,
    bathrooms: 2,
    area: '1,100 sqft',
    status: 'For Sale'
  },
  {
    id: 6,
    title: 'Beachfront Villa',
    location: 'Malibu, CA',
    price: '$3,750,000',
    image: '/images/property-6.jpg',
    bedrooms: 5,
    bathrooms: 4,
    area: '4,200 sqft',
    status: 'For Sale'
  }
]);

// Setup route
const route = useRoute();

// Handle tab change
const navigateTo = (tab) => {
  activeTab.value = tab;
};

// Update tab from route query parameter on mount
onMounted(() => {
  if (route.query.tab && tabs.includes(route.query.tab)) {
    activeTab.value = route.query.tab;
  }

  // Load agent data
  // This would typically be an API call
  console.log('Loading agent data for ID:', route.params.id);
});

// Functions for filtering listings
const searchQuery = ref('');
const priceFilter = ref('Any price');
const bedroomsFilter = ref('Any bedrooms');
const propertyTypeFilter = ref('Any type');
const locationFilter = ref('Any location');

const handleSearchInput = (event) => {
  searchQuery.value = event.target.value;
};
</script>

<style scoped>
.agent-profile-page {
  max-width: 1280px;
  margin: 0 auto;
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  color: #374151;
  background-color: #fff;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 2rem 0;
  margin-left: 2rem;
}

.avatar-container {
  position: relative;
}

.profile-avatar {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.agent-info {
  display: flex;
  flex-direction: column;
}

.profile-name {
  font-size: 1.75rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.agent-title {
  font-size: 1rem;
  color: #6b7280;
  margin: 0;
  font-weight: 400;
}

.nav-container {
  padding: 0 2rem;
  margin: 1.5rem 0;
  margin-bottom: 2rem;
}

.tab-buttons {
  display: flex;
  gap: 0.75rem;
}

.tab-button {
  padding: 0.7rem 1.5rem;
  font-size: 0.95rem;
  font-weight: 500;
  color: #6b7280;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.tab-button:hover {
  color: #1a4189;
  border-color: #1a4189;
}

.tab-button.active {
  color: #1a4189;
  background-color: #f1f5f9;
  border-color: #e5e7eb;
  font-weight: 600;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1) inset;
}

.profile-content {
  padding: 0 2rem;
}

.profile-section {
  margin-bottom: 3rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1rem 1.5rem;
  background-color: #f1f5f9;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151;
  margin: 0;
}

.edit-button {
  padding: 0.6rem 1.2rem;
  background-color: #1a4189;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.edit-button:hover {
  background-color: #153471;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
  width: 60%;
  float: left;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.info-label {
  font-size: 0.875rem;
  color: #6b7280;
}

.info-value {
  font-size: 1rem;
  color: #111827;
  font-weight: 500;
}

.profile-photo-container {
  float: right;
  width: 35%;
  margin-top: -1rem;
}

.profile-photo {
  width: 100%;
  max-width: 300px;
  height: auto;
  border-radius: 0.75rem;
  object-fit: cover;
}

.search-filter-bar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  gap: 1rem;
}

.search-container {
  position: relative;
  flex-basis: 350px;
}

.search-input {
  padding: 0.75rem 1rem;
  padding-left: 2.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  width: 100%;
  font-size: 0.875rem;
  color: #4b5563;
}

.search-input::before {
  content: "🔍";
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
}

.search-shortcut {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280;
  font-size: 0.75rem;
  background-color: #f3f4f6;
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
}

.filter-dropdowns {
  display: flex;
  gap: 0.75rem;
}

.filter-dropdown {
  position: relative;
}

.dropdown-btn {
  padding: 0.75rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  background: white;
  color: #6b7280;
  cursor: pointer;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  font-weight: 500;
}

.dropdown-arrow {
  margin-left: 0.5rem;
  opacity: 0.6;
  font-size: 0.75rem;
}

.property-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.property-card {
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}

.property-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.property-image-container {
  height: 10rem;
  overflow: hidden;
}

.property-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.property-content {
  padding: 1rem;
}

.property-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.property-location {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0.25rem 0 0.5rem;
}

.property-price {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a4189;
  margin: 0.5rem 0;
}

.view-property-btn {
  width: 100%;
  padding: 0.75rem 0;
  background-color: white;
  color: #1a4189;
  border: 1px solid #1a4189;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  text-align: center;
}

.view-property-btn:hover {
  background-color: #1a4189;
  color: white;
}
</style>
