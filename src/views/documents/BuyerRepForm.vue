<!-- src/views/documents/BuyerRepForm.vue -->
<template>
  <div class="buyer-rep-form">
    <div class="form-card">
      <div class="card-header">
        <Loader v-if="isLoading" class="title-loader" />
        <h2 v-else class="form-title">Buyer Rep</h2>
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
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useDocumentStore } from '@/stores/documents'
import DocumentForm from '@/features/documents/DocumentForm.vue'
import Loader from '@/ui/Loader.vue'
import { useRoleStore } from '@/stores/roleStore'

const router = useRouter()
const documentStore = useDocumentStore()
const roleStore = useRoleStore()
const isLoading = ref(true)

// Add computed properties for role-based navigation
const adminDocumentPath = computed(() => '/receipts-docs/view-docs')
const agentDocumentPath = computed(() => '/profile/documents')
const defaultDocumentPath = computed(() => '/')

const getRoleBasedPath = computed(() => {
  if (roleStore.currentRole === 'admin') {
    return adminDocumentPath.value
  } else if (roleStore.currentRole === 'agent') {
    return agentDocumentPath.value
  }
  return defaultDocumentPath.value
})

// Initialize with loading state and turn it off after a delay
setTimeout(() => {
  isLoading.value = false
}, 1000)

const formFields = [
  {
    name: 'buyerName',
    label: 'Buyer name',
    type: 'text',
    placeholder: "Enter buyer's full name",
    required: true
  },
  {
    name: 'buyerEmail',
    label: 'Buyer Email',
    type: 'email',
    placeholder: 'johndoe@gmail.com',
    required: true
  },
  {
    name: 'phoneNumber',
    label: 'Phone Number',
    type: 'tel',
    placeholder: '555-123-4567',
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
    name: 'budgetRange',
    label: 'Budget Range',
    type: 'text',
    placeholder: '$200,000-$500,000',
    required: true
  },
  {
    name: 'additionalNotes',
    label: 'Additional Notes/Requirements',
    type: 'textarea',
    placeholder: 'Any specific requirements?',
    required: false
  },
  {
    name: 'documents',
    label: 'Upload Documents',
    type: 'file',
    accept: '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.gif,.tiff,.heic',
    multiple: true,
    required: false,
    placeholder: 'Upload relevant documents (pre-approval letters, wish lists, etc.)'
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
    await documentStore.saveBuyerRepDocument({
      ...formData,
      type: 'buyer-rep',
      createdAt: new Date().toISOString(),
      files: fileMetadata
    });

    router.push(getRoleBasedPath.value);
  } catch (error) {
    console.error('Error saving buyer rep document:', error);
  }
}
</script>

<style scoped>
.buyer-rep-form {
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

.title-loader {
  height: 30px !important;
}
</style>
