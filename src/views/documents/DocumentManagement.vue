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
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useDocumentStore } from '@/stores/documents'
import Loader from "@/ui/Loader.vue";

const documentStore = useDocumentStore()
const isLoading = ref(true)

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
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 17px;
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
  margin-top:14px;
  margin-bottom:14px;
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

.documents-loader {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}

.title-loader {
  height: 30px !important;
}
</style>
