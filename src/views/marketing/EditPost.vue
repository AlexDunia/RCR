<template>
  <div class="edit-post">
    <div class="header">
      <button class="back-btn" @click="goBack">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="icon">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Posts
      </button>
      <h1>Edit Post</h1>
    </div>

    <div v-if="!post" class="loading">Loading post...</div>
    <div v-else class="post-form">
      <div class="form-group">
        <label for="title">Post Title</label>
        <input
          id="title"
          v-model="post.title"
          type="text"
          placeholder="Enter post title"
          class="form-input"
        >
      </div>

      <div class="form-group">
        <label for="image">Post Image</label>
        <div class="image-upload">
          <input
            id="image"
            type="file"
            accept="image/*"
            @change="handleImageUpload"
            class="file-input"
          >
          <div class="image-preview" v-if="imagePreview || post.image">
            <img :src="imagePreview || post.image" alt="Preview" class="preview-img">
            <button class="remove-image" @click="removeImage">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="icon">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div v-else class="upload-placeholder">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="upload-icon">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            <span>Click to upload image</span>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label for="content">Post Content</label>
        <textarea
          id="content"
          v-model="post.content"
          placeholder="Write your post content here..."
          class="form-input content-input"
          rows="6"
        ></textarea>
      </div>

      <div class="form-group">
        <label for="status">Post Status</label>
        <select id="status" v-model="post.status" class="form-input">
          <option value="draft">Draft</option>
          <option value="scheduled">Scheduled</option>
          <option value="published">Published</option>
        </select>
      </div>

      <div class="form-group" v-if="post.status === 'scheduled'">
        <label for="scheduledDate">Schedule Date</label>
        <input
          id="scheduledDate"
          v-model="post.scheduledDate"
          type="datetime-local"
          class="form-input"
        >
      </div>

      <div class="form-actions">
        <button class="btn-cancel" @click="showCancelModal">Cancel</button>
        <button class="btn-save" @click="showSaveModal" :disabled="!isFormValid">
          {{ post.status === 'published' ? 'Publish' : 'Save Changes' }}
        </button>
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
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import ConfirmationModal from '@/ui/ConfirmationModal.vue';

const router = useRouter();
const route = useRoute();
const showModal = ref(false);
const modalConfig = ref({
  title: '',
  message: '',
  type: '',
  confirmText: '',
});
const imagePreview = ref(null);
const post = ref(null);

onMounted(() => {
  const posts = JSON.parse(localStorage.getItem('posts') || '[]');
  const existingPost = posts.find(p => p.id === Number(route.params.id));

  if (existingPost) {
    post.value = { ...existingPost };
  } else {
    router.push('/RCR/marketing-tools/social-platforms');
  }
});

const isFormValid = computed(() => {
  if (!post.value) return false;
  return post.value.title.trim() &&
         post.value.content.trim() &&
         (post.value.status !== 'scheduled' || post.value.scheduledDate);
});

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
      post.value.image = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const removeImage = () => {
  imagePreview.value = null;
  post.value.image = null;
  // Reset file input
  const fileInput = document.getElementById('image');
  if (fileInput) fileInput.value = '';
};

const goBack = () => {
  showModal.value = true;
  modalConfig.value = {
    title: 'Leave Page',
    message: 'Are you sure you want to leave? Any unsaved changes will be lost.',
    type: 'default',
    confirmText: 'Leave',
  };
};

const showCancelModal = () => {
  showModal.value = true;
  modalConfig.value = {
    title: 'Cancel Edit',
    message: 'Are you sure you want to cancel? All changes will be lost.',
    type: 'delete',
    confirmText: 'Cancel Edit',
  };
};

const showSaveModal = () => {
  showModal.value = true;
  modalConfig.value = {
    title: post.value.status === 'published' ? 'Publish Post' : 'Save Changes',
    message: post.value.status === 'published'
      ? 'Are you sure you want to publish this post?'
      : 'Are you sure you want to save your changes?',
    type: 'update',
    confirmText: post.value.status === 'published' ? 'Publish' : 'Save',
  };
};

const handleModalConfirm = () => {
  if (modalConfig.value.type === 'delete' || modalConfig.value.title === 'Leave Page') {
    router.push('/RCR/marketing-tools/social-platforms');
  } else if (modalConfig.value.type === 'update') {
    // Update the post
    const posts = JSON.parse(localStorage.getItem('posts') || '[]');
    const index = posts.findIndex(p => p.id === post.value.id);
    if (index !== -1) {
      posts[index] = {
        ...post.value,
        lastEdited: new Date().toISOString(),
      };
      localStorage.setItem('posts', JSON.stringify(posts));
    }
    router.push('/RCR/marketing-tools/social-platforms');
  }
  showModal.value = false;
};
</script>

<style scoped>
.edit-post {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.header {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: none;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s ease;
}

.back-btn:hover {
  background: #f3f4f6;
}

.icon {
  width: 1.25rem;
  height: 1.25rem;
}

h1 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.loading {
  text-align: center;
  padding: 2rem;
  color: #6b7280;
  font-size: 0.875rem;
}

.post-form {
  background: white;
  border-radius: 0.75rem;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
}

.form-input {
  width: 100%;
  padding: 0.625rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  transition: border-color 0.2s ease;
}

.form-input:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
}

.content-input {
  resize: vertical;
  min-height: 150px;
}

.image-upload {
  position: relative;
  border: 2px dashed #d1d5db;
  border-radius: 0.5rem;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.image-upload:hover {
  border-color: #2563eb;
}

.file-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.upload-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
}

.upload-icon {
  width: 2rem;
  height: 2rem;
}

.image-preview {
  position: relative;
}

.preview-img {
  max-width: 100%;
  max-height: 300px;
  border-radius: 0.375rem;
}

.remove-image {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  padding: 0.25rem;
  background: white;
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}

.btn-cancel,
.btn-save {
  padding: 0.625rem 1.25rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-cancel {
  background: white;
  border: 1px solid #d1d5db;
  color: #6b7280;
}

.btn-cancel:hover {
  background: #f3f4f6;
}

.btn-save {
  background: #2563eb;
  border: none;
  color: white;
}

.btn-save:hover {
  background: #1d4ed8;
}

.btn-save:disabled {
  background: #93c5fd;
  cursor: not-allowed;
}

@media (max-width: 640px) {
  .edit-post {
    padding: 1rem;
  }

  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .post-form {
    padding: 1rem;
  }

  .form-actions {
    flex-direction: column;
  }

  .btn-cancel,
  .btn-save {
    width: 100%;
    text-align: center;
  }
}
</style>
