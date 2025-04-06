<template>
  <div class="social-platforms">
    <div class="social-platforms__header">
      <button class="create-post-button" @click="handleCreatePost" v-can="'create-social-posts'">
        <span class="create-post-button__icon">+</span>
        CREATE POST
      </button>

      <div class="tab-navigation">
        <button
          v-for="tab in tabOptions"
          :key="tab.id"
          :class="['tab-button', { 'tab-button--active': currentTab === tab.id }]"
          @click="currentTab = tab.id"
        >
          {{ tab.name }}
          <span class="tab-button__count" v-if="getPostCount(tab.id)">
            {{ getPostCount(tab.id) }}
          </span>
        </button>
      </div>
    </div>

    <MarketingContentLoader>
      <div class="posts-container">
        <div v-if="filteredPosts.length" :class="['posts-list', { 'posts-list--grid': currentTab === 'published' }]">
          <article
            v-for="post in filteredPosts"
            :key="post.id"
            :class="['post-card', { 'post-card--grid': currentTab === 'published' }]"
            @click="viewPostDetails(post)"
          >
            <div :class="['post-card__thumbnail', { 'post-card__thumbnail--grid': currentTab === 'published' }]">
              <img :src="post.image" :alt="post.title">
            </div>

            <div :class="['post-card__content', { 'post-card__content--grid': currentTab === 'published' }]">
              <h3 class="post-card__title">{{ post.title }}</h3>
              <p class="post-card__schedule">
                <template v-if="post.status === 'drafts'">
                  Created: {{ formatDate(post.creationDate) }}
                </template>
                <template v-else-if="post.status === 'scheduled'">
                  Scheduled for: {{ formatDate(post.scheduledDate) }}
                </template>
                <template v-else>
                  Published: {{ formatDate(post.publishedDate || post.creationDate) }}
                </template>
              </p>
            </div>

            <div :class="['post-card__actions', { 'post-card__actions--grid': currentTab === 'published' }]">
              <button
                class="action-button action-button--edit"
                @click.stop="editPost(post)"
                aria-label="Edit post"
                v-can="'edit-social-posts'"
              >
                <svg class="action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
              </button>
              <button
                class="action-button action-button--delete"
                @click.stop="deletePost(post)"
                aria-label="Delete post"
                v-can="'delete-social-posts'"
              >
                <svg class="action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </button>
            </div>
          </article>
        </div>
        <div v-else class="empty-state">
          <p>No posts found in this category.</p>
        </div>
      </div>
    </MarketingContentLoader>

    <div v-can="'access-social-profiles'" class="social-profiles-section">
      <h2>Your Social Media Profiles</h2>
      <div class="profiles-list">
        <div class="profile-card" v-for="platform in platforms" :key="platform.id">
          <div class="profile-icon">{{ platform.icon }}</div>
          <div class="profile-info">
            <h3>{{ platform.name }}</h3>
            <p>{{ platform.handle }}</p>
            <div class="profile-stats">
              <span>{{ platform.followers }} followers</span>
              <span>{{ platform.engagement }}% engagement</span>
            </div>
          </div>
          <button class="profile-action">Manage</button>
        </div>
      </div>
    </div>

    <div v-can="'view-social-insights'" class="social-insights-section">
      <h2>Social Media Insights</h2>
      <div class="insights-grid">
        <div class="insight-card">
          <h3>Impressions</h3>
          <div class="insight-value">{{ stats.impressions }}</div>
          <div class="insight-trend positive">+12.5%</div>
        </div>
        <div class="insight-card">
          <h3>Engagement</h3>
          <div class="insight-value">{{ stats.engagement }}%</div>
          <div class="insight-trend positive">+5.3%</div>
        </div>
        <div class="insight-card">
          <h3>Click-through</h3>
          <div class="insight-value">{{ stats.clickThrough }}%</div>
          <div class="insight-trend negative">-2.1%</div>
        </div>
        <div class="insight-card">
          <h3>Audience Growth</h3>
          <div class="insight-value">{{ stats.audienceGrowth }}</div>
          <div class="insight-trend positive">+8.7%</div>
        </div>
      </div>
    </div>

    <ConfirmationModal
      v-if="showModal"
      :title="modalConfig.title"
      :message="modalConfig.message"
      :type="modalConfig.type"
      :confirm-text="modalConfig.confirmText"
      :cancel-text="modalConfig.cancelText"
      @confirm="handleModalConfirm"
      @cancel="handleModalCancel"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import ConfirmationModal from '@/ui/ConfirmationModal.vue';
import MarketingContentLoader from '@/features/marketing/MarketingContentLoader.vue';
import { usePermission } from '@/composables/usePermission';
import { useRoleStore } from '@/stores/roleStore';

const router = useRouter();
const currentTab = ref('scheduled');
const showModal = ref(false);
const modalConfig = ref({
  title: '',
  message: '',
  type: '',
  confirmText: '',
  cancelText: 'Cancel',
  action: null
});
const selectedPost = ref(null);

const { can } = usePermission();
const roleStore = useRoleStore();
const isAdmin = computed(() => roleStore.currentRole === 'admin');

// Redirect admins to the insights dashboard
onMounted(() => {
  if (isAdmin.value) {
    router.replace('/marketing-tools/admin-social');
    return;
  }

  console.log('SocialPlatforms component mounted');
  loadData();
});

// Remove the route watcher for layout
watch(() => router.currentRoute.value.query, () => {
  if (!isAdmin.value) {
    console.log('Route query changed, reloading data');
    loadData();
  }
}, { immediate: true });

const tabOptions = [
  { id: 'drafts', name: 'Drafts' },
  { id: 'scheduled', name: 'Scheduled' },
  { id: 'published', name: 'Published' },
];

// Initialize with default posts
const posts = ref([
  {
    id: 1,
    title: 'Mastering client connections for better results',
    image: 'https://picsum.photos/800/600?random=1',
    creationDate: '2024-12-01T10:00:00',
    scheduledDate: '2024-12-05T10:00:00',
    status: 'scheduled',
  },
  {
    id: 2,
    title: 'How to showcase your properties effectively',
    image: 'https://picsum.photos/800/600?random=2',
    creationDate: '2023-12-03T09:15:00',
    publishedDate: '2023-12-03T09:15:00',
    status: 'published',
  },
  {
    id: 3,
    title: '5 Tips for Real Estate Photography',
    image: 'https://picsum.photos/800/600?random=3',
    creationDate: '2023-12-02T14:30:00',
    publishedDate: '2023-12-02T14:30:00',
    status: 'published',
  },
  {
    id: 4,
    title: 'Market Trends: December 2023',
    image: 'https://picsum.photos/800/600?random=4',
    creationDate: '2023-12-01T11:20:00',
    publishedDate: '2023-12-01T11:20:00',
    status: 'published',
  },
  {
    id: 5,
    title: 'Staging Your Home: A Complete Guide',
    image: 'https://picsum.photos/800/600?random=5',
    creationDate: '2023-11-30T16:45:00',
    publishedDate: '2023-11-30T16:45:00',
    status: 'published',
  },
  {
    id: 6,
    title: 'Understanding Property Valuations',
    image: 'https://picsum.photos/800/600?random=6',
    creationDate: '2023-11-29T13:15:00',
    publishedDate: '2023-11-29T13:15:00',
    status: 'published',
  }
]);

// Function to load data
function loadData() {
  console.log('Loading data in SocialPlatforms');

  // Load drafts from localStorage
  const savedDrafts = localStorage.getItem('draftPosts');
  if (savedDrafts) {
    try {
      const drafts = JSON.parse(savedDrafts);
      // Clear existing drafts first
      posts.value = posts.value.filter(post => post.status !== 'drafts');
      // Add drafts from localStorage
      drafts.forEach(draft => {
        posts.value.push(draft);
      });
      console.log('Loaded drafts:', drafts);
    } catch (e) {
      console.error('Error loading drafts:', e);
    }
  }

  // Check for pending post
  const pendingPost = localStorage.getItem('pendingPost');
  if (pendingPost) {
    try {
      const post = JSON.parse(pendingPost);
      showSaveToDraftsModal(post);
    } catch (e) {
      console.error('Error loading pending post:', e);
      localStorage.removeItem('pendingPost');
    }
  }
}

const filteredPosts = computed(() => {
  return posts.value.filter(post => post.status === currentTab.value);
});

const getPostCount = (status) => {
  return posts.value.filter(post => post.status === status).length;
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

const handleCreatePost = () => {
  if (can('create-social-posts')) {
    router.push('/marketing-tools/social-platforms/create');
  } else {
    alert('You do not have permission to create posts');
  }
};

const editPost = (post) => {
  if (can('edit-social-posts')) {
    router.push(`/marketing-tools/social-platforms/edit/${post.id}`);
  } else {
    alert('You do not have permission to edit posts');
  }
};

const deletePost = (post) => {
  if (can('delete-social-posts')) {
    selectedPost.value = post;
    showModal.value = true;
    modalConfig.value = {
      title: 'Delete Post',
      message: `Are you sure you want to delete "${post.title}"?`,
      type: 'danger',
      confirmText: 'Delete',
      action: 'delete'
    };
  } else {
    alert('You do not have permission to delete posts');
  }
};

const showSaveToDraftsModal = (post) => {
  selectedPost.value = post;
  showModal.value = true;
  modalConfig.value = {
    title: 'Save to Drafts',
    message: 'You have unsaved changes. Would you like to save this post to drafts?',
    type: 'info',
    confirmText: 'Save to Drafts',
    cancelText: 'Discard',
    action: 'saveToDrafts'
  };
};

const saveToDrafts = (post) => {
  if (!post.id) {
    post.id = Date.now();
  }

  post.status = 'drafts';
  if (!post.creationDate) {
    post.creationDate = new Date().toISOString();
  }

  const existingIndex = posts.value.findIndex(p => p.id === post.id);
  if (existingIndex === -1) {
    posts.value.push(post);
  } else {
    posts.value[existingIndex] = post;
  }

  const drafts = posts.value.filter(p => p.status === 'drafts');
  localStorage.setItem('draftPosts', JSON.stringify(drafts));

  localStorage.removeItem('pendingPost');

  currentTab.value = 'drafts';
};

const handleModalConfirm = () => {
  if (!selectedPost.value) return;

  if (modalConfig.value.action === 'delete') {
    const index = posts.value.findIndex(p => p.id === selectedPost.value.id);
    if (index !== -1) {
      posts.value.splice(index, 1);

      if (selectedPost.value.status === 'drafts') {
        const drafts = posts.value.filter(p => p.status === 'drafts');
        localStorage.setItem('draftPosts', JSON.stringify(drafts));
      }
    }
  } else if (modalConfig.value.action === 'saveToDrafts') {
    saveToDrafts(selectedPost.value);
  }

  showModal.value = false;
  selectedPost.value = null;
};

const handleModalCancel = () => {
  if (modalConfig.value.action === 'saveToDrafts') {
    localStorage.removeItem('pendingPost');
  }

  showModal.value = false;
  selectedPost.value = null;
};

const viewPostDetails = (post) => {
  console.log('Navigating to post detail page', post.id);
  router.push(`/marketing-tools/social-platforms/post/${post.id}`);
};

// Sample social media platforms (only visible to agents)
const platforms = ref([
  {
    id: 'facebook',
    name: 'Facebook',
    icon: 'fb',
    handle: '@yourbusiness',
    followers: 1250,
    engagement: 3.2
  },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: 'ig',
    handle: '@yourbusiness',
    followers: 2800,
    engagement: 4.7
  },
  {
    id: 'twitter',
    name: 'Twitter',
    icon: 'tw',
    handle: '@yourbusiness',
    followers: 965,
    engagement: 2.1
  }
]);

// Sample analytics data (visible to both agents and admins)
const stats = ref({
  impressions: '15,872',
  engagement: '3.8',
  clickThrough: '2.4',
  audienceGrowth: '+185'
});
</script>

<style scoped>
.social-platforms {
  padding: 2rem;
  background-color: #fff;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  max-width: 1200px;
  margin: 0 auto;
}

.social-platforms__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.create-post-button {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.75rem 1.25rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #fff;
  background-color: #2563eb;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  box-shadow: 0 1px 3px rgba(37, 99, 235, 0.2);
}

.create-post-button:hover {
  background-color: #1d4ed8;
}

.create-post-button__icon {
  font-size: 1.25rem;
  line-height: 1;
}

.tab-navigation {
  display: flex;
  gap: 0.75rem;
}

.tab-button {
  padding: 0.75rem 1.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.tab-button:hover {
  color: #4b5563;
  border-color: #d1d5db;
  background: #f9fafb;
}

.tab-button--active {
  color: #2563eb;
  background: #eff6ff;
  border-color: #bfdbfe;
  font-weight: 600;
}

.tab-button__count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.5rem;
  padding: 0.125rem 0.5rem;
  font-size: 0.75rem;
  background: #f3f4f6;
  border-radius: 9999px;
  color: #4b5563;
  min-width: 1.5rem;
}

.tab-button--active .tab-button__count {
  background: #dbeafe;
  color: #2563eb;
}

.posts-container {
  margin-bottom: 3rem;
}

.posts-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.posts-list--grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

.post-card {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1.25rem;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  transition: all 0.2s ease;
  cursor: pointer;
}

.post-card--grid {
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 0;
  overflow: hidden;
}

.post-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.post-card--grid:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.post-card__thumbnail {
  flex-shrink: 0;
  width: 120px;
  height: 80px;
  overflow: hidden;
  border-radius: 0.5rem;
}

.post-card__thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.post-card:hover .post-card__thumbnail img {
  transform: scale(1.05);
}

.post-card__thumbnail--grid {
  width: 100%;
  height: 200px;
  border-radius: 0.75rem 0.75rem 0 0;
}

.post-card__content {
  flex: 1;
  min-width: 0;
}

.post-card__content--grid {
  padding: 1.5rem;
}

.post-card__title {
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.post-card--grid .post-card__title {
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-card__schedule {
  margin: 0;
  font-size: 0.8125rem;
  color: #6b7280;
}

.post-card__actions {
  display: flex;
  gap: 0.5rem;
}

.post-card__actions--grid {
  padding: 1rem 1.5rem;
  border-top: 1px solid #e5e7eb;
  background: #f9fafb;
  display: flex;
  justify-content: flex-end;
}

.action-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  padding: 0.25rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-button:hover {
  transform: translateY(-1px);
}

.action-button--edit {
  color: #2563eb;
  background: #eff6ff;
}

.action-button--edit:hover {
  background: #dbeafe;
}

.action-button--delete {
  color: #dc2626;
  background: #fee2e2;
}

.action-button--delete:hover {
  background: #fecaca;
}

.action-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.empty-state {
  padding: 3rem;
  text-align: center;
  color: #6b7280;
  background: #f9fafb;
  border-radius: 0.75rem;
  border: 1px dashed #e5e7eb;
  margin: 1rem 0;
}

.social-profiles-section,
.social-insights-section {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #e5e7eb;
}

.social-profiles-section h2,
.social-insights-section h2 {
  margin: 0 0 1.5rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
}

.profiles-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

.profile-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  transition: all 0.2s ease;
}

.profile-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.profile-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  background: #eff6ff;
  color: #2563eb;
  font-size: 1rem;
  font-weight: bold;
}

.profile-info {
  flex: 1;
  min-width: 0;
}

.profile-info h3 {
  margin: 0 0 0.25rem 0;
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
}

.profile-info p {
  margin: 0 0 0.5rem 0;
  font-size: 0.875rem;
  color: #6b7280;
}

.profile-stats {
  display: flex;
  gap: 1rem;
  font-size: 0.8125rem;
  color: #4b5563;
}

.profile-action {
  padding: 0.5rem 1rem;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #4b5563;
  cursor: pointer;
  transition: all 0.2s ease;
}

.profile-action:hover {
  background: #f3f4f6;
  color: #111827;
}

.insights-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.5rem;
}

.insight-card {
  padding: 1.5rem;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  transition: all 0.2s ease;
}

.insight-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.insight-card h3 {
  margin: 0 0 0.75rem 0;
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;
}

.insight-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.5rem;
}

.insight-trend {
  font-size: 0.875rem;
  font-weight: 500;
}

.insight-trend.positive {
  color: #10b981;
}

.insight-trend.negative {
  color: #ef4444;
}

@media (max-width: 768px) {
  .social-platforms {
    padding: 1.5rem;
  }

  .social-platforms__header {
    flex-direction: column;
    align-items: stretch;
  }

  .create-post-button {
    width: 100%;
    justify-content: center;
  }

  .tab-navigation {
    width: 100%;
    flex-wrap: wrap;
  }

  .tab-button {
    flex: 1;
    text-align: center;
    white-space: nowrap;
  }

  .posts-list--grid {
    grid-template-columns: 1fr;
  }

  .post-card {
    flex-direction: column;
    align-items: flex-start;
  }

  .post-card__thumbnail {
    width: 100%;
    height: 160px;
  }

  .profiles-list,
  .insights-grid {
    grid-template-columns: 1fr;
  }
}
</style>
