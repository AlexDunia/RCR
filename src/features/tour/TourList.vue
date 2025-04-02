<template>
  <div class="tour-list">
    <!-- Page Header -->
    <div class="page-header">
      <div>
        <h1>Tours</h1>
        <p class="subtitle">Manage and track your property tours and schedules</p>
      </div>
    </div>

    <!-- Create Tour Card -->
    <div class="create-tour-card">
      <div class="create-tour-content">
        <h2>Create a tour</h2>
        <p>Schedule an apartment tour with your client</p>
      </div>
      <button class="create-tour-btn" @click="router.push('/tours/create')">
        <svg class="plus-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        Create tour
      </button>
    </div>

    <!-- Tour Navigation -->
    <div class="tour-tabs">
      <router-link
        v-for="tab in tabs"
        :key="tab.path"
        :to="tab.path"
        class="tab"
        :class="{ active: route.path === tab.path }"
      >
        <svg v-if="tab.name === 'In progress'" class="tab-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        <svg v-if="tab.name === 'Scheduled'" class="tab-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        </svg>
        <svg v-if="tab.name === 'Drafts'" class="tab-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
        </svg>
        <svg v-if="tab.name === 'Completed'" class="tab-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {{ tab.name }}
      </router-link>
    </div>

    <!-- Clear All Button -->
    <div v-if="route.path.includes('/drafts') && filteredTours.length > 0" class="clear-all-container">
      <button class="clear-all-button" @click="showClearAllConfirm = true">
        Clear All Drafts
      </button>
    </div>

    <!-- Skeleton Loader -->
    <div v-if="loading" class="tour-list">
      <div v-for="i in 4" :key="i" class="tour-card skeleton">
        <div class="tour-content">
          <div class="skeleton-title"></div>
          <div class="skeleton-status"></div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="filteredTours.length === 0" class="empty-state">
      <div class="empty-state-icon">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <h3 class="empty-state-title">
        {{ getEmptyStateTitle() }}
      </h3>
      <p class="empty-state-text">
        {{ getEmptyStateText() }}
      </p>
      <button v-if="route.path.includes('/drafts') || route.path.includes('/scheduled')" class="create-tour-btn" @click="router.push('/tours/create')">
        Create New Tour
      </button>
    </div>

    <!-- Tour List -->
    <div v-else class="tour-cards">
      <div
        v-for="tour in filteredTours"
        :key="tour.id"
        class="tour-card"
        :class="{ 'no-click': tour.status === 'draft' }"
        @click="tour.status !== 'draft' && handleTourClick(tour)"
      >
        <div class="tour-content">
          <div class="tour-image">
            <img :src="tour.image || '/default-property-image.jpg'" :alt="tour.title" @error="handleImageError" />
          </div>
          <div class="tour-info">
            <div class="tour-title">{{ truncateTitle(tour.title) }}</div>
            <div class="tour-date">Started: {{ formatDate(tour.startedAt || tour.createdAt) }}</div>

            <!-- Drafts -->
            <div v-if="tour.status === 'draft'" class="button-container">
              <button class="delete-button" @click.stop="confirmDelete(tour)" aria-label="Delete draft">
                <svg class="delete-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
              <button class="edit-button" @click.stop="handleEditClick(tour)">
                <svg class="edit-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                Continue editing
              </button>
            </div>

            <!-- Completed -->
            <div v-if="tour.status === 'completed'" class="status-text completed">
              <svg class="check-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <span class="status-label">Completed:</span> {{ formatDate(tour.completedAt) }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Dialog -->
    <div v-if="showDeleteConfirm" class="dialog-overlay" @click="showDeleteConfirm = false">
      <div class="dialog" @click.stop>
        <h3 class="dialog-title">Delete Draft?</h3>
        <p class="dialog-text">Do you wish to delete this draft?</p>
        <div class="dialog-actions">
          <button class="dialog-btn dialog-btn--secondary" @click="showDeleteConfirm = false">
            No
          </button>
          <button class="dialog-btn dialog-btn--primary" @click="handleDelete">
            Yes
          </button>
        </div>
      </div>
    </div>

    <!-- Clear All Confirmation Dialog -->
    <div v-if="showClearAllConfirm" class="dialog-overlay" @click="showClearAllConfirm = false">
      <div class="dialog" @click.stop>
        <h3 class="dialog-title">Clear All Drafts?</h3>
        <p class="dialog-text">Do you wish to delete all drafts? This action cannot be undone.</p>
        <div class="dialog-actions">
          <button class="dialog-btn dialog-btn--secondary" @click="showClearAllConfirm = false">
            No
          </button>
          <button class="dialog-btn dialog-btn--primary" @click="handleClearAll">
            Yes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useTourStore } from '@/stores/tourStore'

const router = useRouter()
const route = useRoute()
const tourStore = useTourStore()

const loading = ref(true)
const showDeleteConfirm = ref(false)
const showClearAllConfirm = ref(false)
const tourToDelete = ref(null)

const tabs = [
  {
    name: 'In progress',
    path: '/tours/in-progress'
  },
  {
    name: 'Scheduled',
    path: '/tours/scheduled'
  },
  {
    name: 'Drafts',
    path: '/tours/drafts'
  },
  {
    name: 'Completed',
    path: '/tours/completed'
  }
]

// Get filtered tours based on current tab
const filteredTours = computed(() => {
  const path = route.path
  if (path.includes('/drafts')) {
    return tourStore.getDraftTours()
  } else if (path.includes('/completed')) {
    return tourStore.getCompletedTours()
  } else if (path.includes('/in-progress')) {
    return tourStore.getInProgressTours()
  } else {
    return tourStore.getScheduledTours()
  }
})

// Format date for display
const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  })
}

// Truncate title if too long
const truncateTitle = (title) => {
  return title?.length > 50 ? title.substring(0, 47) + '...' : title
}

// Handle tour click
const handleTourClick = (tour) => {
  router.push(`/tours/${tour.id}`)
}

// Handle edit click
const handleEditClick = (tour) => {
  router.push(`/tours/${tour.id}/edit`)
}

const confirmDelete = (tour) => {
  tourToDelete.value = tour
  showDeleteConfirm.value = true
}

const handleDelete = async () => {
  if (tourToDelete.value) {
    await tourStore.deleteTour(tourToDelete.value.id)
    showDeleteConfirm.value = false
    tourToDelete.value = null
  }
}

// Clear all drafts
const handleClearAll = async () => {
  await tourStore.clearAllDrafts()
  showClearAllConfirm.value = false
}

// Handle image errors
const handleImageError = (event) => {
  event.target.src = '/default-property-image.jpg'
}

// Get empty state messages
const getEmptyStateTitle = () => {
  const path = route.path
  if (path.includes('/drafts')) {
    return 'No draft tours'
  } else if (path.includes('/completed')) {
    return 'No completed tours'
  } else {
    return 'No scheduled tours'
  }
}

const getEmptyStateText = () => {
  const path = route.path
  if (path.includes('/drafts')) {
    return 'You have no draft tours. Create a new tour to get started.'
  } else if (path.includes('/completed')) {
    return 'You have no completed tours yet.'
  } else {
    return 'You have no scheduled tours. Create a new tour to get started.'
  }
}

// Load data
onMounted(async () => {
  loading.value = true
  await tourStore.initTours()
  setTimeout(() => {
    loading.value = false
  }, 800)
})
</script>

<style scoped>
.tour-list {
  padding: 24px;
}

.page-header {
  margin-bottom: 24px;
}

.page-header h1 {
  font-size: 24px;
  font-weight: 600;
  color: #111827;
  margin: 0;
  line-height: 1.2;
}

.subtitle {
  color: #6B7280;
  font-size: 14px;
  margin: 4px 0 0;
}

.create-tour-card {
  background: white;
  border-radius: 8px;
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  border: 1px solid #E5E7EB;
}

.create-tour-content h2 {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 4px 0;
}

.create-tour-content p {
  color: #6B7280;
  font-size: 14px;
  margin: 0;
}

.create-tour-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #1D4ED8;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.create-tour-btn:hover {
  background: #1E40AF;
}

.plus-icon {
  width: 20px;
  height: 20px;
  stroke: currentColor;
  stroke-width: 2;
}

.tour-tabs {
  display: flex;
  gap: 32px;
  margin-bottom: 24px;
  border-bottom: 1px solid #E5E7EB;
  padding: 0;
}

.tab {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 4px;
  color: #6B7280;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  position: relative;
  transition: color 0.2s;
}

.tab:hover {
  color: #111827;
}

.tab.active {
  color: #1D4ED8;
}

.tab.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background: #1D4ED8;
}

.tab-icon {
  width: 20px;
  height: 20px;
  stroke: currentColor;
  stroke-width: 2;
}

.tour-cards {
  display: grid;
  gap: 16px;
}

.tour-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  border: 1px solid #E5E7EB;
  transition: all 0.2s ease;
}

.tour-card:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border-color: #D1D5DB;
}

.tour-content {
  display: flex;
  padding: 16px;
  gap: 16px;
}

.tour-image {
  width: 120px;
  height: 120px;
  border-radius: 4px;
  overflow: hidden;
  flex-shrink: 0;
}

.tour-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.tour-info {
  flex: 1;
  min-width: 0;
}

.tour-title {
  font-size: 16px;
  font-weight: 500;
  color: #111827;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tour-date {
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 12px;
}

.button-container {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}

.delete-button,
.edit-button {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.delete-button {
  background: #FEE2E2;
  color: #DC2626;
  border: none;
}

.delete-button:hover {
  background: #FEE2E2;
  opacity: 0.9;
}

.edit-button {
  background: #F3F4F6;
  color: #374151;
  border: none;
}

.edit-button:hover {
  background: #E5E7EB;
}

.delete-icon,
.edit-icon {
  width: 16px;
  height: 16px;
}

.status-text {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #6B7280;
  font-size: 14px;
}

.status-text.completed {
  color: #059669;
}

.status-label {
  font-weight: 500;
}

.check-icon {
  width: 16px;
  height: 16px;
  color: currentColor;
}

/* Empty State */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid #E5E7EB;
}

.empty-state-icon {
  margin-bottom: 20px;
  color: #9CA3AF;
}

.empty-state-title {
  font-size: 18px;
  font-weight: 600;
  color: #374151;
  margin: 0 0 12px;
}

.empty-state-text {
  color: #6B7280;
  font-size: 14px;
  max-width: 300px;
  margin-bottom: 24px;
}

/* Clear All Button */
.clear-all-container {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
}

.clear-all-button {
  background: #EF4444;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s;
}

.clear-all-button:hover {
  opacity: 0.9;
}

/* Dialog */
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.dialog {
  background: white;
  border-radius: 8px;
  padding: 24px;
  width: 400px;
  max-width: 90%;
}

.dialog-title {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 8px;
}

.dialog-text {
  color: #6B7280;
  margin: 0 0 24px;
}

.dialog-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

.dialog-btn {
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.dialog-btn--primary {
  background: #EF4444;
  color: white;
  border: none;
}

.dialog-btn--primary:hover {
  opacity: 0.9;
}

.dialog-btn--secondary {
  background: white;
  color: #6B7280;
  border: 1px solid #D1D5DB;
}

.dialog-btn--secondary:hover {
  border-color: #6B7280;
  color: #374151;
}

/* Skeleton Loading */
.skeleton {
  position: relative;
  overflow: hidden;
}

.skeleton::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: translateX(-100%);
  background-image: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0,
    rgba(255, 255, 255, 0.2) 20%,
    rgba(255, 255, 255, 0.5) 60%,
    rgba(255, 255, 255, 0)
  );
  animation: shimmer 2s infinite;
}

.skeleton-title {
  width: 60%;
  height: 20px;
  background-color: #E5E7EB;
  border-radius: 4px;
  margin-bottom: 8px;
}

.skeleton-status {
  width: 120px;
  height: 20px;
  background-color: #E5E7EB;
  border-radius: 4px;
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
</style>
