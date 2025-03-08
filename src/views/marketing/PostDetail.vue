<template>
  <div class="post-detail">
    <div class="header">
      <button class="back-btn" @click="goBack">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="icon">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Posts
      </button>
      <div class="header-actions">
        <button class="edit-btn" @click="editPost">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="icon">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Edit Post
        </button>
        <button class="delete-btn" @click="showDeleteModal">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="icon">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Delete Post
        </button>
      </div>
    </div>

    <div v-if="!post" class="loading">Loading post...</div>
    <div v-else class="post-content">
      <div class="post-header">
        <h1>{{ post.title }}</h1>
        <div class="post-meta">
          <div class="meta-item">
            <span class="meta-label">Status:</span>
            <span class="status-badge" :class="post.status">{{ post.status }}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Created:</span>
            <span>{{ formatDate(post.creationDate) }}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Last Edited:</span>
            <span>{{ formatDate(post.lastEdited) }}</span>
          </div>
          <div v-if="post.status === 'scheduled'" class="meta-item">
            <span class="meta-label">Scheduled For:</span>
            <span>{{ formatDate(post.scheduledDate) }}</span>
          </div>
        </div>
      </div>

      <div v-if="post.image" class="post-image">
        <img :src="post.image" :alt="post.title">
      </div>

      <div class="post-text">
        {{ post.content }}
      </div>
    </div>

    <ConfirmationModal
      v-model="showModal"
      :title="modalConfig.title"
      :message="modalConfig.message"
      :type="modalConfig.type"
      :confirm-text="modalConfig.confirmText"
      @confirm="handleModalConfirm"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import ConfirmationModal from '@/components/ConfirmationModal.vue';

const router = useRouter();
const route = useRoute();
const post = ref(null);
const showModal = ref(false);
const modalConfig = ref({
  title: '',
  message: '',
  type: '',
  confirmText: '',
});

onMounted(() => {
  const posts = JSON.parse(localStorage.getItem('posts') || '[]');
  const existingPost = posts.find(p => p.id === Number(route.params.id));

  if (existingPost) {
    post.value = existingPost;
  } else {
    router.push('/RCR/marketing-tools/social-platforms');
  }
});

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

const goBack = () => {
  router.push('/RCR/marketing-tools/social-platforms');
};

const editPost = () => {
  router.push(`/RCR/marketing-tools/social-platforms/edit/${post.value.id}`);
};

const showDeleteModal = () => {
  showModal.value = true;
  modalConfig.value = {
    title: 'Delete Post',
    message: 'Are you sure you want to delete this post? This action cannot be undone.',
    type: 'delete',
    confirmText: 'Delete',
  };
};

const handleModalConfirm = () => {
  if (modalConfig.value.type === 'delete') {
    const posts = JSON.parse(localStorage.getItem('posts') || '[]');
    const updatedPosts = posts.filter(p => p.id !== post.value.id);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
    router.push('/RCR/marketing-tools/social-platforms');
  }
  showModal.value = false;
};
</script>

<style scoped>
.post-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.back-btn,
.edit-btn,
.delete-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.back-btn {
  background: none;
  border: 1px solid #e5e7eb;
  color: #6b7280;
}

.back-btn:hover {
  background: #f3f4f6;
}

.header-actions {
  display: flex;
  gap: 1rem;
}

.edit-btn {
  background: #e8f0fe;
  border: none;
  color: #1d4ed8;
}

.edit-btn:hover {
  background: #dbeafe;
}

.delete-btn {
  background: #fee2e2;
  border: none;
  color: #dc2626;
}

.delete-btn:hover {
  background: #fecaca;
}

.icon {
  width: 1.25rem;
  height: 1.25rem;
}

.loading {
  text-align: center;
  padding: 2rem;
  color: #6b7280;
  font-size: 0.875rem;
}

.post-content {
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.post-header {
  padding: 2rem;
  border-bottom: 1px solid #e5e7eb;
}

h1 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 1rem 0;
}

.post-meta {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.meta-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.meta-label {
  font-size: 0.75rem;
  font-weight: 500;
  color: #6b7280;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: capitalize;
}

.status-badge.draft {
  background: #e5e7eb;
  color: #374151;
}

.status-badge.scheduled {
  background: #dbeafe;
  color: #1d4ed8;
}

.status-badge.published {
  background: #dcfce7;
  color: #15803d;
}

.post-image {
  width: 100%;
  max-height: 400px;
  overflow: hidden;
}

.post-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.post-text {
  padding: 2rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #374151;
  white-space: pre-wrap;
}

@media (max-width: 640px) {
  .post-detail {
    padding: 1rem;
  }

  .header {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }

  .header-actions {
    flex-direction: column;
  }

  .back-btn,
  .edit-btn,
  .delete-btn {
    width: 100%;
    justify-content: center;
  }

  .post-header {
    padding: 1rem;
  }

  .post-meta {
    grid-template-columns: 1fr;
  }

  .post-text {
    padding: 1rem;
  }
}
</style>
