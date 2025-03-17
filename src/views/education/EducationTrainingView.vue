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
        <div class="session-icon" :style="{ backgroundColor: getRandomColor(session.id) }">
          {{ getInitial(session.title) }}
        </div>
        <div class="session-info">
          <h3 class="session-title">{{ session.title }}</h3>
          <p class="session-date">Creation date: {{ formatDate(session.createdAt) }}</p>
        </div>
        <button class="view-button" @click.stop="viewSessionDetails(session)">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="#0F172A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#0F172A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
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
  return title ? title.charAt(0).toUpperCase() : 'E';
};

// Generate random color for session icon
const getRandomColor = (id) => {
  const colors = [
    '#FF0000', // Red
    '#4CAF50', // Green
    '#2196F3', // Blue
    '#FF9800', // Orange
    '#9C27B0', // Purple
    '#00BCD4', // Cyan
    '#795548', // Brown
    '#607D8B'  // Blue Grey
  ];

  // Use the id to deterministically select a color
  return colors[id % colors.length];
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
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.education-actions {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 24px;
}

.create-button {
  display: flex;
  align-items: center;
  gap: 8px;
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

.create-button:hover {
  background-color: #0D3F6A;
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
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}

.session-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 16px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: 1px solid #E2E8F0;
}

.session-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.session-icon {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 600;
  color: white;
  margin-bottom: 12px;
}

.session-info {
  flex: 1;
}

.session-title {
  font-size: 16px;
  font-weight: 600;
  color: #0F172A;
  margin: 0 0 4px 0;
}

.session-date {
  font-size: 14px;
  color: #64748B;
  margin: 0 0 16px 0;
}

.view-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 0;
  background-color: #F1F5F9;
  color: #0F172A;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  width: 100%;
}

.view-button:hover {
  background-color: #E2E8F0;
}

@media (max-width: 768px) {
  .sessions-grid {
    grid-template-columns: 1fr;
  }
}
</style>
