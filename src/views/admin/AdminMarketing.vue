<script setup>
import { ref, computed } from 'vue';

const campaigns = ref([
  {
    id: 1,
    name: 'Summer Property Showcase',
    type: 'Email Campaign',
    status: 'Active',
    startDate: '2023-06-01',
    endDate: '2023-08-31',
    targetAudience: 'Potential Buyers',
    sentCount: 1500,
    openRate: '45%',
    clickRate: '12%'
  },
  {
    id: 2,
    name: 'New Listings Alert',
    type: 'Automated',
    status: 'Active',
    startDate: '2023-01-01',
    endDate: 'Ongoing',
    targetAudience: 'Subscribers',
    sentCount: 8500,
    openRate: '52%',
    clickRate: '18%'
  },
  {
    id: 3,
    name: 'Holiday Special',
    type: 'Social Media',
    status: 'Scheduled',
    startDate: '2023-12-01',
    endDate: '2023-12-31',
    targetAudience: 'All Users',
    sentCount: 0,
    openRate: '-',
    clickRate: '-'
  }
]);

const emailTemplates = ref([
  {
    id: 1,
    name: 'Welcome Email',
    category: 'Onboarding',
    lastModified: '2023-05-15',
    status: 'Active'
  },
  {
    id: 2,
    name: 'Property Match Alert',
    category: 'Automated',
    lastModified: '2023-06-20',
    status: 'Active'
  },
  {
    id: 3,
    name: 'Newsletter Template',
    category: 'Newsletter',
    lastModified: '2023-07-01',
    status: 'Draft'
  }
]);

const analytics = ref({
  totalSubscribers: 12500,
  activeCampaigns: 3,
  averageOpenRate: '48%',
  averageClickRate: '15%',
  topPerformingCampaign: 'New Listings Alert',
  recentActivity: [
    {
      date: '2023-07-15',
      action: 'Campaign Sent',
      details: 'Summer Property Showcase sent to 500 subscribers'
    },
    {
      date: '2023-07-14',
      action: 'Template Updated',
      details: 'Welcome Email template modified'
    },
    {
      date: '2023-07-13',
      action: 'New Subscribers',
      details: '150 new subscribers added'
    }
  ]
});

const searchQuery = ref('');
const statusFilter = ref('all');
const typeFilter = ref('all');

const filteredCampaigns = computed(() => {
  let filtered = campaigns.value;
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(campaign => 
      campaign.name.toLowerCase().includes(query) ||
      campaign.targetAudience.toLowerCase().includes(query)
    );
  }
  
  if (statusFilter.value !== 'all') {
    filtered = filtered.filter(campaign => 
      campaign.status.toLowerCase() === statusFilter.value.toLowerCase()
    );
  }

  if (typeFilter.value !== 'all') {
    filtered = filtered.filter(campaign => 
      campaign.type.toLowerCase() === typeFilter.value.toLowerCase()
    );
  }
  
  return filtered;
});
</script>

<template>
  <div class="admin-marketing">
    <div class="marketing-header">
      <h2>Marketing Tools</h2>
      <div class="marketing-actions">
        <button class="create-campaign-btn">
          <i class="fas fa-plus"></i> Create Campaign
        </button>
        <button class="create-template-btn">
          <i class="fas fa-file-alt"></i> New Template
        </button>
      </div>
    </div>

    <div class="marketing-dashboard">
      <div class="analytics-cards">
        <div class="analytics-card">
          <div class="card-icon subscribers">
            <i class="fas fa-users"></i>
          </div>
          <div class="card-content">
            <h3>Total Subscribers</h3>
            <p class="card-value">{{ analytics.totalSubscribers }}</p>
          </div>
        </div>
        <div class="analytics-card">
          <div class="card-icon campaigns">
            <i class="fas fa-bullhorn"></i>
          </div>
          <div class="card-content">
            <h3>Active Campaigns</h3>
            <p class="card-value">{{ analytics.activeCampaigns }}</p>
          </div>
        </div>
        <div class="analytics-card">
          <div class="card-icon open-rate">
            <i class="fas fa-envelope-open"></i>
          </div>
          <div class="card-content">
            <h3>Avg. Open Rate</h3>
            <p class="card-value">{{ analytics.averageOpenRate }}</p>
          </div>
        </div>
        <div class="analytics-card">
          <div class="card-icon click-rate">
            <i class="fas fa-mouse-pointer"></i>
          </div>
          <div class="card-content">
            <h3>Avg. Click Rate</h3>
            <p class="card-value">{{ analytics.averageClickRate }}</p>
          </div>
        </div>
      </div>

      <div class="campaigns-section">
        <div class="section-header">
          <h3>Campaigns</h3>
          <div class="campaign-filters">
            <div class="search-group">
              <i class="fas fa-search"></i>
              <input 
                type="text" 
                v-model="searchQuery"
                placeholder="Search campaigns..."
              >
            </div>
            <div class="filter-group">
              <label for="status">Status:</label>
              <select v-model="statusFilter" id="status">
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="scheduled">Scheduled</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div class="filter-group">
              <label for="type">Type:</label>
              <select v-model="typeFilter" id="type">
                <option value="all">All Types</option>
                <option value="email campaign">Email Campaign</option>
                <option value="automated">Automated</option>
                <option value="social media">Social Media</option>
              </select>
            </div>
          </div>
        </div>

        <div class="campaigns-table-container">
          <table class="campaigns-table">
            <thead>
              <tr>
                <th>Campaign Name</th>
                <th>Type</th>
                <th>Status</th>
                <th>Target Audience</th>
                <th>Date Range</th>
                <th>Performance</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="campaign in filteredCampaigns" :key="campaign.id">
                <td>{{ campaign.name }}</td>
                <td>{{ campaign.type }}</td>
                <td>
                  <span :class="['status-badge', campaign.status.toLowerCase()]">
                    {{ campaign.status }}
                  </span>
                </td>
                <td>{{ campaign.targetAudience }}</td>
                <td>
                  {{ new Date(campaign.startDate).toLocaleDateString() }} - 
                  {{ campaign.endDate === 'Ongoing' ? 'Ongoing' : new Date(campaign.endDate).toLocaleDateString() }}
                </td>
                <td>
                  <div class="performance-metrics">
                    <span>Sent: {{ campaign.sentCount }}</span>
                    <span>Open: {{ campaign.openRate }}</span>
                    <span>Click: {{ campaign.clickRate }}</span>
                  </div>
                </td>
                <td>
                  <div class="action-buttons">
                    <button class="action-btn edit" title="Edit">
                      <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete" title="Delete">
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="templates-section">
        <h3>Email Templates</h3>
        <div class="templates-grid">
          <div v-for="template in emailTemplates" :key="template.id" class="template-card">
            <div class="template-header">
              <h4>{{ template.name }}</h4>
              <span :class="['template-status', template.status.toLowerCase()]">
                {{ template.status }}
              </span>
            </div>
            <div class="template-category">{{ template.category }}</div>
            <div class="template-footer">
              <span>Last modified: {{ new Date(template.lastModified).toLocaleDateString() }}</span>
              <div class="template-actions">
                <button class="action-btn edit" title="Edit">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn preview" title="Preview">
                  <i class="fas fa-eye"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="recent-activity">
        <h3>Recent Activity</h3>
        <div class="activity-list">
          <div v-for="(activity, index) in analytics.recentActivity" :key="index" class="activity-item">
            <div class="activity-date">{{ new Date(activity.date).toLocaleDateString() }}</div>
            <div class="activity-content">
              <div class="activity-action">{{ activity.action }}</div>
              <div class="activity-details">{{ activity.details }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-marketing {
  padding: 20px;
}

.marketing-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.marketing-header h2 {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.marketing-actions {
  display: flex;
  gap: 16px;
}

.create-campaign-btn,
.create-template-btn {
  padding: 8px 16px;
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

.create-campaign-btn {
  background: #2196F3;
  color: white;
}

.create-campaign-btn:hover {
  background: #1976D2;
}

.create-template-btn {
  background: #f5f5f5;
  color: #333;
}

.create-template-btn:hover {
  background: #e0e0e0;
}

.marketing-dashboard {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.analytics-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}

.analytics-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-icon {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.card-icon.subscribers {
  background: #e3f2fd;
  color: #2196F3;
}

.card-icon.campaigns {
  background: #f3e5f5;
  color: #9c27b0;
}

.card-icon.open-rate {
  background: #e8f5e9;
  color: #4caf50;
}

.card-icon.click-rate {
  background: #fff3e0;
  color: #ff9800;
}

.card-content h3 {
  font-size: 14px;
  color: #666;
  margin: 0 0 4px 0;
}

.card-value {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.section-header h3 {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.campaign-filters {
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

.campaigns-table-container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: auto;
}

.campaigns-table {
  width: 100%;
  border-collapse: collapse;
}

.campaigns-table th,
.campaigns-table td {
  padding: 16px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.campaigns-table th {
  background: #f8f9fa;
  font-weight: 600;
  color: #333;
}

.campaigns-table tr:hover {
  background: #f8f9fa;
}

.status-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.status-badge.active {
  background: #e8f5e9;
  color: #2e7d32;
}

.status-badge.scheduled {
  background: #fff3e0;
  color: #ef6c00;
}

.status-badge.completed {
  background: #f5f5f5;
  color: #757575;
}

.performance-metrics {
  display: flex;
  gap: 12px;
  font-size: 14px;
  color: #666;
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

.action-btn.preview {
  background: #f5f5f5;
  color: #666;
}

.action-btn.preview:hover {
  background: #e0e0e0;
}

.templates-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}

.template-card {
  background: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.template-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.template-header h4 {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.template-status {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.template-status.active {
  background: #e8f5e9;
  color: #2e7d32;
}

.template-status.draft {
  background: #fff3e0;
  color: #ef6c00;
}

.template-category {
  font-size: 14px;
  color: #666;
  margin-bottom: 16px;
}

.template-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #999;
}

.recent-activity {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.recent-activity h3 {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0 0 16px 0;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.activity-item {
  display: flex;
  gap: 16px;
  padding: 12px;
  border-radius: 4px;
  background: #f8f9fa;
}

.activity-date {
  font-size: 14px;
  color: #666;
  min-width: 100px;
}

.activity-content {
  flex: 1;
}

.activity-action {
  font-weight: 500;
  color: #333;
  margin-bottom: 4px;
}

.activity-details {
  font-size: 14px;
  color: #666;
}

@media (max-width: 1024px) {
  .marketing-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .campaign-filters {
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
  .marketing-actions {
    width: 100%;
  }

  .create-campaign-btn,
  .create-template-btn {
    flex: 1;
    justify-content: center;
  }

  .campaign-filters {
    flex-direction: column;
  }

  .search-group,
  .filter-group {
    width: 100%;
  }

  .filter-group select {
    flex: 1;
  }

  .campaigns-table {
    display: block;
    overflow-x: auto;
  }

  .performance-metrics {
    flex-direction: column;
    gap: 4px;
  }
}
</style> 