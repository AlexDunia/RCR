<script setup>
import { ref } from 'vue';

const stats = ref({
  properties: 3,
  viewings: 2,
  offers: 1,
  documents: 7,
  messages: 4
});
</script>

<template>
  <div class="client-dashboard">
    <div class="welcome-card">
      <h2 class="welcome-title">Hi Client, Welcome.</h2>
      <p class="welcome-subtitle">
        Here, you get an overview of your properties, documents, and communications with your agent.
      </p>
    </div>

    <div class="stats-grid">
      <div class="stat-card properties">
        <div class="stat-label">MY PROPERTIES</div>
        <div class="stat-value">{{ stats.properties }}</div>
        <div class="stat-action">view</div>
      </div>

      <div class="stat-card">
        <div class="stat-label">SCHEDULED VIEWINGS</div>
        <div class="stat-value">{{ stats.viewings }}</div>
        <div class="stat-action">view</div>
      </div>

      <div class="stat-card">
        <div class="stat-label">ACTIVE OFFERS</div>
        <div class="stat-value">{{ stats.offers }}</div>
        <div class="stat-action">view</div>
      </div>

      <div class="stat-card">
        <div class="stat-label">DOCUMENTS</div>
        <div class="stat-value">{{ stats.documents }}</div>
        <div class="stat-action">view</div>
      </div>

      <div class="stat-card">
        <div class="stat-label">NEW MESSAGES</div>
        <div class="stat-value">{{ stats.messages }}</div>
        <div class="stat-action">view</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.client-dashboard {
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
  grid-template-columns: repeat(3, 1fr);
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

.stat-card.properties {
  grid-column: span 3;
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

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .stat-card.properties {
    grid-column: span 2;
  }
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .stat-card.properties {
    grid-column: span 1;
  }
}
</style>
