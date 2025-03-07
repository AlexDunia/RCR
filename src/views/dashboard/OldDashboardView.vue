<script setup>
import { ref, onMounted } from 'vue';

// Metrics Data
const metrics = ref([
  { label: 'GROSS COMMISSION', value: '350,897', color: '#5aa6f9' },
  { label: 'ACTIVE LISTINGS', value: '20', color: '#ff6b6b' },
  { label: 'RECENT SALES', value: '20', color: '#f7d154' },
  { label: 'UPCOMING TASK', value: '20', color: '#2ec4b6' },
]);

// Loading state
const isLoaded = ref(false);

onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true;
  }, 2000); // Simulated loading time
});
</script>

<template>
  <div class="dashboard">
    <div class="greetings">
      <h1>Hi, Alex!</h1>
      <p>Here’s an overview of your account</p>
    </div>

    <div class="metrics">
      <div v-for="(metric, index) in metrics" :key="metric.label" class="metric-card"
        :class="{ 'animate-metric': isLoaded }" :style="{ animationDelay: `${index * 0.2}s` }">
        <!-- Skeleton Loader -->
        <div v-if="!isLoaded" class="metric-skeleton"></div>

        <!-- Actual Content -->
        <div v-else>
          <div class="metric-header" :style="{ background: metric.color }"></div>
          <div class="metric-content">
            <h3>{{ metric.label }}</h3>
            <p>{{ metric.value }}</p>
            <a href="#">view</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Skeleton Loader */
.metric-skeleton {
  width: 100%;
  height: 80px;
  background: linear-gradient(90deg, #e0e0e0 20%, #f0f0f0 30%, #e0e0e0 40%);
  background-size: 200% 100%;
  animation: skeleton-loading 2s infinite;
  opacity: 0.6;
  border-radius: 10px;
}

/* Skeleton Animation */
@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }

  100% {
    background-position: -200% 0;
  }
}

/* Metric Animation */
.animate-metric {
  opacity: 0;
  transform: translateY(20px);
  animation: fade-slide-in 1.5s ease-in-out forwards;
}

@keyframes fade-slide-in {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Original UI Styles */
.greetings {
  padding-left: 40px;
  background-color: white;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.01);
}

.greetings h1 {
  margin-bottom: -10px;
  color: #074F90;
  font-size: 24px;
}

.greetings p {
  color: #718096;
  font-size: 14px;
}

.dashboard {
  padding: 20px;
}

.metrics {
  display: flex;
  gap: 15px;
  margin-top: 15px;
}

.metric-card {
  width: 200px;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  text-align: center;
}

.metric-header {
  height: 8px;
}

.metric-content {
  padding: 15px;
}

.metric-content h3 {
  font-size: 14px;
  color: #555;
}

.metric-content p {
  font-size: 18px;
  font-weight: bold;
}

.metric-content a {
  color: blue;
  text-decoration: none;
  font-size: 12px;
}
</style>
