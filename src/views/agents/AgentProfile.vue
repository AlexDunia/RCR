<!-- eslint-disable vue/no-unused-vars -->
<!-- eslint-disable vue/no-unused-vars -->
<script setup>
import { ref, onMounted } from 'vue';
import PropertyList from "@/features/property/PropertyList.vue";
import Loader from "@/ui/Loader.vue";

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
    <!-- Greetings Section -->
    <div class="greetings" :class="{ 'animate-metric': isLoaded }">
      <Loader v-if="!isLoaded" />
      <div v-else>
        <div class="greetings-data">
          <h1>Hi, Alex!</h1>
          <p>Here's an overview of your account</p>
        </div>
      </div>
    </div>
    <br/>

    <div class="metricsloader"  :class="{ 'animate-metric': isLoaded }"  :style="{ animationDelay: `${index * 0.2}s` }">
    <div class="metrics">
      <div v-for="(metric) in metrics" :key="metric.label" class="metric-card"
       >
        <Loader v-if="!isLoaded" />
        <div v-else>
          <div class="metric-header">
            <div class="metric-content">
              <div class="metrics-title">
                <h3>{{ metric.label }}</h3>
                <br />
                <p>{{ metric.value }}</p>
                <a href="#">view</a>
              </div>
              <div class="metrics-circle" :style="{ background: metric.color }"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

    <div class="property-list-section">
      <Loader v-if="!isLoaded" />
      <div v-else>
        <PropertyList />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Metric Animation - Smooth Left to Right Reveal */
.animate-metric {
  opacity: 0;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
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
  margin-top:10px;
  background-color: white;
  box-shadow: 0px 2px 5px rgba(99, 98, 98, 0.1);
}

.greetings:hover {
  transform: scale(1.02);
}

.greetings-data {
  padding: 10px 40px;
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
  flex: 1;
  padding: 8px 14px;
  background: white;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.metric-card:hover {
  transform: scale(1.02);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
}

.metric-content {
  display: flex;
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
  height: 4vw;
  max-width: 100px;
  max-height: 100px;
  min-width: 50px;
  min-height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  box-shadow: 0 4px 12px rgba(74, 74, 74, 0.05);
}

.property-list-section {
  margin-top: 20px;
}
</style>
