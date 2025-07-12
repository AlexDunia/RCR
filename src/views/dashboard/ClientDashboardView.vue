<template>
  <div class="client-dashboard" :class="{ 'is-mounted': isMounted }">
    <!-- Stats Cards -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        </div>
        <div class="stat-content">
          <h3>12</h3>
          <p>Saved Properties</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
        </div>
        <div class="stat-content">
          <h3>5</h3>
          <p>Upcoming Viewings</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
        </div>
        <div class="stat-content">
          <h3>8</h3>
          <p>Documents</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </div>
        <div class="stat-content">
          <h3>3</h3>
          <p>Messages</p>
        </div>
      </div>
    </div>

    <!-- Featured Properties -->
    <div class="section">
      <h2 class="section-title">Featured Properties</h2>
      <div class="property-grid">
        <div v-for="property in featuredProperties" :key="property.id" class="property-card">
          <img :src="property.image" :alt="property.name" class="property-image">
          <div class="property-details">
            <h3>{{ property.name }}</h3>
            <p class="location">{{ property.location }}</p>
            <p class="price">{{ property.price }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Documents -->
    <div class="section">
      <h2 class="section-title">Recent Documents</h2>
      <div class="documents-list">
        <div class="document-item">
          <div class="document-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
            </svg>
          </div>
          <div class="document-info">
            <h4>Purchase Agreement</h4>
            <p>Added 2 days ago</p>
          </div>
        </div>
        <div class="document-item">
          <div class="document-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
            </svg>
          </div>
          <div class="document-info">
            <h4>Property Inspection Report</h4>
            <p>Added 5 days ago</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Upcoming Viewings -->
    <div class="section">
      <h2 class="section-title">Upcoming Viewings</h2>
      <div class="viewings-list">
        <div class="viewing-item">
          <div class="viewing-date">
            <span class="date">15</span>
            <span class="month">JUN</span>
          </div>
          <div class="viewing-details">
            <h4>Luxury Villa Viewing</h4>
            <p>123 Beverly Hills Dr, 2:00 PM</p>
          </div>
        </div>
        <div class="viewing-item">
          <div class="viewing-date">
            <span class="date">18</span>
            <span class="month">JUN</span>
          </div>
          <div class="viewing-details">
            <h4>Modern Apartment Tour</h4>
            <p>456 Downtown Ave, 11:30 AM</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const isMounted = ref(false);

// Sample data
const featuredProperties = [
  {
    id: 1,
    name: 'Luxury Villa',
    location: 'Beverly Hills',
    price: '$2,500,000',
    image: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1746790261/300_e7yggy.jpg'
  },
  {
    id: 2,
    name: 'Modern Apartment',
    location: 'Downtown',
    price: '$850,000',
    image: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1746790261/300_1_gdilxy.jpg'
  },
  {
    id: 3,
    name: 'Seaside Condo',
    location: 'Malibu',
    price: '$1,200,000',
    image: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1746790260/300_3_inul8p.jpg'
  }
];

onMounted(() => {
  setTimeout(() => {
    isMounted.value = true;
  }, 100);
});
</script>

<style scoped>
.client-dashboard {
  padding: 24px;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;
}

.client-dashboard.is-mounted {
  opacity: 1;
  transform: translateY(0);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.stat-icon {
  width: 48px;
  height: 48px;
  background: #f0f9ff;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0066cc;
}

.stat-content h3 {
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  color: #1a1a1a;
}

.stat-content p {
  margin: 4px 0 0;
  color: #666;
  font-size: 14px;
}

.section {
  background: white;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 20px;
  color: #1a1a1a;
}

.property-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.property-card {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.property-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.property-details {
  padding: 16px;
}

.property-details h3 {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 600;
}

.location {
  color: #666;
  font-size: 14px;
  margin: 0 0 8px;
}

.price {
  color: #0066cc;
  font-weight: 600;
  margin: 0;
}

.documents-list,
.viewings-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.document-item,
.viewing-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: #f8fafc;
  border-radius: 8px;
}

.document-icon {
  color: #0066cc;
}

.document-info h4,
.viewing-details h4 {
  margin: 0 0 4px;
  font-size: 14px;
  font-weight: 600;
}

.document-info p,
.viewing-details p {
  margin: 0;
  font-size: 12px;
  color: #666;
}

.viewing-date {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #0066cc;
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  min-width: 60px;
}

.date {
  font-size: 18px;
  font-weight: 600;
}

.month {
  font-size: 12px;
  text-transform: uppercase;
}

@media (max-width: 768px) {
  .client-dashboard {
    padding: 16px;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .property-grid {
    grid-template-columns: 1fr;
  }
}
</style>
