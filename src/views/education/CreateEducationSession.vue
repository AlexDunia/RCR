<template>
  <div class="create-session-container">
    <div class="form-container">
      <h2 class="form-title">Educational Content Builder</h2>

      <form @submit.prevent="saveSession" class="session-form">
        <div class="form-section">
          <h3 class="section-title">Session Details</h3>

          <div class="form-group">
            <label for="title">Session Title</label>
            <input
              type="text"
              id="title"
              v-model="sessionData.title"
              placeholder="Enter a clear, descriptive title for your educational session"
              class="form-control"
            >
          </div>

          <div class="form-group">
            <label>Session Description</label>
            <label for="description" class="sub-label">Provide a comprehensive overview of what participants will learn</label>
            <textarea
              id="description"
              v-model="sessionData.description"
              placeholder="Describe the purpose, goals, and value of this educational session. Include what participants will learn and why it matters."
              class="form-control textarea"
              rows="5"
            ></textarea>
          </div>

          <div class="form-group">
            <label for="thumbnail" class="upload-label">
              <div class="upload-button">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M7 10L12 15L17 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M12 15V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Upload Cover Image
              </div>
              <div class="upload-hint">Add a visual representation of your session (recommended size: 1200×630px)</div>
            </label>
            <input type="file" id="thumbnail" @change="handleThumbnailUpload" class="file-input" accept="image/*">
          </div>

          <!-- Table of Contents Section -->
          <div class="form-group toc-section">
            <div class="section-header" @click="toggleTocSection">
              <label>Table of Contents</label>
              <div class="toggle-icon" :class="{ 'rotated': tocSectionExpanded }">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>

            <div class="section-content" v-show="tocSectionExpanded">
              <p class="section-description">Organize your educational content into chapters and sections to create a clear learning path</p>

              <div class="chapters-container">
                <div v-for="(chapter, index) in chapters" :key="index" class="chapter-item">
                  <div class="chapter-header" @click="toggleChapter(index)">
                    <div class="chapter-number">Chapter {{ index + 1 }}</div>
                    <input
                      type="text"
                      v-model="chapter.title"
                      placeholder="Enter chapter title"
                      class="chapter-title-input"
                      @click.stop
                    >
                    <div class="chapter-actions">
                      <button type="button" class="icon-button" @click.stop="removeChapter(index)" title="Remove chapter">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </button>
                      <div class="toggle-icon" :class="{ 'rotated': chapter.expanded }">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div class="chapter-content" v-show="chapter.expanded">
                    <div v-for="(section, sectionIndex) in chapter.sections" :key="sectionIndex" class="section-item">
                      <div class="section-row">
                        <div class="section-number">{{ index + 1 }}.{{ sectionIndex + 1 }}</div>
                        <input
                          type="text"
                          v-model="section.title"
                          placeholder="Enter section title"
                          class="section-title-input"
                        >
                        <button type="button" class="icon-button" @click="removeSection(index, sectionIndex)" title="Remove section">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    </div>

                    <button type="button" class="add-section-btn" @click="addSection(index)">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 5V19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      Add Section
                    </button>
                  </div>
                </div>
              </div>

              <button type="button" class="add-chapter-btn" @click="addChapter">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5V19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Add Chapter
              </button>
            </div>
          </div>

          <div class="form-group">
            <label for="objectives">Learning Objectives</label>
            <div class="input-hint">What will participants achieve by the end of this session?</div>
            <input
              type="text"
              id="objectives"
              v-model="sessionData.objectives"
              placeholder="Separate each learning objective with '#' (e.g., Understand key concepts # Apply techniques # Analyze results)"
              class="form-control"
            >
          </div>

          <div class="form-group">
            <label for="prerequisites">Prerequisites</label>
            <div class="input-hint">What should participants know or have before joining?</div>
            <input
              type="text"
              id="prerequisites"
              v-model="sessionData.prerequisites"
              placeholder="List any required knowledge, skills, or materials (Optional)"
              class="form-control"
            >
          </div>
        </div>

        <div class="form-section">
          <h3 class="section-title">Schedule & Resources</h3>

          <div class="form-row">
            <div class="form-group half">
              <label for="date">Session Date</label>
              <div class="custom-select">
                <input
                  type="date"
                  id="date"
                  v-model="sessionData.date"
                  :min="todayDate"
                  class="form-control"
                >
                <div class="select-arrow">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>

            <div class="form-group quarter">
              <label for="startTime">Start Time</label>
              <div class="custom-select">
                <select id="startTime" v-model="sessionData.startTime" class="form-control">
                  <option value="" disabled selected>From</option>
                  <option v-for="time in timeOptions" :key="time" :value="time">{{ time }}</option>
                </select>
                <div class="select-arrow">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>

            <div class="form-group quarter">
              <label for="endTime">End Time</label>
              <div class="custom-select">
                <select id="endTime" v-model="sessionData.endTime" class="form-control">
                  <option value="" disabled selected>To</option>
                  <option v-for="time in timeOptions" :key="time" :value="time">{{ time }}</option>
                </select>
                <div class="select-arrow">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label for="meetLink">Meeting Link</label>
            <div class="input-hint">Where will participants join the session?</div>

            <!-- Meeting platform selection -->
            <div class="meeting-platform-grid">
              <div
                v-for="platform in meetingPlatforms"
                :key="platform.id"
                class="platform-card"
                :class="{ 'selected': selectedPlatform === platform.id }"
                @click="selectPlatform(platform.id)"
              >
                <div class="platform-icon">
                  <img :src="platform.icon" :alt="platform.name">
                </div>
                <div class="platform-name">{{ platform.name }}</div>
                <div class="platform-status" v-if="selectedPlatform === platform.id">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <div class="platform-loading" v-if="isCreatingMeeting && selectedPlatform === platform.id">
                  <div class="loading-spinner"></div>
                  Creating meeting...
                </div>
              </div>
            </div>

            <div class="meeting-details" v-if="selectedPlatform && !isCreatingMeeting">
              <div class="meeting-info" v-if="sessionData.meetLink">
                <div class="meeting-success">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M22 4L12 14.01L9 11.01" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span>Meeting created successfully!</span>
                </div>
                <div class="meeting-link">
                  <input type="text" readonly :value="sessionData.meetLink" class="form-control">
                  <button class="copy-button" @click="copyMeetingLink">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 9H11C9.89543 9 9 9.89543 9 11V20C9 21.1046 9.89543 22 11 22H20C21.1046 22 22 21.1046 22 20V11C22 9.89543 21.1046 9 20 9Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M5 15H4C3.46957 15 2.96086 14.7893 2.58579 14.4142C2.21071 14.0391 2 13.5304 2 13V4C2 3.46957 2.21071 2.96086 2.58579 2.58579C2.96086 2.21071 3.46957 2 4 2H13C13.5304 2 14.0391 2.21071 14.4142 2.58579C14.7893 2.96086 15 3.46957 15 4V5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Copy
                  </button>
                </div>
              </div>
              <button
                class="create-meeting-button"
                @click="createMeeting"
                v-if="!sessionData.meetLink"
                :disabled="!sessionData.date || !sessionData.startTime || !sessionData.endTime"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5V19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Create Meeting
              </button>
              <p class="meeting-hint" v-if="!sessionData.date || !sessionData.startTime || !sessionData.endTime">
                Please select date and time to create a meeting
              </p>
            </div>
          </div>

          <div class="form-group">
            <label for="document" class="upload-label">
              <div class="upload-button">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M7 10L12 15L17 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M12 15V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Upload Session Materials
              </div>
              <div class="upload-formats">Supported formats: PDF, DOC, XLS, PPT</div>
            </label>
            <input type="file" id="document" @change="handleDocumentUpload" class="file-input" accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx">
          </div>
        </div>

        <!-- Preview Section -->
        <div class="form-section preview-section" v-if="sessionData.title || sessionData.date">
          <h3 class="section-title">Session Preview</h3>
          <p class="preview-description">This is how your session will appear to participants</p>

          <div class="session-preview-card">
            <div class="preview-header">
              <div class="preview-back-button">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18L9 12L15 6" stroke="#0F172A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div class="preview-title">
                <h4>{{ sessionData.title || 'Your Session Title' }}</h4>
                <p>Creation date: {{ new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }}</p>
              </div>
            </div>

            <div class="preview-stats-card">
              <div class="preview-avatar">
                <span>{{ (sessionData.title && sessionData.title[0]) || 'S' }}</span>
              </div>
              <div class="preview-stats">
                <div class="stat-item">
                  <div class="stat-value">{{ totalTopics }}</div>
                  <div class="stat-label">TOPICS</div>
                </div>
                <div class="stat-item">
                  <div class="stat-value">{{ totalDuration.hours }}h {{ totalDuration.minutes }}min</div>
                  <div class="stat-label">DURATION</div>
                </div>
              </div>
            </div>

            <div class="preview-schedule">
              <h5>Scheduled date</h5>
              <p class="schedule-info">Live classes occur at dates circled. You can click on each to find out more information</p>

              <div class="preview-calendar">
                <div class="calendar-header">
                  <button class="calendar-nav">&lt;</button>
                  <div class="calendar-month">{{ sessionData.date ? new Date(sessionData.date).toLocaleDateString('en-US', { month: 'long' }) : 'Month' }}</div>
                  <button class="calendar-nav">&gt;</button>
                </div>

                <div class="calendar-grid">
                  <!-- Calendar placeholder -->
                  <div class="calendar-placeholder"></div>
                </div>
              </div>

              <div class="preview-chapter" v-if="chapters[0] && chapters[0].title">
                <div class="chapter-header-preview">
                  <h5>CHAPTER ONE</h5>
                  <h6>{{ chapters[0].title }}</h6>
                  <button class="chapter-expand">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>

              <div class="preview-description-box">
                <h5>DESCRIPTION</h5>
                <p>{{ sessionData.description || 'Your session description will appear here.' }}</p>
              </div>

              <div class="preview-date-time" v-if="sessionData.date && sessionData.startTime">
                <div class="date-time-badge">
                  {{ formatDate(sessionData.date) }}, {{ sessionData.startTime }}
                </div>
                <button class="join-button">JOIN</button>
              </div>

              <div class="preview-host">
                <h5>HOST</h5>
                <div class="host-info">
                  <div class="host-avatar"></div>
                  <div class="host-details">
                    <div class="host-name">Alex Dunia</div>
                    <div class="host-role">Real Estate Marketing Specialist</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="form-actions">
          <button type="button" class="btn-secondary" @click="$router.go(-1)">Cancel</button>
          <button type="submit" class="btn-primary">Create Session</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useDateValidation } from '@/composables/useDateValidation';
import { useEducationStore } from '@/stores/educationStore';

const router = useRouter();
const educationStore = useEducationStore();

// Generate time options in 30-minute increments
const timeOptions = ref([]);
const generateTimeOptions = () => {
  const options = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const hourFormatted = hour.toString().padStart(2, '0');
      const minuteFormatted = minute.toString().padStart(2, '0');
      options.push(`${hourFormatted}:${minuteFormatted}`);
    }
  }
  return options;
};

// Table of Contents section state
const tocSectionExpanded = ref(true);
const toggleTocSection = () => {
  tocSectionExpanded.value = !tocSectionExpanded.value;
};

// Chapters and sections management
const chapters = ref([
  {
    title: '',
    expanded: true,
    sections: [{ title: '' }]
  }
]);

const toggleChapter = (index) => {
  chapters.value[index].expanded = !chapters.value[index].expanded;
};

const addChapter = () => {
  chapters.value.push({
    title: '',
    expanded: true,
    sections: [{ title: '' }]
  });
};

const removeChapter = (index) => {
  if (chapters.value.length > 1) {
    chapters.value.splice(index, 1);
  }
};

const addSection = (chapterIndex) => {
  chapters.value[chapterIndex].sections.push({ title: '' });
};

const removeSection = (chapterIndex, sectionIndex) => {
  if (chapters.value[chapterIndex].sections.length > 1) {
    chapters.value[chapterIndex].sections.splice(sectionIndex, 1);
  }
};

// Session data
const sessionData = ref({
  title: '',
  description: '',
  thumbnail: null,
  objectives: '',
  prerequisites: '',
  date: '',
  startTime: '',
  endTime: '',
  meetLink: '',
  document: null
});

// Computed property to format table of contents from chapters
const formattedTableOfContents = computed(() => {
  let toc = [];
  chapters.value.forEach((chapter, chapterIndex) => {
    if (chapter.title.trim()) {
      toc.push(`Chapter ${chapterIndex + 1}: ${chapter.title}`);

      chapter.sections.forEach((section, sectionIndex) => {
        if (section.title.trim()) {
          toc.push(`  ${chapterIndex + 1}.${sectionIndex + 1} ${section.title}`);
        }
      });
    }
  });
  return toc.join('#');
});

// Computed property to calculate total duration in hours and minutes
const totalDuration = computed(() => {
  if (!sessionData.value.startTime || !sessionData.value.endTime) return { hours: 0, minutes: 0 };

  const [startHour, startMinute] = sessionData.value.startTime.split(':').map(Number);
  const [endHour, endMinute] = sessionData.value.endTime.split(':').map(Number);

  let hours = endHour - startHour;
  let minutes = endMinute - startMinute;

  if (minutes < 0) {
    hours -= 1;
    minutes += 60;
  }

  if (hours < 0) {
    hours += 24; // Handle overnight sessions
  }

  return { hours, minutes };
});

// Computed property to get total number of topics (sections)
const totalTopics = computed(() => {
  let count = 0;
  chapters.value.forEach(chapter => {
    count += chapter.sections.filter(section => section.title.trim() !== '').length;
  });
  return count;
});

// File handling
const handleThumbnailUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    sessionData.value.thumbnail = file;
  }
};

const handleDocumentUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    sessionData.value.document = file;
  }
};

// Format date for display
const formatDate = (dateString) => {
  if (!dateString) return '';

  const date = new Date(dateString);
  const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
  return date.toLocaleDateString('en-US', options).toUpperCase();
};

// Add this inside the setup function or at the script setup level
const { todayDate, ensureFutureDate } = useDateValidation()

// Save session
const saveSession = () => {
  // Validate session date
  if (!sessionData.value.date) {
    alert('Please select a session date')
    return
  }

  // Ensure the date is not in the past
  sessionData.value.date = ensureFutureDate(sessionData.value.date)

  // In a real app, you would send this data to your backend
  console.log('Saving session:', sessionData.value);

  // Convert bullet points from # format to array
  const objectives = sessionData.value.objectives.split('#').filter(item => item.trim() !== '');

  // Create formatted table of contents from chapters structure
  const tableOfContent = formattedTableOfContents.value.split('#').filter(item => item.trim() !== '');

  // Calculate duration
  const duration = totalDuration.value;
  const durationFormatted = `${duration.hours}h ${duration.minutes}min`;

  // Format scheduled date for display
  const scheduledDate = formatDate(sessionData.value.date);

  // Format time for display (e.g., "SUN, 15 DEC 2024, 18:00")
  const formattedDateTime = sessionData.value.date ?
    `${formatDate(sessionData.value.date)}, ${sessionData.value.startTime}` : '';

  // Create session object
  const session = {
    id: Date.now(), // Generate a unique ID
    title: sessionData.value.title,
    description: sessionData.value.description,
    tableOfContent,
    objectives,
    chapters: JSON.parse(JSON.stringify(chapters.value)), // Deep copy of chapters
    prerequisites: sessionData.value.prerequisites,
    date: sessionData.value.date,
    startTime: sessionData.value.startTime,
    endTime: sessionData.value.endTime,
    meetLink: sessionData.value.meetLink,
    createdAt: new Date().toISOString(),
    // Additional fields to match the display format in the image
    displayName: sessionData.value.title,
    topicsCount: totalTopics.value,
    duration: durationFormatted,
    scheduledDate: scheduledDate,
    formattedDateTime: formattedDateTime,
    host: {
      name: 'Alex Dunia',
      role: 'Real Estate Marketing Specialist',
      avatar: '/images/avatars/default-avatar.png' // Default avatar path
    }
  };

  // Add the session using our store
  educationStore.addSession(session);

  // Navigate to the admin session details page
  router.push(`/admin/education-training/session/${session.id}`);
};

onMounted(() => {
  timeOptions.value = generateTimeOptions();
});

// Meeting creation state
const isCreatingMeeting = ref(false);

// Updated meeting platforms with better icons
const meetingPlatforms = ref([
  {
    id: 'zoom',
    name: 'Zoom',
    icon: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/zoom.svg',
    apiEndpoint: 'https://api.zoom.us/v2/users/me/meetings'
  },
  {
    id: 'google-meet',
    name: 'Google Meet',
    icon: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/googlemeet.svg',
    apiEndpoint: 'https://www.googleapis.com/calendar/v3/calendars/primary/events'
  },
  {
    id: 'microsoft-teams',
    name: 'Microsoft Teams',
    icon: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/microsoftteams.svg',
    apiEndpoint: 'https://graph.microsoft.com/v1.0/me/onlineMeetings'
  },
  {
    id: 'other',
    name: 'Other',
    icon: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/internetexplorer.svg'
  }
]);

const selectedPlatform = ref('');

// Platform selection handler with visual feedback
const selectPlatform = async (platformId) => {
  selectedPlatform.value = platformId;

  // Clear existing meeting link when changing platforms
  if (sessionData.value.meetLink) {
    sessionData.value.meetLink = '';
  }
};

// Create meeting based on selected platform
const createMeeting = async () => {
  if (!selectedPlatform.value || !sessionData.value.date || !sessionData.value.startTime || !sessionData.value.endTime) {
    return;
  }

  isCreatingMeeting.value = true;

  try {
    const platform = meetingPlatforms.value.find(p => p.id === selectedPlatform.value);

    if (platform.id === 'other') {
      // For "Other" platform, just show manual input
      sessionData.value.meetLink = '';
      isCreatingMeeting.value = false;
      return;
    }

    // Format date and time for API requests
    const startDateTime = new Date(`${sessionData.value.date}T${sessionData.value.startTime}`).toISOString();
    const endDateTime = new Date(`${sessionData.value.date}T${sessionData.value.endTime}`).toISOString();

    let meetingLink = '';

    switch (platform.id) {
      case 'zoom':
        // Zoom meeting creation would go here
        // Requires Zoom OAuth token
        meetingLink = await createZoomMeeting(startDateTime, endDateTime);
        break;

      case 'google-meet':
        // Google Meet creation would go here
        // Requires Google Calendar API credentials
        meetingLink = await createGoogleMeet(startDateTime, endDateTime);
        break;

      case 'microsoft-teams':
        // Teams meeting creation would go here
        // Requires Microsoft Graph API token
        meetingLink = await createTeamsMeeting(startDateTime, endDateTime);
        break;
    }

    // Update meeting link
    sessionData.value.meetLink = meetingLink;

  } catch (error) {
    console.error('Error creating meeting:', error);
    // You would want to show an error message to the user here
  } finally {
    isCreatingMeeting.value = false;
  }
};

// Platform-specific meeting creation functions
const createZoomMeeting = async (startTime, endTime) => {
  // This is a placeholder - you would need to implement the actual Zoom API call
  // Requires Zoom OAuth token and proper API setup
  const meetingData = {
    topic: sessionData.value.title,
    type: 2, // Scheduled meeting
    start_time: startTime,
    duration: Math.round((new Date(endTime) - new Date(startTime)) / (60 * 1000)), // Duration in minutes
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  };
  console.log('Creating Zoom meeting with data:', meetingData);
  return 'https://zoom.us/j/example';
};

const createGoogleMeet = async (startTime, endTime) => {
  // This is a placeholder - you would need to implement the actual Google Calendar API call
  // Requires Google OAuth credentials and proper API setup
  const eventData = {
    summary: sessionData.value.title,
    description: sessionData.value.description,
    start: { dateTime: startTime },
    end: { dateTime: endTime },
    conferenceData: {
      createRequest: { requestId: Date.now().toString() }
    }
  };
  console.log('Creating Google Meet with data:', eventData);
  return 'https://meet.google.com/example';
};

const createTeamsMeeting = async (startTime, endTime) => {
  // This is a placeholder - you would need to implement the actual Microsoft Graph API call
  // Requires Microsoft OAuth token and proper API setup
  const meetingData = {
    subject: sessionData.value.title,
    startDateTime: startTime,
    endDateTime: endTime,
    participants: {
      attendees: []
    }
  };
  console.log('Creating Teams meeting with data:', meetingData);
  return 'https://teams.microsoft.com/l/meetup-join/example';
};

// Copy meeting link to clipboard
const copyMeetingLink = async () => {
  if (sessionData.value.meetLink) {
    try {
      await navigator.clipboard.writeText(sessionData.value.meetLink);
      // You would want to show a success message to the user here
    } catch (err) {
      console.error('Failed to copy:', err);
      // You would want to show an error message to the user here
    }
  }
};
</script>

<style scoped>
/* Base Styles */
.create-session-container {
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
  color: #334155;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  line-height: 1.6;
  padding-top: 1rem;
}

.header {
  display: flex;
  align-items: center;
  margin-bottom: 48px;
}

.back-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background-color: #F1F5F9;
  border-radius: 50%;
  cursor: pointer;
  margin-right: 24px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.back-button:hover {
  background-color: #E2E8F0;
  transform: translateX(-2px);
}

.header-content {
  flex: 1;
  padding-left: 4px;
}

.header-title {
  font-size: 30px;
  font-weight: 700;
  color: #0F172A;
  margin: 0 0 12px 0;
  letter-spacing: -0.02em;
}

.header-subtitle {
  font-size: 16px;
  color: #64748B;
  margin: 0;
  line-height: 1.5;
  max-width: 80%;
}

/* Form Container */
.form-container {
  background-color: #FFFFFF;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  padding: 48px;
  margin-top: 0;
  transition: all 0.3s ease;
}

.form-title {
  font-size: 26px;
  font-weight: 700;
  color: #0F172A;
  margin: 0 0 48px 0;
  text-align: center;
  letter-spacing: -0.01em;
  padding-top: 1rem;
}

.section-title {
  font-size: 22px;
  font-weight: 600;
  color: #0F172A;
  margin: 0 0 36px 0;
  padding-bottom: 16px;
  border-bottom: 1px solid #E2E8F0;
  letter-spacing: -0.01em;
}

.form-section {
  margin-bottom: 56px;
  animation: fadeIn 0.5s ease;
  padding: 0 8px;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.form-group {
  margin-bottom: 40px;
  transition: all 0.3s ease;
  position: relative;
}

.form-group:hover {
  transform: translateY(-2px);
}

.form-row {
  display: flex;
  gap: 28px;
  margin-bottom: 40px;
}

.half {
  flex: 0 0 calc(50% - 14px);
}

.quarter {
  flex: 0 0 calc(25% - 21px);
}

/* Form Controls */
label {
  display: block;
  font-size: 16px;
  font-weight: 600;
  color: #1E293B;
  margin-bottom: 12px;
  transition: color 0.2s ease;
  letter-spacing: 0.01em;
}

.form-group:hover label {
  color: #0F4C81;
}

.sub-label {
  font-size: 14px;
  color: #64748B;
  margin-top: -4px;
  margin-bottom: 12px;
  font-weight: 400;
}

.input-hint {
  font-size: 14px;
  color: #64748B;
  margin-bottom: 12px;
  font-style: italic;
  padding-left: 2px;
}

.invisible {
  visibility: hidden;
}

.form-control {
  width: 100%;
  padding: 16px 18px;
  font-size: 16px;
  border: 1px solid #E2E8F0;
  border-radius: 10px;
  background-color: #FFFFFF;
  transition: all 0.3s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.form-control:focus {
  outline: none;
  border-color: #3B82F6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
  transform: translateY(-1px);
}

.form-control::placeholder {
  color: #94A3B8;
}

.textarea {
  resize: vertical;
  min-height: 160px;
  line-height: 1.6;
}

.custom-select {
  position: relative;
}

.select-arrow {
  position: absolute;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: #64748B;
  transition: transform 0.2s ease;
}

.custom-select:hover .select-arrow {
  color: #0F4C81;
}

/* Upload Controls */
.upload-label {
  cursor: pointer;
  display: block;
}

.upload-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  padding: 36px;
  border: 2px dashed #E2E8F0;
  border-radius: 12px;
  background-color: #F8FAFC;
  color: #64748B;
  transition: all 0.3s ease;
  margin: 4px 0;
}

.upload-button:hover {
  border-color: #3B82F6;
  color: #3B82F6;
  background-color: #F0F9FF;
  transform: translateY(-2px);
}

.upload-formats {
  font-size: 13px;
  color: #94A3B8;
  margin-top: 12px;
  text-align: center;
}

.upload-hint {
  font-size: 13px;
  color: #94A3B8;
  margin-top: 12px;
  text-align: center;
}

.file-input {
  display: none;
}

/* Form Actions */
.form-actions {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: 56px;
  padding-top: 16px;
}

.btn-primary {
  padding: 16px 36px;
  font-size: 16px;
  font-weight: 600;
  color: #FFFFFF;
  background-color: #0F4C81;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 160px;
  box-shadow: 0 4px 12px rgba(15, 76, 129, 0.2);
  position: relative;
  overflow: hidden;
}

.btn-primary:hover {
  background-color: #0D3F6A;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(15, 76, 129, 0.25);
}

.btn-primary:active {
  transform: translateY(1px);
  box-shadow: 0 2px 8px rgba(15, 76, 129, 0.2);
}

.btn-secondary {
  padding: 16px 36px;
  font-size: 16px;
  font-weight: 600;
  color: #64748B;
  background-color: #F1F5F9;
  border: 1px solid #E2E8F0;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 160px;
}

.btn-secondary:hover {
  background-color: #E2E8F0;
  color: #334155;
  transform: translateY(-2px);
}

.btn-secondary:active {
  transform: translateY(1px);
}

.btn-primary::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 5px;
  height: 5px;
  background: rgba(255, 255, 255, 0.5);
  opacity: 0;
  border-radius: 100%;
  transform: scale(1, 1) translate(-50%);
  transform-origin: 50% 50%;
}

.btn-primary:focus:not(:active)::after {
  animation: ripple 1s ease-out;
}

@keyframes ripple {
  0% {
    transform: scale(0, 0);
    opacity: 0.5;
  }
  20% {
    transform: scale(25, 25);
    opacity: 0.3;
  }
  100% {
    opacity: 0;
    transform: scale(40, 40);
  }
}

/* Table of Contents Styles */
.toc-section {
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  margin: 12px 0;
}

.toc-section:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 22px 26px;
  background-color: #F8FAFC;
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 1px solid transparent;
}

.section-header:hover {
  background-color: #F1F5F9;
}

.section-header label {
  margin: 0;
  font-weight: 600;
  font-size: 17px;
  color: #0F172A;
  display: flex;
  align-items: center;
  gap: 10px;
}

.section-header label::before {
  content: '';
  display: inline-block;
  width: 6px;
  height: 6px;
  background-color: #0F4C81;
  border-radius: 50%;
}

.toggle-icon {
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  color: #64748B;
}

.toggle-icon.rotated {
  transform: rotate(180deg);
  color: #0F4C81;
}

.section-content {
  padding: 32px;
  border-top: 1px solid #E2E8F0;
  background-color: #FFFFFF;
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.section-description {
  font-size: 15px;
  color: #64748B;
  margin: 0 0 28px 0;
  line-height: 1.6;
  padding: 0 4px;
}

.chapters-container {
  margin-bottom: 28px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.chapter-item {
  border: 1px solid #E2E8F0;
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.chapter-item:hover {
  border-color: #CBD5E1;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.chapter-header {
  display: flex;
  align-items: center;
  padding: 18px 22px;
  background-color: #F8FAFC;
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 1px solid transparent;
}

.chapter-header:hover {
  background-color: #F1F5F9;
}

.chapter-number {
  font-weight: 600;
  color: #0F172A;
  margin-right: 18px;
  min-width: 100px;
  font-size: 15px;
  background-color: #E2E8F0;
  padding: 8px 12px;
  border-radius: 8px;
  text-align: center;
  transition: all 0.3s ease;
}

.chapter-item:hover .chapter-number {
  background-color: #CBD5E1;
  color: #0F4C81;
}

.chapter-title-input {
  flex: 1;
  padding: 12px 16px;
  font-size: 15px;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  background-color: #FFFFFF;
  transition: all 0.3s ease;
}

.chapter-title-input:focus {
  outline: none;
  border-color: #3B82F6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
}

.chapter-actions {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-left: 18px;
}

.chapter-content {
  padding: 28px;
  border-top: 1px solid #E2E8F0;
  background-color: #FFFFFF;
  animation: slideDown 0.3s ease;
}

.section-item {
  margin-bottom: 20px;
}

.section-row {
  display: flex;
  align-items: center;
  gap: 14px;
}

.section-number {
  font-size: 14px;
  color: #64748B;
  min-width: 50px;
  background-color: #F1F5F9;
  padding: 8px 10px;
  border-radius: 6px;
  text-align: center;
  transition: all 0.3s ease;
}

.section-row:hover .section-number {
  background-color: #E2E8F0;
  color: #0F4C81;
}

.section-title-input {
  flex: 1;
  padding: 12px 16px;
  font-size: 14px;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.section-title-input:focus {
  outline: none;
  border-color: #3B82F6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
}

.icon-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background-color: transparent;
  border: none;
  border-radius: 8px;
  color: #94A3B8;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-left: 6px;
}

.icon-button:hover {
  background-color: #FEE2E2;
  color: #EF4444;
}

.add-section-btn, .add-chapter-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 14px 20px;
  font-size: 14px;
  font-weight: 500;
  color: #3B82F6;
  background-color: #EFF6FF;
  border: 1px solid #BFDBFE;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
}

.add-section-btn {
  margin-top: 24px;
}

.add-chapter-btn {
  margin-top: 28px;
}

.add-section-btn:hover, .add-chapter-btn:hover {
  background-color: #DBEAFE;
  border-color: #93C5FD;
  transform: translateY(-2px);
  box-shadow: 0 2px 6px rgba(59, 130, 246, 0.15);
}

.add-section-btn:active, .add-chapter-btn:active {
  transform: translateY(0);
}

/* Preview Section Styles */
.preview-section {
  margin-top: 60px;
  border-top: 1px dashed #CBD5E1;
  padding-top: 48px;
}

.preview-description {
  font-size: 16px;
  color: #64748B;
  margin: -24px 0 32px 0;
  text-align: center;
}

.session-preview-card {
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  background-color: #FFFFFF;
  max-width: 900px;
  margin: 0 auto;
}

.preview-header {
  display: flex;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #E2E8F0;
  background-color: #F8FAFC;
}

.preview-back-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background-color: #F1F5F9;
  border-radius: 50%;
  margin-right: 16px;
}

.preview-title {
  flex: 1;
}

.preview-title h4 {
  font-size: 18px;
  font-weight: 600;
  color: #0F172A;
  margin: 0 0 4px 0;
}

.preview-title p {
  font-size: 14px;
  color: #64748B;
  margin: 0;
}

.preview-stats-card {
  display: flex;
  padding: 24px;
  background-color: #FFFFFF;
  border-bottom: 1px solid #E2E8F0;
}

.preview-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background-color: #FFA500;
  border-radius: 50%;
  margin-right: 24px;
  color: #FFFFFF;
  font-size: 24px;
  font-weight: 600;
}

.preview-stats {
  display: flex;
  gap: 40px;
}

.stat-item {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 18px;
  font-weight: 600;
  color: #0F172A;
}

.stat-label {
  font-size: 12px;
  color: #64748B;
  margin-top: 4px;
}

.preview-schedule {
  padding: 24px;
}

.preview-schedule h5 {
  font-size: 16px;
  font-weight: 600;
  color: #0F172A;
  margin: 0 0 8px 0;
}

.schedule-info {
  font-size: 14px;
  color: #64748B;
  margin: 0 0 20px 0;
  line-height: 1.5;
}

.preview-calendar {
  background-color: #F8FAFC;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;
}

.calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.calendar-month {
  font-size: 16px;
  font-weight: 600;
  color: #0F172A;
}

.calendar-nav {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 50%;
  cursor: pointer;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
}

.calendar-placeholder {
  height: 180px;
  background-color: #F1F5F9;
  border-radius: 8px;
  grid-column: 1 / -1;
}

.preview-chapter {
  background-color: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  margin-bottom: 24px;
  overflow: hidden;
}

.chapter-header-preview {
  padding: 16px;
  position: relative;
}

.chapter-header-preview h5 {
  font-size: 12px;
  font-weight: 600;
  color: #64748B;
  margin: 0 0 8px 0;
  letter-spacing: 0.05em;
}

.chapter-header-preview h6 {
  font-size: 16px;
  font-weight: 600;
  color: #0F172A;
  margin: 0;
  padding-right: 30px;
}

.chapter-expand {
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  color: #64748B;
  cursor: pointer;
}

.preview-description-box {
  background-color: #F8FAFC;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;
}

.preview-description-box h5 {
  font-size: 12px;
  font-weight: 600;
  color: #64748B;
  margin: 0 0 8px 0;
  letter-spacing: 0.05em;
}

.preview-description-box p {
  font-size: 14px;
  color: #334155;
  margin: 0;
  line-height: 1.6;
}

.preview-date-time {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.date-time-badge {
  background-color: #EFF6FF;
  color: #3B82F6;
  font-size: 14px;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 6px;
}

.join-button {
  background-color: #3B82F6;
  color: #FFFFFF;
  font-size: 14px;
  font-weight: 600;
  padding: 8px 24px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.preview-host {
  margin-top: 32px;
}

.host-info {
  display: flex;
  align-items: center;
  margin-top: 12px;
}

.host-avatar {
  width: 40px;
  height: 40px;
  background-color: #E2E8F0;
  border-radius: 50%;
  margin-right: 16px;
}

.host-details {
  flex: 1;
}

.host-name {
  font-size: 15px;
  font-weight: 600;
  color: #0F172A;
}

.host-role {
  font-size: 13px;
  color: #64748B;
  margin-top: 2px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .create-session-container {
    padding: 24px;
  }

  .form-container {
    padding: 32px;
  }

  .form-row {
    flex-direction: column;
    gap: 24px;
  }

  .half, .quarter {
    flex: 0 0 100%;
  }

  .chapter-header {
    flex-wrap: wrap;
    gap: 14px;
  }

  .chapter-number {
    margin-bottom: 10px;
  }

  .form-actions {
    flex-direction: column-reverse;
    gap: 18px;
  }

  .btn-primary, .btn-secondary {
    width: 100%;
  }

  .preview-stats {
    gap: 20px;
  }

  .preview-avatar {
    width: 50px;
    height: 50px;
    font-size: 20px;
    margin-right: 16px;
  }
}

/* Meeting Platform Grid Styles */
.meeting-platform-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.platform-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: #FFFFFF;
  border: 2px solid #E2E8F0;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.platform-card:hover {
  border-color: #3B82F6;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.1);
}

.platform-card.selected {
  border-color: #3B82F6;
  background-color: #EFF6FF;
}

.platform-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
}

.platform-icon img {
  width: 32px;
  height: 32px;
  filter: grayscale(100%);
  transition: filter 0.3s ease;
}

.platform-card:hover .platform-icon img,
.platform-card.selected .platform-icon img {
  filter: grayscale(0%);
}

.platform-name {
  font-size: 14px;
  font-weight: 500;
  color: #64748B;
  text-align: center;
  transition: color 0.3s ease;
}

.platform-card:hover .platform-name,
.platform-card.selected .platform-name {
  color: #3B82F6;
}

.platform-status {
  position: absolute;
  top: 12px;
  right: 12px;
  color: #3B82F6;
  animation: fadeIn 0.3s ease;
}

.platform-loading {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  font-size: 12px;
  color: #3B82F6;
  gap: 8px;
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid #E2E8F0;
  border-top-color: #3B82F6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Meeting Details Styles */
.meeting-details {
  margin-top: 24px;
  animation: slideUp 0.3s ease;
}

.meeting-info {
  background: #F8FAFC;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
}

.meeting-success {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #10B981;
  font-size: 14px;
  margin-bottom: 12px;
}

.meeting-link {
  display: flex;
  gap: 8px;
}

.copy-button {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  color: #64748B;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.copy-button:hover {
  border-color: #3B82F6;
  color: #3B82F6;
}

.create-meeting-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 12px;
  background: #3B82F6;
  color: #FFFFFF;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.create-meeting-button:disabled {
  background: #E2E8F0;
  cursor: not-allowed;
}

.create-meeting-button:not(:disabled):hover {
  background: #2563EB;
  transform: translateY(-1px);
}

.meeting-hint {
  font-size: 13px;
  color: #64748B;
  text-align: center;
  margin-top: 8px;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
