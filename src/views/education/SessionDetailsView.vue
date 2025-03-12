<template>
  <div class="session-details-container">
    <div class="session-details-header">
      <div class="back-button" @click="$router.go(-1)">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18L9 12L15 6" stroke="#0F172A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="header-content">
        <h1 class="header-title">{{ session.title }}</h1>
        <p class="header-subtitle">Creation date: {{ formatDate(session.createdAt) }}</p>
      </div>
    </div>

    <div class="session-details-content">
      <div class="session-overview">
        <div class="session-overview-left">
          <div class="session-icon-large" :style="{ backgroundColor: getRandomColor(session.id) }">
            {{ getInitial(session.title) }}
          </div>
          <div class="session-stats">
            <div class="stat-item">
              <span class="stat-value">{{ session.tableOfContent ? session.tableOfContent.length : 0 }}</span>
              <span class="stat-label">Topics</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">{{ formatDuration(session.startTime, session.endTime) }}</span>
              <span class="stat-label">Duration</span>
            </div>
          </div>
        </div>
      </div>

      <div class="session-details-grid">
        <div class="calendar-wrapper">
          <h2 class="section-title">Scheduled date</h2>
          <p class="calendar-info">Live classes occur at dates circled. You can click on each to find out more information</p>

          <div class="calendar-section">
            <div class="calendar">
              <div class="calendar-header">
                <button class="calendar-nav-button" @click="previousMonth">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 18L9 12L15 6" stroke="#0F172A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
                <h3 class="calendar-month">{{ currentMonthName }}</h3>
                <button class="calendar-nav-button" @click="nextMonth">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 6L15 12L9 18" stroke="#0F172A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </div>

              <div class="calendar-days-header">
                <div v-for="day in weekDays" :key="day" class="calendar-day-header">{{ day }}</div>
              </div>

              <div class="calendar-grid">
                <div
                  v-for="(day, index) in calendarDays"
                  :key="index"
                  class="calendar-day"
                  :class="{
                    'other-month': !day.currentMonth,
                    'session-day': isSessionDay(day.date),
                    'selected-day': isSelectedDay(day.date)
                  }"
                  @click="selectDay(day.date)"
                >
                  {{ day.dayNumber }}
                </div>
              </div>
            </div>

            <div v-if="selectedDate" class="selected-date-info">
              <div class="date-header">
                <h3>{{ formatSelectedDate(selectedDate) }}</h3>
                <button v-if="isSessionDay(selectedDate)" class="join-button">
                  JOIN
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 17L17 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M7 7H17V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </div>

              <div v-if="isSessionDay(selectedDate)" class="host-info">
                <h4>Host</h4>
                <div class="host-details">
                  <div class="host-avatar">
                    <img :src="session.host && session.host.avatar ? session.host.avatar : 'https://randomuser.me/api/portraits/men/32.jpg'" alt="Host avatar">
                  </div>
                  <div class="host-data">
                    <p class="host-name">{{ session.host ? session.host.name : 'Alex Dunia' }}</p>
                    <p class="host-role">{{ session.host ? session.host.role : 'Real Estate Marketing Specialist' }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="details-section">
          <div class="details-scroll-container">
            <div v-if="selectedDate && isSessionDay(selectedDate)" class="details-content">
              <!-- Chapter dropdown section -->
              <div class="chapter-section">
                <div class="chapter-header">
                  <div class="chapter-info">
                    <img :src="session.thumbnail ? URL.createObjectURL(session.thumbnail) : 'https://randomuser.me/api/portraits/women/65.jpg'" alt="Chapter image" class="chapter-image">
                    <div class="chapter-text">
                      <span class="chapter-label">Chapter one</span>
                      <h3 class="chapter-title">{{ session.chapters && session.chapters[0] ? session.chapters[0].title : 'Mastering client connections for better results' }}</h3>
                    </div>
                  </div>
                  <button class="dropdown-button" @click="toggleChapterExpanded">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 9L12 15L18 9" stroke="#0F172A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                </div>

                <!-- Chapter sections (expanded view) -->
                <div class="chapter-sections" v-if="chapterExpanded && session.chapters && session.chapters[0] && session.chapters[0].sections">
                  <div v-for="(section, index) in session.chapters[0].sections" :key="index" class="chapter-section-item">
                    <div class="section-number">1.{{ index + 1 }}</div>
                    <div class="section-title">{{ section.title }}</div>
                  </div>
                </div>
              </div>

              <!-- Description section -->
              <div class="description-section">
                <h3 class="section-label">Description</h3>
                <p class="description-text">{{ session.description || 'Master these five steps and you would be a guru in 3 months' }}</p>
              </div>

              <!-- Session date and time -->
              <div class="session-datetime">
                <div class="datetime-pill">
                  {{ formatSelectedDate(selectedDate) }}, {{ session.startTime || '18:00' }}
                </div>
                <button class="join-button">
                  JOIN
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 17L17 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M7 7H17V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </div>

              <!-- Host section -->
              <div class="host-section">
                <h3 class="section-label">Host</h3>
                <div class="host-details">
                  <div class="host-avatar">
                    <img :src="session.host && session.host.avatar ? session.host.avatar : 'https://randomuser.me/api/portraits/men/32.jpg'" alt="Host avatar">
                  </div>
                  <div class="host-data">
                    <p class="host-name">{{ session.host ? session.host.name : 'Alex Dunia' }}</p>
                    <p class="host-role">{{ session.host ? session.host.role : 'Real Estate Marketing Specialist' }}</p>
                  </div>
                </div>
              </div>
            </div>

            <div v-else-if="selectedDate && !isSessionDay(selectedDate)" class="details-content no-session-content">
              <div class="no-session-message">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 2V5" stroke="#94A3B8" stroke-width="2" stroke-linecap="round"/>
                  <path d="M16 2V5" stroke="#94A3B8" stroke-width="2" stroke-linecap="round"/>
                  <path d="M3 8H21" stroke="#94A3B8" stroke-width="2"/>
                  <rect x="3" y="4" width="18" height="18" rx="2" stroke="#94A3B8" stroke-width="2"/>
                  <path d="M12 10V16" stroke="#94A3B8" stroke-width="2" stroke-linecap="round"/>
                  <path d="M9 13H15" stroke="#94A3B8" stroke-width="2" stroke-linecap="round"/>
                </svg>
                <h3>No trainings scheduled on {{ formatSelectedDate(selectedDate) }}</h3>
                <p>Sessions are indicated by blue circles on the calendar</p>
              </div>
            </div>

            <div v-else class="details-content default-content">
              <div class="default-message">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 2V5" stroke="#94A3B8" stroke-width="2" stroke-linecap="round"/>
                  <path d="M16 2V5" stroke="#94A3B8" stroke-width="2" stroke-linecap="round"/>
                  <path d="M3 8H21" stroke="#94A3B8" stroke-width="2"/>
                  <rect x="3" y="4" width="18" height="18" rx="2" stroke="#94A3B8" stroke-width="2"/>
                </svg>
                <h3>Select a date to view details</h3>
                <p>Click on any date in the calendar to see session information</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

// Chapter expansion state
const chapterExpanded = ref(false);
const toggleChapterExpanded = () => {
  chapterExpanded.value = !chapterExpanded.value;
};

// Session data
const session = ref({
  id: 1,
  title: 'Loading...',
  description: '',
  tableOfContent: [],
  objectives: [],
  chapters: [],
  prerequisites: '',
  date: '',
  startTime: '',
  endTime: '',
  meetLink: '',
  createdAt: new Date().toISOString(),
  host: {
    name: 'Alex Dunia',
    role: 'Real Estate Marketing Specialist'
  }
});

// Calendar state
const currentDate = ref(new Date());
const selectedDate = ref(null);
const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

// Get random color for session icon
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

// Get initial letter for icon
const getInitial = (title) => {
  return title ? title.charAt(0).toUpperCase() : 'E';
};

// Format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return date.toLocaleDateString('en-US', options);
};

// Format selected date
const formatSelectedDate = (date) => {
  if (!date) return '';
  const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
  return date.toLocaleDateString('en-US', options).toUpperCase();
};

// Format duration
const formatDuration = (startTime, endTime) => {
  if (!startTime || !endTime) return 'N/A';

  try {
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);

    let durationMinutes = (endHour * 60 + endMinute) - (startHour * 60 + startMinute);
    if (durationMinutes < 0) durationMinutes += 24 * 60; // Handle overnight sessions

    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;

    if (hours > 0) {
      return `${hours}h ${minutes > 0 ? minutes + 'min' : ''}`;
    } else {
      return `${minutes}min`;
    }
  } catch (error) {
    console.error('Error formatting duration:', error);
    return 'N/A';
  }
};

// Get current month name
const currentMonthName = computed(() => {
  const options = { month: 'long' };
  return currentDate.value.toLocaleDateString('en-US', options);
});

// Generate calendar days
const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();

  // First day of the month
  const firstDay = new Date(year, month, 1);
  const firstDayOfWeek = firstDay.getDay();

  // Last day of the month
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();

  // Days from previous month
  const daysFromPrevMonth = firstDayOfWeek;
  const prevMonth = new Date(year, month, 0);
  const daysInPrevMonth = prevMonth.getDate();

  const days = [];

  // Add days from previous month
  for (let i = daysInPrevMonth - daysFromPrevMonth + 1; i <= daysInPrevMonth; i++) {
    days.push({
      date: new Date(year, month - 1, i),
      dayNumber: i,
      currentMonth: false
    });
  }

  // Add days from current month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      date: new Date(year, month, i),
      dayNumber: i,
      currentMonth: true
    });
  }

  // Add days from next month to complete the grid (6 rows x 7 days = 42 cells)
  const remainingDays = 42 - days.length;
  for (let i = 1; i <= remainingDays; i++) {
    days.push({
      date: new Date(year, month + 1, i),
      dayNumber: i,
      currentMonth: false
    });
  }

  return days;
});

// Check if a date is the session day
const isSessionDay = (date) => {
  if (!session.value.date || !date) return false;

  const sessionDate = new Date(session.value.date);
  return date.getFullYear() === sessionDate.getFullYear() &&
         date.getMonth() === sessionDate.getMonth() &&
         date.getDate() === sessionDate.getDate();
};

// Check if a date is the selected day
const isSelectedDay = (date) => {
  if (!selectedDate.value || !date) return false;

  return date.getFullYear() === selectedDate.value.getFullYear() &&
         date.getMonth() === selectedDate.value.getMonth() &&
         date.getDate() === selectedDate.value.getDate();
};

// Select a day
const selectDay = (date) => {
  selectedDate.value = date;
};

// Navigate to previous month
const previousMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() - 1,
    1
  );
};

// Navigate to next month
const nextMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() + 1,
    1
  );
};

// Load session data
const loadSession = () => {
  try {
    // Get the session ID from the route
    const sessionId = route.params.id;

    // Try to get all sessions from localStorage
    const savedSessions = JSON.parse(localStorage.getItem('educationSessions') || '[]');

    // Find the session with the matching ID
    const foundSession = savedSessions.find(s => s.id.toString() === sessionId);

    if (foundSession) {
      session.value = foundSession;

      // If session has a date, set it as the selected date and update current date
      if (session.value.date) {
        const sessionDate = new Date(session.value.date);
        selectedDate.value = sessionDate;
        currentDate.value = new Date(
          sessionDate.getFullYear(),
          sessionDate.getMonth(),
          1
        );
      }
    } else {
      // If no session found with that ID, try to get the current session
      const currentSessionData = localStorage.getItem('currentSession');
      if (currentSessionData) {
        session.value = JSON.parse(currentSessionData);

        // If session has a date, set it as the selected date and update current date
        if (session.value.date) {
          const sessionDate = new Date(session.value.date);
          selectedDate.value = sessionDate;
          currentDate.value = new Date(
            sessionDate.getFullYear(),
            sessionDate.getMonth(),
            1
          );
        }
      } else {
        console.error('Session not found with ID:', sessionId);
        // Redirect to education page if session not found
        router.push('/education-training');
      }
    }
  } catch (error) {
    console.error('Error loading session data:', error);
  }
};

// Watch for changes in the route
watch(() => route.params.id, (newId) => {
  if (newId) {
    loadSession();
  }
});

onMounted(() => {
  loadSession();
});
</script>

<style scoped>
.session-details-container {
  padding: 28px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: #1E293B;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.session-details-header {
  display: flex;
  align-items: center;
  margin-bottom: 28px;
}

.back-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background-color: #E5EDF9;
  border-radius: 50%;
  cursor: pointer;
  margin-right: 20px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.back-button:hover {
  background-color: #D1E0F6;
  transform: translateX(-2px);
}

.header-content {
  flex: 1;
}

.header-title {
  font-size: 24px;
  font-weight: 700;
  color: #0F172A;
  margin: 0 0 6px 0;
  letter-spacing: -0.01em;
}

.header-subtitle {
  font-size: 15px;
  color: #64748B;
  margin: 0;
}

.session-details-content {
  display: flex;
  flex-direction: column;
  gap: 28px;
  flex: 1;
}

.session-overview {
  background-color: #FFFFFF;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #E2E8F0;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.session-overview:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.session-overview-left {
  display: flex;
  align-items: center;
}

.session-icon-large {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: bold;
  color: white;
  margin-right: 28px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.session-stats {
  display: flex;
  gap: 32px;
}

.stat-item {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: #0F172A;
}

.stat-label {
  font-size: 13px;
  color: #64748B;
  margin-top: 4px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.session-details-grid {
  display: flex;
  width: 100%;
  margin: 0;
  gap: 24px;
  justify-content: space-between;
  flex-wrap: wrap;
  position: relative;
  flex: 1;
}

@media (min-width: 992px) {
  .session-details-grid {
    flex-wrap: nowrap;
    height: calc(100vh - 220px); /* Adjust based on your header height */
    min-height: 600px;
    overflow: hidden;
  }

  .calendar-wrapper {
    flex: 0 0 calc(35% - 24px);
    width: calc(35% - 24px);
    position: sticky;
    top: 28px;
    align-self: flex-start;
    max-height: 100%;
  }

  .details-section {
    flex: 0 0 65%;
    width: 65%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .details-scroll-container {
    overflow-y: auto;
    height: 100%;
    padding-right: 4px; /* Add some padding for the scrollbar */
  }
}

.section-title {
  font-size: 17px;
  font-weight: 600;
  color: #0F172A;
  margin: 0 0 16px 0;
}

.calendar-wrapper .section-title {
  font-size: 15px;
  margin-bottom: 8px;
}

.calendar-info {
  font-size: 15px;
  color: #64748B;
  margin-bottom: 20px;
  line-height: 1.5;
}

.calendar-wrapper .calendar-info {
  font-size: 13px;
  margin-bottom: 16px;
}

.calendar-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 8px;
}

.calendar-section {
  background-color: #FFFFFF;
  border-radius: 12px;
  width: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 24px;
  border: 1px solid #E2E8F0;
  box-sizing: border-box;
  transition: box-shadow 0.3s ease;
}

.calendar-section:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
}

.calendar {
  margin-bottom: 24px;
}

.calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.calendar-nav-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease, opacity 0.2s ease;
  border-radius: 50%;
  color: #0F172A;
}

.calendar-nav-button:hover:not(.disabled-button) {
  background-color: #F1F5F9;
}

.disabled-button {
  opacity: 0.4;
  cursor: not-allowed;
  color: #94A3B8;
}

.calendar-month {
  font-size: 19px;
  font-weight: 600;
  color: #0F172A;
  margin: 0;
}

.calendar-wrapper .calendar-month {
  font-size: 17px;
}

.calendar-days-header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 12px;
}

.calendar-day-header {
  text-align: center;
  font-size: 13px;
  font-weight: 600;
  color: #64748B;
  padding: 8px 0;
  text-transform: uppercase;
}

.calendar-wrapper .calendar-day-header {
  font-size: 11px;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
  max-width: 100%;
}

.calendar-day {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  font-size: 15px;
  color: #0F172A;
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.3s ease;
  margin: 0 auto;
  flex-shrink: 0;
  position: relative;
}

.calendar-wrapper .calendar-day {
  font-size: 13px;
}

.calendar-day:hover:not(.other-month):not(.past-day) {
  background-color: #F1F5F9;
  transform: scale(1.08);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.other-month {
  color: #CBD5E1;
  cursor: default;
}

.past-day {
  color: #CBD5E1;
  opacity: 0.7;
  cursor: default;
}

.past-day.session-day {
  background-color: #EFF6FF;
  color: #93C5FD;
}

.session-day {
  background-color: #3B82F6;
  color: white;
  font-weight: 600;
  box-shadow: 0 2px 4px rgba(30, 64, 175, 0.2);
  transform: scale(1.05);
}

.selected-day {
  background-color: #3B82F6 !important;
  color: white !important;
  font-weight: 600;
  border: none !important;
  box-shadow: 0 0 0 2px #1E40AF, 0 4px 6px rgba(59, 130, 246, 0.3) !important;
  transform: scale(1.08);
  z-index: 1;
}

.selected-date-info {
  margin-top: 24px;
  border-top: 1px solid #E2E8F0;
  padding-top: 24px;
}

.date-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.date-header h3 {
  font-size: 14px;
  font-weight: 600;
  color: #0F172A;
  margin: 0;
}

.calendar-wrapper .date-header h3 {
  font-size: 12px;
}

.join-button {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background-color: #3B82F6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(59, 130, 246, 0.3);
}

.calendar-wrapper .join-button {
  font-size: 11px;
}

.join-button:hover {
  background-color: #2563EB;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(59, 130, 246, 0.4);
}

.host-info {
  margin-top: 16px;
}

.host-info h4 {
  font-size: 12px;
  font-weight: 500;
  color: #64748B;
  margin: 0 0 8px 0;
}

.calendar-wrapper .host-info h4 {
  font-size: 10px;
}

.host-details {
  display: flex;
  align-items: center;
  margin-top: 8px;
}

.host-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 12px;
}

.host-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.host-data {
  display: flex;
  flex-direction: column;
}

.host-name {
  font-size: 12px;
  font-weight: 500;
  color: #0F172A;
  margin: 0;
}

.calendar-wrapper .host-name {
  font-size: 10px;
}

.host-role {
  font-size: 10px;
  color: #64748B;
  margin: 0;
}

.calendar-wrapper .host-role {
  font-size: 8px;
}

.details-section {
  background-color: #FFFFFF;
  border-radius: 12px;
  width: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 24px;
  border: 1px solid #E2E8F0;
  box-sizing: border-box;
  transition: box-shadow 0.3s ease;
}

.details-section:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
}

.details-scroll-container {
  overflow-y: auto;
  height: 100%;
  padding-right: 4px; /* Add some padding for the scrollbar */
}

.details-content {
  padding: 20px;
  background-color: #F9FAFB;
  border-radius: 10px;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
}

.chapter-section {
  margin-bottom: 28px;
}

.chapter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.chapter-header:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.chapter-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.chapter-image {
  width: 64px;
  height: 64px;
  border-radius: 8px;
  object-fit: cover;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.chapter-text {
  display: flex;
  flex-direction: column;
}

.chapter-label {
  font-size: 13px;
  color: #64748B;
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 500;
}

.chapter-title {
  font-size: 17px;
  font-weight: 600;
  color: #0F172A;
  margin: 0;
  line-height: 1.4;
}

.dropdown-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.dropdown-button:hover {
  background-color: #F1F5F9;
  transform: scale(1.1);
}

.section-label {
  font-size: 15px;
  font-weight: 600;
  color: #64748B;
  margin: 0 0 10px 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.description-section {
  margin-bottom: 28px;
  padding: 16px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.description-section:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.description-text {
  font-size: 15px;
  line-height: 1.7;
  color: #334155;
  margin: 0;
}

.session-datetime {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28px;
  padding: 16px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.session-datetime:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.datetime-pill {
  background-color: #E0EAFF;
  color: #3B82F6;
  padding: 10px 18px;
  border-radius: 24px;
  font-size: 13px;
  font-weight: 600;
  box-shadow: 0 2px 4px rgba(59, 130, 246, 0.2);
}

.host-section {
  margin-bottom: 28px;
  padding: 16px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.host-section:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.host-details {
  display: flex;
  align-items: center;
  margin-top: 10px;
  padding: 12px;
  background-color: #F8FAFC;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.host-details:hover {
  background-color: #F1F5F9;
  transform: translateY(-2px);
}

.host-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 14px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 2px solid white;
}

.host-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.host-data {
  display: flex;
  flex-direction: column;
}

.host-name {
  font-size: 12px;
  font-weight: 500;
  color: #0F172A;
  margin: 0;
}

.calendar-wrapper .host-name {
  font-size: 10px;
}

.host-role {
  font-size: 10px;
  color: #64748B;
  margin: 0;
}

.calendar-wrapper .host-role {
  font-size: 8px;
}

.no-session-content, .default-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-height: 300px;
}

.no-session-message, .default-message {
  text-align: center;
  padding: 40px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  width: 100%;
  max-width: 400px;
  transition: all 0.3s ease;
}

.no-session-message:hover, .default-message:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.no-session-message svg, .default-message svg {
  margin-bottom: 20px;
  color: #94A3B8;
  transition: transform 0.3s ease;
}

.no-session-message:hover svg, .default-message:hover svg {
  transform: scale(1.1);
}

.no-session-message h3, .default-message h3 {
  font-size: 17px;
  font-weight: 600;
  color: #0F172A;
  margin: 0 0 10px 0;
}

.no-session-message p, .default-message p {
  font-size: 13px;
  color: #64748B;
  margin: 0;
  line-height: 1.6;
}

/* Custom scrollbar for the details section */
.details-scroll-container::-webkit-scrollbar {
  width: 8px;
}

.details-scroll-container::-webkit-scrollbar-track {
  background: #F1F5F9;
  border-radius: 10px;
}

.details-scroll-container::-webkit-scrollbar-thumb {
  background: #CBD5E1;
  border-radius: 10px;
}

.details-scroll-container::-webkit-scrollbar-thumb:hover {
  background: #94A3B8;
}

/* Add these new styles for chapter sections */
.chapter-sections {
  padding: 16px;
  background-color: #F8FAFC;
  border-top: 1px solid #E2E8F0;
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.chapter-section-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  margin-bottom: 8px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.chapter-section-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
}

.section-number {
  font-size: 14px;
  font-weight: 500;
  color: #64748B;
  background-color: #F1F5F9;
  padding: 6px 10px;
  border-radius: 6px;
  margin-right: 12px;
  min-width: 40px;
  text-align: center;
}

.section-title {
  font-size: 15px;
  font-weight: 500;
  color: #0F172A;
  flex: 1;
}
</style>
