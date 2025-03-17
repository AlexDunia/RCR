<template>
  <div class="completed-task-view">
    <!-- Header -->
    <header class="completed-task-header">
      <div class="container">
      <button class="back-button" @click="goBack">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
          <span>Back to Completed Tasks</span>
      </button>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container">
      <!-- Loading State -->
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Loading task details...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="!task" class="error-state">
        <div class="error-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 9V11M12 15H12.01M5.07183 19H18.9282C20.4678 19 21.4301 17.3333 20.6603 16L13.7321 4C12.9623 2.66667 11.0378 2.66667 10.268 4L3.33978 16C2.56998 17.3333 3.53223 19 5.07183 19Z" stroke="#6B7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h2>Task Not Found</h2>
        <p>We couldn't find the task you're looking for. It may have been deleted or moved.</p>
        <button class="primary-button" @click="goBack">Return to Tasks</button>
      </div>

      <!-- Task Content -->
      <div v-else class="task-content">
        <!-- Task Header -->
        <div class="task-header">
          <div class="task-header-top">
            <div class="task-status-badge completed">Completed</div>
            <div class="task-priority" :class="task.priority?.toLowerCase() || 'medium'">
              {{ capitalizeFirst(task.priority || 'Medium') }} Priority
            </div>
          </div>
          <h1 class="task-title">{{ task.title }}</h1>
        </div>

        <!-- Task Summary Card -->
        <div class="task-summary-card">
          <div class="summary-grid">
            <div class="summary-item">
              <div class="summary-label">Created</div>
              <div class="summary-value">{{ formatDate(task.createdAt) }}</div>
            </div>
            <div class="summary-item">
              <div class="summary-label">Started</div>
              <div class="summary-value">{{ formatDate(task.startedAt) }}</div>
            </div>
            <div class="summary-item">
              <div class="summary-label">Completed</div>
              <div class="summary-value">{{ formatDate(task.completedAt) }}</div>
          </div>
            <div class="summary-item">
              <div class="summary-label">Duration</div>
              <div class="summary-value">{{ calculateDuration(task.startedAt, task.completedAt) }}</div>
            </div>
          </div>
        </div>

        <!-- Task Details Grid -->
        <div class="task-details-grid">
          <!-- Left Column -->
          <div class="task-details-column">
            <!-- Description Section -->
            <section class="task-section" v-if="task.description && task.description.length > 0">
              <h2 class="section-title">Description</h2>
              <div class="description-content">
                <ul class="description-list">
                  <li v-for="(item, index) in task.description" :key="index" class="description-item">
                    {{ item.replace(/^- /, '') }}
                  </li>
                </ul>
          </div>
            </section>

            <!-- Attachments Section -->
            <section class="task-section" v-if="task.attachments && task.attachments.length > 0">
              <h2 class="section-title">Attachments</h2>
          <div class="attachments-list">
            <div v-for="(file, index) in task.attachments" :key="index" class="attachment-item">
                  <div class="attachment-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 21C5.89543 21 5 20.1046 5 19V3C5 1.89543 5.89543 1 7 1H14L19 6V19C19 20.1046 18.1046 21 17 21H7Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M13 1V7H19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                  </div>
              <span class="attachment-name">{{ file.name }}</span>
                  <a href="#" class="attachment-view-btn">View</a>
                </div>
              </div>
              <div v-if="!task.attachments || task.attachments.length === 0" class="no-attachments">
                No attachments were added to this task.
            </div>
            </section>
          </div>

          <!-- Right Column -->
          <div class="task-details-column">
            <!-- People Involved Section -->
            <section class="task-section">
              <h2 class="section-title">People Involved</h2>

              <!-- Agents Subsection -->
              <div class="subsection" v-if="task.agentDetails && task.agentDetails.length > 0">
                <h3 class="subsection-title">Agents</h3>
                <div class="people-list">
                  <div v-for="agent in task.agentDetails" :key="agent.id" class="person-card">
                    <div class="person-avatar agent">{{ getInitials(agent.name) }}</div>
                    <div class="person-info">
                      <div class="person-name">{{ agent.name }}</div>
                      <div class="person-email">{{ agent.email || 'No email provided' }}</div>
                    </div>
                  </div>
                </div>
                <div v-if="!task.agentDetails || task.agentDetails.length === 0" class="no-people">
                  No agents were assigned to this task.
        </div>
      </div>

              <!-- Clients Subsection -->
              <div class="subsection" v-if="task.clientDetails && task.clientDetails.length > 0">
                <h3 class="subsection-title">Clients</h3>
                <div class="people-list">
                  <div v-for="client in task.clientDetails" :key="client.id" class="person-card">
                    <div class="person-avatar client">{{ getInitials(client.name) }}</div>
                    <div class="person-info">
                      <div class="person-name">{{ client.name }}</div>
                      <div class="person-email">{{ client.email || 'No email provided' }}</div>
                    </div>
      </div>
    </div>
                <div v-if="!task.clientDetails || task.clientDetails.length === 0" class="no-people">
                  No clients were assigned to this task.
                </div>
      </div>
            </section>
    </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useLayoutStore } from '@/stores/layout';

const route = useRoute();
const router = useRouter();
const layoutStore = useLayoutStore();
const task = ref(null);
const loading = ref(true);

// Reset layout when component is unmounted
onBeforeUnmount(() => {
  layoutStore.setLayout({
    hideSidebar: false,
    hideHeader: false,
    background: '#F9FAFB'
  });
});

const goBack = () => {
  router.push('/tasks/completed');
};

const formatDate = (date) => {
  if (!date) return 'N/A';
  return new Date(date).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).replace(',', '');
};

const calculateDuration = (startDate, endDate) => {
  if (!startDate || !endDate) return 'N/A';

  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffMs = end - start;

  // If less than a minute
  if (diffMs < 60000) {
    return 'Less than a minute';
  }

  // If less than an hour
  if (diffMs < 3600000) {
    const minutes = Math.floor(diffMs / 60000);
    return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
  }

  // If less than a day
  if (diffMs < 86400000) {
    const hours = Math.floor(diffMs / 3600000);
    const minutes = Math.floor((diffMs % 3600000) / 60000);
    return `${hours} hour${hours !== 1 ? 's' : ''} ${minutes > 0 ? `${minutes} minute${minutes !== 1 ? 's' : ''}` : ''}`;
  }

  // If more than a day
  const days = Math.floor(diffMs / 86400000);
  const hours = Math.floor((diffMs % 86400000) / 3600000);
  return `${days} day${days !== 1 ? 's' : ''} ${hours > 0 ? `${hours} hour${hours !== 1 ? 's' : ''}` : ''}`;
};

const getInitials = (name) => {
  if (!name) return '';
  return name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

const capitalizeFirst = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

onMounted(() => {
  // Set layout to hide header and sidebar after a slight delay
  setTimeout(() => {
    layoutStore.setLayout({
      hideSidebar: true,
      hideHeader: true,
      background: '#f9fafb'
    });
  }, 50);

  loading.value = true;

  setTimeout(() => {
    const taskId = route.params.id;
    // First try to get the task from completedTasks localStorage
    const completedTaskJson = localStorage.getItem('completedTasks');

    if (completedTaskJson) {
      const completedTask = JSON.parse(completedTaskJson);
      // Check if this is the task we're looking for
      if (completedTask.id === taskId) {
        task.value = completedTask;
        loading.value = false;
        return;
      }
    }

    // If not found in completedTasks, look in all tasks
    const allTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const foundTask = allTasks.find(t => t.id === taskId && t.status === 'completed');

    if (foundTask) {
      task.value = foundTask;
    }

    loading.value = false;
  }, 800);
});
</script>

<style scoped>
/* Base Styles */
.completed-task-view {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: #374151;
  background-color: #F9FAFB;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Header Styles */
.completed-task-header {
  background-color: #FFFFFF;
  border-bottom: 1px solid #E5E7EB;
  padding: 16px 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.back-button {
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: #4B5563;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.back-button:hover {
  background-color: #F3F4F6;
  color: #111827;
}

/* Loading State */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 0;
  text-align: center;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #3B82F6;
  animation: spin 1s ease-in-out infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Error State */
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 0;
  text-align: center;
}

.error-icon {
  margin-bottom: 16px;
  color: #6B7280;
}

.error-state h2 {
  font-size: 20px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 8px;
}

.error-state p {
  color: #6B7280;
  margin: 0 0 24px;
  max-width: 400px;
}

.primary-button {
  background-color: #3B82F6;
  color: white;
  border: none;
  font-size: 14px;
  font-weight: 500;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.primary-button:hover {
  background-color: #2563EB;
}

/* Task Content */
.task-content {
  padding: 32px 0;
}

/* Task Header */
.task-header {
  margin-bottom: 24px;
}

.task-header-top {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
}

.task-status-badge {
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.task-status-badge.completed {
  background-color: #D1FAE5;
  color: #065F46;
}

.task-priority {
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 600;
}

.task-priority.high {
  background-color: #FEE2E2;
  color: #B91C1C;
}

.task-priority.medium {
  background-color: #FEF3C7;
  color: #92400E;
}

.task-priority.low {
  background-color: #DBEAFE;
  color: #1E40AF;
}

.task-title {
  font-size: 24px;
  font-weight: 700;
  color: #111827;
  margin: 0;
  line-height: 1.3;
}

/* Task Summary Card */
.task-summary-card {
  background-color: #FFFFFF;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 24px;
  margin-bottom: 24px;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 24px;
}

.summary-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.summary-label {
  font-size: 12px;
  font-weight: 500;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.summary-value {
  font-size: 16px;
  font-weight: 500;
  color: #111827;
}

/* Task Details Grid */
.task-details-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.task-section {
  background-color: #FFFFFF;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 24px;
  margin-bottom: 24px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #E5E7EB;
}

.subsection-title {
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin: 24px 0 12px;
}

/* Description Styles */
.description-content {
  background-color: #F9FAFB;
  border-radius: 6px;
  padding: 16px;
}

.description-list {
  margin: 0;
  padding: 0 0 0 20px;
}

.description-item {
  margin-bottom: 8px;
  color: #4B5563;
  font-size: 14px;
  line-height: 1.6;
}

/* Attachments Styles */
.attachments-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.attachment-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background-color: #F9FAFB;
  border-radius: 6px;
  transition: background-color 0.2s;
}

.attachment-item:hover {
  background-color: #F3F4F6;
}

.attachment-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background-color: #E5E7EB;
  border-radius: 6px;
  color: #6B7280;
}

.attachment-name {
  flex: 1;
  font-size: 14px;
  color: #374151;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.attachment-view-btn {
  background-color: #EFF6FF;
  color: #3B82F6;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  text-decoration: none;
}

.attachment-view-btn:hover {
  background-color: #DBEAFE;
}

.no-attachments {
  color: #6B7280;
  font-size: 14px;
  text-align: center;
  padding: 16px;
  background-color: #F9FAFB;
  border-radius: 6px;
}

/* People Styles */
.people-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
  margin-bottom: 16px;
}

.person-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background-color: #F9FAFB;
  border-radius: 6px;
  transition: background-color 0.2s;
}

.person-card:hover {
  background-color: #F3F4F6;
}

.person-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 14px;
  font-weight: 600;
  color: white;
}

.person-avatar.agent {
  background-color: #3B82F6;
}

.person-avatar.client {
  background-color: #8B5CF6;
}

.person-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.person-name {
  font-size: 14px;
  font-weight: 500;
  color: #111827;
}

.person-email {
  font-size: 12px;
  color: #6B7280;
}

.no-people {
  color: #6B7280;
  font-size: 14px;
  text-align: center;
  padding: 16px;
  background-color: #F9FAFB;
  border-radius: 6px;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .task-details-grid {
    grid-template-columns: 1fr;
  }

  .summary-grid {
    grid-template-columns: 1fr 1fr;
  }

  .people-list {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .container {
    padding: 0 16px;
  }

  .task-title {
    font-size: 20px;
  }

  .summary-grid {
    grid-template-columns: 1fr;
  }

  .task-section {
    padding: 16px;
  }
}
</style>
