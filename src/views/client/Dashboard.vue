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
  padding: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.dashboard-header {
  margin-bottom: 24px;
}

.dashboard-header h1 {
  font-size: 28px;
  margin: 0;
  color: #333;
}

.subtitle {
  color: #666;
  margin: 8px 0 0 0;
  font-size: 16px;
}

.statistics-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
  margin-bottom: 30px;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  display: flex;
  align-items: center;
  transition: transform 0.2s, box-shadow 0.2s;
}

.stat-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  background: rgba(0, 96, 100, 0.1);
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
}

.stat-content h3 {
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  color: #006064;
}

.stat-content p {
  font-size: 14px;
  margin: 4px 0 0 0;
  color: #666;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 30px;
}

.dashboard-section {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.section-header h2 {
  font-size: 18px;
  margin: 0;
}

.view-all {
  color: #006064;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
}

.view-all:hover {
  text-decoration: underline;
}

.property-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
}

.property-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s, box-shadow 0.2s;
}

.property-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.property-image {
  height: 160px;
  background-size: cover;
  background-position: center;
  position: relative;
}

.property-price {
  position: absolute;
  bottom: 8px;
  left: 8px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 500;
  font-size: 14px;
}

.property-info {
  padding: 16px;
}

.property-info h3 {
  font-size: 16px;
  margin: 0 0 8px 0;
  line-height: 1.3;
}

.property-specs,
.property-location {
  margin: 0;
  color: #666;
  font-size: 14px;
  line-height: 1.5;
}

.tours-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.tour-card {
  display: flex;
  align-items: center;
  padding: 12px;
  border-radius: 8px;
  background: #f9f9f9;
  transition: transform 0.2s;
}

.tour-card:hover {
  transform: translateX(4px);
  background: #f0f0f0;
}

.tour-date {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: #006064;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
}

.tour-date .day {
  font-weight: 700;
  font-size: 18px;
}

.tour-date .month {
  font-size: 12px;
  text-transform: uppercase;
}

.tour-details h3 {
  margin: 0;
  font-size: 15px;
}

.tour-details p {
  margin: 4px 0 0 0;
  font-size: 13px;
  color: #666;
}

.agent-name {
  font-weight: 500;
  color: #006064 !important;
}

.recommendations {
  margin-top: 20px;
}

.recommendations-grid {
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
}

.empty-state {
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  text-align: center;
}

.empty-state p {
  margin: 0 0 16px 0;
  color: #666;
}

.primary-button {
  display: inline-block;
  background: #006064;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.2s;
}

.primary-button:hover {
  background: #00796b;
}

.scheduling-note {
  font-size: 14px;
  color: #666;
  margin: 8px 0 16px;
  font-style: italic;
}

@media (max-width: 768px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }

  .statistics-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .statistics-cards {
    grid-template-columns: 1fr;
  }
}
</style>
