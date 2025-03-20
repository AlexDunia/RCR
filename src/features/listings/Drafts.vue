<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const draftListings = ref([]);
const isLoading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    // Simulate API call with timeout
    setTimeout(() => {
      draftListings.value = [
        {
          id: 201,
          title: 'Ranch-Style Home with Pool',
          price: 495000,
          address: '123 Rural Rd, Anytown, CA 12345',
          lastEdited: '2023-06-15',
          progress: 75
        },
        {
          id: 202,
          title: 'Mountain View Cabin',
          price: 350000,
          address: '456 Summit Ln, Anytown, CA 12345',
          lastEdited: '2023-06-14',
          progress: 50
        },
        {
          id: 203,
          title: 'Downtown Loft Apartment',
          price: 279000,
          address: '789 Urban St, Anytown, CA 12345',
          lastEdited: '2023-06-12',
          progress: 30
        }
      ];
      isLoading.value = false;
    }, 800);
  } catch (err) {
    console.error('Failed to load draft listings:', err);
    error.value = 'Failed to load draft listings. Please try again.';
    isLoading.value = false;
  }
});

const editDraft = (id) => {
  router.push(`/edit-listing/${id}`);
};

const publishDraft = (id) => {
  // In a real app, this would send an API request to publish the draft
  const draft = draftListings.value.find(draft => draft.id === id);
  if (draft && draft.progress >= 80) {
    // If the draft is mostly complete, we can publish it
    draftListings.value = draftListings.value.filter(draft => draft.id !== id);
    // Show success message or notification here
  } else {
    // Otherwise, show an error message
    alert('This draft is not ready to publish. Please complete all required fields first.');
  }
};

const deleteDraft = (id) => {
  if (confirm('Are you sure you want to delete this draft? This action cannot be undone.')) {
    draftListings.value = draftListings.value.filter(draft => draft.id !== id);
    // Show success message or notification here
  }
};

const formatPrice = (price) => {
  return price ? `$${price.toLocaleString()}` : 'Price not set';
};
</script>

<template>
  <div class="drafts-page">
    <div class="page-header">
      <h1>Draft Listings</h1>
      <button class="add-listing-btn" @click="router.push('/add-listing')">
        Create New Listing
      </button>
    </div>

    <div v-if="isLoading" class="loading-state">
      <div class="loading-spinner"></div>
      <p>Loading draft listings...</p>
    </div>

    <div v-else-if="error" class="error-message">
      {{ error }}
    </div>

    <div v-else-if="draftListings.length === 0" class="empty-state">
      <p>You don't have any draft listings.</p>
      <button class="create-btn" @click="router.push('/add-listing')">
        Create Your First Listing
      </button>
    </div>

    <div v-else class="drafts-grid">
      <div v-for="draft in draftListings" :key="draft.id" class="draft-card">
        <div class="draft-header">
          <h2 class="draft-title">{{ draft.title || 'Untitled Listing' }}</h2>
          <div class="draft-price">{{ formatPrice(draft.price) }}</div>
        </div>

        <p class="draft-address">{{ draft.address || 'Address not set' }}</p>

        <div class="draft-info">
          <div class="info-item">
            <span class="info-label">Last Edited:</span>
            <span class="info-value">{{ draft.lastEdited }}</span>
          </div>

          <div class="progress-container">
            <div class="progress-label">
              <span>Completion</span>
              <span>{{ draft.progress }}%</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: `${draft.progress}%` }"
                  :class="{
                    'low': draft.progress < 50,
                    'medium': draft.progress >= 50 && draft.progress < 80,
                    'high': draft.progress >= 80
                  }">
              </div>
            </div>
          </div>
        </div>

        <div class="draft-actions">
          <button class="edit-btn" @click="editDraft(draft.id)">
            Continue Editing
          </button>
          <button class="publish-btn" @click="publishDraft(draft.id)"
                  :disabled="draft.progress < 80">
            {{ draft.progress >= 80 ? 'Publish' : 'Not Ready' }}
          </button>
          <button class="delete-btn" @click="deleteDraft(draft.id)">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.drafts-page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.page-header h1 {
  margin: 0;
  font-size: 1.8rem;
  color: #333;
}

.add-listing-btn {
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-weight: 600;
  cursor: pointer;
}

.add-listing-btn:hover {
  background-color: #1565c0;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
}

.loading-spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid #1976d2;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
  margin-bottom: 15px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-message {
  padding: 20px;
  background-color: #ffebee;
  color: #c62828;
  border-radius: 8px;
  text-align: center;
}

.empty-state {
  padding: 40px;
  text-align: center;
  background-color: #f5f5f5;
  border-radius: 8px;
  color: #757575;
}

.create-btn {
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-weight: 600;
  margin-top: 15px;
  cursor: pointer;
}

.drafts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
}

.draft-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.draft-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
}

.draft-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  color: #333;
  flex: 1;
}

.draft-price {
  font-size: 1.2rem;
  font-weight: 700;
  color: #1976d2;
  white-space: nowrap;
  margin-left: 10px;
}

.draft-address {
  margin: 0 0 15px 0;
  color: #555;
}

.draft-info {
  background-color: #f5f7fa;
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 15px;
}

.info-item {
  display: flex;
  margin-bottom: 12px;
}

.info-label {
  font-weight: 600;
  color: #555;
  min-width: 100px;
  font-size: 0.9rem;
}

.info-value {
  color: #333;
  font-size: 0.9rem;
}

.progress-container {
  margin-top: 5px;
}

.progress-label {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  font-size: 0.9rem;
  color: #555;
}

.progress-bar {
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  transition: width 0.3s ease;
}

.progress-fill.low {
  background-color: #ff9800;
}

.progress-fill.medium {
  background-color: #03a9f4;
}

.progress-fill.high {
  background-color: #4caf50;
}

.draft-actions {
  display: flex;
  gap: 10px;
  margin-top: auto;
  padding-top: 15px;
}

.edit-btn,
.publish-btn,
.delete-btn {
  padding: 8px 12px;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.9rem;
  border: none;
  flex: 1;
}

.edit-btn {
  background-color: #e3f2fd;
  color: #1976d2;
}

.edit-btn:hover {
  background-color: #bbdefb;
}

.publish-btn {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.publish-btn:hover:not(:disabled) {
  background-color: #c8e6c9;
}

.publish-btn:disabled {
  background-color: #f5f5f5;
  color: #9e9e9e;
  cursor: not-allowed;
  opacity: 0.7;
}

.delete-btn {
  background-color: #ffebee;
  color: #c62828;
}

.delete-btn:hover {
  background-color: #ffcdd2;
}

@media (max-width: 768px) {
  .drafts-grid {
    grid-template-columns: 1fr;
  }

  .draft-actions {
    flex-direction: column;
  }
}
</style>
