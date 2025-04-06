<template>
  <div class="admin-social-insights">
    <div class="header">
      <h1>Social Media Insights Dashboard</h1>
      <div class="filter-controls">
        <div class="search-bar">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search agents..."
            class="search-input"
          >
          <button v-if="searchQuery" @click="searchQuery = ''" class="clear-search">
            <span>&times;</span>
          </button>
        </div>

        <div class="filter-options">
          <select v-model="platformFilter" class="filter-select">
            <option value="all">All Platforms</option>
            <option value="facebook">Facebook</option>
            <option value="instagram">Instagram</option>
            <option value="twitter">Twitter</option>
            <option value="linkedin">LinkedIn</option>
          </select>

          <select v-model="timeFilter" class="filter-select">
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Improved Loading Indicator -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="pulse-loader"></div>
      <span>Loading insights...</span>
    </div>

    <!-- Content sections - now always visible with shimmer effect when loading -->
    <div :class="{'content-loading': isLoading}">
      <!-- Summary Statistics Cards -->
      <div class="stats-cards">
        <div class="stat-card">
          <div class="stat-icon" style="background-color: #e0f2fe;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#0284c7" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div class="stat-content">
            <h3>Total Impressions</h3>
            <div class="stat-value">1.2M</div>
            <div class="stat-change positive">+12.5%</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon" style="background-color: #dcfce7;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
            </svg>
          </div>
          <div class="stat-content">
            <h3>Total Engagement</h3>
            <div class="stat-value">85.4K</div>
            <div class="stat-change positive">+8.3%</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon" style="background-color: #fef3c7;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </div>
          <div class="stat-content">
            <h3>Follower Growth</h3>
            <div class="stat-value">+3,240</div>
            <div class="stat-change positive">+5.7%</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon" style="background-color: #fee2e2;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </div>
          <div class="stat-content">
            <h3>Avg. Engagement Rate</h3>
            <div class="stat-value">4.2%</div>
            <div class="stat-change negative">-0.8%</div>
          </div>
        </div>
      </div>

      <!-- Agent Performance Table -->
      <div class="section-card">
        <div class="section-header">
          <h2>Agent Performance</h2>
          <div class="section-actions">
            <div class="time-period-label">{{ timeFilterLabel }}</div>
            <button class="export-btn">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Export
            </button>
          </div>
        </div>

        <div class="table-container">
          <table class="performance-table">
            <thead>
              <tr>
                <th @click="sortBy('agent')">
                  Agent
                  <span v-if="sortField === 'agent'" class="sort-icon">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
                </th>
                <th @click="sortBy('posts')">
                  Posts
                  <span v-if="sortField === 'posts'" class="sort-icon">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
                </th>
                <th @click="sortBy('followers')">
                  Followers
                  <span v-if="sortField === 'followers'" class="sort-icon">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
                </th>
                <th @click="sortBy('engagement')">
                  Engagement
                  <span v-if="sortField === 'engagement'" class="sort-icon">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
                </th>
                <th @click="sortBy('growth')">
                  Growth
                  <span v-if="sortField === 'growth'" class="sort-icon">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
                </th>
                <th>Platforms</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="agent in filteredAgents" :key="agent.id">
                <td>
                  <div class="agent-info">
                    <img :src="agent.avatar" :alt="agent.name" class="agent-avatar">
                    <div>
                      <div class="agent-name">{{ agent.name }}</div>
                      <div class="agent-location">{{ agent.location }}</div>
                    </div>
                  </div>
                </td>
                <td>{{ agent.posts }}</td>
                <td>{{ formatNumber(agent.followers) }}</td>
                <td>
                  <div class="trend-value">
                    {{ agent.engagement }}%
                    <span :class="agent.engagementTrend > 0 ? 'trend-up' : 'trend-down'">
                      {{ agent.engagementTrend > 0 ? '↑' : '↓' }} {{ Math.abs(agent.engagementTrend) }}%
                    </span>
                  </div>
                </td>
                <td>
                  <div class="trend-value">
                    <span :class="agent.growth > 0 ? 'trend-up' : 'trend-down'">
                      {{ agent.growth > 0 ? '+' : '' }}{{ agent.growth }}%
                    </span>
                  </div>
                </td>
                <td>
                  <div class="platform-icons">
                    <span v-if="agent.platforms.includes('facebook')" class="platform-icon facebook" title="Facebook">fb</span>
                    <span v-if="agent.platforms.includes('instagram')" class="platform-icon instagram" title="Instagram">ig</span>
                    <span v-if="agent.platforms.includes('twitter')" class="platform-icon twitter" title="Twitter">tw</span>
                    <span v-if="agent.platforms.includes('linkedin')" class="platform-icon linkedin" title="LinkedIn">in</span>
                  </div>
                </td>
                <td>
                  <button class="action-btn view-btn" @click="viewAgentDetails(agent.id)">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Platform Performance Section -->
      <div class="section-card platform-section">
        <h2>Platform Performance</h2>

        <div class="platform-cards">
          <div class="platform-card facebook">
            <div class="platform-header">
              <div class="platform-icon-large facebook">fb</div>
              <h3>Facebook</h3>
            </div>
            <div class="platform-metrics">
              <div class="metric">
                <span class="metric-value">32.5K</span>
                <span class="metric-label">Followers</span>
              </div>
              <div class="metric">
                <span class="metric-value">285</span>
                <span class="metric-label">Posts</span>
              </div>
              <div class="metric">
                <span class="metric-value">3.8%</span>
                <span class="metric-label">Engagement</span>
              </div>
              <div class="metric">
                <span class="metric-value">450K</span>
                <span class="metric-label">Reach</span>
              </div>
            </div>
            <div class="growth-value">
              <span class="trend-up">+8.5%</span> growth
            </div>
          </div>

          <div class="platform-card instagram">
            <div class="platform-header">
              <div class="platform-icon-large instagram">ig</div>
              <h3>Instagram</h3>
            </div>
            <div class="platform-metrics">
              <div class="metric">
                <span class="metric-value">48.2K</span>
                <span class="metric-label">Followers</span>
              </div>
              <div class="metric">
                <span class="metric-value">342</span>
                <span class="metric-label">Posts</span>
              </div>
              <div class="metric">
                <span class="metric-value">5.2%</span>
                <span class="metric-label">Engagement</span>
              </div>
              <div class="metric">
                <span class="metric-value">720K</span>
                <span class="metric-label">Reach</span>
              </div>
            </div>
            <div class="growth-value">
              <span class="trend-up">+12.3%</span> growth
            </div>
          </div>

          <div class="platform-card twitter">
            <div class="platform-header">
              <div class="platform-icon-large twitter">tw</div>
              <h3>Twitter</h3>
            </div>
            <div class="platform-metrics">
              <div class="metric">
                <span class="metric-value">18.7K</span>
                <span class="metric-label">Followers</span>
              </div>
              <div class="metric">
                <span class="metric-value">520</span>
                <span class="metric-label">Tweets</span>
              </div>
              <div class="metric">
                <span class="metric-value">2.5%</span>
                <span class="metric-label">Engagement</span>
              </div>
              <div class="metric">
                <span class="metric-value">280K</span>
                <span class="metric-label">Impressions</span>
              </div>
            </div>
            <div class="growth-value">
              <span class="trend-up">+4.7%</span> growth
            </div>
          </div>

          <div class="platform-card linkedin">
            <div class="platform-header">
              <div class="platform-icon-large linkedin">in</div>
              <h3>LinkedIn</h3>
            </div>
            <div class="platform-metrics">
              <div class="metric">
                <span class="metric-value">26.4K</span>
                <span class="metric-label">Followers</span>
              </div>
              <div class="metric">
                <span class="metric-value">175</span>
                <span class="metric-label">Posts</span>
              </div>
              <div class="metric">
                <span class="metric-value">4.1%</span>
                <span class="metric-label">Engagement</span>
              </div>
              <div class="metric">
                <span class="metric-value">380K</span>
                <span class="metric-label">Impressions</span>
              </div>
            </div>
            <div class="growth-value">
              <span class="trend-up">+7.2%</span> growth
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useRoleStore } from '@/stores/roleStore';

const router = useRouter();
const roleStore = useRoleStore();

// Check if user is admin
const isAdmin = computed(() => roleStore.currentRole === 'admin');

// Navigation guard
if (!isAdmin.value) {
  router.push('/marketing-tools');
}

// State
const searchQuery = ref('');
const platformFilter = ref('all');
const timeFilter = ref('30d');
const isLoading = ref(false);

// Lifecycle
onMounted(() => {
  console.log('AdminSocialInsights component mounted');
  loadData();
});

// Methods
const loadData = async () => {
  isLoading.value = true;
  try {
    // Fetch data here
    await new Promise(r => setTimeout(r, 500)); // Reduced timeout for better UX
  } catch (error) {
    console.error('Error loading social insights:', error);
  } finally {
    isLoading.value = false;
  }
};

// Sample agent data - would come from API in real implementation
const agentData = ref([
  {
    id: 1,
    name: 'John Smith',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    location: 'New York, NY',
    posts: 48,
    followers: 15250,
    engagement: 4.2,
    engagementTrend: 1.5,
    growth: 8.3,
    impressions: 187500,
    platforms: ['facebook', 'instagram', 'twitter', 'linkedin']
  },
  {
    id: 2,
    name: 'Emily Johnson',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    location: 'Los Angeles, CA',
    posts: 62,
    followers: 21300,
    engagement: 5.7,
    engagementTrend: 2.3,
    growth: 12.1,
    impressions: 254600,
    platforms: ['instagram', 'facebook']
  },
  {
    id: 3,
    name: 'Michael Brown',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    location: 'Chicago, IL',
    posts: 37,
    followers: 9800,
    engagement: 3.5,
    engagementTrend: -0.8,
    growth: 5.2,
    impressions: 105300,
    platforms: ['facebook', 'linkedin']
  },
  {
    id: 4,
    name: 'Sarah Davis',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    location: 'Houston, TX',
    posts: 54,
    followers: 18600,
    engagement: 4.8,
    engagementTrend: 1.1,
    growth: 9.5,
    impressions: 217800,
    platforms: ['instagram', 'twitter']
  },
  {
    id: 5,
    name: 'David Wilson',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    location: 'Miami, FL',
    posts: 42,
    followers: 12700,
    engagement: 3.9,
    engagementTrend: -0.5,
    growth: 6.8,
    impressions: 143200,
    platforms: ['facebook', 'instagram', 'linkedin']
  }
]);

const sortField = ref('engagement');
const sortOrder = ref('desc');

const sortBy = (field) => {
  if (sortField.value === field) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortField.value = field;
    sortOrder.value = 'desc';
  }
};

const filteredAgents = computed(() => {
  let result = [...agentData.value];

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(agent =>
      agent.name.toLowerCase().includes(query) ||
      agent.location.toLowerCase().includes(query)
    );
  }

  // Apply platform filter
  if (platformFilter.value !== 'all') {
    result = result.filter(agent =>
      agent.platforms.includes(platformFilter.value)
    );
  }

  // Apply sorting
  result.sort((a, b) => {
    let aValue = a[sortField.value];
    let bValue = b[sortField.value];

    // Special case for agent name (sort by name)
    if (sortField.value === 'agent') {
      aValue = a.name;
      bValue = b.name;
    }

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortOrder.value === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    } else {
      return sortOrder.value === 'asc'
        ? aValue - bValue
        : bValue - aValue;
    }
  });

  return result;
});

const formatNumber = (num) => {
  return new Intl.NumberFormat().format(num);
};

const viewAgentDetails = (agentId) => {
  console.log(`View details for agent ${agentId}`);
  router.push(`/admin/agent/${agentId}`);
};

// Computed property for time filter label
const timeFilterLabel = computed(() => {
  switch (timeFilter.value) {
    case '7d': return 'last 7 days';
    case '30d': return 'last 30 days';
    case '90d': return 'last 90 days';
    case '1y': return 'last year';
    default: return 'last 30 days';
  }
});
</script>

<style scoped>
.admin-social-insights {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  color: #1f2937;
  position: relative;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.header h1 {
  margin: 0;
  color: #111827;
  font-size: 1.875rem;
  font-weight: 700;
  letter-spacing: -0.025em;
}

.filter-controls {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.search-bar {
  position: relative;
}

.search-input {
  padding: 0.625rem 2.5rem 0.625rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  min-width: 240px;
  background-color: #f9fafb;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.search-input:focus {
  outline: none;
  border-color: #93c5fd;
  background-color: #fff;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.clear-search {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  color: #9ca3af;
}

.filter-options {
  display: flex;
  gap: 0.75rem;
}

.filter-select {
  padding: 0.625rem 2rem 0.625rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  background-color: #f9fafb;
  color: #374151;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  background-size: 1.25rem;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.filter-select:focus {
  outline: none;
  border-color: #93c5fd;
  background-color: #fff;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(2px);
  gap: 1rem;
}

.loading-overlay span {
  font-size: 0.875rem;
  font-weight: 500;
  color: #4b5563;
}

.pulse-loader {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: linear-gradient(#2563eb, #3b82f6);
  animation: pulse 1.5s ease-in-out infinite;
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.3);
}

@keyframes pulse {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.5);
  }
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 15px rgba(59, 130, 246, 0);
  }
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
  }
}

.content-loading .stat-card,
.content-loading .section-card,
.content-loading .platform-card {
  position: relative;
  overflow: hidden;
}

.content-loading .stat-card::after,
.content-loading .section-card::after,
.content-loading .platform-card::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0) 100%);
  transform: translateX(-100%);
  animation: shimmer 2s infinite;
  pointer-events: none;
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

.stats-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.stat-card {
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
}

.stat-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
}

.stat-icon svg {
  width: 1.5rem;
  height: 1.5rem;
}

.stat-content {
  flex: 1;
}

.stat-content h3 {
  margin: 0 0 0.5rem 0;
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
}

.stat-value {
  font-size: 1.75rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.375rem;
  letter-spacing: -0.025em;
}

.stat-change {
  font-size: 0.875rem;
  font-weight: 500;
}

.stat-change.positive {
  color: #10b981;
}

.stat-change.negative {
  color: #ef4444;
}

.section-card {
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
  margin-bottom: 2.5rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.section-header h2, .section-card h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.section-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.section-card.platform-section h2 {
  margin-bottom: 1.5rem;
}

.time-period-label {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
}

.export-btn {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 1rem;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s ease;
}

.export-btn:hover {
  background-color: #f3f4f6;
  border-color: #d1d5db;
}

.export-btn svg {
  width: 1rem;
  height: 1rem;
}

.table-container {
  overflow-x: auto;
  border-radius: 0.5rem;
}

.performance-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  text-align: left;
}

.performance-table th {
  padding: 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #4b5563;
  background-color: #f9fafb;
  cursor: pointer;
  white-space: nowrap;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  transition: background-color 0.2s ease;
}

.performance-table th:hover {
  background-color: #f3f4f6;
}

.performance-table th:first-child {
  border-top-left-radius: 0.5rem;
}

.performance-table th:last-child {
  border-top-right-radius: 0.5rem;
}

.performance-table td {
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  vertical-align: middle;
}

.performance-table tr:last-child td {
  border-bottom: none;
}

.performance-table tr:last-child td:first-child {
  border-bottom-left-radius: 0.5rem;
}

.performance-table tr:last-child td:last-child {
  border-bottom-right-radius: 0.5rem;
}

.performance-table tr:hover {
  background-color: #f9fafb;
}

.agent-info {
  display: flex;
  align-items: center;
  gap: 0.875rem;
}

.agent-avatar {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  object-fit: cover;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.agent-name {
  font-weight: 500;
  color: #111827;
  font-size: 0.9375rem;
}

.agent-location {
  font-size: 0.8125rem;
  color: #6b7280;
  margin-top: 0.125rem;
}

.trend-value {
  display: flex;
  align-items: center;
  gap: 0.375rem;
}

.trend-up {
  color: #10b981;
  font-weight: 500;
}

.trend-down {
  color: #ef4444;
  font-weight: 500;
}

.platform-icons {
  display: flex;
  gap: 0.375rem;
}

.platform-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.625rem;
  height: 1.625rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: bold;
  color: white;
}

.platform-icon.facebook {
  background-color: #1877F2;
}

.platform-icon.instagram {
  background-color: #E4405F;
}

.platform-icon.twitter {
  background-color: #1DA1F2;
}

.platform-icon.linkedin {
  background-color: #0A66C2;
}

.action-btn {
  padding: 0.375rem 0.75rem;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
}

.view-btn {
  background-color: #eff6ff;
  color: #3b82f6;
}

.view-btn:hover {
  background-color: #dbeafe;
}

.view-btn svg {
  width: 1rem;
  height: 1rem;
}

.sort-icon {
  display: inline-block;
  margin-left: 0.375rem;
}

.platform-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.platform-card {
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.platform-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
}

.platform-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 0.25rem;
}

.platform-card.facebook::before {
  background-color: #1877F2;
}

.platform-card.instagram::before {
  background-color: #E4405F;
}

.platform-card.twitter::before {
  background-color: #1DA1F2;
}

.platform-card.linkedin::before {
  background-color: #0A66C2;
}

.platform-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}

.platform-header h3 {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
}

.platform-icon-large {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: bold;
  color: white;
}

.platform-icon-large.facebook {
  background-color: #1877F2;
}

.platform-icon-large.instagram {
  background-color: #E4405F;
}

.platform-icon-large.twitter {
  background-color: #1DA1F2;
}

.platform-icon-large.linkedin {
  background-color: #0A66C2;
}

.platform-metrics {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.metric {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.metric-value {
  font-size: 1.125rem;
  font-weight: 700;
  color: #111827;
}

.metric-label {
  font-size: 0.75rem;
  color: #6b7280;
}

.growth-value {
  font-size: 0.875rem;
  font-weight: 500;
  color: #4b5563;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

@media (max-width: 768px) {
  .admin-social-insights {
    padding: 1.5rem 1rem;
  }

  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .filter-controls {
    width: 100%;
    flex-direction: column;
    align-items: stretch;
  }

  .search-input {
    width: 100%;
  }

  .filter-options {
    width: 100%;
    flex-direction: column;
  }

  .stats-cards {
    grid-template-columns: 1fr;
  }

  .platform-cards {
    grid-template-columns: 1fr;
  }
}
</style>
