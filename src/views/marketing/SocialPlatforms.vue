<template>
  <div class="social-platforms">
    <div class="social-platforms__header">
      <button class="create-post-button" @click="handleCreatePost">
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
              >
                <svg class="action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
              </button>
              <button
                class="action-button action-button--delete"
                @click.stop="deletePost(post)"
                aria-label="Delete post"
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
import ConfirmationModal from '@/components/ConfirmationModal.vue';
import MarketingContentLoader from '@/components/marketing/MarketingContentLoader.vue';

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

onMounted(() => {
  console.log('SocialPlatforms component mounted');
  loadData();
});

// Remove the route watcher for layout
watch(() => router.currentRoute.value.query, () => {
  console.log('Route query changed, reloading data');
  loadData();
}, { immediate: true });

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
  console.log('Navigating to create post page');
  router.push('/marketing-tools/social-platforms/create');
};

const editPost = (post) => {
  console.log('Navigating to edit post page', post.id);
  router.push(`/marketing-tools/social-platforms/edit/${post.id}`);
};

const deletePost = (post) => {
  selectedPost.value = post;
  showModal.value = true;
  modalConfig.value = {
    title: 'Delete Post',
    message: 'Are you sure you want to delete this post?',
    type: 'delete',
    confirmText: 'Delete',
    cancelText: 'Cancel',
    action: 'delete'
  };
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
</script>

<style scoped>
.social-platforms {
  padding: 2rem;
  background-color: #fff;
  border: 1px solid #e0e0e0;
}

.social-platforms__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.create-post-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 10px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  background-color: #0052cc;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.create-post-button:hover {
  background-color: #0066ff;
}

.create-post-button__icon {
  font-size: 20px;
  line-height: 1;
}

.tab-navigation {
  display: flex;
  gap: 10px;
}

.tab-button {
  padding: 15px;
  font-size: 14px;
  font-weight: 500;
  color: #666;
  background: #fff;
  border: 1px solid #d3d3d3;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.tab-button--active {
  color: #0052cc;
  background: #e6f0fa;
  border-bottom: 1px solid #0052cc;
}

.tab-button__count {
  margin-left: 5px;
  padding: 2px 6px;
  font-size: 12px;
  background: #f4f5f7;
  border-radius: 10px;
}

.posts-container {
  margin-top: 2rem;
}

.posts-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.posts-list--grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px 0;
}

.post-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 10px;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.post-card--grid {
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 0;
  border-radius: 8px;
  overflow: hidden;
}

.post-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.post-card--grid:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.post-card__thumbnail {
  flex-shrink: 0;
  width: 100px;
  height: 60px;
  overflow: hidden;
  border-radius: 5px;
}

.post-card__thumbnail--grid {
  width: 100%;
  height: 200px;
  border-radius: 0;
}

.post-card__content {
  flex: 1;
}

.post-card__content--grid {
  padding: 16px;
}

.post-card__title {
  margin: 0 0 5px;
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.post-card__schedule {
  margin: 0;
  font-size: 12px;
  color: #666;
}

.post-card__actions {
  display: flex;
  gap: 5px;
}

.post-card__actions--grid {
  padding: 12px 16px;
  border-top: 1px solid #e0e0e0;
  background: #f8f9fa;
  display: flex;
  justify-content: flex-end;
}

.action-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  padding: 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.3s ease;
}

.action-button:hover {
  opacity: 0.8;
}

.action-button--edit {
  color: #0052cc;
  background: #e6f0fa;
}

.action-button--delete {
  color: #dc3545;
  background: #fee2e2;
}

.action-icon {
  width: 20px;
  height: 20px;
}

.empty-state {
  padding: 40px;
  text-align: center;
  color: #666;
  background: #f9fafb;
  border-radius: 8px;
  margin: 20px 0;
}

@media (max-width: 768px) {
  .social-platforms__header {
    flex-direction: column;
    gap: 1rem;
  }

  .create-post-button {
    width: 100%;
    justify-content: center;
  }

  .tab-navigation {
    width: 100%;
    flex-direction: column;
  }

  .tab-button {
    width: 100%;
    text-align: center;
  }

  .posts-list {
    flex-direction: column;
  }

  .post-card {
    flex-direction: column;
    align-items: flex-start;
  }

  .post-card__thumbnail {
    width: 100%;
    height: 120px;
  }

  .post-card__thumbnail--grid {
    height: 200px;
  }

  .post-card__actions {
    align-self: flex-end;
  }
}
</style>
