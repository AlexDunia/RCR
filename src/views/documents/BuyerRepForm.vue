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
import { useDocumentStore } from '@/stores/documents'
import DocumentForm from '@/components/documents/DocumentForm.vue'
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

const handleSubmit = async (formData) => {
  try {
    await documentStore.saveBuyerRepDocument({
      ...formData,
      type: 'buyer-rep',
      createdAt: new Date().toISOString()
    })
    router.push('/receipts-docs/view-docs')
  } catch (error) {
    console.error('Error saving buyer rep document:', error)
  }
}
</script>

<style scoped>
.buyer-rep-form {
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
