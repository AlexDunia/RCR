<!-- src/views/documents/MLSForm.vue -->
<template>
  <div class="mls-form">
    <div class="form-card">
      <div class="card-header">
        <div v-if="isLoading" class="skeleton-loader label-skeleton"></div>
        <h2 v-else class="form-title">MLS Listing</h2>
      </div>
      <div class="card-content">
        <DocumentForm
          :fields="formFields"
          :isLoading="isLoading"
          @submit="handleSubmit"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import DocumentForm from '@/features/documents/DocumentForm.vue'
import { useDocumentStore } from '@/stores/documents'

const router = useRouter()
const documentStore = useDocumentStore()
const isLoading = ref(true)

// Initialize with loading state and turn it off after a delay
setTimeout(() => {
  isLoading.value = false
}, 1000)

const formFields = [
  {
    name: 'propertyAddress',
    label: 'Property Address',
    type: 'text',
    placeholder: 'e.g., 123 Main St, City, State, ZIP',
    required: true
  },
  {
    name: 'listingPrice',
    label: 'Listing Price',
    type: 'text',
    placeholder: 'e.g., $500,000',
    required: true
  },
  {
    name: 'bedrooms',
    label: 'Number of Bedrooms',
    type: 'number',
    placeholder: 'e.g., 3',
    required: true
  },
  {
    name: 'bathrooms',
    label: 'Number of Bathrooms',
    type: 'number',
    placeholder: 'e.g., 2.5',
    required: true
  },
  {
    name: 'squareFootage',
    label: 'Square Footage',
    type: 'number',
    placeholder: 'e.g., 2000',
    required: true
  },
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
  {
    name: 'propertyDescription',
    label: 'Property Description',
    type: 'textarea',
    placeholder: 'Describe the key features and selling points of the property',
    required: true
  },
  {
    name: 'documents',
    label: 'Upload Documents',
    type: 'file',
    accept: '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.gif,.tiff,.heic',
    multiple: true,
    required: false,
    placeholder: 'Upload property photos, floor plans, and other relevant documents'
  }
]

const handleSubmit = async (formData) => {
  try {
    // Create clean file metadata objects for storage in localStorage
    const fileMetadata = [];

    // Process files if any
    if (formData.documents && formData.documents.length > 0) {
      formData.documents.forEach(fileObj => {
        // Create a clean file object with just the metadata
        fileMetadata.push({
          name: fileObj.name || 'Unnamed file',
          type: fileObj.type || 'application/octet-stream',
          size: fileObj.size || 0,
          lastModified: fileObj.file?.lastModified || Date.now(),
          preview: fileObj.preview || null
        });
      });
    }

    // Save document with file metadata instead of FormData
    await documentStore.saveMLSDocument({
      ...formData,
      type: 'mls',
      createdAt: new Date().toISOString(),
      files: fileMetadata
    });

    router.push('/receipts-docs/view-docs');
  } catch (error) {
    console.error('Error saving MLS document:', error);
  }
}
</script>

<style scoped>
.mls-form {
  margin: 0 auto;
  max-width: 800px;
  padding: 32px;
}

.form-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.card-header {
  background: #F3F4F6;
  padding: 16px 24px;
  border-bottom: 1px solid #E5E7EB;
}

.card-content {
  padding: 24px;
}

.form-title {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.skeleton-loader {
  width: 100px;
  height: 24px;
  background: #E5E7EB;
  border-radius: 4px;
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
</style>
