re<!-- eslint-disable vue/no-unused-vars -->
<!-- eslint-disable vue/no-unused-vars -->
<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useLayoutStore } from '@/stores/layout';
import PropertyList from "@/features/property/PropertyList.vue";
import SkeletonLoader from "@/ui/SkeletonLoader.vue";

const router = useRouter();
const layoutStore = useLayoutStore();

// Single loading state for the entire dashboard
const isLoading = ref(true);

// Metrics Data
const metrics = ref([
  { label: 'GROSS COMMISSION', value: '350,897', subtext: 'Since last month', color: '#86c1ff' },
  { label: 'ACTIVE LISTINGS', value: '20', subtext: 'view', color: '#ff6b51' },
  { label: 'RECENT SALES', value: '20', subtext: 'view', color: '#ffd43b' },
  { label: 'UPCOMING TASK', value: '20', subtext: 'view', color: '#00d4d4' },
]);

// Marketing tools data
const marketingTools = ref([
  { title: 'Social Media Posts', description: 'Create and schedule engaging content', icon: 'fa-hashtag' },
  { title: 'Email Templates', description: 'Professional templates for client outreach', icon: 'fa-envelope' },
  { title: 'Listing Flyers', description: 'Generate beautiful property flyers', icon: 'fa-file-alt' }
]);

// Handle metric card clicks to prevent default behavior if they're links
const handleMetricClick = (metric, event) => {
  // Prevent default navigation/refresh
  if (event) event.preventDefault();

  // Navigate to appropriate page based on metric type
  if (metric.label === 'ACTIVE LISTINGS') {
    router.push('/view-listings');
  } else if (metric.label === 'RECENT SALES') {
    // Navigate to sales page
  } else if (metric.label === 'UPCOMING TASK') {
    router.push('/tasks');
  }
};

// Handle marketing tool click
const handleMarketingToolClick = (tool) => {
  if (tool.title === 'Social Media Posts') {
    router.push('/marketing-tools/social-platforms');
  } else if (tool.title === 'Email Templates') {
    router.push('/marketing-tools/done-for-you');
  } else if (tool.title === 'Listing Flyers') {
    router.push('/marketing-tools/done-for-you');
  }
};

onMounted(() => {
  // Ensure layout is properly set
  layoutStore.resetLayout();

  // Force immediate layout update
  layoutStore.$patch({
    hideSidebar: false,
    hideHeader: false,
    background: '#F4F4F4'
  });

  // Simulate one-time loading rather than staggered loading
  setTimeout(() => {
    isLoading.value = false;
  }, 600);
});
</script>

<template>
  <div class="dashboard-container">
    <div v-if="isLoading" class="dashboard-skeleton">
      <!-- Greeting skeleton -->
      <div class="skeleton-container">
        <SkeletonLoader type="text" height="30px" width="180px" />
        <SkeletonLoader type="text" height="16px" width="240px" />
      </div>

      <!-- Metrics skeleton -->
      <div class="skeleton-container metrics-skeleton">
        <SkeletonLoader v-for="i in 4" :key="i" type="card" height="110px" width="100%" />
      </div>

      <!-- Marketing tools skeleton -->
      <div class="skeleton-container">
        <div class="section-header-skeleton">
          <SkeletonLoader type="text" height="24px" width="200px" />
          <SkeletonLoader type="text" height="16px" width="300px" />
        </div>
        <div class="marketing-tools-skeleton">
          <SkeletonLoader v-for="i in 3" :key="i" type="card" height="120px" width="100%" />
        </div>
      </div>

      <!-- Property list skeleton -->
      <div class="skeleton-container">
        <SkeletonLoader type="rectangle" height="300px" width="100%" />
      </div>
    </div>

    <div v-else class="dashboard-content">
      <!-- Greetings Section -->
      <div class="greetings">
        <div class="greetings-data">
          <h1>Hi, Alex!</h1>
          <p>Here's an overview of your account</p>
        </div>
      </div>

      <!-- Metrics Cards Section -->
      <div class="metrics-container">
        <div class="metrics-row">
          <div class="metrics-group">
            <div
              v-for="metric in metrics"
              :key="metric.label"
              class="metric-card"
              @click="(e) => handleMetricClick(metric, e)"
            >
              <div class="metric-content">
                <div class="metric-info">
                  <div class="metric-label">{{ metric.label }}</div>
                  <div class="metric-value">{{ metric.value }}</div>
                  <div class="metric-subtext">{{ metric.subtext }}</div>
                </div>
                <div class="metric-circle" :style="{ backgroundColor: metric.color }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Marketing Tools Section -->
      <div class="marketing-tools-container">
        <div class="section-header">
          <h2>Marketing Tools</h2>
          <p>Boost your business with these powerful marketing solutions</p>
        </div>
        <div class="marketing-tools-grid">
          <div
            v-for="tool in marketingTools"
            :key="tool.title"
            class="marketing-tool-card"
            @click="() => handleMarketingToolClick(tool)"
          >
            <div class="tool-icon">
              <i :class="['fas', tool.icon]"></i>
            </div>
            <div class="tool-content">
              <h3>{{ tool.title }}</h3>
              <p>{{ tool.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Property List Section -->
      <div class="property-list-section">
        <PropertyList />
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  min-height: calc(100vh - 80px);
}

.dashboard-skeleton,
.dashboard-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.skeleton-container {
  background: white;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: 0px 2px 5px rgba(99, 98, 98, 0.1);
}

.section-header-skeleton {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.metrics-skeleton {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.marketing-tools-skeleton {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 16px;
}

.greetings {
  background-color: white;
  box-shadow: 0px 2px 5px rgba(99, 98, 98, 0.1);
  border-radius: 8px;
}

.greetings-data {
  padding: 20px 40px;
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

/* Metrics Section */
.metrics-container {
  width: 100%;
}

.metrics-row {
  width: 100%;
}

.metrics-group {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  width: 100%;
}

.metric-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  height: 110px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.metric-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.metric-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  height: 100%;
  box-sizing: border-box;
}

.metric-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.metric-label {
  font-size: 12px;
  font-weight: 500;
  color: #718096;
  margin-bottom: 6px;
}

.metric-value {
  font-size: 24px;
  font-weight: 500;
  color: #2D3748;
  margin-bottom: 8px;
}

.metric-subtext {
  font-size: 14px;
  color: #718096;
}

.metric-circle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}

/* Marketing Tools Section */
.marketing-tools-container {
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0px 2px 5px rgba(99, 98, 98, 0.1);
}

.section-header {
  margin-bottom: 20px;
}

.section-header h2 {
  font-size: 20px;
  color: #074F90;
  margin-bottom: 4px;
}

.section-header p {
  font-size: 14px;
  color: #718096;
  margin: 0;
}

.marketing-tools-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.marketing-tool-card {
  border-radius: 8px;
  border: 1px solid #E2E8F0;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: all 0.2s ease;
  cursor: pointer;
}

.marketing-tool-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
  border-color: #CBD5E0;
}

.tool-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: #EBF4FF;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3182CE;
  font-size: 18px;
}

.tool-content h3 {
  margin: 0;
  font-size: 16px;
  color: #2D3748;
  margin-bottom: 4px;
}

.tool-content p {
  margin: 0;
  font-size: 14px;
  color: #718096;
}

.property-list-section {
  margin-top: 10px;
}

/* Responsive */
@media (max-width: 1024px) {
  .metrics-group, .metrics-skeleton, .marketing-tools-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .metrics-group, .metrics-skeleton, .marketing-tools-grid {
    grid-template-columns: 1fr;
  }
}
</style>
