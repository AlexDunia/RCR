<!-- src/views/documents/MLSForm.vue -->
<template>
  <div class="mls-form">
    <DocumentForm
      :fields="formFields"
      @submit="handleSubmit"
    />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import DocumentForm from '@/components/documents/DocumentForm.vue'
import { useDocumentStore } from '@/stores/documents'

const router = useRouter()
const documentStore = useDocumentStore()

const formFields = [
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
    placeholder: 'Any specific requirements?'
  }
]

const handleSubmit = async (formData) => {
  try {
    await documentStore.saveMLSDocument({
      ...formData,
      type: 'mls',
      createdAt: new Date().toISOString()
    })
    router.push('/receipts-docs/view-docs')
  } catch (error) {
    console.error('Error saving MLS document:', error)
    // Handle error (show notification, etc.)
  }
}
</script>

<style scoped>
.mls-form {
  max-width: 800px;
  margin: 0 auto;
}
</style>
