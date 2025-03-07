<template>
  <div class="task-home">
    <TaskHeader />
    <TaskNavigation />
    <div class="completed-task-container">
      <!-- Skeleton Loader -->
      <div v-if="loading" class="completed-tasks-grid">
        <div v-for="i in 3" :key="i" class="completed-task-card skeleton">
          <div class="status-badge skeleton-badge"></div>
          <div class="card-header">
            <div class="skeleton-title"></div>
            <div class="skeleton-button"></div>
          </div>
          <div class="default-details">
            <div class="date-label skeleton-date"></div>
            <div class="date-label skeleton-date"></div>
          </div>
        </div>
      </div>

      <div v-else-if="completedTasks.length === 0" class="empty-state">
        <div class="empty-state-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h3 class="empty-state-title">No completed tasks yet</h3>
        <p class="empty-state-text">When you complete tasks, they will appear here</p>
      </div>

      <div v-else class="completed-tasks-grid">
        <div v-for="task in completedTasks" :key="task.id" class="completed-task-card">
          <!-- Status Badge -->
          <div class="status-badge">
            <svg class="status-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Completed</span>
          </div>

          <!-- Title and View Details Button -->
          <div class="card-header">
            <h2 class="task-title" v-tooltip="task.title">{{ truncateTitle(task.title) }}</h2>
            <button class="view-details-btn" @click="viewTaskDetails(task)">
              View Details
            </button>
          </div>

          <!-- Default Details (Always Visible) -->
          <div class="default-details">
            <div class="date-label">
              <svg class="date-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Created: {{ formatDate(task.createdAt) }}
            </div>
            <div class="date-label">
              <svg class="date-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 13L9 17L19 7M19 17V17.01M5 7V7.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Completed: {{ formatDate(task.completedAt) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import TaskHeader from '@/components/task/TaskHeader.vue';
import TaskNavigation from '@/components/task/TaskNavigation.vue';

const router = useRouter();
const completedTasks = ref([]);
const loading = ref(true);

const truncateTitle = (title) => {
  if (!title) return '';
  const words = title.split(' ');
  if (words.length <= 30) return title;
  return words.slice(0, 30).join(' ') + '...';
};

const viewTaskDetails = (completedtask) => {
  console.log('Viewing task details for:', completedtask);
  // Store the task in localStorage for the detail page to access
  localStorage.setItem('completedTasks', JSON.stringify(completedtask));
  // Navigate to the task detail page with animation
  router.push({
    name: 'CompletedTaskDetail',
    params: { id: completedtask.id }
  });
};

const formatDate = (date) => {
  if (!date) return 'N/A';
  return new Date(date).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).replace(',', '');
};

onMounted(async () => {
  // Simulate loading for skeleton effect
  loading.value = true;

  // Load completed tasks from localStorage
  setTimeout(() => {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    completedTasks.value = tasks
      .filter(task => task.status === 'completed')
      .sort((a, b) => {
        // Sort by completion date, newest first
        const dateA = new Date(a.completedAt || a.updatedAt || a.createdAt).getTime();
        const dateB = new Date(b.completedAt || b.updatedAt || b.createdAt).getTime();
        return dateB - dateA;
      });
    loading.value = false;
  }, 1000); // Simulate network delay
});
</script>

<style scoped>
.task-home {
  padding: 20px;
  background-color: #f9fafb;
  min-height: 100%;
}

.completed-task-container {
  margin: 0 auto;
}

.completed-tasks-grid {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.completed-task-card {
  background-color: #FFFFFF;
  padding-left: 20px;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.06);
  padding: 24px 24px 24px 40px;
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
}

.completed-task-card:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 10px 15px rgba(0, 0, 0, 0.03);
  transform: translateY(-2px);
}

.completed-task-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 6px;
  height: 100%;
  background-color: #2563EB;
  border-radius: 12px 0 0 12px;
  opacity: 0.2;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  background-color: rgba(37, 99, 235, 0.1);
  color: #2563EB;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 16px;
}

.status-icon {
  stroke: #2563EB
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}

.task-title {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0;
  line-height: 1.4;
  flex: 1;
  padding-right: 16px;
}

.view-details-btn {
  background-color: #2563EB;
  color: white;
  border: none;
  font-size: 14px;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 6px;
  transition: all 0.2s;
  font-weight: 500;
  white-space: nowrap;
}

.view-details-btn:hover {
  background-color: #1D4ED8;
  transform: translateY(-1px);
}

.default-details {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 20px;
}

.date-label {
  display: flex;
  align-items: center;
  gap: 6px;
  background-color: #F3F4F6;
  color: #4B5563;
  font-size: 13px;
  padding: 6px 12px;
  border-radius: 6px;
  font-weight: 500;
}

.date-icon {
  stroke: #6B7280;
}

/* Skeleton Loading Styles */
.skeleton {
  position: relative;
  overflow: hidden;
}

.skeleton::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: translateX(-100%);
  background-image: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0,
    rgba(255, 255, 255, 0.2) 20%,
    rgba(255, 255, 255, 0.5) 60%,
    rgba(255, 255, 255, 0)
  );
  animation: shimmer 2s infinite;
}

.skeleton-badge {
  width: 100px;
  height: 24px;
  background-color: #E5E7EB;
  border-radius: 16px;
}

.skeleton-title {
  width: 70%;
  height: 24px;
  background-color: #E5E7EB;
  border-radius: 4px;
  margin-bottom: 8px;
}

.skeleton-button {
  width: 100px;
  height: 36px;
  background-color: #E5E7EB;
  border-radius: 6px;
}

.skeleton-date {
  width: 150px;
  height: 30px;
  background-color: #E5E7EB;
  border-radius: 6px;
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  text-align: center;
}

.empty-state-icon {
  margin-bottom: 20px;
  color: #9CA3AF;
}

.empty-state-title {
  font-size: 18px;
  font-weight: 600;
  color: #374151;
  margin: 0 0 12px;
}

.empty-state-text {
  color: #6B7280;
  font-size: 14px;
  max-width: 300px;
}

@media (max-width: 768px) {
  .completed-task-container {
    padding: 10px;
  }

  .completed-task-card {
    padding: 20px;
  }

  .default-details {
    flex-direction: column;
    gap: 8px;
  }
}

/* Page Transition Animation */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
