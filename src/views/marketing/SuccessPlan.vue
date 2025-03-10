<template>
  <div class="success-plan-container">
    <div class="marketing-tools-header">
      <h1 class="marketing-tools-title">Succezz Plan</h1>
      <p class="marketing-tools-subtitle">Create and track your success milestones with our comprehensive planning tools.</p>
    </div>

    <div class="marketing-tabs">
      <button
        v-for="(info, key) in ['success', 'checklist', 'done', 'social']"
        :key="key"
        :class="['marketing-tab', { active: currentTab === key }]"
        @click="handleTabChange(key)"
      >
        {{ getTabTitle(key) }}
      </button>
    </div>

    <MarketingContentLoader>
      <div class="success-plans">
        <div class="plans-container">
          <div v-for="(plan, index) in marketingPlans" :key="index" class="plan-card" @click="viewPlan(index)">
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
              <span class="status" :class="plan.status.toLowerCase()">{{ plan.status }}</span>
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
    </MarketingContentLoader>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import MarketingContentLoader from '@/components/marketing/MarketingContentLoader.vue';

const router = useRouter();
const currentTab = ref('success');
const marketingPlans = ref(JSON.parse(localStorage.getItem('marketingPlans') || '[]'));

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

const getTabTitle = (key) => {
  const titles = {
    success: 'Success Plan',
    checklist: 'My Checklist',
    done: 'Done for You',
    social: 'Social Platforms'
  };
  return titles[key];
};

const handleTabChange = (key) => {
  currentTab.value = key;
  switch (key) {
    case 'success':
      router.push('/RCR/marketing-tools/success-plan');
      break;
    case 'checklist':
      router.push('/RCR/marketing-tools/checklist');
      break;
    case 'done':
      router.push('/RCR/marketing-tools/done-for-you');
      break;
    case 'social':
      router.push('/RCR/marketing-tools/social-platforms');
      break;
  }
};

const viewPlan = (index) => {
  router.push(`/RCR/marketing-tools/plan/${index}`);
};

const createNewPlan = () => {
  router.push('/RCR/marketing-tools/create');
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
.success-plan-container {
  padding: 1.5rem;
}

.marketing-tools-header {
  margin-bottom: 2rem;
}

.marketing-tools-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1E3A8A;
  margin-bottom: 0.5rem;
}

.marketing-tools-subtitle {
  color: #6B7280;
  font-size: 0.875rem;
}

.marketing-tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.marketing-tab {
  padding: 0.5rem 1rem;
  background: none;
  border: none;
  font-weight: 500;
  color: #6B7280;
  cursor: pointer;
}

.marketing-tab.active {
  color: #2563EB;
  border-bottom: 2px solid #2563EB;
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
}

.plan-header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.plan-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin-right: 1rem;
  flex-shrink: 0;
}

.plan-info {
  flex: 1;
}

.plan-card h3 {
  font-size: 1.25rem;
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
