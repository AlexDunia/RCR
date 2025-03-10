<!-- src/views/documents/SellerRepForm.vue -->
<template>
  <div class="seller-rep-form">
    <div class="form-card">
      <div class="card-header">
        <Loader v-if="isLoading" class="title-loader" />
        <h2 v-else class="form-title">Seller Rep</h2>
      </div>
      <div class="card-content">
        <DocumentForm
          :fields="formFields"
          @submit="handleSubmit"
          :isLoading="isLoading"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import DocumentForm from '@/components/documents/DocumentForm.vue'
import { useDocumentStore } from '@/stores/documents'
import Loader from '@/components/Loader.vue'

const router = useRouter()
const documentStore = useDocumentStore()
const isLoading = ref(true)

// Initialize with loading state and turn it off after a delay
setTimeout(() => {
  isLoading.value = false
}, 1000)

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
  margin: 0 auto;
}

.form-card {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
}

.card-header {
  background: #F3F4F4;
  padding: 1rem 1.5rem;
}

.card-content {
  background: white;
  padding: 2rem;
}

.form-title {
  font-size: 16px;
  font-weight: 500;
  color: #111827;
  margin: 0;
}

.title-loader {
  height: 30px !important;
}
</style>
