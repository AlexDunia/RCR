<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const scheduledTasks = ref([]);
const isLoading = ref(true);
const error = ref(null);
const filterValue = ref('all'); // 'all', 'today', 'thisWeek', 'nextWeek', 'future'

onMounted(async () => {
  try {
    // Simulate API call with timeout
    setTimeout(() => {
      scheduledTasks.value = [
        {
          id: 3001,
          title: "Client Open House",
          scheduledDate: "2023-07-15T14:00:00",
          priority: "high",
          status: "scheduled",
          description: "Host open house for the Johnson family property on Maple Street",
          location: "123 Maple St, Anytown, CA",
          duration: 120, // in minutes
          assignedTo: "Jane Smith",
          client: "Johnson Family"
        },
        {
          id: 3002,
          title: "Property Photoshoot",
          scheduledDate: "2023-07-18T10:00:00",
          priority: "medium",
          status: "scheduled",
          description: "Professional photography session for the new downtown condo listing",
          location: "456 Urban Ave, Anytown, CA",
          duration: 90,
          assignedTo: "Robert Chen",
          client: "Downtown Properties LLC"
        },
        {
          id: 3003,
          title: "Closing Meeting",
          scheduledDate: "2023-07-20T15:30:00",
          priority: "high",
          status: "scheduled",
          description: "Final walkthrough and closing meeting for the Wilson property",
          location: "First National Title, 789 Business Rd",
          duration: 60,
          assignedTo: "Michael Johnson",
          client: "Wilson Family"
        },
        {
          id: 3004,
          title: "Market Analysis Review",
          scheduledDate: new Date(new Date().setHours(14, 0, 0, 0)).toISOString(), // Today at 2:00 PM
          priority: "medium",
          status: "scheduled",
          description: "Review quarterly market analysis with the team and plan strategy",
          location: "Office Conference Room",
          duration: 60,
          assignedTo: "Jane Smith",
          client: "Internal"
        },
        {
          id: 3005,
          title: "Property Inspection",
          scheduledDate: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString(), // Two days from now
          priority: "medium",
          status: "scheduled",
          description: "Routine inspection of the rental property on Oak Lane",
          location: "567 Oak Lane, Anytown, CA",
          duration: 45,
          assignedTo: "Robert Chen",
          client: "Rivera Rentals"
        }
      ];
      isLoading.value = false;
    }, 600);
  } catch (err) {
    console.error('Failed to load scheduled tasks:', err);
    error.value = 'Failed to load scheduled tasks. Please try again.';
    isLoading.value = false;
  }
});

const filteredTasks = computed(() => {
  if (!scheduledTasks.value.length) return [];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(today);
  endOfWeek.setDate(today.getDate() + (6 - today.getDay())); // Sunday is 0, Saturday is 6

  const startOfNextWeek = new Date(endOfWeek);
  startOfNextWeek.setDate(endOfWeek.getDate() + 1);

  const endOfNextWeek = new Date(startOfNextWeek);
  endOfNextWeek.setDate(startOfNextWeek.getDate() + 6);

  return scheduledTasks.value.filter(task => {
    const taskDate = new Date(task.scheduledDate);

    switch (filterValue.value) {
      case 'today':
        return isToday(taskDate);
      case 'thisWeek':
        return isInRange(taskDate, today, endOfWeek);
      case 'nextWeek':
        return isInRange(taskDate, startOfNextWeek, endOfNextWeek);
      case 'future':
        return taskDate > endOfNextWeek;
      default: // 'all'
        return true;
    }
  }).sort((a, b) => new Date(a.scheduledDate) - new Date(b.scheduledDate));
});

const isToday = (date) => {
  const today = new Date();
  return date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();
};

const isInRange = (date, start, end) => {
  return date >= start && date <= end;
};

const viewTaskDetails = (taskId) => {
  router.push(`/tasks/${taskId}`);
};

const rescheduleTask = (taskId) => {
  // In a real app, this would open a modal to select a new date
  alert(`Reschedule task #${taskId}`);
};

const completeTask = (taskId) => {
  scheduledTasks.value = scheduledTasks.value.filter(task => task.id !== taskId);
  // In a real app, this would call an API to update the task status
};

const priorityClass = (priority) => {
  switch (priority) {
    case 'high': return 'priority-high';
    case 'medium': return 'priority-medium';
    case 'low': return 'priority-low';
    default: return '';
  }
};

const formatDateTime = (dateTimeString) => {
  const options = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  };
  return new Date(dateTimeString).toLocaleString(undefined, options);
};

const formatTime = (dateTimeString) => {
  const options = {
    hour: 'numeric',
    minute: '2-digit'
  };
  return new Date(dateTimeString).toLocaleString(undefined, options);
};

const formatDuration = (minutes) => {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours} hr ${mins} min` : `${hours} hr`;
};

const getRelativeDay = (dateTimeString) => {
  const taskDate = new Date(dateTimeString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  if (isToday(taskDate)) {
    return 'Today';
  } else if (
    taskDate.getDate() === tomorrow.getDate() &&
    taskDate.getMonth() === tomorrow.getMonth() &&
    taskDate.getFullYear() === tomorrow.getFullYear()
  ) {
    return 'Tomorrow';
  } else {
    const options = { weekday: 'long', month: 'short', day: 'numeric' };
    return taskDate.toLocaleDateString(undefined, options);
  }
};
</script>

<template>
  <div class="scheduled-tasks">
    <div class="page-header">
      <h1>Scheduled Tasks</h1>
      <button class="create-task-btn" @click="router.push('/tasks/create')">
        Create New Task
      </button>
    </div>

    <div class="filters">
      <div class="filter-options">
        <button
          class="filter-btn"
          :class="{ active: filterValue === 'all' }"
          @click="filterValue = 'all'"
        >
          All
        </button>
        <button
          class="filter-btn"
          :class="{ active: filterValue === 'today' }"
          @click="filterValue = 'today'"
        >
          Today
        </button>
        <button
          class="filter-btn"
          :class="{ active: filterValue === 'thisWeek' }"
          @click="filterValue = 'thisWeek'"
        >
          This Week
        </button>
        <button
          class="filter-btn"
          :class="{ active: filterValue === 'nextWeek' }"
          @click="filterValue = 'nextWeek'"
        >
          Next Week
        </button>
        <button
          class="filter-btn"
          :class="{ active: filterValue === 'future' }"
          @click="filterValue = 'future'"
        >
          Future
        </button>
      </div>
    </div>

    <div v-if="isLoading" class="loading-state">
      <div class="loading-spinner"></div>
      <p>Loading scheduled tasks...</p>
    </div>

    <div v-else-if="error" class="error-message">
      {{ error }}
    </div>

    <div v-else-if="filteredTasks.length === 0" class="empty-state">
      <p>No scheduled tasks found for the selected time period.</p>
      <button class="create-btn" @click="router.push('/tasks/create')">
        Schedule a New Task
      </button>
    </div>

    <div v-else class="tasks-list">
      <div v-for="task in filteredTasks" :key="task.id" class="task-card">
        <div class="task-header">
          <div class="priority-indicator" :class="priorityClass(task.priority)"></div>
          <h3 class="task-title">{{ task.title }}</h3>
        </div>

        <div class="task-datetime">
          <div class="date-label">{{ getRelativeDay(task.scheduledDate) }}</div>
          <div class="time-label">{{ formatTime(task.scheduledDate) }} • {{ formatDuration(task.duration) }}</div>
        </div>

        <div class="task-details">
          <div class="detail-item">
            <span class="detail-label">Location:</span>
            <span class="detail-value">{{ task.location }}</span>
          </div>

          <div class="detail-item">
            <span class="detail-label">Client:</span>
            <span class="detail-value">{{ task.client }}</span>
          </div>

          <div class="detail-item">
            <span class="detail-label">Assigned to:</span>
            <span class="detail-value">{{ task.assignedTo }}</span>
          </div>
        </div>

        <div class="task-description">
          {{ task.description }}
        </div>

        <div class="task-actions">
          <button class="view-btn" @click="viewTaskDetails(task.id)">
            View Details
          </button>
          <button class="reschedule-btn" @click="rescheduleTask(task.id)">
            Reschedule
          </button>
          <button class="complete-btn" @click="completeTask(task.id)">
            Mark Complete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scheduled-tasks {
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.page-header h1 {
  margin: 0;
  font-size: 1.8rem;
  color: #333;
}

.create-task-btn {
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-weight: 600;
  cursor: pointer;
}

.create-task-btn:hover {
  background-color: #1565c0;
}

.filters {
  margin-bottom: 20px;
}

.filter-options {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.filter-btn {
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid #ddd;
  background-color: white;
  color: #555;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-btn:hover {
  background-color: #f5f5f5;
}

.filter-btn.active {
  background-color: #e3f2fd;
  color: #1976d2;
  border-color: #bbdefb;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
}

.loading-spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid #1976d2;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
  margin-bottom: 15px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-message {
  padding: 20px;
  background-color: #ffebee;
  color: #c62828;
  border-radius: 8px;
  text-align: center;
}

.empty-state {
  padding: 40px;
  text-align: center;
  background-color: #f5f5f5;
  border-radius: 8px;
  color: #757575;
}

.create-btn {
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-weight: 600;
  margin-top: 15px;
  cursor: pointer;
}

.tasks-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.task-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.task-header {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.priority-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 10px;
}

.priority-high {
  background-color: #f44336;
}

.priority-medium {
  background-color: #ff9800;
}

.priority-low {
  background-color: #4caf50;
}

.task-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
  color: #333;
}

.task-datetime {
  background-color: #f5f7fa;
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 15px;
}

.date-label {
  font-weight: 600;
  color: #333;
  font-size: 1rem;
  margin-bottom: 3px;
}

.time-label {
  color: #555;
  font-size: 0.95rem;
}

.task-details {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 15px;
}

.detail-item {
  display: flex;
  align-items: center;
}

.detail-label {
  font-weight: 600;
  color: #555;
  margin-right: 5px;
  font-size: 0.9rem;
}

.detail-value {
  color: #333;
  font-size: 0.9rem;
}

.task-description {
  color: #555;
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 15px;
}

.task-actions {
  display: flex;
  gap: 10px;
  margin-top: auto;
  padding-top: 15px;
  border-top: 1px solid #eee;
}

.view-btn,
.reschedule-btn,
.complete-btn {
  padding: 8px;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.9rem;
  border: none;
  flex: 1;
}

.view-btn {
  background-color: #e3f2fd;
  color: #1976d2;
}

.view-btn:hover {
  background-color: #bbdefb;
}

.reschedule-btn {
  background-color: #fff8e1;
  color: #f57f17;
}

.reschedule-btn:hover {
  background-color: #ffecb3;
}

.complete-btn {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.complete-btn:hover {
  background-color: #c8e6c9;
}

@media (max-width: 600px) {
  .task-actions {
    flex-direction: column;
  }

  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .create-task-btn {
    width: 100%;
  }

  .filter-options {
    overflow-x: auto;
    padding-bottom: 10px;
    white-space: nowrap;
    display: flex;
    flex-wrap: nowrap;
  }
}
</style>
