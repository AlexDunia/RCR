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
  { id: 1, type: 'user_login', user: 'John Doe', time: '30 minutes ago' },
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
  padding: 32px 40px;
  background: #F8FAFC;
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
  background: linear-gradient(to right, #E8F5E9, #E3F2FD);
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 36px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
}

.welcome-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.welcome-card h2 {
  font-size: 24px;
  font-weight: 600;
  color: #1A237E;
  margin: 0 0 12px 0;
}

.welcome-card p {
  font-size: 15px;
  color: #546E7A;
  margin: 0;
  line-height: 1.6;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 24px;
}

.secondary-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.stat-group {
  background: white;
  border-radius: 16px;
  padding: 24px;
  position: relative;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.04);
  animation: fadeIn 0.5s ease forwards;
  cursor: pointer;
}

.stat-group:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  border-color: rgba(0, 64, 128, 0.1);
}

.stat-label {
  font-size: 13px;
  font-weight: 600;
  color: #64748B;
  text-transform: uppercase;
  margin-bottom: 12px;
  letter-spacing: 0.5px;
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: #1E293B;
  transition: color 0.2s ease;
}

.stat-group:hover .stat-value {
  color: #004080;
}

.stat-link {
  position: absolute;
  bottom: 24px;
  right: 24px;
  color: #004080;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  padding: 6px 12px;
  border-radius: 6px;
  transition: all 0.2s ease;
  background: rgba(0, 64, 128, 0.05);
}

.stat-link:hover {
  background: rgba(0, 64, 128, 0.1);
  transform: translateY(-1px);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.stats-grid .stat-group:nth-child(1) { animation-delay: 0.1s; }
.stats-grid .stat-group:nth-child(2) { animation-delay: 0.2s; }
.stats-grid .stat-group:nth-child(3) { animation-delay: 0.3s; }
.stats-grid .stat-group:nth-child(4) { animation-delay: 0.4s; }
.secondary-stats .stat-group:nth-child(1) { animation-delay: 0.5s; }
.secondary-stats .stat-group:nth-child(2) { animation-delay: 0.6s; }
</style>
