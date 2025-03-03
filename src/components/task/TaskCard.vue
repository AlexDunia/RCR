<!-- TaskCard.vue -->
<template>
  <div
    v-if="task"
    class="task-card"
    :class="{
      'task-card--draft': task.status === 'draft',
      'task-card--progress': task.status === 'in_progress'
    }"
    @click="handleTaskClick"
  >
    <div class="task-card__content">
      <h3 class="task-title">{{ task.title || task.name }}</h3>
      <div class="task-info">
        <div v-if="task.status === 'draft'" class="task-status">
          <span class="task-status__badge task-status__badge--draft">Draft</span>
          <span class="task-date">Last edited: {{ formatDate(task.lastEditedAt || task.updatedAt) }}</span>
        </div>
        <div v-else-if="task.status === 'in_progress'" class="task-status">
          <span class="task-status__badge task-status__badge--progress">In Progress</span>
          <span class="task-date">Started: {{ formatDate(task.startedAt) }}</span>
        </div>
      </div>
    </div>
    <button v-if="task.status === 'draft'" class="task-card__continue" @click.stop="handleContinueEdit">
      Continue editing
    </button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
});

defineEmits(['click']);

const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });
};

const handleTaskClick = () => {
  if (props.task?.status === 'draft') {
    router.push({ name: 'TaskCreate', query: { draftId: props.task.id } });
  } else {
    router.push({ name: 'TaskDetail', params: { id: props.task.id } });
  }
};

const handleContinueEdit = () => {
  router.push(`/tasks/create?draftId=${props.task.id}`);
};
</script>

<style scoped>
.task-card {
  background-color: #FFFFFF;
  padding: 1.25rem;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
  margin-bottom: 1rem;
}

.task-card:hover {
  border-color: #2563EB;
  box-shadow: 0 2px 4px rgba(37, 99, 235, 0.1);
}

.task-card--draft {
  background-color: #F9FAFB;
  border: 1px dashed #D1D5DB;
}

.task-card--progress {
  background-color: #F0F9FF;
  border: 1px solid #E5E7EB;
}

.task-card--draft:hover {
  background-color: #F3F4F6;
  border-color: #6B7280;
}

.task-card--progress:hover {
  background-color: #E0F2FE;
  border-color: #2563EB;
}

.task-card__content {
  flex: 1;
}

.task-title {
  margin: 0 0 8px;
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
}

.task-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.task-status {
  display: flex;
  align-items: center;
  gap: 12px;
}

.task-status__badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}

.task-status__badge--draft {
  background-color: #F3F4F6;
  color: #6B7280;
}

.task-status__badge--progress {
  background-color: #DBEAFE;
  color: #2563EB;
}

.task-date {
  color: #6B7280;
  font-size: 0.875rem;
}

.task-card__continue {
  padding: 6px 12px;
  background-color: #2563EB;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.task-card__continue:hover {
  background-color: #1D4ED8;
}
</style>
