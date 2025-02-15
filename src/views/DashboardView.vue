<script setup>
import { ref, onMounted } from 'vue';
import PropertyList from "@/components/PropertyList.vue";

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
  <!-- <div class="dashboard">
    <div class="greetings" >
      <h1>Hi, Alex!</h1>
      <p>Here’s an overview of your account</p>
    </div> -->

  <div class="dashboard">
    <!-- Greetings Section -->
    <div class="greetings" :class="{ 'animate-metric': isLoaded }">
      <div v-if="!isLoaded" class="greetings-skeleton"></div>
      <div v-else>
        <div class="greetings-data">
          <h1>Hi, Alex!</h1>
          <p>Here’s an overview of your account</p>
        </div>
      </div>
    </div>


    <div class="metrics">
      <div v-for="(metric, index) in metrics" :key="metric.label" class="metric-card"
        :class="{ 'animate-metric': isLoaded }" :style="{ animationDelay: `${index * 0.2}s` }">
        <!-- Skeleton Loader -->
        <div v-if="!isLoaded" class="metric-skeleton"></div>

        <!-- Actual Content -->
        <div v-else>
          <div class="metric-header">
            <div class="metric-content">
              <!-- Metric-stas, metric-title,  -->
              <div class="metrics-title">
                <h3>{{ metric.label }}</h3>
                <br />
                <p>{{ metric.value }}</p>
                <a href="#">view</a>
              </div>

              <div class="metrics-circle" :style="{ background: metric.color }">
              </div>
            </div>


          </div>

        </div>
      </div>
    </div>
  </div>

  <PropertyList />
</template>

<style scoped>
/* Skeleton Loader */

/* Skeleton Loader for Greetings */
.greetings-skeleton {
  width: 100%;
  height: 80px;
  background: linear-gradient(90deg, #e0e0e0 20%, #f0f0f0 30%, #e0e0e0 40%);
  background-size: 200% 100%;
  animation: skeleton-loading 2s infinite;
  opacity: 0.8;
  border-radius: 10px;
}

.metric-skeleton {
  width: 100%;
  height: 80px;
  background: linear-gradient(90deg, #e0e0e0 20%, #f0f0f0 30%, #e0e0e0 40%);
  background-size: 200% 100%;
  animation: skeleton-loading 2s infinite;
  opacity: 0.8;
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
/* Metric Animation - Smooth Left to Right Reveal */
.animate-metric {
  opacity: 0;
  transform: translateX(-20px);
  animation: fade-slide-left 0.5s ease-in-out forwards;
}

@keyframes fade-slide-left {
  0% {
    opacity: 0;
    transform: translateX(-1px);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
}


/* Original UI Styles */
.greetings {

  background-color: white;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.01);
}

.greetings-data {
  padding-left: 40px;
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
  gap: 20px;
  margin-top: 15px;
}

.metric-card {
  padding: 10px 20px;
  background: white;
  border-radius: 5px;
  overflow: hidden;
}


.metric-content {
  /* padding: 15px; */
  display: flex;
  padding: 0;
  padding-bottom: 0;
  justify-content: space-between;
}

.metric-content h3 {
  font-size: 14px;
  letter-spacing: -0.02em;
  color: #8898AA;
}

.metric-content p {
  font-size: 16px;
  margin-top: -30px;
  margin-bottom: 8px;
  color: #32325D;
  font-weight: 400;
}

.metric-content a {
  color: #074F90;
  text-decoration: none;
  font-size: 16px;
  margin: 0;
}

.metrics-circle {
  width: 4vw;
  margin-left: 10px;
  /* Responsive width */
  height: 4vw;
  /* Keep it a perfect circle */
  max-width: 100px;
  /* Prevent it from being too large */
  max-height: 100px;
  min-width: 50px;
  /* Prevent it from being too small */
  min-height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  box-shadow: 0 4px 12px rgba(74, 74, 74, 0.05);
  /* Optional shadow */
}
</style>
