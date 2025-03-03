<!-- TaskDetail.vue -->
<template>
  <main class="task-detail" role="main">
    <!-- Header Section -->
    <header class="task-detail__header">
      <div class="task-detail__nav">
        <button class="task-detail__back" @click="handleBack" aria-label="Back to tasks">
          <svg class="task-detail__back-arrow" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Task management
        </button>
        <div class="task-detail__subtitle">
          Here, you can add, remove, edit task on your profile
        </div>
      </div>
      <div class="task-detail__profile">
        <button class="task-detail__icon-btn" aria-label="Messages">
          <svg class="task-detail__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </button>
        <button class="task-detail__icon-btn" aria-label="Notifications">
          <svg class="task-detail__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>
        <div class="task-detail__user">
          <img
            src="https://res.cloudinary.com/dnuhjsckk/image/upload/v1739408381/Screenshot_2025-02-13_015617_mhjgby.png"
            alt="Profile"
            class="task-detail__avatar"
            @error="handleAvatarError"
          >
          <span class="task-detail__username">Alex Dunia</span>
          <svg class="task-detail__dropdown-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <div class="task-detail__content">
      <!-- Task Header -->
      <div class="task-detail__task-header">
        <div class="task-detail__header-content">
          <div class="task-detail__title-group">
            <h1 class="task-detail__title">{{ taskData.name }}</h1>
            <span class="task-detail__status" :class="'task-detail__status--' + taskData.status">{{ taskData.status }}</span>
          </div>
          <div class="task-detail__date">Scheduled: {{ taskData.date }}</div>
        </div>

        <div class="task-detail__header-actions">
          <template v-if="taskData.status === 'in_progress'">
            <button
              v-if="!taskData.isPaused"
              class="task-detail__header-btn task-detail__header-btn--pause"
              @click="handlePauseTask"
            >
              Pause task
            </button>
            <button
              v-else
              class="task-detail__header-btn task-detail__header-btn--resume"
              @click="handleResumeTask"
            >
              Resume task
            </button>
            <button
              class="task-detail__header-btn task-detail__header-btn--end"
              @click="handleEndTask"
            >
              End task
            </button>
          </template>
          <template v-else-if="taskData.status !== 'completed'">
            <button
              class="task-detail__header-btn task-detail__header-btn--start"
              @click="handleStartTask"
            >
              Start task
            </button>
          </template>
        </div>
      </div>

      <!-- Timer Display -->
      <div
        v-if="taskData.status === 'in_progress'"
        class="task-detail__timer"
        :class="{ 'task-detail__timer--paused': taskData.isPaused }"
      >
        <div class="task-detail__timer-label">
          {{ taskData.isPaused ? 'Timer paused at:' : 'Time elapsed:' }}
        </div>
        <div class="task-detail__timer-display">{{ formattedElapsedTime }}</div>
      </div>

      <!-- Main Grid Layout -->
      <div class="task-detail__grid">
        <!-- Left Column -->
        <div class="task-detail__column">
          <!-- Agents Section -->
          <section class="task-detail__section task-detail__section--agents">
            <h2 class="task-detail__section-title">Agents involved in this task</h2>
            <p class="task-detail__section-subtitle">Add agents from your contacts</p>
            <button class="task-detail__add-btn" @click="openAgentModal">+ Add agent</button>

            <div class="task-detail__agent-list">
              <div v-for="agent in taskData.agentDetails" :key="agent.id" class="task-detail__agent-card">
                <img :src="agent.avatar" :alt="agent.name" class="task-detail__agent-avatar" @error="handleAvatarError">
                <div class="task-detail__agent-info">
                  <span class="task-detail__agent-name">{{ agent.name }}</span>
                  <span class="task-detail__agent-email">{{ agent.email }}</span>
                </div>
                <button
                  class="task-detail__reminder-btn"
                  @click="openReminderModal(agent)"
                  :aria-label="'Send reminder to ' + agent.name"
                >
                  Send reminder
                </button>
              </div>
            </div>
          </section>

          <!-- Clients Section -->
          <section class="task-detail__section task-detail__section--clients">
            <h2 class="task-detail__section-title">Clients involved in this task</h2>
            <p class="task-detail__section-subtitle">Add clients from your contacts</p>
            <button class="task-detail__add-btn" @click="openClientModal">+ Add client</button>

            <div class="task-detail__client-list">
              <div v-for="client in taskData.clientDetails" :key="client.id" class="task-detail__client-card">
                <img :src="client.avatar" :alt="client.name" class="task-detail__client-avatar" @error="handleAvatarError">
                <div class="task-detail__client-info">
                  <span class="task-detail__client-name">{{ client.name }}</span>
                  <span class="task-detail__client-email">{{ client.email }}</span>
                </div>
                <button
                  class="task-detail__reminder-btn"
                  @click="openReminderModal(client)"
                  :aria-label="'Send reminder to ' + client.name"
                >
                  Send reminder
                </button>
              </div>
            </div>
          </section>
        </div>

        <!-- Right Column -->
        <div class="task-detail__column">
          <!-- Task Description -->
          <section class="task-detail__section task-detail__section--description">
            <div class="task-detail__description-header">
              <h2 class="task-detail__section-title">Task description</h2>
              <span class="task-detail__priority task-detail__priority--medium">Medium</span>
            </div>

            <ul class="task-detail__description-list">
              <li v-for="(item, index) in taskData.description" :key="index">{{ item }}</li>
            </ul>
          </section>

          <!-- Timeline -->
          <section class="task-detail__section task-detail__section--timeline">
            <div class="task-detail__timeline">
              <div class="task-detail__timeline-item">
                <span class="task-detail__timeline-label">Started</span>
                <span class="task-detail__timeline-time">{{ formatDate(taskData.startedAt) }}</span>
              </div>
              <div class="task-detail__timeline-item">
                <span class="task-detail__timeline-label">Due date</span>
                <span class="task-detail__timeline-time">{{ formatDate(taskData.endDate) }}</span>
              </div>
              <div v-if="taskData.status === 'in_progress'" class="task-detail__timeline-item">
                <span class="task-detail__timeline-label">Time elapsed</span>
                <span class="task-detail__timeline-time">{{ formattedElapsedTime }}</span>
              </div>
            </div>
          </section>

          <!-- Attachments -->
          <section class="task-detail__section task-detail__section--attachments">
            <h2 class="task-detail__section-title">Attachments</h2>
            <div v-if="taskData.attachments && taskData.attachments.length > 0" class="task-detail__attachments-list">
              <div class="task-detail__attachment" v-for="attachment in taskData.attachments" :key="attachment.id">
                <svg class="task-detail__attachment-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd" />
                </svg>
                <span class="task-detail__attachment-name">{{ attachment.name }}</span>
                <span class="task-detail__attachment-type">{{ attachment.type }}</span>
              </div>
            </div>
            <div v-else class="task-detail__no-attachments">
              No attachments have been uploaded for this task yet.
            </div>
          </section>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <AgentModal
      :is-open="isAgentModalOpen"
      :initial-selected-agents="taskData.agentDetails"
      @close="closeAgentModal"
      @select="handleAgentSelect"
    />
    <ClientModal
      :is-open="isClientModalOpen"
      :initial-selected-clients="taskData.clientDetails"
      @close="closeClientModal"
      @select="handleClientSelect"
    />
    <ReminderModal
      :is-open="isReminderModalOpen"
      :recipient="selectedRecipient"
      :task-data="taskData"
      @close="closeReminderModal"
      @send="handleReminderSend"
    />
  </main>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useRoleGuard } from '@/composables/useRoleGuard';
import AgentModal from './AgentModal.vue';
import ClientModal from './ClientModal.vue';
import ReminderModal from './ReminderModal.vue';

const router = useRouter();
const route = useRoute();
const { checkAccess } = useRoleGuard();

// Modal states
const isAgentModalOpen = ref(false);
const isClientModalOpen = ref(false);
const isReminderModalOpen = ref(false);
const selectedRecipient = ref(null);

// Task data with reactive state
const taskData = reactive({
  id: null,
  name: '',
  status: '',
  date: '',
  startTime: '',
  endTime: '',
  priority: '',
  description: [],
  agentDetails: [],
  clientDetails: [],
  attachments: [],
  createdAt: '',
  updatedAt: '',
  startedAt: '',
  lastEditedAt: '',
  isPaused: false
});

// Timer state
const elapsedTime = ref(0);
const timerInterval = ref(null);
const startTime = ref(null);
const pausedTime = ref(null);
const totalPausedTime = ref(0);

// Computed property for formatted time
const formattedElapsedTime = computed(() => {
  const totalSeconds = Math.floor(elapsedTime.value / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
});

// Methods
const handleAvatarError = (e) => {
  e.target.src = '/default-avatar.jpg';
};

const handleBack = () => {
  router.push('/tasks');
};

const openAgentModal = () => {
  isAgentModalOpen.value = true;
};

const closeAgentModal = () => {
  isAgentModalOpen.value = false;
};

const handleAgentSelect = async (agents) => {
  try {
    taskData.agentDetails = agents;
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const taskIndex = tasks.findIndex(t => t.id === taskData.id);
    if (taskIndex !== -1) {
      tasks[taskIndex] = {
        ...tasks[taskIndex],
        agentDetails: agents,
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem('tasks', JSON.stringify(tasks));
      console.log('Updated agents in localStorage:', tasks[taskIndex]);
    }
  } catch (error) {
    console.error('Failed to update agents:', error);
    alert('Failed to update agents. Please try again.');
  }
};

const openClientModal = () => {
  isClientModalOpen.value = true;
};

const closeClientModal = () => {
  isClientModalOpen.value = false;
};

const handleClientSelect = async (clients) => {
  try {
    taskData.clientDetails = clients;
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const taskIndex = tasks.findIndex(t => t.id === taskData.id);
    if (taskIndex !== -1) {
      tasks[taskIndex] = {
        ...tasks[taskIndex],
        clientDetails: clients,
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem('tasks', JSON.stringify(tasks));
      console.log('Updated clients in localStorage:', tasks[taskIndex]);
      alert('Clients updated successfully');
    }
  } catch (error) {
    console.error('Failed to update clients:', error);
    alert('Failed to update clients. Please try again.');
  }
};

const openReminderModal = (recipient) => {
  selectedRecipient.value = recipient;
  isReminderModalOpen.value = true;
};

const closeReminderModal = () => {
  isReminderModalOpen.value = false;
  selectedRecipient.value = null;
};

const handleReminderSend = async (reminderData) => {
  try {
    alert(`Reminder sent to ${reminderData.recipient}`);
  } catch (error) {
    console.error('Failed to send reminder:', error);
    alert('Failed to send reminder. Please try again.');
  }
};

const handlePauseTask = async () => {
  try {
    taskData.isPaused = true;
    pauseTimer();
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const taskIndex = tasks.findIndex(t => t.id === taskData.id);
    if (taskIndex !== -1) {
      tasks[taskIndex] = {
        ...tasks[taskIndex],
        isPaused: true,
        pausedAt: new Date().toISOString(),
        elapsedTime: elapsedTime.value,
        totalPausedTime: totalPausedTime.value
      };
      localStorage.setItem('tasks', JSON.stringify(tasks));
      console.log('Paused task in localStorage:', tasks[taskIndex]);
    }
  } catch (error) {
    console.error('Failed to pause task:', error);
    alert('Failed to pause task. Please try again.');
  }
};

const handleResumeTask = async () => {
  try {
    taskData.isPaused = false;
    resumeTimer();
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const taskIndex = tasks.findIndex(t => t.id === taskData.id);
    if (taskIndex !== -1) {
      tasks[taskIndex] = {
        ...tasks[taskIndex],
        isPaused: false,
        elapsedTime: elapsedTime.value,
        totalPausedTime: totalPausedTime.value
      };
      localStorage.setItem('tasks', JSON.stringify(tasks));
      console.log('Resumed task in localStorage:', tasks[taskIndex]);
    }
  } catch (error) {
    console.error('Failed to resume task:', error);
    alert('Failed to resume task. Please try again.');
  }
};

const handleEndTask = async () => {
  try {
    if (!confirm('Are you sure you want to end this task?')) {
      return;
    }
    stopTimer();
    taskData.status = 'completed';
    taskData.completedAt = new Date().toISOString();
    taskData.totalTime = elapsedTime.value;
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const taskIndex = tasks.findIndex(t => t.id === taskData.id);
    if (taskIndex !== -1) {
      tasks[taskIndex] = {
        ...tasks[taskIndex],
        status: 'completed',
        completedAt: taskData.completedAt,
        totalTime: taskData.totalTime,
        elapsedTimeFormatted: formattedElapsedTime.value
      };
      localStorage.setItem('tasks', JSON.stringify(tasks));
      console.log('Ended task in localStorage:', tasks[taskIndex]);
    }
    router.push('/tasks/completed');
  } catch (error) {
    console.error('Failed to end task:', error);
    alert('Failed to end task. Please try again.');
  }
};

const startTimer = () => {
  if (timerInterval.value) return;
  startTime.value = startTime.value || Date.now();
  timerInterval.value = setInterval(() => {
    if (taskData.isPaused) return;
    const now = Date.now();
    elapsedTime.value = now - startTime.value - totalPausedTime.value;
  }, 1000);
};

const pauseTimer = () => {
  if (timerInterval.value) {
    clearInterval(timerInterval.value);
    timerInterval.value = null;
    pausedTime.value = Date.now();
  }
};

const resumeTimer = () => {
  if (pausedTime.value) {
    totalPausedTime.value += Date.now() - pausedTime.value;
    pausedTime.value = null;
  }
  startTimer();
};

const stopTimer = () => {
  if (timerInterval.value) {
    clearInterval(timerInterval.value);
    timerInterval.value = null;
  }
  taskData.totalTime = elapsedTime.value;
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });
};

const handleStartTask = async () => {
  try {
    if (!isTaskComplete()) {
      router.push(`/tasks/${taskData.id}/edit`);
      return;
    }
    taskData.status = 'in_progress';
    taskData.isPaused = false;
    taskData.startedAt = new Date().toISOString();
    startTime.value = Date.now();
    startTimer();
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const taskIndex = tasks.findIndex(t => t.id === taskData.id);
    if (taskIndex !== -1) {
      tasks[taskIndex] = {
        ...tasks[taskIndex],
        status: 'in_progress',
        isPaused: false,
        startedAt: taskData.startedAt
      };
      localStorage.setItem('tasks', JSON.stringify(tasks));
      console.log('Started task in localStorage:', tasks[taskIndex]);
    }
  } catch (error) {
    console.error('Failed to start task:', error);
    alert('Failed to start task. Please try again.');
  }
};

const isTaskComplete = () => {
  return (
    taskData.name &&
    taskData.description?.length > 0 &&
    taskData.agentDetails?.length > 0 &&
    taskData.clientDetails?.length > 0
  );
};

onMounted(async () => {
  try {
    const hasAccess = await checkAccess(['agent', 'admin']);
    if (!hasAccess) {
      router.push('/unauthorized');
      return;
    }

    const taskId = parseInt(route.params.id);
    console.log('Task ID from route:', taskId);

    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    console.log('All tasks in localStorage:', tasks);
    const task = tasks.find(t => t.id === taskId);

    if (!task) {
      alert('Task not found');
      router.push('/tasks');
      return;
    }

    console.log('Loading task with status:', task.status);
    Object.assign(taskData, {
      ...task,
      description: task.description || [],
      agentDetails: task.agentDetails || [],
      clientDetails: task.clientDetails || [],
      attachments: task.attachments || [],
      isPaused: task.isPaused || false
    });

    if (task.status === 'in_progress' && task.startedAt) {
      console.log('Initializing timer for in-progress task');
      startTime.value = new Date(task.startedAt).getTime();
      totalPausedTime.value = task.totalPausedTime || 0;
      if (!taskData.isPaused) startTimer();
    }

    console.log('Task data loaded:', {
      status: taskData.status,
      startedAt: taskData.startedAt,
      elapsedTime: elapsedTime.value
    });
  } catch (error) {
    console.error('Failed to load task:', error);
    alert('Failed to load task. Please try again.');
  }
});

onUnmounted(() => {
  if (timerInterval.value) {
    clearInterval(timerInterval.value);
  }
});
</script>

<style scoped>
.task-detail {
  margin: 0 auto;
  padding: 20px;
}

.task-detail__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 40px;
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 20px;
}

.task-detail__nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.task-detail__back {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #2563EB;
  background: none;
  border: none;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
}

.task-detail__back-arrow {
  width: 20px;
  height: 20px;
  vertical-align: middle;
}

.task-detail__subtitle {
  color: #666666;
  font-size: 14px;
}

.task-detail__profile {
  display: flex;
  align-items: center;
  gap: 16px;
}

.task-detail__icon-btn {
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  color: #666666;
  transition: color 0.2s;
}

.task-detail__icon-btn:hover {
  color: #2563EB;
}

.task-detail__icon {
  width: 20px;
  height: 20px;
}

.task-detail__user {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.task-detail__avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.task-detail__username {
  color: #666666;
  font-size: 14px;
}

.task-detail__dropdown-icon {
  width: 16px;
  height: 16px;
  color: #666666;
}

.task-detail__content {
  background: #FFFFFF;
  padding: 45px 70px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  max-width: 980px;
  margin: 0 auto;
  box-sizing: border-box;
}

.task-detail__task-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
  width: 100%;
}

.task-detail__header-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.task-detail__title-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

.task-detail__title {
  font-size: 24px;
  font-weight: 600;
  color: #2563EB;
  margin: 0;
}

.task-detail__status {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background: #E6F4EA;
  color: #137333;
}

.task-detail__status--in_progress {
  background: #E6F4EA;
  color: #137333;
}

.task-detail__status--draft {
  background: #F1F3F4;
  color: #5F6368;
}

.task-detail__status--paused {
  background: #FEF7E0;
  color: #B95000;
}

.task-detail__status--completed {
  background: #E8F0FE;
  color: #1A73E8;
}

.task-detail__date {
  color: #666666;
  font-size: 14px;
}

.task-detail__header-actions {
  display: flex;
  gap: 12px;
  margin-left: auto;
}

.task-detail__header-btn {
  padding: 8px 24px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  color: #FFFFFF;
}

.task-detail__header-btn--pause {
  background: #FF6B00;
}

.task-detail__header-btn--resume {
  background: #2563EB;
}

.task-detail__header-btn--end {
  background: #FF0000;
}

.task-detail__header-btn--start {
  background: #137333;
}

.task-detail__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
}

.task-detail__section {
  background: #FFFFFF;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 24px;
}

.task-detail__section--agents,
.task-detail__section--clients {
  background: #E6F0FF;
}

.task-detail__section--description {
  background: #F5F5F5;
}

.task-detail__section-title {
  font-size: 18px;
  font-weight: 600;
  color: #666666;
  margin: 0 0 12px;
}

.task-detail__section-subtitle {
  color: #999999;
  font-size: 14px;
  margin: 0 0 16px;
}

.task-detail__add-btn {
  background: #2563EB;
  color: #FFFFFF;
  border: none;
  border-radius: 6px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 20px;
  transition: background-color 0.2s;
}

.task-detail__add-btn:hover {
  background: #1D4ED8;
}

.task-detail__agent-list,
.task-detail__client-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.task-detail__agent-card,
.task-detail__client-card {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #FFFFFF;
  padding: 12px;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.task-detail__agent-avatar,
.task-detail__client-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.task-detail__agent-info,
.task-detail__client-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.task-detail__agent-name,
.task-detail__client-name {
  font-size: 14px;
  font-weight: 500;
  color: #111827;
}

.task-detail__agent-email,
.task-detail__client-email {
  font-size: 12px;
  color: #666666;
}

.task-detail__reminder-btn {
  background: #E6F0FF;
  color: #007BFF;
  border: none;
  border-radius: 8px;
  padding: 15px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s;
}

.task-detail__reminder-btn:hover {
  opacity: 0.8;
}

.task-detail__description-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.task-detail__priority {
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
}

.task-detail__priority--medium {
  background: #FFC107;
  color: #FFFFFF;
}

.task-detail__description-list {
  list-style-type: disc;
  margin: 0;
  padding-left: 20px;
  color: #374151;
  font-size: 14px;
  line-height: 1.5;
}

.task-detail__description-list li {
  margin-bottom: 8px;
}

.task-detail__timeline {
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-top: 1px solid #E6E6E6;
  padding-top: 16px;
}

.task-detail__timeline-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.task-detail__timeline-label {
  color: #666666;
  font-size: 14px;
  font-weight: 500;
}

.task-detail__timeline-time {
  color: #111827;
  font-size: 14px;
}

.task-detail__attachment {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border: 1px solid #E6E6E6;
  border-radius: 6px;
  margin-top: 16px;
}

.task-detail__attachment-icon {
  width: 24px;
  height: 24px;
  color: #666666;
}

.task-detail__attachment-name {
  flex: 1;
  font-size: 14px;
  color: #666666;
}

.task-detail__attachment-type {
  font-size: 12px;
  color: #6B7280;
  padding: 2px 6px;
  background: #E5E7EB;
  border-radius: 4px;
  margin-left: auto;
}

.task-detail__no-attachments {
  color: #666666;
  font-size: 14px;
  text-align: center;
  padding: 16px;
  background: #F3F4F6;
  border-radius: 6px;
  margin-top: 8px;
}

.task-detail__attachments-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.task-detail__timer {
  text-align: center;
  margin: 20px 0 32px;
  padding: 16px;
  background: #F3F4F6;
  border-radius: 8px;
  border: 1px solid #E5E7EB;
}

.task-detail__timer--paused {
  background: #FEF7E0;
  border-color: #FDE68A;
}

.task-detail__timer-label {
  font-size: 14px;
  color: #666666;
  margin-bottom: 8px;
}

.task-detail__timer-display {
  font-size: 32px;
  font-weight: 600;
  color: #2563EB;
  font-family: monospace;
}

.task-detail__timer--paused .task-detail__timer-display {
  color: #B95000;
}

@media (max-width: 1200px) {
  .task-detail__content {
    margin: 0 20px;
    padding: 30px;
  }
}

@media (max-width: 1023px) {
  .task-detail__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 767px) {
  .task-detail {
    padding: 16px;
  }
  .task-detail__header {
    padding: 0 16px;
    flex-direction: column;
    gap: 16px;
  }
  .task-detail__profile {
    width: 100%;
    justify-content: flex-end;
  }
  .task-detail__content {
    padding: 20px;
    margin: 0 16px;
  }
  .task-detail__header-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  .task-detail__header-actions {
    width: 100%;
    justify-content: flex-end;
  }
  .task-detail__header-btn {
    flex: 1;
  }
  .task-detail__timer {
    margin: 16px 0 24px;
  }
}
</style>
