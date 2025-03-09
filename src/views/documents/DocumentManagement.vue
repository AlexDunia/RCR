<!-- src/views/documents/DocumentManagement.vue -->
<template>
  <div class="recent-documents" v-if="recentDocuments.length > 0">
    <h2 class="section-title">Recent Documents</h2>
    <div class="documents-list">
      <router-link
        v-for="doc in recentDocuments"
        :key="doc.id"
        :to="{ name: 'DocumentDetail', params: { id: doc.id }}"
        class="document-item"
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
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useDocumentStore } from '@/stores/documents'

const documentStore = useDocumentStore()

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
  position: relative;
  overflow: hidden;
}

.document-card::after {
  content: "Supports PDF, DOC, DOCX, JPG, PNG";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0.5rem 1.5rem;
  background: #F8FAFC;
  color: #64748B;
  font-size: 0.75rem;
  border-top: 1px solid #E5E7EB;
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
  border-radius: 0.5rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 10px;
  text-decoration: none;
}

.document-item:hover {
  background-color: #f9fafb;
  border-color: #2563EB;
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

.recent-documents {
  margin-top: 2rem;
}
</style>
