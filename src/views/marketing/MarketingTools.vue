<template>
  <div class="marketing-tools">
    <MarketingNavigation />
    <div class="content-area">
      <div v-if="isLoading" class="content-loader">
        <Loader v-for="n in 3" :key="n" />
      </div>
      <template v-else>
        <div v-if="isSuccessPlanRoute" class="success-plans">
          <div v-if="marketingStore.plans.marketingPlans.length === 0" class="empty-state">
            <div class="empty-icon">📋</div>
            <h3>No Marketing Plans Yet</h3>
            <p>Create your first marketing plan to get started</p>
            <button class="create-plan-btn" @click="createNewPlan">Create New Plan</button>
          </div>
          <div v-else class="plans-container">
            <div v-for="(plan, index) in marketingStore.plans.marketingPlans" :key="index" class="plan-card" @click="viewPlan(index)">
              <div class="plan-header">
                <div class="plan-icon" :style="{ backgroundColor: getRandomColor(plan.title) }">
                  {{ getFirstLetter(plan.title) }}
                </div>
                <div class="plan-info">
                  <h3>{{ plan.title }}</h3>
                  <p class="date">Creation date: {{ formatDate(plan.creationDate) }}</p>
                </div>
                <button class="view-plan-btn">
                  View plan
                </button>
              </div>
              <p class="description">{{ plan.strategyOverview }}</p>
              <div class="card-footer">
                <span class="status" :class="plan.status ? plan.status.toLowerCase() : 'draft'">{{ plan.status || 'Draft' }}</span>
              </div>
            </div>
            <div class="plan-card add-new" @click="createNewPlan">
              <div class="add-content">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="add-icon">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                <h3>Create New Plan</h3>
              </div>
            </div>
          </div>
        </div>
        <router-view v-else></router-view>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useMarketingStore } from '@/stores/marketingStore';
import MarketingNavigation from '@/features/marketing/MarketingNavigation.vue';
import Loader from '@/ui/Loader.vue';

const router = useRouter();
const route = useRoute();
const marketingStore = useMarketingStore();

const isLoading = computed(() => marketingStore.isLoading);

// Expanded array of colors that work well with white text (good contrast)
// More diverse with less emphasis on purple shades
const contrastColors = [
  '#1E3A8A', // Navy Blue
  '#1D4ED8', // Royal Blue
  '#0369A1', // Ocean Blue
  '#0E7490', // Teal
  '#065F46', // Forest Green
  '#166534', // Emerald Green
  '#3F6212', // Olive Green
  '#854D0E', // Bronze
  '#92400E', // Amber
  '#9A3412', // Burnt Orange
  '#B91C1C', // Crimson
  '#991B1B', // Dark Red
  '#831843', // Burgundy
  '#701A75', // Magenta
  '#581C87', // Deep Purple
  '#4338CA', // Indigo
  '#1E40AF', // Cobalt
  '#0F172A', // Dark Slate
  '#374151', // Charcoal
  '#4B5563', // Slate Gray
  '#7E22CE', // Violet
  '#BE123C', // Ruby
  '#0F766E', // Dark Teal
  '#0C4A6E'  // Dark Cyan
];

onMounted(async () => {
  // Fetch marketing plans when component mounts
  await marketingStore.plans.fetchPlans();
});

const isSuccessPlanRoute = computed(() => {
  return route.path === '/marketing-tools' || route.path === '/marketing-tools/success-plan';
});

const viewPlan = (index) => {
  router.push(`/marketing-tools/plan/${index}`);
};

const createNewPlan = () => {
  router.push('/marketing-tools/create');
};

// Get the first letter of the plan title
const getFirstLetter = (title) => {
  return title && title.length > 0 ? title.charAt(0).toUpperCase() : 'P';
};

// Get a random color based on the plan title (but consistent for the same title)
const getRandomColor = (title) => {
  if (!title) return contrastColors[0];

  // Use the sum of character codes as a seed for consistent color selection
  let sum = 0;
  for (let i = 0; i < title.length; i++) {
    sum += title.charCodeAt(i);
  }

  // Use the sum to select a color from the array
  const colorIndex = sum % contrastColors.length;
  return contrastColors[colorIndex];
};

// Format date to a more readable format
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}, ${date.getFullYear()}, ${formatTime(date)}`;
};

// Format time to 12-hour format with am/pm
const formatTime = (date) => {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';

  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const minutesStr = minutes < 10 ? '0' + minutes : minutes;

  return `${hours}:${minutesStr}${ampm}`;
};
</script>

<style scoped>
.marketing-tools {
  padding: 0;
  max-width: 100%;
  margin: 0;
}

.content-area {
  background: #FFFFFF;
  padding: 120px 2rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.content-loader {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4rem 1rem;
  background: #f9fafb;
  border-radius: 0.5rem;
  border: 1px dashed #e5e7eb;
  margin-bottom: 2rem;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.empty-state h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.empty-state p {
  color: #6b7280;
  margin-bottom: 1.5rem;
}

.create-plan-btn {
  padding: 0.625rem 1.25rem;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.create-plan-btn:hover {
  background-color: #1d4ed8;
}

.plans-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.plan-card {
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 0.75rem;
  padding: 1.5rem;
  cursor: pointer;
  margin-bottom:20px;
}

.plan-header {
  display: flex;
  align-items: center;
  margin-bottom: 1.1rem;
}

.plan-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
  margin-right: 1rem;
  flex-shrink: 0;
}

.plan-info {
  flex: 1;
}

.plan-card h3 {
  font-size: 1rem;
  font-weight: 600;
  color: #1E3A8A;
  margin: 0 0 0.25rem 0;
}

.date {
  font-size: 0.875rem;
  color: #6B7280;
  margin: 0;
}

.view-plan-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  color: #2563EB;
  background: #EFF6FF;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.view-plan-btn:hover {
  background: #DBEAFE;
}

.description {
  color: #4B5563;
  margin-bottom: 1.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size:14px;
}

.card-footer {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.status {
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
}

.status.draft {
  background: #EFF6FF;
  color: #2563EB;
}

.status.active {
  background: #ECFDF5;
  color: #059669;
}

.status.archived {
  background: #F3F4F6;
  color: #6B7280;
}

.add-new {
  border: 2px dashed #E5E7EB;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
}

.add-content {
  text-align: center;
  color: #6B7280;
}

.add-icon {
  width: 2.5rem;
  height: 2.5rem;
  margin-bottom: 1rem;
}
</style>
