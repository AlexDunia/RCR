<template>
  <div class="task-card" :class="taskStatusClass">
    <div class="task-header">
      <div class="task-priority" :class="taskPriorityClass">
        {{ task.priority || 'Medium' }}
      </div>
      <div class="task-due-date">
        {{ formattedDate }}
      </div>
    </div>
    <div class="task-content">
      <h3 class="task-title">{{ task.title }}</h3>
      <p v-if="task.description" class="task-description">{{ truncatedDescription }}</p>
    </div>
    <div class="task-footer">
      <div class="task-status">
        {{ task.status || 'In Progress' }}
      </div>
      <router-link :to="{ name: 'TaskDetail', params: { id: task.id }}" class="task-view-btn">
        View Details
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { formatTaskDate, getTaskPriorityClass, getTaskStatusClass } from '../TaskService';

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
});

const formattedDate = computed(() => formatTaskDate(props.task.dueDate));
const taskPriorityClass = computed(() => getTaskPriorityClass(props.task.priority));
const taskStatusClass = computed(() => getTaskStatusClass(props.task.status));

const truncatedDescription = computed(() => {
  if (!props.task.description) return '';
  return props.task.description.length > 100
    ? `${props.task.description.slice(0, 100)}...`
    : props.task.description;
});
</script>

<style scoped>
.task-card {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border-left: 4px solid #9ca3af;
  transition: all 0.2s;
}

.task-card:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.status-completed {
  border-left-color: #10b981;
}

.status-progress {
  border-left-color: #3b82f6;
}

.status-scheduled {
  border-left-color: #f59e0b;
}

.status-draft {
  border-left-color: #9ca3af;
}

.task-header {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background-color: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}

.task-priority {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  text-transform: uppercase;
}

.priority-high {
  background-color: #fee2e2;
  color: #b91c1c;
}

.priority-medium {
  background-color: #fef3c7;
  color: #92400e;
}

.priority-low {
  background-color: #dbeafe;
  color: #1e40af;
}

.task-due-date {
  font-size: 0.75rem;
  color: #6b7280;
}

.task-content {
  padding: 1rem;
}

.task-title {
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 0.5rem;
}

.task-description {
  font-size: 0.875rem;
  color: #4b5563;
  margin: 0;
  line-height: 1.5;
}

.task-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  border-top: 1px solid #e5e7eb;
}

.task-status {
  font-size: 0.75rem;
  color: #6b7280;
}

.task-view-btn {
  font-size: 0.75rem;
  font-weight: 500;
  color: #3b82f6;
  text-decoration: none;
}

.task-view-btn:hover {
  text-decoration: underline;
}
</style>
