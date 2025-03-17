<template>
  <div class="post-detail">
    <!-- Header -->
    <div class="marketing-header">
      <h1>Marketing Tools</h1>
      <p>Link your social media accounts to reach a wider audience.</p>
    </div>

    <!-- Post Preview Card -->
    <div class="post-preview-card">
      <div class="post-details">
        <h2>Post details</h2>
        <p>Here's my review on the 2025 real estate thing thi...</p>
      </div>
      <button class="view-more-btn" @click="handleViewMore">View more</button>
    </div>

    <!-- Filter Buttons -->
    <div class="filter-section">
      <span class="filter-label">Filter Insights</span>
      <div class="filter-buttons">
        <button
          class="filter-btn"
          :class="{ active: activeFilter === 'All' }"
          @click="handleFilterClick('All')"
        >All</button>
        <button
          class="filter-btn"
          :class="{ active: activeFilter === 'X' }"
          @click="handleFilterClick('X')"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" class="platform-icon">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
          X
      </button>
        <button
          class="filter-btn"
          :class="{ active: activeFilter === 'Facebook' }"
          @click="handleFilterClick('Facebook')"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" class="platform-icon">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          Facebook
        </button>
        <button
          class="filter-btn"
          :class="{ active: activeFilter === 'LinkedIn' }"
          @click="handleFilterClick('LinkedIn')"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" class="platform-icon">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          LinkedIn
        </button>
      </div>
    </div>

    <!-- Post Overview Section -->
    <div class="post-overview" v-if="activeFilter !== 'All'">
      <div class="overview-header">
        <div class="platform-icon-container" :class="getPlatformColor(activeFilter)">
          <component :is="getPlatformIcon(activeFilter)" class="w-6 h-6 text-white" />
        </div>
        <div class="overview-title">
          <h3>{{ activeFilter }} Statistics</h3>
          <p class="text-sm text-gray-600">for @alexdunia_</p>
        </div>
      </div>

      <!-- Platform Specific Stats -->
      <div class="stats-grid">
        <template v-if="activeFilter === 'X'">
          <div class="stat-card">
            <span class="stat-label">Likes on post</span>
            <span class="stat-value">{{ currentStats.likes }}</span>
          </div>
          <div class="stat-card">
            <span class="stat-label">Retweets on post</span>
            <span class="stat-value">{{ currentStats.retweets }}</span>
          </div>
          <div class="stat-card">
            <span class="stat-label">Comments on post</span>
            <span class="stat-value">{{ currentStats.comments }}</span>
          </div>
          <div class="stat-card">
            <span class="stat-label">Impressions on post</span>
            <span class="stat-value">{{ currentStats.impressions }}</span>
          </div>
          <div class="stat-card">
            <span class="stat-label">Link clicks</span>
            <span class="stat-value">{{ currentStats.linkClicks }}</span>
          </div>
          <div class="stat-card">
            <span class="stat-label">Quotes on post</span>
            <span class="stat-value">{{ currentStats.quotes }}</span>
          </div>
        </template>

        <template v-else-if="activeFilter === 'Facebook'">
          <div class="stat-card">
            <span class="stat-label">Likes on post</span>
            <span class="stat-value">{{ currentStats.likes }}</span>
          </div>
          <div class="stat-card">
            <span class="stat-label">Comments on post</span>
            <span class="stat-value">{{ currentStats.comments }}</span>
          </div>
          <div class="stat-card">
            <span class="stat-label">Post shares</span>
            <span class="stat-value">{{ currentStats.shares }}</span>
          </div>
          <div class="stat-card">
            <span class="stat-label">Impressions on post</span>
            <span class="stat-value">{{ currentStats.impressions }}</span>
          </div>
          <div class="stat-card">
            <span class="stat-label">Total video views</span>
            <span class="stat-value">{{ currentStats.videoViews }}</span>
          </div>
          <div class="stat-card">
            <span class="stat-label">Average watch time</span>
            <span class="stat-value">{{ currentStats.avgWatchTime }}</span>
          </div>
        </template>

        <template v-else-if="activeFilter === 'LinkedIn'">
          <div class="stat-card">
            <span class="stat-label">Likes on post</span>
            <span class="stat-value">{{ currentStats.likes }}</span>
          </div>
          <div class="stat-card">
            <span class="stat-label">Comments on post</span>
            <span class="stat-value">{{ currentStats.comments }}</span>
          </div>
          <div class="stat-card">
            <span class="stat-label">Post shares</span>
            <span class="stat-value">{{ currentStats.shares }}</span>
          </div>
          <div class="stat-card">
            <span class="stat-label">Impressions on post</span>
            <span class="stat-value">{{ currentStats.impressions }}</span>
          </div>
          <div class="stat-card">
            <span class="stat-label">Total video views</span>
            <span class="stat-value">{{ currentStats.videoViews }}</span>
          </div>
          <div class="stat-card">
            <span class="stat-label">Average watch time</span>
            <span class="stat-value">{{ currentStats.avgWatchTime }}</span>
          </div>
        </template>
      </div>
    </div>

    <!-- Combined Stats Overview -->
    <div class="post-overview" v-else>
      <!-- ... existing combined stats code ... -->
    </div>

    <!-- Post Overview Section -->
    <div class="post-overview">
      <div class="overview-header">
        <div class="logo-container">
          <div class="logo-placeholder">RC</div>
        </div>
        <div class="overview-title">
          <h3>Post overview across <span>all platforms</span></h3>
          <p>All data shown here is the combination of all platforms for this single post</p>
        </div>
      </div>

      <!-- Analytics Cards -->
      <div class="analytics-cards">
        <div class="analytics-card">
          <div class="card-title">All Followers</div>
          <div class="card-value">20</div>
        </div>
        <div class="analytics-card">
          <div class="card-title">Audience growth</div>
          <div class="card-value">20</div>
        </div>
        <div class="analytics-card">
          <div class="card-title">New Followers</div>
          <div class="card-value">20</div>
        </div>
        <div class="analytics-card">
          <div class="card-title">New Followers</div>
          <div class="card-value">20</div>
        </div>
      </div>
    </div>

    <!-- Graphs Section -->
    <div class="graphs-section">
      <div v-for="platform in socialPlatforms" :key="platform.id" class="graph-card" v-show="activeFilter === 'All' || activeFilter === platform.id">
        <div class="graph-header">
          <div class="platform-info">
            <svg v-if="platform.id === 'X'" viewBox="0 0 24 24" fill="currentColor" class="platform-icon x-icon">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            <svg v-if="platform.id === 'Facebook'" viewBox="0 0 24 24" fill="currentColor" class="platform-icon facebook-icon">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
            <svg v-if="platform.id === 'LinkedIn'" viewBox="0 0 24 24" fill="currentColor" class="platform-icon linkedin-icon">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            <span class="platform-name">{{ platform.name }}</span>
          </div>
          <div class="graph-actions">
            <button class="expand-btn" @click="expandGraph(platform.id)">Expand</button>
            <button class="view-all-link" @click="handleViewAll(platform.id)">View all</button>
            <div class="time-filter" @click="handleTimeFilterClick(platform.id)">
              <span>Last 7 days</span>
              <svg class="dropdown-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
        <div class="graph-container">
          <div class="graph-grid">
            <div class="y-axis">
              <div class="y-tick" v-for="tick in 6" :key="tick">{{ (6 - tick) * 20 }}</div>
            </div>
            <div class="graph-bars">
              <div
                class="bar-container"
                v-for="(value, index) in platform.data"
                :key="index"
                @mouseenter="showTooltip(platform.id, index)"
                @mouseleave="hideTooltip"
              >
                <div
                  :class="['bar', `${platform.id.toLowerCase()}-bar`]"
                  :style="{ height: `${value}%` }"
                ></div>
                <div class="x-label">{{ days[index] }}</div>
                <div v-if="activeTooltip.platformId === platform.id && activeTooltip.index === index" class="tooltip">
                  {{ value }}
                </div>
              </div>
          </div>
          </div>
        </div>
      </div>
      </div>

    <!-- Expanded Graph Modal -->
    <div v-if="expandedGraph" class="modal-overlay" @click="closeExpandedGraph">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>{{ getExpandedPlatformName() }} Insights</h3>
          <button class="close-btn" @click="closeExpandedGraph">×</button>
        </div>
        <div class="expanded-graph-container">
          <div class="graph-grid">
            <div class="y-axis">
              <div class="y-tick" v-for="tick in 6" :key="tick">{{ (6 - tick) * 20 }}</div>
            </div>
            <div class="graph-bars">
              <div
                class="bar-container"
                v-for="(value, index) in getExpandedPlatformData()"
                :key="index"
                @mouseenter="showTooltip(expandedGraphId, index)"
                @mouseleave="hideTooltip"
              >
                <div
                  :class="['bar', `${expandedGraphId.toLowerCase()}-bar`]"
                  :style="{ height: `${value}%` }"
                ></div>
                <div class="x-label">{{ days[index] }}</div>
                <div v-if="activeTooltip.platformId === expandedGraphId && activeTooltip.index === index" class="tooltip">
                  {{ value }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <p>Last updated: {{ getExpandedPlatformLastUpdated() }}</p>
        </div>
      </div>
    </div>

    <!-- Social Media Insights Section -->
    <SocialMediaGraphs />
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import SocialMediaGraphs from '@/components/SocialMediaGraphs.vue';

const route = useRoute();
const post = ref(null);
const activeFilter = ref('All');

// Days of the week for x-axis
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// Tooltip state
const activeTooltip = reactive({
  platformId: null,
  index: -1
});

// Expanded graph state
const expandedGraph = ref(false);
const expandedGraphId = ref('');

// Social media data store (mimicking API response)
const socialPlatforms = ref([
  {
    id: 'X',
    name: 'X',
    data: [70, 55, 30, 40, 20, 80, 55],
    lastUpdated: '2023-10-15T10:00:00Z',
    totalFollowers: 20
  },
  {
    id: 'Facebook',
    name: 'Facebook',
    data: [70, 55, 30, 40, 20, 80, 55],
    lastUpdated: '2023-10-15T10:00:00Z',
    totalFollowers: 20
  },
  {
    id: 'LinkedIn',
    name: 'LinkedIn',
    data: [70, 55, 30, 40, 20, 80, 55],
    lastUpdated: '2023-10-15T10:00:00Z',
    totalFollowers: 20
  }
]);

// Add reactive reference for current stats
const currentStats = ref({
  likes: 600,
  comments: 1500,
  shares: 3006,
  impressions: 15000,
  reach: 180,
  videoViews: 'No videos posted',
  avgWatchTime: 'Null'
});

// Function to fetch social media data from API (currently using hardcoded data)
const fetchSocialMediaData = async () => {
  try {
    // In a real implementation, this would be an API call:
    // const response = await fetch('/api/social-metrics');
    // const data = await response.json();
    // socialPlatforms.value = data;

    // For now, we're using the hardcoded data
    console.log('Social media data loaded');
  } catch (error) {
    console.error('Error fetching social media data:', error);
  }
};

onMounted(() => {
  // Fetch post data
  const postId = route.params.id;

  // Try to get from localStorage
  const posts = JSON.parse(localStorage.getItem('posts') || '[]');
  const draftPosts = JSON.parse(localStorage.getItem('draftPosts') || '[]');

  // Combine all posts
  const allPosts = [...posts, ...draftPosts];

  // Find the post by ID
  const foundPost = allPosts.find(p => p.id === Number(postId));

  if (foundPost) {
    post.value = foundPost;
  } else {
    // If post not found, create a dummy post for demo
    post.value = {
      id: Number(postId),
      title: 'Real Estate Market Trends 2025',
      content: "Here's my review on the 2025 real estate thing that's coming up. The market is expected to see significant changes...",
      status: 'published',
      creationDate: new Date().toISOString(),
      lastEdited: new Date().toISOString()
    };
  }

  // Fetch social media data
  fetchSocialMediaData();
});

// Event handlers
const handleViewMore = () => {
  console.log('View more clicked');
};

const handleFilterClick = (filter) => {
  activeFilter.value = filter;

  // Update displayed stats based on filter
  if (filter === 'X') {
    updateStats({
      likes: 200,
      retweets: 500,
      comments: 1002,
      impressions: 5000,
      linkClicks: 'No links found',
      quotes: 60
    });
  } else if (filter === 'Facebook') {
    updateStats({
      likes: 200,
      comments: 500,
      shares: 1002,
      impressions: 5000,
      reach: 60,
      videoViews: 'No videos posted',
      avgWatchTime: 'Null'
    });
  } else if (filter === 'LinkedIn') {
    updateStats({
      likes: 200,
      comments: 500,
      shares: 1002,
      impressions: 5000,
      reach: 60,
      videoViews: 'No videos posted',
      avgWatchTime: 'Null'
    });
  } else {
    // Show combined stats for 'All'
    updateStats({
      likes: 600,
      comments: 1500,
      shares: 3006,
      impressions: 15000,
      reach: 180,
      videoViews: 'No videos posted',
      avgWatchTime: 'Null'
    });
  }
};

const updateStats = (stats) => {
  currentStats.value = stats;
};

const handleViewAll = (platform) => {
  console.log(`View all clicked for: ${platform}`);
};

const handleTimeFilterClick = (platform) => {
  console.log(`Dropdown clicked for: ${platform}`);
};

// Tooltip handlers
const showTooltip = (platformId, index) => {
  activeTooltip.platformId = platformId;
  activeTooltip.index = index;
};

const hideTooltip = () => {
  activeTooltip.platformId = null;
  activeTooltip.index = -1;
};

// Expanded graph handlers
const expandGraph = (platformId) => {
  expandedGraphId.value = platformId;
  expandedGraph.value = true;
};

const closeExpandedGraph = () => {
  expandedGraph.value = false;
};

const getExpandedPlatformName = () => {
  const platform = socialPlatforms.value.find(p => p.id === expandedGraphId.value);
  return platform ? platform.name : '';
};

const getExpandedPlatformData = () => {
  const platform = socialPlatforms.value.find(p => p.id === expandedGraphId.value);
  return platform ? platform.data : [];
};

const getExpandedPlatformLastUpdated = () => {
  const platform = socialPlatforms.value.find(p => p.id === expandedGraphId.value);
  if (!platform) return '';

  const date = new Date(platform.lastUpdated);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

const getPlatformColor = (platform) => {
  switch (platform) {
    case 'X': return 'bg-[#000000]';
    case 'Facebook': return 'bg-[#1877F2]';
    case 'LinkedIn': return 'bg-[#0A66C2]';
    default: return 'bg-gray-500';
  }
};

const getPlatformIcon = (platform) => {
  switch (platform) {
    case 'X':
      return {
        template: `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5549 21H20.7996L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z"/>
          </svg>
        `
      };
    case 'Facebook':
      return {
        template: `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        `
      };
    case 'LinkedIn':
      return {
        template: `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        `
      };
    default:
      return null;
  }
};
</script>

<style scoped>
/* Base Styles */
.post-detail {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem 2rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: #111827;
  background-color: #fff;
}

/* Marketing Header */
.marketing-header {
  margin-bottom: 2rem;
}

.marketing-header h1 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: #111827;
}

.marketing-header p {
  font-size: 0.875rem;
  color: #6B7280;
  margin: 0;
}

/* Post Preview Card */
.post-preview-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background: #F9FAFB;
  border-radius: 0.5rem;
  margin-bottom: 2rem;
  border: 1px solid #E5E7EB;
}

.post-details h2 {
  font-size: 0.875rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 0.25rem 0;
}

.post-details p {
  font-size: 0.875rem;
  color: #111827;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 700px;
}

.view-more-btn {
  font-size: 0.875rem;
  font-weight: 500;
  color: #3B82F6;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: color 0.2s;
  text-transform: capitalize;
}

.view-more-btn:hover {
  color: #1D4ED8;
}

/* Filter Section */
.filter-section {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.filter-label {
  font-size: 0.875rem;
  color: #6B7280;
  margin-right: 1rem;
}

.filter-buttons {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.filter-btn {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  background: #F3F4F6;
  color: #4B5563;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  height: 2.25rem;
}

.filter-btn:hover {
  background: #E5E7EB;
}

.filter-btn.active {
  background: #111827;
  color: #fff;
}

.platform-icon {
  width: 1rem;
  height: 1rem;
}

/* Post Overview Section */
.post-overview {
  background: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid #E5E7EB;
}

.overview-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.logo-container {
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.logo-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  font-weight: 600;
  color: #fff;
  background-color: #0052CC;
  border-radius: 0.25rem;
}

.overview-title h3 {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
  color: #111827;
}

.overview-title h3 span {
  color: #3B82F6;
}

.overview-title p {
  font-size: 0.75rem;
  color: #6B7280;
  margin: 0;
  line-height: 1.25;
}

/* Analytics Cards */
.analytics-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.analytics-card {
  background: #fff;
  padding: 1.5rem 1.25rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  text-align: center;
  border: 1px solid #E5E7EB;
}

.card-title {
  font-size: 0.75rem;
  color: #6B7280;
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.025em;
}

.card-value {
  font-size: 1.75rem;
  font-weight: 600;
  color: #111827;
}

/* Graphs Section */
.graphs-section {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
  background-color: #F9FAFB;
  padding: 1.5rem;
  border-radius: 0.5rem;
}

.graph-card {
  background: #fff;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #E5E7EB;
}

.graph-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.platform-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.x-icon {
  color: #000000;
}

.facebook-icon {
  color: #1877F2;
}

.linkedin-icon {
  color: #0A66C2;
}

.platform-name {
  font-weight: 500;
  color: #111827;
}

.graph-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.expand-btn,
.view-all-link {
  font-size: 0.75rem;
  color: #3B82F6;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-weight: 500;
}

.expand-btn:hover,
.view-all-link:hover {
  color: #1D4ED8;
}

.view-all-link {
  text-transform: uppercase;
}

.time-filter {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  color: #6B7280;
  cursor: pointer;
  border-left: 1px solid #E5E7EB;
  padding-left: 0.75rem;
}

.dropdown-icon {
  width: 0.75rem;
  height: 0.75rem;
}

.graph-container {
  height: 200px;
}

.graph-grid {
  display: flex;
  height: 100%;
  background-image: linear-gradient(to right, #f3f4f6 1px, transparent 1px),
                    linear-gradient(to bottom, #f3f4f6 1px, transparent 1px);
  background-size: 14.28% 20%;
  background-position: -1px -1px;
}

.y-axis {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-right: 0.5rem;
  width: 2rem;
  height: 100%;
}

.y-tick {
  font-size: 0.75rem;
  color: #6B7280;
  text-align: right;
  transform: translateY(50%);
}

.graph-bars {
  display: flex;
  flex: 1;
  align-items: flex-end;
  height: 100%;
  padding-top: 1rem;
  padding-bottom: 2rem;
  position: relative;
}

.bar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
  height: 100%;
  position: relative;
}

.bar {
  width: 60%;
  border-radius: 4px 4px 0 0;
  transition: height 0.3s ease;
}

.x-bar {
  background-color: #000000;
}

.facebook-bar {
  background-color: #1877F2;
}

.linkedin-bar {
  background-color: #0A66C2;
}

.x-label {
  font-size: 0.75rem;
  color: #6B7280;
  margin-top: 0.5rem;
  position: absolute;
  bottom: -1.5rem;
}

/* Tooltip */
.tooltip {
  position: absolute;
  top: -2rem;
  left: 50%;
  transform: translateX(-50%);
  background-color: #111827;
  color: #fff;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  white-space: nowrap;
  z-index: 10;
}

.tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-width: 0.25rem;
  border-style: solid;
  border-color: #111827 transparent transparent transparent;
}

/* Modal */
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
  z-index: 50;
}

.modal-content {
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 800px;
  max-height: 80vh;
  overflow: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #E5E7EB;
}

.modal-header h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6B7280;
}

.expanded-graph-container {
  height: 400px;
  padding: 1.5rem;
}

.modal-footer {
  padding: 1rem;
  border-top: 1px solid #E5E7EB;
  text-align: right;
  font-size: 0.75rem;
  color: #6B7280;
}

/* Responsive Styles */
@media (max-width: 1024px) {
  .analytics-cards {
    grid-template-columns: repeat(2, 1fr);
  }

  .graphs-section {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .post-detail {
    padding: 1rem;
  }

  .post-preview-card {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .post-details p {
    max-width: 100%;
  }

  .view-more-btn {
    align-self: flex-end;
  }

  .filter-section {
    flex-direction: column;
    align-items: flex-start;
  }

  .analytics-cards {
    grid-template-columns: 1fr;
  }

  .overview-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .graphs-section {
    grid-template-columns: 1fr;
    padding: 1rem;
  }

  .modal-content {
    width: 95%;
  }

  .expanded-graph-container {
    height: 300px;
  }
}

.platform-icon-container {
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 1.5rem;
}

.stat-card {
  background: white;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.stat-label {
  font-size: 0.875rem;
  color: #6B7280;
}

.stat-value {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
}

@media (min-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
