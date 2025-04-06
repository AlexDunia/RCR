<template>
  <div class="education-training-container">
    <div class="tab-container">
      <div class="tab-buttons">
        <button
          class="tab-button"
          :class="{ active: activeTab === 'all' }"
          @click="activeTab = 'all'"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M3 6H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M3 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          All Sessions
          <span class="count">{{ sessions.length }}</span>
        </button>
        <button
          class="tab-button"
          :class="{ active: activeTab === 'upcoming' }"
          @click="activeTab = 'upcoming'"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 8v4l3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Upcoming
          <span class="count">0</span>
        </button>
        <button
          class="tab-button"
          :class="{ active: activeTab === 'completed' }"
          @click="activeTab = 'completed'"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Completed
          <span class="count">0</span>
        </button>
      </div>

      <button class="create-button" @click="createNewSession">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5v14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Create New Session
      </button>
    </div>

    <div v-if="sessions.length === 0" class="no-sessions">
      <div class="no-sessions-content">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 9L12 16L22 9L12 2Z" stroke="#94A3B8" stroke-width="2"/>
          <path d="M12 16V22" stroke="#94A3B8" stroke-width="2"/>
          <path d="M7 18L12 22L17 18" stroke="#94A3B8" stroke-width="2"/>
        </svg>
        <h3>No Educational Sessions Yet</h3>
        <p>Create your first educational session to get started</p>

        <button class="create-session-btn" @click="createNewSession">
          Create New Session
        </button>
      </div>
    </div>

    <div v-else class="sessions-list">
      <div
        v-for="(session, index) in sessions"
        :key="session.id"
        class="session-card"
      >
        <div class="session-icon" :style="{ backgroundColor: getIconColor(index) }">
          {{ getInitial(session.title) }}
        </div>
        <div class="session-info">
          <h3 class="session-title">{{ session.title }}</h3>
          <p class="session-date">Creation date: {{ formatDate(session.createdAt) }}</p>
          <p class="session-creator">Created by <span class="creator-name">Admin</span></p>
        </div>
        <button class="view-button" @click="viewSessionDetails(session)">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          View schedule and modules
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useHeaderStore } from "@/stores/headerStore";
import { useEducationStore } from "@/stores/educationStore";

const router = useRouter();
const educationStore = useEducationStore();
const activeTab = ref('all');

const sessions = computed(() => {
  // If no sessions exist, create sample sessions to match the image
  if (educationStore.getAllSessions.length === 0) {
    return [
      {
        id: '1',
        title: 'kjbk',
        createdAt: '2025-03-11T17:46:57.736Z',
        modules: []
      },
      {
        id: '2',
        title: 'Jenifer',
        createdAt: '2025-03-12T15:55:19.372Z',
        modules: []
      },
      {
        id: '3',
        title: 'khmvikh',
        createdAt: '2025-03-12T19:16:37.81Z',
        modules: []
      }
    ];
  }
  return educationStore.getAllSessions;
});

// Function to navigate to create new session page
const createNewSession = () => {
  router.push('/admin/education-training/create');
};

// Set the header title for this page
const headerStore = useHeaderStore();
headerStore.setTitle("Education & Training");

// Format date
const formatDate = (dateString) => {
  if (typeof dateString === 'string' && !dateString.includes('GMT')) {
    return dateString; // Return as is if it's already formatted
  }

  // Format like: 2025-03-11T17:46:57.736Z
  if (dateString.includes('T')) {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}T${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}.${String(date.getMilliseconds()).padStart(3, '0')}Z`;
  }

  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return date.toLocaleDateString('en-US', options);
};

// Get initial letter for icon
const getInitial = (title) => {
  return title ? title.charAt(0).toUpperCase() : 'M';
};

// Get icon color based on index
const getIconColor = (index) => {
  const colors = ['#ff3b30', '#FF9500', '#5856D6', '#2196F3', '#34C759'];
  return colors[index % colors.length];
};

// Navigate to session details
const viewSessionDetails = (session) => {
  // Store the current session in the store
  educationStore.setCurrentSession(session);

  // Navigate to session details page
  router.push({
    name: 'SessionDetails',
    params: { id: session.id }
  });
};

onMounted(() => {
  // Load sessions from the store (which reads from localStorage)
  educationStore.loadAllSessions();
});
</script>

<style scoped>
.education-training-container {
  padding: 28px 32px;
  max-width: 1200px;
  margin: 0 auto;
}

.tab-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.tab-buttons {
  display: flex;
  gap: 8px;
}

.tab-button {
  background-color: #F7FAFC;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.tab-button.active {
  background-color: #34C759;
  color: white;
}

.create-button {
  background-color: #34C759;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  color: white;
  display: flex;
  align-items: center;
  gap: 8px;
}

.create-button:hover {
  background-color: #2B6CB0;
}

.no-sessions {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 320px;
  background-color: #F8FAFC;
  border-radius: 10px;
  border: 1px dashed #CBD5E1;
}

.no-sessions-content {
  text-align: center;
  padding: 40px;
}

.no-sessions-content svg {
  margin-bottom: 20px;
}

.no-sessions-content h3 {
  font-size: 18px;
  font-weight: 600;
  color: #0F172A;
  margin: 0 0 8px 0;
}

.no-sessions-content p {
  font-size: 16px;
  color: #64748B;
  margin: 0;
  line-height: 1.5;
}

.sessions-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 6px;
}

.session-card {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(15, 23, 42, 0.03), 0 0 1px rgba(15, 23, 42, 0.06);
  padding: 22px 26px;
  display: flex;
  align-items: center;
  border: 1px solid rgba(237, 242, 247, 0.8);
  transition: all 0.25s ease-in-out;
  position: relative;
}

.session-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 10px;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.03), rgba(209, 213, 219, 0.03));
  pointer-events: none;
  z-index: 1;
}

.session-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(15, 23, 42, 0.06), 0 0 1px rgba(15, 23, 42, 0.08);
  border-color: rgba(226, 232, 240, 1);
}

.session-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 600;
  color: white;
  margin-right: 22px;
  flex-shrink: 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12), inset 0 -2px 0 rgba(0, 0, 0, 0.08);
  position: relative;
  z-index: 2;
}

.session-info {
  flex: 1;
  min-width: 0;
  position: relative;
  z-index: 2;
  padding: 0 4px;
}

.session-title {
  font-size: 16px;
  font-weight: 600;
  color: #1A202C;
  margin: 0 0 4px 0;
  letter-spacing: -0.01em;
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.session-date {
  font-size: 14px;
  color: #718096;
  margin: 0;
  letter-spacing: 0.01em;
}

.session-creator {
  font-size: 13px;
  color: #718096;
  margin: 4px 0 0 0;
  letter-spacing: 0.01em;
}

.creator-name {
  font-weight: 600;
  color: #4A5568;
}

.view-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 16px;
  background-color: #F7FAFC;
  color: #3182CE;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  position: relative;
  z-index: 2;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.8);
}

.view-button:hover {
  background-color: #EBF8FF;
  color: #2B6CB0;
  transform: translateY(-1px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.8);
}

.view-button:active {
  transform: translateY(0);
}

.view-button svg {
  width: 18px;
  height: 18px;
  transition: transform 0.2s ease;
}

.view-button:hover svg {
  transform: translateX(2px);
}

@media (max-width: 768px) {
  .education-training-container {
    padding: 20px;
  }

  .session-card {
    padding: 20px;
  }

  .session-title {
    white-space: normal;
  }

  .view-button {
    padding: 8px 14px;
    font-size: 13px;
  }
}

@media (max-width: 640px) {
  .session-card {
    flex-direction: column;
    align-items: flex-start;
  }

  .session-icon {
    margin-bottom: 12px;
    margin-right: 0;
  }

  .view-button {
    margin-top: 16px;
    align-self: stretch;
    justify-content: center;
  }
}

.create-session-btn {
  background-color: #1a4189;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 12px 20px;
  font-size: 15px;
  font-weight: 600;
  margin-top: 20px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.create-session-btn:hover {
  background-color: #0f2e61;
}

.count {
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 2px 6px;
  font-size: 12px;
  margin-left: 4px;
}
</style>
