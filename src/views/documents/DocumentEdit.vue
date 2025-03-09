<template>
  <div class="document-edit">
    <div class="document-header">
      <div class="header-content">
        <button class="back-button" @click="handleBack">
          <svg xmlns="http://www.w3.org/2000/svg" class="button-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
          </svg>
          Back
        </button>
      </div>
    </div>

    <div v-if="document" class="edit-content">
      <div class="content-section">
        <h2 class="section-title">Edit Document</h2>
        <DocumentForm
          :fields="formFields"
          :initial-values="document"
          @submit="handleSubmit"
          @input="handleInput"
        />
      </div>

      <div class="content-section">
        <h2 class="section-title">Document Files</h2>
        <div v-if="document.files?.length" class="files-list">
          <div v-for="file in document.files" :key="file.id" class="file-item">
            <div class="file-row">
              <div class="file-info">
                <div class="file-name-container">
                  <svg v-if="file.type === 'pdf'" xmlns="http://www.w3.org/2000/svg" class="file-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd"/>
                  </svg>
                  <svg v-else-if="file.type === 'image'" xmlns="http://www.w3.org/2000/svg" class="file-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"/>
                  </svg>
                  <span class="file-name">{{ file.name }}</span>
                </div>
                <span class="file-size">{{ formatFileSize(file.size) }}</span>
              </div>
              <div class="file-actions">
                <a
                  v-if="isValidFileUrl(file.url)"
                  :href="file.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="view-button"
                >
                  View
                </a>
                <button @click="removeFile(file)" class="delete-button">
                  <svg xmlns="http://www.w3.org/2000/svg" class="button-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/>
                  </svg>
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="file-upload">
          <label for="file-input" class="upload-label">
            <svg xmlns="http://www.w3.org/2000/svg" class="upload-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
            </svg>
            <span>Upload Files</span>
            <input
              id="file-input"
              type="file"
              multiple
              @change="handleFileUpload"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              class="hidden-input"
            >
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDocumentStore } from '@/stores/documents'
import DocumentForm from '@/components/documents/DocumentForm.vue'

const route = useRoute()
const router = useRouter()
const documentStore = useDocumentStore()
const document = ref(null)
const hasUnsavedChanges = ref(false)

// Load document data
onMounted(() => {
  const documentId = route.params.id
  const foundDocument = documentStore.getDocument(documentId)

  if (!foundDocument) {
    console.error('Document not found')
    router.push('/receipts-docs')
    return
  }

  // Store the actual document data
  document.value = foundDocument
})

// Handle unsaved changes
const handleBeforeUnload = (e) => {
  if (hasUnsavedChanges.value) {
    e.preventDefault()
    e.returnValue = ''
  }
}

onMounted(() => {
  window.addEventListener('beforeunload', handleBeforeUnload)
})

onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', handleBeforeUnload)
})

// Compute form fields based on document type
const formFields = computed(() => {
  if (!document.value) return []

  const commonFields = [
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      options: ['draft', 'active', 'archived']
    }
  ]

  switch (document.value.type) {
    case 'buyer-rep':
      return [
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
          options: [
            'Single Family Home',
            'Condo',
            'Townhouse',
            'Multi-Family',
            'Land',
            'Commercial'
          ],
          required: true
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
          placeholder: 'Any specific requirements?'
        },
        ...commonFields
      ]
    case 'seller-rep':
      return [
        {
          name: 'sellerName',
          label: 'Seller name',
          type: 'text',
          placeholder: "Enter seller's full name",
          required: true
        },
        {
          name: 'sellerEmail',
          label: 'Seller Email',
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
          options: [
            'Single Family Home',
            'Condo',
            'Townhouse',
            'Multi-Family',
            'Land',
            'Commercial'
          ],
          required: true
        },
        {
          name: 'propertyAddress',
          label: 'Property Address',
          type: 'text',
          placeholder: 'e.g., 123 Main St, City, State, ZIP',
          required: true
        },
        {
          name: 'listingPrice',
          label: 'Desired Listing Price',
          type: 'text',
          placeholder: 'e.g., $500,000',
          required: true
        },
        {
          name: 'additionalNotes',
          label: 'Additional Notes/Requirements',
          type: 'textarea',
          placeholder: 'Any specific requirements or details about the property?'
        },
        ...commonFields
      ]
    case 'mls':
      return [
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
          label: 'Bedrooms',
          type: 'number',
          placeholder: 'e.g., 3',
          required: true
        },
        {
          name: 'bathrooms',
          label: 'Bathrooms',
          type: 'number',
          placeholder: 'e.g., 2',
          required: true
        },
        {
          name: 'squareFootage',
          label: 'Square Footage',
          type: 'text',
          placeholder: 'e.g., 2,000 sq ft',
          required: true
        },
        {
          name: 'propertyDescription',
          label: 'Property Description',
          type: 'textarea',
          placeholder: 'Describe the property features and amenities',
          required: true
        },
        ...commonFields
      ]
    default:
      return commonFields
  }
})

const handleInput = (field, value) => {
  if (document.value) {
    document.value[field] = value
    hasUnsavedChanges.value = true
  }
}

const handleSubmit = async (formData) => {
  try {
    const updatedDocument = {
      ...document.value,
      ...formData,
      updatedAt: new Date().toISOString(),
      activities: [
        ...document.value.activities || [],
        {
          id: Date.now().toString(),
          type: 'modified',
          description: 'Document updated',
          date: new Date().toISOString()
        }
      ]
    }

    const result = await documentStore.updateDocument(updatedDocument)
    if (result) {
      hasUnsavedChanges.value = false
      router.push(`/receipts-docs/document/${document.value.id}`)
    } else {
      console.error('Failed to update document')
    }
  } catch (error) {
    console.error('Error updating document:', error)
  }
}

const handleBack = () => {
  if (hasUnsavedChanges.value) {
    if (confirm('You have unsaved changes. Do you want to leave without saving?')) {
      router.back()
    }
  } else {
    router.back()
  }
}

// Watch for changes in the form
watch(() => document.value, () => {
  hasUnsavedChanges.value = true
}, { deep: true })

const formatFileSize = (bytes) => {
  if (!bytes) return '0 B'
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`
}

const isValidFileUrl = (url) => {
  if (!url) return false
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

const handleFileUpload = async (event) => {
  const files = Array.from(event.target.files)
  if (!files.length) return

  // Process each file
  const newFiles = files.map(file => ({
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    name: file.name,
    size: file.size,
    type: file.type.includes('pdf') ? 'pdf' : 'image',
    url: URL.createObjectURL(file)
  }))

  // Update document with new files
  document.value.files = [...(document.value.files || []), ...newFiles]
  hasUnsavedChanges.value = true
}

const removeFile = (fileToRemove) => {
  document.value.files = document.value.files.filter(file => file.id !== fileToRemove.id)
  hasUnsavedChanges.value = true
}
</script>

<style scoped>
.document-edit {
  background-color: #F8FAFC;
  min-height: 100vh;
}

.document-header {
  background-color: white;
  border-bottom: 1px solid #E5E7EB;
  padding: 2rem 0;
  margin-bottom: 2rem;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.back-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  border: 1px solid #E5E7EB;
  background-color: white;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s;
}

.back-button:hover {
  background-color: #F9FAFB;
  border-color: #D1D5DB;
}

.button-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.edit-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem 2rem;
}

.content-section {
  background-color: white;
  border-radius: 0.5rem;
  border: 1px solid #E5E7EB;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 1.5rem;
}

.files-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.file-item {
  padding: 1rem;
  background-color: #F9FAFB;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
}

.file-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.file-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.file-name-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.file-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: #6B7280;
}

.file-name {
  font-weight: 500;
  color: #111827;
}

.file-size {
  font-size: 0.875rem;
  color: #6B7280;
}

.file-actions {
  display: flex;
  gap: 0.5rem;
}

.view-button,
.delete-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.view-button {
  background-color: #EFF6FF;
  color: #1E40AF;
  border: 1px solid #BFDBFE;
  text-decoration: none;
}

.view-button:hover {
  background-color: #DBEAFE;
  border-color: #93C5FD;
}

.delete-button {
  background-color: #FEF2F2;
  color: #DC2626;
  border: 1px solid #FECACA;
}

.delete-button:hover {
  background-color: #FEE2E2;
  border-color: #FCA5A5;
}

.file-upload {
  border: 2px dashed #E5E7EB;
  border-radius: 0.5rem;
  padding: 2rem;
  text-align: center;
}

.upload-label {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  color: #6B7280;
}

.upload-icon {
  width: 2rem;
  height: 2rem;
}

.hidden-input {
  display: none;
}
</style>
