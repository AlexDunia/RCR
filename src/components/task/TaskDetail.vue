<template>
  <!-- Header Section -->
  <header class="task-detail__header">
    <div class="taskdetailflex">
      <div class="task-detail__header-left">
        <h1 class="task-detail__title">{{ taskData.name }}</h1>
        <div class="task-detail__status-group">
          <div class="task-detail__date">Scheduled: <span class="task-detail__color">{{ taskData.startDate }}</span></div>
        </div>
      </div>
      <div class="taskstatusdiv">
        <span class="task-detail__status" :class="'task-detail__status--' + taskData.status.toLowerCase()">{{ taskData.status }}</span>
      </div>
    </div>
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
    <div class="task-detail__header-actions">
      <template v-if="taskData.status === 'in_progress'">
        <button
          v-if="!taskData.isPaused"
          class="task-detail__action-btn task-detail__action-btn--pause"
          @click="showConfirmation('pause')"
          aria-label="Pause task"
        >
          Pause task
        </button>
        <button
          v-else
          class="task-detail__action-btn task-detail__action-btn--resume"
          @click="showConfirmation('resume')"
          aria-label="Resume task"
        >
          Resume task
        </button>
        <button
          class="task-detail__action-btn task-detail__action-btn--end"
          @click="showConfirmation('end')"
          aria-label="End task"
        >
          End task
        </button>
      </template>
      <template v-else-if="taskData.status === 'draft'">
        <button
          class="task-detail__action-btn task-detail__action-btn--start"
          @click="handleStartTask"
          aria-label="Start task"
        >
          Start task
        </button>
      </template>
    </div>
  </header>

  <main class="task-detail" role="main" aria-label="Task management details">
    <div class="task-detail__grid">
      <!-- Left Column: Agents and Clients -->
      <div class="task-detail__left-column">
        <!-- Agents Section -->
        <section class="task-detail__section" aria-label="Agents involved in this task">
          <div class="addflexbox">
            <div class="agentinvolved">
              <h2 class="task-detail__section-title">Agents involved in this task</h2>
              <p class="task-detail__section-subtitle">Add agents from your contacts</p>
            </div>
            <div class="addbutton">
              <button class="task-detail__add-btn" @click="openAgentModal" aria-label="Add agent">+ Add agent</button>
            </div>
          </div>
          <div class="task-detail__agent-list">
            <div v-for="agent in taskData.agentDetails" :key="agent.id" class="task-detail__agent-card" role="listitem">
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
        <section class="task-detail__section" aria-label="Clients involved in this task">
          <div class="addflexbox">
            <div class="agentinvolved">
              <h2 class="task-detail__section-title">Clients involved in this task</h2>
              <p class="task-detail__section-subtitle">Add clients from your contacts</p>
            </div>
            <div class="addbutton">
              <button class="task-detail__add-btn" @click="openClientModal" aria-label="Add client">+ Add client</button>
            </div>
          </div>
          <div class="task-detail__agent-list">
            <div v-for="client in taskData.clientDetails" :key="client.id" class="task-detail__agent-card" role="listitem">
              <img :src="client.avatar" :alt="client.name" class="task-detail__agent-avatar" @error="handleAvatarError">
              <div class="task-detail__agent-info">
                <span class="task-detail__agent-name">{{ client.name }}</span>
                <span class="task-detail__agent-email">{{ client.email }}</span>
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

      <!-- Right Column: Task Description -->
      <div class="task-desc__right-column">
        <div class="task-detail__column description">
          <!-- Task Description Section -->
          <section aria-label="Task description">
            <div class="task-detail__description-header taskdetails">
              <h2 class="task-detail__section-title">Task description</h2>
              <span :class="['task-detail__priority', `task-detail__priority--${taskData.priority.toLowerCase()}`]">{{ taskData.priority }}</span>
            </div>
            <ul class="task-detail__description-list">
              <p v-for="(item, index) in taskData.description" :key="index">{{ item }}</p>
            </ul>
          </section>

          <!-- Task Timeline -->
          <section class="task-detail__section task-detail__section--timeline" aria-label="Task timeline">
            <div class="task-detail__timeline">
              <div class="task-detail__timeline-item">
                <span class="task-detail__timeline-label">Started</span>
                <div class="task-detail__timeline-checkbox">
                  <svg class="task-detail__checkbox-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#999999" stroke-width="1.5">
                    <rect x="2" y="2" width="20" height="20" rx="4" stroke-dasharray="2 2" />
                  </svg>
                  <span class="task-detail__timeline-time">{{ formatDate(taskData.startedAt) }}</span>
                </div>
              </div>
              <div class="task-detail__timeline-item">
                <span class="task-detail__timeline-label">Due date</span>
                <div class="task-detail__timeline-checkbox">
                  <svg class="task-detail__checkbox-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#999999" stroke-width="1.5">
                    <rect x="2" y="2" width="20" height="20" rx="4" stroke-dasharray="2 2" />
                  </svg>
                  <span class="task-detail__timeline-time">{{ formatDate(taskData.endDate) }}</span>
                </div>
              </div>
            </div>
          </section>

          <!-- Attachments -->
          <section class="task-detail__section task-detail__section--attachments" aria-label="Task attachments">
            <h2 class="task-detail__section-title">Attachments</h2>
            <div v-if="taskData.attachments && taskData.attachments.length > 0" class="task-detail__attachments-list">
              <div class="task-detail__attachment" v-for="attachment in taskData.attachments" :key="attachment.id" role="listitem">
                <svg class="task-detail__attachment-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#999999">
                  <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd" />
                </svg>
                <span class="task-detail__attachment-name">{{ attachment.name }}</span>
                <div class="task-detail__attachment-actions">
                  <svg class="task-detail__action-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#999999">
                    <path fill-rule="evenodd" d="M13.586 3.586a2 2 0 112.828 2.828L10.828 10l5.586 5.586a2 2 0 11-2.828 2.828L8 12.828l-5.586 5.586a2 2 0 11-2.828-2.828L5.172 10 0.586 4.414a2 2 0 112.828-2.828L8 7.172l5.586-5.586z" clip-rule="evenodd" />
                  </svg>
                  <svg class="task-detail__action-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#999999">
                    <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
                  </svg>
                  <svg class="task-detail__action-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#999999">
                    <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 111.414 1.414L7.414 5H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 11-1.414 1.414l-3-3z" clip-rule="evenodd" />
                  </svg>
                </div>
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
      @select="handleReminderSend"
    />

    <!-- Confirmation Pop-up -->
    <div v-if="isConfirmationVisible" class="confirmation-overlay">
      <div class="confirmation-card">
        <h2 class="confirmation-title">{{ confirmationMessage }}</h2>
        <p class="confirmation-text">Do you wish to {{ confirmationAction }} this task?</p>
        <div class="confirmation-actions">
          <button class="confirmation-btn confirmation-btn--no" @click="closeConfirmation">No</button>
          <button class="confirmation-btn confirmation-btn--yes" @click="confirmAction">Yes</button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, computed, watch } from 'vue';
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

// Confirmation pop-up state
const isConfirmationVisible = ref(false);
const confirmationAction = ref('');
const confirmationMessage = ref('');

// Task data with reactive state
const taskData = reactive({
  id: null,
  name: '',
  status: 'draft',
  startDate: '',
  startTime: '',
  endDate: '',
  endTime: 'Fri, 16 May 02:00-3:00pm',
  priority: 'Medium',
  description: [],
  agentDetails: [],
  clientDetails: [],
  attachments: [],
  createdAt: '',
  updatedAt: '',
  startedAt: '',
  lastEditedAt: '',
  isPaused: false,
  totalTime: 0
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
      localStorage.setItem(`task_${taskData.id}_elapsedTime`, elapsedTime.value);
      localStorage.setItem(`task_${taskData.id}_totalPausedTime`, totalPausedTime.value);
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
      localStorage.removeItem(`task_${taskData.id}_elapsedTime`);
      localStorage.removeItem(`task_${taskData.id}_totalPausedTime`);
      console.log('Resumed task in localStorage:', tasks[taskIndex]);
    }
  } catch (error) {
    console.error('Failed to resume task:', error);
    alert('Failed to resume task. Please try again.');
  }
};

const handleEndTask = async () => {
  try {
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
      localStorage.removeItem(`task_${taskData.id}_elapsedTime`);
      localStorage.removeItem(`task_${taskData.id}_totalPausedTime`);
      console.log('Ended task in localStorage:', tasks[taskIndex]);
    }
    router.push('/tasks/completed');
  } catch (error) {
    console.error('Failed to end task:', error);
    alert('Failed to end task. Please try again.');
  }
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

const startTimer = () => {
  if (timerInterval.value) return;
  startTime.value = startTime.value || Date.now();
  timerInterval.value = setInterval(() => {
    if (taskData.isPaused) return;
    const now = Date.now();
    elapsedTime.value = now - startTime.value - totalPausedTime.value;
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const taskIndex = tasks.findIndex(t => t.id === taskData.id);
    if (taskIndex !== -1) {
      tasks[taskIndex].elapsedTime = elapsedTime.value;
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
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

const isTaskComplete = () => {
  return (
    taskData.name &&
    taskData.description?.length > 0 &&
    taskData.agentDetails?.length > 0 &&
    taskData.clientDetails?.length > 0
  );
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

const showConfirmation = (action) => {
  confirmationAction.value = action;
  confirmationMessage.value = `${action.charAt(0).toUpperCase() + action.slice(1)} Task?`;
  isConfirmationVisible.value = true;
};

const closeConfirmation = () => {
  isConfirmationVisible.value = false;
  confirmationAction.value = '';
  confirmationMessage.value = '';
};

const confirmAction = async () => {
  switch (confirmationAction.value) {
    case 'pause':
      await handlePauseTask();
      break;
    case 'resume':
      await handleResumeTask();
      break;
    case 'end':
      await handleEndTask();
      router.push('/tasks');
      break;
    default:
      break;
  }
  closeConfirmation();
};

watch(() => route.params.id, () => {
  loadTaskData();
});

const loadTaskData = async () => {
  try {
    const taskId = parseInt(route.params.id);
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const task = tasks.find(t => t.id === taskId);

    if (!task) {
      alert('Task not found');
      router.push('/tasks');
      return;
    }

    Object.assign(taskData, {
      ...task,
      description: task.description || [],
      agentDetails: task.agentDetails || [],
      clientDetails: task.clientDetails || [],
      attachments: task.attachments || [],
      isPaused: task.isPaused || false,
      priority: task.priority || 'Medium'
    });

    // Load persisted timer values
    const savedElapsedTime = localStorage.getItem(`task_${taskId}_elapsedTime`);
    const savedTotalPausedTime = localStorage.getItem(`task_${taskId}_totalPausedTime`);
    if (savedElapsedTime && savedTotalPausedTime) {
      elapsedTime.value = parseInt(savedElapsedTime, 10);
      totalPausedTime.value = parseInt(savedTotalPausedTime, 10);
    } else if (task.elapsedTime) {
      elapsedTime.value = task.elapsedTime;
    }

    if (task.status === 'in_progress' && task.startedAt) {
      startTime.value = new Date(task.startedAt).getTime();
      if (!taskData.isPaused) startTimer();
    }
  } catch (error) {
    console.error('Failed to load task:', error);
    alert('Failed to load task. Please try again.');
  }
};

onMounted(async () => {
  try {
    const hasAccess = await checkAccess(['agent', 'admin']);
    if (!hasAccess) {
      router.push('/unauthorized');
      return;
    }
    loadTaskData();
  } catch (error) {
    console.error('Failed to initialize task:', error);
    alert('Failed to initialize task. Please try again.');
  }
});

onUnmounted(() => {
  if (timerInterval.value) {
    clearInterval(timerInterval.value);
  }
});
</script>

<style scoped>
.task-detail__header {
  padding: 20px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.taskdetailflex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.task-detail__header-left {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
}

.task-detail__title {
  font-size: 20px;
  font-weight: 600;
  color: #666666;
  margin: 0;
}

.task-detail__status-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.task-detail__status {
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
}

.task-detail__status--in_progress {
  background: #EAF8F1;
  color: #008530;
  margin-left: 20px;
  font-size: 12px;
}

.task-detail__status--draft {
  background: #FFC107;
  color: #FFFFFF;
}

.task-detail__status--completed {
  background: #6C757D;
  color: #FFFFFF;
}

.task-detail__date {
  font-size: 14px;
  color: #666666;
}

.task-detail__date .task-detail__color {
  font-weight: 600;
}

.task-detail__color {
  font-size: 14px;
  color: #074F90;
}

.task-detail__timer {
  font-size: 16px;
  color: #111827;
  padding: 8px 16px;
  background: #e9ecef;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 20px;
}

.task-detail__timer--paused {
  background: #f8d7da;
}

.task-detail__timer-label {
  font-weight: 500;
  color: #495057;
}

.task-detail__timer-display {
  font-weight: 600;
}

.task-detail__header-actions {
  display: flex;
  gap: 12px;
}

.task-detail__action-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.task-detail__action-btn--pause,
.task-detail__action-btn--resume {
  background: #28A745;
  color: #FFFFFF;
}

.task-detail__action-btn--end {
  background: #DC3545;
  color: #FFFFFF;
}

.task-detail__action-btn--start {
  background: #28A745;
  color: #FFFFFF;
}

.task-detail__action-btn:hover {
  opacity: 0.8;
}

.task-detail {
  margin: 0 auto;
  box-sizing: border-box;
}

.task-detail__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
}

.task-detail__left-column {
  background-color: #E6F0FF;
  border-radius: 8px;
  padding: 50px 90px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.task-detail__section {
  background: #ffffff;
  border-radius: 8px;
  padding: 35px;
  border: 1px solid #E6E6E6;
}

.taskdetails {
  background: #ffffff;
  border-radius: 8px;
  padding: 15px 20px;
  border: 1px solid #E6E6E6;
}

.addflexbox {
  display: flex;
  margin: auto;
  align-items: center;
  margin-bottom: 8px;
  justify-content: space-between;
}

.task-desc__right-column {
  background-color: white;
  border-radius: 8px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.task-detail__column.description {
  border: 1px solid #E6E6E6;
  border-radius: 8px;
  padding: 35px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.task-detail__section-title {
  font-size: 14px;
  font-weight: 600;
  color: rgba(52, 51, 51, 0.8);
  padding: 0;
}

.task-detail__section-subtitle {
  color: #868585;
  font-weight: 400;
  font-size: 13px;
  margin-top: -10px;
}

.task-detail__add-btn {
  background: #007BFF;
  color: #FFFFFF;
  border: none;
  border-radius: 6px;
  padding: 7px 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 20px;
  transition: opacity 0.2s ease;
}

.task-detail__add-btn:hover {
  opacity: 0.8;
}

.task-detail__agent-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.task-detail__agent-card {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 5px;
  padding: 12px;
  border-radius: 6px;
  border: 1px solid rgba(7, 79, 144, 0.35);
  transition: box-shadow 0.2s ease;
}

.task-detail__agent-card:hover {
  border: 1px solid rgba(7, 79, 144, 0.6);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.task-detail__agent-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.task-detail__agent-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.task-detail__agent-name {
  font-size: 14px;
  font-weight: 500;
  color: #111827;
}

.task-detail__agent-email {
  font-size: 12px;
  color: #666666;
}

.task-detail__reminder-btn {
  background: #EAE8E8;
  color: rgb(20, 20, 20);
  border: none;
  border-radius: 8px;
  padding: 8px;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.task-detail__reminder-btn:hover {
  background: #007BFF;
  color: white;
}

.task-detail__description-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.task-detail__priority {
  color: #FFFFFF;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
}

.task-detail__priority--low {
  background: #28A745;
}

.task-detail__priority--medium {
  background: #FFC107;
}

.task-detail__priority--high {
  background: #DC3545;
}

.task-detail__description-list {
  list-style-type: none;
  margin: 0;
  padding-left: 0;
  color: #374151;
  font-size: 16px;
  line-height: 1.5;
}

.task-detail__description-list p {
  margin-bottom: 8px;
}

.task-detail__timeline {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.task-detail__timeline-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
}

.task-detail__timeline-label {
  color: #666666;
  font-size: 14px;
  font-weight: 500;
}

.task-detail__timeline-checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
}

.task-detail__checkbox-icon {
  width: 20px;
  height: 20px;
}

.task-detail__timeline-time {
  color: #111827;
  font-size: 14px;
}

.task-detail__attachments-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.task-detail__attachment {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  border-top: 1px solid #E6E6E6;
}

.task-detail__attachment-icon {
  width: 20px;
  height: 20px;
  fill: #999999;
}

.task-detail__attachment-name {
  flex: 1;
  font-size: 14px;
  color: #666666;
}

.task-detail__attachment-actions {
  display: flex;
  gap: 8px;
}

.task-detail__action-icon {
  width: 20px;
  height: 20px;
  fill: #999999;
  cursor: pointer;
  transition: fill 0.2s ease;
}

.task-detail__action-icon:hover {
  fill: #007BFF;
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

/* Confirmation Pop-up Styles */
.confirmation-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.confirmation-card {
  background: #ffffff;
  padding: 20px 40px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 400px; /* Wider as per image */
  animation: fadeIn 0.3s ease-in-out;
  border: 1px solid #e6e6e6;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.confirmation-title {
  font-size: 24px;
  font-weight: 600;
  color: #4a4a4a; /* Dark gray as in image */
  margin: 0 0 15px; /* Increased spacing */
}

.confirmation-text {
  font-size: 16px;
  color: #757575; /* Lighter gray as in image */
  margin-bottom: 25px; /* Increased spacing */
  line-height: 1.5;
}

.confirmation-actions {
  display: flex;
  justify-content: center;
  gap: 20px; /* More spaced buttons */
}

.confirmation-btn {
  padding: 10px 25px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: transform 0.2s ease, background-color 0.2s ease;
}

.confirmation-btn--no {
  background: #ffffff;
  color: #333333;
  border: 1px solid #d3d3d3;
  width: 70px; /* Match image button width */
}

.confirmation-btn--yes {
  background: #dc3545;
  color: #ffffff;
  width: 70px; /* Match image button width */
}

.confirmation-btn:hover {
  transform: scale(1.05);
}

.confirmation-btn--no:hover {
  background: #f8f9fa;
}

@media (max-width: 767px) {
  .task-detail__header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  .task-detail__header-left {
    align-items: flex-start;
  }
  .task-detail__timer {
    margin: 10px 0;
  }
  .task-detail__header-actions {
    flex-direction: column;
    gap: 8px;
  }
  .task-detail {
    padding: 10px;
  }
  .task-detail__grid {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 10px;
  }
  .task-detail__action-btn {
    width: 100%;
    text-align: center;
  }
  .confirmation-card {
    width: 90%; /* Adjust width for smaller screens */
    padding: 15px 20px;
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .task-detail__grid {
    gap: 24px;
  }
}

@media (min-width: 1024px) {
  .task-detail__grid {
    gap: 32px;
  }
}
</style>