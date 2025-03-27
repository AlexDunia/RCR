<script setup>
import { ref, onMounted } from 'vue'
import { useRoleStore } from '@/stores/roleStore'

const roleStore = useRoleStore()

// Sample data for the dashboard
const stats = ref({
  totalUsers: 1250,
  activeAgents: 45,
  totalRevenue: 125000,
  pendingApprovals: 12
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
      <h1>Admin Dashboard</h1>
      <div class="date-filter">
        <select>
          <option>Today</option>
          <option>This Week</option>
          <option>This Month</option>
          <option>This Year</option>
        </select>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon users">
          <i class="fas fa-users"></i>
        </div>
        <div class="stat-content">
          <h3>Total Users</h3>
          <p class="stat-value">{{ stats.totalUsers }}</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon agents">
          <i class="fas fa-user-tie"></i>
        </div>
        <div class="stat-content">
          <h3>Active Agents</h3>
          <p class="stat-value">{{ stats.activeAgents }}</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon revenue">
          <i class="fas fa-dollar-sign"></i>
        </div>
        <div class="stat-content">
          <h3>Total Revenue</h3>
          <p class="stat-value">${{ stats.totalRevenue.toLocaleString() }}</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon approvals">
          <i class="fas fa-check-circle"></i>
        </div>
        <div class="stat-content">
          <h3>Pending Approvals</h3>
          <p class="stat-value">{{ stats.pendingApprovals }}</p>
        </div>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="dashboard-grid">
      <!-- System Performance -->
      <div class="dashboard-card performance">
        <h2>System Performance</h2>
        <div class="performance-grid">
          <div class="metric">
            <span class="metric-label">System Uptime</span>
            <span class="metric-value">{{ performanceMetrics.systemUptime }}</span>
          </div>
          <div class="metric">
            <span class="metric-label">Response Time</span>
            <span class="metric-value">{{ performanceMetrics.averageResponseTime }}</span>
          </div>
          <div class="metric">
            <span class="metric-label">Active Sessions</span>
            <span class="metric-value">{{ performanceMetrics.activeSessions }}</span>
          </div>
          <div class="metric">
            <span class="metric-label">Server Load</span>
            <span class="metric-value">{{ performanceMetrics.serverLoad }}</span>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="dashboard-card activity">
        <h2>Recent Activity</h2>
        <div class="activity-list">
          <div v-for="activity in recentActivity" :key="activity.id" class="activity-item">
            <div class="activity-icon" :class="activity.type">
              <i class="fas" :class="{
                'fa-user-plus': activity.type === 'user_registration',
                'fa-cog': activity.type === 'system_update',
                'fa-sign-in-alt': activity.type === 'agent_login',
                'fa-money-bill-wave': activity.type === 'payment_processed',
                'fa-file-alt': activity.type === 'report_generated'
              }"></i>
            </div>
            <div class="activity-content">
              <p>{{ activity.user }}</p>
              <span class="activity-time">{{ activity.time }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-dashboard {
  padding: 20px;
  background: #f8f9fa;
  min-height: 100vh;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.dashboard-header h1 {
  margin: 0;
  color: #2c3e50;
  font-size: 24px;
}

.date-filter select {
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: white;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: white;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.stat-icon {
  width: 50px;
  height: 50px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  font-size: 24px;
  color: white;
}

.stat-icon.users { background: #4CAF50; }
.stat-icon.agents { background: #2196F3; }
.stat-icon.revenue { background: #FF9800; }
.stat-icon.approvals { background: #9C27B0; }

.stat-content h3 {
  margin: 0;
  font-size: 14px;
  color: #666;
}

.stat-value {
  margin: 5px 0 0;
  font-size: 24px;
  font-weight: bold;
  color: #2c3e50;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 20px;
}

.dashboard-card {
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.dashboard-card h2 {
  margin: 0 0 20px;
  color: #2c3e50;
  font-size: 18px;
}

.performance-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.metric {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
}

.metric-label {
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
}

.metric-value {
  font-size: 20px;
  font-weight: bold;
  color: #2c3e50;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.activity-item {
  display: flex;
  align-items: center;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 8px;
}

.activity-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  color: white;
}

.activity-icon.user_registration { background: #4CAF50; }
.activity-icon.system_update { background: #2196F3; }
.activity-icon.agent_login { background: #FF9800; }
.activity-icon.payment_processed { background: #9C27B0; }
.activity-icon.report_generated { background: #607D8B; }

.activity-content {
  flex: 1;
}

.activity-content p {
  margin: 0;
  color: #2c3e50;
}

.activity-time {
  font-size: 12px;
  color: #666;
}
</style>
