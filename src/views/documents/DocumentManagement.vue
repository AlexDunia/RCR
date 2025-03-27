<!-- src/views/documents/DocumentManagement.vue -->
<template>
  <div class="document-management">
    <div v-if="isLoading" class="documents-loader">
      <Loader v-for="n in 3" :key="n" />
    </div>
    <div v-else>
      <div class="recent-documents" v-if="recentDocuments.length > 0">
        <div class="document-card">
          <div class="card-header">
            <Loader v-if="isLoading" class="title-loader" />
            <h2 v-else class="section-title">Recent Documents</h2>
          </div>
          <div class="card-content">
            <div class="documents-list">
              <div
                v-for="doc in recentDocuments"
                :key="doc.id"
                class="document-item"
              >
                <router-link
                  :to="{ name: 'DocumentDetail', params: { id: doc.id }}"
                  class="document-link"
              >
                <div class="document-info">
                  <span class="document-badge" :class="doc.type">{{ doc.type }}</span>
                  <h4 class="document-name">{{ getDocumentTitle(doc) }}</h4>
                  <p class="document-date">{{ formatDate(doc.createdAt) }}</p>
                </div>
                </router-link>
                <div class="document-actions">
                  <button 
                    class="action-button edit-button" 
                    @click="editDocument(doc.id)"
                    title="Edit document"
                  >
                    <span class="tooltip">Edit</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="action-icon" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                  <button 
                    class="action-button delete-button" 
                    @click="confirmDelete(doc.id)"
                    title="Delete document"
                  >
                    <span class="tooltip">Delete</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="action-icon" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Confirmation Dialog -->
    <div v-if="showDeleteConfirm" class="delete-confirm-overlay">
      <div class="delete-confirm-dialog">
        <h3>Delete Document</h3>
        <p>Are you sure you want to delete this document? This action cannot be undone.</p>
        <div class="dialog-actions">
          <button class="cancel-button" @click="showDeleteConfirm = false">Cancel</button>
          <button class="confirm-button" @click="deleteDocument">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useDocumentStore } from '@/stores/documents'
import { useRouter } from 'vue-router'
import Loader from "@/ui/Loader.vue";

const documentStore = useDocumentStore()
const router = useRouter()
const isLoading = ref(true)
const showDeleteConfirm = ref(false)
const documentToDelete = ref(null)

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 1000)
})

const recentDocuments = computed(() => {
  return documentStore.documents
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5)
})

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const getDocumentTitle = (doc) => {
  switch (doc.type) {
    case 'buyer-rep':
      return `${doc.buyerName}'s Buyer Rep Agreement`
    case 'seller-rep':
      return `${doc.sellerName}'s Seller Rep Agreement`
    case 'mls':
      return `MLS Listing - ${doc.propertyAddress}`
    default:
      return 'Untitled Document'
  }
}

const editDocument = (id) => {
  router.push(`/receipts-docs/document/${id}/edit`)
}

const confirmDelete = (id) => {
  documentToDelete.value = id
  showDeleteConfirm.value = true
}

const deleteDocument = async () => {
  if (documentToDelete.value) {
    try {
      await documentStore.deleteDocument(documentToDelete.value)
      showDeleteConfirm.value = false
      documentToDelete.value = null
    } catch (error) {
      console.error('Error deleting document:', error)
      // You could add error handling UI here if needed
    }
  }
}
</script>

<style scoped>
.document-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  width: 100%;
}

.document-card {
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
  padding: 1.5rem;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.documents-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.document-item {
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1.5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.25s ease;
  margin-bottom: 17px;
  position: relative;
  overflow: hidden;
}

.document-item:hover {
  background-color: #f9fafb;
  border-color: #2563EB;
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.document-item:hover::after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 4px;
  background-color: #2563EB;
}

.document-link {
  flex: 1;
  text-decoration: none;
  cursor: pointer;
  color: inherit;
}

.document-badge {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  text-transform: uppercase;
}

.document-badge.buyer-rep {
  background-color: #dbeafe;
  color: #1e40af;
}

.document-badge.seller-rep {
  background-color: #dcfce7;
  color: #166534;
}

.document-badge.mls {
  background-color: #fef3c7;
  color: #92400e;
}

.document-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: #111827;
  margin: 0.5rem 0 0.25rem;
  margin-top:14px;
  margin-bottom:14px;
}

.document-date {
  font-size: 0.75rem;
  color: #6b7280;
}

.document-actions {
  display: flex;
  gap: 0.5rem;
}

.action-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 0.375rem;
  border: 2px solid;
  background-color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  position: relative;
}

.action-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.action-button:active {
  transform: translateY(0);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  opacity: 0.9;
}

.action-button .tooltip {
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #374151;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease;
  white-space: nowrap;
  z-index: 10;
}

.action-button .tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #374151 transparent transparent transparent;
}

.action-button:hover .tooltip {
  opacity: 1;
  visibility: visible;
}

.edit-button {
  color: #3b82f6;
  border-color: #93c5fd;
  background-color: #eff6ff;
}

.edit-button:hover {
  color: #2563EB;
  border-color: #2563EB;
  background-color: #dbeafe;
}

.edit-button:active {
  background-color: #bfdbfe;
}

.delete-button {
  color: #ef4444;
  border-color: #fca5a5;
  background-color: #fef2f2;
}

.delete-button:hover {
  color: #dc2626;
  border-color: #dc2626;
  background-color: #fee2e2;
}

.delete-button:active {
  background-color: #fecaca;
}

.action-icon {
  width: 18px;
  height: 18px;
  transition: transform 0.2s ease;
}

.edit-button:hover .action-icon,
.delete-button:hover .action-icon {
  transform: scale(1.1);
}

.recent-documents {
  margin-top: 2rem;
}

.documents-loader {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}

.title-loader {
  height: 30px !important;
}

/* Delete confirmation dialog styles */
.delete-confirm-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.delete-confirm-dialog {
  background-color: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.delete-confirm-dialog h3 {
  margin-top: 0;
  color: #111827;
  font-size: 1.25rem;
}

.dialog-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.cancel-button, .confirm-button {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.cancel-button {
  background-color: #f3f4f6;
  color: #374151;
  border: 1px solid #d1d5db;
}

.cancel-button:hover {
  background-color: #e5e7eb;
}

.confirm-button {
  background-color: #dc2626;
  color: white;
  border: 1px solid #dc2626;
}

.confirm-button:hover {
  background-color: #b91c1c;
  border-color: #b91c1c;
}
</style>
