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
                <button v-if="isSessionDay(selectedDate)" class="join-button" @click="openMeetLink">
                  <span class="platform-icon" v-if="getMeetingPlatform(session.meetLink) === 'google'">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/9/9b/Google_Meet_icon.svg" alt="Google Meet" width="16" height="16">
                  </span>
                  <span class="platform-icon" v-else-if="getMeetingPlatform(session.meetLink) === 'zoom'">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Zoom_Communications_Logo.svg/1200px-Zoom_Communications_Logo.svg.png" alt="Zoom" width="16" height="16">
                  </span>
                  <span class="platform-icon" v-else-if="getMeetingPlatform(session.meetLink) === 'teams'">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Microsoft_Office_Teams_%282018%E2%80%93present%29.svg/1200px-Microsoft_Office_Teams_%282018%E2%80%93present%29.svg.png" alt="Microsoft Teams" width="16" height="16">
                  </span>
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
                    <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Host avatar">
                  </div>
                  <div class="host-data">
                    <p class="host-name">{{ session.host.name }}</p>
                    <p class="host-role">{{ session.host.role }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="details-section">
          <div v-if="selectedDate && isSessionDay(selectedDate)" class="details-content">
            <!-- Chapter dropdown section -->
            <div class="chapter-section">
              <div class="chapter-header">
                <div class="chapter-info">
                  <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="Chapter image" class="chapter-image">
                  <div class="chapter-text">
                    <span class="chapter-label">Chapter</span>
                    <h3 class="chapter-title">{{ session.chapter || 'No chapter specified' }}</h3>
                  </div>
                </div>
                <button class="dropdown-button" @click="toggleChapterDetails">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" :class="{ 'rotated': showChapterDetails }">
                    <path d="M6 9L12 15L18 9" stroke="#0F172A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </div>

              <div class="chapter-details" v-if="showChapterDetails">
                <div class="chapter-description" v-if="session.description">
                  <p>{{ session.description }}</p>
                </div>
                <div class="chapter-meta">
                  <div class="chapter-meta-item">
                    <span class="meta-label">Duration:</span>
                    <span class="meta-value">{{ formatDuration(session.startTime, session.endTime) }}</span>
                  </div>
                  <div class="chapter-meta-item" v-if="session.objectives && session.objectives.length > 0">
                    <span class="meta-label">Learning objectives:</span>
                    <span class="meta-value">{{ session.objectives.length }} objectives</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Description section -->
            <div class="description-section">
              <h3 class="section-label">Description</h3>
              <p class="description-text">{{ session.description || 'No description available' }}</p>
            </div>

            <!-- Session date and time -->
            <div class="session-datetime">
              <div class="datetime-pill">
                {{ formatSessionDateTime(session.date, session.startTime) }}
              </div>
              <button class="join-button" @click="openMeetLink" v-if="session.meetLink">
                <span class="platform-icon" v-if="getMeetingPlatform(session.meetLink) === 'google'">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/9/9b/Google_Meet_icon.svg" alt="Google Meet" width="16" height="16">
                </span>
                <span class="platform-icon" v-else-if="getMeetingPlatform(session.meetLink) === 'zoom'">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Zoom_Communications_Logo.svg/1200px-Zoom_Communications_Logo.svg.png" alt="Zoom" width="16" height="16">
                </span>
                <span class="platform-icon" v-else-if="getMeetingPlatform(session.meetLink) === 'teams'">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Microsoft_Office_Teams_%282018%E2%80%93present%29.svg/1200px-Microsoft_Office_Teams_%282018%E2%80%93present%29.svg.png" alt="Microsoft Teams" width="16" height="16">
                </span>
                JOIN {{ getMeetingPlatformName(session.meetLink) }}
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
                  <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Host avatar">
                </div>
                <div class="host-data">
                  <p class="host-name">{{ session.host?.name || 'No host assigned' }}</p>
                  <p class="host-role">{{ session.host?.role || 'No role specified' }}</p>
                </div>
              </div>
            </div>

            <!-- Objectives section (if available) -->
            <div class="objectives-section" v-if="session.objectives && session.objectives.length > 0">
              <h3 class="section-label">Objectives</h3>
              <div class="objectives-container">
                <div v-for="(objective, index) in session.objectives" :key="index" class="objective-item">
                  <div class="objective-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="#3B82F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M22 4L12 14.01L9 11.01" stroke="#3B82F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                  <div class="objective-text">{{ objective }}</div>
                </div>
              </div>
            </div>

            <!-- Prerequisites section (if available) -->
            <div class="prerequisites-section" v-if="session.prerequisites">
              <h3 class="section-label">Prerequisites</h3>
              <div class="prerequisites-container">
                <div class="prerequisites-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#64748B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12 8V12" stroke="#64748B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12 16H12.01" stroke="#64748B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <div class="prerequisites-text">{{ session.prerequisites }}</div>
              </div>
            </div>

            <!-- Table of Contents section (if available) -->
            <div class="toc-section" v-if="session.tableOfContent && session.tableOfContent.length > 0">
              <h3 class="section-label">Table of Contents</h3>
              <div class="toc-container">
                <div v-for="(topic, index) in session.tableOfContent" :key="index" class="toc-item">
                  <div class="toc-number">{{ index + 1 }}</div>
                  <div class="toc-content">
                    <div class="toc-title">{{ topic }}</div>
                    <div class="toc-progress-container">
                      <div class="toc-progress-bar" :style="{ width: index === 0 ? '100%' : index === 1 ? '75%' : index === 2 ? '50%' : '25%' }"></div>
                    </div>
                  </div>
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
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

// Session data
const session = ref({
  id: 1,
  title: 'Loading...',
  description: '',
  tableOfContent: [],
  objectives: [],
  chapter: '',
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
  const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

// Format session date and time for display
const formatSessionDateTime = (dateString, timeString) => {
  if (!dateString || !timeString) return 'Date and time not set';

  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }

    const weekday = date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
    const day = date.getDate();
    const month = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
    const year = date.getFullYear();

    return `${weekday}, ${day} ${month} ${year}, ${timeString}`;
  } catch (error) {
    console.error('Error formatting session date time:', error);
    return 'Invalid date or time';
  }
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
  if (!session.value.date) return false;

  try {
  const sessionDate = new Date(session.value.date);

    // Check if the date is valid
    if (isNaN(sessionDate.getTime())) {
      console.error('Invalid session date:', session.value.date);
      return false;
    }

    // Compare year, month, and day
    const isMatch = date.getFullYear() === sessionDate.getFullYear() &&
         date.getMonth() === sessionDate.getMonth() &&
         date.getDate() === sessionDate.getDate();

    // Debug log for specific dates to help troubleshoot
    if (date.getDate() === sessionDate.getDate()) {
      console.log('Date match check:', {
        calendarDate: date.toISOString(),
        sessionDate: sessionDate.toISOString(),
        yearMatch: date.getFullYear() === sessionDate.getFullYear(),
        monthMatch: date.getMonth() === sessionDate.getMonth(),
        dayMatch: date.getDate() === sessionDate.getDate(),
        isMatch
      });
    }

    return isMatch;
  } catch (error) {
    console.error('Error checking session day:', error);
    return false;
  }
};

// Check if a date is the selected day
const isSelectedDay = (date) => {
  if (!selectedDate.value) return false;

  return date.getFullYear() === selectedDate.value.getFullYear() &&
         date.getMonth() === selectedDate.value.getMonth() &&
         date.getDate() === selectedDate.value.getDate();
};

// Select a day
const selectDay = (date) => {
  if (isSessionDay(date)) {
    selectedDate.value = date;
  } else {
    // Allow selecting non-session days too
    selectedDate.value = date;
  }
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

// Open meeting link in new tab
const openMeetLink = () => {
  if (session.value.meetLink) {
    // Add http:// if not present
    let url = session.value.meetLink;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    window.open(url, '_blank');
  }
};

// Determine meeting platform from URL
const getMeetingPlatform = (url) => {
  if (!url) return 'unknown';

  const lowerUrl = url.toLowerCase();

  if (lowerUrl.includes('meet.google') || lowerUrl.includes('google.com/meet')) {
    return 'google';
  } else if (lowerUrl.includes('zoom.us') || lowerUrl.includes('zoom.com')) {
    return 'zoom';
  } else if (lowerUrl.includes('teams.microsoft') || lowerUrl.includes('teams.live')) {
    return 'teams';
  } else {
    return 'unknown';
  }
};

// Get meeting platform display name
const getMeetingPlatformName = (url) => {
  const platform = getMeetingPlatform(url);

  switch (platform) {
    case 'google':
      return 'Google Meet';
    case 'zoom':
      return 'Zoom';
    case 'teams':
      return 'MS Teams';
    default:
      return '';
  }
};

// Load session data
const loadSession = () => {
  try {
    // Try to get the session data from localStorage
    const savedSession = localStorage.getItem('currentSession');
    if (savedSession) {
      session.value = JSON.parse(savedSession);
      console.log('Loaded session from localStorage:', session.value);

      // If session has a date, set it as the selected date and update current date
      if (session.value.date) {
        console.log('Raw session date:', session.value.date);

        // Handle different date formats
        let sessionDate;
        if (typeof session.value.date === 'string') {
          // Try to parse the date string
          sessionDate = new Date(session.value.date);

          // If the date is invalid, try to parse it as a YYYY-MM-DD format
          if (isNaN(sessionDate.getTime()) && session.value.date.includes('-')) {
            const [year, month, day] = session.value.date.split('-').map(Number);
            sessionDate = new Date(year, month - 1, day); // Month is 0-indexed in JavaScript
          }
        } else {
          sessionDate = new Date(session.value.date);
        }

        // Check if the date is valid
        if (!isNaN(sessionDate.getTime())) {
          console.log('Parsed session date:', sessionDate);
        selectedDate.value = sessionDate;
        currentDate.value = new Date(
          sessionDate.getFullYear(),
          sessionDate.getMonth(),
          1
        );
          console.log('Session date set to:', sessionDate);
    } else {
          console.error('Invalid session date format:', session.value.date);
        }
      }
    } else if (route.params.id) {
      // If we have an ID in the route, try to find the session in the educationSessions array
      console.log('Session ID from route:', route.params.id);
      const sessionId = parseInt(route.params.id);

      // Get all sessions from localStorage
      const allSessions = JSON.parse(localStorage.getItem('educationSessions') || '[]');
      console.log('All sessions:', allSessions);

      // Find the session with the matching ID
      const foundSession = allSessions.find(s => s.id === sessionId);

      if (foundSession) {
        console.log('Found session by ID:', foundSession);
        session.value = foundSession;

        // Save it as the current session for future reference
        localStorage.setItem('currentSession', JSON.stringify(foundSession));

        // If session has a date, set it as the selected date and update current date
        if (foundSession.date) {
          console.log('Raw session date from found session:', foundSession.date);

          // Handle different date formats
          let sessionDate;
          if (typeof foundSession.date === 'string') {
            // Try to parse the date string
            sessionDate = new Date(foundSession.date);

            // If the date is invalid, try to parse it as a YYYY-MM-DD format
            if (isNaN(sessionDate.getTime()) && foundSession.date.includes('-')) {
              const [year, month, day] = foundSession.date.split('-').map(Number);
              sessionDate = new Date(year, month - 1, day); // Month is 0-indexed in JavaScript
            }
          } else {
            sessionDate = new Date(foundSession.date);
          }

          // Check if the date is valid
          if (!isNaN(sessionDate.getTime())) {
            console.log('Parsed session date from found session:', sessionDate);
            selectedDate.value = sessionDate;
            currentDate.value = new Date(
              sessionDate.getFullYear(),
              sessionDate.getMonth(),
              1
            );
            console.log('Session date set to:', sessionDate);
          } else {
            console.error('Invalid session date format:', foundSession.date);
          }
        }
      } else {
        console.error('Session not found with ID:', sessionId);
      }
    } else {
      console.error('No session data available');
    }
  } catch (error) {
    console.error('Error loading session data:', error);
  }
};

// Toggle chapter details
const showChapterDetails = ref(false);
const toggleChapterDetails = () => {
  showChapterDetails.value = !showChapterDetails.value;
};

onMounted(() => {
  console.log('SessionDetailsView mounted');
  loadSession();

  // Debug session data after loading
  setTimeout(() => {
    console.log('Current session data:', session.value);
    console.log('Session date:', session.value.date);
    console.log('Session date type:', typeof session.value.date);

    if (session.value.date) {
      const testDate = new Date(session.value.date);
      console.log('Parsed session date:', testDate);
      console.log('Is valid date:', !isNaN(testDate.getTime()));
    }

    console.log('Selected date:', selectedDate.value);
    console.log('Current date:', currentDate.value);
  }, 500);
});
</script>

<style scoped>
.session-details-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
}

.session-details-header {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
}

.back-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: #E5EDF9;
  border-radius: 50%;
  cursor: pointer;
  margin-right: 16px;
  transition: background-color 0.2s ease;
}

.back-button:hover {
  background-color: #D1E0F6;
}

.header-content {
  flex: 1;
}

.header-title {
  font-size: 22px;
  font-weight: 600;
  color: #0F172A;
  margin: 0 0 4px 0;
}

.header-subtitle {
  font-size: 14px;
  color: #64748B;
  margin: 0;
}

.session-details-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.session-overview {
  background-color: #FFFFFF;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #E2E8F0;
}

.session-overview-left {
  display: flex;
  align-items: center;
}

.session-icon-large {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: bold;
  color: white;
  margin-right: 24px;
}

.session-stats {
  display: flex;
  gap: 24px;
}

.stat-item {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 22px;
  font-weight: 600;
  color: #0F172A;
}

.stat-label {
  font-size: 12px;
  color: #64748B;
}

.session-details-grid {
  display: flex;
  width: 100%;
  margin: 0;
  gap: 24px;
  justify-content: space-between;
  flex-wrap: wrap;
}

@media (min-width: 992px) {
  .session-details-grid {
    flex-wrap: nowrap;
  }

  .calendar-wrapper {
    flex: 0 0 calc(35% - 24px);
    width: calc(35% - 24px);
  }

  .details-section {
    flex: 0 0 65%;
    width: 65%;
  }
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #0F172A;
  margin: 0 0 16px 0;
}

.calendar-wrapper .section-title {
  font-size: 14px;
}

.calendar-section, .details-section {
  background-color: #FFFFFF;
  border-radius: 8px;
  width: 100%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 24px;
  border: 1px solid #E2E8F0;
  height: 100%;
  box-sizing: border-box;
}

.calendar-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.calendar-info {
  font-size: 14px;
  color: #64748B;
  margin-bottom: 20px;
}

.calendar-wrapper .calendar-info {
  font-size: 12px;
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
  font-size: 18px;
  font-weight: 500;
  color: #0F172A;
  margin: 0;
}

.calendar-wrapper .calendar-month {
  font-size: 16px;
}

.calendar-days-header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 8px;
}

.calendar-day-header {
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  color: #64748B;
  padding: 8px 0;
}

.calendar-wrapper .calendar-day-header {
  font-size: 10px;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  max-width: 100%;
}

.calendar-day {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  font-size: 14px;
  color: #0F172A;
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.2s ease;
  margin: 0 auto;
  flex-shrink: 0;
}

.calendar-wrapper .calendar-day {
  font-size: 12px;
}

.calendar-day:hover:not(.other-month):not(.past-day) {
  background-color: #F1F5F9;
  transform: scale(1.05);
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
  background-color: #DBEAFE;
  color: #1E40AF;
  font-weight: 600;
}

.selected-day {
  background-color: #3B82F6 !important;
  color: white !important;
  font-weight: 600;
  border: none !important;
  box-shadow: 0 0 0 2px #1E40AF;
  transform: scale(1.05);
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
  gap: 4px;
  padding: 8px 16px;
  background-color: #3B82F6;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

/* Enhanced JOIN button */
.join-button {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 18px;
  background-color: #2563EB;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(37, 99, 235, 0.2);
}

.join-button:hover {
  background-color: #1D4ED8;
  transform: translateY(-1px);
  box-shadow: 0 4px 6px rgba(37, 99, 235, 0.25);
}

.platform-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 4px;
}

.platform-icon img {
  border-radius: 2px;
  background-color: white;
  padding: 1px;
}

.calendar-wrapper .join-button {
  font-size: 10px;
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

.details-content {
  height: 100%;
  overflow-y: auto;
  padding: 16px;
  background-color: #F9FAFB;
  border-radius: 8px;
}

.chapter-section {
  margin-bottom: 24px;
}

.chapter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chapter-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.chapter-image {
  width: 60px;
  height: 60px;
  border-radius: 4px;
  object-fit: cover;
}

.chapter-text {
  display: flex;
  flex-direction: column;
}

.chapter-label {
  font-size: 12px;
  color: #64748B;
  margin-bottom: 4px;
}

.chapter-title {
  font-size: 18px;
  font-weight: 700;
  color: #1E293B;
  margin: 0;
  line-height: 1.3;
}

.dropdown-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
}

.dropdown-button svg {
  transition: transform 0.3s ease;
}

.rotated {
  transform: rotate(180deg);
}

.section-label {
  font-size: 15px;
  font-weight: 600;
  color: #475569;
  margin: 0 0 12px 0;
  padding-bottom: 6px;
  border-bottom: 1px solid #E2E8F0;
  letter-spacing: 0.3px;
}

.description-section {
  margin-bottom: 24px;
}

.description-text {
  font-size: 14px;
  line-height: 1.6;
  color: #334155;
  margin: 0;
}

.session-datetime {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.datetime-pill {
  background-color: #E0EAFF;
  color: #3B82F6;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}

/* Enhanced datetime pill */
.datetime-pill {
  background-color: #EFF6FF;
  color: #2563EB;
  padding: 10px 18px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  display: flex;
  align-items: center;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.datetime-pill::before {
  content: "";
  display: inline-block;
  width: 8px;
  height: 8px;
  background-color: #2563EB;
  border-radius: 50%;
  margin-right: 8px;
}

.host-section {
  margin-bottom: 24px;
}

.objectives-section, .prerequisites-section {
  margin-bottom: 24px;
}

.objectives-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.objective-item {
  display: flex;
  align-items: center;
}

.objective-icon {
  width: 24px;
  height: 24px;
  margin-right: 8px;
}

.objective-text {
  font-size: 14px;
  color: #334155;
}

.prerequisites-section {
  margin-bottom: 24px;
}

.prerequisites-container {
  display: flex;
  align-items: center;
}

.prerequisites-icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}

.prerequisites-icon svg {
  width: 100%;
  height: 100%;
}

.prerequisites-text {
  font-size: 14px;
  line-height: 1.6;
  color: #334155;
  margin: 0;
}

.toc-section {
  margin-bottom: 24px;
}

.toc-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.toc-item {
  display: flex;
  align-items: center;
}

.toc-number {
  font-size: 12px;
  font-weight: 500;
  color: #64748B;
  margin-right: 8px;
}

.toc-content {
  flex: 1;
}

.toc-title {
  font-size: 14px;
  font-weight: 600;
  color: #0F172A;
  margin: 0 0 4px 0;
}

.toc-progress-container {
  height: 8px;
  background-color: #E2E8F0;
  border-radius: 4px;
  overflow: hidden;
}

.toc-progress-bar {
  height: 100%;
  background-color: #3B82F6;
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
  padding: 32px;
}

.no-session-message svg, .default-message svg {
  margin-bottom: 16px;
}

.no-session-message h3, .default-message h3 {
  font-size: 16px;
  font-weight: 600;
  color: #0F172A;
  margin: 0 0 8px 0;
}

.no-session-message p, .default-message p {
  font-size: 12px;
  color: #64748B;
  margin: 0;
}

.chapter-details {
  margin-top: 16px;
  padding-left: 20px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.chapter-description {
  margin-bottom: 16px;
}

.chapter-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chapter-meta-item {
  display: flex;
  flex-direction: column;
}

.meta-label {
  font-size: 12px;
  color: #64748B;
  margin-bottom: 4px;
}

.meta-value {
  font-size: 14px;
  font-weight: 500;
  color: #0F172A;
}
</style>
