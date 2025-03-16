<template>
  <div class="create-post-container">
    <!-- Simple Header -->
    <div class="create-post-header">
      <div class="header-left">
        <button type="button" class="back-button" @click="goBack">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="back-icon">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <div class="header-content">
          <h1 class="header-title">Create post</h1>
          <p class="header-subtitle">Post once on all your favourite accounts</p>
        </div>
      </div>
      <div class="header-right">
        <button class="icon-button">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="icon">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </button>
        <button class="icon-button">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="icon">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>
        <div class="user-profile">
          <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User profile" class="user-avatar" />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="dropdown-icon">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>

    <!-- Two-column Layout -->
    <div class="main-content">
      <!-- Left Column - Account Selection -->
      <div class="accounts-column">
        <h2 class="accounts-title">Select account to post.</h2>

        <div class="select-all">
          <div class="checkbox-wrapper">
            <div class="checkbox-container">
              <input type="checkbox" id="selectAll" v-model="selectAllAccounts">
              <span class="checkmark">
                <svg v-if="selectAllAccounts" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="check-icon">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </span>
            </div>
            <label for="selectAll" class="select-all-label">Select all</label>
          </div>
        </div>

        <div class="accounts-list">
          <div v-for="account in socialAccounts" :key="account.id" class="account-item">
            <div class="account-info">
              <div class="account-avatar-container">
                <div class="account-avatar" :class="account.platform">
                  <img :src="account.avatar" alt="Account avatar">
                </div>
                <div class="platform-icon" :class="account.platform">
                  <img :src="getPlatformIcon(account.platform)" alt="Platform icon">
                </div>
              </div>
              <div class="account-details">
                <p class="account-handle">{{ account.handle }}</p>
                <p class="account-platform">{{ account.platformName }} account</p>
              </div>
            </div>
            <div class="account-checkbox">
              <div class="checkbox-container">
                <input type="checkbox" :id="'account-' + account.id" v-model="account.selected">
                <span class="checkmark">
                  <svg v-if="account.selected" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="check-icon">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="add-account">
          <button class="add-account-button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="add-icon">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            <span>Add/remove social media</span>
          </button>
        </div>
      </div>

      <!-- Right Column - Post Composer -->
      <div class="composer-column">
        <div class="composer-card">
          <div class="composer-header">
            <div class="user-info">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User avatar" class="user-avatar-small">
              <span class="user-name">Alexander</span>
            </div>
          </div>

          <div class="composer-body">
            <textarea
              class="post-textarea"
              placeholder="Write your post or question here"
              v-model="postData.content"
              @input="handleInput"
            ></textarea>

            <!-- Media Upload Section -->
            <div class="media-section">
              <div class="media-upload-header" @click="triggerFileInput" style="cursor: pointer;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="media-icon">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Add media</span>
              </div>

              <input
                type="file"
                ref="fileInput"
                @change="handleFileUpload"
                accept="image/*"
                multiple
                class="hidden-input"
              >

              <div class="media-preview" v-if="postData.media && postData.media.length">
                <div class="media-grid">
                  <div v-for="(media, index) in postData.media" :key="index" class="media-item">
                    <div class="media-overlay">
                      <div class="media-actions">
                        <button @click="viewFullImage(media)" class="action-button">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="action-icon">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button @click="deleteImage(index)" class="action-button">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="action-icon">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                      <img :src="media" alt="Media preview">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Publishing Options -->
          <div class="publishing-options">
            <div class="radio-group">
              <label class="radio-option" :class="{ selected: publishingOption === 'now' }">
                <input
                  type="radio"
                  v-model="publishingOption"
                  value="now"
                  name="publishing-option"
                >
                <div class="radio-button"></div>
                <span>Publish now</span>
              </label>
              <label class="radio-option" :class="{ selected: publishingOption === 'scheduled' }">
                <input
                  type="radio"
                  v-model="publishingOption"
                  value="scheduled"
                  name="publishing-option"
                >
                <div class="radio-button"></div>
                <span>Schedule for a specific date</span>
              </label>
            </div>

            <!-- Date and Time Selection -->
            <div v-if="publishingOption === 'scheduled'" class="datetime-selection">
              <div class="datetime-group">
                <label>Date</label>
                <input
                  type="date"
                  v-model="scheduledDate"
                  class="datetime-input"
                  :min="minDate"
                >
              </div>
              <div class="datetime-group">
                <label>Time</label>
                <input
                  type="time"
                  v-model="scheduledTime"
                  class="datetime-input"
                >
              </div>
            </div>
          </div>
        </div>

        <div class="composer-footer">
          <div class="footer-buttons">
            <button class="save-draft-button" @click="saveDraft">
              Save Draft
            </button>
            <button
              class="post-button"
              :class="{ ready: isReadyToPublish }"
              @click="submitPost"
              :disabled="!isFormValid"
            >
              {{ publishingOption === 'now' ? 'Post' : 'Schedule Post' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Full Image Modal -->
      <div v-if="fullImageUrl" class="full-image-modal" @click="closeFullImage">
        <div class="modal-content" @click.stop>
          <button class="close-button" @click="closeFullImage">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img :src="fullImageUrl" alt="Full size image">
        </div>
      </div>
    </div>

    <ConfirmationModal
      v-if="showModal"
      v-model="showModal"
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
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useLayoutStore } from '@/stores/layout';
import ConfirmationModal from '@/components/ConfirmationModal.vue';
import { useDateValidation } from '@/composables/useDateValidation'

// State management
const route = useRoute();
const layoutStore = useLayoutStore();
const hasUnsavedChanges = ref(false);
const publishingOption = ref('now');
const scheduledDate = ref('');
const scheduledTime = ref('');
const showModal = ref(false);
const selectAllAccounts = ref(false);
const fileInput = ref(null);

const modalConfig = ref({
  title: '',
  message: '',
  type: '',
  confirmText: '',
  cancelText: 'Cancel',
  action: null
});

// Social accounts data
const socialAccounts = ref([
  { id: 1, handle: '@alexanderrealtor_', platformName: 'LinkedIn', platform: 'linkedin', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', selected: false },
  { id: 2, handle: '@alexanderrealtor_', platformName: 'Instagram', platform: 'instagram', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', selected: false },
  { id: 3, handle: '@alexanderrealtor_', platformName: 'Facebook', platform: 'facebook', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', selected: false }
]);

// Post data
const postData = ref({
  id: null,
  title: '',
  content: '',
  media: ['https://picsum.photos/800/600?random=1', 'https://picsum.photos/800/600?random=2', 'https://picsum.photos/800/600?random=3'],
  status: 'drafts',
  creationDate: new Date().toISOString(),
  scheduledDate: null,
  publishedDate: null,
  accounts: []
});

// Utility function to get platform icon
function getPlatformIcon(platform) {
  const iconMap = {
    linkedin: 'https://cdn-icons-png.flaticon.com/512/174/174857.png',
    instagram: 'https://cdn-icons-png.flaticon.com/512/174/174855.png',
    facebook: 'https://cdn-icons-png.flaticon.com/512/174/174848.png'
  };
  return iconMap[platform] || '';
}

// Watchers for reactive updates
watch(selectAllAccounts, (newValue) => {
  socialAccounts.value.forEach(account => account.selected = newValue);
});

watch(socialAccounts, (newValue) => {
  const allSelected = newValue.every(account => account.selected);
  selectAllAccounts.value = allSelected;
  postData.value.accounts = newValue.filter(account => account.selected).map(account => account.id);
  hasUnsavedChanges.value = newValue.some(account => account.selected) || postData.value.content.trim() !== '';
}, { deep: true });

const isEditing = computed(() => route.params.id !== undefined);
const isFormValid = computed(() => postData.value.content.trim() !== '' && postData.value.accounts.length > 0);

// New computed properties
const { todayDate, isValidFutureDateTime } = useDateValidation()
const minDate = todayDate

const isReadyToPublish = computed(() => {
  if (!isFormValid.value) return false;
  if (publishingOption.value === 'now') return true;
  return scheduledDate.value && scheduledTime.value;
});

// Lifecycle hooks
onMounted(() => {
  console.log('CreateSocialPost component mounted');
  layoutStore.setLayout({ hideSidebar: true, hideHeader: true, background: '#f9fafb' });

  if (isEditing.value) {
    const postId = parseInt(route.params.id);
    console.log(`Editing post with ID: ${postId}`);
    const savedDrafts = localStorage.getItem('draftPosts');
    if (savedDrafts) {
      try {
        const drafts = JSON.parse(savedDrafts);
        const draft = drafts.find(d => d.id === postId);
        if (draft) {
          console.log('Found draft post to edit:', draft);
          postData.value = { ...draft };
          socialAccounts.value.forEach(account => account.selected = draft.accounts.includes(account.id));
          if (draft.scheduledDate) {
            const { date, time } = formatDateTimeForInput(draft.scheduledDate);
            scheduledDate.value = date;
            scheduledTime.value = time;
            publishingOption.value = 'scheduled';
          }
          return;
        }
      } catch (e) {
        console.error('Error loading draft:', e);
      }
    }
    console.log('Draft post not found, navigating back');
    navigateBack();
  }

  window.addEventListener('beforeunload', handleBeforeUnload);
});

onBeforeUnmount(() => {
  console.log('CreateSocialPost component unmounting');
  window.removeEventListener('beforeunload', handleBeforeUnload);
});

// Helper functions
function formatDateTimeForInput(dateString) {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).toLowerCase();
  return { date: formattedDate, time: formattedTime };
}

function handleInput() {
  hasUnsavedChanges.value = postData.value.content.trim() !== '' || socialAccounts.value.some(account => account.selected);
}

function goBack() {
  console.log('Back button clicked');
  if (hasUnsavedChanges.value) {
    console.log('Unsaved changes detected, showing confirmation dialog');
    // Sanitize data before storing to prevent XSS
    const sanitizedPostData = JSON.stringify(postData.value).replace(/</g, '&lt;').replace(/>/g, '&gt;');
    localStorage.setItem('pendingPost', sanitizedPostData);
    showModal.value = true;
    modalConfig.value = {
      title: 'Unsaved Changes',
      message: 'Save to drafts or discard?',
      type: 'info',
      confirmText: 'Save',
      cancelText: 'Discard',
      action: 'saveToDrafts'
    };
  } else {
    console.log('No unsaved changes, navigating back');
    navigateBack();
  }
}

function navigateBack() {
  // Use window.location.href for direct navigation to the specified route
  window.location.href = '/RCR/marketing-tools/social-platforms';
  layoutStore.resetLayout(); // Ensure layout resets before navigation
}

function handleModalConfirm() {
  console.log('Modal confirmed:', modalConfig.value.action);
  if (modalConfig.value.action === 'saveToDrafts') {
    saveToDrafts(postData.value);
  }
  showModal.value = false;
  hasUnsavedChanges.value = false;
  localStorage.removeItem('pendingPost');
  navigateBack();
}

function handleModalCancel() {
  console.log('Modal cancelled:', modalConfig.value.action);
  if (modalConfig.value.action === 'saveToDrafts') {
    localStorage.removeItem('pendingPost');
    hasUnsavedChanges.value = false;
    navigateBack();
  }
  showModal.value = false;
}

function handleBeforeUnload(event) {
  if (hasUnsavedChanges.value) {
    const sanitizedPostData = JSON.stringify(postData.value).replace(/</g, '&lt;').replace(/>/g, '&gt;');
    localStorage.setItem('pendingPost', sanitizedPostData);
    event.preventDefault();
    event.returnValue = '';
    return '';
  }
}

function saveToDrafts(post) {
  if (!post.id) post.id = Date.now();
  let drafts = [];
  const savedDrafts = localStorage.getItem('draftPosts');
  if (savedDrafts) {
    try {
      drafts = JSON.parse(savedDrafts);
    } catch (e) {
      console.error('Error parsing drafts:', e);
    }
  }
  const existingIndex = drafts.findIndex(d => d.id === post.id);
  const sanitizedPost = { ...post, content: post.content.replace(/</g, '&lt;').replace(/>/g, '&gt;') };
  if (existingIndex !== -1) drafts[existingIndex] = sanitizedPost;
  else drafts.push(sanitizedPost);
  localStorage.setItem('draftPosts', JSON.stringify(drafts));
}

function handleFileUpload(event) {
  const files = event.target.files;
  if (!files.length) return;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (!file.type.startsWith('image/')) continue;

    const reader = new FileReader();
    reader.onload = (e) => {
      postData.value.media.push(e.target.result);
      hasUnsavedChanges.value = true;
    };
    reader.readAsDataURL(file);
  }
  event.target.value = ''; // Reset file input
}

function saveDraft() {
  console.log('Saving draft');
  saveToDrafts(postData.value);
  showModal.value = false;
  hasUnsavedChanges.value = false;
  navigateBack();
}

function submitPost() {
  if (publishingOption.value === 'scheduled' && !validateScheduledDateTime()) {
    return
  }

  postData.value.status = publishingOption.value === 'now' ? 'published' : 'scheduled';
  if (publishingOption.value === 'scheduled') {
    const scheduledDateTime = new Date(`${scheduledDate.value}T${scheduledTime.value}`);
    postData.value.scheduledDate = scheduledDateTime.toISOString();
  } else {
    postData.value.publishedDate = new Date().toISOString();
  }

  saveToDrafts(postData.value);
  localStorage.removeItem('pendingPost');
  hasUnsavedChanges.value = false;
  navigateBack();
}

// New functions for media handling
const fullImageUrl = ref('');

function viewFullImage(imageUrl) {
  fullImageUrl.value = imageUrl;
}

function closeFullImage() {
  fullImageUrl.value = '';
}

function deleteImage(index) {
  postData.value.media.splice(index, 1);
}

function triggerFileInput() {
  fileInput.value.click();
}

function validateScheduledDateTime() {
  if (publishingOption.value === 'scheduled') {
    if (!isValidFutureDateTime(scheduledDate.value, scheduledTime.value)) {
      alert('Scheduled date and time cannot be in the past')
      return false
    }
  }
  return true
}
</script>

<style scoped>
.create-post-container {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  display: flex;
  flex-direction: column;
  background-color: #f9fafb;
}

/* Header Styles */
.create-post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background-color: #fff;
  border-bottom: 1px solid #e5e7eb;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.back-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  color: #4b5563;
  transition: color 0.3s ease;
}

.back-button:hover {
  color: #1f2937; /* Darker gray on hover */
}

.back-icon {
  width: 24px;
  height: 24px;
}

.header-content {
  display: flex;
  flex-direction: column;
}

.header-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  line-height: 1.2;
}

.header-subtitle {
  margin: 0;
  font-size: 14px;
  color: #6b7280;
  line-height: 1.4;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.icon-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f3f4f6;
  border: none;
  cursor: pointer;
}

.icon {
  width: 20px;
  height: 20px;
  color: #4b5563;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
}

.dropdown-icon {
  width: 16px;
  height: 16px;
  color: #4b5563;
}

/* Main Content Styles */
.main-content {
  display: flex;
  flex: 1;
  overflow-y: auto;
}

/* Left Column - Account Selection */
.accounts-column {
  width: 320px;
  padding: 24px;
  background-color: #f9fafb;
}

.accounts-title {
  font-size: 16px;
  font-weight: 500;
  color: #6b7280;
  margin: 0 0 16px 0;
}

.select-all {
  display: flex;
  align-items: center;
  padding-bottom: 16px;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 16px;
}

.checkbox-wrapper {
  display: flex;
  align-items: center;
}

.checkbox-container {
  position: relative;
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 8px;
}

.checkbox-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  background-color: #fff;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.checkbox-container input:checked ~ .checkmark {
  background-color: #10b981;
  border-color: #10b981;
}

.check-icon {
  width: 14px;
  height: 14px;
  color: white;
}

.select-all-label {
  font-size: 14px;
  color: #4b5563;
  cursor: pointer;
}

.accounts-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}

.account-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.account-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.account-avatar-container {
  position: relative;
  width: 40px;
  height: 40px;
}

.account-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.platform-icon {
  position: absolute;
  bottom: -2px;
  right: -2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.platform-icon img {
  width: 12px;
  height: 12px;
}

.account-avatar.linkedin {
  background-color: #0077b5;
}

.account-avatar.instagram {
  background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
}

.account-avatar.facebook {
  background-color: #1877f2;
}

.account-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.account-details {
  display: flex;
  flex-direction: column;
}

.account-handle {
  font-size: 14px;
  font-weight: 500;
  color: #111827;
  margin: 0;
}

.account-platform {
  font-size: 12px;
  color: #6b7280;
  margin: 0;
}

.add-account {
  margin-top: 16px;
}

.add-account-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 12px;
  background-color: #fff;
  border: 1px dashed #d1d5db;
  border-radius: 8px;
  color: #4b5563;
  font-size: 14px;
  cursor: pointer;
}

.add-icon {
  width: 16px;
  height: 16px;
}

/* Right Column - Post Composer */
.composer-column {
  flex: 1;
  padding: 24px;
}

.composer-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.composer-header {
  padding: 16px;
  border-bottom: 1px solid #e5e7eb;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.user-avatar-small {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.user-name {
  font-size: 14px;
  font-weight: 500;
  color: #111827;
}

.composer-body {
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.post-textarea {
  width: 100%;
  min-height: 120px;
  padding: 0;
  border: none;
  resize: none;
  font-size: 14px;
  color: #111827;
  background-color: transparent;
  font-family: inherit;
}

.post-textarea:focus {
  outline: none;
}

.post-textarea::placeholder {
  color: #9ca3af;
}

.media-preview {
  margin-top: 12px;
}

.media-grid {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.media-item {
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.media-overlay {
  position: relative;
  width: 100%;
  height: 100%;
}

.media-overlay img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.media-actions {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.2s ease;
}

.action-button {
  padding: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-button:hover {
  background: rgba(255, 255, 255, 0.2);
}

.action-icon {
  width: 16px;
  height: 16px;
}

.media-upload-header {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #6B7280;
  font-size: 14px;
  padding: 8px 12px;
  border: 1px dashed #D1D5DB;
  border-radius: 6px;
  transition: all 0.2s ease;
  margin-bottom: 0;
}

.composer-footer {
  padding: 16px;
  border-top: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.media-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: transparent;
  border: none;
  color: #4b5563;
  font-size: 14px;
  cursor: pointer;
}

.media-icon {
  width: 18px;
  height: 18px;
}

.submit-button {
  padding: 8px 16px;
  background-color: #10b981;
  border: none;
  border-radius: 8px;
  color: #fff;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
}

.media-overlay:hover .media-actions {
  opacity: 1;
}

.hidden-input {
  display: none;
}

/* Full Image Modal Styles */
.full-image-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
}

.modal-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
}

.modal-content img {
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
}

.close-button {
  position: absolute;
  top: -40px;
  right: -40px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
}

.close-button svg {
  width: 24px;
  height: 24px;
  color: white;
}

/* Mobile Responsive Adjustments */
@media (max-width: 768px) {
  .main-content {
    flex-direction: column;
  }

  .accounts-column {
    width: 100%;
    order: 2;
  }

  .composer-column {
    order: 1;
  }

  .create-post-header {
    padding: 12px 16px;
  }

  .header-left {
    gap: 12px;
  }

  .media-grid {
    gap: 8px;
  }

  .media-item {
    width: 70px;
    height: 70px;
  }

  .close-button {
    top: 16px;
    right: 16px;
  }

  .modal-content img {
    max-height: 80vh;
  }
}

@media (max-width: 480px) {
  .media-item {
    width: 60px;
    height: 60px;
  }
}

/* Media Upload Section */
.media-section {
  margin-top: 24px;
  border-top: 1px solid #e5e7eb;
  padding-top: 24px;
}

.media-upload-header {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #6B7280;
  font-size: 14px;
  margin-bottom: 16px;
  padding: 8px;
  border: 1px dashed #D1D5DB;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.media-upload-header:hover {
  border-color: #6366F1;
  color: #6366F1;
}

.media-upload-header .media-icon {
  width: 20px;
  height: 20px;
}

/* Publishing Options */
.publishing-options {
  margin-top: 24px;
  border-top: 1px solid #e5e7eb;
  padding: 24px 24px 32px;
}

.radio-group {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.radio-option {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  user-select: none;
  padding: 12px;
  border-radius: 8px;
  transition: background-color 0.2s ease;
}

.radio-option:hover {
  background-color: #F3F4F6;
}

.radio-option.selected {
  background-color: #EFF6FF;
}

.radio-option input[type="radio"] {
  display: none;
}

.radio-button {
  width: 20px;
  height: 20px;
  border: 2px solid #D1D5DB;
  border-radius: 50%;
  position: relative;
  transition: all 0.2s ease;
}

.radio-option input[type="radio"]:checked + .radio-button {
  border-color: #6366F1;
}

.radio-option input[type="radio"]:checked + .radio-button::after {
  content: '';
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: #6366F1;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.radio-option span {
  font-size: 14px;
  color: #374151;
}

/* Date and Time Selection */
.datetime-selection {
  display: flex;
  gap: 24px;
  margin-top: 16px;
  padding-left: 32px;
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.datetime-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.datetime-group label {
  font-size: 14px;
  color: #374151;
  font-weight: 500;
}

.datetime-input {
  padding: 8px 12px;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  font-size: 14px;
  color: #374151;
  background-color: white;
  min-width: 180px;
  cursor: pointer;
  transition: border-color 0.2s ease;
}

.datetime-input:hover {
  border-color: #6366F1;
}

.datetime-input:focus {
  outline: none;
  border-color: #6366F1;
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.1);
}

/* Footer Buttons */
.footer-buttons {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

.save-draft-button {
  padding: 8px 16px;
  background-color: #F3F4F6;
  border: none;
  border-radius: 6px;
  color: #374151;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.save-draft-button:hover {
  background-color: #E5E7EB;
}

.post-button {
  padding: 8px 16px;
  background-color: #D1D5DB;
  border: none;
  border-radius: 6px;
  color: white;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.post-button.ready {
  background-color: #2563EB;
}

.post-button.ready:hover {
  background-color: #1D4ED8;
}

.post-button:disabled {
  background-color: #93C5FD;
  cursor: not-allowed;
}

@media (max-width: 640px) {
  .datetime-selection {
    flex-direction: column;
    gap: 16px;
  }
}
</style>
