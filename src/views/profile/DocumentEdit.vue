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
      <h1 class="header-title">{{ document?.name || 'Loading document...' }}</h1>
      <div class="breadcrumb">
        <router-link to="/profile/documents" class="breadcrumb-link">Documents</router-link>
        <span class="breadcrumb-separator">></span>
        <span class="breadcrumb-current">{{ document?.name || 'Loading...' }}</span>
      </div>
    </div>

    <!-- Main content -->
    <div v-if="isLoading" class="loading-indicator">
      <div class="loader"></div>
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
          <div class="upload-area" @drop.prevent="handleFileDrop" @dragover.prevent>
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
          <h2 class="edit-title">Edit document details</h2>
          <div class="edit-subtitle">Update your document information below</div>

          <form @submit.prevent="saveDocument" class="edit-form">
            <!-- Document Type Selector -->
            <div class="form-group">
              <label for="documentType" class="form-label">Document Type</label>
              <select
                id="documentType"
                v-model="document.type"
                @change="() => { checkForChanges(); clearFormErrors(); }"
                class="form-control"
                :class="{ 'error': formErrors.type && formSubmitted }"
              >
                <option value="buyer-rep">Buyer Representation</option>
                <option value="seller-rep">Seller Representation</option>
                <option value="mls">MLS Listing</option>
              </select>
              <span v-if="formErrors.type && formSubmitted" class="error-message">
                {{ formErrors.type }}
              </span>
            </div>

            <!-- Dynamic Document Fields -->
            <div v-for="field in documentFields" :key="field.name" class="form-group">
              <label :for="field.name" class="form-label">
                {{ field.label }}
                <span v-if="field.required" class="required">*</span>
              </label>

              <template v-if="field.type === 'textarea'">
              <textarea
                  :id="field.name"
                  v-model="document[field.name]"
                  :placeholder="document[field.name] ? '' : field.placeholder"
                  class="form-control"
                  :class="{ 'error': formErrors[field.name] && formSubmitted }"
                rows="4"
                  @input="checkForChanges"
              ></textarea>
              </template>
              <template v-else-if="field.type === 'select'">
                <select
                  :id="field.name"
                  v-model="document[field.name]"
                  class="form-control"
                  :class="{ 'error': formErrors[field.name] && formSubmitted }"
                  @change="checkForChanges"
                >
                  <option v-for="option in field.options" :key="option" :value="option">
                    {{ option }}
                  </option>
                </select>
              </template>
              <template v-else>
                <input
                  :id="field.name"
                  v-model="document[field.name]"
                  :type="field.type"
                  :placeholder="document[field.name] ? '' : field.placeholder"
                  class="form-control"
                  :class="{ 'error': formErrors[field.name] && formSubmitted }"
                  @input="checkForChanges"
                >
              </template>
              <span v-if="formErrors[field.name] && formSubmitted" class="error-message">
                {{ formErrors[field.name] }}
              </span>
            </div>
          </form>

          <!-- File List -->
          <div v-if="documentFiles.length > 0" class="files-list">
            <h3 class="files-title">Attached Files</h3>
            <div v-for="(file, index) in documentFiles" :key="file.id" class="file-item">
              <div class="file-icon-wrapper">
                <svg class="file-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7.5 9.16667H12.5M7.5 12.5H10.8333M6.66667 2.5H13.3333L17.5 6.66667V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H6.66667ZM13.3333 2.5V6.66667H17.5L13.3333 2.5Z" stroke="#6B7280" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div class="file-info">
                <div class="file-name">{{ file.name }}</div>
                <div class="file-size">{{ formatFileSize(file.size) }}</div>
              </div>
              <div class="file-actions">
                <button class="file-delete-btn" @click="deleteFile(index)" title="Delete file">
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
          <h3 class="agents-title">Associated Agents</h3>
          <div v-if="associatedAgents.length > 0" class="agents-list">
            <div v-for="(agent, index) in associatedAgents" :key="agent.id" class="agent-card">
              <div class="agent-info">
                <img :src="agent.avatar" :alt="agent.name" class="agent-avatar" />
                <div class="agent-details">
                  <div class="agent-name">{{ agent.name }}</div>
                  <div class="agent-email">{{ agent.email }}</div>
                </div>
              </div>
              <button class="agent-remove-btn" @click="removeAgent(index)" title="Remove agent">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M13.3333 5L6.66667 11.6667M6.66667 5L13.3333 11.6667" stroke="#EF4444" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
          <button class="add-agent-btn" @click="openAgentModal">
            <span class="add-agent-icon">+</span>
            Add agent
          </button>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="page-footer">
      <button class="exit-btn" @click="navigateBack">Cancel</button>
      <button class="save-btn" @click="saveDocument" :disabled="isLoading">
        {{ isLoading ? 'Saving...' : 'Save Changes' }}
      </button>
    </div>

    <!-- Agent Selection Modal -->
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
              placeholder="Search agents..."
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
              <div v-if="isAgentSelected(agent)" class="selected-indicator">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M6.66699 10L9.16699 12.5L13.3337 7.5" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
          </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="done-modal-btn" @click="closeAgentModal(true)">Done</button>
        </div>
      </div>
    </div>

    <!-- Save Confirmation Modal -->
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
          <button class="cancel-modal-btn" @click="discardChanges">Discard Changes</button>
          <button class="confirm-modal-btn" @click="confirmSave">Save Changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useDocumentStore } from '@/stores/documents';

const router = useRouter();
const route = useRoute();
const documentStore = useDocumentStore();

const isLoading = ref(true);
const document = ref({
  id: '',
  name: '',
  description: '',
  type: 'buyer-rep', // Default document type
  files: [],
  agents: [],
  // Fields for buyer representation
  buyerName: '',
  buyerEmail: '',
  phoneNumber: '',
  propertyType: 'Single Family Home', // Default property type
  budgetRange: '',
  additionalNotes: '',
  // Fields for seller representation
  sellerName: '',
  sellerEmail: '',
  propertyAddress: '',
  listingPrice: '',
  // Fields for MLS listing
  squareFootage: '',
  bedrooms: '',
  bathrooms: '',
  propertyDescription: ''
});

const originalDocument = ref(null); // Store original document for comparison
const fileInput = ref(null);
const showAgentModal = ref(false);
const agentSearchQuery = ref('');
const notifications = ref([]);
const notificationId = ref(0);
const showConfirmModal = ref(false);
const hasChanges = ref(false); // Track if changes have been made
const formErrors = ref({});
const formSubmitted = ref(false);

// Document files state
const documentFiles = ref([]);
const originalFiles = ref([]); // Store original files for comparison

// Associated agents state
const associatedAgents = ref([]);
const originalAgents = ref([]); // Store original agents for comparison

// Temporary agent selection state
const tempSelectedAgents = ref([]);

// Available agents data
const availableAgents = ref([
  {
    id: 1,
    name: 'Pristia Candra',
    email: 'pristia@example.com',
    avatar: '/img/avatars/pristia.jpg',
    experience: '3y experiences'
  },
  {
    id: 2,
    name: 'John Smith',
    email: 'john@example.com',
    avatar: '/img/avatars/john.jpg',
    experience: '5y experiences'
  },
  {
    id: 3,
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    avatar: '/img/avatars/sarah.jpg',
    experience: '7y experiences'
  }
]);

// Filter agents based on search
const filteredAgents = computed(() => {
  const query = agentSearchQuery.value.toLowerCase();
  return availableAgents.value.filter(agent =>
    agent.name.toLowerCase().includes(query) ||
    agent.email.toLowerCase().includes(query)
  );
});

// Dynamic document fields based on document type
const documentFields = computed(() => {
  const type = document.value.type;
  console.log('Generating document fields for type:', type);
  console.log('Current document state:', document.value);

  const commonFields = [
    { name: 'name', label: 'Document Title', type: 'text', required: true },
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

  const fields = [...commonFields, ...(typeSpecificFields[type] || [])];
  console.log('Generated fields:', fields);
  return fields;
});

// Form validation
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

// Clear form errors when changing document type
const clearFormErrors = () => {
  formErrors.value = {};
};

// Check if there are any changes compared to original
const checkForChanges = () => {
  // Compare document properties
  if (JSON.stringify(document.value) !== JSON.stringify(originalDocument.value)) {
    hasChanges.value = true;
    return;
  }

  // Compare files
  if (documentFiles.value.length !== originalFiles.value.length) {
    hasChanges.value = true;
    return;
  }

  // Compare agents
  if (associatedAgents.value.length !== originalAgents.value.length) {
    hasChanges.value = true;
    return;
  }

  // Deep comparison for agents by id
  const originalAgentIds = originalAgents.value.map(a => a.id).sort();
  const currentAgentIds = associatedAgents.value.map(a => a.id).sort();
  if (JSON.stringify(originalAgentIds) !== JSON.stringify(currentAgentIds)) {
    hasChanges.value = true;
    return;
  }

  hasChanges.value = false;
};

// Load document data
onMounted(async () => {
  console.log('PROFILE DocumentEdit component mounted - THIS IS THE CORRECT FILE');
  console.log('Route params:', route.params);
  try {
    const id = route.params.id;
    console.log('Document ID:', id);
    if (!id) {
      throw new Error('No document ID provided');
    }

    const docData = await documentStore.getDocument(id);
    console.log('Document data received from backend:', docData);

    // Debug - log the raw document structure
    console.log('Raw document structure:', JSON.stringify(docData, null, 2));

    if (docData) {
      // First, set the document type
      document.value = {
        id: docData.id || id,
        type: docData.type || docData.documentType || 'buyer-rep',
        name: docData.name || docData.title || `Document #${id}`,
        createdAt: docData.createdAt || new Date().toISOString(),
        // Initialize with empty values for all potential fields
        buyerName: docData.buyerName || docData.clientName || docData.name || '',
        buyerEmail: docData.buyerEmail || docData.clientEmail || docData.email || '',
        phoneNumber: docData.phoneNumber || docData.phone || docData.contactPhone || '',
        propertyType: docData.propertyType || docData.homeType || '',
        budgetRange: docData.budgetRange || docData.budget || docData.priceRange || '',
        additionalNotes: docData.additionalNotes || docData.notes || docData.requirements || '',
        sellerName: docData.sellerName || docData.clientName || docData.name || '',
        sellerEmail: docData.sellerEmail || docData.clientEmail || docData.email || '',
        propertyAddress: docData.propertyAddress || docData.address || docData.location || '',
        listingPrice: docData.listingPrice || docData.price || docData.askingPrice || '',
        squareFootage: docData.squareFootage || docData.sqft || '',
        bedrooms: docData.bedrooms || docData.beds || '',
        bathrooms: docData.bathrooms || docData.baths || '',
        propertyDescription: docData.propertyDescription || docData.description || '',
      };

      // Now map all possible fields from docData or docData.document
      const fieldMapping = {
        // Common fields
        type: ['type', 'documentType'],
        phoneNumber: ['phoneNumber', 'phone', 'contactPhone'],
        propertyType: ['propertyType', 'type', 'homeType'],
        additionalNotes: ['additionalNotes', 'notes', 'requirements'],

        // Buyer fields
        buyerName: ['buyerName', 'clientName', 'name'],
        buyerEmail: ['buyerEmail', 'clientEmail', 'email'],
        budgetRange: ['budgetRange', 'budget', 'priceRange'],

        // Seller fields
        sellerName: ['sellerName', 'clientName', 'name'],
        sellerEmail: ['sellerEmail', 'clientEmail', 'email'],
        propertyAddress: ['propertyAddress', 'address', 'location'],
        listingPrice: ['listingPrice', 'price', 'askingPrice'],
        squareFootage: ['squareFootage', 'sqft'],
        bedrooms: ['bedrooms', 'beds'],
        bathrooms: ['bathrooms', 'baths'],
        propertyDescription: ['propertyDescription', 'description'],
      };

      // Helper function to get value from multiple possible field names
      const getFieldValue = (possibleFields) => {
        // First check top-level fields
        for (const field of possibleFields) {
          if (docData[field] !== undefined && docData[field] !== null && docData[field] !== '') {
            console.log(`Found ${field} in docData:`, docData[field]);
            return docData[field];
          }
        }

        // Check in nested document object
        if (docData.document) {
          for (const field of possibleFields) {
            if (docData.document[field] !== undefined && docData.document[field] !== null && docData.document[field] !== '') {
              console.log(`Found ${field} in docData.document:`, docData.document[field]);
              return docData.document[field];
            }
          }
        }

        // Check in flattened document structure (sometimes fields are nested one level down)
        for (const key in docData) {
          if (typeof docData[key] === 'object' && docData[key] !== null && key !== 'document') {
            for (const field of possibleFields) {
              if (docData[key][field] !== undefined && docData[key][field] !== null && docData[key][field] !== '') {
                console.log(`Found ${field} in docData.${key}:`, docData[key][field]);
                return docData[key][field];
              }
            }
          }
        }

        return '';
      };

      // Apply all mapped fields
      for (const [targetField, sourceFields] of Object.entries(fieldMapping)) {
        const value = getFieldValue(sourceFields);
        if (value) {
          document.value[targetField] = value;
          console.log(`Set ${targetField} to:`, value);
        }
      }

      // Special handling for property type which is particularly problematic
      const propertyTypeKeys = ['propertyType', 'homeType', 'property', 'home'];
      let propertyTypeValue = '';

      // Look for property type in all possible locations with all possible keys
      for (const key of propertyTypeKeys) {
        // Check in docData
        if (docData[key] && !propertyTypeValue) {
          propertyTypeValue = docData[key];
          console.log(`Found property type in docData.${key}:`, propertyTypeValue);
        }

        // Check in docData.document
        if (docData.document && docData.document[key] && !propertyTypeValue) {
          propertyTypeValue = docData.document[key];
          console.log(`Found property type in docData.document.${key}:`, propertyTypeValue);
        }

        // Check in nested objects
        for (const nestedKey in docData) {
          if (typeof docData[nestedKey] === 'object' && docData[nestedKey] !== null) {
            if (docData[nestedKey][key] && !propertyTypeValue) {
              propertyTypeValue = docData[nestedKey][key];
              console.log(`Found property type in docData.${nestedKey}.${key}:`, propertyTypeValue);
            }
          }
        }
      }

      if (propertyTypeValue) {
        document.value.propertyType = propertyTypeValue;
      }

      // Perform deep inspection of document data to find any missed fields
      console.log('Advanced document data inspection:');
      const inspectAndMapFields = (obj, prefix = '') => {
        for (const key in obj) {
          const value = obj[key];
          const path = prefix ? `${prefix}.${key}` : key;

          if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            // Recursively inspect nested objects
            inspectAndMapFields(value, path);
          } else if (value !== undefined && value !== null && value !== '') {
            console.log(`Found potential field - ${path}: ${value}`);

            // Try to infer field mapping based on key name
            const lowerKey = key.toLowerCase();

            // Map common field patterns
            if (lowerKey.includes('buyer') && lowerKey.includes('name')) {
              document.value.buyerName = value;
            } else if (lowerKey.includes('buyer') && lowerKey.includes('email')) {
              document.value.buyerEmail = value;
            } else if (lowerKey.includes('seller') && lowerKey.includes('name')) {
              document.value.sellerName = value;
            } else if (lowerKey.includes('seller') && lowerKey.includes('email')) {
              document.value.sellerEmail = value;
            } else if (lowerKey.includes('phone')) {
              document.value.phoneNumber = value;
            } else if (lowerKey.includes('property') && lowerKey.includes('addr')) {
              document.value.propertyAddress = value;
            } else if (lowerKey.includes('price') || lowerKey.includes('listing')) {
              document.value.listingPrice = value;
            } else if (lowerKey.includes('budget') || lowerKey.includes('range')) {
              document.value.budgetRange = value;
            } else if (lowerKey.includes('note') || lowerKey.includes('add')) {
              document.value.additionalNotes = value;
            }
          }
        }
      };

      // Run the deep inspection on the document data
      if (docData) {
        inspectAndMapFields(docData);
      }

      // Final check of document fields
      console.log('Document fields after advanced mapping:');
      for (const key in document.value) {
        console.log(`${key}: ${document.value[key]}`);
      }

      // Set associated agents
      if (Array.isArray(docData.agents)) {
        associatedAgents.value = docData.agents;
      } else if (Array.isArray(docData.associatedAgents)) {
        associatedAgents.value = docData.associatedAgents;
    } else {
        associatedAgents.value = [];
      }

      // Set tempSelectedAgents to match current agents
      tempSelectedAgents.value = [...associatedAgents.value];

      // Ensure the document.value.id is set
      document.value.id = docData.id || id;

      console.log('Final document object after mapping:', document.value);
    } else {
      console.error('No document data returned from API');
      addNotification('Could not load document data', 'error');
    }
  } catch (error) {
    console.error('Error loading document:', error);
    addNotification('Error loading document', 'error');
  } finally {
    isLoading.value = false;
  }
});

// File handling
const handleFileDrop = (event) => {
  event.preventDefault();
  const files = Array.from(event.dataTransfer.files);
  handleFiles(files);
};

const triggerFileInput = () => {
  fileInput.value.click();
};

const handleFileSelect = (event) => {
  const files = Array.from(event.target.files);
  handleFiles(files);
};

const handleFiles = (files) => {
  files.forEach(file => {
    const newFile = {
      id: Date.now() + Math.random().toString(36).substr(2, 9),
      name: file.name,
      type: file.type,
      size: file.size
    };
    documentFiles.value.push(newFile);
    addNotification(`File "${file.name}" added successfully`, 'success');
  });
  checkForChanges();
};

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const deleteFile = (index) => {
  const fileName = documentFiles.value[index].name;
  documentFiles.value.splice(index, 1);
  addNotification(`File "${fileName}" removed`, 'success');
  checkForChanges();
};

// Agent handling
const removeAgent = (index) => {
  const agentName = associatedAgents.value[index].name;
  associatedAgents.value.splice(index, 1);
  addNotification(`Agent "${agentName}" removed`, 'success');
  checkForChanges();
};

const openAgentModal = () => {
  // Initialize temp selection with current selection
  tempSelectedAgents.value = JSON.parse(JSON.stringify(associatedAgents.value));
  showAgentModal.value = true;
};

const closeAgentModal = (save = false) => {
  if (save) {
    // Check if there are actually changes to the agents selection
    const originalIds = associatedAgents.value.map(a => a.id).sort();
    const newIds = tempSelectedAgents.value.map(a => a.id).sort();

    if (JSON.stringify(originalIds) !== JSON.stringify(newIds)) {
      // Save changes and notify about added/removed agents
      const addedAgents = tempSelectedAgents.value.filter(
        a => !associatedAgents.value.some(orig => orig.id === a.id)
      );

      const removedAgents = associatedAgents.value.filter(
        a => !tempSelectedAgents.value.some(temp => temp.id === a.id)
      );

      // Update associated agents
      associatedAgents.value = JSON.parse(JSON.stringify(tempSelectedAgents.value));

      // Notify about changes
      addedAgents.forEach(agent => {
        addNotification(`Agent "${agent.name}" added`, 'success');
      });

      removedAgents.forEach(agent => {
        addNotification(`Agent "${agent.name}" removed`, 'success');
      });

      // Check for changes in the document
      checkForChanges();
    }
  }

  showAgentModal.value = false;
  tempSelectedAgents.value = []; // Clear temp selection
};

const isAgentSelected = (agent) => {
  return tempSelectedAgents.value.some(a => a.id === agent.id);
};

const selectAgent = (agent) => {
  if (!isAgentSelected(agent)) {
    tempSelectedAgents.value.push(agent);
  } else {
    const index = tempSelectedAgents.value.findIndex(a => a.id === agent.id);
    if (index !== -1) {
      tempSelectedAgents.value.splice(index, 1);
  }
  }
  // Don't close modal and don't notify yet - wait for confirmation
};

// Notifications
const addNotification = (message, type = 'success') => {
  const id = notificationId.value++;
  notifications.value.push({
    id,
    message,
    type,
    timestamp: Date.now()
  });

  setTimeout(() => removeNotification(id), 5000);
};

const removeNotification = (id) => {
  const index = notifications.value.findIndex(n => n.id === id);
  if (index !== -1) {
    notifications.value.splice(index, 1);
  }
};

// Save and navigation
const saveDocument = () => {
  if (!validateForm()) {
    addNotification('Please fill in all required fields', 'error');
    return;
  }

  if (hasChanges.value) {
  showConfirmModal.value = true;
  } else {
    // If no changes, just go back without confirmation
    navigateBack();
  }
};

const confirmSave = async () => {
  try {
    isLoading.value = true;
    addNotification('Saving document...', 'info');

    console.log('Before save - document state:', document.value);

    // Prepare document data for saving
    const docToSave = {
      ...document.value,
      // Ensure we have both title and name (for compatibility)
      title: document.value.name,
      // Ensure property type is set
      propertyType: document.value.propertyType || 'Single Family Home',
      // Map agents to the appropriate format
      files: documentFiles.value,
      agents: associatedAgents.value,
      associatedAgents: associatedAgents.value
    };

    console.log('Saving document with data:', docToSave);

    await documentStore.updateDocument(docToSave);
    console.log('Document saved successfully:', docToSave);

    // Update original state to reflect saved changes
    originalDocument.value = JSON.parse(JSON.stringify(document.value));
    originalFiles.value = JSON.parse(JSON.stringify(documentFiles.value));
    originalAgents.value = JSON.parse(JSON.stringify(associatedAgents.value));
    hasChanges.value = false;

    addNotification('Document saved successfully', 'success');
    setTimeout(() => router.push('/profile/documents'), 1000);
  } catch (error) {
    console.error('Error saving document:', error);
    addNotification('Error saving document', 'error');
  } finally {
    isLoading.value = false;
    showConfirmModal.value = false;
  }
};

const discardChanges = () => {
  showConfirmModal.value = false;
  router.push('/profile/documents');
};

const navigateBack = () => {
  if (hasChanges.value) {
    showConfirmModal.value = true;
  } else {
  router.push('/profile/documents');
  }
};
</script>

<style scoped>
.loader {
  border: 3px solid #f3f3f3;
  border-radius: 50%;
  border-top: 3px solid #3498db;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
  margin-bottom: 8px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.files-title {
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin: 0 0 12px 0;
}

.file-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.file-size {
  font-size: 12px;
  color: #6B7280;
}

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
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 4px;
}

.required {
  color: #dc2626;
  font-weight: 600;
}

.form-control {
  display: block;
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: #1f2937;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form-control:focus {
  border-color: #60a5fa;
  outline: 0;
  box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.25);
}

.form-control.error {
  border-color: #dc2626;
  background-color: #fef2f2;
}

.error-message {
  display: block;
  margin-top: 0.25rem;
  font-size: 0.75rem;
  color: #dc2626;
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

.file-delete-btn {
  background: none;
  border: none;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 4px;
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

.selected-indicator {
  margin-left: auto;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.done-modal-btn {
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

.done-modal-btn:hover {
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