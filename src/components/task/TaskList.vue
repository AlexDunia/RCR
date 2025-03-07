<template>
  <div class="task-list">
    <!-- Clear All Button -->
    <div v-if="route.path.includes('/drafts') && filteredTasks.length > 0" class="clear-all-container">
      <button class="clear-all-button" @click="showClearAllConfirm = true">
        Clear All Drafts
      </button>
    </div>

    <!-- Skeleton Loader -->
    <div v-if="loading" class="task-list">
      <div v-for="i in 4" :key="i" class="task-card skeleton">
        <div class="task-content">
          <div class="skeleton-title"></div>
          <div class="skeleton-status"></div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="filteredTasks.length === 0" class="empty-state">
      <div class="empty-state-icon">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <h3 class="empty-state-title">
        {{ getEmptyStateTitle() }}
      </h3>
      <p class="empty-state-text">
        {{ getEmptyStateText() }}
      </p>
      <button v-if="route.path.includes('/drafts') || route.path.includes('/in-progress')" class="create-task-btn" @click="router.push('/tasks/create')">
        Create New Task
      </button>
    </div>

    <!-- Task List -->
    <div v-else>
      <div
        v-for="task in filteredTasks"
        :key="task.id"
        class="task-card"
        :class="{ 'no-click': task.status === 'draft' }"
        @click="task.status !== 'draft' && handleTaskClick(task)"
      >
        <div class="task-content">
          <div class="task-title">{{ truncateTitle(task.title) }}</div>

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
const loading = ref(true);
const showDeleteConfirm = ref(false);
const showClearAllConfirm = ref(false);
const taskToDelete = ref(null);

onMounted(() => {
  loadTasks();
});

const loadTasks = () => {
  loading.value = true;

  // Simulate network delay for skeleton loader
  setTimeout(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks.value = storedTasks;
    loading.value = false;
    console.log('Loaded tasks:', storedTasks); // Debug to verify dates
  }, 1000);
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
  return tasks.value
    .filter(task => {
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
    })
    .sort((a, b) => {
      // Sort by updatedAt (edited) or createdAt (created), newest first
      const dateA = new Date(a.updatedAt || a.createdAt || a.id).getTime();
      const dateB = new Date(b.updatedAt || b.createdAt || b.id).getTime();
      return dateB - dateA; // Newest (most recently created/edited) first
    });
});

const handleTaskClick = (task) => {
  // Navigate to the appropriate task detail page based on status
  if (task.status === 'completed') {
    // For completed tasks, store in completedTasks localStorage
    localStorage.setItem('completedTasks', JSON.stringify(task));

    // Navigate to the CompletedTaskDetail component
    router.push({
      name: 'CompletedTaskDetail',
      params: { id: task.id }
    });
  } else {
    // For other tasks, use the regular TaskDetail component
    localStorage.setItem('currentTaskDetail', JSON.stringify(task));
    router.push({
      name: 'TaskDetail',
      params: { id: task.id }
    });
  }
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

// Truncate title to 25 characters with ellipsis
const truncateTitle = (title) => {
  if (!title) return '';
  return title.length > 25 ? title.substring(0, 25) + '...' : title;
};

// Get appropriate empty state text based on current route
const getEmptyStateTitle = () => {
  const path = route.path;
  if (path.includes('/drafts')) {
    return 'No draft tasks';
  } else if (path.includes('/in-progress')) {
    return 'No tasks in progress';
  } else if (path.includes('/completed')) {
    return 'No completed tasks';
  }
  return 'No tasks found';
};

const getEmptyStateText = () => {
  const path = route.path;
  if (path.includes('/drafts')) {
    return 'Create a new task to get started';
  } else if (path.includes('/in-progress')) {
    return 'Start working on a task to see it here';
  } else if (path.includes('/completed')) {
    return 'Complete tasks will appear here';
  }
  return 'Create a task to get started';
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

.task-card.no-click {
  cursor: default;
}

.task-card::before {
  content: '';
  position: absolute;
  left: 0; /* Align flush with border edge */
  top: 0;
  bottom: 0;
  width: 7px; /* Keep your desired width */
  background-color: #2563EB;
  border-radius: 12px 0 0 12px; /* Flip radius to match card's left side */
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
  padding-left: 20px;
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

.skeleton-title {
  width: 60%;
  height: 20px;
  background-color: #E5E7EB;
  border-radius: 4px;
  margin-left: 20px;
}

.skeleton-status {
  width: 120px;
  height: 20px;
  background-color: #E5E7EB;
  border-radius: 4px;
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
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
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.08);
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
  margin-bottom: 24px;
}

.create-task-btn {
  background-color: #2563EB;
  color: white;
  border: none;
  font-size: 14px;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 6px;
  transition: all 0.2s;
  font-weight: 500;
}

.create-task-btn:hover {
  background-color: #1D4ED8;
  transform: translateY(-1px);
}
</style>
