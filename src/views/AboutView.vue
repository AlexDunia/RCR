<script setup>
import { ref, onMounted } from 'vue';

// Metrics Data
const metrics = ref([
  { 
    label: 'GROSS COMMISSION', 
    value: '350,897', 
    color: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
    icon: '💰'
  },
  { 
    label: 'ACTIVE LISTINGS', 
    value: '20', 
    color: 'linear-gradient(135deg, #EC4899 0%, #F43F5E 100%)',
    icon: '🏠'
  },
  { 
    label: 'RECENT SALES', 
    value: '20', 
    color: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
    icon: '📈'
  },
  { 
    label: 'UPCOMING TASK', 
    value: '20', 
    color: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    icon: '📅'
  },
]);

// Loading state
const isLoaded = ref(false);

onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true;
  }, 1500); // Reduced loading time for better UX
});
</script>

<template>
  <div class="about-page">
    <!-- Hero Section -->
    <div class="hero-section" :class="{ 'animate-hero': isLoaded }">
      <div class="hero-content">
        <div v-if="!isLoaded" class="hero-skeleton"></div>
        <div v-else class="hero-text">
          <h1>Welcome to RCR</h1>
          <p class="subtitle">Your Real Estate Success Partner</p>
        </div>
      </div>
    </div>

    <div class="dashboard">
      <!-- Greetings Section -->
      <div class="greetings" :class="{ 'animate-metric': isLoaded }">
        <div v-if="!isLoaded" class="greetings-skeleton"></div>
        <div v-else class="greetings-content">
          <div class="greetings-data">
            <h1>Hi, Alex!</h1>
            <p>Here's an overview of your account</p>
          </div>
        </div>
      </div>

      <div class="metrics">
        <div v-for="(metric, index) in metrics" 
             :key="metric.label" 
             class="metric-card"
             :class="{ 'animate-metric': isLoaded }" 
             :style="{ animationDelay: `${index * 0.15}s` }">
          <!-- Skeleton Loader -->
          <div v-if="!isLoaded" class="metric-skeleton"></div>

          <!-- Actual Content -->
          <div v-else class="metric-content-wrapper">
            <div class="metric-header" :style="{ background: metric.color }"></div>
            <div class="metric-content">
              <span class="metric-icon">{{ metric.icon }}</span>
              <h3>{{ metric.label }}</h3>
              <p class="metric-value">{{ metric.value }}</p>
              <a href="#" class="view-link">View Details</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-page {
  min-height: 100vh;
  background: #f8fafc;
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%);
  padding: 120px 20px;
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
  opacity: 0.2;
  animation: pattern-move 20s linear infinite;
}

@keyframes pattern-move {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 100px 100px;
  }
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: 0 auto;
}

.hero-text h1 {
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  background: linear-gradient(to right, #ffffff, #e2e8f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  animation: text-glow 2s ease-in-out infinite alternate;
}

@keyframes text-glow {
  from {
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  }
  to {
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
  }
}

.hero-text .subtitle {
  font-size: 1.75rem;
  color: #e2e8f0;
  margin-bottom: 2rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Dashboard Styles */
.dashboard {
  max-width: 1200px;
  margin: -60px auto 0;
  padding: 0 20px;
  position: relative;
  z-index: 2;
}

/* Greetings Section */
.greetings {
  background: white;
  border-radius: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.greetings:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

.greetings-data {
  padding: 2.5rem;
}

.greetings h1 {
  color: #1E40AF;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  background: linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.greetings p {
  color: #64748B;
  font-size: 1.25rem;
  font-weight: 500;
}

/* Metrics Section */
.metrics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.metric-card {
  background: white;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.metric-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.metric-header {
  height: 8px;
  transition: height 0.3s ease;
}

.metric-card:hover .metric-header {
  height: 12px;
}

.metric-content-wrapper {
  padding: 2rem;
}

.metric-content {
  text-align: center;
}

.metric-icon {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  display: block;
  animation: icon-bounce 2s ease-in-out infinite;
}

@keyframes icon-bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.metric-content h3 {
  color: #64748B;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.metric-value {
  color: #1E293B;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.view-link {
  color: #3B82F6;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  background: rgba(59, 130, 246, 0.1);
}

.view-link:hover {
  color: #1E40AF;
  background: rgba(59, 130, 246, 0.2);
  transform: translateY(-2px);
}

/* Skeleton Loaders */
.hero-skeleton,
.greetings-skeleton,
.metric-skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.hero-skeleton {
  height: 300px;
  margin-bottom: 2rem;
}

.greetings-skeleton {
  height: 150px;
}

.metric-skeleton {
  height: 200px;
}

/* Animations */
.animate-hero {
  animation: fade-in-up 1.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.animate-metric {
  opacity: 0;
  transform: translateY(30px);
  animation: fade-in-up 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes fade-in-up {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-text h1 {
    font-size: 3rem;
  }
  
  .hero-text .subtitle {
    font-size: 1.5rem;
  }
  
  .metrics {
    grid-template-columns: 1fr;
  }
  
  .dashboard {
    margin-top: -30px;
  }
  
  .greetings h1 {
    font-size: 2rem;
  }
  
  .metric-value {
    font-size: 1.75rem;
  }
}
</style>
