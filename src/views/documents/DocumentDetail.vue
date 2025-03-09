<template>
  <div class="document-detail">
    <div class="document-header">
      <div class="header-content">
        <div class="header-actions">
          <button class="back-button" @click="router.back()">
            <svg xmlns="http://www.w3.org/2000/svg" class="button-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
            </svg>
            Back
          </button>
          <button class="edit-button" @click="router.push(`/receipts-docs/document/${document?.id}/edit`)">
            <svg xmlns="http://www.w3.org/2000/svg" class="button-icon" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            Edit
          </button>
        </div>
      </div>
    </div>

    <div class="document-content">
      <div class="content-section">
        <h2 class="section-title">{{ getDocumentTitle(document) }}</h2>
        <div class="details-grid">
          <template v-if="document?.type === 'buyer-rep'">
            <div class="detail-item">
              <span class="detail-label">Buyer Name</span>
              <span class="detail-value">{{ document?.buyerName }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Email</span>
              <span class="detail-value">{{ document?.buyerEmail }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Phone</span>
              <span class="detail-value">{{ document?.phoneNumber }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Property Type</span>
              <span class="detail-value">{{ document?.propertyType }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Budget Range</span>
              <span class="detail-value">{{ document?.budgetRange }}</span>
            </div>
            <div class="detail-item full-width">
              <span class="detail-label">Additional Notes</span>
              <span class="detail-value">{{ document?.additionalNotes }}</span>
            </div>
          </template>

          <template v-if="document?.type === 'seller-rep'">
            <div class="detail-item">
              <span class="detail-label">Seller Name</span>
              <span class="detail-value">{{ document?.sellerName }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Email</span>
              <span class="detail-value">{{ document?.sellerEmail }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Phone</span>
              <span class="detail-value">{{ document?.phoneNumber }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Property Type</span>
              <span class="detail-value">{{ document?.propertyType }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Property Address</span>
              <span class="detail-value">{{ document?.propertyAddress }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Listing Price</span>
              <span class="detail-value">{{ document?.listingPrice }}</span>
            </div>
            <div class="detail-item full-width">
              <span class="detail-label">Additional Notes</span>
              <span class="detail-value">{{ document?.additionalNotes }}</span>
            </div>
          </template>

          <template v-if="document?.type === 'mls'">
            <div class="detail-item">
              <span class="detail-label">Property Address</span>
              <span class="detail-value">{{ document?.propertyAddress }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Listing Price</span>
              <span class="detail-value">{{ document?.listingPrice }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Bedrooms</span>
              <span class="detail-value">{{ document?.bedrooms }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Bathrooms</span>
              <span class="detail-value">{{ document?.bathrooms }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Square Footage</span>
              <span class="detail-value">{{ document?.squareFootage }}</span>
            </div>
            <div class="detail-item full-width">
              <span class="detail-label">Property Description</span>
              <span class="detail-value">{{ document?.propertyDescription }}</span>
            </div>
          </template>

          <div class="detail-item">
            <span class="detail-label">Document ID</span>
            <span class="detail-value">{{ document?.id }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Status</span>
            <span class="detail-value status" :class="document?.status">
              {{ formatStatus(document?.status) }}
            </span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Last Modified</span>
            <span class="detail-value">{{ formatDate(document?.updatedAt) }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">File Size</span>
            <span class="detail-value">{{ formatFileSize(document?.size) }}</span>
          </div>
        </div>
      </div>

      <div class="content-section">
        <h2 class="section-title">Preview</h2>
        <div class="document-preview" :class="{ 'is-image': isImageFile(document?.fileName) }">
          <div v-if="isImageFile(document?.fileName)" class="preview-image">
            <img :src="document?.url" :alt="document?.fileName" />
          </div>
          <div v-else class="preview-placeholder">
            <svg xmlns="http://www.w3.org/2000/svg" class="placeholder-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd"/>
            </svg>
            <span>Preview not available for this file type</span>
            <button class="preview-download">Download to view</button>
          </div>
        </div>
      </div>

      <div class="content-section">
        <h2 class="section-title">Activity History</h2>
        <div class="activity-timeline">
          <div v-for="activity in document?.activities" :key="activity.id" class="activity-item">
            <div class="activity-icon" :class="activity.type">
              <svg v-if="activity.type === 'created'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
              <svg v-else-if="activity.type === 'modified'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
              </svg>
            </div>
            <div class="activity-content">
              <p class="activity-text">{{ activity.description }}</p>
              <span class="activity-date">{{ formatDate(activity.date) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDocumentStore } from '@/stores/documents'

const route = useRoute()
const router = useRouter()
const documentStore = useDocumentStore()
const document = ref(null)

onMounted(async () => {
  const documentId = route.params.id
  document.value = await documentStore.getDocumentById(documentId)
})

const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatStatus = (status) => {
  if (!status) return ''
  return status.charAt(0).toUpperCase() + status.slice(1)
}

const formatFileSize = (bytes) => {
  if (!bytes) return '0 B'
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`
}

const isImageFile = (fileName) => {
  if (!fileName) return false
  return /\.(jpg|jpeg|png|gif)$/i.test(fileName)
}

const getDocumentTitle = (doc) => {
  if (!doc) return ''
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
</script>

<style scoped>
.document-detail {
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

.header-actions {
  display: flex;
  gap: 1rem;
}

.back-button,
.edit-button {
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

.back-button:hover,
.edit-button:hover {
  background-color: #F9FAFB;
  border-color: #D1D5DB;
}

.edit-button {
  background-color: #EFF6FF;
  border-color: #BFDBFE;
  color: #1E40AF;
}

.edit-button:hover {
  background-color: #DBEAFE;
  border-color: #93C5FD;
}

.button-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.document-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
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
  margin: 0 0 1.5rem 0;
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.detail-item.full-width {
  grid-column: 1 / -1;
}

.detail-label {
  font-size: 0.875rem;
  color: #6B7280;
}

.detail-value {
  font-size: 1rem;
  color: #111827;
  font-weight: 500;
  white-space: pre-wrap;
}

.status {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
}

.status.draft {
  background-color: #F3F4F6;
  color: #374151;
}

.status.active {
  background-color: #DCFCE7;
  color: #166534;
}

.status.archived {
  background-color: #FEF3C7;
  color: #92400E;
}

.document-preview {
  background-color: #F9FAFB;
  border-radius: 0.5rem;
  border: 2px dashed #E5E7EB;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.document-preview.is-image {
  border: none;
  background-color: white;
}

.preview-image {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-image img {
  max-width: 100%;
  max-height: 400px;
  object-fit: contain;
}

.preview-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: #6B7280;
  text-align: center;
  padding: 2rem;
}

.placeholder-icon {
  width: 3rem;
  height: 3rem;
  color: #9CA3AF;
}

.preview-download {
  background-color: #2563EB;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.preview-download:hover {
  background-color: #1D4ED8;
}

.activity-timeline {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.activity-item {
  display: flex;
  gap: 1rem;
}

.activity-icon {
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.activity-icon svg {
  width: 1.25rem;
  height: 1.25rem;
  color: white;
}

.activity-icon.created {
  background-color: #10B981;
}

.activity-icon.modified {
  background-color: #F59E0B;
}

.activity-content {
  flex: 1;
}

.activity-text {
  font-size: 0.875rem;
  color: #374151;
  margin: 0 0 0.25rem 0;
}

.activity-date {
  font-size: 0.75rem;
  color: #6B7280;
}
</style>
