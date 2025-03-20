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
            <DocumentList :documents="recentDocuments" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useDocumentStore } from '@/stores/documents'
import Loader from "@/components/Loader.vue";
import DocumentList from "@/features/documents/components/DocumentList.vue";
import { getRecentDocuments } from "@/features/documents/DocumentService";

const documentStore = useDocumentStore()
const isLoading = ref(true)

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 1000)
})

const recentDocuments = computed(() => {
  return getRecentDocuments(documentStore.documents);
})
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
