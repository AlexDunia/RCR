<template>
  <div class="client-dashboard">
    <div class="welcome-card">
      <h2>Hello Client {{ clientStore.currentClient.name || '' }}! Welcome to your dashboard.</h2>
      <p>Here, you can browse properties, find advisors, and manage your real estate journey.</p>
    </div>

    <div class="stats-grid">
      <div class="stat-group">
        <div class="stat-label">VIEWED PROPERTIES</div>
        <div class="stat-value">{{ clientStats.viewedProperties }}</div>
      </div>

      <div class="stat-group">
        <div class="stat-label">SAVED PROPERTIES</div>
        <div class="stat-value">{{ clientStats.savedProperties }}</div>
        <router-link to="/client/favorites" class="stat-link">view</router-link>
      </div>

      <div class="stat-group">
        <div class="stat-label">SCHEDULED TOURS</div>
        <div class="stat-value">{{ clientStats.scheduledTours }}</div>
        <router-link to="/client/tours" class="stat-link">view</router-link>
      </div>

      <div class="stat-group">
        <div class="stat-label">DOCUMENTS</div>
        <div class="stat-value">{{ clientStats.documents }}</div>
        <router-link to="/client/documents" class="stat-link">view</router-link>
      </div>
    </div>

    <div class="section-title">Featured Properties</div>

    <div class="property-grid">
      <div v-for="property in featuredProperties" :key="property.id" class="property-card">
        <div class="property-image" :style="{ backgroundImage: `url(${property.image})` }">
          <div class="property-badge">{{ property.status }}</div>
          <button class="favorite-btn" :class="{ active: property.isFavorite }">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
        </div>
        <div class="property-details">
          <div class="property-price">${{ property.price.toLocaleString() }}</div>
          <div class="property-address">{{ property.address }}</div>
          <div class="property-features">
            <div class="feature">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              <span>{{ property.bedrooms }} bd</span>
            </div>
            <div class="feature">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 4h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2zm0 8h14"></path>
              </svg>
              <span>{{ property.bathrooms }} ba</span>
            </div>
            <div class="feature">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2"></rect>
              </svg>
              <span>{{ property.sqft.toLocaleString() }} sqft</span>
            </div>
          </div>
        </div>
        <div class="property-actions">
          <router-link :to="`/client/properties/${property.id}`" class="view-btn">View Details</router-link>
          <button class="schedule-btn">Schedule Tour</button>
        </div>
      </div>
    </div>

    <div class="section-title">Recent Activity</div>

    <div class="activity-list">
      <div v-for="activity in recentActivity" :key="activity.id" class="activity-item">
        <div class="activity-icon" :class="activity.type">
          <svg v-if="activity.type === 'property_view'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
          <svg v-else-if="activity.type === 'save_property'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
          </svg>
          <svg v-else-if="activity.type === 'schedule_tour'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
        </div>
        <div class="activity-content">
          <div class="activity-text">{{ activity.text }}</div>
          <div class="activity-time">{{ activity.time }}</div>
        </div>
      </div>
    </div>

    <div class="section-title">Your Client Advisors</div>

    <div class="agents-grid">
      <div v-for="agent in recommendedAgents" :key="agent.id" class="agent-card">
        <div class="agent-image" :style="{ backgroundImage: `url(${agent.photo})` }"></div>
        <div class="agent-details">
          <div class="agent-name">{{ agent.name }}</div>
          <div class="agent-title">{{ agent.title }}</div>
          <div class="agent-stats">
            <div class="agent-stat">
              <span class="stat-value">{{ agent.listingCount }}</span>
              <span class="stat-label">Listings</span>
            </div>
            <div class="agent-stat">
              <span class="stat-value">{{ agent.experience }}</span>
              <span class="stat-label">Years</span>
            </div>
            <div class="agent-stat">
              <span class="stat-value">{{ agent.rating }}/5</span>
              <span class="stat-label">Rating</span>
            </div>
          </div>
        </div>
        <div class="agent-actions">
          <router-link :to="`/client/agents/${agent.id}`" class="view-profile-btn">View Profile</router-link>
          <button class="contact-btn">Contact Advisor</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue';

// Sample client data
const clientStore = {
  currentClient: {
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '(555) 123-4567'
  }
};

// Sample stats
const clientStats = reactive({
  viewedProperties: 27,
  savedProperties: 12,
  scheduledTours: 3,
  documents: 5
});

// Sample featured properties
const featuredProperties = reactive([
  {
    id: 1,
    address: '123 Main Street, San Francisco, CA',
    price: 1250000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1750,
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    status: 'For Sale',
    isFavorite: true
  },
  {
    id: 2,
    address: '456 Oak Avenue, Los Angeles, CA',
    price: 895000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1450,
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    status: 'For Sale',
    isFavorite: false
  },
  {
    id: 3,
    address: '789 Pine Road, San Diego, CA',
    price: 1450000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2100,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    status: 'New',
    isFavorite: false
  }
]);

// Sample activity data
const recentActivity = reactive([
  {
    id: 1,
    type: 'property_view',
    text: 'You viewed 123 Main Street, San Francisco',
    time: '2 hours ago'
  },
  {
    id: 2,
    type: 'save_property',
    text: 'You saved 456 Oak Avenue to favorites',
    time: '1 day ago'
  },
  {
    id: 3,
    type: 'schedule_tour',
    text: 'Tour scheduled for 789 Pine Road',
    time: '2 days ago'
  },
  {
    id: 4,
    type: 'document_upload',
    text: 'Pre-approval document uploaded',
    time: '3 days ago'
  }
]);

// Sample recommended agents
const recommendedAgents = reactive([
  {
    id: 1,
    name: 'Sarah Johnson',
    title: 'Senior Real Estate Agent',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    listingCount: 24,
    experience: 8,
    rating: 4.9
  },
  {
    id: 2,
    name: 'Michael Roberts',
    title: 'Luxury Property Specialist',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    listingCount: 18,
    experience: 12,
    rating: 4.7
  }
]);

onMounted(() => {
  console.log('Client Dashboard mounted');
  // In a real app, we would fetch client data, stats, properties, and agents here
});
</script>

<style scoped>
.client-dashboard {
  padding: 24px;
  background-color: #f8fafc;
  min-height: 100vh;
}

.welcome-card {
  background: linear-gradient(to right, #e0f7fa, #e3f2fd);
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 32px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.welcome-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
}

.welcome-card h2 {
  font-size: 24px;
  font-weight: 600;
  color: #1a4189;
  margin: 0 0 12px 0;
}

.welcome-card p {
  font-size: 15px;
  color: #546e7a;
  margin: 0;
  line-height: 1.6;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 32px;
}

.stat-group {
  background: white;
  border-radius: 12px;
  padding: 20px;
  position: relative;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.04);
}

.stat-group:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  border-color: rgba(26, 65, 137, 0.1);
}

.stat-label {
  font-size: 12px;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  margin-bottom: 8px;
  letter-spacing: 0.5px;
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
  transition: color 0.2s ease;
}

.stat-group:hover .stat-value {
  color: #1a4189;
}

.stat-link {
  position: absolute;
  right: 20px;
  bottom: 20px;
  color: #1a4189;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  margin: 32px 0 16px 0;
}

.property-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.property-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.property-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.property-image {
  height: 200px;
  background-size: cover;
  background-position: center;
  position: relative;
}

.property-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background: #1a4189;
  color: white;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.favorite-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  background: white;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #64748b;
  transition: all 0.2s ease;
}

.favorite-btn:hover, .favorite-btn.active {
  background: #fee2e2;
  color: #ef4444;
}

.favorite-btn.active svg {
  fill: #ef4444;
}

.property-details {
  padding: 16px;
}

.property-price {
  font-size: 20px;
  font-weight: 700;
  color: #1a4189;
  margin-bottom: 4px;
}

.property-address {
  font-size: 14px;
  color: #64748b;
  margin-bottom: 12px;
}

.property-features {
  display: flex;
  gap: 16px;
}

.feature {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #64748b;
  font-size: 13px;
}

.property-actions {
  display: flex;
  padding: 16px;
  border-top: 1px solid #e5e7eb;
  gap: 8px;
}

.view-btn, .schedule-btn {
  flex: 1;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.view-btn {
  background-color: #e5e7eb;
  color: #1e293b;
}

.view-btn:hover {
  background-color: #d1d5db;
}

.schedule-btn {
  background-color: #1a4189;
  color: white;
  border: none;
}

.schedule-btn:hover {
  background-color: #153170;
}

.activity-list {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.activity-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 12px 0;
  border-bottom: 1px solid #e5e7eb;
}

.activity-item:last-child {
  border-bottom: none;
}

.activity-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e5e7eb;
  color: #64748b;
}

.activity-icon.property_view {
  background-color: #e0f7fa;
  color: #0288d1;
}

.activity-icon.save_property {
  background-color: #f3e8ff;
  color: #9333ea;
}

.activity-icon.schedule_tour {
  background-color: #fef9c3;
  color: #ca8a04;
}

.activity-content {
  flex: 1;
}

.activity-text {
  font-size: 14px;
  color: #1e293b;
  margin-bottom: 4px;
}

.activity-time {
  font-size: 12px;
  color: #94a3b8;
}

.agents-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.agent-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.agent-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.agent-image {
  height: 150px;
  background-size: cover;
  background-position: center;
}

.agent-details {
  padding: 16px;
}

.agent-name {
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 4px;
}

.agent-title {
  font-size: 14px;
  color: #64748b;
  margin-bottom: 16px;
}

.agent-stats {
  display: flex;
  justify-content: space-between;
}

.agent-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-value {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
}

.stat-label {
  font-size: 12px;
  color: #64748b;
}

.agent-actions {
  display: flex;
  padding: 16px;
  border-top: 1px solid #e5e7eb;
  gap: 8px;
}

.view-profile-btn, .contact-btn {
  flex: 1;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.view-profile-btn {
  background-color: #e5e7eb;
  color: #1e293b;
}

.view-profile-btn:hover {
  background-color: #d1d5db;
}

.contact-btn {
  background-color: #1a4189;
  color: white;
  border: none;
}

.contact-btn:hover {
  background-color: #153170;
}

@media (max-width: 1024px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .client-dashboard {
    padding: 16px;
  }

  .welcome-card {
    padding: 24px;
  }

  .property-grid, .agents-grid {
    grid-template-columns: 1fr;
  }
}
</style>
