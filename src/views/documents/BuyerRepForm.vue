<!-- src/views/documents/BuyerRepForm.vue -->
<template>
  <div class="buyer-rep-form">
    <h2 class="form-title">Buyer Rep</h2>
    <DocumentForm
      :fields="formFields"
      @submit="handleSubmit"
    />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useDocumentStore } from '@/stores/documents'
import DocumentForm from '@/components/documents/DocumentForm.vue'

const router = useRouter()
const documentStore = useDocumentStore()

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
