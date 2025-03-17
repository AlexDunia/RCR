<template>
  <div class="education-training-container">
    <div class="education-actions">
      <router-link to="/education-training/create" class="create-button">
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
        <h3>No Educational Sessions Yet</h3>
        <p>Create your first educational session to get started</p>
        <router-link to="/education-training/create" class="create-first-button">Create First Session</router-link>
      </div>
    </div>

    <div v-else class="sessions-grid">
      <div
        v-for="session in sessions"
        :key="session.id"
        class="session-card"
        @click="viewSessionDetails(session)"
      >
        <div class="session-icon">
          {{ getInitial(session.title) }}
        </div>
        <div class="session-info">
          <h3 class="session-title">{{ session.title }}</h3>
          <p class="session-date">Creation date: {{ formatDate(session.createdAt) }}</p>
        </div>
        <button class="view-button" @click.stop="viewSessionDetails(session)">
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
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useHeaderStore } from "@/stores/headerStore";

const router = useRouter();
const sessions = ref([]);

// Set the header title for this page
const headerStore = useHeaderStore();
headerStore.setTitle("Education & Training");

// Load sessions from localStorage
const loadSessions = () => {
  try {
    const savedSessions = localStorage.getItem('educationSessions');
    if (savedSessions) {
      sessions.value = JSON.parse(savedSessions);
    }
  } catch (error) {
    console.error('Error loading sessions:', error);
  }
};

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
  // Store the current session in localStorage
  localStorage.setItem('currentSession', JSON.stringify(session));

  // Navigate to session details page
  router.push({
    name: 'SessionDetails',
    params: { id: session.id }
  });
};

onMounted(() => {
  loadSessions();
});
</script>

<style scoped>
.education-training-container {
  padding: 0;
  max-width: 960px;
  margin: 0 auto;
}

.education-actions {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.create-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  background-color: #1a73e8;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.2s ease;
}

.create-button:hover {
  background-color: #1765cc;
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
  border-radius: 8px;
  border: 1px dashed #CBD5E1;
}

.no-sessions-content {
  text-align: center;
  padding: 32px;
}

.no-sessions-content svg {
  margin-bottom: 16px;
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
  margin: 0 0 24px 0;
}

.create-first-button {
  display: inline-block;
  padding: 10px 16px;
  background-color: #0F4C81;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.2s ease;
}

.create-first-button:hover {
  background-color: #0D3F6A;
}

.sessions-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 4px;
}

.session-card {
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 16px 24px;
  height: 76px;
  display: flex;
  align-items: center;
  cursor: default;
  transition: box-shadow 0.1s ease;
  border: none;
  box-sizing: border-box;
}

.session-card:hover {
  transform: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
  background-color: #ff3b30 !important;
  margin-right: 20px;
  flex-shrink: 0;
}

.session-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.session-title {
  font-size: 16px;
  font-weight: 600;
  color: #2d3748;
  margin: 0 0 4px 0;
  line-height: 1.3;
}

.session-date {
  font-size: 13px;
  color: #718096;
  margin: 0;
  line-height: 1.3;
}

.view-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  background-color: #edf2f7;
  color: #3182ce;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-left: auto;
  white-space: nowrap;
  height: 36px;
}

.view-button svg {
  width: 18px;
  height: 18px;
  stroke: #3182ce;
  stroke-width: 1.5px;
}

@media (max-width: 768px) {
  .sessions-grid {
    grid-template-columns: 1fr;
  }
}
</style>
