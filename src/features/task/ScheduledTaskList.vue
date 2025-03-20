<template>
  <div class="scheduled-tasks">
    <!-- Loading Skeleton -->
    <div v-if="loading" class="tasks-loading-skeleton">
      <div v-for="i in 3" :key="i" class="task-skeleton">
        <div class="task-skeleton-header">
          <div class="task-skeleton-title"></div>
          <div class="task-skeleton-date"></div>
        </div>
        <div class="task-skeleton-body">
          <div class="task-skeleton-text"></div>
          <div class="task-skeleton-text short"></div>
        </div>
        <div class="task-skeleton-footer">
          <div class="task-skeleton-badge"></div>
          <div class="task-skeleton-actions"></div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="scheduledTasks.length === 0" class="empty-state">
      <div class="empty-state-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      <h2 class="empty-state-title">No scheduled tasks</h2>
      <p class="empty-state-description">You don't have any scheduled tasks yet. Create a new task to get started.</p>
      <router-link to="/tasks/create" class="empty-state-btn">
        Create Task
      </router-link>
    </div>

    <!-- Task List -->
    <div v-else class="tasks-list">
      <div v-for="task in scheduledTasks" :key="task.id" class="task-card">
        <div class="task-header">
          <h2 class="task-title">{{ task.title }}</h2>
          <div class="task-date">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="icon">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {{ formatDate(task.startDate) }}
          </div>
        </div>
        <div class="task-body">
          <p class="task-description">
            {{ getTaskDescription(task) }}
          </p>
        </div>
        <div class="task-footer">
          <div class="task-priority" :class="`priority-${task.priority.toLowerCase()}`">
            {{ task.priority }}
          </div>
          <div class="task-actions">
            <router-link :to="`/tasks/${task.id}`" class="task-action-btn view">
              View Details
            </router-link>
            <button class="task-action-btn start" @click="startTask(task)">
              Start Task
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const loading = ref(true);
const tasks = ref([]);

// Get scheduled tasks
const scheduledTasks = computed(() => {
  return tasks.value.filter(task => task.status === 'scheduled');
});

// Format date for display
const formatDate = (dateString) => {
  if (!dateString) return 'No date';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Get a truncated description for display
const getTaskDescription = (task) => {
  if (!task.description || task.description.length === 0) {
    return 'No description provided';
  }

  // Join all description items and truncate
  const fullDescription = task.description.join(' ');
  return fullDescription.length > 100
    ? fullDescription.substring(0, 100) + '...'
    : fullDescription;
};

// Start a task
const startTask = (task) => {
  // Update task status to in_progress
  const updatedTask = {
    ...task,
    status: 'in_progress',
    startedAt: new Date().toISOString()
  };

  // Update in localStorage
  const allTasks = tasks.value.map(t =>
    t.id === task.id ? updatedTask : t
  );

  localStorage.setItem('tasks', JSON.stringify(allTasks));

  // Navigate to task detail page
  router.push(`/tasks/${task.id}`);
};

// Load tasks from localStorage
const loadTasks = () => {
  loading.value = true;
  setTimeout(() => {
    try {
      const storedTasks = localStorage.getItem('tasks');
      if (storedTasks) {
        tasks.value = JSON.parse(storedTasks);
      }
    } catch (error) {
      console.error('Failed to load tasks:', error);
    } finally {
      loading.value = false;
    }
  }, 800); // Simulate loading delay
};

onMounted(() => {
  loadTasks();
});
</script>

<style scoped>
.scheduled-tasks {
  max-width: 1200px;
  margin: 0 auto;
}

/* Task Card Styles */
.tasks-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.task-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 16px;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s, box-shadow 0.2s;
}

.task-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.task-title {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0;
  flex: 1;
}

.task-date {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #6B7280;
  white-space: nowrap;
}

.task-date .icon {
  width: 14px;
  height: 14px;
}

.task-body {
  flex: 1;
  margin-bottom: 16px;
}

.task-description {
  font-size: 14px;
  color: #4B5563;
  margin: 0;
  line-height: 1.5;
}

.task-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.task-priority {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.priority-low {
  background-color: #DBEAFE;
  color: #1E40AF;
}

.priority-medium {
  background-color: #FEF3C7;
  color: #92400E;
}

.priority-high {
  background-color: #FEE2E2;
  color: #B91C1C;
}

.task-actions {
  display: flex;
  gap: 8px;
}

.task-action-btn {
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.2s;
}

.task-action-btn.view {
  background-color: #F3F4F6;
  color: #4B5563;
  border: none;
}

.task-action-btn.view:hover {
  background-color: #E5E7EB;
}

.task-action-btn.start {
  background-color: #2563EB;
  color: white;
  border: none;
}

.task-action-btn.start:hover {
  background-color: #1D4ED8;
}

/* Empty State Styles */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.empty-state-icon {
  width: 64px;
  height: 64px;
  color: #D1D5DB;
  margin-bottom: 16px;
}

.empty-state-icon svg {
  width: 100%;
  height: 100%;
}

.empty-state-title {
  font-size: 20px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 8px;
}

.empty-state-description {
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 24px;
  max-width: 400px;
}

.empty-state-btn {
  padding: 8px 16px;
  background-color: #2563EB;
  color: white;
  border-radius: 6px;
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.2s;
}

.empty-state-btn:hover {
  background-color: #1D4ED8;
}

/* Loading Skeleton Styles */
.tasks-loading-skeleton {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.task-skeleton {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.task-skeleton-header {
  display: flex;
  justify-content: space-between;
}

.task-skeleton-title {
  height: 20px;
  width: 60%;
  background-color: #E5E7EB;
  border-radius: 4px;
}

.task-skeleton-date {
  height: 16px;
  width: 30%;
  background-color: #E5E7EB;
  border-radius: 4px;
}

.task-skeleton-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.task-skeleton-text {
  height: 14px;
  width: 100%;
  background-color: #E5E7EB;
  border-radius: 4px;
}

.task-skeleton-text.short {
  width: 70%;
}

.task-skeleton-footer {
  display: flex;
  justify-content: space-between;
}

.task-skeleton-badge {
  height: 24px;
  width: 60px;
  background-color: #E5E7EB;
  border-radius: 4px;
}

.task-skeleton-actions {
  height: 24px;
  width: 120px;
  background-color: #E5E7EB;
  border-radius: 4px;
}

@keyframes pulse {
  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.6;
  }
}

.task-skeleton-title,
.task-skeleton-date,
.task-skeleton-text,
.task-skeleton-badge,
.task-skeleton-actions {
  animation: pulse 1.5s infinite;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .tasks-list {
    width: 100%;
  }

  .tasks-loading-skeleton {
    width: 100%;
  }
}
</style>
