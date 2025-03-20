<!-- src/features/dashboard/StatsCard.vue -->
<script setup>
import { defineProps } from 'vue';

defineProps({
  title: {
    type: String,
    required: true
  },
  value: {
    type: [Number, String],
    required: true
  },
  icon: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: '#1976d2'
  }
});
</script>

<template>
  <div class="stats-card" :style="{ '--card-color': color }">
    <div class="stats-icon" :class="icon"></div>
    <div class="stats-content">
      <h3 class="stats-title">{{ title }}</h3>
      <p class="stats-value">{{ value }}</p>
    </div>
  </div>
</template>

<style scoped>
.stats-card {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-left: 4px solid var(--card-color, #1976d2);
  transition: transform 0.2s, box-shadow 0.2s;
}

.stats-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.stats-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-right: 15px;
  background-color: rgba(var(--card-color-rgb, 25, 118, 210), 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--card-color, #1976d2);
}

.stats-content {
  flex: 1;
}

.stats-title {
  margin: 0 0 5px 0;
  font-size: 14px;
  color: #666;
  font-weight: 600;
}

.stats-value {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  color: #333;
}

/* Icon styles */
.stats-icon.listing::before {
  content: '🏠';
}

.stats-icon.pending::before {
  content: '⏳';
}

.stats-icon.leads::before {
  content: '👥';
}

.stats-icon.task::before {
  content: '✓';
}
</style>
