<template>
  <div class="task-home">
    <TaskHeader />
    <TaskNavigation />
    <PageLoader :is-loading="isLoading" />
    <div v-if="!isLoading" class="completed-task-container">
      <div v-for="task in completedTasks" :key="task.id" class="completed-task-card">
      <!-- Title and Expand Toggle -->
      <div class="card-header">
        <h2 class="task-title">{{ task.name }}</h2>
          <button class="expand-toggle" @click="toggleExpand(task.id)">
            {{ isExpanded(task.id) ? 'Less' : 'More' }}
        </button>
      </div>

      <!-- Default Details (Always Visible) -->
      <div class="default-details">
          <div class="date-label">Created: {{ formatDate(task.createdAt) }}</div>
          <div class="date-label">Completed: {{ formatDate(task.endDate) }}</div>
      </div>

        <!-- Expanded Details -->
        <div v-if="isExpanded(task.id)" class="expanded-details">
        <div v-if="task.description && task.description.length > 0" class="description-section">
          <h3 class="section-heading">Description</h3>
            <p v-for="(line, index) in task.description" :key="index" class="task-description">
            - {{ line }}
          </p>
        </div>

        <div class="details-section">
            <div v-if="task.agentDetails?.length > 0" class="detail-item">
            <span class="detail-label">Agents:</span>
            <span class="detail-value">{{ task.agentDetails.map(agent => agent.name).join(', ') }}</span>
          </div>

            <div v-if="task.clientDetails?.length > 0" class="detail-item">
            <span class="detail-label">Clients:</span>
            <span class="detail-value">{{ task.clientDetails.map(client => client.name).join(', ') }}</span>
          </div>
          </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import TaskHeader from '@/components/task/TaskHeader.vue';
import TaskNavigation from '@/components/task/TaskNavigation.vue';
import PageLoader from '@/components/PageLoader.vue';

const isLoading = ref(true);
const completedTasks = ref([]);
const expandedTasks = ref(new Set());

const toggleExpand = (taskId) => {
  if (expandedTasks.value.has(taskId)) {
    expandedTasks.value.delete(taskId);
  } else {
    expandedTasks.value.add(taskId);
  }
};

const isExpanded = (taskId) => {
  return expandedTasks.value.has(taskId);
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
  // Simulate loading data
  setTimeout(() => {
    completedTasks.value = [
      {
        id: 1,
        name: 'Complete property listing',
        status: 'completed',
        createdAt: '2024-02-01T10:00:00Z',
        endDate: '2024-02-15T18:00:00Z',
        description: [
          'Take professional photos',
          'Write detailed description',
          'Set competitive price'
        ],
        agentDetails: [
          { id: 1, name: 'John Doe' },
          { id: 2, name: 'Jane Smith' }
        ],
        clientDetails: [
          { id: 1, name: 'Real Estate Co.' }
        ]
      }
      // Add more completed tasks as needed
    ];
    isLoading.value = false;
  }, 1500);
});
</script>

<style scoped>
.task-home {
  padding: 20px;
}

.completed-task-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.completed-task-card {
  background-color: #FFFFFF;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 24px;
  margin-bottom: 20px;
  transition: all 0.3s ease;
}

.completed-task-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.task-title {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.expand-toggle {
  background: none;
  border: none;
  color: #2563EB;
  font-size: 14px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.expand-toggle:hover {
  background-color: #EFF6FF;
}

.default-details {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.date-label {
  background-color: #F3F4F6;
  color: #6B7280;
  font-size: 13px;
  padding: 4px 12px;
  border-radius: 16px;
}

.expanded-details {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #E5E7EB;
  animation: slideDown 0.3s ease-out;
}

.section-heading {
  font-size: 16px;
  font-weight: 500;
  color: #374151;
  margin: 0 0 12px;
}

.task-description {
  color: #6B7280;
  font-size: 14px;
  margin: 4px 0;
  padding-left: 8px;
}

.details-section {
  margin-top: 16px;
}

.detail-item {
  margin-bottom: 8px;
}

.detail-label {
  font-weight: 500;
  color: #374151;
  font-size: 14px;
  margin-right: 8px;
}

.detail-value {
  color: #6B7280;
  font-size: 14px;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .completed-task-container {
    padding: 10px;
  }

  .completed-task-card {
    padding: 16px;
  }

  .default-details {
    flex-direction: column;
    gap: 8px;
  }
}
</style>
