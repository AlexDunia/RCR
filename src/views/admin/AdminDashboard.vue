<script setup>
import { ref } from 'vue';

const stats = ref({
  traffic: 350897,
  totalListings: 10,
  grossCommission: 20,
  listings: 20,
  blogs: 350,
  receipts: 350
});
</script>

<template>
  <div class="admin-dashboard">
    <div class="welcome-card">
      <h2 class="welcome-title">Hi Adminn, Welcome.</h2>
      <p class="welcome-subtitle">
        Here, you get over view on how your app is doing, and what clients and agents are up to.
      </p>
    </div>

    <div class="stats-grid">
      <div class="stat-card traffic">
        <div class="stat-label">TRAFFIC</div>
        <div class="stat-value">{{ stats.traffic.toLocaleString() }}</div>
      </div>

      <div class="stat-card">
        <div class="stat-label">TOTAL LISTINGS</div>
        <div class="stat-value">{{ stats.totalListings }}</div>
        <div class="stat-action">view</div>
      </div>

      <div class="stat-card">
        <div class="stat-label">GROSS COMMISSION</div>
        <div class="stat-value">{{ stats.grossCommission }}</div>
        <div class="stat-action">view</div>
      </div>

      <div class="stat-card">
        <div class="stat-label">Listings</div>
        <div class="stat-value">{{ stats.listings }}</div>
        <div class="stat-action">view</div>
      </div>

      <div class="stat-card">
        <div class="stat-label">BLOGS</div>
        <div class="stat-value">{{ stats.blogs }}</div>
      </div>

      <div class="stat-card">
        <div class="stat-label">RECEIPTS</div>
        <div class="stat-value">{{ stats.receipts }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-dashboard {
  width: 100%;
}

.welcome-card {
  background-color: #e8f4f0;
  padding: 24px;
  border-radius: 8px;
  margin-bottom: 24px;
}

.welcome-title {
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: #333;
}

.welcome-subtitle {
  margin: 0;
  font-size: 14px;
  color: #555;
  line-height: 1.5;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.stat-card {
  background: white;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  position: relative;
}

.stat-card.traffic {
  grid-column: span 4;
}

.stat-label {
  font-size: 13px;
  color: #666;
  font-weight: 500;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 28px;
  font-weight: 600;
  color: #333;
}

.stat-action {
  margin-top: 16px;
  color: #0066cc;
  font-size: 14px;
  cursor: pointer;
}

@media (max-width: 1200px) {
  .stats-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .stat-card.traffic {
    grid-column: span 3;
  }
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .stat-card.traffic {
    grid-column: span 2;
  }
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .stat-card.traffic {
    grid-column: span 1;
  }
}
</style>
