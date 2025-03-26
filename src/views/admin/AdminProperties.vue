<script setup>
import { ref, computed } from 'vue';

const properties = ref([
  {
    id: 1,
    title: 'Modern Downtown Apartment',
    type: 'Apartment',
    status: 'Active',
    price: '$2,500',
    location: '123 Main St, Downtown',
    agent: 'John Smith',
    bedrooms: 2,
    bathrooms: 2,
    area: '1,200 sq ft',
    listedDate: '2023-01-15'
  },
  {
    id: 2,
    title: 'Luxury Villa with Pool',
    type: 'House',
    status: 'Pending',
    price: '$850,000',
    location: '456 Oak Lane, Suburbs',
    agent: 'Sarah Johnson',
    bedrooms: 4,
    bathrooms: 3,
    area: '3,500 sq ft',
    listedDate: '2023-03-20'
  },
  {
    id: 3,
    title: 'Cozy Studio Condo',
    type: 'Condo',
    status: 'Inactive',
    price: '$1,800',
    location: '789 Pine Ave, Midtown',
    agent: 'Michael Brown',
    bedrooms: 1,
    bathrooms: 1,
    area: '800 sq ft',
    listedDate: '2023-06-10'
  }
]);

const searchQuery = ref('');
const statusFilter = ref('all');
const typeFilter = ref('all');

const filteredProperties = computed(() => {
  let filtered = properties.value;
  
  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(property => 
      property.title.toLowerCase().includes(query) ||
      property.location.toLowerCase().includes(query) ||
      property.agent.toLowerCase().includes(query)
    );
  }
  
  // Filter by status
  if (statusFilter.value !== 'all') {
    filtered = filtered.filter(property => 
      property.status.toLowerCase() === statusFilter.value.toLowerCase()
    );
  }

  // Filter by type
  if (typeFilter.value !== 'all') {
    filtered = filtered.filter(property => 
      property.type.toLowerCase() === typeFilter.value.toLowerCase()
    );
  }
  
  return filtered;
});

const handleStatusChange = (propertyId, newStatus) => {
  const property = properties.value.find(p => p.id === propertyId);
  if (property) {
    property.status = newStatus;
  }
};

const handleDeleteProperty = (propertyId) => {
  if (confirm('Are you sure you want to delete this property?')) {
    properties.value = properties.value.filter(p => p.id !== propertyId);
  }
};
</script>

<template>
  <div class="admin-properties">
    <div class="properties-header">
      <h2>Manage Properties</h2>
      <div class="properties-actions">
        <div class="search-group">
          <i class="fas fa-search"></i>
          <input 
            type="text" 
            v-model="searchQuery"
            placeholder="Search properties..."
          >
        </div>
        <div class="filter-group">
          <label for="status">Status:</label>
          <select v-model="statusFilter" id="status">
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div class="filter-group">
          <label for="type">Type:</label>
          <select v-model="typeFilter" id="type">
            <option value="all">All Types</option>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="condo">Condo</option>
          </select>
        </div>
        <button class="add-property-btn">
          <i class="fas fa-plus"></i> Add New Property
        </button>
      </div>
    </div>

    <div class="properties-table-container">
      <table class="properties-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Type</th>
            <th>Status</th>
            <th>Price</th>
            <th>Location</th>
            <th>Agent</th>
            <th>Details</th>
            <th>Listed Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="property in filteredProperties" :key="property.id">
            <td>{{ property.title }}</td>
            <td>{{ property.type }}</td>
            <td>
              <select 
                :value="property.status"
                @change="handleStatusChange(property.id, $event.target.value)"
                :class="property.status.toLowerCase()"
              >
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Inactive">Inactive</option>
              </select>
            </td>
            <td>{{ property.price }}</td>
            <td>{{ property.location }}</td>
            <td>{{ property.agent }}</td>
            <td>
              <div class="property-details">
                <span>{{ property.bedrooms }} beds</span>
                <span>{{ property.bathrooms }} baths</span>
                <span>{{ property.area }}</span>
              </div>
            </td>
            <td>{{ new Date(property.listedDate).toLocaleDateString() }}</td>
            <td>
              <div class="action-buttons">
                <button class="action-btn edit" title="Edit">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn delete" title="Delete" @click="handleDeleteProperty(property.id)">
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
.admin-properties {
  padding: 20px;
}

.properties-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.properties-header h2 {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.properties-actions {
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

.add-property-btn {
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

.add-property-btn:hover {
  background: #1976D2;
}

.properties-table-container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: auto;
}

.properties-table {
  width: 100%;
  border-collapse: collapse;
}

.properties-table th,
.properties-table td {
  padding: 16px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.properties-table th {
  background: #f8f9fa;
  font-weight: 600;
  color: #333;
}

.properties-table tr:hover {
  background: #f8f9fa;
}

.property-details {
  display: flex;
  gap: 12px;
  color: #666;
  font-size: 14px;
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

select.pending {
  background: #fff3e0;
  color: #ef6c00;
  border-color: #ffcc80;
}

select.inactive {
  background: #ffebee;
  color: #c62828;
  border-color: #ef9a9a;
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
  .properties-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .properties-actions {
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
  .properties-actions {
    flex-direction: column;
  }

  .search-group,
  .filter-group,
  .add-property-btn {
    width: 100%;
  }

  .filter-group select {
    flex: 1;
  }

  .add-property-btn {
    justify-content: center;
  }

  .properties-table {
    display: block;
    overflow-x: auto;
  }

  .property-details {
    flex-direction: column;
 