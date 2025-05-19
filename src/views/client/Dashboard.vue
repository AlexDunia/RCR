<script setup>
import { ref, onMounted, computed } from 'vue';
import { useClientStore } from '@/stores/clientStore';
import { useListingStore } from '@/stores/listingStore';
import { useTourStore } from '@/stores/tourStore';

const clientStore = useClientStore();
const listingStore = useListingStore();
const tourStore = useTourStore();

// Mock client ID for demo purposes
const clientId = 1;

// Client data
const client = computed(() => {
  return clientStore.getClientById(clientId);
});

// Get saved and viewed properties
const clientInteractions = computed(() => {
  const details = clientStore.getClientFullDetails(clientId);
  return details?.interactions || {
    mostViewedListings: [],
    mostSavedListings: [],
    attendedTours: [],
  };
});

// Get upcoming tours
const upcomingTours = computed(() => {
  return tourStore.getUpcomingToursByClient(clientId) || [];
});

// Property statistics
const stats = ref({
  savedProperties: 0,
  viewedProperties: 0,
  upcomingTours: 0,
  messagesUnread: 3
});

onMounted(() => {
  // Update statistics
  stats.value.savedProperties = clientInteractions.value.mostSavedListings.length;
  stats.value.viewedProperties = clientInteractions.value.mostViewedListings.length;
  stats.value.upcomingTours = upcomingTours.value.length;
});

// Get featured properties (for recommendations)
const featuredProperties = computed(() => {
  return listingStore.getFeaturedListings(4);
});

// Format date for better display
const formatDate = (dateString) => {
  const options = { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};
</script>

<template>
  <div class="client-dashboard">
    <div class="dashboard-header">
      <h1>Welcome, {{ client?.name || 'Client' }}</h1>
      <p class="subtitle">Your real estate journey at a glance</p>
    </div>

    <div class="statistics-cards">
      <div class="stat-card">
        <div class="stat-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z" stroke="#006064" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="stat-content">
          <h3>{{ stats.savedProperties }}</h3>
          <p>Saved Properties</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="11" cy="11" r="8" stroke="#006064" stroke-width="2"/>
            <path d="M21 21L16.65 16.65" stroke="#006064" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="stat-content">
          <h3>{{ stats.viewedProperties }}</h3>
          <p>Viewed Properties</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="4" width="18" height="18" rx="2" stroke="#006064" stroke-width="2"/>
            <path d="M16 2V6" stroke="#006064" stroke-width="2" stroke-linecap="round"/>
            <path d="M8 2V6" stroke="#006064" stroke-width="2" stroke-linecap="round"/>
            <path d="M3 10H21" stroke="#006064" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="stat-content">
          <h3>{{ stats.upcomingTours }}</h3>
          <p>Upcoming Tours</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z" stroke="#006064" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="stat-content">
          <h3>{{ stats.messagesUnread }}</h3>
          <p>Unread Messages</p>
        </div>
      </div>
    </div>

    <div class="dashboard-grid">
      <div class="dashboard-section saved-properties">
        <div class="section-header">
          <h2>Saved Properties</h2>
          <router-link to="/saved-listings" class="view-all">View All</router-link>
        </div>
        <div class="property-grid" v-if="clientInteractions.mostSavedListings.length > 0">
          <div class="property-card" v-for="property in clientInteractions.mostSavedListings.slice(0, 2)" :key="property.id">
            <div class="property-image" :style="{ backgroundImage: `url(${property.images[0]})` }">
              <div class="property-price">${{ property.price.toLocaleString() }}</div>
            </div>
            <div class="property-info">
              <h3>{{ property.address }}</h3>
              <p class="property-specs">
                {{ property.bedrooms }} bd | {{ property.bathrooms }} ba | {{ property.sqft.toLocaleString() }} sqft
              </p>
              <p class="property-location">{{ property.city }}, {{ property.state }}</p>
            </div>
          </div>
        </div>
        <div class="empty-state" v-else>
          <p>You haven't saved any properties yet.</p>
          <router-link to="/property-search" class="primary-button">Start Searching</router-link>
        </div>
      </div>

      <div class="dashboard-section upcoming-tours">
        <div class="section-header">
          <h2>Upcoming Tours</h2>
          <router-link to="/client-messages" class="view-all">Contact Agent</router-link>
        </div>
        <div class="tours-list" v-if="upcomingTours.length > 0">
          <div class="tour-card" v-for="tour in upcomingTours.slice(0, 3)" :key="tour.id">
            <div class="tour-date">
              <span class="day">{{ new Date(tour.dateTime).getDate() }}</span>
              <span class="month">{{ new Date(tour.dateTime).toLocaleString('default', { month: 'short' }) }}</span>
            </div>
            <div class="tour-details">
              <h3>{{ tour.property?.address || 'Property Tour' }}</h3>
              <p>{{ formatDate(tour.dateTime) }}</p>
              <p class="agent-name">With: {{ tour.agent?.name || 'Your Agent' }}</p>
            </div>
          </div>
        </div>
        <div class="empty-state" v-else>
          <p>You have no upcoming tours scheduled.</p>
          <p class="scheduling-note">Property tours can only be scheduled by contacting your agent directly.</p>
          <router-link to="/client-messages" class="primary-button">Contact Your Agent</router-link>
        </div>
      </div>
    </div>

    <div class="dashboard-section recommendations">
      <div class="section-header">
        <h2>Recommended for You</h2>
        <router-link to="/property-search" class="view-all">See More</router-link>
      </div>
      <div class="property-grid recommendations-grid">
        <div class="property-card" v-for="property in featuredProperties" :key="property.id">
          <div class="property-image" :style="{ backgroundImage: `url(${property.images[0]})` }">
            <div class="property-price">${{ property.price.toLocaleString() }}</div>
          </div>
          <div class="property-info">
            <h3>{{ property.address }}</h3>
            <p class="property-specs">
              {{ property.bedrooms }} bd | {{ property.bathrooms }} ba | {{ property.sqft.toLocaleString() }} sqft
            </p>
            <p class="property-location">{{ property.city }}, {{ property.state }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.client-dashboard {
  padding: 24px 32px;
  background: #F8F9FB;
  min-height: 100vh;
}

.dashboard-header {
  margin-bottom: 24px;
}

.welcome-text {
  font-size: 24px;
  font-weight: 600;
  color: #1A1A1A;
  margin: 0 0 8px 0;
}

.subtitle {
  color: #666666;
  font-size: 16px;
  margin: 0;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.stat-card {
  background: white;
  border-radius: 12px;
  border: 1px solid #E5E5E5;
  padding: 24px;
}

.stat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.stat-title {
  font-size: 16px;
  font-weight: 500;
  color: #666666;
  margin: 0;
}

.stat-value {
  font-size: 28px;
  font-weight: 600;
  color: #1A1A1A;
  margin: 0;
}

.stat-change {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  margin-top: 8px;
}

.content-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
}

.section-card {
  background: white;
  border-radius: 12px;
  border: 1px solid #E5E5E5;
  padding: 24px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #1A1A1A;
  margin: 0;
}

.view-all {
  color: #1849A9;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 4px;
}

.property-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
}

.property-card {
  border: 1px solid #E5E5E5;
  border-radius: 8px;
  overflow: hidden;
}

.property-image {
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
}

.property-details {
  padding: 16px;
}

.property-price {
  font-size: 18px;
  font-weight: 600;
  color: #1A1A1A;
  margin: 0 0 8px 0;
}

.property-location {
  font-size: 14px;
  color: #666666;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.activity-item {
  display: flex;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  background: #F8F9FB;
}

.activity-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #E5E5E5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.activity-content {
  flex: 1;
  min-width: 0;
}

.activity-title {
  font-size: 14px;
  font-weight: 500;
  color: #1A1A1A;
  margin: 0 0 4px 0;
}

.activity-time {
  font-size: 12px;
  color: #666666;
  margin: 0;
}

/* Responsive Breakpoints */
@media (max-width: 1200px) {
  .content-grid {
    grid-template-columns: 3fr 2fr;
  }

  .property-list {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}

@media (max-width: 992px) {
  .content-grid {
    grid-template-columns: 1fr;
  }

  .dashboard-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}

@media (max-width: 768px) {
  .dashboard {
    padding: 16px;
  }

  .welcome-text {
    font-size: 20px;
  }

  .subtitle {
    font-size: 14px;
  }

  .stat-card {
    padding: 16px;
  }

  .stat-value {
    font-size: 24px;
  }

  .section-card {
    padding: 16px;
  }

  .property-list {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .activity-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .activity-icon {
    width: 32px;
    height: 32px;
  }
}
</style>
