import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useEducationStore = defineStore('education', () => {
  // State
  const sessions = ref([]);
  const currentSession = ref(null);

  // Getters
  const getAllSessions = computed(() => sessions.value);
  const getCurrentSession = computed(() => currentSession.value);
  const getSessionById = computed(() => (id) => {
    return sessions.value.find(session => session.id === id);
  });

  // Actions
  function loadAllSessions() {
    try {
      const savedSessions = localStorage.getItem('educationSessions');
      if (savedSessions) {
        sessions.value = JSON.parse(savedSessions);
      }
    } catch (error) {
      console.error('Error loading sessions from localStorage:', error);
    }
  }

  function saveAllSessions() {
    try {
      localStorage.setItem('educationSessions', JSON.stringify(sessions.value));
    } catch (error) {
      console.error('Error saving sessions to localStorage:', error);
    }
  }

  function addSession(session) {
    sessions.value.push(session);
    saveAllSessions();
    setCurrentSession(session);
  }

  function updateSession(updatedSession) {
    const index = sessions.value.findIndex(s => s.id === updatedSession.id);
    if (index !== -1) {
      sessions.value[index] = updatedSession;
      saveAllSessions();

      // Update current session if it's the one being updated
      if (currentSession.value && currentSession.value.id === updatedSession.id) {
        setCurrentSession(updatedSession);
      }
    }
  }

  function deleteSession(sessionId) {
    sessions.value = sessions.value.filter(s => s.id !== sessionId);
    saveAllSessions();

    // Clear current session if it was deleted
    if (currentSession.value && currentSession.value.id === sessionId) {
      clearCurrentSession();
    }
  }

  function setCurrentSession(session) {
    currentSession.value = session;
    localStorage.setItem('currentSession', JSON.stringify(session));
  }

  function loadCurrentSession() {
    try {
      const savedCurrentSession = localStorage.getItem('currentSession');
      if (savedCurrentSession) {
        currentSession.value = JSON.parse(savedCurrentSession);
      }
    } catch (error) {
      console.error('Error loading current session from localStorage:', error);
    }
  }

  function clearCurrentSession() {
    currentSession.value = null;
    localStorage.removeItem('currentSession');
  }

  // Initialize by loading data from localStorage
  loadAllSessions();
  loadCurrentSession();

  return {
    // State
    sessions,
    currentSession,

    // Getters
    getAllSessions,
    getCurrentSession,
    getSessionById,

    // Actions
    loadAllSessions,
    saveAllSessions,
    addSession,
    updateSession,
    deleteSession,
    setCurrentSession,
    loadCurrentSession,
    clearCurrentSession
  };
});
