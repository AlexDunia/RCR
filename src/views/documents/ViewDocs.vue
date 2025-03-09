<!-- src/views/documents/ViewDocs.vue -->
<template>
  <div class="view-docs">
    <div class="filters">
      <div class="search-box">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search documents..."
          class="search-input"
        />
      </div>
      <div class="filter-buttons">
        <button
          v-for="type in documentTypes"
          :key="type"
          @click="toggleFilter(type)"
          :class="['filter-button', { active: activeFilters.includes(type) }]"
        >
          {{ type }}
        </button>
      </div>
    </div>

    <div class="documents-grid">
      <div
        v-for="doc in filteredDocuments"
        :key="doc.id"
        class="document-card"
      >
        <div class="document-header">
          <span class="document-type" :class="doc.type">{{ doc.type }}</span>
          <span class="document-date">{{ formatDate(doc.createdAt) }}</span>
        </div>

        <div class="document-preview">
          <img
            v-if="doc.coverPhoto"
            :src="doc.coverPhoto"
            alt="Document cover"
            class="cover-photo"
          />
          <div v-else class="no-photo">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>

        <div class="document-content">
          <h3 class="document-title">
            {{ getDocumentTitle(doc) }}
          </h3>
          <p class="document-details">
            {{ getDocumentDetails(doc) }}
          </p>
        </div>

        <div class="document-actions">
          <button @click="viewDocument(doc)" class="action-button view">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
            </svg>
            View
          </button>
          <button @click="downloadDocument(doc)" class="action-button download">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
            Download
          </button>
          <button @click="deleteDocument(doc)" class="action-button delete">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useDocumentStore } from '@/stores/documents'

const documentStore = useDocumentStore()
const searchQuery = ref('')
const activeFilters = ref([])

const documentTypes = ['buyer-rep', 'seller-rep', 'mls']

const documents = computed(() => documentStore.documents)

const filteredDocuments = computed(() => {
  let filtered = documents.value

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(doc => {
      const searchableContent = [
        getDocumentTitle(doc),
        getDocumentDetails(doc),
        doc.type
      ].join(' ').toLowerCase()
      return searchableContent.includes(query)
    })
  }

  // Apply type filters
  if (activeFilters.value.length > 0) {
    filtered = filtered.filter(doc => activeFilters.value.includes(doc.type))
  }

  return filtered
})

const toggleFilter = (type) => {
  const index = activeFilters.value.indexOf(type)
  if (index === -1) {
    activeFilters.value.push(type)
  } else {
    activeFilters.value.splice(index, 1)
  }
}

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

const getDocumentDetails = (doc) => {
  switch (doc.type) {
    case 'buyer-rep':
    case 'seller-rep':
      return `Budget: ${doc.budgetRange} | Property Type: ${doc.propertyType}`
    case 'mls':
      return `${doc.bedrooms} beds | ${doc.bathrooms} baths | ${doc.squareFootage}`
    default:
      return ''
  }
}

const viewDocument = (doc) => {
  // Implement document viewing logic
  console.log('Viewing document:', doc)
}

const downloadDocument = (doc) => {
  // Implement document download logic
  console.log('Downloading document:', doc)
}

const deleteDocument = async (doc) => {
  if (confirm('Are you sure you want to delete this document?')) {
    try {
      await documentStore.deleteDocument(doc.id)
    } catch (error) {
      console.error('Error deleting document:', error)
      // Handle error (show notification, etc.)
    }
  }
}
</script>

<style scoped>
.view-docs {
  padding: 1rem;
}

.filters {
  margin-bottom: 2rem;
}

.search-box {
  margin-bottom: 1rem;
}

.search-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
}

.filter-buttons {
  display: flex;
  gap: 0.5rem;
}

.filter-button {
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background-color: white;
  color: #374151;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-button:hover {
  background-color: #f3f4f6;
}

.filter-button.active {
  background-color: #2563eb;
  border-color: #2563eb;
  color: white;
}

.documents-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.document-card {
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  overflow: hidden;
  transition: all 0.2s;
}

.document-card:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transform: translateY(-2px);
}

.document-header {
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e5e7eb;
}

.document-type {
  text-transform: uppercase;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
}

.document-type.buyer-rep {
  background-color: #dbeafe;
  color: #1e40af;
}

.document-type.seller-rep {
  background-color: #dcfce7;
  color: #166534;
}

.document-type.mls {
  background-color: #fef3c7;
  color: #92400e;
}

.document-date {
  font-size: 0.75rem;
  color: #6b7280;
}

.document-preview {
  height: 200px;
  background-color: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cover-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.no-photo {
  color: #9ca3af;
}

.document-content {
  padding: 1rem;
}

.document-title {
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.5rem;
}

.document-details {
  font-size: 0.875rem;
  color: #6b7280;
}

.document-actions {
  padding: 1rem;
  display: flex;
  gap: 0.5rem;
  border-top: 1px solid #e5e7eb;
}

.action-button {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  padding: 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
}

.action-button svg {
  width: 1rem;
  height: 1rem;
}

.action-button.view {
  background-color: #eff6ff;
  color: #1e40af;
}

.action-button.view:hover {
  background-color: #dbeafe;
}

.action-button.download {
  background-color: #f0fdf4;
  color: #166534;
}

.action-button.download:hover {
  background-color: #dcfce7;
}

.action-button.delete {
  background-color: #fef2f2;
  color: #991b1b;
}

.action-button.delete:hover {
  background-color: #fee2e2;
}
</style>
