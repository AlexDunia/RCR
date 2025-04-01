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
        <h1 class="page-title">Admin - {{ isNewDocument ? 'Create' : 'Edit' }} document for {{ getClientName() }}</h1>
      </div>
      <div class="breadcrumb">
        <router-link :to="`/clients/${clientId}`" class="breadcrumb-link">Client Profile</router-link>
        <span class="breadcrumb-separator">/</span>
        <span class="breadcrumb-current">{{ isNewDocument ? 'New Document' : 'Edit Document' }}</span>
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
              Supported formats: PDF, DOC, XLS, PPT, JPG, PNG, GIF
            </div>
            <input
              type="file"
              ref="fileInput"
              @change="handleFileSelect"
              multiple
              accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.gif"
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
                  <img v-else-if="isImage(file.type)" :src="file.preview" class="file-preview" :alt="file.name" />
                  <div class="file-details">
                    <span class="file-name">{{ file.name }}</span>
                    <span class="file-type">{{ file.type }}</span>
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
          <div v-if="allFiles.length > 0" class="file-summary-section">
            <h3 class="section-title">{{ allFiles.length }} {{ allFiles.length === 1 ? 'file' : 'files' }} attached</h3>
          </div>
        </div>

        <!-- Edit Form -->
        <div class="edit-section">
          <div class="section-header">
            <h2 class="section-title">{{ isNewDocument ? 'Create' : 'Edit' }} document</h2>
            <p class="section-description">{{ isNewDocument ? 'Create a new document for this client' : 'Edit document details and attached files' }}</p>
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
                  @input="checkForChanges"
                ></textarea>
              </template>
              <template v-else-if="field.type === 'select'">
                <select
                  :id="field.name"
                  v-model="document[field.name]"
                  class="form-control"
                  :class="{ 'error': formErrors[field.name] }"
                  @change="checkForChanges"
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
                    @input="checkForChanges"
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
          <button class="add-agent-button" @click="openAgentModal">
            <span class="plus-icon">+</span>
            Add agent
          </button>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="page-footer">
      <button class="btn-secondary" @click="handleBack">Cancel</button>
      <button class="btn-primary" @click="handleSave">Save Document</button>
    </div>

    <!-- Confirmation Modal -->
    <div v-if="showConfirmModal" class="modal-overlay" @click.self="showConfirmModal = false">
      <div class="modal-container">
        <div class="modal-header">
          <h3>Unsaved Changes</h3>
          <button @click="showConfirmModal = false" class="modal-close">×</button>
        </div>
        <div class="modal-body">
          <p>You have unsaved changes. What would you like to do?</p>
        </div>
        <div class="modal-footer">
          <button class="btn-secondary" @click="discardChanges">Discard Changes</button>
          <button class="btn-primary" @click="confirmSave">Save Changes</button>
        </div>
      </div>
    </div>

    <!-- Agent Modal -->
    <div v-if="showAgentModal" class="modal-overlay" @click.self="closeAgentModal(false)">
      <div class="modal-container">
        <div class="modal-header">
          <h3>Select Agents</h3>
          <button @click="closeAgentModal(false)" class="modal-close">×</button>
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
              :class="{ 'selected': isAgentSelected(agent) }"
              @click="selectAgent(agent)"
            >
              <img :src="agent.avatar" :alt="agent.name" class="agent-avatar">
              <div class="agent-details">
                <span class="agent-name">{{ agent.name }}</span>
                <span class="agent-experience">{{ agent.experience }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-primary" @click="closeAgentModal(true)">Done</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useDocumentStore } from '@/stores/documents';
import { useAgentStore } from '@/stores/agentStore';
import { useClientStore } from '@/stores/clientStore';

// Router and route setup
const route = useRoute();
const router = useRouter();

// Stores
const documentStore = useDocumentStore();
const agentStore = useAgentStore();
const clientStore = useClientStore();

// Document ID from route params
const documentId = computed(() => route.params.id);
const clientId = ref(null);

// Check if this is a new document or editing existing
const isNewDocument = computed(() => route.name === 'AdminDocumentCreate');

// Document data
const document = ref({
  id: null,
  type: 'buyer-rep', // Default type
  title: '',
  clientId: null,
  description: '',
  associatedAgents: [],
  files: [],
  // Fields for buyer-rep type
  buyerName: '',
  buyerEmail: '',
  phoneNumber: '',
  propertyType: '',
  budgetRange: '',
  additionalNotes: '',
  // Fields for seller-rep type
  sellerName: '',
  sellerEmail: '',
  propertyAddress: '',
  listingPrice: '',
  // Fields for MLS type
  bedrooms: '',
  bathrooms: '',
  squareFootage: '',
  propertyDescription: ''
});

// Keep a copy of the original document for change detection
const originalDocument = ref({});

// State tracking
const hasChanges = ref(false);
const showConfirmModal = ref(false);
const formErrors = ref({});
const formSubmitted = ref(false);
const notifications = ref([]);
const showAgentModal = ref(false);
const agentSearchQuery = ref('');
const tempSelectedAgents = ref([]);
const isLoading = ref(true); // Loading state for document fetch
const isSaving = ref(false); // Loading state for save operation

// File handling
const fileInput = ref(null);
const existingFiles = ref([]);
const uploadedFiles = ref([]);

// Computed property to combine existing and uploaded files
const allFiles = computed(() => {
  return [...existingFiles.value, ...uploadedFiles.value];
});

// Form fields based on document type
const documentFields = computed(() => {
  const commonFields = [
    {
      name: 'title',
      label: 'Document Title',
      type: 'text',
      placeholder: 'Enter document title',
      required: true
    },
    {
      name: 'type',
      label: 'Document Type',
      type: 'select',
      options: ['buyer-rep', 'seller-rep', 'mls'],
      required: true
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      placeholder: 'Add a description of this document',
      required: false
    }
  ];

  const typeSpecificFields = {
    'buyer-rep': [
      {
        name: 'buyerName',
        label: 'Buyer Name',
        type: 'text',
        placeholder: 'Enter buyer\'s full name',
        required: true
      },
      {
        name: 'buyerEmail',
        label: 'Buyer Email',
        type: 'email',
        placeholder: 'Enter buyer\'s email address',
        required: true
      },
      {
        name: 'phoneNumber',
        label: 'Phone Number',
        type: 'tel',
        placeholder: 'Enter buyer\'s phone number',
        required: true
      },
      {
        name: 'propertyType',
        label: 'Property Type',
        type: 'select',
        options: ['Single Family Home', 'Condo', 'Townhouse', 'Multi-Family', 'Land', 'Commercial'],
        required: true
      },
      {
        name: 'budgetRange',
        label: 'Budget Range',
        type: 'text',
        placeholder: 'e.g. $200,000-$300,000',
        required: true
      },
      {
        name: 'additionalNotes',
        label: 'Additional Notes',
        type: 'textarea',
        placeholder: 'Any additional information about the buyer or their requirements',
        required: false
      }
    ],
    'seller-rep': [
      {
        name: 'sellerName',
        label: 'Seller Name',
        type: 'text',
        placeholder: 'Enter seller\'s full name',
        required: true
      },
      {
        name: 'sellerEmail',
        label: 'Seller Email',
        type: 'email',
        placeholder: 'Enter seller\'s email address',
        required: true
      },
      {
        name: 'phoneNumber',
        label: 'Phone Number',
        type: 'tel',
        placeholder: 'Enter seller\'s phone number',
        required: true
      },
      {
        name: 'propertyType',
        label: 'Property Type',
        type: 'select',
        options: ['Single Family Home', 'Condo', 'Townhouse', 'Multi-Family', 'Land', 'Commercial'],
        required: true
      },
      {
        name: 'propertyAddress',
        label: 'Property Address',
        type: 'text',
        placeholder: 'Enter the property address',
        required: true
      },
      {
        name: 'listingPrice',
        label: 'Listing Price',
        type: 'text',
        placeholder: 'e.g. $500,000',
        required: true
      },
      {
        name: 'additionalNotes',
        label: 'Additional Notes',
        type: 'textarea',
        placeholder: 'Any additional information about the seller or property',
        required: false
      }
    ],
    'mls': [
      {
        name: 'propertyAddress',
        label: 'Property Address',
        type: 'text',
        placeholder: 'Enter the property address',
        required: true
      },
      {
        name: 'listingPrice',
        label: 'Listing Price',
        type: 'text',
        placeholder: 'e.g. $500,000',
        required: true
      },
      {
        name: 'bedrooms',
        label: 'Bedrooms',
        type: 'text',
        placeholder: 'Number of bedrooms',
        required: true
      },
      {
        name: 'bathrooms',
        label: 'Bathrooms',
        type: 'text',
        placeholder: 'Number of bathrooms',
        required: true
      },
      {
        name: 'squareFootage',
        label: 'Square Footage',
        type: 'text',
        placeholder: 'e.g. 2,500',
        required: true
      },
      {
        name: 'propertyDescription',
        label: 'Property Description',
        type: 'textarea',
        placeholder: 'Detailed description of the property',
        required: true
      }
    ]
  };

  return [...commonFields, ...(typeSpecificFields[document.value.type] || [])];
});

// Filtered agents for the agent modal
const filteredAgents = computed(() => {
  const query = agentSearchQuery.value.toLowerCase();
  return agentStore.agents.filter(agent => {
    return agent.name.toLowerCase().includes(query) ||
           (agent.email && agent.email.toLowerCase().includes(query));
  });
});

// Client info
const getClientName = () => {
  if (!clientId.value) return '';

  const client = clientStore.getClientById(clientId.value);
  return client ? client.name : 'Unknown Client';
};

// Load document data
onMounted(async () => {
  // Parse client ID from query params if this is a new document
  if (route.query.clientId) {
    clientId.value = parseInt(route.query.clientId);
    document.value.clientId = clientId.value;
  }

  if (!isNewDocument.value && documentId.value) {
    try {
      // Show loading state
      isLoading.value = true;

      // Fetch document from API
      const loadedDocument = await documentStore.fetchDocument(documentId.value);

      if (loadedDocument) {
        // Set client ID from the document
        clientId.value = loadedDocument.clientId;

        // Map document store fields to form fields
        document.value = {
          id: loadedDocument.id,
          type: loadedDocument.type || 'buyer-rep',
          title: loadedDocument.name || '',
          clientId: loadedDocument.clientId,
          description: loadedDocument.description || '',
          associatedAgents: loadedDocument.agents || [],

          // Type-specific fields
          buyerName: loadedDocument.buyerName || '',
          buyerEmail: loadedDocument.buyerEmail || '',
          sellerName: loadedDocument.sellerName || '',
          sellerEmail: loadedDocument.sellerEmail || '',
          phoneNumber: loadedDocument.phoneNumber || '',
          propertyType: loadedDocument.propertyType || '',
          propertyAddress: loadedDocument.propertyAddress || '',
          listingPrice: loadedDocument.listingPrice || '',
          budgetRange: loadedDocument.budgetRange || '',
          bedrooms: loadedDocument.bedrooms || '',
          bathrooms: loadedDocument.bathrooms || '',
          squareFootage: loadedDocument.squareFootage || '',
          propertyDescription: loadedDocument.propertyDescription || '',
          additionalNotes: loadedDocument.additionalNotes || ''
        };

        // Load files
        if (loadedDocument.files && loadedDocument.files.length > 0) {
          existingFiles.value = [...loadedDocument.files];
        }

        // Store original document for change detection
        originalDocument.value = JSON.parse(JSON.stringify(document.value));
      } else {
        // Document not found
        addNotification('Document not found', 'error');
      }
    } catch (error) {
      console.error('Error loading document:', error);
      addNotification(`Failed to load document: ${error.message || 'Unknown error'}`, 'error');
    } finally {
      isLoading.value = false;
    }
  } else {
    // New document - can initialize with default values
    isLoading.value = false;
  }
});

// Watch for document type changes to reset form errors
watch(() => document.value.type, () => {
  clearFormErrors();
});

// Add notification
const addNotification = (message, type = 'info') => {
  const id = Date.now();
  notifications.value.push({ id, message, type });

  // Auto-remove after 5 seconds
  setTimeout(() => {
    removeNotification(id);
  }, 5000);
};

// Remove notification
const removeNotification = (id) => {
  notifications.value = notifications.value.filter(n => n.id !== id);
};

// File handling methods
const triggerFileInput = () => {
  fileInput.value.click();
};

const handleFileSelect = (event) => {
  const files = event.target.files;
  if (files.length > 0) {
    Array.from(files).forEach(handleFile);
  }
  // Reset input so the same file can be selected again
  event.target.value = null;
};

const handleFileDrop = (event) => {
  const files = event.dataTransfer.files;
  if (files.length > 0) {
    Array.from(files).forEach(handleFile);
  }
};

const handleFile = async (file) => {
  try {
    const fileObject = {
      name: file.name,
      type: file.type,
      size: file.size,
      content: null,
      preview: null
    };

    if (isImage(file.type)) {
      fileObject.preview = URL.createObjectURL(file);
    }

    uploadedFiles.value.push(fileObject);
    checkForChanges();
    addNotification(`File "${file.name}" added successfully`, 'success');
  } catch (error) {
    addNotification(`Error reading file ${file.name}: ${error.message}`, 'error');
  }
};

const removeFile = (index) => {
  let fileName = '';
  if (index < existingFiles.value.length) {
    fileName = existingFiles.value[index].name;
    existingFiles.value.splice(index, 1);
  } else {
    fileName = uploadedFiles.value[index - existingFiles.value.length].name;
    uploadedFiles.value.splice(index - existingFiles.value.length, 1);
  }
  checkForChanges();
  addNotification(`File "${fileName}" removed`, 'success');
};

const isDocument = (type) => {
  return type.includes('pdf') ||
         type.includes('doc') ||
         type.includes('xls') ||
         type.includes('ppt');
};

const isImage = (type) => {
  return type.includes('image/');
};

// Agent handling methods
const openAgentModal = () => {
  tempSelectedAgents.value = [...document.value.associatedAgents];
  showAgentModal.value = true;
};

const closeAgentModal = (save) => {
  if (save) {
    document.value.associatedAgents = [...tempSelectedAgents.value];
    checkForChanges();
  }
  showAgentModal.value = false;
};

const isAgentSelected = (agent) => {
  return tempSelectedAgents.value.some(a => a.id === agent.id);
};

const selectAgent = (agent) => {
  const index = tempSelectedAgents.value.findIndex(a => a.id === agent.id);
  if (index === -1) {
    tempSelectedAgents.value.push(agent);
  } else {
    tempSelectedAgents.value.splice(index, 1);
  }
};

const removeAgent = (agentId) => {
  document.value.associatedAgents = document.value.associatedAgents.filter(a => a.id !== agentId);
  checkForChanges();
};

// Form validation and submission
const validateForm = () => {
  const errors = {};
  formSubmitted.value = true;

  documentFields.value.forEach(field => {
    if (field.required && !document.value[field.name]) {
      errors[field.name] = `${field.label} is required`;
    }
  });

  formErrors.value = errors;
  return Object.keys(errors).length === 0;
};

const clearFormErrors = () => {
  formErrors.value = {};
};

// Check if there are any changes compared to original
const checkForChanges = () => {
  // If it's a new document, always consider it changed
  if (isNewDocument.value) {
    hasChanges.value = true;
    return;
  }

  // Compare document properties
  if (JSON.stringify(document.value) !== JSON.stringify(originalDocument.value)) {
    hasChanges.value = true;
    return;
  }

  // Compare files
  if (existingFiles.value.length !== originalDocument.value.files?.length ||
      uploadedFiles.value.length > 0) {
    hasChanges.value = true;
    return;
  }

  hasChanges.value = false;
};

// Navigation handling
const handleBack = () => {
  if (hasChanges.value) {
    showConfirmModal.value = true;
  } else {
    navigateToClientProfile();
  }
};

const navigateToClientProfile = () => {
  router.push({
    path: `/clients/${clientId.value}`,
    query: { tab: 'documents' }
  });
};

const discardChanges = () => {
  showConfirmModal.value = false;
  navigateToClientProfile();
};

// Save document
const handleSave = async () => {
  if (!validateForm()) {
    addNotification('Please fill in all required fields', 'error');
    return;
  }

  if (hasChanges.value) {
    confirmSave();
  } else {
    navigateToClientProfile();
  }
};

const confirmSave = async () => {
  try {
    addNotification('Saving document...', 'info');
    showConfirmModal.value = false;
    isSaving.value = true;

    // Map form fields back to document store fields
    const documentToSave = {
      id: document.value.id,
      name: document.value.title,
      type: document.value.type,
      description: document.value.description,
      agents: document.value.associatedAgents,
      files: [...existingFiles.value, ...uploadedFiles.value],
      clientId: document.value.clientId,
      createdAt: new Date().toISOString().split('T')[0]
    };

    // Add type-specific fields
    if (document.value.type === 'buyer-rep') {
      documentToSave.buyerName = document.value.buyerName;
      documentToSave.buyerEmail = document.value.buyerEmail;
      documentToSave.phoneNumber = document.value.phoneNumber;
      documentToSave.propertyType = document.value.propertyType;
      documentToSave.budgetRange = document.value.budgetRange;
      documentToSave.additionalNotes = document.value.additionalNotes;
    } else if (document.value.type === 'seller-rep') {
      documentToSave.sellerName = document.value.sellerName;
      documentToSave.sellerEmail = document.value.sellerEmail;
      documentToSave.phoneNumber = document.value.phoneNumber;
      documentToSave.propertyType = document.value.propertyType;
      documentToSave.propertyAddress = document.value.propertyAddress;
      documentToSave.listingPrice = document.value.listingPrice;
      documentToSave.additionalNotes = document.value.additionalNotes;
    } else if (document.value.type === 'mls') {
      documentToSave.propertyAddress = document.value.propertyAddress;
      documentToSave.listingPrice = document.value.listingPrice;
      documentToSave.bedrooms = document.value.bedrooms;
      documentToSave.bathrooms = document.value.bathrooms;
      documentToSave.squareFootage = document.value.squareFootage;
      documentToSave.propertyDescription = document.value.propertyDescription;
    }

    // Save the document - either update existing or create new
    if (isNewDocument.value) {
      const docId = await documentStore.addDocument(documentToSave);
      console.log('Created document with ID:', docId);
      addNotification('Document created successfully', 'success');
    } else {
      await documentStore.updateDocument(document.value.id, documentToSave);
      addNotification('Document updated successfully', 'success');
    }

    // Navigate back to client profile after short delay
    setTimeout(() => {
      navigateToClientProfile();
    }, 1500);
  } catch (error) {
    console.error('Error saving document:', error);
    addNotification(`Error saving document: ${error.message || 'Unknown error'}`, 'error');
  } finally {
    isSaving.value = false;
  }
};
</script>

<style scoped>
.document-edit-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f8fafc;
}

.notifications-container {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 1000;
  max-width: 320px;
}

.notification {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  margin-bottom: 0.75rem;
  border-radius: 0.375rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  animation: slideIn 0.3s ease;
}

.notification-enter-active {
  animation: slideIn 0.3s ease;
}

.notification-leave-active {
  animation: slideOut 0.3s ease;
}

@keyframes slideIn {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

@keyframes slideOut {
  from { transform: translateX(0); opacity: 1; }
  to { transform: translateX(100%); opacity: 0; }
}

.notification.success {
  background-color: #dcfce7;
  border: 1px solid #bbf7d0;
  color: #166534;
}

.notification.error {
  background-color: #fee2e2;
  border: 1px solid #fecaca;
  color: #b91c1c;
}

.notification.info {
  background-color: #dbeafe;
  border: 1px solid #bfdbfe;
  color: #1e40af;
}

.notification-message {
  flex: 1;
}

.notification-close {
  background: none;
  border: none;
  font-size: 1.25rem;
  line-height: 1;
  padding: 0;
  margin-left: 0.75rem;
  cursor: pointer;
  color: currentColor;
}

.page-header {
  margin-bottom: 2rem;
}

.header-top {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.back-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #6b7280;
  font-weight: 500;
  padding: 0.5rem;
  cursor: pointer;
  margin-right: 1rem;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.breadcrumb {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  color: #6b7280;
}

.breadcrumb-link {
  color: #1e40af;
  text-decoration: none;
}

.breadcrumb-link:hover {
  text-decoration: underline;
}

.breadcrumb-separator {
  margin: 0 0.5rem;
}

.breadcrumb-current {
  color: #6b7280;
}

.content-layout {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  margin-bottom: 1.5rem;
}

.main-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.upload-container {
  background-color: white;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  overflow: hidden;
}

.upload-area {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  border: 2px dashed #e5e7eb;
  border-radius: 0.5rem;
  margin: 1.5rem;
  transition: all 0.2s;
  cursor: pointer;
}

.upload-area:hover {
  border-color: #d1d5db;
  background-color: #f9fafb;
}

.upload-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  background-color: #f3f4f6;
  border-radius: 50%;
}

.upload-text {
  font-size: 0.875rem;
  color: #4b5563;
  text-align: center;
}

.browse-link {
  background: none;
  border: none;
  padding: 0;
  color: #1e40af;
  font-weight: 500;
  cursor: pointer;
}

.upload-formats {
  font-size: 0.75rem;
  color: #6b7280;
}

.hidden {
  display: none;
}

.files-section {
  padding: 0 1.5rem 1.5rem;
}

.section-title {
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 1rem 0;
}

.uploaded-files {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.file-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background-color: #f9fafb;
  border-radius: 0.375rem;
  border: 1px solid #e5e7eb;
}

.file-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.file-icon {
  color: #6b7280;
}

.file-preview {
  width: 32px;
  height: 32px;
  border-radius: 4px;
  object-fit: cover;
}

.file-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.file-name {
  font-weight: 500;
  color: #111827;
  font-size: 0.875rem;
}

.file-type {
  font-size: 0.75rem;
  color: #6b7280;
}

.file-remove {
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: #ef4444;
  cursor: pointer;
  padding: 0.25rem;
}

.no-files {
  text-align: center;
  color: #6b7280;
  padding: 1rem 0;
  font-size: 0.875rem;
}

.file-summary-section {
  padding: 1rem 1.5rem;
  background-color: #f9fafb;
  border-top: 1px solid #e5e7eb;
}

.edit-section {
  background-color: white;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  padding: 1.5rem;
}

.section-header {
  margin-bottom: 1.5rem;
}

.section-description {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0.25rem 0 0 0;
}

.form-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group:has(textarea) {
  grid-column: span 2;
}

.form-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.required {
  color: #ef4444;
  margin-left: 0.25rem;
}

.form-control {
  width: 100%;
  padding: 0.625rem 0.75rem;
  font-size: 0.875rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  transition: all 0.2s;
}

.form-control:focus {
  outline: none;
  border-color: #93c5fd;
  box-shadow: 0 0 0 3px rgba(147, 197, 253, 0.25);
}

.form-control.error {
  border-color: #ef4444;
}

.error-message {
  font-size: 0.75rem;
  color: #ef4444;
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.agents-section {
  background-color: white;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  padding: 1.5rem;
}

.agents-title {
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 1rem 0;
}

.agents-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.agent-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background-color: #f9fafb;
  border-radius: 0.375rem;
  border: 1px solid #e5e7eb;
}

.agent-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.agent-avatar {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  object-fit: cover;
}

.agent-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.agent-name {
  font-weight: 500;
  color: #111827;
  font-size: 0.875rem;
}

.agent-email {
  font-size: 0.75rem;
  color: #6b7280;
}

.remove-agent {
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: #ef4444;
  cursor: pointer;
  padding: 0.25rem;
}

.add-agent-button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.625rem;
  background-color: #eff6ff;
  color: #1e40af;
  border: 1px dashed #bfdbfe;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.add-agent-button:hover {
  background-color: #dbeafe;
}

.plus-icon {
  font-size: 1rem;
  font-weight: 300;
}

.page-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1.5rem 0;
}

.btn-primary {
  padding: 0.625rem 1.25rem;
  background-color: #1a4189;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary:hover {
  background-color: #1e3a8a;
}

.btn-secondary {
  padding: 0.625rem 1.25rem;
  background-color: white;
  color: #6b7280;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-secondary:hover {
  background-color: #f9fafb;
  border-color: #9ca3af;
}

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
  border-radius: 0.5rem;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.modal-header h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  line-height: 1;
  color: #6b7280;
  cursor: pointer;
}

.modal-body {
  padding: 1.5rem;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  border-top: 1px solid #e5e7eb;
  background-color: #f9fafb;
}

.search-box {
  margin-bottom: 1rem;
}

.agent-list {
  max-height: 300px;
  overflow-y: auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 0.75rem;
}

.agent-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background-color: #f9fafb;
  border-radius: 0.375rem;
  border: 1px solid #e5e7eb;
  cursor: pointer;
  transition: all 0.2s;
}

.agent-item:hover {
  background-color: #f3f4f6;
}

.agent-item.selected {
  border-color: #3b82f6;
  background-color: #eff6ff;
}

.agent-experience {
  font-size: 0.75rem;
  color: #6b7280;
  margin-top: 0.25rem;
}

@media (max-width: 768px) {
  .content-layout {
    grid-template-columns: 1fr;
  }

  .form-list {
    grid-template-columns: 1fr;
  }
}
</style>
