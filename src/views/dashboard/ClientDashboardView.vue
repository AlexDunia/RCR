<template>
  <div class="client-dashboard">
    <h1>Welcome to Your Client Dashboard</h1>

    <div class="dashboard-cards">
      <!-- Property Summary Card -->
      <div class="dashboard-card">
        <div class="card-header">
          <h2>My Properties</h2>
          <router-link to="/client-properties" class="view-all">View All</router-link>
        </div>
        <div class="card-content">
          <div class="property-stats">
            <div class="stat">
              <span class="stat-number">2</span>
              <span class="stat-label">Active Searches</span>
            </div>
            <div class="stat">
              <span class="stat-number">3</span>
              <span class="stat-label">Saved Properties</span>
            </div>
            <div class="stat">
              <span class="stat-number">1</span>
              <span class="stat-label">Upcoming Tours</span>
            </div>
          </div>

          <!-- Sample Properties Preview -->
          <div class="sample-properties">
            <div class="sample-property" @click="viewProperty(1)">
              <div class="property-image">
                <img src="https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548295/newtwoimage1_2_ti4hfi.png" alt="Cedar Grove Estates">
                <span class="status-badge new">New</span>
              </div>
              <div class="property-info">
                <h3>Cedar Grove Estates</h3>
                <p>Austin, Texas</p>
              </div>
            </div>
            <div class="sample-property" @click="viewProperty(2)">
              <div class="property-image">
                <img src="https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548284/Rectangle_227_ncwnmz.png" alt="Willow Creek Villa">
                <span class="status-badge saved">Saved</span>
              </div>
              <div class="property-info">
                <h3>Willow Creek Villa</h3>
                <p>Boulder, Colorado</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Documents Card -->
      <div class="dashboard-card">
        <div class="card-header">
          <h2>Documents</h2>
          <router-link to="/client-documents" class="view-all">View All</router-link>
        </div>
        <div class="card-content">
          <div class="document-list">
            <div class="document">
              <div class="document-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <div class="document-details">
                <span class="document-name">Purchase Agreement.pdf</span>
                <span class="document-date">Added: Jun 2, 2023</span>
              </div>
            </div>
            <div class="document">
              <div class="document-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <div class="document-details">
                <span class="document-name">Mortgage Approval.pdf</span>
                <span class="document-date">Added: May 27, 2023</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Appointments Card -->
      <div class="dashboard-card">
        <div class="card-header">
          <h2>Upcoming Appointments</h2>
          <router-link to="/client-appointments" class="view-all">View All</router-link>
        </div>
        <div class="card-content">
          <div class="appointment">
            <div class="appointment-date">
              <span class="day">12</span>
              <span class="month">JUN</span>
            </div>
            <div class="appointment-details">
              <h3>Property Viewing</h3>
              <p>123 Lake View Drive, 2:00 PM</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Messages Card -->
      <div class="dashboard-card">
        <div class="card-header">
          <h2>Recent Messages</h2>
          <router-link to="/client-messages" class="view-all">View All</router-link>
        </div>
        <div class="card-content">
          <div class="message">
            <div class="message-avatar">
              <img src="/images/default-avatar.jpg" alt="Agent avatar">
            </div>
            <div class="message-content">
              <div class="message-header">
                <span class="message-sender">John Smith (Agent)</span>
                <span class="message-time">2 hours ago</span>
              </div>
              <p class="message-text">I've scheduled a viewing for the property on Lake View Drive next week. Let me know if that works for you.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

// View property details
const viewProperty = (propertyId) => {
  router.push(`/client-property/${propertyId}`);
};
</script>

<style scoped>
.client-dashboard {
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
}

h1 {
  margin-bottom: 24px;
  font-size: 28px;
  font-weight: 600;
  color: #333;
}

.dashboard-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 24px;
}

.dashboard-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  height: 100%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #eee;
}

.card-header h2 {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  color: #333;
}

.view-all {
  color: #1a4189;
  font-size: 14px;
  text-decoration: none;
}

.view-all:hover {
  text-decoration: underline;
}

.card-content {
  padding: 20px;
}

/* Property Stats */
.property-stats {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.stat-number {
  font-size: 24px;
  font-weight: 600;
  color: #1a4189;
}

.stat-label {
  font-size: 14px;
  color: #666;
  margin-top: 4px;
}

/* Sample Properties Styles */
.sample-properties {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding-bottom: 8px;
}

.sample-property {
  flex: 0 0 200px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.sample-property:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.property-image {
  position: relative;
  height: 120px;
}

.property-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.status-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  background-color: rgba(255, 255, 255, 0.85);
}

.status-badge.new {
  background-color: #f9f0ff;
  color: #722ed1;
}

.status-badge.saved {
  background-color: #f6ffed;
  color: #52c41a;
}

.property-info {
  padding: 12px;
}

.property-info h3 {
  margin: 0 0 4px 0;
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.property-info p {
  margin: 0;
  font-size: 12px;
  color: #666;
}

/* Document Styles */
.document-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.document {
  display: flex;
  align-items: center;
  gap: 12px;
}

.document-icon {
  color: #1a4189;
}

.document-details {
  display: flex;
  flex-direction: column;
}

.document-name {
  font-weight: 500;
  color: #333;
}

.document-date {
  font-size: 12px;
  color: #666;
}

/* Appointment Styles */
.appointment {
  display: flex;
  align-items: center;
  gap: 16px;
}

.appointment-date {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 50px;
  border-radius: 8px;
  overflow: hidden;
  background: #f5f5f5;
}

.day {
  font-size: 20px;
  font-weight: 600;
  background: #1a4189;
  color: white;
  width: 100%;
  text-align: center;
  padding: 4px 0;
}

.month {
  font-size: 14px;
  color: #333;
  padding: 4px 0;
  text-align: center;
  width: 100%;
}

.appointment-details h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

.appointment-details p {
  margin: 4px 0 0;
  font-size: 14px;
  color: #666;
}

/* Message Styles */
.message {
  display: flex;
  gap: 12px;
}

.message-avatar img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.message-content {
  flex: 1;
}

.message-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
}

.message-sender {
  font-weight: 500;
  color: #333;
}

.message-time {
  font-size: 12px;
  color: #666;
}

.message-text {
  margin: 0;
  font-size: 14px;
  color: #444;
  line-height: 1.4;
}

/* Media Queries */
@media (max-width: 1200px) {
  .dashboard-cards {
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  }
}

@media (max-width: 768px) {
  .dashboard-cards {
    grid-template-columns: 1fr;
  }

  .client-dashboard {
    padding: 16px;
  }
}
</style>
