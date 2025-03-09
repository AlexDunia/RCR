<!-- src/views/documents/SellerRepForm.vue -->
<template>
  <div class="seller-rep-form">
    <h2 class="form-title">Seller Rep</h2>
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

const handleSubmit = async (formData) => {
  try {
    await documentStore.saveSellerRepDocument({
      ...formData,
      type: 'seller-rep',
      createdAt: new Date().toISOString()
    })
    router.push('/receipts-docs/view-docs')
  } catch (error) {
    console.error('Error saving seller rep document:', error)
    // Handle error (show notification, etc.)
  }
}
</script>

<style scoped>
.seller-rep-form {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.form-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 1.5rem;
}
</style>
