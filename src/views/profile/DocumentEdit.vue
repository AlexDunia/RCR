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
    <div class="document-edit-header">
      <div class="breadcrumb">
        <button class="back-btn" @click="router.push('/profile/documents')">
          <span>←</span>
        </button>
        <div class="breadcrumb-content">
          <h2>
            {{ document.title || 'New Document' }}
            <span class="document-type-badge" :class="document.type">
              {{ document.type === 'mls' ? 'MLS' : document.type.replace('-', ' ').toUpperCase() }}
            </span>
          </h2>
          <div class="breadcrumb-links">
            <router-link to="/profile/documents">Documents</router-link>
            <span class="breadcrumb-separator">/</span>
            <span>{{ documentId ? 'Edit' : 'New' }} Document</span>
          </div>
        </div>
      </div>

      <!-- Document type tabs -->
      <div class="document-tabs">
        <button
          v-for="tab in tabs"
          :key="tab.name"
          class="tab-button"
          :class="{ active: activeTab === tab.name }"
          @click="activeTab = tab.name"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>

    <!-- Main content -->
    <div class="document-edit-content">
      <div class="edit-section">
        <!-- Document Details Tab -->
        <div v-show="activeTab === 'details'" class="tab-content">
          <div class="form-section">
            <h3>Document Information</h3>
            <div class="form-fields">
              <div v-for="field in documentFields" :key="field.name" class="form-group">
                <label :for="field.name">
                  {{ field.label }}
                  <span v-if="field.required" class="required">*</span>
                </label>
                
                <template v-if="field.type === 'textarea'">
                  <textarea
                    :id="field.name"
                    v-model="document[field.name]"
                    :placeholder="field.label"
                    class="form-control"
                    :class="{ 'error': formErrors[field.name] }"
                    rows="4"
                  ></textarea>
                </template>
                <template v-else>
                  <input
                    :id="field.name"
                    v-model="document[field.name]"
                    :type="field.type"
                    :step="field.step"
                    :placeholder="field.label"
                    class="form-control"
                    :class="{ 'error': formErrors[field.name] }"
                  >
                </template>
                <span v-if="formErrors[field.name]" class="error-message">
                  {{ formErrors[field.name] }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Files Tab -->
        <div v-show="activeTab === 'files'" class="tab-content">
          <div class="upload-section">
            <div 
              class="upload-area" 
              @drop.prevent="handleFileDrop" 
              @dragover.prevent
              @dragenter.prevent
            >
              <input
                type="file"
                ref="fileInput"
                @change="handleFileSelect"
                multiple
                accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
                class="hidden"
              >
              <div class="upload-placeholder" v-if="!uploadedFiles.length">
                <div class="upload-icon">
                  <span>📄</span>
                </div>
                <div class="upload-text">
                  <p>Drag and drop your files here or <button @click="triggerFileInput" class="browse-link">browse</button></p>
                  <p class="upload-formats">Supported formats: PDF, DOC, XLS, Images</p>
                </div>
              </div>
              <div v-else class="file-list">
                <div v-for="(file, index) in uploadedFiles" :key="index" class="file-item">
                  <div class="file-preview">
                    <img v-if="file.isImage" :src="file.preview" :alt="file.name">
                    <span v-else class="file-icon">📄</span>
                  </div>
                  <div class="file-info">
                    <span class="file-name">{{ file.name }}</span>
                    <span class="file-size">{{ formatFileSize(file.size) }}</span>
                  </div>
                  <div class="file-actions">
                    <button @click="removeFile(index)" class="file-action-btn delete-btn">
                      <span>×</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Agents Tab -->
        <div v-show="activeTab === 'agents'" class="tab-content">
          <div class="agents-section">
            <h3>Associated Agents</h3>
            <div class="agents-list">
              <div v-if="document.associatedAgents && document.associatedAgents.length > 0">
                <div v-for="agent in document.associatedAgents" :key="agent.email" class="agent-item">
                  <img :src="agent.avatar" :alt="agent.name" class="agent-avatar">
                  <div class="agent-info">
                    <span class="agent-name">{{ agent.name }}</span>
                    <span class="agent-email">{{ agent.email }}</span>
                  </div>
                  <button @click="removeAgent(agent)" class="agent-remove-btn">×</button>
                </div>
              </div>
              <div v-else class="empty-state">
                No agents associated with this document yet.
              </div>
            </div>
            <button @click="showAddAgentModal = true" class="add-agent-btn">
              <span>+</span> Add Agent
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="document-edit-footer">
      <button class="btn-secondary" @click="router.push('/profile/documents')">Cancel</button>
      <button class="btn-primary" @click="saveDocument">Save Document</button>
    </div>

    <!-- Add Agent Modal -->
    <div v-if="showAddAgentModal" class="modal-overlay">
      <div class="modal-container">
        <div class="modal-header">
          <h3>Add Agent</h3>
          <button @click="showAddAgentModal = false" class="modal-close">×</button>
        </div>
        <div class="modal-body">
          <div class="search-box">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Search agents..."
              class="search-input"
            >
          </div>
          <div class="agent-options">
            <div
              v-for="agent in filteredAgents"
              :key="agent.email"
              class="agent-option"
              @click="selectAgent(agent)"
            >
              <img :src="agent.avatar" :alt="agent.name" class="agent-avatar">
              <div class="agent-info">
                <span class="agent-name">{{ agent.name }}</span>
                <span class="agent-email">{{ agent.email }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useDocumentStore } from '@/stores/documents';

const route = useRoute();
const router = useRouter();
const documentStore = useDocumentStore();
const documentId = route.params.id;
const fileInput = ref(null);
const uploadedFiles = ref([]);
const showAddAgentModal = ref(false);
const activeTab = ref('details');
const searchQuery = ref('');

// Navigation tabs
const tabs = [
  { name: 'details', label: 'Document Details' },
  { name: 'files', label: 'Files' },
  { name: 'agents', label: 'Associated Agents' }
];

// Initialize document with default values
const document = ref({
  id: documentId || '',
  type: route.query.type || 'buyer-rep',
  title: '',
  description: '',
  fileName: '',
  createdAt: new Date().toISOString(),
  clientName: '',
  // Buyer Rep specific fields
  buyerName: '',
  propertyInterest: '',
  agreementDate: '',
  commission: '',
  // Seller Rep specific fields
  sellerName: '',
  propertyAddress: '',
  listingPrice: '',
  listingDate: '',
  // MLS specific fields
  mlsNumber: '',
  price: '',
  bedrooms: '',
  bathrooms: '',
  squareFeet: '',
  associatedAgents: []
});

// Add notification system
const notifications = ref([]);
const notificationId = ref(0);

const addNotification = (message, type = 'success') => {
  const id = notificationId.value++;
  notifications.value.push({
    id,
    message,
    type,
    timestamp: Date.now()
  });

  // Auto remove after 5 seconds
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

// Sample agent options
const agentOptions = ref([
  {
    name: 'Daniel Peters',
    email: 'daniel.peters@realestate.com',
    avatar: 'https://i.pravatar.cc/150?img=2'
  },
  {
    name: 'Sarah Johnson',
    email: 'sarah.j@realestate.com',
    avatar: 'https://i.pravatar.cc/150?img=3'
  },
  {
    name: 'Michael Chang',
    email: 'michael.chang@realestate.com',
    avatar: 'https://i.pravatar.cc/150?img=4'
  }
]);

// Computed property for document fields based on type
const documentFields = computed(() => {
  const type = document.value.type;
  
  const commonFields = [
    { name: 'title', label: 'Document Title', type: 'text', required: true },
    { name: 'description', label: 'Description', type: 'textarea', required: false },
    { name: 'clientName', label: 'Client Name', type: 'text', required: true }
  ];

  const typeSpecificFields = {
    'buyer-rep': [
      { name: 'buyerName', label: 'Buyer Name', type: 'text', required: true },
      { name: 'propertyInterest', label: 'Property of Interest', type: 'text', required: true },
      { name: 'agreementDate', label: 'Agreement Date', type: 'date', required: true },
      { name: 'commission', label: 'Commission Rate (%)', type: 'number', step: '0.1', required: true }
    ],
    'seller-rep': [
      { name: 'sellerName', label: 'Seller Name', type: 'text', required: true },
      { name: 'propertyAddress', label: 'Property Address', type: 'text', required: true },
      { name: 'listingPrice', label: 'Listing Price ($)', type: 'number', step: '1000', required: true },
      { name: 'listingDate', label: 'Listing Date', type: 'date', required: true }
    ],
    'mls': [
      { name: 'propertyAddress', label: 'Property Address', type: 'text', required: true },
      { name: 'mlsNumber', label: 'MLS Number', type: 'text', required: true },
      { name: 'price', label: 'Price ($)', type: 'number', step: '1000', required: true },
      { name: 'bedrooms', label: 'Bedrooms', type: 'number', step: '1', required: true },
      { name: 'bathrooms', label: 'Bathrooms', type: 'number', step: '0.5', required: true },
      { name: 'squareFeet', label: 'Square Feet', type: 'number', step: '1', required: true }
    ]
  };

  return [...commonFields, ...(typeSpecificFields[type] || [])];
});

// Load document data if editing existing document
onMounted(() => {
  // Add a notification to show the component is loading
  addNotification('Loading document editor...', 'success');
  
  if (documentId) {
    try {
      // Try to get document from store
      const existingDoc = documentStore.getDocument(documentId);
      
      if (existingDoc) {
        // If document exists in store, use it
        document.value = { ...existingDoc };
        addNotification('Document loaded successfully', 'success');
      } else {
        // If not in store, use sample data
        document.value = {
          ...document.value,
          title: 'Sample Document',
          description: 'This is a sample document description',
          clientName: 'John Doe',
          // Add type-specific sample data
          ...(document.value.type === 'buyer-rep' ? {
            buyerName: 'John Doe',
            propertyInterest: '123 Main St',
            agreementDate: '2024-03-14',
            commission: '2.5'
          } : document.value.type === 'seller-rep' ? {
            sellerName: 'Jane Smith',
            propertyAddress: '456 Oak Ave',
            listingPrice: '500000',
            listingDate: '2024-03-14'
          } : {
            propertyAddress: '789 Pine St',
            mlsNumber: 'MLS123456',
            price: '750000',
            bedrooms: '4',
            bathrooms: '2.5',
            squareFeet: '2500'
          })
        };
        addNotification('Using sample document data', 'warning');
      }
    } catch (error) {
      console.error('Error loading document:', error);
      addNotification('Error loading document: ' + error.message, 'error');
    }
  } else {
    // Creating a new document
    addNotification('Creating a new document', 'info');
  }
});

// File handling functions
const triggerFileInput = () => {
  fileInput.value.click();
};

const handleFileSelect = (event) => {
  const files = Array.from(event.target.files);
  files.forEach(handleFile);
};

const handleFileDrop = (event) => {
  const files = Array.from(event.dataTransfer.files);
  files.forEach(handleFile);
};

const handleFile = (file) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    const fileData = {
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      isImage: file.type.startsWith('image/'),
      preview: e.target.result,
      uploadedAt: new Date().toISOString()
    };

    uploadedFiles.value.push(fileData);
    addNotification(`File "${file.name}" added to form`);

    // Update document fileName if it's the first file
    if (uploadedFiles.value.length === 1) {
      document.value.fileName = file.name;
    }
  };
  reader.readAsDataURL(file);
};

const removeFile = (index) => {
  const file = uploadedFiles.value[index];
  uploadedFiles.value.splice(index, 1);
  addNotification(`File "${file.name}" removed from form`, 'warning');

  if (uploadedFiles.value.length === 0) {
    document.value.fileName = '';
  } else {
    document.value.fileName = uploadedFiles.value[0].name;
  }
};

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Filtered agents based on search query
const filteredAgents = computed(() => {
  const query = searchQuery.value.toLowerCase();
  if (!query) return agentOptions.value;

  return agentOptions.value.filter(agent =>
    agent.name.toLowerCase().includes(query) ||
    agent.email.toLowerCase().includes(query)
  );
});

// Agent management functions
const selectAgent = (agent) => {
  if (!document.value.associatedAgents.some(a => a.email === agent.email)) {
    document.value.associatedAgents.push(agent);
    addNotification(`Added agent ${agent.name}`, 'success');
  }
  showAddAgentModal.value = false;
};

const removeAgent = (agent) => {
  const index = document.value.associatedAgents.findIndex(a => a.email === agent.email);
  if (index !== -1) {
    document.value.associatedAgents.splice(index, 1);
    addNotification(`Removed agent ${agent.name}`, 'warning');
  }
};

// Form validation
const formErrors = ref({});
const validateForm = () => {
  const errors = {};
  documentFields.value.forEach(field => {
    if (field.required && !document.value[field.name]) {
      errors[field.name] = `${field.label} is required`;
    }
  });
  formErrors.value = errors;
  return Object.keys(errors).length === 0;
};

// Enhanced save function
const saveDocument = async () => {
  if (!validateForm()) {
    addNotification('Please fill in all required fields', 'error');
    return;
  }

  try {
    // Save document to store based on type
    let savedDoc;
    if (documentId) {
      // Update existing document
      savedDoc = documentStore.updateDocument(document.value);
    } else {
      // Create new document based on type
      if (document.value.type === 'buyer-rep') {
        savedDoc = documentStore.saveBuyerRepDocument(document.value);
      } else if (document.value.type === 'seller-rep') {
        savedDoc = documentStore.saveSellerRepDocument(document.value);
      } else {
        savedDoc = documentStore.saveMLSDocument(document.value);
      }
    }

    if (savedDoc) {
      addNotification('Document saved successfully', 'success');
      // Navigate back to documents page
      router.push('/profile/documents');
    } else {
      throw new Error('Failed to save document');
    }
  } catch (error) {
    console.error('Error saving document:', error);
    addNotification('Error saving document: ' + error.message, 'error');
  }
};
</script>

<style scoped>
.document-edit-container {
  min-height: 100vh;
  background-color: #f9fafb;
  padding: 24px 32px;
  display: flex;
  flex-direction: column;
}

.document-edit-header {
  margin-bottom: 24px;
}

.breadcrumb h2 {
  font-size: 24px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 8px 0;
}

.breadcrumb-links {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #6b7280;
}

.breadcrumb-link {
  color: #2563eb;
  text-decoration: none;
}

.breadcrumb-separator {
  margin: 0 8px;
}

.breadcrumb-current {
  color: #6b7280;
}

.document-edit-content {
  display: flex;
  gap: 24px;
  flex: 1;
}

.edit-section {
  flex: 1;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.upload-section {
  padding: 24px;
  border-bottom: 1px solid #e5e7eb;
}

.upload-area {
  border: 2px dashed #d1d5db;
  border-radius: 8px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 16px;
}

.upload-icon {
  color: #6b7280;
  background-color: #f3f4f6;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.upload-text p {
  margin: 0;
  color: #4b5563;
  font-size: 14px;
}

.upload-formats {
  margin-top: 4px !important;
  color: #9ca3af !important;
  font-size: 12px !important;
}

.browse-link {
  color: #2563eb;
  cursor: pointer;
}

.edit-form {
  padding: 24px;
}

.edit-form h3 {
  font-size: 20px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 8px 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.edit-form h3::before {
  content: '';
  width: 4px;
  height: 24px;
  background-color: #2563eb;
  border-radius: 2px;
  margin-right: 8px;
}

.edit-description {
  color: #6b7280;
  font-size: 14px;
  margin: 0 0 24px 0;
}

.form-fields {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.form-group {
  margin-bottom: 0;
}

.form-group label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
}

.form-control {
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  transition: all 0.2s;
}

.form-control:hover {
  border-color: #d1d5db;
}

.form-control:focus {
  background-color: white;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.form-control::placeholder {
  color: #9ca3af;
}

textarea.form-control {
  resize: vertical;
  min-height: 100px;
}

.attached-files {
  margin-top: 24px;
}

.file-item {
  display: flex;
  align-items: center;
  padding: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background-color: #f9fafb;
}

.file-preview {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
}

.file-preview-image {
  max-width: 100px;
  max-height: 100px;
  object-fit: cover;
  border-radius: 4px;
}

.file-icon {
  color: #4b5563;
  margin-right: 12px;
}

.file-info {
  flex: 1;
}

.file-name {
  font-size: 14px;
  color: #111827;
}

.file-size {
  font-size: 12px;
  color: #6b7280;
}

.file-actions {
  display: flex;
  gap: 8px;
}

.file-action-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.file-action-btn.edit-btn {
  color: #2563eb;
}

.file-action-btn.delete-btn {
  color: #ef4444;
}

.file-action-btn:hover.edit-btn {
  background-color: rgba(37, 99, 235, 0.1);
}

.file-action-btn:hover.delete-btn {
  background-color: rgba(239, 68, 68, 0.1);
}

.sidebar {
  width: 320px;
  flex-shrink: 0;
}

.associated-agents {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 24px;
}

.associated-agents h3 {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 16px 0;
}

.agent-list {
  max-height: 200px;
  overflow-y: auto;
  margin-bottom: 16px;
}

.agent-item {
  display: flex;
  align-items: center;
  padding: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background-color: #f9fafb;
  margin-bottom: 8px;
}

.agent-item:last-child {
  margin-bottom: 0;
}

.agent-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 12px;
}

.agent-info {
  flex: 1;
}

.agent-name {
  font-size: 14px;
  font-weight: 500;
  color: #111827;
  margin: 0;
}

.agent-email {
  font-size: 12px;
  color: #6b7280;
  margin: 2px 0 0 0;
}

.agent-experience {
  font-size: 12px;
  color: #6b7280;
  margin: 0;
}

.add-agent-btn {
  width: 100%;
  padding: 10px;
  background-color: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  color: #4b5563;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s;
}

.add-agent-btn:hover {
  background-color: #e5e7eb;
}

.add-icon {
  font-size: 16px;
  font-weight: 600;
}

.document-edit-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #e5e7eb;
}

.btn-exit {
  padding: 10px 16px;
  background-color: white;
  border: 1px solid #e5e7eb;
  color: #4b5563;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-save {
  padding: 10px 16px;
  background-color: #2563eb;
  border: 1px solid #2563eb;
  color: white;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-exit:hover {
  background-color: #f3f4f6;
}

.btn-save:hover {
  background-color: #1d4ed8;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-container {
  background-color: white;
  border-radius: 8px;
  width: 500px;
  max-width: 90%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  z-index: 1001;
}

.modal-header {
  padding: 16px 24px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
  font-size: 18px;
  color: #111827;
  font-weight: 600;
}

.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #6b7280;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.close-btn:hover {
  background-color: #f3f4f6;
}

.modal-body {
  padding: 24px;
}

.modal-footer {
  padding: 16px 24px;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: flex-end;
}

.btn-done {
  padding: 8px 16px;
  background-color: #2563eb;
  border: 1px solid #2563eb;
  color: white;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-done:hover {
  background-color: #1d4ed8;
}

/* Dropdown Styles */
.dropdown-container {
  position: relative;
  width: 100%;
}

.dropdown {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  color: #111827;
  background-color: white;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dropdown-icon {
  color: #6b7280;
}

.dropdown-options {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 100%;
  background-color: white;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1002;
  max-height: 400px;
  overflow-y: auto;
}

.dropdown-tabs {
  display: flex;
  border-bottom: 1px solid #e5e7eb;
}

.tab-btn {
  flex: 1;
  padding: 12px;
  background: none;
  border: none;
  font-size: 14px;
  font-weight: 500;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s;
}

.tab-btn.active {
  color: #2563eb;
  border-bottom: 2px solid #2563eb;
}

.search-input {
  padding: 12px;
  border-bottom: 1px solid #e5e7eb;
}

.search-input input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
}

.agent-options {
  max-height: 250px;
  overflow-y: auto;
}

.agent-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid #e5e7eb;
  cursor: pointer;
  transition: background-color 0.2s;
}

.agent-option:hover {
  background-color: #f9fafb;
}

.agent-option-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.agent-option-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.agent-option-name {
  font-size: 14px;
  font-weight: 500;
  color: #111827;
  margin: 0;
}

.agent-option-email {
  font-size: 12px;
  color: #6b7280;
  margin: 2px 0 0 0;
}

.back-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #6b7280;
  padding: 8px;
  border-radius: 6px;
  margin-right: 16px;
  display: flex;
  align-items: center;
  transition: all 0.2s;
}

.back-btn:hover {
  background-color: #f3f4f6;
  color: #111827;
}

.for-client {
  color: #6b7280;
  font-weight: normal;
  font-size: 0.9em;
}

.profile-tabs {
  display: flex;
  gap: 24px;
  margin-top: 16px;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 8px;
}

.tab-link {
  text-decoration: none;
  color: #6b7280;
  font-size: 14px;
  font-weight: 500;
  padding: 8px 0;
  position: relative;
  transition: all 0.2s;
}

.tab-link:hover {
  color: #111827;
}

.tab-link.active {
  color: #2563eb;
}

.tab-link.active::after {
  content: '';
  position: absolute;
  bottom: -9px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #2563eb;
}

.upload-placeholder {
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
}

.file-preview {
  width: 60px;
  height: 60px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f3f4f6;
  border-radius: 6px;
  overflow: hidden;
}

.file-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.file-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.file-name {
  font-weight: 500;
  color: #111827;
}

.file-size {
  font-size: 12px;
  color: #6b7280;
}

.notifications-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 400px;
}

.notification {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-left: 4px solid;
}

.notification.success {
  border-left-color: #10b981;
}

.notification.warning {
  border-left-color: #f59e0b;
}

.notification.error {
  border-left-color: #ef4444;
}

.notification-message {
  font-size: 14px;
  color: #374151;
  margin-right: 12px;
}

.notification-close {
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  color: #6b7280;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s;
}

.notification-close:hover {
  background-color: #f3f4f6;
  color: #374151;
}

/* Notification animations */
.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.required {
  color: #ef4444;
  margin-left: 4px;
}

.form-control.error {
  border-color: #ef4444;
}

.error-message {
  color: #ef4444;
  font-size: 12px;
  margin-top: 4px;
  display: block;
}

.document-type-badge {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  margin-left: 12px;
  text-transform: uppercase;
}

.document-type-badge.buyer-rep {
  background-color: #dbeafe;
  color: #1e40af;
}

.document-type-badge.seller-rep {
  background-color: #dcfce7;
  color: #166534;
}

.document-type-badge.mls {
  background-color: #fef3c7;
  color: #92400e;
}

.breadcrumb-content {
  flex: 1;
}

.form-fields {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.form-group {
  margin-bottom: 0;
}

.form-control {
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  transition: all 0.2s;
}

.form-control:hover {
  border-color: #d1d5db;
}

.form-control:focus {
  background-color: white;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.file-list {
  display: grid;
  gap: 12px;
  margin-top: 16px;
}

/* Add missing styles */
.hidden {
  display: none;
}

.document-tabs {
  display: flex;
  gap: 16px;
  margin-top: 16px;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 8px;
}

.tab-button {
  background: none;
  border: none;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  color: #6b7280;
  cursor: pointer;
  position: relative;
  transition: all 0.2s;
}

.tab-button:hover {
  color: #111827;
}

.tab-button.active {
  color: #2563eb;
}

.tab-button.active::after {
  content: '';
  position: absolute;
  bottom: -9px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #2563eb;
}

.tab-content {
  padding: 24px;
}

.form-section {
  margin-bottom: 24px;
}

.form-section h3 {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 16px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #e5e7eb;
}

.agents-section {
  padding: 24px;
}

.agents-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
}

.agent-remove-btn {
  background: none;
  border: none;
  color: #ef4444;
  cursor: pointer;
  font-size: 16px;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.agent-remove-btn:hover {
  background-color: rgba(239, 68, 68, 0.1);
}

.modal-close {
  background: none;
  border: none;
  cursor: pointer;
  color: #6b7280;
  font-size: 20px;
  line-height: 1;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.modal-close:hover {
  background-color: #f3f4f6;
}

.search-box {
  margin-bottom: 16px;
}

.search-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
}

.btn-primary {
  padding: 10px 16px;
  background-color: #2563eb;
  border: 1px solid #2563eb;
  color: white;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary:hover {
  background-color: #1d4ed8;
}

.btn-secondary {
  padding: 10px 16px;
  background-color: white;
  border: 1px solid #e5e7eb;
  color: #4b5563;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-secondary:hover {
  background-color: #f3f4f6;
}

.empty-state {
  padding: 24px;
  text-align: center;
  color: #6b7280;
  background-color: #f9fafb;
  border: 1px dashed #d1d5db;
  border-radius: 6px;
}
</style>

