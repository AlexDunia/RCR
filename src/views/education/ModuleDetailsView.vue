<template>
  <div class="module-details-container">
    <div class="module-details-header">
      <div class="back-button" @click="$router.go(-1)">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18L9 12L15 6" stroke="#0F172A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="header-content">
        <h1 class="header-title">{{ module.title }}</h1>
        <p class="header-subtitle">Creation date: {{ module.creationDate }}</p>
      </div>
    </div>

    <div class="module-details-content">
      <div class="module-overview">
        <div class="module-icon-large" :style="{ backgroundColor: module.iconColor }">
          {{ module.icon }}
        </div>
        <div class="module-stats">
          <div class="stat-item">
            <span class="stat-value">{{ module.modules.length }}</span>
            <span class="stat-label">Modules</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{ totalDuration }}</span>
            <span class="stat-label">Total Duration</span>
          </div>
        </div>
      </div>

      <div class="modules-list">
        <h2 class="section-title">Modules</h2>
        <div class="module-items">
          <div
            v-for="(item, index) in module.modules"
            :key="item.id"
            class="module-item"
            :class="{ 'active': activeModuleIndex === index }"
            @click="setActiveModule(index)"
          >
            <div class="module-number">{{ index + 1 }}</div>
            <div class="module-item-content">
              <h3 class="module-item-title">{{ item.title }}</h3>
              <p class="module-item-duration">{{ item.duration }}</p>
            </div>
            <div class="module-item-status">
              <svg v-if="completedModules.includes(index)" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="#22C55E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M22 4L12 14.01L9 11.01" stroke="#22C55E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <svg v-else-if="activeModuleIndex === index" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#3B82F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 8V16" stroke="#3B82F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M8 12H16" stroke="#3B82F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#94A3B8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div class="module-content">
        <div v-if="activeModuleIndex !== null" class="active-module-content">
          <h2 class="content-title">{{ module.modules[activeModuleIndex].title }}</h2>
          <div class="content-actions">
            <button
              class="action-button complete-button"
              @click="completeModule"
              :disabled="completedModules.includes(activeModuleIndex)"
            >
              {{ completedModules.includes(activeModuleIndex) ? 'Completed' : 'Mark as Complete' }}
            </button>
            <button class="action-button download-button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M7 10L12 15L17 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 15V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Download Materials
            </button>
          </div>

          <div class="module-description">
            <p>This module covers {{ module.modules[activeModuleIndex].title.toLowerCase() }} in the real estate industry. The content is designed to help real estate professionals improve their skills and knowledge in this area.</p>

            <h3>Learning Objectives</h3>
            <ul>
              <li>Understand key concepts related to {{ module.modules[activeModuleIndex].title.toLowerCase() }}</li>
              <li>Apply practical strategies in your real estate business</li>
              <li>Develop professional skills that enhance your client relationships</li>
              <li>Stay updated with current trends and best practices</li>
            </ul>

            <h3>Duration</h3>
            <p>{{ module.modules[activeModuleIndex].duration }}</p>
          </div>
        </div>
        <div v-else class="no-module-selected">
          <p>Select a module to view its content</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

// This would normally come from a store or API
// For demo purposes, we're using static data
const module = ref({
  id: 1,
  title: 'Marketing strategy for Williams',
  creationDate: 'Dec 1, 2024, 10:00am',
  icon: 'M',
  iconColor: '#FF0000',
  modules: [
    { id: 1, title: 'Introduction to Real Estate Marketing', duration: '45 min' },
    { id: 2, title: 'Social Media Strategies', duration: '60 min' },
    { id: 3, title: 'Client Acquisition Techniques', duration: '30 min' }
  ]
});

// In a real app, you would fetch the module data based on the route param
onMounted(() => {
  try {
    // Try to get the module data from localStorage
    const savedModule = localStorage.getItem('currentModule');
    if (savedModule) {
      module.value = JSON.parse(savedModule);
      console.log('Module loaded from localStorage:', module.value);
    } else {
      // If not in localStorage, use the route params to determine which module to show
      console.log('Module ID from route:', route.params.id);

      // For demo purposes, we're keeping the default module
      // In a real app, you would fetch the data from an API
      // fetchModuleData(route.params.id);
    }
  } catch (error) {
    console.error('Error loading module data:', error);
  }
});

const activeModuleIndex = ref(null);
const completedModules = ref([]);

const setActiveModule = (index) => {
  activeModuleIndex.value = index;
};

const completeModule = () => {
  if (activeModuleIndex.value !== null && !completedModules.value.includes(activeModuleIndex.value)) {
    completedModules.value.push(activeModuleIndex.value);
  }
};

const totalDuration = computed(() => {
  // Calculate total duration from all modules
  const totalMinutes = module.value.modules.reduce((total, mod) => {
    const minutes = parseInt(mod.duration.split(' ')[0]);
    return total + minutes;
  }, 0);

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}min`;
  } else {
    return `${minutes}min`;
  }
});
</script>

<style scoped>
.module-details-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.module-details-header {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
}

.back-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: #E5EDF9;
  border-radius: 50%;
  cursor: pointer;
  margin-right: 16px;
  transition: background-color 0.2s ease;
}

.back-button:hover {
  background-color: #D1E0F6;
}

.header-content {
  flex: 1;
}

.header-title {
  font-size: 24px;
  font-weight: 600;
  color: #0F172A;
  margin: 0 0 4px 0;
}

.header-subtitle {
  font-size: 16px;
  color: #64748B;
  margin: 0;
}

.module-details-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

@media (min-width: 992px) {
  .module-details-content {
    grid-template-columns: 350px 1fr;
  }

  .module-overview {
    grid-column: 1 / -1;
  }
}

.module-overview {
  background-color: #FFFFFF;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 24px;
  display: flex;
  align-items: center;
  border: 1px solid #E2E8F0;
}

.module-icon-large {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: bold;
  color: white;
  margin-right: 24px;
}

.module-stats {
  display: flex;
  gap: 24px;
}

.stat-item {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 24px;
  font-weight: 600;
  color: #0F172A;
}

.stat-label {
  font-size: 14px;
  color: #64748B;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #0F172A;
  margin: 0 0 16px 0;
}

.modules-list {
  background-color: #FFFFFF;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 24px;
  border: 1px solid #E2E8F0;
}

.module-items {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.module-item {
  display: flex;
  align-items: center;
  padding: 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.module-item:hover {
  background-color: #F1F5F9;
}

.module-item.active {
  background-color: #EFF6FF;
  border-left: 3px solid #3B82F6;
}

.module-number {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: #F1F5F9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  color: #0F172A;
  margin-right: 12px;
}

.module-item.active .module-number {
  background-color: #3B82F6;
  color: white;
}

.module-item-content {
  flex: 1;
}

.module-item-title {
  font-size: 16px;
  font-weight: 500;
  color: #0F172A;
  margin: 0 0 4px 0;
}

.module-item-duration {
  font-size: 14px;
  color: #64748B;
  margin: 0;
}

.module-item-status {
  margin-left: 12px;
}

.module-content {
  background-color: #FFFFFF;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 24px;
  border: 1px solid #E2E8F0;
}

.no-module-selected {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: #64748B;
  font-size: 16px;
}

.content-title {
  font-size: 20px;
  font-weight: 600;
  color: #0F172A;
  margin: 0 0 16px 0;
}

.content-actions {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
}

.action-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.complete-button {
  background-color: #EFF6FF;
  color: #3B82F6;
  border: 1px solid #BFDBFE;
}

.complete-button:hover:not(:disabled) {
  background-color: #DBEAFE;
}

.complete-button:disabled {
  background-color: #F1F5F9;
  color: #94A3B8;
  cursor: not-allowed;
  border-color: #E2E8F0;
}

.download-button {
  background-color: #F1F5F9;
  color: #0F172A;
  border: 1px solid #E2E8F0;
}

.download-button:hover {
  background-color: #E2E8F0;
}

.download-button svg {
  margin-right: 8px;
}

.module-description {
  color: #334155;
  line-height: 1.6;
}

.module-description h3 {
  font-size: 16px;
  font-weight: 600;
  color: #0F172A;
  margin: 24px 0 12px 0;
}

.module-description ul {
  padding-left: 20px;
}

.module-description li {
  margin-bottom: 8px;
}
</style>
