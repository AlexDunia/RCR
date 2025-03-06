<template>
  <!-- Header Section -->
  <header class="task-detail__headerbg">
    <div class="task-detail__header">
      <div class="task-detail__flex-container">
        <div class="task-detail__header-left">
          <h1 class="task-detail__title" @mouseover="showTitleTooltip" @mouseleave="hideTitleTooltip" @mousemove="updateTitleTooltipPosition($event)">{{ taskData.name }}</h1>
          <div v-if="isTitleTooltipVisible" class="task-detail__title-tooltip" :style="{ left: titleTooltipX + 'px', top: titleTooltipY + 'px' }">
            {{ taskData.name }}
          </div>
          <div class="task-detail__status-group">
            <div class="task-detail__date">Scheduled: <span class="task-detail__color">{{ taskData.startDate }}</span></div>
          </div>
        </div>
        <div class="task-detail__status-container">
          <span class="task-detail__status" :class="'task-detail__status--' + taskData.status.toLowerCase()">
            {{ taskData.status }}
          </span>
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
            @click="showTaskConfirmation('pause')"
            aria-label="Pause task"
          >
            Pause task
          </button>
          <button
            v-else
            class="task-detail__action-btn task-detail__action-btn--resume"
            @click="showTaskConfirmation('resume')"
            aria-label="Resume task"
          >
            Resume task
          </button>
          <button
            class="task-detail__action-btn task-detail__action-btn--end"
            @click="showTaskConfirmation('end')"
            aria-label="End task"
          >
            End task
          </button>
          <button
            :class="['task-detail__action-btn', 'task-detail__action-btn--save', { 'task-detail__action-btn--active': isSaveActive }]"
            @click="showTaskConfirmation('save')"
            :aria-label="isSaveActive ? 'Save changes' : 'No changes to save'"
            :disabled="!isSaveActive"
          >
            Save
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
    </div>
  </header>

  <main class="task-detail" role="main" aria-label="Task management details">
    <div class="task-detail__grid">
      <!-- Left Column: Agents and Clients -->
      <div class="task-detail__left-column">
        <!-- Agents Section -->
        <section class="task-detail__section" aria-label="Agents involved in this task">
          <div class="task-detail__add-flex">
            <div class="task-detail__agent-info-header">
              <h2 class="task-detail__section-title">Agents involved in this task</h2>
              <p class="task-detail__section-subtitle">Add agents from your contacts</p>
            </div>
            <div class="task-detail__add-button-container">
              <button class="task-detail__add-btn" @click="openAgentModal" aria-label="Add agent">+ Add agent</button>
            </div>
          </div>
          <div class="task-detail__agent-list">
            <div
              v-for="agent in taskData.agentDetails"
              :key="agent.id"
              class="task-detail__agent-card"
              role="listitem"
              @mouseover="showAgentAnimation(agent.id)"
              @mouseleave="hideAgentAnimation(agent.id)"
            >
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
              <button
                class="task-detail__delete-btn"
                @click="showAgentDeleteConfirmation(agent)"
                :aria-label="'Delete ' + agent.name"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F87171" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
              </button>
            </div>
          </div>
        </section>

        <!-- Clients Section -->
        <section class="task-detail__section" aria-label="Clients involved in this task">
          <div class="task-detail__add-flex">
            <div class="task-detail__agent-info-header">
              <h2 class="task-detail__section-title">Clients involved in this task</h2>
              <p class="task-detail__section-subtitle">Add clients from your contacts</p>
            </div>
            <div class="task-detail__add-button-container">
              <button class="task-detail__add-btn" @click="openClientModal" aria-label="Add client">+ Add client</button>
            </div>
          </div>
          <div class="task-detail__agent-list">
            <div
              v-for="client in taskData.clientDetails"
              :key="client.id"
              class="task-detail__agent-card"
              role="listitem"
              @mouseover="showClientAnimation(client.id)"
              @mouseleave="hideClientAnimation(client.id)"
            >
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
              <button
                class="task-detail__delete-btn"
                @click="showClientDeleteConfirmation(client)"
                :aria-label="'Delete ' + client.name"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F87171" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
              </button>
            </div>
          </div>
        </section>
      </div>

      <!-- Right Column: Task Description -->
      <div class="task-detail__right-column">
        <div class="task-detail__column description">
          <!-- Task Description Section -->
          <section aria-label="Task description">
            <div class="task-detail__description-header taskdetails">
              <h2 class="task-detail__section-title">Task description</h2>
              <span :class="['task-detail__priority', `task-detail__priority--${taskData.priority.toLowerCase()}`]">
                {{ taskData.priority }}
              </span>
            </div>
            <ul class="task-detail__description-list">
              <li v-for="(item, index) in taskData.description" :key="index" class="task-detail__description-item">
                {{ item }}
              </li>
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
              <div v-for="attachment in taskData.attachments" :key="attachment.id" class="task-detail__attachment" role="listitem">
                <svg class="task-detail__attachment-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A1A1A1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                <span class="task-detail__attachment-name">{{ attachment.name }}</span>
                <div class="task-detail__attachment-actions">
                  <!-- Edit Icon (Purple Pencil) -->
                  <svg
                    @click="showAttachmentConfirmation('edit', attachment)"
                    class="task-detail__action-icon task-detail__action-icon--edit"
                    @mouseover="updateMousePosition($event, 'attachment'); showAttachmentTooltip('edit', attachment.name)"
                    @mouseleave="hideAttachmentTooltip"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#A78BFA"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                  <div v-if="isAttachmentTooltipVisible && attachmentTooltipAction === 'edit'" class="task-detail__attachment-tooltip" :style="{ left: attachmentTooltipX + 'px', top: attachmentTooltipY + 'px' }">
                    Edit {{ attachmentTooltipName }}
                  </div>
                  <!-- Delete Icon (Red Trash Bin) -->
                  <svg
                    @click="showAttachmentConfirmation('delete', attachment)"
                    class="task-detail__action-icon task-detail__action-icon--delete"
                    @mouseover="updateMousePosition($event, 'attachment'); showAttachmentTooltip('delete', attachment.name)"
                    @mouseleave="hideAttachmentTooltip"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#F87171"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                  </svg>
                  <div v-if="isAttachmentTooltipVisible && attachmentTooltipAction === 'delete'" class="task-detail__attachment-tooltip" :style="{ left: attachmentTooltipX + 'px', top: attachmentTooltipY + 'px' }">
                    Delete {{ attachmentTooltipName }}
                  </div>
                  <!-- View Icon (Blue Eye) -->
                  <svg
                    @click="navigateToViewAttachment(attachment)"
                    class="task-detail__action-icon task-detail__action-icon--view"
                    @mouseover="updateMousePosition($event, 'attachment'); showAttachmentTooltip('view', attachment.name)"
                    @mouseleave="hideAttachmentTooltip"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#60A5FA"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  <div v-if="isAttachmentTooltipVisible && attachmentTooltipAction === 'view'" class="task-detail__attachment-tooltip" :style="{ left: attachmentTooltipX + 'px', top: attachmentTooltipY + 'px' }">
                    View {{ attachmentTooltipName }}
                  </div>
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
      @select="updateAgentSelection"
    />
    <ClientModal
      :is-open="isClientModalOpen"
      :initial-selected-clients="taskData.clientDetails"
      @close="closeClientModal"
      @select="updateClientSelection"
    />
    <ReminderModal
      :is-open="isReminderModalOpen"
      :recipient="selectedRecipient"
      :task-data="taskData"
      @close="closeReminderModal"
      @select="sendReminder"
    />

    <!-- Task Confirmation Pop-up -->
    <div v-if="isTaskConfirmationVisible" class="confirmation-overlay">
      <div class="confirmation-card">
        <h2 class="confirmation-title">{{ taskConfirmationMessage }}</h2>
        <p class="confirmation-text">Do you wish to {{ taskAction }} this task?</p>
        <div class="confirmation-actions">
          <button class="confirmation-btn confirmation-btn--no" @click="closeTaskConfirmation">No</button>
          <button class="confirmation-btn confirmation-btn--yes" @click="confirmTaskAction">Yes</button>
        </div>
      </div>
    </div>

    <!-- Attachment Action Confirmation Pop-up -->
    <div v-if="isAttachmentConfirmationVisible" class="confirmation-overlay">
      <div class="confirmation-card">
        <h2 class="confirmation-title">{{ attachmentConfirmationMessage }}</h2>
        <p v-if="attachmentAction === 'delete'" class="confirmation-text">
          Do you wish to {{ attachmentAction }} this file? This action is permanent and cannot be reversed by Real City. However, you can re-add it if you have it locally.
        </p>
        <p v-else class="confirmation-text">Do you wish to {{ attachmentAction }} this file?</p>
        <div v-if="attachmentAction === 'edit' && showFileInput" class="file-input-container">
          <input
            type="file"
            ref="fileInputRef"
            @change="handleFileUpload"
            class="task-detail__file-input"
            accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png"
          />
        </div>
        <div class="confirmation-actions">
          <button class="confirmation-btn confirmation-btn--no" @click="closeAttachmentConfirmation">No</button>
          <button class="confirmation-btn confirmation-btn--yes" @click="confirmAttachmentAction">Yes</button>
        </div>
      </div>
    </div>

    <!-- Agent/Client Delete Confirmation Pop-up -->
    <div v-if="isAgentDeleteVisible || isClientDeleteVisible" class="confirmation-overlay">
      <div class="confirmation-card">
        <h2 class="confirmation-title">Confirm Deletion</h2>
        <p class="confirmation-text">Do you wish to delete {{ selectedPerson?.name }} from docs?</p>
        <div class="confirmation-actions">
          <button class="confirmation-btn confirmation-btn--no" @click="closePersonDeleteConfirmation">No</button>
          <button class="confirmation-btn confirmation-btn--yes" @click="confirmPersonDeletion">Yes</button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useRoleGuard } from '@/composables/useRoleGuard';
import AgentModal from './AgentModal.vue';
import ClientModal from './ClientModal.vue';
import ReminderModal from './ReminderModal.vue';

// Router and Route Setup
const router = useRouter();
const route = useRoute();
const { checkAccess } = useRoleGuard();

// Modal, Tooltip, and Animation State Management
const isAgentModalOpen = ref(false);
const isClientModalOpen = ref(false);
const isReminderModalOpen = ref(false);
const selectedRecipient = ref(null);
const isTitleTooltipVisible = ref(false);
const titleTooltipX = ref(0);
const titleTooltipY = ref(0);
const isAttachmentTooltipVisible = ref(false);
const attachmentTooltipAction = ref('');
const attachmentTooltipName = ref('');
const attachmentTooltipX = ref(0);
const attachmentTooltipY = ref(0);
const animatedCards = ref(new Set());

// Task Confirmation State
const isTaskConfirmationVisible = ref(false);
const taskAction = ref('');
const taskConfirmationMessage = ref('');
const isSaveActive = ref(false); // Tracks if save button should be active

// Attachment Confirmation State
const isAttachmentConfirmationVisible = ref(false);
const attachmentAction = ref('');
const attachmentConfirmationMessage = ref('');
const selectedAttachment = ref(null);
const showFileInput = ref(false);
const fileInputRef = ref(null);
const uploadedFile = ref(null);

// Agent/Client Delete Confirmation State
const isAgentDeleteVisible = ref(false);
const isClientDeleteVisible = ref(false);
const selectedPerson = ref(null);

// Task Data with Reactive State
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
  attachments: [
    { id: 1, name: 'Strategy-Pitch-Final.pptx', url: '/path/to/Strategy-Pitch-Final.pptx' }
  ],
  createdAt: '',
  updatedAt: '',
  startedAt: '',
  lastEditedAt: '',
  isPaused: false,
  totalTime: 0
});

// Timer State Management
const elapsedTime = ref(0);
const timerInterval = ref(null);
const startTime = ref(null);
const pausedTime = ref(null);
const totalPausedTime = ref(0);

// Computed Property for Formatted Time
const formattedElapsedTime = computed(() => {
  const totalSeconds = Math.floor(elapsedTime.value / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
});

// Helper Methods
const handleAvatarError = (event) => {
  event.target.src = '/default-avatar.jpg'; // Fallback image for broken avatars
};

const openAgentModal = () => {
  isAgentModalOpen.value = true;
};

const closeAgentModal = () => {
  isAgentModalOpen.value = false;
};

const updateAgentSelection = async (agents) => {
  try {
    taskData.agentDetails = agents;
    await persistTaskData({ agentDetails: agents });
    console.log('Agents updated successfully:', taskData.agentDetails);
    isSaveActive.value = true; // Activate save button on change
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

const updateClientSelection = async (clients) => {
  try {
    taskData.clientDetails = clients;
    await persistTaskData({ clientDetails: clients });
    console.log('Clients updated successfully:', taskData.clientDetails);
    alert('Clients updated successfully');
    isSaveActive.value = true; // Activate save button on change
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

const sendReminder = async (reminderData) => {
  try {
    alert(`Reminder sent to ${reminderData.recipient}`);
  } catch (error) {
    console.error('Failed to send reminder:', error);
    alert('Failed to send reminder. Please try again.');
  }
};

// Task Management Methods
const handlePauseTask = async () => {
  try {
    taskData.isPaused = true;
    pauseTimer();
    await persistTaskData({
      isPaused: true,
      pausedAt: new Date().toISOString(),
      elapsedTime: elapsedTime.value,
      totalPausedTime: totalPausedTime.value
    });
    console.log('Task paused successfully:', taskData);
  } catch (error) {
    console.error('Failed to pause task:', error);
    alert('Failed to pause task. Please try again.');
  }
};

const handleResumeTask = async () => {
  try {
    taskData.isPaused = false;
    resumeTimer();
    await persistTaskData({
      isPaused: false,
      elapsedTime: elapsedTime.value,
      totalPausedTime: totalPausedTime.value
    });
    console.log('Task resumed successfully:', taskData);
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
    await persistTaskData({
      status: 'completed',
      completedAt: taskData.completedAt,
      totalTime: taskData.totalTime,
      elapsedTimeFormatted: formattedElapsedTime.value
    });
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
    await persistTaskData({
      status: 'in_progress',
      isPaused: false,
      startedAt: taskData.startedAt
    });
    console.log('Task started successfully:', taskData);
  } catch (error) {
    console.error('Failed to start task:', error);
    alert('Failed to start task. Please try again.');
  }
};

const handleSaveTask = async () => {
  try {
    await persistTaskData({
      agentDetails: taskData.agentDetails,
      clientDetails: taskData.clientDetails,
      attachments: taskData.attachments,
      updatedAt: new Date().toISOString()
    });
    console.log('Task saved successfully:', taskData);
    router.push('/tasks'); // Route back to task home page
    isSaveActive.value = false; // Reset save button after save
  } catch (error) {
    console.error('Failed to save task:', error);
    alert('Failed to save task. Please try again.');
  }
};

// Timer Control Methods
const startTimer = () => {
  if (timerInterval.value) return;
  startTime.value = startTime.value || Date.now();
  timerInterval.value = setInterval(() => {
    if (taskData.isPaused || isDueDateReached()) {
      stopTimer();
      return;
    }
    const currentTime = Date.now();
    elapsedTime.value = currentTime - startTime.value - totalPausedTime.value;
    persistTimerState();
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
  persistTaskData({ totalTime: taskData.totalTime });
};

// Due Date Check
const isDueDateReached = () => {
  if (!taskData.endDate || !taskData.endTime) return false;
  const dueDateTime = new Date(`${taskData.endDate} ${taskData.endTime}`);
  return new Date() >= dueDateTime;
};

// Validation Method
const isTaskComplete = () => {
  return taskData.name && taskData.description.length > 0 && taskData.agentDetails.length > 0 && taskData.clientDetails.length > 0;
};

// Date Formatting
const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });
};

// Task Confirmation Methods
const showTaskConfirmation = (action) => {
  taskAction.value = action;
  taskConfirmationMessage.value = action === 'save' ? 'Do you wish to save new changes to this task?' : `${action.charAt(0).toUpperCase() + action.slice(1)} this task?`;
  isTaskConfirmationVisible.value = true;
};

const closeTaskConfirmation = () => {
  isTaskConfirmationVisible.value = false;
  taskAction.value = '';
  taskConfirmationMessage.value = '';
};

const confirmTaskAction = async () => {
  switch (taskAction.value) {
    case 'pause':
      await handlePauseTask();
      break;
    case 'resume':
      await handleResumeTask();
      break;
    case 'end':
      await handleEndTask();
      break;
    case 'save':
      await handleSaveTask();
      break;
    default:
      break;
  }
  closeTaskConfirmation();
};

// Tooltip and Animation Methods
const updateTitleTooltipPosition = (event) => {
  titleTooltipX.value = event.pageX;
  titleTooltipY.value = event.pageY + 20;
};

const updateMousePosition = (event, type) => {
  if (type === 'attachment') {
    attachmentTooltipX.value = event.pageX;
    attachmentTooltipY.value = event.pageY + 20;
  }
};

const showTitleTooltip = () => {
  isTitleTooltipVisible.value = true;
};

const hideTitleTooltip = () => {
  isTitleTooltipVisible.value = false;
};

const showAttachmentConfirmation = (action, attachment) => {
  attachmentAction.value = action;
  selectedAttachment.value = { ...attachment }; // Clone to avoid direct mutation
  attachmentConfirmationMessage.value = `Do you wish to ${action} this file?`;
  isAttachmentConfirmationVisible.value = true;
  showFileInput.value = action === 'edit';
  if (showFileInput.value && fileInputRef.value) {
    fileInputRef.value.value = ''; // Clear previous file selection
  }
};

const closeAttachmentConfirmation = () => {
  isAttachmentConfirmationVisible.value = false;
  attachmentAction.value = '';
  attachmentConfirmationMessage.value = '';
  selectedAttachment.value = null;
  showFileInput.value = false;
  uploadedFile.value = null;
  if (fileInputRef.value) {
    fileInputRef.value.value = ''; // Ensure file input is cleared
  }
};

const confirmAttachmentAction = async () => {
  if (!selectedAttachment.value) return;

  if (attachmentAction.value === 'delete') {
    await deleteAttachment();
    isSaveActive.value = true; // Activate save button on change
  } else if (attachmentAction.value === 'edit' && uploadedFile.value) {
    await replaceAttachment();
    isSaveActive.value = true; // Activate save button on change
  } else if (attachmentAction.value === 'edit' && !uploadedFile.value) {
    alert('Please select a file to replace the current one.');
    return;
  }
  closeAttachmentConfirmation();
};

const deleteAttachment = async () => {
  try {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const taskIndex = tasks.findIndex(task => task.id === taskData.id);
    if (taskIndex !== -1) {
      tasks[taskIndex].attachments = tasks[taskIndex].attachments.filter(
        att => att.id !== selectedAttachment.value.id
      );
      localStorage.setItem('tasks', JSON.stringify(tasks));
      taskData.attachments = [...tasks[taskIndex].attachments];
      console.log(`Attachment deleted: ${selectedAttachment.value.name}`);
    }
  } catch (error) {
    console.error('Failed to delete attachment:', error);
    alert('Failed to delete attachment. Please try again.');
  }
};

const navigateToViewAttachment = (attachment) => {
  if (attachment.id) {
    router.push({
      path: `/view-attachment/${attachment.id}`,
      query: { taskId: taskData.id } // Pass taskId for context
    });
  } else {
    alert('Attachment ID is missing. Unable to view the file.');
  }
};

const showAttachmentTooltip = (action, name) => {
  attachmentTooltipAction.value = action;
  attachmentTooltipName.value = name;
  isAttachmentTooltipVisible.value = true;
};

const hideAttachmentTooltip = () => {
  isAttachmentTooltipVisible.value = false;
  attachmentTooltipAction.value = '';
  attachmentTooltipName.value = '';
};

const handleFileUpload = (event) => {
  uploadedFile.value = event.target.files[0];
};

const replaceAttachment = async () => {
  if (!uploadedFile.value || !selectedAttachment.value) return;

  try {
    const newUrl = URL.createObjectURL(uploadedFile.value); // Temporary URL for demo
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const taskIndex = tasks.findIndex(task => task.id === taskData.id);
    if (taskIndex !== -1) {
      const attachmentIndex = tasks[taskIndex].attachments.findIndex(
        att => att.id === selectedAttachment.value.id
      );
      if (attachmentIndex !== -1) {
        tasks[taskIndex].attachments[attachmentIndex] = {
          ...tasks[taskIndex].attachments[attachmentIndex],
          name: uploadedFile.value.name,
          url: newUrl // Replace with server-uploaded URL in production
        };
        localStorage.setItem('tasks', JSON.stringify(tasks));
        taskData.attachments = [...tasks[taskIndex].attachments];
        console.log(`Attachment replaced: ${selectedAttachment.value.name} with ${uploadedFile.value.name}`);
      }
    }
  } catch (error) {
    console.error('Failed to replace attachment:', error);
    alert('Failed to replace attachment. Please try again.');
  }
};

const showAgentAnimation = (id) => {
  animatedCards.value.add(`agent-${id}`);
};

const hideAgentAnimation = (id) => {
  animatedCards.value.delete(`agent-${id}`);
};

const showClientAnimation = (id) => {
  animatedCards.value.add(`client-${id}`);
};

const hideClientAnimation = (id) => {
  animatedCards.value.delete(`client-${id}`);
};

const showAgentDeleteConfirmation = (agent) => {
  selectedPerson.value = agent;
  isAgentDeleteVisible.value = true;
};

const showClientDeleteConfirmation = (client) => {
  selectedPerson.value = client;
  isClientDeleteVisible.value = true;
};

const closePersonDeleteConfirmation = () => {
  isAgentDeleteVisible.value = false;
  isClientDeleteVisible.value = false;
  selectedPerson.value = null;
};

const confirmPersonDeletion = async () => {
  if (!selectedPerson.value) return;

  try {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const taskIndex = tasks.findIndex(task => task.id === taskData.id);
    if (taskIndex !== -1) {
      if (isAgentDeleteVisible.value) {
        tasks[taskIndex].agentDetails = tasks[taskIndex].agentDetails.filter(
          agent => agent.id !== selectedPerson.value.id
        );
        taskData.agentDetails = [...tasks[taskIndex].agentDetails];
      } else if (isClientDeleteVisible.value) {
        tasks[taskIndex].clientDetails = tasks[taskIndex].clientDetails.filter(
          client => client.id !== selectedPerson.value.id
        );
        taskData.clientDetails = [...tasks[taskIndex].clientDetails];
      }
      localStorage.setItem('tasks', JSON.stringify(tasks));
      console.log(`Deleted ${selectedPerson.value.name} from ${isAgentDeleteVisible.value ? 'agents' : 'clients'}`);
      isSaveActive.value = true; // Activate save button on change
    }
  } catch (error) {
    console.error('Failed to delete person:', error);
    alert('Failed to delete person. Please try again.');
  }
  closePersonDeleteConfirmation();
};

// Data Persistence
const persistTaskData = async (updates) => {
  try {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const taskIndex = tasks.findIndex(task => task.id === taskData.id);
    if (taskIndex !== -1) {
      tasks[taskIndex] = { ...tasks[taskIndex], ...updates, updatedAt: new Date().toISOString() };
      localStorage.setItem('tasks', JSON.stringify(tasks));
      Object.assign(taskData, updates);
    }
  } catch (error) {
    console.error('Failed to persist task data:', error);
    throw error;
  }
};

const persistTimerState = () => {
  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  const taskIndex = tasks.findIndex(task => task.id === taskData.id);
  if (taskIndex !== -1) {
    tasks[taskIndex].elapsedTime = elapsedTime.value;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
};

// Change Detection
watch([() => taskData.agentDetails, () => taskData.clientDetails, () => taskData.attachments], () => {
  const initialAgents = JSON.stringify(taskData.agentDetails);
  const initialClients = JSON.stringify(taskData.clientDetails);
  const initialAttachments = JSON.stringify(taskData.attachments);
  const loadedTask = JSON.parse(localStorage.getItem('tasks') || '[]').find(task => task.id === taskData.id);
  const originalAgents = JSON.stringify(loadedTask?.agentDetails || []);
  const originalClients = JSON.stringify(loadedTask?.clientDetails || []);
  const originalAttachments = JSON.stringify(loadedTask?.attachments || []);

  isSaveActive.value = initialAgents !== originalAgents || initialClients !== originalClients || initialAttachments !== originalAttachments;
}, { deep: true });

// Due Date Check Interval
const checkDueDate = () => {
  if (taskData.status === 'in_progress' && isDueDateReached()) {
    stopTimer();
    alert('Task timer has automatically stopped as the due date and time have been reached.');
  }
};

onMounted(async () => {
  try {
    const hasAccess = await checkAccess(['agent', 'admin']);
    if (!hasAccess) {
      router.push('/unauthorized');
      return;
    }
    await loadTaskData();
    setInterval(checkDueDate, 60000); // Check every minute
  } catch (error) {
    console.error('Failed to initialize task:', error);
    alert('Failed to initialize task. Please try again.');
  }
});

// Data Loading and Lifecycle
watch(() => route.params.id, () => {
  loadTaskData();
});

const loadTaskData = async () => {
  try {
    const taskId = parseInt(route.params.id, 10);
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const task = tasks.find(task => task.id === taskId);

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
    console.error('Failed to load task data:', error);
    alert('Failed to load task. Please try again.');
  }
};

onUnmounted(() => {
  if (timerInterval.value) {
    clearInterval(timerInterval.value);
  }
});
</script>

<style scoped>
/* Header Styles */
.task-detail__headerbg {
  padding: 20px;
  background-color: #fff;
  border-bottom: 1px solid #e6e6e6;
}

.task-detail__header {
  display: flex;
  width: 80%;
  margin: auto;
  justify-content: space-between;
  align-items: center;
}

.task-detail__flex-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.task-detail__header-left {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  position: relative;
}

.task-detail__title {
  font-size: 20px;
  font-weight: 600;
  color: #666666;
  margin: 0;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: default;
}

.task-detail__title-tooltip {
  position: fixed;
  background: #333;
  color: #fff;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  opacity: 0;
  transform: translateY(5px);
  transition: opacity 0.3s ease, transform 0.3s ease;
  z-index: 1001;
  pointer-events: none;
}

.task-detail__title:hover + .task-detail__title-tooltip {
  opacity: 1;
  transform: translateY(0);
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
  background: #eaf8f1;
  color: #008530;
  margin-left: 20px;
  font-size: 12px;
}

.task-detail__status--draft {
  background: #ffc107;
  color: #ffffff;
}

.task-detail__status--completed {
  background: #6c757d;
  color: #ffffff;
}

.task-detail__status-container {
  display: flex;
  align-items: center;
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
  color: #074f90;
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
  background: #28a745;
  color: #ffffff;
}

.task-detail__action-btn--end {
  background: #dc3545;
  color: #ffffff;
}

.task-detail__action-btn--start {
  background: #28a745;
  color: #ffffff;
}

.task-detail__action-btn--save {
  background: #ced4da; /* Grey when inactive */
  color: #6c757d;
}

.task-detail__action-btn--save.task-detail__action-btn--active {
  background: #4CAF50; /* New color (softer green) when active */
  color: #ffffff;
}

.task-detail__action-btn:hover:not(:disabled) {
  opacity: 0.8;
}

.task-detail__action-btn:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

/* Main Layout Styles */
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
  background-color: #eaeff9;
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
  border: 1px solid #e6e6e6;
}

.taskdetails {
  background: #ffffff;
  border-radius: 8px;
  padding: 15px 20px;
  border: 1px solid #e6e6e6;
}

.task-detail__add-flex {
  display: flex;
  margin: auto;
  align-items: center;
  margin-bottom: 8px;
  justify-content: space-between;
}

.task-detail__right-column {
  background-color: white;
  border-radius: 8px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.task-detail__column.description {
  border: 1px solid #e6e6e6;
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
  background: #007bff;
  color: #ffffff;
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

.task-detail__add-button-container {
  display: flex;
  align-items: center;
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
  transition: box-shadow 0.2s ease, transform 0.3s ease;
  position: relative;
  overflow: hidden;
}

.task-detail__agent-card:hover {
  border: 1px solid rgba(7, 79, 144, 0.6);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.task-detail__agent-card.animated {
  transform: translateX(10px);
}

.task-detail__agent-info-header {
  flex-grow: 1;
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
  background: #eae8e8;
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
  background: #007bff;
  color: white;
}

.task-detail__delete-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-left: 10px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.task-detail__agent-card:hover .task-detail__delete-btn {
  opacity: 1;
  transform: translateY(0);
}

.task-detail__delete-btn svg {
  width: 16px;
  height: 16px;
}

.task-detail__description-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.task-detail__priority {
  color: #ffffff;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
}

.task-detail__priority--low {
  background: #28a745;
}

.task-detail__priority--medium {
  background: #ffc107;
}

.task-detail__priority--high {
  background: #dc3545;
}

.task-detail__description-list {
  list-style-type: none;
  margin: 0;
  padding-left: 0;
  color: #374151;
  font-size: 16px;
  line-height: 1.5;
}

.task-detail__description-item {
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
  padding: 8px 12px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.2s ease;
  position: relative;
}

.task-detail__attachment:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.task-detail__attachment-icon {
  width: 20px;
  height: 20px;
}

.task-detail__attachment-name {
  flex: 1;
  font-size: 14px;
  color: #333333;
  font-weight: 400;
}

.task-detail__attachment-actions {
  display: flex;
  gap: 12px;
  position: relative;
}

.task-detail__action-icon {
  width: 16px;
  height: 16px;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.task-detail__action-icon:hover {
  opacity: 0.8;
}

.task-detail__action-icon--edit {
  stroke: #a78bfa; /* Purple */
}

.task-detail__action-icon--delete {
  stroke: #f87171; /* Red */
}

.task-detail__action-icon--view {
  stroke: #60a5fa; /* Blue */
}

.task-detail__attachment-tooltip {
  position: fixed;
  background: #333;
  color: #fff;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.3s ease, transform 0.3s ease;
  z-index: 1001;
  pointer-events: none;
}

.task-detail__attachment-actions:hover .task-detail__attachment-tooltip {
  opacity: 1;
  transform: translateY(0);
}

.task-detail__no-attachments {
  color: #666666;
  font-size: 14px;
  text-align: center;
  padding: 16px;
  background: #f3f4f6;
  border-radius: 6px;
  margin-top: 8px;
}

.task-detail__file-input {
  display: block;
  margin: 10px auto;
  padding: 8px;
  border: 1px solid #d3d3d3;
  border-radius: 4px;
  font-size: 14px;
  color: #333333;
  width: 80%;
}

.file-input-container {
  margin-bottom: 15px;
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
  animation: fadeIn 0.3s ease-in-out;
}

.confirmation-card {
  background: #ffffff;
  padding: 20px 40px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 400px;
  animation: slideIn 0.3s ease-in-out;
  border: 1px solid #e6e6e6;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.confirmation-title {
  font-size: 24px;
  font-weight: 600;
  color: #4a4a4a;
  margin: 0 0 15px;
}

.confirmation-text {
  font-size: 16px;
  color: #757575;
  margin-bottom: 25px;
  line-height: 1.5;
}

.confirmation-actions {
  display: flex;
  justify-content: center;
  gap: 20px;
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
  width: 70px;
}

.confirmation-btn--yes {
  background: #dc3545;
  color: #ffffff;
  width: 70px;
}

.confirmation-btn:hover {
  transform: scale(1.05);
}

.confirmation-btn--no:hover {
  background: #f8f9fa;
}

/* Responsive Design */
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
    width: 90%;
    padding: 15px 20px;
  }
  .task-detail__title {
    max-width: 200px; /* Adjusted for mobile */
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .task-detail__grid {
    gap: 24px;
  }
  .task-detail__title {
    max-width: 250px;
  }
}

@media (min-width: 1024px) {
  .task-detail__grid {
    gap: 32px;
  }
}
</style>