<template>
  <div class="task-detail-page">
    <!-- Back Button Header -->
    <div class="detail-header">
      <button class="back-button" @click="goBack">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Back
      </button>
      <h1 class="header-title">Task Details</h1>
      <div class="header-spacer"></div>
    </div>

    <!-- Loading Skeleton -->
    <div v-if="loading" class="task-detail-skeleton">
      <div class="skeleton-header">
        <div class="skeleton-badge"></div>
        <div class="skeleton-title"></div>
      </div>
      <div class="skeleton-dates">
        <div class="skeleton-date"></div>
        <div class="skeleton-date"></div>
      </div>
      <div class="skeleton-description"></div>
      <div class="skeleton-section"></div>
      <div class="skeleton-section"></div>
    </div>

    <!-- Task Detail Content -->
    <div v-else-if="task" class="task-detail-content">
      <!-- Status Badge -->
      <div class="status-badge" v-if="task.status">
        <svg class="status-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 8v4m0 4h.01M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>{{ capitalizeFirst(task.status) }}</span>
      </div>

      <!-- Task Title -->
      <h1 class="task-title">{{ task.title }}</h1>

      <!-- Task Dates -->
      <div class="task-dates">
        <div class="date-label">
          <svg class="date-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Created: {{ formatDate(task.createdAt) }}
        </div>
        <div v-if="task.startedAt" class="date-label">
          <svg class="date-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Started: {{ formatDate(task.startedAt) }}
        </div>
        <div v-if="task.updatedAt" class="date-label">
          <svg class="date-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Updated: {{ formatDate(task.updatedAt) }}
        </div>
      </div>

      <!-- Task Description -->
      <div v-if="task.description && task.description.length > 0" class="description-section">
        <h2 class="section-heading">Description</h2>
        <div class="description-content">
          <p v-for="(line, index) in task.description" :key="index" class="description-line">
            {{ line }}
          </p>
        </div>
      </div>

      <!-- Task Details -->
      <div class="details-section">
        <h2 class="section-heading">Details</h2>

        <!-- Agents -->
        <div v-if="task.agentDetails?.length > 0" class="detail-item">
          <div class="detail-label">
            <svg class="detail-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 20H22V18C22 16.3431 20.6569 15 19 15C18.0444 15 17.1931 15.4468 16.6438 16.1429M17 20H7M17 20V18C17 17.3438 16.8736 16.717 16.6438 16.1429M7 20H2V18C2 16.3431 3.34315 15 5 15C5.95561 15 6.80686 15.4468 7.35625 16.1429M7 20V18C7 17.3438 7.12642 16.717 7.35625 16.1429M7.35625 16.1429C8.0935 14.301 9.89482 13 12 13C14.1052 13 15.9065 14.301 16.6438 16.1429M15 7C15 8.65685 13.6569 10 12 10C10.3431 10 9 8.65685 9 7C9 5.34315 10.3431 4 12 4C13.6569 4 15 5.34315 15 7ZM21 10C21 11.1046 20.1046 12 19 12C17.8954 12 17 11.1046 17 10C17 8.89543 17.8954 8 19 8C20.1046 8 21 8.89543 21 10ZM7 10C7 11.1046 6.10457 12 5 12C3.89543 12 3 11.1046 3 10C3 8.89543 3.89543 8 5 8C6.10457 8 7 8.89543 7 10Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Agents
          </div>
          <div class="agent-list">
            <div v-for="agent in task.agentDetails" :key="agent.id" class="agent-chip">
              <span class="agent-avatar">{{ getInitials(agent.name) }}</span>
              <span>{{ agent.name }}</span>
            </div>
          </div>
        </div>

        <!-- Clients -->
        <div v-if="task.clientDetails?.length > 0" class="detail-item">
          <div class="detail-label">
            <svg class="detail-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Clients
          </div>
          <div class="client-list">
            <div v-for="client in task.clientDetails" :key="client.id" class="client-chip">
              <span class="client-avatar">{{ getInitials(client.name) }}</span>
              <span>{{ client.name }}</span>
            </div>
          </div>
        </div>

        <!-- Priority -->
        <div v-if="task.priority" class="detail-item">
          <div class="detail-label">
            <svg class="detail-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 9V12M12 12V15M12 12H15M12 12H9M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Priority
          </div>
          <span class="priority-badge" :class="`priority-${task.priority}`">
            {{ capitalizeFirst(task.priority) }}
          </span>
        </div>

        <!-- Attachments -->
        <div v-if="task.attachments?.length > 0" class="detail-item">
          <div class="detail-label">
            <svg class="detail-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.172 7L8.5 13.672M7.5 9L13.5 15M16.5 16L12.5 20C11.1193 21.3807 8.88071 21.3807 7.5 20C6.11929 18.6193 6.11929 16.3807 7.5 15L15.5 7C16.3284 6.17157 17.6716 6.17157 18.5 7C19.3284 7.82843 19.3284 9.17157 18.5 10L10.5 18C10.0858 18.4142 9.41421 18.4142 9 18C8.58579 17.5858 8.58579 16.9142 9 16.5L15 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Attachments
          </div>
          <div class="attachments-list">
            <div v-for="(file, index) in task.attachments" :key="index" class="attachment-item">
              <span class="attachment-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 21C5.89543 21 5 20.1046 5 19V3C5 1.89543 5.89543 1 7 1H14L19 6V19C19 20.1046 18.1046 21 17 21H7Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M13 1V7H19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
              <span class="attachment-name">{{ file.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else class="error-state">
      <div class="error-icon">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 9V12M12 15H12.01M5.07183 19H18.9282C20.4678 19 21.4301 17.3333 20.6603 16L13.7321 4C12.9623 2.66667 11.0378 2.66667 10.268 4L3.33978 16C2.56998 17.3333 3.53223 19 5.07183 19Z" stroke="#EF4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <h3 class="error-title">Task not found</h3>
      <p class="error-text">The task you're looking for doesn't exist or has been removed</p>
      <button class="back-to-list-btn" @click="goBack">Back</button>
    </div>
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
  // Set layout to show header and sidebar
  layoutStore.setLayout({
    hideSidebar: false,
    hideHeader: false,
    background: '#F9FAFB'
  });

  // Determine where to go back based on task status
  if (task.value && task.value.status) {
    if (task.value.status === 'completed') {
      router.push('/tasks/completed');
    } else if (task.value.status === 'draft') {
      router.push('/tasks/drafts');
    } else if (task.value.status === 'scheduled') {
      router.push('/tasks/scheduled');
    } else {
      router.push('/tasks/in-progress');
    }
  } else {
    // Fallback to in-progress tasks if no status is found
    router.push('/tasks/in-progress');
  }
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

onMounted(async () => {
  loading.value = true;

  // Set layout to hide header and sidebar after a slight delay
  // This prevents the layout from changing before navigation completes
  setTimeout(() => {
    layoutStore.setLayout({
      hideSidebar: true,
      hideHeader: true,
      background: '#f9fafb'
    });
  }, 50);

  setTimeout(() => {
    const taskId = route.params.id;
    const storedTask = localStorage.getItem('currentTaskDetail');

    if (storedTask) {
      task.value = JSON.parse(storedTask);
    } else {
      const allTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      task.value = allTasks.find(t => t.id === taskId);
    }

    loading.value = false;
  }, 800);
});
</script>

<style scoped>
.task-detail-page {
  padding: 20px;
  max-width: 100%;
  margin: 0 auto;
  background-color: #f9fafb;
  min-height: 100vh;
  animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.detail-header {
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #E5E7EB;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.back-button {
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: #4B5563;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  padding: 10px 16px;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.back-button:hover {
  background-color: #F3F4F6;
  color: #111827;
  transform: translateX(-2px);
}

.task-detail-content {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  margin-bottom: 30px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  background-color: rgba(37, 99, 235, 0.1);
  color: #2563EB;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 16px;
}

.status-icon {
  stroke: #2563EB;
}

.task-title {
  font-size: 24px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 24px;
  line-height: 1.4;
}

.task-dates {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 32px;
}

.date-label {
  display: flex;
  align-items: center;
  gap: 6px;
  background-color: #F3F4F6;
  color: #4B5563;
  font-size: 13px;
  padding: 6px 12px;
  border-radius: 6px;
  font-weight: 500;
}

.date-icon {
  stroke: #6B7280;
}

.section-heading {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #E5E7EB;
}

.description-section {
  margin-bottom: 32px;
}

.description-content {
  background-color: #F9FAFB;
  border-radius: 8px;
  padding: 20px;
}

.description-line {
  color: #4B5563;
  font-size: 14px;
  margin: 10px 0;
  line-height: 1.6;
}

.details-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.detail-item {
  margin-bottom: 20px;
}

.detail-label {
  font-weight: 600;
  color: #374151;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 12px;
}

.detail-icon {
  stroke: #6B7280;
}

.agent-list, .client-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.agent-chip, .client-chip {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  background-color: #F3F4F6;
  border-radius: 20px;
  font-size: 13px;
  color: #4B5563;
  transition: all 0.2s ease;
}

.agent-chip:hover, .client-chip:hover {
  background-color: #E5E7EB;
  transform: translateY(-1px);
}

.agent-avatar, .client-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background-color: #2563EB;
  color: white;
  border-radius: 50%;
  font-size: 11px;
  font-weight: 600;
}

.client-avatar {
  background-color: #2563EB;
  opacity: 0.8;
}

.priority-badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 16px;
  font-size: 13px;
  font-weight: 500;
}

.priority-high {
  background-color: rgba(239, 68, 68, 0.1);
  color: #EF4444;
}

.priority-medium {
  background-color: rgba(245, 158, 11, 0.1);
  color: #F59E0B;
}

.priority-low {
  background-color: rgba(37, 99, 235, 0.1);
  color: #2563EB;
}

.attachments-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.attachment-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  background-color: #F3F4F6;
  border-radius: 6px;
  font-size: 13px;
  color: #4B5563;
  transition: all 0.2s ease;
}

.attachment-item:hover {
  background-color: #E5E7EB;
  transform: translateX(2px);
}

.attachment-icon {
  color: #6B7280;
}

.attachment-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Skeleton Loading Styles */
.task-detail-skeleton {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.06);
  padding: 32px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
}

.task-detail-skeleton::after {
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

.skeleton-header {
  margin-bottom: 24px;
}

.skeleton-badge {
  width: 100px;
  height: 24px;
  background-color: #E5E7EB;
  border-radius: 16px;
  margin-bottom: 16px;
}

.skeleton-title {
  width: 70%;
  height: 32px;
  background-color: #E5E7EB;
  border-radius: 4px;
}

.skeleton-dates {
  display: flex;
  gap: 12px;
  margin-bottom: 32px;
}

.skeleton-date {
  width: 150px;
  height: 30px;
  background-color: #E5E7EB;
  border-radius: 6px;
}

.skeleton-description {
  width: 100%;
  height: 120px;
  background-color: #E5E7EB;
  border-radius: 8px;
  margin-bottom: 32px;
}

.skeleton-section {
  width: 100%;
  height: 80px;
  background-color: #E5E7EB;
  border-radius: 8px;
  margin-bottom: 24px;
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

/* Error State */
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  text-align: center;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.06);
}

.error-icon {
  margin-bottom: 20px;
  color: #EF4444;
}

.error-title {
  font-size: 18px;
  font-weight: 600;
  color: #374151;
  margin: 0 0 12px;
}

.error-text {
  color: #6B7280;
  font-size: 14px;
  max-width: 300px;
  margin-bottom: 24px;
}

.back-to-list-btn {
  background-color: #2563EB;
  color: white;
  border: none;
  font-size: 14px;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 6px;
  transition: all 0.2s;
  font-weight: 500;
}

.back-to-list-btn:hover {
  background-color: #1D4ED8;
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .task-detail-page {
    padding: 16px;
  }

  .task-detail-content {
    padding: 20px;
  }

  .task-dates {
    flex-direction: column;
    gap: 8px;
  }
}

.header-title {
  font-size: 24px;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.header-spacer {
  width: 100px;
}
</style>
