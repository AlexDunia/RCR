<script setup>
import { ref, onMounted } from 'vue'
import { useRoleStore } from '@/stores/roleStore'

const roleStore = useRoleStore()

// Sample data for the dashboard
const stats = ref({
  traffic: '350,897',
  totalListings: '20',
  grossCommission: '20',
  listings: '20',
  blogs: '350',
  receipts: '350'
})

const recentActivity = ref([
  { id: 1, type: 'user_registration', user: 'John Doe', time: '2 minutes ago' },
  { id: 2, type: 'system_update', user: 'System', time: '1 hour ago' },
  { id: 3, type: 'agent_login', user: 'Sarah Smith', time: '2 hours ago' },
  { id: 4, type: 'payment_processed', user: 'Mike Johnson', time: '3 hours ago' },
  { id: 5, type: 'report_generated', user: 'Admin', time: '4 hours ago' }
])

const performanceMetrics = ref({
  systemUptime: '99.9%',
  averageResponseTime: '120ms',
  activeSessions: 156,
  serverLoad: '45%'
})

// Ensure only admins can access this dashboard
onMounted(() => {
  if (roleStore.currentRole !== 'admin') {
    // Redirect to appropriate dashboard based on role
    // You might want to implement this redirect logic
    console.warn('Unauthorized access to admin dashboard')
  }
})
</script>

<template>
  <div class="admin-dashboard">
    <div class="dashboard-header">
      <div class="title-section">
        <h1>Dashboard</h1>
        <p class="subtitle">Real City admin dashboard</p>
      </div>
      <div class="header-actions">
        <button class="notification-btn">
          <span class="notification-dot"></span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 8A6 6 0 1 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <button class="mail-btn">
          <span class="mail-dot"></span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="m22 6-10 7L2 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <div class="user-profile">
          <span class="profile-initial">PA</span>
          <span class="profile-name">Precious Admin</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
    </div>

    <div class="welcome-card">
      <h2>Hi Admin, Welcome.</h2>
      <p>Here, you get over view on how your app is doing, and what clients and agents are up to.</p>
    </div>

    <div class="stats-grid">
      <div class="stat-group">
        <div class="stat-label">TRAFFIC</div>
        <div class="stat-value">{{ stats.traffic }}</div>
      </div>

      <div class="stat-group">
        <div class="stat-label">TOTAL LISTINGS</div>
        <div class="stat-value">{{ stats.totalListings }}</div>
        <a href="#" class="stat-link">view</a>
      </div>

      <div class="stat-group">
        <div class="stat-label">GROSS COMMISSION</div>
        <div class="stat-value">{{ stats.grossCommission }}</div>
        <a href="#" class="stat-link">view</a>
      </div>

      <div class="stat-group">
        <div class="stat-label">Listings</div>
        <div class="stat-value">{{ stats.listings }}</div>
        <a href="#" class="stat-link">view</a>
      </div>
    </div>

    <div class="secondary-stats">
      <div class="stat-group">
        <div class="stat-label">BLOGS</div>
        <div class="stat-value">{{ stats.blogs }}</div>
      </div>

      <div class="stat-group">
        <div class="stat-label">RECEIPTS</div>
        <div class="stat-value">{{ stats.receipts }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-dashboard {
  padding: 20px 40px;
  background: #F4F4F4;
  min-height: 100vh;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.title-section h1 {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.subtitle {
  font-size: 14px;
  color: #666;
  margin: 4px 0 0 0;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

.notification-btn, .mail-btn {
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
}

.notification-dot, .mail-dot {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 8px;
  height: 8px;
  background: #FF4444;
  border-radius: 50%;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
}

.profile-initial {
  width: 36px;
  height: 36px;
  background: #004080;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
}

.profile-name {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.welcome-card {
  background: #E8F5E9;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 30px;
}

.welcome-card h2 {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 0 0 8px 0;
}

.welcome-card p {
  font-size: 14px;
  color: #666;
  margin: 0;
  line-height: 1.5;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 20px;
}

.secondary-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.stat-group {
  background: white;
  border-radius: 12px;
  padding: 20px;
  position: relative;
}

.stat-label {
  font-size: 12px;
  font-weight: 500;
  color: #666;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 24px;
  font-weight: 600;
  color: #333;
}

.stat-link {
  position: absolute;
  bottom: 20px;
  right: 20px;
  color: #004080;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
}

.stat-link:hover {
  text-decoration: underline;
}
</style>
