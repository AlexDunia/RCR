<template>
  <div class="document-edit-container">
    <!-- Notifications -->
    <div class="notifications-container">
      <transition-group name="notification">
        <div
          v-for="notification in notifications"
          :key="notification.id"
          class="notification"
          :class="notification.type"
        >
          <span class="notification-message">{{ notification.message }}</span>
          <button class="notification-close" @click="removeNotification(notification.id)">×</button>
        </div>
      </transition-group>
    </div>

    <!-- Header -->
    <div class="page-header">
      <h1 class="header-title">Currently editing: {{ document?.name || 'Legal documentation' }} for {{ clientName }}</h1>
      <div class="breadcrumb">
        <router-link to="/profile/documents" class="breadcrumb-link">Documents</router-link>
        <span class="breadcrumb-separator">></span>
        <span class="breadcrumb-current">{{ document?.name || 'Legal documentation' }}</span>
        </div>
      </div>

    <!-- Main content -->
        <div v-if="isLoading" class="loading-indicator">
          <p>Loading document...</p>
        </div>
        <div v-else-if="!document" class="error-state">
          <h3>Document not found</h3>
          <p>The document you're trying to edit doesn't exist or has been removed.</p>
      <button class="btn-primary" @click="navigateBack">Go Back</button>
    </div>
    <div v-else class="content-layout">
      <!-- Left Section -->
      <div class="main-content">
        <!-- Upload Section -->
        <div class="upload-container">
          <div class="upload-area">
            <svg class="upload-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 12V19M12 12L15 15M12 12L9 15M20 16.7428C21.2215 15.734 22 14.2079 22 12.5C22 9.46243 19.5376 7 16.5 7C16.2815 7 16.0771 7.01349 15.8767 7.03857C14.9827 4.67583 12.6997 3 10 3C6.13401 3 3 6.13401 3 10C3 12.2501 4.07741 14.2509 5.75 15.4805" stroke="#6B7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <div class="upload-text">
              Upload document by Dragging & dropping files or
              <button @click="triggerFileInput" class="browse-link">Browse</button>
            </div>
            <div class="upload-formats">
              Supported formats: PDF, DOC, XLS, PPT
            </div>
            <input
              type="file"
              ref="fileInput"
              @change="handleFileSelect"
              multiple
              accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
              class="hidden"
            />
          </div>
        </div>

        <!-- Edit Form -->
        <div class="edit-section">
          <h2 class="edit-title">Edit file</h2>
          <div class="edit-subtitle">Here you can edit your saved files and document</div>

          <form @submit.prevent="saveDocument" class="edit-form">
          <div class="form-group">
              <label for="documentTitle" class="form-label">Document Title</label>
            <input
              id="documentTitle"
              v-model="document.name"
              type="text"
              class="form-control"
                placeholder="Document name here"
            />
          </div>

          <div class="form-group">
              <label for="documentDescription" class="form-label">Description</label>
              <textarea
                id="documentDescription"
                v-model="document.description"
                class="form-control description-control"
                placeholder="Here, you can edit the description of your documents"
                rows="6"
              ></textarea>
            </div>
          </form>

          <!-- File List -->
          <div class="files-list">
            <div v-for="(file, index) in documentFiles" :key="index" class="file-item">
              <div class="file-icon-wrapper">
                <svg class="file-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7.5 9.16667H12.5M7.5 12.5H10.8333M6.66667 2.5H13.3333L17.5 6.66667V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H6.66667ZM13.3333 2.5V6.66667H17.5L13.3333 2.5Z" stroke="#6B7280" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div class="file-name">{{ file.name }}</div>
              <div class="file-actions">
                <button class="file-edit-btn" @click="editFile(file)">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M13.3333 2.5L17.5 6.66667M2.5 17.5L7.08333 16.1833C7.25635 16.1328 7.41749 16.0515 7.55833 15.9433L17.5 6L14 2.5L4.05833 12.4417C3.95017 12.5825 3.86886 12.7437 3.81833 12.9167L2.5 17.5Z" stroke="#6B7280" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
                <button class="file-delete-btn" @click="deleteFile(index)">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M13.3333 5L6.66667 11.6667M6.66667 5L13.3333 11.6667" stroke="#EF4444" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Sidebar -->
      <div class="sidebar">
        <div class="agents-section">
          <h3 class="agents-title">Associated agents</h3>
          <div v-if="associatedAgents.length > 0" class="agents-list">
            <div v-for="(agent, index) in associatedAgents" :key="index" class="agent-card">
              <div class="agent-info">
                <img :src="agent.avatar" :alt="agent.name" class="agent-avatar" />
                <div class="agent-details">
                  <div class="agent-name">{{ agent.name }}</div>
                  <div class="agent-email">{{ agent.email }}</div>
                </div>
              </div>
              <button class="agent-remove-btn" @click="removeAgent(index)">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M13.3333 5L6.66667 11.6667M6.66667 5L13.3333 11.6667" stroke="#EF4444" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
          <button class="add-agent-btn" @click="showAgentModal = true">
            <span class="add-agent-icon">+</span>
            Add agent
          </button>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="page-footer">
      <button class="exit-btn" @click="navigateBack">Exit</button>
      <button class="save-btn" @click="saveDocument">Save</button>
    </div>

    <!-- Agent Selection Modal -->
    <div v-if="showAgentModal" class="modal-overlay">
      <div class="modal-container">
        <div class="modal-header">
          <h3>Select Agent</h3>
          <button @click="showAgentModal = false" class="modal-close">×</button>
        </div>
        <div class="modal-body">
          <div class="search-box">
            <input
              type="text"
              v-model="agentSearchQuery"
              placeholder="Search agents by name or email"
              class="form-control"
            />
          </div>
          <div class="agent-select-list">
            <div
              v-for="agent in filteredAgents"
              :key="agent.id"
              class="agent-select-item"
              :class="{ 'selected': isAgentSelected(agent) }"
              @click="selectAgent(agent)"
            >
              <img :src="agent.avatar" :alt="agent.name" class="agent-avatar" />
              <div class="agent-details">
                <div class="agent-name">{{ agent.name }}</div>
                <div class="agent-experience">{{ agent.experience }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Confirmation Modal -->
    <div v-if="showConfirmModal" class="modal-overlay">
      <div class="modal-container">
        <div class="modal-header">
          <h3>Confirm Changes</h3>
          <button @click="showConfirmModal = false" class="modal-close">×</button>
        </div>
        <div class="modal-body">
          <p>Do you wish to make changes to this document?</p>
        </div>
        <div class="modal-footer">
          <button class="cancel-modal-btn" @click="showConfirmModal = false">No</button>
          <button class="confirm-modal-btn" @click="confirmSave">Yes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isLoading = ref(true);
const document = ref(null);
const fileInput = ref(null);
const clientName = ref('Lucas Belmar');
const notifications = ref([]);
const notificationId = ref(0);
const showConfirmModal = ref(false);
const showAgentModal = ref(false);
const agentSearchQuery = ref('');

// Mock document data
const mockDocument = {
  id: 1,
  name: 'Legal documentation',
  date: 'March 15, 2023',
  description: 'Standard buyer representation agreement outlining terms and conditions.',
  type: 'PDF'
};

// Mock document files
const documentFiles = ref([
  {
    id: 1,
    name: 'Strategy-Pitch-Final.pptx',
    type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    size: 1024 * 1024 * 2.5 // 2.5MB
  }
]);

// Associated agents
const associatedAgents = ref([
  {
    id: 1,
    name: 'Pristia Candra',
    email: 'lincoln@ripixel.com',
    avatar: '/img/avatars/pristia.jpg',
    experience: '3y experiences'
  }
]);

// Available agents for selection
const availableAgents = ref([
  {
    id: 1,
    name: 'Pristia Candra',
    email: 'lincoln@ripixel.com',
    avatar: '/img/avatars/pristia.jpg',
    experience: '3y experiences'
  },
  {
    id: 2,
    name: 'John Smith',
    email: 'john.smith@realestate.com',
    avatar: '/img/avatars/john.jpg',
    experience: '5y experiences'
  },
  {
    id: 3,
    name: 'Sarah Johnson',
    email: 'sarah.j@properties.com',
    avatar: '/img/avatars/sarah.jpg',
    experience: '7y experiences'
  }
]);

// Filter agents based on search query
const filteredAgents = computed(() => {
  const query = agentSearchQuery.value.toLowerCase();
  return availableAgents.value.filter(agent =>
    agent.name.toLowerCase().includes(query) ||
    agent.email.toLowerCase().includes(query)
  );
});

onMounted(() => {
  // Simulate API call to fetch document by ID
  setTimeout(() => {
    document.value = { ...mockDocument };
    isLoading.value = false;
    addNotification('Document loaded successfully', 'success');
  }, 500);
});

const addNotification = (message, type = 'success') => {
  const id = notificationId.value++;
  notifications.value.push({
    id,
    message,
    type,
    timestamp: Date.now()
  });

  setTimeout(() => {
    removeNotification(id);
  }, 5000);
};

const removeNotification = (id) => {
  const index = notifications.value.findIndex(n => n.id === id);
  if (index !== -1) {
    notifications.value.splice(index, 1);
  }
};

const triggerFileInput = () => {
  fileInput.value.click();
};

const handleFileSelect = (event) => {
  const files = Array.from(event.target.files);
  files.forEach(file => {
    documentFiles.value.push({
      id: Date.now() + Math.random().toString(36).substring(2, 9),
      name: file.name,
      type: file.type,
      size: file.size
    });
    addNotification(`File "${file.name}" added successfully`, 'success');
  });
};

const deleteFile = (index) => {
  const fileName = documentFiles.value[index].name;
  documentFiles.value.splice(index, 1);
  addNotification(`File "${fileName}" removed`, 'success');
};

const editFile = (file) => {
  // Placeholder for file editing functionality
  addNotification(`Editing file "${file.name}"`, 'info');
};

const removeAgent = (index) => {
  const agentName = associatedAgents.value[index].name;
  associatedAgents.value.splice(index, 1);
  addNotification(`Agent "${agentName}" removed`, 'success');
};

const isAgentSelected = (agent) => {
  return associatedAgents.value.some(a => a.id === agent.id);
};

const selectAgent = (agent) => {
  if (!isAgentSelected(agent)) {
    associatedAgents.value.push(agent);
    addNotification(`Agent "${agent.name}" added`, 'success');
  } else {
    const index = associatedAgents.value.findIndex(a => a.id === agent.id);
    removeAgent(index);
  }
  showAgentModal.value = false;
};

const saveDocument = () => {
  showConfirmModal.value = true;
};

const confirmSave = () => {
  // Simulate API call to save document
  isLoading.value = true;
  addNotification('Saving document...', 'info');

  setTimeout(() => {
    isLoading.value = false;
    addNotification('Document saved successfully', 'success');

    // Navigate back to documents list
    setTimeout(() => {
    router.push('/profile/documents');
    }, 1000);
  }, 500);

  showConfirmModal.value = false;
};

const navigateBack = () => {
  router.push('/profile/documents');
};
</script>

<style scoped>
.document-edit-container {
  padding: 32px;
  background-color: #F3F4F6;
  min-height: calc(100vh - 64px);
}

.page-header {
  margin-bottom: 24px;
}

.header-title {
  font-size: 20px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 8px;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
}

.breadcrumb-link {
  color: #2563EB;
  text-decoration: none;
  font-size: 14px;
}

.breadcrumb-separator {
  color: #6B7280;
  font-size: 14px;
}

.breadcrumb-current {
  color: #6B7280;
  font-size: 14px;
}

.content-layout {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 24px;
  margin-bottom: 24px;
}

.loading-indicator, .error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 0;
  text-align: center;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin: 24px 0;
}

.error-state h3 {
  font-size: 16px;
  font-weight: 500;
  margin: 0 0 8px;
  color: #111827;
}

.error-state p {
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 24px;
}

.main-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.upload-container {
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.upload-area {
  border: 2px dashed #D1D5DB;
  border-radius: 8px;
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.upload-icon {
  color: #6B7280;
  margin-bottom: 8px;
}

.upload-text {
  font-size: 14px;
  color: #4B5563;
  text-align: center;
}

.browse-link {
  color: #2563EB;
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  text-decoration: underline;
}

.upload-formats {
  font-size: 12px;
  color: #9CA3AF;
  margin-top: 4px;
}

.edit-section {
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.edit-title {
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 4px 0;
}

.edit-subtitle {
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 24px;
}

.edit-form {
  margin-bottom: 24px;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
}

.form-control {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  font-size: 14px;
  color: #111827;
  background: white;
}

.form-control:focus {
  border-color: #2563EB;
  outline: none;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
}

.description-control {
  resize: vertical;
  min-height: 100px;
}

.files-list {
  margin-top: 24px;
}

.file-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-radius: 6px;
  background: white;
  margin-bottom: 8px;
  border: 1px solid #E5E7EB;
}

.file-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin-right: 12px;
}

.file-icon {
  color: #6B7280;
}

.file-name {
  flex: 1;
  font-size: 14px;
  color: #111827;
}

.file-actions {
  display: flex;
  gap: 8px;
}

.file-edit-btn, .file-delete-btn {
  background: none;
  border: none;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 4px;
}

.file-edit-btn:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.file-delete-btn {
  color: #EF4444;
}

.file-delete-btn:hover {
  background-color: rgba(239, 68, 68, 0.1);
}

.sidebar {
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.agents-title {
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 16px 0;
}

.agents-list {
  margin-bottom: 16px;
}

.agent-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  background: #F9FAFB;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  margin-bottom: 8px;
}

.agent-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.agent-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.agent-details {
  display: flex;
  flex-direction: column;
}

.agent-name {
  font-size: 14px;
  font-weight: 500;
  color: #111827;
}

.agent-email {
  font-size: 12px;
  color: #6B7280;
}

.agent-experience {
  font-size: 12px;
  color: #6B7280;
}

.agent-remove-btn {
  background: none;
  border: none;
  color: #EF4444;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
}

.agent-remove-btn:hover {
  background-color: rgba(239, 68, 68, 0.1);
}

.add-agent-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px;
  background: #F9FAFB;
  border: 1px dashed #D1D5DB;
  border-radius: 6px;
  color: #374151;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.add-agent-btn:hover {
  background: #F3F4F6;
  border-color: #9CA3AF;
}

.add-agent-icon {
  font-size: 18px;
  font-weight: 600;
  line-height: 1;
}

.page-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 12px;
}

.exit-btn {
  padding: 10px 20px;
  background: #F9FAFB;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  color: #374151;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.exit-btn:hover {
  background: #F3F4F6;
}

.save-btn {
  padding: 10px 20px;
  background: #2563EB;
  border: none;
  border-radius: 6px;
  color: white;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.save-btn:hover {
  background: #1D4ED8;
}

.hidden {
  display: none;
}

.notifications-container {
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 50;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.notification {
  padding: 12px 16px;
  background: white;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 300px;
}

.notification.success {
  border-left: 4px solid #10B981;
}

.notification.error {
  border-left: 4px solid #EF4444;
}

.notification.info {
  border-left: 4px solid #3B82F6;
}

.notification-message {
  font-size: 14px;
  color: #374151;
}

.notification-close {
  margin-left: auto;
  background: none;
  border: none;
  color: #6B7280;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
}

.notification-close:hover {
  background: #F3F4F6;
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
  z-index: 100;
}

.modal-container {
  background: white;
  border-radius: 8px;
  width: 400px;
  max-width: 90vw;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.modal-header {
  padding: 16px 24px;
  border-bottom: 1px solid #E5E7EB;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.modal-close {
  background: none;
  border: none;
  color: #6B7280;
  font-size: 20px;
  cursor: pointer;
}

.modal-body {
  padding: 24px;
  max-height: 50vh;
  overflow-y: auto;
}

.search-box {
  margin-bottom: 16px;
}

.agent-select-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.agent-select-item {
  display: flex;
  align-items: center;
  padding: 12px;
  gap: 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.agent-select-item:hover {
  background: #F3F4F6;
}

.agent-select-item.selected {
  background: #EFF6FF;
  border: 1px solid #BFDBFE;
}

.modal-footer {
  padding: 16px 24px;
  border-top: 1px solid #E5E7EB;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.cancel-modal-btn {
  padding: 8px 16px;
  background: white;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  color: #4B5563;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.cancel-modal-btn:hover {
  background: #F3F4F6;
}

.confirm-modal-btn {
  padding: 8px 16px;
  background: #2563EB;
  border: none;
  border-radius: 6px;
  color: white;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.confirm-modal-btn:hover {
  background: #1D4ED8;
}

@media (max-width: 768px) {
  .document-edit-container {
    padding: 16px;
  }

  .content-layout {
    grid-template-columns: 1fr;
  }

  .page-header {
    margin-bottom: 16px;
  }
}
</style>
