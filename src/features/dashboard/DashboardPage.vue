<!-- src/features/dashboard/DashboardPage.vue -->
<script setup>
import { ref, onMounted } from 'vue';
import { fetchDashboardData } from './dashboardApi.js';
import StatsCard from './StatsCard.vue';

const dashboardData = ref(null);
const isLoading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    const data = await fetchDashboardData();
    dashboardData.value = data;
  } catch (err) {
    error.value = 'Failed to load dashboard data';
    console.error(err);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="dashboard-page">
    <h1>Dashboard</h1>

    <div v-if="isLoading" class="loading-state">
      Loading dashboard data...
    </div>

    <div v-else-if="error" class="error-state">
      {{ error }}
    </div>

    <div v-else-if="dashboardData" class="dashboard-content">
      <div class="stats-cards">
        <StatsCard
          title="Active Listings"
          :value="dashboardData.activeListings"
          icon="listing"
          color="#1976d2"
        />
        <StatsCard
          title="Pending Listings"
          :value="dashboardData.pendingListings"
          icon="pending"
          color="#ff9800"
        />
        <StatsCard
          title="Total Leads"
          :value="dashboardData.totalLeads"
          icon="leads"
          color="#4caf50"
        />
        <StatsCard
          title="Tasks Due Today"
          :value="dashboardData.tasksDueToday"
          icon="task"
          color="#e53935"
        />
      </div>

      <div class="recent-activity">
        <h2>Recent Activity</h2>
        <div class="activity-list">
          <div v-for="(activity, index) in dashboardData.recentActivity"
               :key="index"
               class="activity-item">
            <div class="activity-icon" :class="activity.type"></div>
            <div class="activity-content">
              <p class="activity-message">{{ activity.message }}</p>
              <span class="activity-time">{{ activity.time }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-page {
  padding: 20px;
}

.loading-state,
.error-state {
  padding: 20px;
  text-align: center;
  background-color: #f9f9f9;
  border-radius: 8px;
  margin-top: 20px;
}

.error-state {
  color: #e53935;
}

.stats-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.recent-activity {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.activity-list {
  margin-top: 15px;
}

.activity-item {
  display: flex;
  align-items: flex-start;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
}

.activity-item:last-child {
  border-bottom: none;
}

.activity-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-right: 15px;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.activity-icon.listing {
  background-color: rgba(25, 118, 210, 0.1);
  color: #1976d2;
}

.activity-icon.task {
  background-color: rgba(229, 57, 53, 0.1);
  color: #e53935;
}

.activity-icon.message {
  background-color: rgba(76, 175, 80, 0.1);
  color: #4caf50;
}

.activity-content {
  flex: 1;
}

.activity-message {
  margin: 0 0 5px 0;
  font-size: 14px;
}

.activity-time {
  font-size: 12px;
  color: #757575;
}
</style>
