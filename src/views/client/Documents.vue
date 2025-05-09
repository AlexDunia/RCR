<template>
  <div class="client-documents">
    <h1>Your Documents</h1>

    <div class="documents-header">
      <div class="search-container">
        <input type="text" placeholder="Search documents..." class="search-input" />
      </div>
      <button class="upload-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="17 8 12 3 7 8"></polyline>
          <line x1="12" y1="3" x2="12" y2="15"></line>
        </svg>
        Upload Document
      </button>
    </div>

    <div class="document-categories">
      <button class="category-btn active">All Documents</button>
      <button class="category-btn">Purchase Agreements</button>
      <button class="category-btn">Inspection Reports</button>
      <button class="category-btn">Financial</button>
      <button class="category-btn">Personal</button>
    </div>

    <div class="documents-table">
      <div class="table-header">
        <div class="header-cell name-cell">Name</div>
        <div class="header-cell type-cell">Type</div>
        <div class="header-cell date-cell">Date</div>
        <div class="header-cell status-cell">Status</div>
        <div class="header-cell actions-cell">Actions</div>
      </div>

      <div v-if="documents.length === 0" class="empty-documents">
        <div class="empty-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
        </div>
        <h2>No Documents Yet</h2>
        <p>Upload important documents related to your real estate journey.</p>
      </div>

      <div v-else v-for="(doc, index) in documents" :key="index" class="document-row">
        <div class="cell name-cell">
          <div class="document-icon" :class="doc.type.toLowerCase()">
            <svg v-if="doc.type === 'PDF'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
            </svg>
            <svg v-else-if="doc.type === 'Image'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
          </div>
          <span class="document-name">{{ doc.name }}</span>
        </div>
        <div class="cell type-cell">{{ doc.type }}</div>
        <div class="cell date-cell">{{ doc.date }}</div>
        <div class="cell status-cell">
          <span class="status-badge" :class="doc.status.toLowerCase()">{{ doc.status }}</span>
        </div>
        <div class="cell actions-cell">
          <button class="action-btn view-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </button>
          <button class="action-btn download-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
          </button>
          <button class="action-btn delete-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, defineComponent } from 'vue';

// Define component name
defineComponent({
  name: 'ClientDocuments'
});

// Sample documents data
const documents = reactive([
  {
    id: 1,
    name: 'Purchase Agreement - 123 Main St',
    type: 'PDF',
    date: 'May 12, 2023',
    status: 'Signed',
    category: 'Purchase Agreements'
  },
  {
    id: 2,
    name: 'Home Inspection Report',
    type: 'PDF',
    date: 'May 15, 2023',
    status: 'Pending',
    category: 'Inspection Reports'
  },
  {
    id: 3,
    name: 'Proof of Funds',
    type: 'PDF',
    date: 'May 10, 2023',
    status: 'Verified',
    category: 'Financial'
  },
  {
    id: 4,
    name: 'Property Photos',
    type: 'Image',
    date: 'May 8, 2023',
    status: 'Approved',
    category: 'Personal'
  }
]);
</script>

<style scoped>
.client-documents {
  padding: 24px;
}

h1 {
  font-size: 28px;
  margin-bottom: 24px;
  color: #2c3e50;
}

.documents-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.search-container {
  flex: 1;
  max-width: 400px;
}

.search-input {
  width: 100%;
  padding: 10px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 14px;
}

.upload-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background-color: #006064;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.upload-btn:hover {
  background-color: #00474a;
}

.document-categories {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
}

.category-btn {
  padding: 8px 16px;
  background-color: #f5f7fa;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  font-size: 14px;
  color: #4a4a4a;
  cursor: pointer;
  transition: all 0.2s;
}

.category-btn:hover {
  background-color: #e8f4f5;
  border-color: #006064;
}

.category-btn.active {
  background-color: #006064;
  border-color: #006064;
  color: white;
}

.documents-table {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

.table-header {
  display: flex;
  background-color: #f5f7fa;
  padding: 16px;
  font-weight: 600;
  color: #4a4a4a;
  border-bottom: 1px solid #e0e0e0;
}

.header-cell {
  font-size: 14px;
}

.name-cell {
  flex: 3;
}

.type-cell {
  flex: 1;
}

.date-cell {
  flex: 1;
}

.status-cell {
  flex: 1;
}

.actions-cell {
  flex: 1;
  text-align: right;
}

.document-row {
  display: flex;
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
  font-size: 14px;
  align-items: center;
  transition: background-color 0.2s;
}

.document-row:hover {
  background-color: #f9f9f9;
}

.document-row:last-child {
  border-bottom: none;
}

.cell {
  display: flex;
  align-items: center;
}

.document-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  margin-right: 12px;
}

.document-icon.pdf {
  color: #e74c3c;
  background-color: rgba(231, 76, 60, 0.1);
}

.document-icon.image {
  color: #3498db;
  background-color: rgba(52, 152, 219, 0.1);
}

.document-name {
  font-weight: 500;
  color: #2c3e50;
}

.status-badge {
  display: inline-block;
  padding: 6px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
}

.status-badge.signed {
  background-color: #e3f2fd;
  color: #1565c0;
}

.status-badge.pending {
  background-color: #fff8e1;
  color: #f57f17;
}

.status-badge.verified {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.status-badge.approved {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.action-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.action-btn:hover {
  background-color: #f0f0f0;
}

.view-btn {
  color: #3498db;
}

.download-btn {
  color: #2ecc71;
}

.delete-btn {
  color: #e74c3c;
}

.empty-documents {
  padding: 60px 20px;
  text-align: center;
}

.empty-icon {
  margin-bottom: 16px;
  color: #bdc3c7;
}

.empty-documents h2 {
  font-size: 20px;
  margin-bottom: 8px;
  color: #2c3e50;
}

.empty-documents p {
  font-size: 14px;
  color: #7f8c8d;
  max-width: 300px;
  margin: 0 auto;
}
</style>
