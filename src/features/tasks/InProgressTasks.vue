<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const tasks = ref([]);
const isLoading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    // Simulate API call with timeout
    setTimeout(() => {
      tasks.value = [
        {
          id: 1001,
          title: "Property Inspection at 123 Main St",
          dueDate: "2023-07-15",
          priority: "high",
          status: "in-progress",
          description: "Perform detailed inspection of the property including structure, systems, and potential issues",
          completion: 65,
          assignedTo: "Jane Smith",
          client: "Johnson Family"
        },
        {
          id: 1002,
          title: "Marketing Materials for Downtown Listing",
          dueDate: "2023-07-18",
          priority: "medium",
          status: "in-progress",
          description: "Create professional brochures, virtual tour, and social media assets for the new downtown property",
          completion: 30,
          assignedTo: "Robert Chen",
          client: "Davis Realty"
        },
        {
          id: 1003,
          title: "Contract Review for Bay View Condo",
          dueDate: "2023-07-12",
          priority: "high",
          status: "in-progress",
          description: "Review purchase agreement and prepare counteroffers for negotiation",
          completion: 80,
          assignedTo: "Michael Johnson",
          client: "Sarah Williams"
        },
        {
          id: 1004,
          title: "Weekly Market Analysis Report",
          dueDate: "2023-07-14",
          priority: "medium",
          status: "in-progress",
          description: "Analyze recent market trends and prepare comprehensive report for team meeting",
          completion: 45,
          assignedTo: "Jane Smith",
          client: "Internal"
        }
      ];
      isLoading.value = false;
    }, 600);
  } catch (err) {
    console.error('Failed to load in-progress tasks:', err);
    error.value = 'Failed to load tasks. Please try again.';
    isLoading.value = false;
  }
});

const viewTaskDetails = (taskId) => {
  router.push(`/tasks/${taskId}`);
};

const markAsCompleted = (taskId) => {
  tasks.value = tasks.value.filter(task => task.id !== taskId);
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

const formatDueDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
</script>

<template>
  <div class="in-progress-tasks">
    <div class="page-header">
      <h1>In Progress Tasks</h1>
      <button class="create-task-btn" @click="router.push('/tasks/create')">
        Create New Task
      </button>
    </div>

    <div v-if="isLoading" class="loading-state">
      <div class="loading-spinner"></div>
      <p>Loading tasks...</p>
    </div>

    <div v-else-if="error" class="error-message">
      {{ error }}
    </div>

    <div v-else-if="tasks.length === 0" class="empty-state">
      <p>You don't have any in-progress tasks.</p>
      <button class="create-btn" @click="router.push('/tasks/create')">
        Create Your First Task
      </button>
    </div>

    <div v-else class="tasks-list">
      <div v-for="task in tasks" :key="task.id" class="task-card">
        <div class="task-header">
          <div class="priority-indicator" :class="priorityClass(task.priority)"></div>
          <h3 class="task-title">{{ task.title }}</h3>
        </div>

        <div class="task-details">
          <div class="detail-item">
            <span class="detail-label">Due:</span>
            <span class="detail-value">{{ formatDueDate(task.dueDate) }}</span>
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

        <div class="progress-container">
          <div class="progress-label">
            <span>Progress</span>
            <span>{{ task.completion }}%</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: `${task.completion}%` }"></div>
          </div>
        </div>

        <div class="task-actions">
          <button class="view-btn" @click="viewTaskDetails(task.id)">
            View Details
          </button>
          <button class="complete-btn" @click="markAsCompleted(task.id)">
            Mark Complete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.in-progress-tasks {
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
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
  margin-bottom: 15px;
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

.progress-container {
  margin-bottom: 15px;
}

.progress-label {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  font-size: 0.85rem;
  color: #555;
}

.progress-bar {
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: #1976d2;
  transition: width 0.3s ease;
}

.task-actions {
  display: flex;
  gap: 10px;
  margin-top: auto;
  padding-top: 15px;
  border-top: 1px solid #eee;
}

.view-btn,
.complete-btn {
  padding: 8px 15px;
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
}
</style>
