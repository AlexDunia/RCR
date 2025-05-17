<template>
  <div class="client-dashboard" :class="{ 'is-mounted': isMounted }">
    <!-- Welcome Banner -->
    <div class="welcome-banner">
      <h1>Hi {{ userName }}, Welcome.</h1>
      <p>Here's an overview of your real estate journey and recent activities.</p>
    </div>

    <!-- Stats Cards -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-header">SAVED PROPERTIES</div>
        <div class="stat-value">12</div>
        <div class="stat-action">
          <span>view</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-header">VIEWINGS</div>
        <div class="stat-value">5</div>
        <div class="stat-action">
          <span>view</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-header">DOCUMENTS</div>
        <div class="stat-value">8</div>
        <div class="stat-action">
          <span>view</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-header">MESSAGES</div>
        <div class="stat-value">3</div>
        <div class="stat-action">
          <span>view</span>
        </div>
      </div>
    </div>

    <!-- Dashboard Content -->
    <div class="dashboard-grid">
      <!-- Featured Properties -->
      <div class="dashboard-card">
        <div class="card-header">
          <h2>Featured Properties</h2>
          <router-link to="/client/properties" class="view-all">View All Properties</router-link>
        </div>
        <div class="property-list">
          <div class="property-item" v-for="property in featuredProperties" :key="property.id">
            <img :src="property.image" :alt="property.name" class="property-image">
            <div class="property-details">
              <h3>{{ property.name }}</h3>
              <p class="property-location">{{ property.location }}</p>
              <p class="property-price">${{ property.price.toLocaleString() }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Documents -->
      <div class="dashboard-card">
        <div class="card-header">
          <h2>Recent Documents</h2>
          <router-link to="/client/documents" class="view-all">View All</router-link>
        </div>
        <div class="documents-list">
          <div class="document-item" v-for="doc in recentDocuments" :key="doc.id">
            <div class="document-icon" :class="doc.type">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
              </svg>
            </div>
            <div class="document-info">
              <h4>{{ doc.name }}</h4>
              <p>{{ doc.date }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Upcoming Viewings -->
      <div class="dashboard-card">
        <div class="card-header">
          <h2>Upcoming Viewings</h2>
          <router-link to="/client/viewings" class="view-all">View Calendar</router-link>
        </div>
        <div class="viewings-list">
          <div class="viewing-item" v-for="viewing in upcomingViewings" :key="viewing.id">
            <div class="viewing-date">
              <span class="date">{{ viewing.date }}</span>
              <span class="time">{{ viewing.time }}</span>
            </div>
            <div class="viewing-details">
              <h4>{{ viewing.propertyName }}</h4>
              <p>{{ viewing.address }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoleStore } from '@/stores/roleStore';

const roleStore = useRoleStore();
const isMounted = ref(false);

// Get user name from role store
const userName = computed(() => {
  const user = roleStore.getCurrentUser();
  return user?.name || 'Client';
});

// Sample data
const featuredProperties = [
  {
    id: 1,
    name: "Luxury Waterfront Villa",
    location: "Miami Beach, FL",
    price: 1250000,
    image: "https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548295/newtwoimage1_2_ti4hfi.png"
  },
  {
    id: 2,
    name: "Modern Downtown Loft",
    location: "New York, NY",
    price: 850000,
    image: "https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548284/Rectangle_227_ncwnmz.png"
  }
];

const upcomingViewings = [
  {
    id: 1,
    date: 'Jun 15',
    time: '2:00 PM',
    propertyName: 'Luxury Waterfront Villa',
    address: '123 Ocean Drive, Miami Beach'
  }
];

const recentDocuments = [
  {
    id: 1,
    name: 'Purchase Agreement.pdf',
    type: 'pdf',
    date: 'Added Jun 12, 2023'
  },
  {
    id: 2,
    name: 'Property Inspection Report',
    type: 'doc',
    date: 'Added Jun 10, 2023'
  },
  {
    id: 3,
    name: 'Mortgage Pre-Approval',
    type: 'pdf',
    date: 'Added Jun 8, 2023'
  },
  {
    id: 4,
    name: 'Property Tax Statement',
    type: 'doc',
    date: 'Added Jun 5, 2023'
  }
];

onMounted(() => {
  setTimeout(() => {
    isMounted.value = true;
  }, 50);
});
</script>

<style scoped>
.client-dashboard {
  padding: 24px;
  max-width: 1600px;
  margin: 0 auto;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.client-dashboard.is-mounted {
  opacity: 1;
}

.welcome-banner {
  background: linear-gradient(to right, #e6ffe6, #e6f3ff);
  padding: 24px;
  border-radius: 12px;
  margin-bottom: 24px;
}

.welcome-banner h1 {
  font-size: 24px;
  color: #1a237e;
  margin: 0;
  font-weight: 600;
}

.welcome-banner p {
  margin: 8px 0 0;
  color: #546e7a;
  font-size: 16px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 24px;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.stat-header {
  color: #64748b;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 32px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 8px;
}

.stat-action {
  color: #3b82f6;
  font-size: 14px;
  cursor: pointer;
}

.stat-action:hover {
  text-decoration: underline;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.dashboard-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.card-header {
  padding: 16px 20px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h2 {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}

.view-all {
  color: #3b82f6;
  text-decoration: none;
  font-size: 14px;
}

.view-all:hover {
  text-decoration: underline;
}

/* Property List */
.property-list {
  padding: 20px;
}

.property-item {
  display: flex;
  gap: 16px;
  padding: 12px;
  border-bottom: 1px solid #e5e7eb;
}

.property-item:last-child {
  border-bottom: none;
}

.property-image {
  width: 120px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
}

.property-details h3 {
  margin: 0 0 4px;
  font-size: 15px;
  font-weight: 600;
  color: #1e293b;
}

.property-location {
  margin: 0 0 4px;
  font-size: 14px;
  color: #64748b;
}

.property-price {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #0f766e;
}

/* Viewings List */
.viewings-list {
  padding: 20px;
}

.viewing-item {
  display: flex;
  gap: 16px;
  padding: 12px;
  border-bottom: 1px solid #e5e7eb;
}

.viewing-item:last-child {
  border-bottom: none;
}

.viewing-date {
  display: flex;
  flex-direction: column;
  min-width: 80px;
}

.viewing-date .date {
  font-size: 15px;
  font-weight: 600;
  color: #1e293b;
}

.viewing-date .time {
  font-size: 13px;
  color: #64748b;
}

.viewing-details h4 {
  margin: 0 0 4px;
  font-size: 15px;
  font-weight: 600;
  color: #1e293b;
}

.viewing-details p {
  margin: 0;
  font-size: 14px;
  color: #64748b;
}

/* Documents List */
.documents-list {
  padding: 20px;
}

.document-item {
  display: flex;
  gap: 12px;
  padding: 12px;
  border-bottom: 1px solid #e5e7eb;
  align-items: center;
}

.document-item:last-child {
  border-bottom: none;
}

.document-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background-color: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3b82f6;
}

.document-info h4 {
  margin: 0 0 4px;
  font-size: 14px;
  font-weight: 500;
  color: #1e293b;
}

.document-info p {
  margin: 0;
  font-size: 13px;
  color: #64748b;
}

@media (max-width: 1200px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .dashboard-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .welcome-banner {
    padding: 16px;
  }

  .client-dashboard {
    padding: 16px;
  }
}
</style>
