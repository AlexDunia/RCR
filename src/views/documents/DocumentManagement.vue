<!-- src/views/documents/DocumentManagement.vue -->
<template>
  <div class="document-grid">
    <router-link to="/receipts-docs/buyer-rep" class="document-card">
      <div class="card-icon buyer">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z"/>
        </svg>
      </div>
      <h3>Buyer Rep</h3>
      <p>Create and manage buyer representation agreements</p>
    </router-link>

    <router-link to="/receipts-docs/seller-rep" class="document-card">
      <div class="card-icon seller">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z"/>
        </svg>
      </div>
      <h3>Seller Rep</h3>
      <p>Create and manage seller representation agreements</p>
    </router-link>

    <router-link to="/receipts-docs/mls" class="document-card">
      <div class="card-icon mls">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V3.375c0-1.036-.84-1.875-1.875-1.875H5.625zM7.5 15a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 017.5 15zm.75-2.25h7.5a.75.75 0 000-1.5h-7.5a.75.75 0 000 1.5zM7.5 9a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 017.5 9z"/>
        </svg>
      </div>
      <h3>MLS</h3>
      <p>Create and manage MLS listings</p>
    </router-link>

    <router-link to="/receipts-docs/view-docs" class="document-card">
      <div class="card-icon view">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
          <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
        </svg>
      </div>
      <h3>View Documents</h3>
      <p>View and manage all your documents</p>
    </router-link>
  </div>

  <div class="recent-documents" v-if="recentDocuments.length > 0">
    <h2 class="section-title">Recent Documents</h2>
    <div class="documents-list">
      <div
        v-for="doc in recentDocuments"
        :key="doc.id"
        class="document-item"
        @click="viewDocument(doc)"
      >
        <div class="document-info">
          <span class="document-badge" :class="doc.type">{{ doc.type }}</span>
          <h4 class="document-name">{{ getDocumentTitle(doc) }}</h4>
          <p class="document-date">{{ formatDate(doc.createdAt) }}</p>
        </div>
        <div class="document-arrow">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useDocumentStore } from '@/stores/documents'

const router = useRouter()
const documentStore = useDocumentStore()

const recentDocuments = computed(() => {
  return documentStore.documents
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5)
})

const viewDocument = (doc) => {
  // Navigate to view-docs and store the selected document ID for highlighting
  router.push({
    path: '/receipts-docs/view-docs',
    query: { highlight: doc.id }
  })
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
</script>

<style scoped>
.document-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  width: 100%;
}

.document-card {
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  border: 1px solid #E5E7EB;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  transition: all 0.2s;
}

.document-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.card-icon svg {
  width: 1.75rem;
  height: 1.75rem;
}

.card-icon.buyer {
  background-color: #3B82F6;
  color: white;
}

.card-icon.seller {
  background-color: #10B981;
  color: white;
}

.card-icon.mls {
  background-color: #F97316;
  color: white;
}

.card-icon.view {
  background-color: #8B5CF6;
  color: white;
}

h3 {
  color: #111827;
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
}

p {
  color: #6B7280;
  font-size: 0.875rem;
  margin: 0;
  line-height: 1.4;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 1rem;
}

.documents-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.document-item {
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.2s;
}

.document-item:hover {
  background-color: #f9fafb;
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
}

.document-date {
  font-size: 0.75rem;
  color: #6b7280;
}

.document-arrow {
  color: #9ca3af;
}
</style>
