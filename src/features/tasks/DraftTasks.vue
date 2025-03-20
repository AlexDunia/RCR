<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const draftTasks = ref([]);
const isLoading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    // Simulate API call with timeout
    setTimeout(() => {
      draftTasks.value = [
        {
          id: 2001,
          title: "New Property Listing Setup",
          createdDate: "2023-07-08",
          lastModified: "2023-07-10",
          description: "Setup new listing for the lakefront property including photo session, description writing, and market analysis",
          completion: 30,
          assignedTo: "Jane Smith"
        },
        {
          id: 2002,
          title: "Client Meeting Preparation",
          createdDate: "2023-07-09",
          lastModified: "2023-07-09",
          description: "Prepare presentation materials and comparable properties analysis for the Johnson family consultation",
          completion: 50,
          assignedTo: "Robert Chen"
        },
        {
          id: 2003,
          title: "HOA Document Review",
          createdDate: "2023-07-06",
          lastModified: "2023-07-07",
          description: "Review homeowners association documents for the new downtown condo listings",
          completion: 15,
          assignedTo: "Michael Johnson"
        }
      ];
      isLoading.value = false;
    }, 600);
  } catch (err) {
    console.error('Failed to load draft tasks:', err);
    error.value = 'Failed to load draft tasks. Please try again.';
    isLoading.value = false;
  }
});

const editDraft = (taskId) => {
  router.push(`/tasks/${taskId}`);
};

const deleteDraft = (taskId) => {
  if (confirm('Are you sure you want to delete this draft? This action cannot be undone.')) {
    draftTasks.value = draftTasks.value.filter(task => task.id !== taskId);
    // In a real app, this would call an API to delete the task
  }
};

const publishTask = (taskId) => {
  // In a real app, this would call an API to update the task status
  draftTasks.value = draftTasks.value.filter(task => task.id !== taskId);
  // Show success message or notification here
};

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
</script>

<template>
  <div class="draft-tasks">
    <div class="page-header">
      <h1>Draft Tasks</h1>
      <button class="create-task-btn" @click="router.push('/tasks/create')">
        Create New Task
      </button>
    </div>

    <div v-if="isLoading" class="loading-state">
      <div class="loading-spinner"></div>
      <p>Loading draft tasks...</p>
    </div>

    <div v-else-if="error" class="error-message">
      {{ error }}
    </div>

    <div v-else-if="draftTasks.length === 0" class="empty-state">
      <p>You don't have any task drafts.</p>
      <button class="create-btn" @click="router.push('/tasks/create')">
        Create Your First Task
      </button>
    </div>

    <div v-else class="drafts-list">
      <div v-for="task in draftTasks" :key="task.id" class="draft-card">
        <div class="draft-header">
          <h3 class="draft-title">{{ task.title }}</h3>
        </div>

        <div class="draft-details">
          <div class="detail-item">
            <span class="detail-label">Created:</span>
            <span class="detail-value">{{ formatDate(task.createdDate) }}</span>
          </div>

          <div class="detail-item">
            <span class="detail-label">Last modified:</span>
            <span class="detail-value">{{ formatDate(task.lastModified) }}</span>
          </div>

          <div class="detail-item">
            <span class="detail-label">Assigned to:</span>
            <span class="detail-value">{{ task.assignedTo }}</span>
          </div>
        </div>

        <div class="draft-description">
          {{ task.description }}
        </div>

        <div class="completion-container">
          <div class="completion-label">
            <span>Completion</span>
            <span>{{ task.completion }}%</span>
          </div>
          <div class="completion-bar">
            <div class="completion-fill" :style="{ width: `${task.completion}%` }"
                :class="{
                  'low': task.completion < 40,
                  'medium': task.completion >= 40 && task.completion < 80,
                  'high': task.completion >= 80
                }">
            </div>
          </div>
        </div>

        <div class="draft-actions">
          <button class="edit-btn" @click="editDraft(task.id)">
            Continue Editing
          </button>
          <button class="publish-btn" @click="publishTask(task.id)">
            Publish Task
          </button>
          <button class="delete-btn" @click="deleteDraft(task.id)">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.draft-tasks {
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

.drafts-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.draft-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.draft-header {
  margin-bottom: 15px;
}

.draft-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
  color: #333;
}

.draft-details {
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

.draft-description {
  color: #555;
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 15px;
}

.completion-container {
  margin-bottom: 15px;
}

.completion-label {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  font-size: 0.85rem;
  color: #555;
}

.completion-bar {
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
}

.completion-fill {
  height: 100%;
  transition: width 0.3s ease;
}

.completion-fill.low {
  background-color: #ff9800;
}

.completion-fill.medium {
  background-color: #03a9f4;
}

.completion-fill.high {
  background-color: #4caf50;
}

.draft-actions {
  display: flex;
  gap: 10px;
  margin-top: auto;
  padding-top: 15px;
  border-top: 1px solid #eee;
}

.edit-btn,
.publish-btn,
.delete-btn {
  padding: 8px;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.9rem;
  border: none;
  flex: 1;
}

.edit-btn {
  background-color: #e3f2fd;
  color: #1976d2;
}

.edit-btn:hover {
  background-color: #bbdefb;
}

.publish-btn {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.publish-btn:hover {
  background-color: #c8e6c9;
}

.delete-btn {
  background-color: #ffebee;
  color: #c62828;
}

.delete-btn:hover {
  background-color: #ffcdd2;
}

@media (max-width: 600px) {
  .draft-actions {
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
