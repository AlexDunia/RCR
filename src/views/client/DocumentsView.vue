<template>
  <div class="documents-container">
    <div class="page-title-section">
      <h1>Your Documents</h1>
      <div class="notification-badge">
        <span class="count">{{ isLoading ? '...' : filteredDocuments.length }}</span>
        <span>documents</span>
      </div>
    </div>

    <div class="documents-toolbar">
      <div class="search-filter">
        <div class="search-box">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search documents..."
            :disabled="isLoading"
          />
          <button class="search-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>
        <div class="document-categories">
          <button
            class="category-btn"
            :class="{ active: selectedType === '' }"
            @click="selectedType = ''"
            :disabled="isLoading"
          >
            All Documents
          </button>
          <button
            class="category-btn"
            :class="{ active: selectedType === 'buyer-rep' }"
            @click="selectedType = 'buyer-rep'"
            :disabled="isLoading"
          >
            Buyer Agreements
          </button>
          <button
            class="category-btn"
            :class="{ active: selectedType === 'seller-rep' }"
            @click="selectedType = 'seller-rep'"
            :disabled="isLoading"
          >
            Seller Agreements
          </button>
          <button
            class="category-btn"
            :class="{ active: selectedType === 'mls' }"
            @click="selectedType = 'mls'"
            :disabled="isLoading"
          >
            MLS Listings
          </button>
        </div>
      </div>
      <button class="upload-button" @click="showUploadModal = true">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="17 8 12 3 7 8"></polyline>
          <line x1="12" y1="3" x2="12" y2="15"></line>
        </svg>
        Upload Document
      </button>
    </div>

    <div v-if="isLoading" class="documents-grid">
      <div v-for="i in 6" :key="i" class="document-card skeleton-card">
        <div class="document-card-header">
          <div class="skeleton skeleton-icon"></div>
          <div class="skeleton skeleton-badge"></div>
        </div>
        <div class="document-card-body">
          <div class="skeleton skeleton-title"></div>
          <div class="skeleton skeleton-meta"></div>
        </div>
        <div class="document-card-footer">
          <div class="skeleton-agent">
            <div class="skeleton skeleton-avatar"></div>
            <div class="skeleton-agent-info">
              <div class="skeleton skeleton-name"></div>
              <div class="skeleton skeleton-experience"></div>
            </div>
          </div>
          <div class="skeleton-actions">
            <div class="skeleton skeleton-action"></div>
            <div class="skeleton skeleton-action"></div>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="filteredDocuments.length === 0" class="empty-state">
      <div class="empty-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      </div>
      <h2>No Documents Found</h2>
      <p>{{ searchQuery || selectedType ? 'Try adjusting your search filters' : 'Upload important documents related to your real estate journey.' }}</p>
      <button class="empty-state-button" @click="showUploadModal = true">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="17 8 12 3 7 8"></polyline>
          <line x1="12" y1="3" x2="12" y2="15"></line>
        </svg>
        Upload Your First Document
      </button>
    </div>

    <div v-else class="documents-grid">
      <div v-for="doc in filteredDocuments" :key="doc.id" class="document-card" @click="viewDocument(doc)">
        <div class="document-card-header">
          <div class="document-icon" :class="getDocumentIconClass(doc.type)">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
            </svg>
          </div>
          <div class="document-type-badge" :class="doc.type">
            {{ formatDocumentType(doc.type) }}
          </div>
        </div>
        <div class="document-card-body">
          <h3 class="document-title">{{ getDocumentTitle(doc) }}</h3>
          <p class="document-meta">
            Added: {{ formatDate(doc.createdAt) }} •
            {{ doc.files && doc.files.length > 0 ? formatFileSize(doc.files[0].size) : 'No files' }}
          </p>
        </div>
        <div class="document-card-footer">
          <div v-if="doc.agents && doc.agents.length > 0" class="document-agent">
            <div class="agent-avatar">
              <img
                :src="doc.agents[0].avatar"
                :alt="doc.agents[0].name"
                @error="handleAvatarError"
              >
            </div>
            <div class="agent-info">
              <span class="agent-name">{{ doc.agents[0].name }}</span>
              <span class="agent-experience">{{ doc.agents[0].experience }}</span>
            </div>
          </div>
          <div class="document-actions">
            <button class="action-button view" @click.stop="viewDocument(doc)" title="View">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </button>
            <button class="action-button download" @click.stop="downloadDocument(doc)" title="Download">
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

    <div v-if="showUploadModal" class="modal-overlay" @click.self="showUploadModal = false">
      <div class="modal-container">
        <div class="modal-header">
          <h3>Upload Document</h3>
          <button @click="showUploadModal = false" class="modal-close">&times;</button>
        </div>
        <div class="modal-body">
          <div class="upload-area" @drop.prevent="handleFileDrop" @dragover.prevent @dragenter.prevent="isDragging = true" @dragleave.prevent="isDragging = false" :class="{ 'dragging': isDragging }">
            <div class="upload-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 12V19M12 12L15 15M12 12L9 15M20 16.7428C21.2215 15.734 22 14.2079 22 12.5C22 9.46243 19.5376 7 16.5 7C16.2815 7 16.0771 7.01349 15.8767 7.03857C14.9827 4.67583 12.6997 3 10 3C6.13401 3 3 6.13401 3 10C3 12.2501 4.07741 14.2509 5.75 15.4805" />
              </svg>
            </div>
            <div class="upload-text">
              Drag & drop files here or
              <button @click="triggerFileInput" class="browse-link">Browse</button>
            </div>
            <div class="upload-formats">
              Supported formats: PDF, DOC, XLS, PPT, JPG, PNG
            </div>
            <input
              type="file"
              ref="fileInput"
              @change="handleFileSelect"
              multiple
              accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png"
              class="hidden"
            />
          </div>

          <div v-if="uploadedFiles.length > 0" class="uploaded-files">
            <div v-for="(file, index) in uploadedFiles" :key="index" class="file-item">
              <div class="file-info">
                <div class="file-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                  </svg>
                </div>
                <div class="file-details">
                  <span class="file-name">{{ file.name }}</span>
                  <span class="file-type">{{ formatFileSize(file.size) }}</span>
                </div>
              </div>
              <button class="file-remove" @click="removeFile(index)" title="Remove">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-cancel" @click="showUploadModal = false">Cancel</button>
          <button class="btn-upload" @click="uploadFiles" :disabled="uploadedFiles.length === 0">
            Upload
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
const showUploadModal = ref(false);
const uploadedFiles = ref([]);
const isDragging = ref(false);
const fileInput = ref(null);

// Handle avatar loading error
const handleAvatarError = (e) => {
  e.target.src = 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739408381/Screenshot_2025-02-13_015617_mhjgby.png';
};

// Get documents for the current client (using ID 1 for demo)
const currentClientId = 1;

// Format document type for display
const formatDocumentType = (type) => {
  switch (type) {
    case 'buyer-rep':
      return 'Buyer Agreement';
    case 'seller-rep':
      return 'Seller Agreement';
    case 'mls':
      return 'MLS Listing';
    default:
      return 'Document';
  }
};

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

// Upload document modal methods
const triggerFileInput = () => {
  fileInput.value.click();
};

const handleFileSelect = (event) => {
  const files = Array.from(event.target.files);
  if (files.length > 0) {
    addFiles(files);
    // Reset input to allow selecting the same file again
    event.target.value = '';
  }
};

const handleFileDrop = (event) => {
  isDragging.value = false;
  const files = Array.from(event.dataTransfer.files);
  if (files.length > 0) {
    addFiles(files);
  }
};

const addFiles = (files) => {
  // Limit to 5 files at once for better UX
  const maxFiles = 5;
  const filesToAdd = files.slice(0, maxFiles);

  filesToAdd.forEach(file => {
    const fileObj = {
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      preview: file.type.includes('image/') ? URL.createObjectURL(file) : null,
      status: 'ready' // ready, uploading, error
    };
    uploadedFiles.value.push(fileObj);
  });

  if (files.length > maxFiles) {
    console.warn(`Only the first ${maxFiles} files were added. Please upload in smaller batches.`);
  }
};

const removeFile = (index) => {
  const file = uploadedFiles.value[index];
  if (file.preview) {
    URL.revokeObjectURL(file.preview);
  }
  uploadedFiles.value.splice(index, 1);
};

const uploadFiles = async () => {
  if (uploadedFiles.value.length === 0) return;

  // Set all files to uploading state
  uploadedFiles.value.forEach(file => {
    file.status = 'uploading';
  });

  try {
    // Simulate upload process with a delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Create a new document object
    const newDocument = {
      type: 'buyer-rep',
      buyerName: 'Alex Dunia',
      clientId: currentClientId,
      description: 'Upload from client portal',
      createdAt: new Date().toISOString().split('T')[0],
      files: uploadedFiles.value.map(file => ({
        name: file.name,
        type: file.type,
        size: file.size
      }))
    };

    // Add the document to the store
    await documentStore.addDocument(newDocument);

    // Clear the upload modal
    uploadedFiles.value = [];
    showUploadModal.value = false;

    // Refresh the documents list
    await documentStore.fetchDocumentsByClientId(currentClientId);

  } catch (error) {
    console.error('Error uploading document:', error);
    // Mark files as error
    uploadedFiles.value.forEach(file => {
      file.status = 'error';
    });
  }
};

const handleUpload = () => {
  showUploadModal.value = true;
};

onMounted(async () => {
  try {
    // Fetch documents from store
    await documentStore.fetchDocumentsByClientId(currentClientId);
  } catch (error) {
    console.error('Error loading documents:', error);
  } finally {
    // Set loading to false after a brief delay for UX
    // Extended delay to allow users to appreciate the skeleton animation
    setTimeout(() => {
      isLoading.value = false;
    }, 1500);
  }
});
</script>

<style scoped>
.documents-container {
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
}

.page-title-section {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
  position: relative;
  padding-bottom: 8px;
}

.page-title-section::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 80px;
  height: 3px;
  background: linear-gradient(to right, #1a4189, #4f7de3);
  border-radius: 8px;
}

h1 {
  margin: 0;
  font-size: 32px;
  font-weight: 700;
  color: #1a4189;
  letter-spacing: -0.5px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.notification-badge {
  display: flex;
  align-items: center;
  background: linear-gradient(145deg, #e9f5ff, #d0eaff);
  color: #0a66c2;
  border-radius: 20px;
  padding: 6px 14px;
  font-size: 14px;
  box-shadow: 0 2px 4px rgba(10, 102, 194, 0.1);
  transition: all 0.3s ease;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 2px 4px rgba(10, 102, 194, 0.1);
  }
  50% {
    box-shadow: 0 2px 12px rgba(10, 102, 194, 0.2);
  }
  100% {
    box-shadow: 0 2px 4px rgba(10, 102, 194, 0.1);
  }
}

.documents-toolbar {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 32px;
}

.search-filter {
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
}

.search-box {
  position: relative;
  max-width: 400px;
}

.search-box input {
  width: 100%;
  padding: 12px 40px 12px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.search-button {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
}

.document-categories {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.category-btn {
  padding: 8px 16px;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  font-size: 14px;
  color: #475569;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.category-btn:hover {
  background-color: #f1f5f9;
  border-color: #cbd5e1;
  transform: translateY(-1px);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.08);
}

.category-btn.active {
  background: linear-gradient(145deg, #1a4189, #2e5cb8);
  border-color: #1a4189;
  color: white;
  box-shadow: 0 4px 8px rgba(26, 65, 137, 0.3);
}

.upload-button {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 24px;
  background: linear-gradient(145deg, #1a4189, #2e5cb8);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 5px 15px rgba(26, 65, 137, 0.3);
  position: relative;
  overflow: hidden;
}

.upload-button:hover {
  background: linear-gradient(145deg, #2e5cb8, #1a4189);
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(26, 65, 137, 0.4);
}

.upload-button:active {
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(26, 65, 137, 0.3);
}

.upload-button::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: rgba(255, 255, 255, 0.1);
  transform: rotate(45deg);
  opacity: 0;
  transition: all 0.5s ease;
}

.upload-button:hover::after {
  opacity: 1;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%) rotate(45deg);
  }
  100% {
    transform: translateX(100%) rotate(45deg);
  }
}

.documents-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

.document-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  border: 1px solid #f0f0f0;
  position: relative;
}

.document-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.1);
  border-color: #d0e1fd;
}

.document-card:hover .document-card-header {
  background: linear-gradient(45deg, #f8fbff, #edf5ff);
}

.document-card:hover .document-icon {
  transform: scale(1.1) rotate(5deg);
}

.document-card:hover .action-button {
  opacity: 1;
  transform: translateY(0);
}

.document-card-header {
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background: #f9fafc;
  transition: all 0.3s ease;
  border-bottom: 1px solid #f0f0f0;
}

.document-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: 12px;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}

.document-type-badge {
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.3px;
  text-transform: uppercase;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.document-type-badge.buyer-rep {
  background: linear-gradient(145deg, #e8f0fe, #c5d9f8);
  color: #1967d2;
}

.document-type-badge.seller-rep {
  background: linear-gradient(145deg, #e6f7ff, #c2f0e4);
  color: #08916d;
}

.document-type-badge.mls {
  background: linear-gradient(145deg, #fff8e1, #ffe8a3);
  color: #e67700;
}

.document-card-body {
  padding: 20px 24px;
  flex-grow: 1;
}

.document-title {
  margin: 0 0 12px;
  font-size: 18px;
  font-weight: 600;
  color: #1a3a6a;
  line-height: 1.4;
  transition: color 0.3s ease;
}

.document-card:hover .document-title {
  color: #1a4189;
}

.document-meta {
  margin: 0;
  font-size: 14px;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 8px;
}

.document-meta::before {
  content: '';
  display: inline-block;
  width: 4px;
  height: 4px;
  background-color: #cbd5e1;
  border-radius: 50%;
}

.document-card-footer {
  padding: 16px 24px;
  border-top: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(249,250,251,0.5) 100%);
}

.document-agent {
  display: flex;
  align-items: center;
  gap: 12px;
}

.agent-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.document-card:hover .agent-avatar {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.agent-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.5s ease;
}

.document-card:hover .agent-avatar img {
  transform: scale(1.1);
}

.agent-info {
  display: flex;
  flex-direction: column;
}

.agent-name {
  font-size: 14px;
  font-weight: 500;
  color: #1a3a6a;
}

.agent-experience {
  font-size: 12px;
  color: #64748b;
}

.document-actions {
  display: flex;
  gap: 8px;
}

.action-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  opacity: 0.8;
  transform: translateY(5px);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.action-button.view {
  background: linear-gradient(145deg, #e6f7ff, #c5e8ff);
  color: #0a84ff;
}

.action-button.view:hover {
  background: linear-gradient(145deg, #c5e8ff, #a6d8ff);
  transform: translateY(-2px);
  box-shadow: 0 5px 10px rgba(10, 132, 255, 0.3);
}

.action-button.download {
  background: linear-gradient(145deg, #f0f5ff, #d6e4ff);
  color: #2f54eb;
}

.action-button.download:hover {
  background: linear-gradient(145deg, #d6e4ff, #b8c7ff);
  transform: translateY(-2px);
  box-shadow: 0 5px 10px rgba(47, 84, 235, 0.3);
}

.document-icon.buyer-rep {
  background: linear-gradient(145deg, #e8f0fe, #c5d9f8);
  color: #1967d2;
}

.document-icon.seller-rep {
  background: linear-gradient(145deg, #e6f7ff, #c2f0e4);
  color: #08916d;
}

.document-icon.mls {
  background: linear-gradient(145deg, #fff8e1, #ffe8a3);
  color: #e67700;
}

.loading-state {
  text-align: center;
  padding: 60px 20px;
  color: #6b7280;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #e6e8eb;
  border-top-color: #1a4189;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(180deg, rgba(249,250,251,0) 0%, rgba(241,245,249,0.3) 100%);
  border-radius: 24px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.03);
  border: 1px dashed #e2e8f0;
}

.empty-icon {
  margin-bottom: 24px;
  color: #94a3b8;
  animation: float 4s ease-in-out infinite;
}

@keyframes float {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
}

.empty-state h2 {
  margin: 0 0 16px;
  font-size: 26px;
  font-weight: 700;
  color: #1e293b;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.empty-state p {
  margin: 0 0 32px;
  color: #64748b;
  max-width: 450px;
  font-size: 16px;
  line-height: 1.6;
}

.empty-state-button {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 28px;
  background: linear-gradient(145deg, #1a4189, #2e5cb8);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 5px 15px rgba(26, 65, 137, 0.3);
  transform-origin: center;
  animation: pulse-button 2s infinite;
}

.empty-state-button:hover {
  background: linear-gradient(145deg, #2e5cb8, #1a4189);
  transform: translateY(-3px) scale(1.03);
  box-shadow: 0 8px 20px rgba(26, 65, 137, 0.4);
  animation: none;
}

@keyframes pulse-button {
  0% {
    transform: scale(1);
    box-shadow: 0 5px 15px rgba(26, 65, 137, 0.3);
  }
  50% {
    transform: scale(1.03);
    box-shadow: 0 8px 25px rgba(26, 65, 137, 0.5);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 5px 15px rgba(26, 65, 137, 0.3);
  }
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal-container {
  background: white;
  border-radius: 16px;
  width: 600px;
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  animation: slideUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 1px solid rgba(241, 245, 249, 0.9);
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-header {
  padding: 24px 28px;
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(to right, #f8fafc, #f1f5f9);
}

.modal-header h3 {
  font-size: 22px;
  font-weight: 700;
  color: #1a4189;
  margin: 0;
  position: relative;
  display: inline-block;
}

.modal-header h3::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 40px;
  height: 3px;
  background: linear-gradient(to right, #1a4189, #4f7de3);
  border-radius: 8px;
}

.modal-close {
  background: none;
  border: none;
  font-size: 24px;
  color: #64748b;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
}

.modal-close:hover {
  background: rgba(241, 245, 249, 0.8);
  color: #1e293b;
  transform: rotate(90deg);
}

.modal-body {
  padding: 28px;
}

.modal-footer {
  padding: 20px 28px;
  border-top: 1px solid #f1f5f9;
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  background: linear-gradient(to right, #f8fafc, #f1f5f9);
}

.btn-cancel {
  padding: 12px 20px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 500;
  color: #475569;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.btn-cancel:hover {
  background: #f1f5f9;
  color: #1e293b;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.btn-upload {
  padding: 12px 24px;
  background: linear-gradient(145deg, #1a4189, #2e5cb8);
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 500;
  color: white;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 4px 12px rgba(26, 65, 137, 0.3);
  position: relative;
  overflow: hidden;
}

.btn-upload:hover {
  background: linear-gradient(145deg, #2e5cb8, #1a4189);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(26, 65, 137, 0.4);
}

.btn-upload:disabled {
  background: linear-gradient(145deg, #94a3b8, #cbd5e1);
  cursor: not-allowed;
  box-shadow: none;
  transform: none;
}

.btn-upload::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: rgba(255, 255, 255, 0.1);
  transform: rotate(45deg);
  opacity: 0;
  transition: all 0.5s ease;
}

.btn-upload:hover:not(:disabled)::after {
  opacity: 1;
  animation: shimmer-button 1.5s infinite;
}

@keyframes shimmer-button {
  0% {
    transform: translateX(-100%) rotate(45deg);
  }
  100% {
    transform: translateX(100%) rotate(45deg);
  }
}

.upload-area {
  padding: 40px 30px;
  border: 2px dashed #cbd5e1;
  border-radius: 16px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #f8fafc;
  position: relative;
  overflow: hidden;
}

.upload-area::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, rgba(249,250,251,0) 70%);
  opacity: 0;
  transition: all 0.5s ease;
}

.upload-area:hover::before, .upload-area.dragging::before {
  opacity: 1;
}

.upload-area:hover, .upload-area.dragging {
  border-color: #1a4189;
  background: #f1f5f9;
  transform: scale(1.01);
  box-shadow: 0 5px 15px rgba(26, 65, 137, 0.1);
}

.upload-icon {
  margin-bottom: 20px;
  color: #1a4189;
  position: relative;
  display: inline-block;
  animation: float-icon 3s ease-in-out infinite;
}

@keyframes float-icon {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

.upload-text {
  margin-bottom: 12px;
  font-size: 17px;
  color: #334155;
  font-weight: 500;
}

.browse-link {
  background: none;
  border: none;
  color: #1a4189;
  font-weight: 600;
  cursor: pointer;
  padding: 0 4px;
  text-decoration: none;
  position: relative;
  transition: all 0.3s ease;
}

.browse-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(to right, #1a4189, #4f7de3);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.3s ease;
}

.browse-link:hover {
  color: #2e5cb8;
}

.browse-link:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

.upload-formats {
  font-size: 14px;
  color: #64748b;
  max-width: 80%;
  margin: 0 auto;
}

.uploaded-files {
  margin-top: 28px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.file-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  transition: all 0.3s ease;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.file-item:hover {
  background: #f1f5f9;
  border-color: #cbd5e1;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}

.file-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.file-icon {
  color: #1a4189;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(26, 65, 137, 0.1);
  border-radius: 10px;
  transition: all 0.3s ease;
}

.file-item:hover .file-icon {
  background: rgba(26, 65, 137, 0.15);
  transform: scale(1.05);
}

.file-details {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.file-name {
  font-size: 15px;
  font-weight: 500;
  color: #1e293b;
  max-width: 280px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.file-type {
  font-size: 13px;
  color: #64748b;
}

.file-remove {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  background: rgba(239, 68, 68, 0.1);
  border: none;
  color: #ef4444;
  cursor: pointer;
  border-radius: 10px;
  transition: all 0.3s ease;
}

.file-remove:hover {
  background: rgba(239, 68, 68, 0.2);
  transform: rotate(90deg);
}

/* Media queries for upload modal */
@media (max-width: 768px) {
  .modal-container {
    width: 95vw;
  }

  .upload-area {
    padding: 30px 20px;
  }

  .file-name {
    max-width: 180px;
  }
}

/* Skeleton Loader Styles */
.skeleton-card {
  cursor: default;
  pointer-events: none;
}

.skeleton-card:hover {
  transform: none;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.skeleton {
  background: linear-gradient(90deg, #f1f5f9 0%, #e2e8f0 50%, #f1f5f9 100%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
}

.skeleton-icon {
  width: 52px;
  height: 52px;
  border-radius: 12px;
}

.skeleton-badge {
  width: 80px;
  height: 24px;
  border-radius: 12px;
}

.skeleton-title {
  width: 85%;
  height: 22px;
  margin-bottom: 16px;
}

.skeleton-meta {
  width: 60%;
  height: 16px;
}

.skeleton-agent {
  display: flex;
  align-items: center;
  gap: 12px;
}

.skeleton-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
}

.skeleton-agent-info {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.skeleton-name {
  width: 80px;
  height: 14px;
}

.skeleton-experience {
  width: 60px;
  height: 12px;
}

.skeleton-actions {
  display: flex;
  gap: 8px;
}

.skeleton-action {
  width: 38px;
  height: 38px;
  border-radius: 12px;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
</style>
