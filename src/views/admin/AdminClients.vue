<script setup>
import { ref, computed } from 'vue';

const clients = ref([
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice.j@example.com',
    phone: '(555) 123-4567',
    status: 'Active',
    agent: 'John Smith',
    properties: 3,
    joinDate: '2023-01-15'
  },
  {
    id: 2,
    name: 'Robert Wilson',
    email: 'robert.w@example.com',
    phone: '(555) 987-6543',
    status: 'Active',
    agent: 'Sarah Johnson',
    properties: 2,
    joinDate: '2023-03-20'
  },
  {
    id: 3,
    name: 'Emily Davis',
    email: 'emily.d@example.com',
    phone: '(555) 456-7890',
    status: 'Inactive',
    agent: 'Michael Brown',
    properties: 1,
    joinDate: '2023-06-10'
  }
]);

const searchQuery = ref('');
const statusFilter = ref('all');

const filteredClients = computed(() => {
  let filtered = clients.value;
  
  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(client => 
      client.name.toLowerCase().includes(query) ||
      client.email.toLowerCase().includes(query) ||
      client.agent.toLowerCase().includes(query)
    );
  }
  
  // Filter by status
  if (statusFilter.value !== 'all') {
    filtered = filtered.filter(client => 
      client.status.toLowerCase() === statusFilter.value.toLowerCase()
    );
  }
  
  return filtered;
});

const handleStatusChange = (clientId, newStatus) => {
  const client = clients.value.find(c => c.id === clientId);
  if (client) {
    client.status = newStatus;
  }
};

const handleDeleteClient = (clientId) => {
  if (confirm('Are you sure you want to delete this client?')) {
    clients.value = clients.value.filter(c => c.id !== clientId);
  }
};
</script>

<template>
  <div class="admin-clients">
    <div class="clients-header">
      <h2>Manage Clients</h2>
      <div class="clients-actions">
        <div class="search-group">
          <i class="fas fa-search"></i>
          <input 
            type="text" 
            v-model="searchQuery"
            placeholder="Search clients..."
          >
        </div>
        <div class="filter-group">
          <label for="status">Status:</label>
          <select v-model="statusFilter" id="status">
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <button class="add-client-btn">
          <i class="fas fa-plus"></i> Add New Client
        </button>
      </div>
    </div>

    <div class="clients-table-container">
      <table class="clients-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact</th>
            <th>Agent</th>
            <th>Status</th>
            <th>Properties</th>
            <th>Join Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="client in filteredClients" :key="client.id">
            <td>{{ client.name }}</td>
            <td>
              <div class="contact-info">
                <div>{{ client.email }}</div>
                <div class="phone">{{ client.phone }}</div>
              </div>
            </td>
            <td>{{ client.agent }}</td>
            <td>
              <select 
                :value="client.status"
                @change="handleStatusChange(client.id, $event.target.value)"
                :class="client.status.toLowerCase()"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </td>
            <td>{{ client.properties }}</td>
            <td>{{ new Date(client.joinDate).toLocaleDateString() }}</td>
            <td>
              <div class="action-buttons">
                <button class="action-btn edit" title="Edit">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn delete" title="Delete" @click="handleDeleteClient(client.id)">
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
.admin-clients {
  padding: 20px;
}

.clients-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.clients-header h2 {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.clients-actions {
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

.add-client-btn {
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

.add-client-btn:hover {
  background: #1976D2;
}

.clients-table-container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: auto;
}

.clients-table {
  width: 100%;
  border-collapse: collapse;
}

.clients-table th,
.clients-table td {
  padding: 16px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.clients-table th {
  background: #f8f9fa;
  font-weight: 600;
  color: #333;
}

.clients-table tr:hover {
  background: #f8f9fa;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.contact-info .phone {
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
  .clients-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .clients-actions {
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
  .clients-actions {
    flex-direction: column;
  }

  .search-group,
  .filter-group,
  .add-client-btn {
    width: 100%;
  }

  .filter-group select {
    flex: 1;
  }

  .add-client-btn {
    justify-content: center;
  }

  .clients-table {
    display: block;
    overflow-x: auto;
  }
}
</style> 