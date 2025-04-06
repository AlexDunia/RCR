<template>
  <div class="education-training-container">
    <div class="section-controls">
      <div class="section-filters">
        <button
          class="filter-button"
          :class="{ active: activeFilter === 'all' }"
          @click="setFilter('all')"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 9V15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9 12H15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          All Sessions
          <span class="count-badge">{{ allSessions.length }}</span>
        </button>
        <button
          class="filter-button"
          :class="{ active: activeFilter === 'upcoming' }"
          @click="setFilter('upcoming')"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 8V12L14 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Upcoming
          <span class="count-badge">{{
            allSessions.filter(s => s.date && new Date(s.date) >= new Date()).length
          }}</span>
        </button>
        <button
          class="filter-button"
          :class="{ active: activeFilter === 'completed' }"
          @click="setFilter('completed')"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 11L12 14L22 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Completed
          <span class="count-badge">{{
            allSessions.filter(s => s.date && new Date(s.date) < new Date()).length
          }}</span>
        </button>
      </div>
      <router-link to="/admin/education-training/create" class="create-button">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5V19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Create New Session
      </router-link>
    </div>

    <div v-if="sessions.length === 0" class="no-sessions">
      <div class="no-sessions-content">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 9L12 16L22 9L12 2Z" stroke="#94A3B8" stroke-width="2"/>
          <path d="M12 16V22" stroke="#94A3B8" stroke-width="2"/>
          <path d="M7 18L12 22L17 18" stroke="#94A3B8" stroke-width="2"/>
        </svg>
        <h3>{{ getEmptyStateMessage }}</h3>
        <p>{{ getEmptyStateDescription }}</p>
        <router-link v-if="activeFilter !== 'completed'" to="/admin/education-training/create" class="create-first-button">
          Create New Session
        </router-link>
      </div>
    </div>

    <div v-else class="sessions-grid">
      <div
        v-for="session in sessions"
        :key="session.id"
        class="session-card"
        :class="{ 'completed': isSessionCompleted(session) }"
      >
        <div class="session-icon" :style="{ backgroundColor: getSessionColor(session) }">
          {{ getInitial(session.title) }}
        </div>
        <div class="session-info">
          <h3 class="session-title">{{ session.title }}</h3>
          <div class="session-dates">
            <p class="session-date">
              <span class="label">Created:</span> {{ formatDate(session.createdAt) }}
            </p>
            <p v-if="session.date" class="session-scheduled-date">
              <span class="label">Scheduled:</span> {{ formatDate(session.date) }}
            </p>
          </div>
        </div>
        <div class="card-actions">
          <button class="view-button" @click="viewSessionDetails(session)">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            View
          </button>
          <button
            v-if="isSessionEditable(session)"
            class="edit-button"
            @click="editSession(session)"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56261 21.8978 5.10218 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Edit
          </button>
          <button
            v-if="isSessionEditable(session)"
            class="delete-button"
            @click="confirmDeleteSession(session)"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 6H5H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Delete
          </button>
          <div v-if="!isSessionEditable(session)" class="completed-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 11L12 14L22 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Completed
          </div>
        </div>
      </div>
    </div>

    <!-- Delete confirmation modal -->
    <div v-if="showDeleteModal" class="delete-modal-backdrop">
      <div class="delete-modal">
        <h3>Confirm Deletion</h3>
        <p>Are you sure you want to delete the session "{{ sessionToDelete?.title }}"?</p>
        <p class="warning">This action cannot be undone.</p>
        <div class="modal-actions">
          <button class="cancel-button" @click="showDeleteModal = false">Cancel</button>
          <button class="confirm-delete-button" @click="deleteSession">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useHeaderStore } from "@/stores/headerStore";
import { useEducationStore } from "@/stores/educationStore";

const router = useRouter();
const educationStore = useEducationStore();
const allSessions = computed(() => educationStore.getAllSessions);

// Filter state
const activeFilter = ref('all');

// Filtered sessions based on the active filter
const sessions = computed(() => {
  const today = new Date();

  if (activeFilter.value === 'upcoming') {
    return allSessions.value.filter(session => {
      // Skip sessions without dates
      if (!session.date) return false;

      // Parse the session date
      const sessionDate = new Date(session.date);
      // If session date is in the future, it's upcoming
      return sessionDate >= today;
    });
  } else if (activeFilter.value === 'completed') {
    return allSessions.value.filter(session => {
      // Skip sessions without dates
      if (!session.date) return false;

      // Parse the session date
      const sessionDate = new Date(session.date);
      // If session date is in the past, it's completed
      return sessionDate < today;
    });
  } else {
    // 'all' or any other value returns all sessions
    return allSessions.value;
  }
});

// Set filter function
const setFilter = (filter) => {
  activeFilter.value = filter;
};

// Delete modal state
const showDeleteModal = ref(false);
const sessionToDelete = ref(null);

// Set the header title for this page
const headerStore = useHeaderStore();
headerStore.setTitle("Manage Education & Training");

// Format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return date.toLocaleDateString('en-US', options);
};

// Get initial letter for icon
const getInitial = (title) => {
  return title ? title.charAt(0).toUpperCase() : 'M';
};

// Navigate to session details
const viewSessionDetails = (session) => {
  // Store the current session in the store
  educationStore.setCurrentSession(session);

  // Navigate to session details page
  router.push({
    name: 'AdminSessionDetails',
    params: { id: session.id }
  });
};

// Navigate to edit session page
const editSession = (session) => {
  // Store the current session in the store
  educationStore.setCurrentSession(session);

  // Navigate to edit session page
  router.push({
    name: 'EditEducationSession',
    params: { id: session.id }
  });
};

// Show delete confirmation modal
const confirmDeleteSession = (session) => {
  sessionToDelete.value = session;
  showDeleteModal.value = true;
};

// Delete session
const deleteSession = () => {
  if (sessionToDelete.value) {
    educationStore.deleteSession(sessionToDelete.value.id);
    showDeleteModal.value = false;
    sessionToDelete.value = null;
  }
};

onMounted(() => {
  // Load sessions from the store (which reads from localStorage)
  educationStore.loadAllSessions();
});
</script>

<style scoped>
.education-training-container {
  padding: 0;
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
}

.section-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 36px;
  background-color: #f8fafc;
  border-radius: 12px;
  padding: 14px 18px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02), 0 1px 2px rgba(0, 0, 0, 0.02);
}

.section-filters {
  display: flex;
  gap: 8px;
}

.filter-button {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 9px 16px;
  background-color: white;
  color: #4a5568;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
}

.filter-button:hover {
  background-color: #f7fafc;
  border-color: #cbd5e0;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.filter-button.active {
  background-color: #edf2f7;
  color: #3182ce;
  border-color: #bee3f8;
}

.filter-button.active svg {
  stroke: #3182ce;
}

.filter-button svg {
  stroke: #4a5568;
}

.count-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #e2e8f0;
  color: #4a5568;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  margin-left: 6px;
}

.filter-button.active .count-badge {
  background-color: #bee3f8;
  color: #2b6cb0;
}

.create-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 11px 20px;
  background-color: #1a73e8;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.25s ease;
  box-shadow: 0 2px 4px rgba(26, 115, 232, 0.15), 0 1px 2px rgba(26, 115, 232, 0.08);
}

.create-button:hover {
  background-color: #1765cc;
  transform: translateY(-1px);
  box-shadow: 0 6px 10px rgba(26, 115, 232, 0.12), 0 2px 4px rgba(26, 115, 232, 0.05);
}

.create-button:active {
  transform: translateY(0);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
}

.create-button svg {
  stroke: white;
}

.no-sessions {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  background-color: #F8FAFC;
  border-radius: 12px;
  border: 1px dashed #CBD5E1;
}

.no-sessions-content {
  text-align: center;
  padding: 40px;
}

.no-sessions-content svg {
  margin-bottom: 20px;
  opacity: 0.7;
}

.no-sessions-content h3 {
  font-size: 20px;
  font-weight: 600;
  color: #0F172A;
  margin: 0 0 10px 0;
}

.no-sessions-content p {
  font-size: 16px;
  color: #64748B;
  margin: 0 0 24px 0;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

.create-first-button {
  display: inline-block;
  padding: 12px 20px;
  background-color: #0F4C81;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.25s ease;
  box-shadow: 0 4px 6px rgba(15, 76, 129, 0.2);
}

.create-first-button:hover {
  background-color: #0D3F6A;
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(15, 76, 129, 0.25);
}

.create-first-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(15, 76, 129, 0.2);
}

.sessions-grid {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 12px;
  padding: 4px;
}

.session-card {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 4px rgba(0, 0, 0, 0.02);
  padding: 24px 28px;
  display: flex;
  align-items: center;
  cursor: default;
  transition: all 0.3s ease;
  border: 1px solid #f1f5f9;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  margin: 4px 2px;
}

.session-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 20px -5px rgba(0, 0, 0, 0.05), 0 8px 12px -3px rgba(0, 0, 0, 0.03);
  border-color: #e2e8f0;
}

.session-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background-color: #3182ce;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.session-card:hover::before {
  opacity: 1;
}

.session-card.completed::before {
  background-color: #4C51BF;
}

.session-icon {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  font-weight: 600;
  color: white;
  background-color: #3182ce;
  margin-right: 24px;
  flex-shrink: 0;
  box-shadow: 0 4px 8px rgba(49, 130, 206, 0.15);
}

.session-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.session-title {
  font-size: 17px;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 6px 0;
  line-height: 1.3;
}

.session-dates {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.session-date, .session-scheduled-date {
  font-size: 13px;
  color: #718096;
  margin: 0;
  line-height: 1.4;
}

.label {
  font-weight: 500;
  color: #4a5568;
}

.card-actions {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-left: 12px;
}

.view-button,
.edit-button,
.delete-button {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 9px 16px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  height: 38px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
}

.view-button:hover,
.edit-button:hover,
.delete-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.06);
}

.view-button:active,
.edit-button:active,
.delete-button:active {
  transform: translateY(0);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.view-button {
  background-color: #edf2f7;
  color: #3182ce;
}

.view-button:hover {
  background-color: #e6eefb;
}

.view-button svg {
  width: 18px;
  height: 18px;
  stroke: #3182ce;
  stroke-width: 1.5px;
}

.edit-button {
  background-color: #ebf5ff;
  color: #2563eb;
}

.edit-button:hover {
  background-color: #dbeafe;
}

.edit-button svg {
  stroke: #2563eb;
}

.delete-button {
  background-color: #fee2e2;
  color: #dc2626;
}

.delete-button:hover {
  background-color: #fecaca;
}

.delete-button svg {
  stroke: #dc2626;
}

.completed-badge {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 9px 15px;
  background-color: #E6EEF9;
  color: #4C51BF;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 1px 2px rgba(76, 81, 191, 0.1);
}

.completed-badge svg {
  stroke: #4C51BF;
}

/* Delete modal styles */
.delete-modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
}

.delete-modal {
  background-color: white;
  border-radius: 12px;
  padding: 32px;
  width: 440px;
  max-width: 90%;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.08), 0 5px 15px rgba(0, 0, 0, 0.05);
  animation: modal-appear 0.3s ease;
}

@keyframes modal-appear {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.delete-modal h3 {
  font-size: 20px;
  margin: 0 0 16px 0;
  color: #0f172a;
  font-weight: 600;
}

.delete-modal p {
  margin: 0 0 16px 0;
  color: #334155;
  font-size: 15px;
  line-height: 1.5;
}

.delete-modal .warning {
  color: #dc2626;
  font-weight: 500;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 28px;
}

.cancel-button,
.confirm-delete-button {
  padding: 10px 18px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
}

.cancel-button:hover,
.confirm-delete-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.cancel-button {
  background-color: #e5e7eb;
  color: #1f2937;
}

.cancel-button:hover {
  background-color: #d1d5db;
}

.confirm-delete-button {
  background-color: #dc2626;
  color: white;
  box-shadow: 0 1px 2px rgba(220, 38, 38, 0.3);
}

.confirm-delete-button:hover {
  background-color: #b91c1c;
  box-shadow: 0 4px 6px rgba(220, 38, 38, 0.25);
}

@media (max-width: 768px) {
  .sessions-grid {
    grid-template-columns: 1fr;
  }

  .card-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .section-controls {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }

  .section-filters {
    justify-content: space-between;
  }

  .filter-button {
    flex: 1;
    justify-content: center;
  }
}
</style>

<script>
// Add computed properties for empty state messages
export default {
  computed: {
    getEmptyStateMessage() {
      switch (this.activeFilter) {
        case 'upcoming':
          return 'No Upcoming Sessions';
        case 'completed':
          return 'No Completed Sessions';
        default:
          return 'No Educational Sessions Yet';
      }
    },
    getEmptyStateDescription() {
      switch (this.activeFilter) {
        case 'upcoming':
          return 'Create a new session with a future date to see it here';
        case 'completed':
          return 'Sessions with past dates will appear here';
        default:
          return 'Create your first educational session to get started';
      }
    }
  },
  methods: {
    getSessionColor(session) {
      if (!session.date) return '#3182ce'; // Default blue for sessions without dates

      const sessionDate = new Date(session.date);
      const today = new Date();

      if (sessionDate < today) {
        return '#4C51BF'; // Completed - Indigo
      } else {
        return '#319795'; // Upcoming - Teal
      }
    },

    isSessionCompleted(session) {
      if (!session.date) return false;

      const sessionDate = new Date(session.date);
      const today = new Date();

      // Set today to midnight for proper comparison
      today.setHours(0, 0, 0, 0);

      // If session date is before today, it's completed
      return sessionDate < today;
    },

    isSessionEditable(session) {
      if (!session.date) return true;

      const sessionDate = new Date(session.date);
      const today = new Date();

      // If the session date is in the past, it's completed and not editable
      return sessionDate >= today;
    }
  }
};
</script>
