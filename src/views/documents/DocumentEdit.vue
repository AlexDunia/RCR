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
      <DocumentForm
        :fields="formFields"
        :initial-values="document"
        @submit="handleSubmit"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDocumentStore } from '@/stores/documents'
import DocumentForm from '@/components/documents/DocumentForm.vue'

const route = useRoute()
const router = useRouter()
const documentStore = useDocumentStore()
const document = ref(null)
const hasUnsavedChanges = ref(false)

// Load document data
onMounted(async () => {
  const documentId = route.params.id
  document.value = await documentStore.getDocumentById(documentId)
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

  switch (document.value.type) {
    case 'buyer-rep':
      return [
        {
          name: 'buyerName',
          label: 'Buyer name',
          type: 'text',
          placeholder: "Enter buyer's full name"
        },
        {
          name: 'buyerEmail',
          label: 'Buyer Email',
          type: 'email',
          placeholder: 'johndoe@gmail.com'
        },
        {
          name: 'phoneNumber',
          label: 'Phone Number',
          type: 'tel',
          placeholder: '555-123-4567'
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
          ]
        },
        {
          name: 'budgetRange',
          label: 'Budget Range',
          type: 'text',
          placeholder: '$200,000-$500,000'
        },
        {
          name: 'additionalNotes',
          label: 'Additional Notes/Requirements',
          type: 'textarea',
          placeholder: 'Any specific requirements?'
        }
      ]
    case 'seller-rep':
      return [
        {
          name: 'sellerName',
          label: 'Seller name',
          type: 'text',
          placeholder: "Enter seller's full name"
        },
        {
          name: 'sellerEmail',
          label: 'Seller Email',
          type: 'email',
          placeholder: 'johndoe@gmail.com'
        },
        {
          name: 'phoneNumber',
          label: 'Phone Number',
          type: 'tel',
          placeholder: '555-123-4567'
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
          ]
        },
        {
          name: 'propertyAddress',
          label: 'Property Address',
          type: 'text',
          placeholder: 'e.g., 123 Main St, City, State, ZIP'
        },
        {
          name: 'listingPrice',
          label: 'Desired Listing Price',
          type: 'text',
          placeholder: 'e.g., $500,000'
        },
        {
          name: 'additionalNotes',
          label: 'Additional Notes/Requirements',
          type: 'textarea',
          placeholder: 'Any specific requirements or details about the property?'
        }
      ]
    case 'mls':
      return [
        {
          name: 'propertyAddress',
          label: 'Property Address',
          type: 'text',
          placeholder: 'e.g., 123 Main St, City, State, ZIP'
        },
        {
          name: 'listingPrice',
          label: 'Listing Price',
          type: 'text',
          placeholder: 'e.g., $500,000'
        },
        {
          name: 'bedrooms',
          label: 'Bedrooms',
          type: 'number',
          placeholder: 'e.g., 3'
        },
        {
          name: 'bathrooms',
          label: 'Bathrooms',
          type: 'number',
          placeholder: 'e.g., 2'
        },
        {
          name: 'squareFootage',
          label: 'Square Footage',
          type: 'text',
          placeholder: 'e.g., 2,000 sq ft'
        },
        {
          name: 'propertyDescription',
          label: 'Property Description',
          type: 'textarea',
          placeholder: 'Describe the property features and amenities'
        }
      ]
    default:
      return []
  }
})

const handleSubmit = async (formData) => {
  try {
    await documentStore.updateDocument({
      ...document.value,
      ...formData,
      updatedAt: new Date().toISOString()
    })
    hasUnsavedChanges.value = false
    router.push(`/receipts-docs/document/${document.value.id}`)
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
</style>
