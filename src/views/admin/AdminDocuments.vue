<script setup>
import { ref, computed } from 'vue';

const documents = ref([
  {
    id: 1,
    title: 'Property Agreement',
    type: 'Contract',
    category: 'Legal',
    size: '2.5 MB',
    uploadedBy: 'John Smith',
    uploadDate: '2023-01-15',
    status: 'Active',
    relatedTo: 'Modern Downtown Apartment'
  },
  {
    id: 2,
    title: 'Client Information Form',
    type: 'Form',
    category: 'Client',
    size: '1.2 MB',
    uploadedBy: 'Sarah Johnson',
    uploadDate: '2023-03-20',
    status: 'Active',
    relatedTo: 'Robert Wilson'
  },
  {
    id: 3,
    title: 'Property Inspection Report',
    type: 'Report',
    category: 'Property',
    size: '3.8 MB',
    uploadedBy: 'Michael Brown',
    uploadDate: '2023-06-10',
    status: 'Archived',
    relatedTo: 'Luxury Villa with Pool'
  }
]);

const searchQuery = ref('');
const statusFilter = ref('all');
const categoryFilter = ref('all');
const typeFilter = ref('all');

const filteredDocuments = computed(() => {
  let filtered = documents.value;
  
  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(doc => 
      doc.title.toLowerCase().includes(query) ||
      doc.relatedTo.toLowerCase().includes(query) ||
      doc.uploadedBy.toLowerCase().includes(query)
    );
  }
  
  // Filter by status
  if (statusFilter.value !== 'all') {
    filtered = filtered.filter(doc => 
      doc.status.toLowerCase() === statusFilter.value.toLowerCase()
    );
  }

  // Filter by category
  if (categoryFilter.value !== 'all') {
    filtered = filtered.filter(doc => 
      doc.category.toLowerCase() === categoryFilter.value.toLowerCase()
    );
  }

  // Filter by type
  if (typeFilter.value !== 'all') {
    filtered = filtered.filter(doc => 
      doc.type.toLowerCase() === typeFilter.value.toLowerCase()
    );
  }
  
  return filtered;
});

const handleStatusChange = (docId, newStatus) => {
  const doc = documents.value.find(d => d.id === docId);
  if (doc) {
    doc.status = newStatus;
  }
};

const handleDeleteDocument = (docId) => {
  if (confirm('Are you sure you want to delete this document?')) {
    documents.value = documents.value.filter(d => d.id !== docId);
  }
};

const handleDownload = (docId) => {
  // Implement download functionality
  console.log('Downloading document:', docId);
};
</script>

<template>
  <div class="admin-documents">
    <div class="documents-header">
      <h2>Manage Documents</h2>
      <div class="documents-actions">
        <div class="search-group">
          <i class="fas fa-search"></i>
          <input 
            type="text" 
            v-model="searchQuery"
            placeholder="Search documents..."
          >
        </div>
        <div class="filter-group">
          <label for="status">Status:</label>
          <select v-model="statusFilter" id="status">
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="archived">Archived</option>
          </select>
        </div>
        <div class="filter-group">
          <label for="category">Category:</label>
          <select v-model="categoryFilter" id="category">
            <option value="all">All Categories</option>
            <option value="legal">Legal</option>
            <option value="client">Client</option>
            <option value="property">Property</option>
          </select>
        </div>
        <div class="filter-group">
          <label for="type">Type:</label>
          <select v-model="typeFilter" id="type">
            <option value="all">All Types</option>
            <option value="contract">Contract</option>
            <option value="form">Form</option>
            <option value="report">Report</option>
          </select>
        </div>
        <button class="upload-doc-btn">
          <i class="fas fa-upload"></i> Upload Document
        </button>
      </div>
    </div>

    <div class="documents-table-container">
      <table class="documents-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Type</th>
            <th>Category</th>
            <th>Size</th>
            <th>Uploaded By</th>
            <th>Related To</th>
            <th>Upload Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="doc in filteredDocuments" :key="doc.id">
            <td>{{ doc.title }}</td>
            <td>{{ doc.type }}</td>
            <td>{{ doc.category }}</td>
            <td>{{ doc.size }}</td>
            <td>{{ doc.uploadedBy }}</td>
            <td>{{ doc.relatedTo }}</td>
            <td>{{ new Date(doc.uploadDate).toLocaleDateString() }}</td>
            <td>
              <select 
                :value="doc.status"
                @change="handleStatusChange(doc.id, $event.target.value)"
                :class="doc.status.toLowerCase()"
              >
                <option value="Active">Active</option>
                <option value="Archived">Archived</option>
              </select>
            </td>
            <td>
              <div class="action-buttons">
                <button class="action-btn download" title="Download" @click="handleDownload(doc.id)">
                  <i class="fas fa-download"></i>
                </button>
                <button class="action-btn edit" title="Edit">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn delete" title="Delete" @click="handleDeleteDocument(doc.id)">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.admin-documents {
  padding: 20px;
}

.documents-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.documents-header h2 {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.documents-actions {
  display: flex;
  gap: 16px;
  align-items: center;
}

.search-group {
  position: relative;
}

.search-group i {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
}

.search-group input {
  padding: 8px 12px 8px 36px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  width: 240px;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-group label {
  font-size: 14px;
  color: #666;
}

.filter-group select {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
}

.upload-doc-btn {
  padding: 8px 16px;
  background: #2196F3;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.upload-doc-btn:hover {
  background: #1976D2;
}

.documents-table-container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: auto;
}

.documents-table {
  width: 100%;
  border-collapse: collapse;
}

.documents-table th,
.documents-table td {
  padding: 16px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.documents-table th {
  background: #f8f9fa;
  font-weight: 600;
  color: #333;
}

.documents-table tr:hover {
  background: #f8f9fa;
}

select {
  padding: 6px 12px;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: 14px;
  cursor: pointer;
}

select.active {
  background: #e8f5e9;
  color: #2e7d32;
  border-color: #a5d6a7;
}

select.archived {
  background: #f5f5f5;
  color: #757575;
  border-color: #e0e0e0;
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.action-btn {
  padding: 6px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.action-btn.download {
  background: #e8f5e9;
  color: #2e7d32;
}

.action-btn.download:hover {
  background: #c8e6c9;
}

.action-btn.edit {
  background: #e3f2fd;
  color: #2196F3;
}

.action-btn.edit:hover {
  background: #bbdefb;
}

.action-btn.delete {
  background: #ffebee;
  color: #f44336;
}

.action-btn.delete:hover {
  background: #ffcdd2;
}

@media (max-width: 1024px) {
  .documents-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .documents-actions {
    width: 100%;
    flex-wrap: wrap;
  }

  .search-group {
    flex: 1;
  }

  .search-group input {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .documents-actions {
    flex-direction: column;
  }

  .search-group,
  .filter-group,
  .upload-doc-btn {
    width: 100%;
  }

  .filter-group select {
    flex: 1;
  }

  .upload-doc-btn {
    justify-content: center;
  }

  .documents-table {
    display: block;
    overflow-x: auto;
  }
}
</style> 