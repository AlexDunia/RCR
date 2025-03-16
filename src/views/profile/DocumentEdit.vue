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
      <div class="header-top">
        <button class="back-button" @click="handleBack">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M15.8337 10H4.16699M4.16699 10L10.0003 15.8333M4.16699 10L10.0003 4.16667" stroke="currentColor" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Back
        </button>
        <h1 class="page-title">Currently editing: {{ document.title || 'Legal documentation' }} for {{ getClientName() }}</h1>
      </div>
      <div class="breadcrumb">
        <router-link to="/profile/documents" class="breadcrumb-link">Documents</router-link>
        <span class="breadcrumb-separator">/</span>
        <span class="breadcrumb-current">{{ document.title || 'Legal documentation' }}</span>
      </div>
    </div>

    <!-- Main content -->
    <div class="content-layout">
      <!-- Left Section -->
      <div class="main-content">
        <!-- Upload Section -->
        <div class="upload-container">
          <div class="upload-area" @drop.prevent="handleFileDrop" @dragover.prevent>
            <div class="upload-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 12V19M12 12L15 15M12 12L9 15M20 16.7428C21.2215 15.734 22 14.2079 22 12.5C22 9.46243 19.5376 7 16.5 7C16.2815 7 16.0771 7.01349 15.8767 7.03857C14.9827 4.67583 12.6997 3 10 3C6.13401 3 3 6.13401 3 10C3 12.2501 4.07741 14.2509 5.75 15.4805" stroke="#6B7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="upload-text">
              Upload document by Dragging & dropping files or
              <button @click="triggerFileInput" class="browse-link">Browse</button>
            </div>
            <div class="upload-formats">
              Supported formats: PDF, DOC, XLS, PPT, JPG, PNG, GIF, TIFF, HEIC
            </div>
            <input
              type="file"
              ref="fileInput"
              @change="handleFileSelect"
              multiple
              accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.gif,.tiff,.heic"
              class="hidden"
            />
          </div>

          <!-- Existing and Uploaded Files -->
          <div class="files-section">
            <h3 class="section-title">Attached Files</h3>
            <div v-if="allFiles.length > 0" class="uploaded-files">
              <div v-for="(file, index) in allFiles" :key="index" class="file-item">
                <div class="file-info">
                  <svg v-if="isDocument(file.type)" class="file-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M7.5 9.16667H12.5M7.5 12.5H10.8333M6.66667 2.5H13.3333L17.5 6.66667V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H6.66667ZM13.3333 2.5V6.66667H17.5L13.3333 2.5Z" stroke="#6B7280" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <img v-else-if="isImage(file.type) && (file.preview || file.path)" :src="file.preview || file.path" class="file-preview" :alt="file.name" />
                  <svg v-else class="file-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M6.66667 2.5H13.3333L17.5 6.66667V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H6.66667Z" stroke="#6B7280" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <div class="file-details">
                    <span class="file-name">{{ file.name || 'Unnamed file' }}</span>
                    <span class="file-type">{{ file.type || 'Unknown type' }}</span>
                  </div>
                </div>
                <button @click="removeFile(index)" class="file-remove">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M13.3333 5L6.66667 11.6667M6.66667 5L13.3333 11.6667" stroke="#EF4444" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
            <div v-else class="no-files">
              No files attached yet
            </div>
          </div>

          <!-- File Content Display Section -->
          <div v-if="allFiles.length > 0" class="file-content-section">
            <h3 class="section-title">Document Contents</h3>
            <div v-for="(file, index) in allFiles" :key="index" class="file-content">
              <div class="file-header">
                <h4>{{ file.name || 'Unnamed file' }}</h4>
                <div class="file-actions">
                  <a v-if="file.path && file.path !== '#'" :href="file.path" target="_blank" class="file-action-btn view-btn">
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                      <path d="M10.0003 4.16667C5.83366 4.16667 2.27533 6.94751 0.833664 10.8333C2.27533 14.7192 5.83366 17.5 10.0003 17.5C14.167 17.5 17.7253 14.7192 19.167 10.8333C17.7253 6.94751 14.167 4.16667 10.0003 4.16667Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M10 14.1667C11.841 14.1667 13.3333 12.6743 13.3333 10.8333C13.3333 8.99238 11.841 7.5 10 7.5C8.15905 7.5 6.66667 8.99238 6.66667 10.8333C6.66667 12.6743 8.15905 14.1667 10 14.1667Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    View
                  </a>
                  <button @click="removeFile(index)" class="file-action-btn delete-btn">
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                      <path d="M13.3333 5L6.66667 11.6667M6.66667 5L13.3333 11.6667" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
              <div class="file-details">
                <span class="file-type">Type: {{ file.type || 'Unknown type' }}</span>
                <span class="file-size" v-if="file.size">Size: {{ formatFileSize(file.size) }}</span>
                <span v-if="file.path && file.path !== '#'" class="file-path">Path: {{ file.path }}</span>
              </div>
              <div v-if="isImage(file.type) && (file.content || file.preview || file.path)" class="image-preview">
                <img :src="file.content || file.preview || file.path" :alt="file.name || 'Image preview'" class="full-image" />
              </div>
              <div v-else-if="file.content" class="text-content">
                <pre>{{ file.content }}</pre>
              </div>
              <div v-else class="text-content">
                <pre>File content not available for preview</pre>
              </div>
            </div>
          </div>
        </div>

        <!-- Edit Form -->
        <div class="edit-section">
          <div class="section-header">
            <h2 class="section-title">Edit file</h2>
            <p class="section-description">Here you can edit your saved files and document</p>
          </div>

          <div class="form-list">
            <div v-for="field in documentFields" :key="field.name" class="form-group">
              <label :for="field.name" class="form-label">
                {{ field.label }}
                <span v-if="field.required" class="required">*</span>
              </label>

              <template v-if="field.type === 'textarea'">
                <textarea
                  :id="field.name"
                  v-model="document[field.name]"
                  :placeholder="field.placeholder"
                  class="form-control"
                  :class="{ 'error': formErrors[field.name] }"
                  rows="4"
                ></textarea>
              </template>
              <template v-else-if="field.type === 'select'">
                <select
                  :id="field.name"
                  v-model="document[field.name]"
                  class="form-control"
                  :class="{ 'error': formErrors[field.name] }"
                >
                  <option value="" disabled selected>Select {{ field.label.toLowerCase() }}</option>
                  <option v-for="option in field.options" :key="option" :value="option">
                    {{ option }}
                  </option>
                </select>
              </template>
              <template v-else>
                <div class="input-wrapper">
                  <input
                    :id="field.name"
                    v-model="document[field.name]"
                    :type="field.type"
                    :placeholder="field.placeholder"
                    class="form-control"
                    :class="{ 'error': formErrors[field.name] }"
                  >
                </div>
              </template>
              <span v-if="formErrors[field.name]" class="error-message">
                {{ formErrors[field.name] }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Sidebar -->
      <div class="sidebar">
        <div class="agents-section">
          <h3 class="agents-title">Associated agents</h3>
          <div v-if="document.associatedAgents?.length" class="agents-list">
            <div v-for="agent in document.associatedAgents" :key="agent.id" class="agent-card">
              <div class="agent-info">
                <img :src="agent.avatar" :alt="agent.name" class="agent-avatar">
                <div class="agent-details">
                  <span class="agent-name">{{ agent.name }}</span>
                  <span class="agent-email">{{ agent.email }}</span>
                </div>
              </div>
              <button @click="removeAgent(agent.id)" class="remove-agent">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M13.3333 5L6.66667 11.6667M6.66667 5L13.3333 11.6667" stroke="#EF4444" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
          <button class="add-agent-button" @click="showAgentModal = true">
            <span class="plus-icon">+</span>
            Add agent
          </button>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="page-footer">
      <button class="btn-secondary" @click="handleBack">Exit</button>
      <button class="btn-primary" @click="handleSave">Save</button>
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
          <button class="btn-secondary" @click="showConfirmModal = false">No</button>
          <button class="btn-primary" @click="confirmSave">Yes</button>
        </div>
      </div>
    </div>

    <!-- Agent Modal -->
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
            >
          </div>
          <div class="agent-list">
            <div
              v-for="agent in filteredAgents"
              :key="agent.id"
              class="agent-item"
              :class="{ 'selected': document.associatedAgents?.some(a => a.id === agent.id) }"
              @click="handleAgentSelect(agent)"
            >
              <img :src="agent.avatar" :alt="agent.name" class="agent-avatar">
              <div class="agent-details">
                <span class="agent-name">{{ agent.name }}</span>
                <span class="agent-experience">{{ agent.experience }}</span>
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
const showConfirmModal = ref(false);
const fileInput = ref(null);
const uploadedFiles = ref([]); // New uploads during this session
const existingFiles = ref([]); // Files loaded from existing document
const isLoading = ref(true); // Add isLoading ref

// Combined files for display
const allFiles = computed(() => [...existingFiles.value, ...uploadedFiles.value]);

const document = ref({
  id: documentId || '',
  type: route.query.type || 'buyer-rep',
  title: '',
  description: '',
  associatedAgents: [],
  files: [],
  buyerName: '',
  buyerEmail: '',
  phoneNumber: '',
  propertyType: '',
  budgetRange: '',
  additionalNotes: '',
  sellerName: '',
  sellerEmail: '',
  propertyAddress: '',
  listingPrice: '',
  squareFootage: '',
  bedrooms: '',
  bathrooms: '',
  propertyDescription: ''
});

const showAgentModal = ref(false);
const agentSearchQuery = ref('');

const allAgents = ref([
  { id: 1, name: 'John Doe', email: 'john@example.com', avatar: '/avatars/john.jpg', experience: '5 years' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', avatar: '/avatars/jane.jpg', experience: '8 years' },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com', avatar: '/avatars/mike.jpg', experience: '3 years' },
]);

const filteredAgents = computed(() => {
  const query = agentSearchQuery.value.toLowerCase();
  return allAgents.value.filter(agent =>
    agent.name.toLowerCase().includes(query) ||
    agent.email.toLowerCase().includes(query)
  );
});

const handleAgentSelect = (agent) => {
  if (!document.value.associatedAgents) {
    document.value.associatedAgents = [];
  }
  if (!document.value.associatedAgents.some(a => a.id === agent.id)) {
    document.value.associatedAgents.push(agent);
  }
  showAgentModal.value = false;
  agentSearchQuery.value = '';
};

const removeAgent = (agentId) => {
  document.value.associatedAgents = document.value.associatedAgents.filter(a => a.id !== agentId);
};

const getClientName = () => {
  if (document.value.type === 'buyer-rep') {
    return document.value.buyerName || 'Buyer';
  } else if (document.value.type === 'seller-rep') {
    return document.value.sellerName || 'Seller';
  } else {
    return document.value.title || 'Client';
  }
};

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

const handleFile = async (file) => {
  try {
    const fileObject = {
      name: file.name,
      type: file.type,
      size: file.size,
      content: null,
      preview: null,
      path: URL.createObjectURL(file),
      file: file
    };

    if (isImage(file.type)) {
      fileObject.preview = URL.createObjectURL(file);
      fileObject.content = await readFileAsDataURL(file);
    } else if (isDocument(file.type)) {
      if (file.type === 'application/pdf') {
        fileObject.content = await readPDFContent(file);
      } else {
        fileObject.content = await readFileAsText(file);
      }
    }

    uploadedFiles.value.push(fileObject);
    addNotification(`File "${file.name}" added successfully`, 'success');
  } catch (error) {
    addNotification(`Error reading file ${file.name}: ${error.message}`, 'error');
  }
};

const removeFile = (index) => {
  console.log('Removing file at index:', index);
  console.log('Current files:', { existingFiles: existingFiles.value, uploadedFiles: uploadedFiles.value });

  if (index < existingFiles.value.length) {
    // Removing from existing files
    existingFiles.value.splice(index, 1);

    // Also update the document's files array if it exists
    if (document.value.files && Array.isArray(document.value.files)) {
    document.value.files.splice(index, 1);
    }

    addNotification('Existing file removed', 'success');
  } else {
    // Removing from newly uploaded files
    const uploadedIndex = index - existingFiles.value.length;
    uploadedFiles.value.splice(uploadedIndex, 1);
    addNotification('Uploaded file removed', 'success');
  }

  console.log('Files after removal:', { existingFiles: existingFiles.value, uploadedFiles: uploadedFiles.value });
};

const isDocument = (type) => {
  if (!type) return false;
  return type.includes('pdf') ||
         type.includes('doc') ||
         type.includes('xls') ||
         type.includes('ppt');
};

const isImage = (type) => {
  if (!type) return false;
  return type.includes('image/');
};

const readFileAsText = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsText(file);
  });
};

const readFileAsDataURL = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const readPDFContent = async (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve('PDF content preview (requires pdf.js for full text)');
    reader.readAsArrayBuffer(file);
  });
};

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

const documentFields = computed(() => {
  const type = document.value.type;

  const commonFields = [
    { name: 'title', label: 'Document Title', type: 'text', required: true },
    { name: 'description', label: 'Description', type: 'textarea', required: false }
  ];

  const typeSpecificFields = {
    'buyer-rep': [
      { name: 'buyerName', label: 'Buyer name', type: 'text', required: true, placeholder: "Enter buyer's full name" },
      { name: 'buyerEmail', label: 'Buyer Email', type: 'email', required: true, placeholder: 'johndoe@gmail.com' },
      { name: 'phoneNumber', label: 'Phone Number', type: 'tel', required: true, placeholder: '555-123-4567' },
      {
        name: 'propertyType',
        label: 'Property Type',
        type: 'select',
        required: true,
        options: [
          'Single Family Home',
          'Condo',
          'Townhouse',
          'Multi-Family',
          'Land',
          'Commercial'
        ]
      },
      { name: 'budgetRange', label: 'Budget Range', type: 'text', required: true, placeholder: '$200,000-$500,000' },
      { name: 'additionalNotes', label: 'Additional Notes/Requirements', type: 'textarea', required: false, placeholder: 'Any specific requirements?' }
    ],
    'seller-rep': [
      { name: 'sellerName', label: 'Seller name', type: 'text', required: true, placeholder: "Enter seller's full name" },
      { name: 'sellerEmail', label: 'Seller Email', type: 'email', required: true, placeholder: 'johndoe@gmail.com' },
      { name: 'phoneNumber', label: 'Phone Number', type: 'tel', required: true, placeholder: '555-123-4567' },
      {
        name: 'propertyType',
        label: 'Property Type',
        type: 'select',
        required: true,
        options: [
          'Single Family Home',
          'Condo',
          'Townhouse',
          'Multi-Family',
          'Land',
          'Commercial'
        ]
      },
      { name: 'propertyAddress', label: 'Property Address', type: 'text', required: true, placeholder: 'e.g., 123 Main St, City, State, ZIP' },
      { name: 'listingPrice', label: 'Desired Listing Price', type: 'text', required: true, placeholder: 'e.g., $500,000' },
      { name: 'additionalNotes', label: 'Additional Notes/Requirements', type: 'textarea', required: false, placeholder: 'Any specific requirements or details about the property?' }
    ],
    'mls': [
      { name: 'propertyAddress', label: 'Property Address', type: 'text', required: true, placeholder: 'e.g., 123 Main St, City, State, ZIP' },
      { name: 'listingPrice', label: 'Listing Price', type: 'text', required: true, placeholder: 'e.g., $500,000' },
      { name: 'bedrooms', label: 'Bedrooms', type: 'number', required: true, placeholder: 'e.g., 3' },
      { name: 'bathrooms', label: 'Bathrooms', type: 'number', required: true, placeholder: 'e.g., 2' },
      { name: 'squareFootage', label: 'Square Footage', type: 'text', required: true, placeholder: 'e.g., 2,000 sq ft' },
      { name: 'propertyDescription', label: 'Property Description', type: 'textarea', required: true, placeholder: 'Describe the property features and amenities' }
    ]
  };

  return [...commonFields, ...(typeSpecificFields[type] || [])];
});

onMounted(async () => {
  addNotification('Loading document...', 'info');

  if (documentId) {
    try {
      // Get document from store
      const existingDoc = documentStore.getDocument(documentId);

      if (existingDoc) {
        // Log document data for debugging
        console.log('Loaded document:', existingDoc);

        // Assign document data
        document.value = { ...existingDoc };

        // Process existing files to ensure they have paths and are properly loaded
        if (existingDoc.files && existingDoc.files.length > 0) {
          console.log('Document has files:', existingDoc.files);

          existingFiles.value = existingDoc.files.map(file => {
            // Create a proper file object with all necessary properties
            const fileObj = { ...file };

            // Ensure path exists - use preview or create a placeholder
            if (!fileObj.path && fileObj.preview) {
              fileObj.path = fileObj.preview;
            } else if (!fileObj.path) {
              // If no path or preview, create a placeholder for display purposes
              fileObj.path = '#';
            }

            // Ensure type is set
            if (!fileObj.type) {
              // Try to determine type from name or set a default
              const ext = fileObj.name?.split('.').pop()?.toLowerCase();
              if (ext === 'pdf') fileObj.type = 'application/pdf';
              else if (['jpg', 'jpeg', 'png', 'gif'].includes(ext)) fileObj.type = `image/${ext}`;
              else if (['doc', 'docx'].includes(ext)) fileObj.type = 'application/msword';
              else fileObj.type = 'application/octet-stream';
            }

            return fileObj;
          });

          console.log('Processed files:', existingFiles.value);
        } else {
          console.log('No files found in document');
          existingFiles.value = [];
        }

        addNotification('Document loaded successfully', 'success');
      } else {
        addNotification('Document not found', 'error');
        router.push('/profile/documents');
      }
    } catch (error) {
      console.error('Error loading document:', error);
      addNotification('Error loading document: ' + error.message, 'error');
    }
  }

  // Check if files are loaded correctly
  console.log('All files after loading:', allFiles.value);

  isLoading.value = false;
});

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

const handleBack = () => {
  router.push('/profile/documents');
};

const handleSave = () => {
  if (!validateForm()) {
    addNotification('Please fill in all required fields', 'error');
    return;
  }
  showConfirmModal.value = true;
};

const confirmSave = async () => {
  try {
    // Log current files for debugging
    console.log('Files before saving:', [...existingFiles.value, ...uploadedFiles.value]);

    // Create a new object with file metadata but without the actual file content
    // to avoid circular references when storing in localStorage
    const filesToSave = [...existingFiles.value, ...uploadedFiles.value].map(file => {
      // Create a clean file object for storage
      const cleanFile = {
        name: file.name || 'Unnamed file',
        type: file.type || 'application/octet-stream',
        size: file.size || 0,
        path: file.path || null,
        preview: file.preview || null,
      };

      // Don't include the actual file object or large content strings
      // These would be handled by a real backend
      return cleanFile;
    });

    const documentToSave = {
      ...document.value,
      files: filesToSave,
      updatedAt: new Date().toISOString()
    };

    console.log('Saving document:', documentToSave);

    if (documentId) {
      await documentStore.updateDocument(documentToSave);
    } else {
      if (document.value.type === 'buyer-rep') {
        await documentStore.saveBuyerRepDocument(documentToSave);
      } else if (document.value.type === 'seller-rep') {
        await documentStore.saveSellerRepDocument(documentToSave);
      } else {
        await documentStore.saveMLSDocument(documentToSave);
      }
    }
    addNotification('Document saved successfully', 'success');
    router.push('/profile/documents');
  } catch (error) {
    console.error('Error saving document:', error);
    addNotification('Error saving document: ' + error.message, 'error');
  }
  showConfirmModal.value = false;
};

const formatFileSize = (bytes) => {
  if (!bytes) return '0 KB';

  if (bytes < 1024) {
    return bytes + ' B';
  } else if (bytes < 1024 * 1024) {
    return (bytes / 1024).toFixed(2) + ' KB';
  } else if (bytes < 1024 * 1024 * 1024) {
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  } else {
    return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
  }
};
</script>

<style scoped>
.document-edit-container {
  padding: 32px;
  min-height: 100vh;
  background-color: #F3F4F6;
}

.page-header {
  margin-bottom: 24px;
}

.header-top {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 8px;
}

.back-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: white;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  color: #4B5563;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.back-button:hover {
  background: #F3F4F6;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  color: #111827;
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
  padding: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.upload-icon {
  width: 48px;
  height: 48px;
  background: #F3F4F6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4px;
}

.upload-text {
  font-size: 14px;
  color: #4B5563;
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
}

.files-section {
  margin-top: 24px;
}

.no-files {
  color: #6B7280;
  font-size: 14px;
  text-align: center;
  padding: 16px;
}

.edit-section {
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.section-header {
  margin-bottom: 24px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 4px;
}

.section-description {
  font-size: 14px;
  color: #6B7280;
}

.form-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.form-control {
  padding: 10px 12px;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  font-size: 14px;
  color: #111827;
  background: white;
  width: 100%;
  height: 40px;
  transition: all 0.2s;
}

.form-control::placeholder {
  color: #9CA3AF;
}

select.form-control {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 8L10 12L14 8' stroke='%236B7280' stroke-width='1.67' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 40px;
}

select.form-control option {
  color: #111827;
  padding: 8px;
}

select.form-control option:disabled {
  color: #9CA3AF;
}

.form-control:hover:not(.error) {
  border-color: #D1D5DB;
}

.form-control:focus:not(.error) {
  border-color: #2563EB;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
  outline: none;
}

textarea.form-control {
  height: auto;
  min-height: 80px;
  resize: vertical;
  line-height: 1.5;
  padding: 12px;
}

.form-control.error {
  border-color: #EF4444;
  background-color: #FEF2F2;
}

.form-control.error:focus {
  box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.1);
}

.form-label {
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  display: flex;
  align-items: center;
  gap: 4px;
}

.required {
  color: #EF4444;
}

.error-message {
  font-size: 12px;
  color: #EF4444;
  margin-top: 2px;
}

.sidebar {
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  height: fit-content;
}

.agents-section {
  margin-bottom: 16px;
}

.agents-title {
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 16px;
}

.agents-list {
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.agent-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  background: #F9FAFB;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
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
  gap: 2px;
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

.remove-agent {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  background: none;
  border: none;
  color: #EF4444;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s;
}

.remove-agent:hover {
  background: rgba(239, 68, 68, 0.1);
}

.search-box {
  margin-bottom: 16px;
}

.agent-list {
  max-height: 300px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.agent-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.agent-item:hover {
  background: #F3F4F6;
}

.agent-item.selected {
  background: #EFF6FF;
  border: 1px solid #BFDBFE;
}

.modal-body {
  padding: 24px;
  max-height: 80vh;
  overflow-y: auto;
}

.add-agent-button {
  width: 100%;
  padding: 8px;
  background: #F3F4F6;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  color: #4B5563;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.add-agent-button:hover {
  background: #E5E7EB;
}

.plus-icon {
  font-size: 16px;
  font-weight: 600;
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

.modal-footer {
  padding: 16px 24px;
  border-top: 1px solid #E5E7EB;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.uploaded-files {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.file-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  background: #F9FAFB;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
}

.file-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.file-icon {
  color: #6B7280;
}

.file-name {
  font-size: 14px;
  color: #111827;
}

.file-details {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 12px 16px;
  background: #F9FAFB;
  border-bottom: 1px solid #E5E7EB;
  font-size: 12px;
  color: #6B7280;
}

.file-type {
  font-size: 12px;
  color: #6B7280;
}

.file-remove {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  background: none;
  border: none;
  color: #EF4444;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s;
}

.file-remove:hover {
  background: rgba(239, 68, 68, 0.1);
}

.file-content-section {
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-top: 24px;
}

.file-content {
  margin-bottom: 24px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  overflow: hidden;
}

.file-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #F9FAFB;
  border-bottom: 1px solid #E5E7EB;
}

.file-header h4 {
  font-size: 16px;
  font-weight: 500;
  color: #111827;
  margin: 0;
}

.file-actions {
  display: flex;
  gap: 8px;
}

.file-action-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
}

.view-btn {
  background: #EFF6FF;
  color: #2563EB;
  border: 1px solid #BFDBFE;
}

.view-btn:hover {
  background: #DBEAFE;
}

.delete-btn {
  background: #FEF2F2;
  color: #EF4444;
  border: 1px solid #FECACA;
}

.delete-btn:hover {
  background: #FEE2E2;
}

.file-details {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 12px 16px;
  background: #F9FAFB;
  border-bottom: 1px solid #E5E7EB;
  font-size: 12px;
  color: #6B7280;
}

.file-path {
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.image-preview {
  max-width: 100%;
  overflow: hidden;
  padding: 16px;
}

.full-image {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
  display: block;
  margin: 0 auto;
}

.text-content {
  background: #F9FAFB;
  padding: 16px;
  max-height: 300px;
  overflow-y: auto;
}

.text-content pre {
  margin: 0;
  font-size: 14px;
  color: #374151;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.page-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 24px;
  border-top: 1px solid #E5E7EB;
}

.btn-primary {
  padding: 9px 17px;
  background: #2563EB;
  border: 1px solid #2563EB;
  border-radius: 6px;
  color: white;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary:hover {
  background: #1D4ED8;
}

.btn-secondary {
  padding: 9px 17px;
  background: white;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  color: #4B5563;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-secondary:hover {
  background: #F3F4F6;
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

.file-preview {
  width: 32px;
  height: 32px;
  border-radius: 4px;
  object-fit: cover;
}
</style>
