<template>
  <div class="documents-container">
    <h1>Documents</h1>

    <div class="documents-header">
      <div class="search-filter">
        <div class="search-box">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search documents..."
          />
          <button class="search-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>
        <div class="filter-dropdown">
          <select v-model="selectedType">
            <option value="">All Documents</option>
            <option value="buyer-rep">Buyer Agreements</option>
            <option value="seller-rep">Seller Agreements</option>
            <option value="mls">MLS Listings</option>
          </select>
        </div>
      </div>
      <button class="upload-button" @click="handleUpload">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="17 8 12 3 7 8"></polyline>
          <line x1="12" y1="3" x2="12" y2="15"></line>
        </svg>
        Upload Document
      </button>
    </div>

    <div v-if="isLoading" class="loading-state">
      Loading documents...
    </div>

    <div v-else-if="filteredDocuments.length === 0" class="empty-state">
      <div class="empty-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      </div>
      <h2>No Documents Found</h2>
      <p>{{ searchQuery || selectedType ? 'Try adjusting your filters' : 'Upload important documents related to your real estate journey.' }}</p>
    </div>

    <div v-else class="documents-list">
      <div v-for="doc in filteredDocuments" :key="doc.id" class="document-card">
        <div class="document-icon" :class="getDocumentIconClass(doc.type)">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
          </svg>
        </div>
        <div class="document-info">
          <h3>{{ getDocumentTitle(doc) }}</h3>
          <p class="document-meta">
            Added: {{ formatDate(doc.createdAt) }} •
            {{ doc.files && doc.files.length > 0 ? formatFileSize(doc.files[0].size) : 'No files' }}
          </p>
          <div v-if="doc.agents && doc.agents.length > 0" class="document-agent">
            <div class="agent-avatar">
              <img
                :src="doc.agents[0].avatar"
                :alt="doc.agents[0].name"
                @error="handleAvatarError"
              >
            </div>
            <span>{{ doc.agents[0].name }}</span>
            <span class="agent-experience">{{ doc.agents[0].experience }}</span>
          </div>
        </div>
        <div class="document-actions">
          <button class="action-button view" @click="viewDocument(doc)" title="View">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </button>
          <button class="action-button download" @click="downloadDocument(doc)" title="Download">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useDocumentStore } from '@/stores/documents';
import { useRouter } from 'vue-router';

const router = useRouter();
const documentStore = useDocumentStore();
const isLoading = ref(true);
const searchQuery = ref('');
const selectedType = ref('');

// Handle avatar loading error
const handleAvatarError = (e) => {
  e.target.src = 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739408381/Screenshot_2025-02-13_015617_mhjgby.png';
};

// Get documents for the current client (using ID 1 for demo)
const currentClientId = 1;

const documents = computed(() => {
  return documentStore.documents.filter(doc => doc.clientId === currentClientId);
});

const filteredDocuments = computed(() => {
  let filtered = documents.value;

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(doc => {
      const searchableContent = [
        getDocumentTitle(doc),
        doc.type,
        doc.agents?.map(a => a.name).join(' ') || ''
      ].join(' ').toLowerCase();
      return searchableContent.includes(query);
    });
  }

  // Apply type filter
  if (selectedType.value) {
    filtered = filtered.filter(doc => doc.type === selectedType.value);
  }

  return filtered;
});

// Format date helper
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Format file size helper
const formatFileSize = (bytes) => {
  if (!bytes) return '0 B';
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
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

// Get document icon class helper
const getDocumentIconClass = (type) => {
  switch (type) {
    case 'buyer-rep':
      return 'buyer-rep';
    case 'seller-rep':
      return 'seller-rep';
    case 'mls':
      return 'mls';
    default:
      return 'default';
  }
};

// Document actions
const viewDocument = (doc) => {
  router.push(`/documents/${doc.id}`);
};

const downloadDocument = (doc) => {
  // Implement document download logic
  console.log('Downloading document:', doc.id);
};

const handleUpload = () => {
  // Implement document upload logic
  console.log('Opening upload modal');
};

onMounted(() => {
  // Simulate loading delay
  setTimeout(() => {
    isLoading.value = false;
  }, 1000);
});
</script>

<style scoped>
.documents-container {
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
}

h1 {
  margin-bottom: 24px;
  font-size: 28px;
  font-weight: 600;
  color: #333;
}

.documents-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.search-filter {
  display: flex;
  gap: 12px;
}

.search-box {
  position: relative;
  width: 300px;
}

.search-box input {
  width: 100%;
  padding: 10px 40px 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
}

.search-button {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
}

.filter-dropdown select {
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  background-color: white;
  cursor: pointer;
}

.upload-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background-color: #1a4189;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.upload-button:hover {
  background-color: #133267;
}

.documents-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.document-card {
  display: flex;
  align-items: center;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  padding: 16px;
}

.document-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 8px;
  margin-right: 16px;
}

.document-icon.pdf {
  background-color: #ffebee;
  color: #f44336;
}

.document-icon.docx {
  background-color: #e3f2fd;
  color: #2196f3;
}

.document-info {
  flex: 1;
}

.document-info h3 {
  margin: 0 0 4px;
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

.document-meta {
  margin: 0;
  font-size: 13px;
  color: #666;
}

.document-actions {
  display: flex;
  gap: 8px;
}

.action-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
}

.action-button.view {
  background-color: #e6f7ff;
  color: #1890ff;
}

.action-button.view:hover {
  background-color: #bae7ff;
}

.action-button.download {
  background-color: #f0f5ff;
  color: #2f54eb;
}

.action-button.download:hover {
  background-color: #d6e4ff;
}

/* Media Queries */
@media (max-width: 992px) {
  .search-box {
    width: 250px;
  }
}

@media (max-width: 768px) {
  .documents-container {
    padding: 16px;
  }

  .documents-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .search-filter {
    flex-direction: column;
    width: 100%;
  }

  .search-box {
    width: 100%;
  }

  .filter-dropdown select {
    width: 100%;
  }

  .upload-button {
    width: 100%;
    justify-content: center;
  }
}

.loading-state {
  text-align: center;
  padding: 40px;
  color: #666;
}

.empty-state {
  text-align: center;
  padding: 40px;
}

.empty-icon {
  margin-bottom: 16px;
  color: #999;
}

.empty-state h2 {
  margin: 0 0 8px;
  color: #333;
}

.empty-state p {
  margin: 0;
  color: #666;
}

.document-agent {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  font-size: 13px;
  color: #666;
}

.agent-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  overflow: hidden;
}

.agent-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.agent-experience {
  color: #999;
  font-size: 12px;
}

.document-icon.buyer-rep {
  background-color: #e6f7ff;
  color: #1890ff;
}

.document-icon.seller-rep {
  background-color: #f6ffed;
  color: #52c41a;
}

.document-icon.mls {
  background-color: #fff7e6;
  color: #fa8c16;
}
</style>
