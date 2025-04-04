<template>
  <div class="client-tasks">
    <div class="section-header">
      <h3 class="section-title">Client Tasks</h3>
      <button class="reset-btn" @click="resetAllTasks">Reset Tasks Data</button>
    </div>

    <!-- Task filtering options -->
    <div class="filter-options">
      <button
        v-for="status in ['all', 'scheduled', 'in_progress', 'completed']"
        :key="status"
        :class="['filter-btn', { active: currentFilter === status }]"
        @click="currentFilter = status"
      >
        {{ formatStatus(status) }}
      </button>
    </div>

    <!-- Tasks list -->
    <div class="tasks-container">
      <div v-if="filteredTasks.length === 0" class="empty-state">
        No tasks found for this client
      </div>

      <div v-else v-for="task in filteredTasks" :key="task.id" class="task-card">
        <div class="task-header">
          <h4>{{ task.title }}</h4>
          <span :class="['status-badge', task.status]">{{ formatStatus(task.status) }}</span>
        </div>

        <div class="task-details">
          <div class="date-info">
            <span class="label">Date:</span>
            {{ formatDate(task.startDate) }} at {{ formatTime(task.startTime) }}
          </div>

          <!-- Assigned agents -->
          <div class="agents-section">
            <span class="label">Assigned agents:</span>
            <div class="agent-list">
              <div v-for="agent in task.agentDetails" :key="agent.id" class="agent-chip">
                <img :src="agent.avatar" :alt="agent.name" class="agent-avatar">
                <span class="agent-name">{{ agent.name }}</span>
              </div>
            </div>
          </div>

          <!-- Show assigned clients in each task card -->
          <div class="clients-section">
            <span class="label">Assigned clients:</span>
            <div class="client-list">
              <div v-for="client in task.clientDetails" :key="client.id" class="client-chip">
                <img :src="client.avatar" :alt="client.name" class="client-avatar">
                <span class="client-name">{{ client.name }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="task-actions">
          <button class="view-details-btn" @click="viewTaskDetails(task.id)">
            View details
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTaskStore } from '@/stores/taskStore';

const route = useRoute();
const router = useRouter();
const taskStore = useTaskStore();

// Get client ID from either route params or query parameter
const clientId = computed(() => {
  // Check if we have a client ID in route params
  if (route.params.id) {
    return parseInt(route.params.id);
  }
  // Check if we have a client ID in query params
  if (route.query.clientId) {
    return parseInt(route.query.clientId);
  }
  // Default to null if no client ID found
  return null;
});

const currentFilter = ref('all');

// Get all tasks for this client
onMounted(() => {
  taskStore.initTasks();
});

// Reset all tasks to test data with exactly 2 clients per task
const resetAllTasks = () => {
  taskStore.resetTasks();
  // Reload the page to ensure everything is reset
  window.location.reload();
};

// Filter tasks by status
const filteredTasks = computed(() => {
  // If no client ID is available, return empty array
  if (!clientId.value) {
    return [];
  }

  // Get tasks for this specific client only
  const clientTasks = taskStore.getTasksByClient(clientId.value);

  console.log(`Filtered tasks for client ${clientId.value}:`, clientTasks);

  if (currentFilter.value === 'all') {
    return clientTasks;
  }

  return clientTasks.filter(task => {
    // Handle underscores in status values
    const statusToMatch = currentFilter.value.replace(/-/g, '_');
    return task.status === statusToMatch;
  }).sort((a, b) => {
    // Sort by date - newest first
    return new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt);
  });
});

// Utility functions
const formatStatus = (status) => {
  const formatted = status.replace('_', ' ');
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};

const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString();
};

const formatTime = (time) => {
  if (!time) return '';
  return time;
};

const viewTaskDetails = (taskId) => {
  const task = taskStore.getTaskById(taskId);

  // For admin viewing client tasks, use the new admin route
  if (route.path.startsWith('/clients/')) {
    router.push(`/admin/client-task/${taskId}?clientId=${clientId.value}`);
  } else {
    // Original behavior for agents
    if (task.status === 'completed') {
      router.push(`/tasks/completed/${taskId}`);
    } else {
      router.push(`/tasks/${taskId}`);
    }
  }
};
</script>

<style scoped>
.client-tasks {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-title {
  font-size: 18px;
  color: #111827;
  margin: 0;
}

.reset-btn {
  padding: 8px 16px;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
}

.reset-btn:hover {
  background: #dc2626;
}

.filter-options {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.filter-btn {
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid #e5e7eb;
  background: #f9fafb;
  font-size: 14px;
  cursor: pointer;
}

.filter-btn.active {
  background: #2563eb;
  color: white;
  border-color: #2563eb;
}

.tasks-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.task-card {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.task-header h4 {
  margin: 0;
  font-size: 16px;
}

.status-badge {
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.status-badge.scheduled {
  background: #dbeafe;
  color: #1e40af;
}

.status-badge.in_progress {
  background: #fef3c7;
  color: #92400e;
}

.status-badge.completed {
  background: #d1fae5;
  color: #065f46;
}

.task-details {
  margin-bottom: 16px;
}

.label {
  font-weight: 500;
  color: #4b5563;
}

.agents-section, .clients-section {
  margin-top: 10px;
}

.agent-list, .client-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 6px;
}

.agent-chip, .client-chip {
  display: flex;
  align-items: center;
  background: #f3f4f6;
  border-radius: 20px;
  padding: 4px 10px;
}

.agent-avatar, .client-avatar {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 6px;
}

.view-details-btn {
  background: transparent;
  color: #2563eb;
  border: 1px solid #2563eb;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.view-details-btn:hover {
  background: #2563eb;
  color: white;
}

.empty-state {
  padding: 30px;
  text-align: center;
  color: #6b7280;
  background: #f9fafb;
  border-radius: 8px;
}
</style>
