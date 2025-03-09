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
      <div v-if="isLoading" class="document-loader">
        <Loader v-for="n in 5" :key="n" />
      </div>
      <div v-else class="content-section">
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
        <h2 class="section-title">Document Files</h2>
        <div v-if="document?.files?.length" class="files-list">
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
                  @click="handleFileView(file)"
                >
                  View File
                </a>
                <span v-else class="file-error">File unavailable</span>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="no-files">
          <svg xmlns="http://www.w3.org/2000/svg" class="no-files-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd"/>
          </svg>
          <p>No files have been uploaded yet</p>
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
import Loader from "@/components/Loader.vue"

const route = useRoute()
const router = useRouter()
const documentStore = useDocumentStore()
const document = ref(null)
const isLoading = ref(true)

onMounted(async () => {
  const documentId = route.params.id
  const foundDocument = documentStore.getDocument(documentId)

  if (!foundDocument) {
    document.value = {
      id: documentId,
      type: 'buyer-rep',
      buyerName: 'John Doe',
      buyerEmail: 'john@example.com',
      phoneNumber: '555-0123',
      propertyType: 'Single Family Home',
      budgetRange: '$300,000-$500,000',
      additionalNotes: 'Looking for a property with a large backyard',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      size: 1024 * 1024 * 4.3, // 4.3MB total size
      files: [
        {
          id: '1',
          name: 'buyer-agreement.pdf',
          size: 1024 * 1024 * 2.5,
          url: 'https://www.africau.edu/images/default/sample.pdf',
          type: 'pdf'
        },
        {
          id: '2',
          name: 'property-photos.jpg',
          size: 1024 * 1024 * 1.8,
          url: 'https://picsum.photos/id/1018/800/600',
          type: 'image'
        }
      ],
      activities: [
        {
          id: '1',
          type: 'created',
          description: 'Document created',
          date: new Date(Date.now() - 86400000).toISOString()
        },
        {
          id: '2',
          type: 'modified',
          description: 'Updated buyer information',
          date: new Date().toISOString()
        }
      ]
    }
  } else {
    document.value = foundDocument
  }

  setTimeout(() => {
    isLoading.value = false
  }, 1000)
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

const isValidFileUrl = (url) => {
  if (!url) return false
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

const handleFileView = (file) => {
  // Log file access for security tracking
  console.log(`File accessed: ${file.name} at ${new Date().toISOString()}`)
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

.files-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
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

.file-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.file-error {
  color: #EF4444;
  font-size: 0.875rem;
}

.view-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #EFF6FF;
  color: #1E40AF;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s;
  border: 1px solid #BFDBFE;
}

.view-button:hover {
  background-color: #DBEAFE;
  border-color: #93C5FD;
}

.view-button:focus {
  outline: 2px solid #3B82F6;
  outline-offset: 2px;
}

.file-name {
  font-weight: 500;
  color: #111827;
  word-break: break-word;
}

.no-files {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 3rem;
  text-align: center;
  color: #6B7280;
  background-color: #F9FAFB;
  border: 2px dashed #E5E7EB;
  border-radius: 0.5rem;
}

.no-files-icon {
  width: 3rem;
  height: 3rem;
  color: #9CA3AF;
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

.document-loader {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}
</style>
