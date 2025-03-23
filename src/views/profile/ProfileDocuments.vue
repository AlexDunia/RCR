<template>
  <div class="documents-container">
    <div class="documents-header">
      <div>
        <h2>Your docs</h2>
        <p>A list of all documents you have received, or shared.</p>
      </div>
    </div>

    <div v-if="isLoading" class="documents-loader">
      <Loader v-for="n in 3" :key="n" />
    </div>
    <div v-else class="documents-table">
      <div class="table-header">
        <div class="header-cell title">Title <span class="sort-icon">↕</span></div>
        <div class="header-cell description">Description <span class="sort-icon">↕</span></div>
        <div class="header-cell date">Date</div>
        <div class="header-cell action">Action</div>
      </div>

      <div v-for="doc in paginatedDocuments" :key="doc.id" class="table-row">
        <div class="cell title">
          <div class="title-container">
            <span class="document-badge" :class="doc.type">{{ doc.type }}</span>
            <span class="document-title" :title="getDocumentTitle(doc)">
              {{ truncateText(getDocumentTitle(doc), 30) }}
            </span>
          </div>
        </div>
        <div class="cell description">{{ doc.description || 'No description available' }}</div>
        <div class="cell date">{{ formatDate(doc.createdAt) }}</div>
        <div class="cell action">
          <button @click="editDocument(doc.id)" class="edit-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
          </button>
          <button @click="confirmDelete(doc.id)" class="delete-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div class="pagination">
      <button class="pagination-btn" @click="goToFirstPage" :disabled="currentPage === 1">«</button>
      <button class="pagination-btn" @click="goToPrevPage" :disabled="currentPage === 1">‹</button>

      <button
        v-for="page in pageNumbers"
        :key="page"
        class="pagination-btn"
        :class="{ active: page === currentPage }"
        @click="goToPage(page)"
      >
        {{ page }}
      </button>

      <button class="pagination-btn" @click="goToNextPage" :disabled="currentPage === totalPages">›</button>
      <button class="pagination-btn" @click="goToLastPage" :disabled="currentPage === totalPages">»</button>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="modal-overlay">
      <div class="modal-container">
        <div class="modal-header">
          <h3>Confirm Delete</h3>
        </div>
        <div class="modal-body">
          <p>Are you sure you want to delete this document?</p>
          <p class="modal-warning">This action cannot be undone.</p>
        </div>
        <div class="modal-footer">
          <button @click="cancelDelete" class="cancel-btn">Cancel</button>
          <button @click="deleteDocument" class="confirm-btn">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useDocumentStore } from '@/stores/documents';
import Loader from "@/ui/Loader.vue";

const router = useRouter();
const documentStore = useDocumentStore();
const showDeleteModal = ref(false);
const documentToDelete = ref(null);
const isLoading = ref(true);

// Pagination state
const currentPage = ref(1);
const itemsPerPage = ref(10);
const totalPages = computed(() => Math.ceil(sortedDocuments.value.length / itemsPerPage.value));

// Paginated documents
const paginatedDocuments = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return sortedDocuments.value.slice(start, end);
});

// Pagination methods
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const goToFirstPage = () => goToPage(1);
const goToLastPage = () => goToPage(totalPages.value);
const goToPrevPage = () => goToPage(currentPage.value - 1);
const goToNextPage = () => goToPage(currentPage.value + 1);

// Generate page numbers for pagination
const pageNumbers = computed(() => {
  const pages = [];
  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage.value - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages.value, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return pages;
});

// Load documents on mount
onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 1000);
});

// Sort documents by date
const sortedDocuments = computed(() => {
  return documentStore.documents
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
});

// Format date helper
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Get document title helper
const getDocumentTitle = (doc) => {
  switch (doc.type) {
    case 'buyer-rep':
      return `${doc.buyerName}'s Buyer Rep Agreement`;
    case 'seller-rep':
      return `${doc.sellerName}'s Seller Rep Agreement`;
    case 'mls':
      return `MLS Listing - ${doc.propertyAddress}`;
    default:
      return 'Untitled Document';
  }
};

// Edit document function
const editDocument = (id) => {
  router.push({
    name: 'ProfileDocumentEdit',
    params: { id }
  });
};

// Delete confirmation
const confirmDelete = (id) => {
  documentToDelete.value = id;
  showDeleteModal.value = true;
};

// Cancel delete
const cancelDelete = () => {
  showDeleteModal.value = false;
  documentToDelete.value = null;
};

// Delete document
const deleteDocument = async () => {
  try {
    // Here you would typically make an API call to delete the document
    await documentStore.deleteDocument(documentToDelete.value);
    showDeleteModal.value = false;
    documentToDelete.value = null;
  } catch (error) {
    console.error('Error deleting document:', error);
  }
};

// Add truncate text helper
const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};
</script>

<style scoped>
.documents-container {
  padding: 40px 32px;
  margin: 0 auto;
  background-color: #F9FAFB;
  min-height: 100vh;
}

.documents-header {
  max-width: 960px;
  margin: 0 auto 40px;
  padding: 0 24px;
}

.documents-header h2 {
  font-size: 20px;
  font-weight: 500;
  color: #111827;
  margin: 0 0 12px 0;
  letter-spacing: -0.2px;
}

.documents-header p {
  font-size: 14px;
  color: #0066FF;
  margin: 0;
  letter-spacing: -0.1px;
}

.documents-table {
  max-width: 960px;
  margin: 0 auto 32px;
  padding: 4px 0;
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.table-header {
  display: grid;
  grid-template-columns: 2fr 3fr 1fr 1fr;
  background-color: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}

.header-cell {
  padding: 16px 20px;
  font-weight: 500;
  color: #374151;
  font-size: 14px;
  display: flex;
  align-items: center;
}

.sort-icon {
  margin-left: 4px;
  color: #9ca3af;
}

.table-row {
  display: grid;
  align-items:center;
  padding:2px;
  grid-template-columns: 2fr 3fr 1fr 1fr;
  border-bottom: 1px solid #e5e7eb;
}

.table-row:last-child {
  border-bottom: none;
}

.cell {
  padding: 16px 20px;
  font-size: 14px;
  color: #111827;
}

.cell.title {
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
}

.cell.description {
  color: #4b5563;
}

.cell.date {
  color: #6b7280;
}

.cell.action {
  display: flex;
  gap: 12px;
  align-items: center;
}

.edit-btn, .delete-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.edit-btn {
  color: #2563eb;
}

.delete-btn {
  color: #ef4444;
}

.edit-btn:hover {
  background-color: rgba(37, 99, 235, 0.1);
}

.delete-btn:hover {
  background-color: rgba(239, 68, 68, 0.1);
}

.pagination {
  max-width: 960px;
  margin: 40px auto;
  padding: 0 24px;
  display: flex;
  justify-content: center;
  gap: 6px;
}

.pagination-btn {
  padding: 8px 12px;
  border: 1px solid #e5e7eb;
  background-color: white;
  color: #4b5563;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.pagination-btn:hover {
  background-color: #f3f4f6;
}

.pagination-btn.active {
  background-color: #2563eb;
  color: white;
  border-color: #2563eb;
}

.pagination-ellipsis {
  display: flex;
  align-items: center;
  padding: 0 8px;
  color: #6b7280;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.modal-container {
  background-color: white;
  border-radius: 12px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin: 0 16px;
}

.modal-header {
  padding: 16px 24px;
  border-bottom: 1px solid #e5e7eb;
}

.modal-header h3 {
  margin: 0;
  font-size: 18px;
  color: #111827;
  font-weight: 600;
}

.modal-body {
  padding: 24px;
}

.modal-body p {
  margin: 0 0 16px;
  color: #4b5563;
}

.modal-warning {
  color: #ef4444 !important;
  font-weight: 500;
}

.modal-footer {
  padding: 16px 24px;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.cancel-btn {
  padding: 8px 16px;
  background-color: white;
  border: 1px solid #e5e7eb;
  color: #4b5563;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.confirm-btn {
  padding: 8px 16px;
  background-color: #ef4444;
  border: 1px solid #ef4444;
  color: white;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.cancel-btn:hover {
  background-color: #f3f4f6;
}

.confirm-btn:hover {
  background-color: #dc2626;
}

.title-container {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.document-badge {
  font-size: 0.65rem;
  font-weight: 600;
  padding: 0.15rem 0.4rem;
  border-radius: 9999px;
  text-transform: uppercase;
  width: fit-content;
}

.document-title {
  font-weight: 500;
  color: #111827;
  cursor: help;
}

/* Update existing badge styles */
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

.documents-loader {
  max-width: 960px;
  margin: 0 auto 32px;
  padding: 24px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .documents-container {
    padding: 32px 24px;
  }

  .documents-header {
    margin-bottom: 32px;
    padding: 0 16px;
  }

  .cell, .header-cell {
    padding: 14px 16px;
  }

  .documents-loader {
    padding: 20px;
    margin-bottom: 24px;
  }

  .pagination {
    margin: 32px auto;
    padding: 0 16px;
  }
}

@media (max-width: 640px) {
  .documents-container {
    padding: 24px 16px;
  }

  .documents-header {
    margin-bottom: 24px;
    padding: 0 12px;
  }

  .cell, .header-cell {
    padding: 12px;
  }

  .documents-loader {
    padding: 16px;
    margin-bottom: 20px;
  }

  .pagination {
    margin: 24px auto;
    padding: 0 12px;
  }
}
</style>
