<!-- EditClientTask.vue -->
<template>
  <div class="edit-task-container">
    <header class="edit-header">
      <div class="back-button" @click="goBack">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>Back</span>
      </div>
      <div class="actions">
        <button class="cancel-btn" @click="cancelEdit">Cancel</button>
        <button class="save-btn" @click="saveTask" :disabled="!isFormValid">Save Changes</button>
      </div>
    </header>

    <div v-if="task" class="edit-form">
      <div class="form-section">
        <label>Title</label>
        <input
          v-model="editedTask.title"
          type="text"
          class="form-input"
          placeholder="Enter task title"
        >
      </div>

      <div class="form-row">
        <div class="form-section">
          <label>Priority</label>
          <select v-model="editedTask.priority" class="form-select">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div class="form-section">
          <label>Status</label>
          <select v-model="editedTask.status" class="form-select">
            <option value="pending">Pending</option>
            <option value="scheduled">Scheduled</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <div class="form-row">
        <div class="form-section">
          <label>Start Date</label>
          <input
            v-model="editedTask.startDate"
            type="date"
            class="form-input"
          >
        </div>
        <div class="form-section">
          <label>Start Time</label>
          <input
            v-model="editedTask.startTime"
            type="time"
            class="form-input"
          >
        </div>
      </div>

      <div class="form-row">
        <div class="form-section">
          <label>End Date</label>
          <input
            v-model="editedTask.endDate"
            type="date"
            class="form-input"
          >
        </div>
        <div class="form-section">
          <label>End Time</label>
          <input
            v-model="editedTask.endTime"
            type="time"
            class="form-input"
          >
        </div>
      </div>

      <div class="form-section">
        <label>Assigned Agents</label>
        <div class="assigned-people">
          <div v-for="agent in editedTask.agentDetails" :key="agent.id" class="person-card">
            <div class="person-info">
              <div class="person-avatar agent" :class="{ 'has-image': agent.avatar }" :data-name="agent.name">
                <img v-if="agent.avatar" :src="agent.avatar" :alt="agent.name" @error="handleAvatarError">
                <template v-else>{{ getInitials(agent.name) }}</template>
              </div>
              <div class="person-details">
                <span class="name">{{ agent.name }}</span>
                <span class="email">{{ agent.email }}</span>
              </div>
            </div>
            <button class="remove-btn" @click="removeAgent(agent.id)" title="Remove Agent">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
          <button class="add-person-btn" @click="showAgentModal = true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Add Agent
          </button>
        </div>
      </div>

      <div class="form-section">
        <label>Assigned Clients</label>
        <div class="assigned-people">
          <div v-for="client in editedTask.clientDetails" :key="client.id" class="person-card">
            <div class="person-info">
              <div class="person-avatar client" :class="{ 'has-image': client.avatar }" :data-name="client.name">
                <img v-if="client.avatar" :src="client.avatar" :alt="client.name" @error="handleAvatarError">
                <template v-else>{{ getInitials(client.name) }}</template>
              </div>
              <div class="person-details">
                <span class="name">{{ client.name }}</span>
                <span class="email">{{ client.email }}</span>
              </div>
            </div>
            <button class="remove-btn" @click="removeClient(client.id)" title="Remove Client">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
          <button class="add-person-btn" @click="showClientModal = true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Add Client
          </button>
        </div>
      </div>
    </div>

    <!-- Confirmation Modal for Remove Agent -->
    <div v-if="showRemoveAgentModal" class="modal-overlay">
      <div class="modal-container">
        <div class="modal-content delete-confirmation">
          <h3>Remove Agent</h3>
          <p>Are you sure you want to remove this agent from the task?</p>
          <div class="modal-actions">
            <button class="cancel-btn" @click="showRemoveAgentModal = false">Cancel</button>
            <button class="delete-btn" @click="confirmRemoveAgent">Remove</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Confirmation Modal for Remove Client -->
    <div v-if="showRemoveClientModal" class="modal-overlay">
      <div class="modal-container">
        <div class="modal-content delete-confirmation">
          <h3>Remove Client</h3>
          <p>Are you sure you want to remove this client from the task?</p>
          <div class="modal-actions">
            <button class="cancel-btn" @click="showRemoveClientModal = false">Cancel</button>
            <button class="delete-btn" @click="confirmRemoveClient">Remove</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTaskStore } from '@/stores/taskStore';
import { useConnectionStore } from '@/stores/connectionStore';

const route = useRoute();
const router = useRouter();
const taskStore = useTaskStore();
const connectionStore = useConnectionStore();

const task = ref(null);
const editedTask = ref(null);
const showRemoveAgentModal = ref(false);
const showRemoveClientModal = ref(false);
const selectedAgentId = ref(null);
const selectedClientId = ref(null);
const showAgentModal = ref(false);
const showClientModal = ref(false);

onMounted(async () => {
  const taskId = parseInt(route.params.id);
  task.value = taskStore.getTaskById(taskId);
  if (task.value) {
    // Create a deep copy of the task for editing
    editedTask.value = JSON.parse(JSON.stringify(task.value));
  } else {
    router.push('/admin/client-tasks');
  }
});

const isFormValid = computed(() => {
  if (!editedTask.value) return false;
  return (
    editedTask.value.title &&
    editedTask.value.startDate &&
    editedTask.value.endDate &&
    editedTask.value.startTime &&
    editedTask.value.endTime
  );
});

const getInitials = (name) => {
  if (!name) return '';
  return name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

const handleAvatarError = (event) => {
  const target = event.target;
  const parentDiv = target.parentElement;
  const name = parentDiv.getAttribute('data-name');

  target.remove();
  parentDiv.textContent = getInitials(name);
  parentDiv.classList.remove('has-image');
};

const removeAgent = (agentId) => {
  selectedAgentId.value = agentId;
  showRemoveAgentModal.value = true;
};

const confirmRemoveAgent = async () => {
  if (!editedTask.value || !selectedAgentId.value) return;

  editedTask.value.agents = editedTask.value.agents.filter(id => id !== selectedAgentId.value);
  editedTask.value.agentDetails = editedTask.value.agentDetails.filter(agent => agent.id !== selectedAgentId.value);

  showRemoveAgentModal.value = false;
  selectedAgentId.value = null;
};

const removeClient = (clientId) => {
  selectedClientId.value = clientId;
  showRemoveClientModal.value = true;
};

const confirmRemoveClient = async () => {
  if (!editedTask.value || !selectedClientId.value) return;

  editedTask.value.clients = editedTask.value.clients.filter(id => id !== selectedClientId.value);
  editedTask.value.clientDetails = editedTask.value.clientDetails.filter(client => client.id !== selectedClientId.value);

  showRemoveClientModal.value = false;
  selectedClientId.value = null;
};

const saveTask = async () => {
  if (!editedTask.value || !isFormValid.value) {
    alert('Please fill in all required fields');
    return;
  }

  // Check if the selected agents and clients are connected
  if (editedTask.value) {
    const areConnected = connectionStore.validateMultipleInteractions(
      editedTask.value.agents,
      editedTask.value.clients
    );

    if (!areConnected) {
      alert('Tasks can only be scheduled between connected agents and clients. Please ensure all clients have a connection with at least one of the selected agents.');
      return;
    }
  }

  try {
    // Continue with existing save logic
    isSaving.value = true;

    // Simulate API call with timeout
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Update local tasks in real app, would make API call
    taskStore.updateTask(task.value.id, editedTask.value);

    isSaving.value = false;
    showSuccessMessage.value = true;

    setTimeout(() => {
      showSuccessMessage.value = false;
      router.push(`/admin/client-task/${task.value.id}?clientId=${route.query.clientId}`);
    }, 1500);
  } catch (error) {
    console.error('Error saving task:', error);
    isSaving.value = false;
    alert('Failed to save changes. Please try again.');
  }
};

const cancelEdit = () => {
  router.push(`/admin/client-task/${task.value.id}?clientId=${route.query.clientId}`);
};

const goBack = () => {
  router.back();
};
</script>

<style scoped>
.edit-task-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.edit-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.back-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  transition: all 0.2s;
}

.back-button:hover {
  color: #333;
  background: #f5f5f5;
}

.back-button svg {
  width: 20px;
  height: 20px;
}

.back-button span {
  font-weight: 500;
}

.actions {
  display: flex;
  gap: 1rem;
}

.cancel-btn, .save-btn {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.cancel-btn {
  background: #f5f5f5;
  border: 1px solid #ddd;
  color: #666;
}

.cancel-btn:hover {
  background: #eee;
}

.save-btn {
  background: #2563eb;
  border: 1px solid #2563eb;
  color: white;
}

.save-btn:hover {
  background: #1d4ed8;
}

.save-btn:disabled {
  background: #93c5fd;
  border-color: #93c5fd;
  cursor: not-allowed;
}

.edit-form {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.form-section {
  margin-bottom: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #374151;
}

.form-input, .form-select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.9rem;
}

.form-input:focus, .form-select:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.assigned-people {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.person-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: #f9fafb;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
}

.person-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.person-avatar {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  color: white;
  background: #64748b;
  position: relative;
  overflow: hidden;
}

.person-avatar.agent {
  background: #2563eb;
}

.person-avatar.client {
  background: #059669;
}

.person-avatar.has-image {
  background: none;
}

.person-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.person-details {
  display: flex;
  flex-direction: column;
}

.person-details .name {
  font-weight: 500;
  color: #111827;
}

.person-details .email {
  font-size: 0.8rem;
  color: #6b7280;
}

.remove-btn {
  padding: 0.25rem;
  border: none;
  background: none;
  color: #6b7280;
  cursor: pointer;
  border-radius: 4px;
}

.remove-btn:hover {
  color: #dc2626;
  background: #fee2e2;
}

.add-person-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: #f3f4f6;
  border: 1px dashed #d1d5db;
  border-radius: 6px;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s;
}

.add-person-btn:hover {
  background: #e5e7eb;
  border-color: #9ca3af;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-container {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.modal-content {
  text-align: center;
}

.modal-content h3 {
  margin-bottom: 1rem;
  color: #111827;
}

.modal-content p {
  margin-bottom: 1.5rem;
  color: #6b7280;
}

.modal-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.delete-confirmation .delete-btn {
  background: #dc2626;
  border-color: #dc2626;
}

.delete-confirmation .delete-btn:hover {
  background: #b91c1c;
}
</style>
