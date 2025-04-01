<!-- src/views/documents/SellerRepForm.vue -->
<template>
  <div class="seller-rep-form">
    <div class="form-card">
      <div class="card-header">
        <div v-if="isLoading" class="skeleton-loader label-skeleton"></div>
        <h2 v-else class="form-title">Seller Rep</h2>
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
import DocumentForm from '@/features/documents/DocumentForm.vue'
import { useDocumentStore } from '@/stores/documents'
import { useRoleStore } from '@/stores/roleStore'

const router = useRouter()
const documentStore = useDocumentStore()
const roleStore = useRoleStore()
const isLoading = ref(true)
const isSubmitting = ref(false)

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
    placeholder: 'Any specific requirements or details about the property?',
    required: false
  },
  {
    name: 'documents',
    label: 'Upload Documents',
    type: 'file',
    accept: '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.gif,.tiff,.heic',
    multiple: true,
    required: false,
    placeholder: 'Upload relevant documents (contracts, photos, etc.)'
  }
]

const handleSubmit = async (formData) => {
  if (validateForm()) {
    try {
      isSubmitting.value = true;

      const documentData = {
        type: 'seller-rep',
        sellerName: formData.sellerName,
        sellerEmail: formData.sellerEmail,
        phoneNumber: formData.phoneNumber,
        propertyType: formData.propertyType,
        propertyAddress: formData.propertyAddress,
        listingPrice: formData.listingPrice,
        additionalNotes: formData.additionalNotes,
        createdAt: new Date().toISOString().split('T')[0]
      };

      await documentStore.addDocument(documentData);

      isSubmitting.value = false;
      addNotification('Seller representation agreement saved successfully!', 'success');

      router.push(getRoleBasedPath.value);
    } catch (error) {
      isSubmitting.value = false;
      addNotification('Error saving document: ' + error.message, 'error');
    }
  } else {
    addNotification('Please fill in all required fields.', 'error');
  }
}

const validateForm = () => {
  // Implement form validation logic here
  return true; // Placeholder return, actual implementation needed
}

const addNotification = (message, type) => {
  console.log(`${type}: ${message}`);
  // In a real implementation, this would show a UI notification
}
</script>

<style scoped>
.seller-rep-form {
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
