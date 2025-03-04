<template>
  <div class="task-list">
    <!-- Clear All Button -->
    <div v-if="route.path.includes('/drafts') && filteredTasks.length > 0" class="clear-all-container">
      <button class="clear-all-button" @click="showClearAllConfirm = true">
        Clear All Drafts
      </button>
    </div>

    <div
      v-for="task in filteredTasks"
      :key="task.id"
      class="task-card"
      @click="handleTaskClick(task)"
    >
      <div class="task-content">
        <div class="task-title">{{ task.title }}</div>

        <!-- In Progress -->
        <div v-if="task.status === 'in_progress'" class="status-text">
          <span class="status-label">Started:</span> {{ formatDate(task.startedAt) }}
        </div>

        <!-- Drafts -->
        <div v-if="task.status === 'draft'" class="button-container">
          <button class="delete-button" @click.stop="confirmDelete(task)" aria-label="Delete draft">
            <svg class="delete-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
          <button class="edit-button" @click.stop="handleEditClick(task)">
            <svg class="edit-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Continue editing
          </button>
        </div>

        <!-- Completed -->
        <div v-if="task.status === 'completed'" class="status-text completed">
          <svg class="check-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          <span class="status-label">Completed:</span> {{ formatDate(task.completedAt) }}
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Dialog -->
    <div v-if="showDeleteConfirm" class="dialog-overlay" @click="showDeleteConfirm = false">
      <div class="dialog" @click.stop>
        <h3 class="dialog-title">Delete Draft?</h3>
        <p class="dialog-text">Do you wish to delete this draft?</p>
        <div class="dialog-actions">
          <button class="dialog-btn dialog-btn--secondary" @click="showDeleteConfirm = false">
            No
          </button>
          <button class="dialog-btn dialog-btn--primary" @click="handleDelete">
            Yes
          </button>
        </div>
      </div>
    </div>

    <!-- Clear All Confirmation Dialog -->
    <div v-if="showClearAllConfirm" class="dialog-overlay" @click="showClearAllConfirm = false">
      <div class="dialog" @click.stop>
        <h3 class="dialog-title">Clear All Drafts?</h3>
        <p class="dialog-text">Do you wish to delete all drafts? This action cannot be undone.</p>
        <div class="dialog-actions">
          <button class="dialog-btn dialog-btn--secondary" @click="showClearAllConfirm = false">
            No
          </button>
          <button class="dialog-btn dialog-btn--primary" @click="handleClearAll">
            Yes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const tasks = ref([]);
const showDeleteConfirm = ref(false);
const showClearAllConfirm = ref(false);
const taskToDelete = ref(null);

onMounted(() => {
  loadTasks();
});

const loadTasks = () => {
  const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  tasks.value = storedTasks;
  console.log('Loaded tasks:', storedTasks); // Debug to verify dates
};

// Watch route to reload tasks dynamically
watch(() => route.path, () => {
  loadTasks(); // Reload tasks when route changes
});

const confirmDelete = (task) => {
  taskToDelete.value = task;
  showDeleteConfirm.value = true;
};

const handleDelete = () => {
  if (taskToDelete.value) {
    const updatedTasks = tasks.value.filter(t => t.id !== taskToDelete.value.id);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    tasks.value = updatedTasks;
    showDeleteConfirm.value = false;
    taskToDelete.value = null;
  }
};

const handleClearAll = () => {
  localStorage.clear(); // This will clear all localStorage
  tasks.value = [];
  showClearAllConfirm.value = false;
};

const filteredTasks = computed(() => {
  const status = route.path.split('/').pop();
  return tasks.value.filter(task => {
    switch(status) {
      case 'in-progress':
        return task.status === 'in_progress';
      case 'drafts':
        return task.status === 'draft';
      case 'completed':
        return task.status === 'completed';
      default:
        return true;
    }
  });
});

const handleTaskClick = (task) => {
  router.push(`/tasks/${task.id}`);
};

const handleEditClick = (task) => {
  event.stopPropagation();
  router.push(`/tasks/create?draftId=${task.id}`);
};

const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};
</script>

<style scoped>
.task-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.task-card {
  background: white;
  border-radius: 12px;
  padding: 25.5px 20px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.08);
  cursor: pointer;
  position: relative;
}

.task-card::before {
  content: '';
  position: absolute;
  left: 0; /* Align flush with border edge */
  top: 0;
  bottom: 0;
  width: 7px; /* Keep your desired width */
  background-color: #2563EB;
  border-radius: 12px 0 0 12px; /* Flip radius to match card’s left side */
  opacity: 0.2;
}

.task-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.task-title {
  font-size: 16px;
  padding-left:20px;
  color: #111827;
  line-height: 20px;
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.status-text {
  font-size: 13px;
  color: #6B7280;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 4px;
}

.status-label {
  color: #2563EB; /* Blue color */
  font-weight: 600;
}

.button-container {
  display: flex;
  gap: 8px;
  margin-left: auto;
}

.edit-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 36px;
  padding: 0 16px;
  background: #2563EB;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.edit-button:hover {
  background: #1D4ED8;
}

.edit-icon {
  width: 16px;
  height: 16px;
  stroke-width: 2;
}

.completed {
  color: #059669;
}

.check-icon {
  width: 20px;
  height: 20px;
  color: #059669;
  margin-right: 4px;
}

.clear-all-container {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
}

.clear-all-button {
  background-color: transparent;
  color: #6B7280;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.clear-all-button:hover {
  background-color: #FEE2E2;
  border-color: #FCA5A5;
  color: #DC2626;
}

.delete-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  background: transparent;
  color: #6B7280;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.delete-button:hover {
  background-color: #FEE2E2;
  border-color: #FCA5A5;
  color: #DC2626;
}

.delete-icon {
  width: 18px;
  height: 18px;
  stroke-width: 1.5;
}

.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.dialog {
  background: white;
  border-radius: 8px;
  padding: 24px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.dialog-title {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 8px;
}

.dialog-text {
  color: #6B7280;
  font-size: 14px;
  margin: 0 0 20px;
}

.dialog-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.dialog-btn {
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.dialog-btn--primary {
  background: #DC2626;
  color: white;
  border: none;
  opacity: 0.9;
}

.dialog-btn--primary:hover {
  opacity: 1;
  background: #DC2626;
}

.dialog-btn--secondary {
  background: white;
  color: #6B7280;
  border: 1px solid #D1D5DB;
}

.dialog-btn--secondary:hover {
  border-color: #6B7280;
  color: #374151;
}
</style>
