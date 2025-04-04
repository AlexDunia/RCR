<template>
  <div class="agent-tasks">
    <div class="tasks-header">
      <div class="filter-buttons">
        <button
          class="filter-btn"
          :class="{ active: activeFilter === 'all' }"
          @click="filterTasks('all')"
        >All Tasks</button>
        <button
          class="filter-btn"
          :class="{ active: activeFilter === 'pending' }"
          @click="filterTasks('pending')"
        >Pending</button>
        <button
          class="filter-btn"
          :class="{ active: activeFilter === 'completed' }"
          @click="filterTasks('completed')"
        >Completed</button>
      </div>
      <button class="create-task-btn" @click="createTask">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        New Task
      </button>
    </div>

    <div v-if="isLoading" class="loading-state">
      <p>Loading tasks...</p>
    </div>

    <div v-else-if="filteredTasks.length === 0" class="empty-state">
      <p>No tasks found.</p>
      <button class="create-task-btn" @click="createTask">Create New Task</button>
    </div>

    <div v-else class="tasks-list">
      <div v-for="task in filteredTasks" :key="task.id" class="task-card">
        <div class="task-header">
          <div class="task-status" :class="task.status">
            {{ task.status }}
          </div>
          <div class="task-date">
            {{ formatDate(task.dueDate) }}
          </div>
        </div>

        <div class="task-content">
          <h3 class="task-title">{{ task.title }}</h3>
          <p class="task-description">{{ task.description }}</p>
        </div>

        <div class="task-meta">
          <div class="meta-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
            <span>{{ task.category }}</span>
          </div>
          <div class="meta-item" v-if="task.priority">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M13 17l5-5-5-5M6 17l5-5-5-5"/>
            </svg>
            <span>{{ task.priority }}</span>
          </div>
        </div>

        <div class="task-actions">
          <button
            v-if="task.status === 'pending'"
            class="action-btn complete"
            @click="completeTask(task.id)"
          >
            Mark as Complete
          </button>
          <button class="action-btn edit" @click="editTask(task)">
            Edit
          </button>
          <button class="action-btn delete" @click="deleteTask(task.id)">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useTaskStore } from '@/stores/taskStore';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const taskStore = useTaskStore();

// States
const isLoading = ref(true);
const activeFilter = ref('all');

// Get agent ID from route params
const agentId = computed(() => parseInt(route.params.id));

// Computed properties
const filteredTasks = computed(() => {
  const tasks = taskStore.getTasksByAgentId(agentId.value) || [];
  if (activeFilter.value === 'all') return tasks;
  return tasks.filter(task => task.status === activeFilter.value);
});

// Methods
function filterTasks(filter) {
  activeFilter.value = filter;
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

function createTask() {
  router.push({
    path: '/tasks/create',
    query: { agentId: agentId.value }
  });
}

function editTask(task) {
  router.push({
    path: `/tasks/${task.id}/edit`,
    query: { agentId: agentId.value }
  });
}

function completeTask(taskId) {
  taskStore.updateTaskStatus(taskId, 'completed');
}

function deleteTask(taskId) {
  if (confirm('Are you sure you want to delete this task?')) {
    taskStore.deleteTask(taskId);
  }
}

// Load data
onMounted(async () => {
  if (agentId.value) {
    await taskStore.fetchTasksByAgentId(agentId.value);
    isLoading.value = false;
  }
});
</script>

<style scoped>
.agent-tasks {
  width: 100%;
}

.tasks-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.filter-buttons {
  display: flex;
  gap: 1rem;
}

.filter-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  background: white;
  color: #6b7280;
  cursor: pointer;
  font-size: 0.875rem;
}

.filter-btn.active {
  background: #1a4189;
  color: white;
  border-color: #1a4189;
}

.create-task-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #1a4189;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-size: 0.875rem;
}

.loading-state {
  text-align: center;
  padding: 2rem;
  color: #6b7280;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  background: #f9fafb;
  border-radius: 0.5rem;
  color: #6b7280;
}

.tasks-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
}

.task-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1.5rem;
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.task-status {
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: capitalize;
}

.task-status.pending {
  background: #dbeafe;
  color: #1e40af;
}

.task-status.completed {
  background: #dcfce7;
  color: #166534;
}

.task-date {
  font-size: 0.875rem;
  color: #6b7280;
}

.task-content {
  margin-bottom: 1.5rem;
}

.task-title {
  font-size: 1rem;
  font-weight: 500;
  color: #111827;
  margin: 0 0 0.5rem;
}

.task-description {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
  line-height: 1.5;
}

.task-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 1rem 0;
  border-top: 1px solid #e5e7eb;
  border-bottom: 1px solid #e5e7eb;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #6b7280;
}

.meta-item svg {
  color: #9ca3af;
}

.task-actions {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
}

.action-btn {
  padding: 0.375rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  cursor: pointer;
}

.action-btn.complete {
  background: #1a4189;
  color: white;
  border: none;
}

.action-btn.edit {
  background: white;
  color: #1a4189;
  border: 1px solid #1a4189;
}

.action-btn.delete {
  background: white;
  color: #ef4444;
  border: 1px solid #ef4444;
}
</style>
