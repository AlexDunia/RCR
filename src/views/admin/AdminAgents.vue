<script setup>
import { ref } from 'vue';

const agents = ref([
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '(555) 123-4567',
    status: 'Active',
    listings: 12,
    clients: 25,
    joinDate: '2023-01-15'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    phone: '(555) 987-6543',
    status: 'Active',
    listings: 8,
    clients: 18,
    joinDate: '2023-03-20'
  },
  {
    id: 3,
    name: 'Michael Brown',
    email: 'michael.b@example.com',
    phone: '(555) 456-7890',
    status: 'Inactive',
    listings: 5,
    clients: 10,
    joinDate: '2023-06-10'
  }
]);

const searchQuery = ref('');
const statusFilter = ref('all');

const filteredAgents = computed(() => {
  let filtered = agents.value;
  
  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(agent => 
      agent.name.toLowerCase().includes(query) ||
      agent.email.toLowerCase().includes(query)
    );
  }
  
  // Filter by status
  if (statusFilter.value !== 'all') {
    filtered = filtered.filter(agent => 
      agent.status.toLowerCase() === statusFilter.value.toLowerCase()
    );
  }
  
  return filtered;
});

const handleStatusChange = (agentId, newStatus) => {
  const agent = agents.value.find(a => a.id === agentId);
  if (agent) {
    agent.status = newStatus;
  }
};

const handleDeleteAgent = (agentId) => {
  if (confirm('Are you sure you want to delete this agent?')) {
    agents.value = agents.value.filter(a => a.id !== agentId);
  }
};
</script>

<template>
  <div class="admin-agents">
    <div class="agents-header">
      <h2>Manage Agents</h2>
      <div class="agents-actions">
        <div class="search-group">
          <i class="fas fa-search"></i>
          <input 
            type="text" 
            v-model="searchQuery"
            placeholder="Search agents..."
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
        <button class="add-agent-btn">
          <i class="fas fa-plus"></i> Add New Agent
        </button>
      </div>
    </div>

    <div class="agents-table-container">
      <table class="agents-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact</th>
            <th>Status</th>
            <th>Listings</th>
            <th>Clients</th>
            <th>Join Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="agent in filteredAgents" :key="agent.id">
            <td>{{ agent.name }}</td>
            <td>
              <div class="contact-info">
                <div>{{ agent.email }}</div>
                <div class="phone">{{ agent.phone }}</div>
              </div>
            </td>
            <td>
              <select 
                :value="agent.status"
                @change="handleStatusChange(agent.id, $event.target.value)"
                :class="agent.status.toLowerCase()"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </td>
            <td>{{ agent.listings }}</td>
            <td>{{ agent.clients }}</td>
            <td>{{ new Date(agent.joinDate).toLocaleDateString() }}</td>
            <td>
              <div class="action-buttons">
                <button class="action-btn edit" title="Edit">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn delete" title="Delete" @click="handleDeleteAgent(agent.id)">
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
.admin-agents {
  padding: 20px;
}

.agents-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.agents-header h2 {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.agents-actions {
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

.add-agent-btn {
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

.add-agent-btn:hover {
  background: #1976D2;
}

.agents-table-container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: auto;
}

.agents-table {
  width: 100%;
  border-collapse: collapse;
}

.agents-table th,
.agents-table td {
  padding: 16px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.agents-table th {
  background: #f8f9fa;
  font-weight: 600;
  color: #333;
}

.agents-table tr:hover {
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
  .agents-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .agents-actions {
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
  .agents-actions {
    flex-direction: column;
  }

  .search-group,
  .filter-group,
  .add-agent-btn {
    width: 100%;
  }

  .filter-group select {
    flex: 1;
  }

  .add-agent-btn {
    justify-content: center;
  }

  .agents-table {
    display: block;
    overflow-x: auto;
  }
}
</style> 