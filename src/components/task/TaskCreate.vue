<template>
  <main class="task-create" role="main">
    <!-- Header Section -->
    <header class="task-create__header">
      <div class="task-create__nav">
        <button class="task-create__back" @click="handleBack" aria-label="Back to tasks">
          <span class="task-create__back-arrow"><</span>
          Create new task
        </button>
        <div class="task-create__subtitle">
          Here, you can add, remove, edit properties on your profile
        </div>
      </div>
      <div class="task-create__profile">
        <button class="task-create__icon-btn" aria-label="Messages">
          <svg class="task-create__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </button>
        <button class="task-create__icon-btn" aria-label="Notifications">
          <svg class="task-create__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>
        <div class="task-create__user">
          <img
           src="https://res.cloudinary.com/dnuhjsckk/image/upload/v1739408381/Screenshot_2025-02-13_015617_mhjgby.png"
           alt="Profile"
            class="task-create__avatar"
            @error="handleAvatarError"
          >
          <span class="task-create__username">Alex Dunia</span>
          <svg class="task-create__dropdown-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>
    </header>

    <!-- Main Form Section -->
    <section class="task-create__content">
      <h1 class="task-create__title">Create a task</h1>

      <form class="task-create__form" @submit.prevent="handleSubmit" role="form">
        <!-- Task Name -->
        <div class="task-create__form-group">
          <label for="taskName" class="task-create__label">Name of task</label>
          <input
            type="text"
            id="taskName"
            v-model="taskData.name"
            class="task-create__input"
            placeholder="Visit offshore island"
            required
            aria-required="true"
          >
        </div>

        <!-- Date and Time Section -->
        <div class="task-create__datetime-group">
          <!-- Start Date and Time -->
          <div class="task-create__form-group task-create__form-group--half">
            <label for="startDate" class="task-create__label">Start date</label>
            <input
              type="date"
              id="startDate"
              v-model="taskData.startDate"
              class="task-create__input"
              required
              aria-required="true"
            >
          </div>
          <div class="task-create__form-group task-create__form-group--half">
            <label for="startTime" class="task-create__label">Start time</label>
            <input
              type="time"
              id="startTime"
              v-model="taskData.startTime"
              class="task-create__input"
              required
              aria-required="true"
            >
          </div>
        </div>

        <!-- End Date and Time -->
        <div class="task-create__datetime-group">
          <div class="task-create__form-group task-create__form-group--half">
            <label for="endDate" class="task-create__label">End date</label>
            <input
              type="date"
              id="endDate"
              v-model="taskData.endDate"
              class="task-create__input"
              required
              aria-required="true"
            >
          </div>
          <div class="task-create__form-group task-create__form-group--half">
            <label for="endTime" class="task-create__label">End time</label>
            <input
              type="time"
              id="endTime"
              v-model="taskData.endTime"
              class="task-create__input"
              required
              aria-required="true"
            >
          </div>
        </div>

        <!-- Priority Status -->
        <div class="task-create__form-group">
          <label for="priority" class="task-create__label">Priority status</label>
          <select
            id="priority"
            v-model="taskData.priority"
            class="task-create__select"
            required
            aria-required="true"
          >
            <option value="low">Low</option>
            <option value="medium" selected>Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <!-- Description Input -->
        <div class="task-create__form-group">
          <label for="description" class="task-create__label">Description (use ## to separate points)</label>
          <textarea
            id="description"
            v-model="taskDescription"
            class="task-create__textarea"
            placeholder="Plan the visit ## Confirm travel arrangements"
            rows="4"
          ></textarea>
        </div>

        <!-- Agent Selection -->
        <div class="task-create__form-group">
          <label for="agent" class="task-create__label">Add an agent</label>
          <div
            class="task-create__select-trigger"
            @click="openAgentModal"
          >
            <span v-if="selectedAgents.length > 0">
              {{ selectedAgents.length === 1 ? selectedAgents[0].name : `${selectedAgents.length} agents selected` }}
            </span>
            <span v-else>Select from your contacts who you want to tour</span>
          </div>
          <!-- Selected Agents Preview -->
          <div v-if="selectedAgents.length > 0" class="task-create__selected-agents">
            <div v-for="agent in selectedAgents" :key="agent.id" class="task-create__selected-agent">
              <img :src="agent.avatar" :alt="agent.name" class="task-create__selected-agent-avatar">
              <span class="task-create__selected-agent-name">{{ agent.name }}</span>
              <button
                class="task-create__selected-agent-remove"
                @click.stop="removeAgent(agent)"
                aria-label="Remove agent"
              >
                ×
              </button>
            </div>
          </div>
        </div>

        <!-- Client Selection -->
        <div class="task-create__form-group">
          <label for="client" class="task-create__label">Add your client</label>
          <div
            class="task-create__select-trigger"
            @click="openClientModal"
          >
            <span v-if="selectedClients.length > 0">
              {{ selectedClients.length === 1 ? selectedClients[0].name : `${selectedClients.length} clients selected` }}
            </span>
            <span v-else>Select from your contacts who you want to tour</span>
          </div>
          <!-- Selected Clients Preview -->
          <div v-if="selectedClients.length > 0" class="task-create__selected-agents">
            <div v-for="client in selectedClients" :key="client.id" class="task-create__selected-agent">
              <img :src="client.avatar" :alt="client.name" class="task-create__selected-agent-avatar">
              <span class="task-create__selected-agent-name">{{ client.name }}</span>
              <button
                class="task-create__selected-agent-remove"
                @click.stop="removeClient(client)"
                aria-label="Remove client"
              >
                ×
              </button>
            </div>
          </div>
        </div>

        <!-- File Upload Section -->
        <div class="task-create__section">
          <h3 class="task-create__section-title">Attachments</h3>
          <div class="task-create__file-upload">
            <input
              type="file"
              ref="fileInput"
              @change="handleFileUpload"
              multiple
              class="task-create__file-input"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.jpg,.jpeg,.png,.gif,.zip,.rar"
            >
            <button class="task-create__upload-btn" @click="triggerFileInput">
              <svg class="task-create__upload-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
              Upload Files
            </button>
          </div>

          <!-- File List -->
          <div v-if="taskData.attachments.length > 0" class="task-create__file-list">
            <div v-for="(file, index) in taskData.attachments" :key="index" class="task-create__file-item">
              <span class="task-create__file-name">{{ file.name }}</span>
              <span class="task-detail__file-type">{{ file.type }}</span>
              <button class="task-create__file-remove" @click="removeFile(index)" aria-label="Remove file">
                ×
              </button>
            </div>
          </div>
          <div v-else class="task-create__no-files">
            No attachments uploaded yet. You can upload documents, spreadsheets, images, and archives.
          </div>
        </div>

        <!-- Submit Button -->
        <div class="task-create__form-group">
          <button type="submit" class="task-create__submit">
            Create Task
          </button>
        </div>
      </form>
    </section>

    <!-- Agent Modal -->
    <AgentModal
      :is-open="isAgentModalOpen"
      :initial-selected-agents="selectedAgents"
      @close="closeAgentModal"
      @select="handleAgentSelect"
    />

    <!-- Client Modal -->
    <ClientModal
      :is-open="isClientModalOpen"
      :initial-selected-clients="selectedClients"
      @close="closeClientModal"
      @select="handleClientSelect"
    />

    <!-- Confirmation Dialog -->
    <div v-if="showDraftConfirm" class="task-create__dialog-overlay" @click="showDraftConfirm = false">
      <div class="task-create__dialog" @click.stop>
        <h3 class="task-create__dialog-title">Save as Draft?</h3>
        <p class="task-create__dialog-text">Would you like to save your progress as a draft?</p>
        <div class="task-create__dialog-actions">
          <button class="task-create__dialog-btn task-create__dialog-btn--secondary" @click="handleDraftCancel">
            No, Discard
          </button>
          <button class="task-create__dialog-btn task-create__dialog-btn--primary" @click="handleDraftSave">
            Yes, Save as Draft
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useRoleGuard } from '@/composables/useRoleGuard'
import AgentModal from './AgentModal.vue'
import ClientModal from './ClientModal.vue'

const router = useRouter()
const route = useRoute()
const { checkAccess } = useRoleGuard()

const fileInput = ref(null)
const taskDescription = ref('') // New ref for textarea input

const taskData = reactive({
  name: '',
  startDate: '',
  startTime: '09:00',
  endDate: '',
  endTime: '21:00',
  priority: 'medium',
  agents: [],
  agentDetails: [],
  clients: [],
  clientDetails: [],
  status: 'in_progress',
  attachments: [],
  description: [] // Add description as an array
})

// Modal states
const isAgentModalOpen = ref(false)
const isClientModalOpen = ref(false)
const selectedAgents = ref([])
const selectedClients = ref([])

// Dialog state
const showDraftConfirm = ref(false)

// Methods
const handleAvatarError = (e) => {
  e.target.src = '/default-avatar.jpg'
}

const openAgentModal = () => {
  isAgentModalOpen.value = true
}

const closeAgentModal = () => {
  isAgentModalOpen.value = false
}

const handleAgentSelect = (agents) => {
  selectedAgents.value = agents
  taskData.agents = agents.map(agent => agent.id)
  taskData.agentDetails = agents
}

const removeAgent = (agent) => {
  selectedAgents.value = selectedAgents.value.filter(a => a.id !== agent.id)
  taskData.agents = taskData.agents.filter(id => id !== agent.id)
  taskData.agentDetails = taskData.agentDetails.filter(a => a.id !== agent.id)
}

const openClientModal = () => {
  isClientModalOpen.value = true
}

const closeClientModal = () => {
  isClientModalOpen.value = false
}

const handleClientSelect = (clients) => {
  selectedClients.value = clients
  taskData.clients = clients.map(client => client.id)
  taskData.clientDetails = clients
}

const removeClient = (client) => {
  selectedClients.value = selectedClients.value.filter(c => c.id !== client.id)
  taskData.clients = taskData.clients.filter(id => id !== client.id)
  taskData.clientDetails = taskData.clientDetails.filter(c => c.id !== client.id)
}

const handleBack = () => {
  if (route.query.draftId) {
    saveDraftChanges()
    router.push('/tasks/drafts')
    return
  }
  if (!route.query.draftId && hasFormData()) {
    showDraftConfirm.value = true
  } else {
    router.push('/tasks/drafts')
  }
}

const saveDraftChanges = () => {
  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]')
  const draftId = parseInt(route.query.draftId)
  const draftIndex = tasks.findIndex(t => t.id === draftId)
  if (draftIndex !== -1) {
    const descriptionArray = taskDescription.value
      ? taskDescription.value.split('##').map(item => `- ${item.trim()}`).filter(item => item !== '- ')
      : tasks[draftIndex].description || [];
    const updatedDraft = {
      ...tasks[draftIndex],
      ...taskData,
      title: taskData.name || tasks[draftIndex].title,
      updatedAt: new Date().toISOString(),
      lastEditedAt: new Date().toISOString(),
      agentDetails: selectedAgents.value,
      clientDetails: selectedClients.value,
      status: 'draft',
      attachments: taskData.attachments,
      description: descriptionArray
    }
    tasks[draftIndex] = updatedDraft
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }
}

watch([taskData, selectedAgents, selectedClients, taskDescription], () => {
  if (route.query.draftId) {
    saveDraftChanges()
  }
}, { deep: true })

const hasFormData = () => {
  return taskData.name ||
    taskData.startDate ||
    taskData.endDate ||
    taskData.agents.length > 0 ||
    taskData.clients.length > 0 ||
    taskData.attachments.length > 0 ||
    taskDescription.value
}

const handleDraftSave = async () => {
  try {
    const descriptionArray = taskDescription.value
      ? taskDescription.value.split('##').map(item => `- ${item.trim()}`).filter(item => item !== '- ')
      : [];
    const draftData = {
      ...taskData,
      id: Date.now(),
      title: taskData.name || 'Untitled Task',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'draft',
      agentDetails: selectedAgents.value,
      clientDetails: selectedClients.value,
      lastEditedAt: new Date().toISOString(),
      isPartiallyComplete: true,
      attachments: taskData.attachments,
      description: descriptionArray
    }
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]')
    tasks.push(draftData)
    localStorage.setItem('tasks', JSON.stringify(tasks))
    router.push('/tasks')
  } catch (error) {
    console.error('Failed to save draft:', error)
    alert('Failed to save draft. Please try again.')
  }
}

const handleDraftCancel = () => {
  showDraftConfirm.value = false
  router.push('/tasks')
}

const handleSubmit = async () => {
  try {
    const startDateTime = new Date(`${taskData.startDate} ${taskData.startTime}`)
    const endDateTime = new Date(`${taskData.endDate} ${taskData.endTime}`)
    if (endDateTime <= startDateTime) {
      alert('End date/time must be after start date/time')
      return
    }
    if (taskData.agents.length === 0) {
      alert('Please select at least one agent')
      return
    }
    if (taskData.clients.length === 0) {
      alert('Please select at least one client')
      return
    }
    const now = new Date()
    const taskId = route.query.draftId ? parseInt(route.query.draftId) : Date.now()
    const descriptionArray = taskDescription.value
      ? taskDescription.value.split('##').map(item => `- ${item.trim()}`).filter(item => item !== '- ')
      : [];
    const completeTaskData = {
      ...taskData,
      id: taskId,
      title: taskData.name,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
      startedAt: now.toISOString(),
      status: 'in_progress',
      agentDetails: selectedAgents.value,
      clientDetails: selectedClients.value,
      formattedStartDate: startDateTime.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      formattedStartTime: startDateTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      attachments: taskData.attachments,
      description: descriptionArray
    }
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]')
    if (route.query.draftId) {
      const draftId = parseInt(route.query.draftId)
      const taskIndex = tasks.findIndex(t => t.id === draftId)
      if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1)
      }
    }
    tasks.push(completeTaskData)
    localStorage.setItem('tasks', JSON.stringify(tasks))
    router.push('/tasks/in-progress')
  } catch (error) {
    console.error('Failed to create task:', error)
    alert('Failed to create task. Please try again.')
  }
}

const loadDraftData = (draftId) => {
  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]')
  const draft = tasks.find(task => task.id === draftId)
  if (draft) {
    taskData.name = draft.title
    taskData.startDate = draft.startDate
    taskData.startTime = draft.startTime
    taskData.endDate = draft.endDate
    taskData.endTime = draft.endTime
    taskData.priority = draft.priority
    taskData.agents = draft.agents
    taskData.agentDetails = draft.agentDetails
    taskData.clients = draft.clients
    taskData.clientDetails = draft.clientDetails
    taskData.attachments = draft.attachments
    taskData.description = draft.description || []
    taskDescription.value = draft.description ? draft.description.map(item => item.replace('- ', '')).join(' ## ') : ''
    selectedAgents.value = draft.agentDetails
    selectedClients.value = draft.clientDetails
  }
}

const triggerFileInput = () => {
  fileInput.value.click()
}

const handleFileUpload = (event) => {
  const files = Array.from(event.target.files)
  files.forEach(file => {
    const fileData = {
      id: Date.now() + Math.random().toString(36).substr(2, 9),
      name: file.name,
      type: file.type || getFileExtension(file.name),
      size: file.size,
      lastModified: file.lastModified
    }
    taskData.attachments.push(fileData)
  })
  event.target.value = ''
}

const removeFile = (index) => {
  taskData.attachments.splice(index, 1)
}

const getFileExtension = (filename) => {
  return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2).toUpperCase()
}

onMounted(async () => {
  const hasAccess = await checkAccess(['agent', 'admin'])
  if (!hasAccess) {
    router.push('/unauthorized')
    return
  }
  const draftId = route.query.draftId
  if (draftId) {
    loadDraftData(parseInt(draftId))
  }
})
</script>

<style scoped>
.task-create {
  margin: 0 auto;
  padding: 20px;
  background: #FFFFFF;
}

.task-create__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 40px;
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 20px;
}

.task-create__nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.task-create__back {
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

.task-create__back-arrow {
  font-size: 20px;
  line-height: 1;
}

/* .task-create__subtitle {
  color: #666666;
  font-size: 14px;
} */

.task-create__profile {
  display: flex;
  align-items: center;
  gap: 16px;
}

.task-create__icon-btn {
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  color: #666666;
  transition: color 0.2s;
}

.task-create__icon-btn:hover {
  color: #2563EB;
}

.task-create__icon {
  width: 20px;
  height: 20px;
}

.task-create__user {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.task-create__avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.task-create__username {
  color: #666666;
  font-size: 14px;
}

.task-create__dropdown-icon {
  width: 16px;
  height: 16px;
  color: #666666;
}

.task-create__content {
  background: #FFFFFF;
  padding:45px 70px;
  /* box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3); */
  border: 1px solid rgba(0, 0, 0, 0.1);
  max-width: 980px;
  margin: 0 auto;
  /* width: 100%; */
  box-sizing: border-box;
}

.task-create__title {
  font-size: 24px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 24px;
}

.task-create__form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 100%;
}

.task-create__form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.task-create__datetime-group {
  display: flex;
  gap: 16px;
  width: 100%;
}

.task-create__form-group--half {
  flex: 1;
  min-width: 0; /* Prevent flex items from overflowing */
}

.task-create__label {
  color: #374151;
  font-size: 14px;
  font-weight: 500;
}

.task-create__input,
.task-create__select {
  width: 100%;
  padding: 18px 20px 18px 30px;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  font-weight: 500;
  color: #111827;
  background: #FFFFFF;
  font-size: 15px;
  transition: all 0.2s;
  box-sizing: border-box;
}

.task-create__input:hover,
.task-create__select:hover {
  border-color: #2563EB;
}

.task-create__input:focus,
.task-create__select:focus {
  outline: none;
  border-color: #2563EB;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
}

.task-create__submit {
  width: 100%;
  padding: 12px;
  background: #2563EB;
  color: #FFFFFF;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.task-create__submit:hover {
  background: #1D4ED8;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .task-create {
    padding: 20px;
  }

  .task-create__content {
    margin: 0 20px;
    padding: 30px;
  }
}

@media (max-width: 767px) {
  .task-create {
    padding: 16px;
  }

  .task-create__header {
    padding: 0 16px;
    flex-direction: column;
    gap: 16px;
  }

  .task-create__profile {
    width: 100%;
    justify-content: flex-end;
  }

  .task-create__datetime-group {
    flex-direction: column;
    gap: 20px;
  }

  .task-create__content {
    padding: 20px;
    margin: 0 16px;
  }
}

.task-create__select-trigger {
  width: 100%;
  padding: 18px 20px 18px 30px;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  font-weight: 500;
  color: #111827;
  background: #FFFFFF;
  font-size: 15px;
  transition: all 0.2s;
  cursor: pointer;
  box-sizing: border-box;
}

.task-create__select-trigger:hover {
  border-color: #2563EB;
}

.task-create__selected-agents {
  margin-top: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.task-create__selected-agent {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  background: #F3F4F6;
  border-radius: 20px;
  font-size: 14px;
}

.task-create__selected-agent-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
}

.task-create__selected-agent-name {
  color: #374151;
}

.task-create__selected-agent-remove {
  background: none;
  border: none;
  color: #6B7280;
  font-size: 18px;
  line-height: 1;
  padding: 2px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
}

.task-create__selected-agent-remove:hover {
  color: #EF4444;
}

/* Dialog Styles */
.task-create__dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1100;
}

.task-create__dialog {
  background: #FFFFFF;
  border-radius: 12px;
  padding: 24px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.task-create__dialog-title {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 12px;
}

.task-create__dialog-text {
  color: #6B7280;
  font-size: 14px;
  margin: 0 0 20px;
}

.task-create__dialog-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

.task-create__dialog-btn {
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.task-create__dialog-btn--primary {
  background: #2563EB;
  color: #FFFFFF;
  border: none;
}

.task-create__dialog-btn--primary:hover {
  background: #1D4ED8;
}

.task-create__dialog-btn--secondary {
  background: #FFFFFF;
  color: #6B7280;
  border: 1px solid #D1D5DB;
}

.task-create__dialog-btn--secondary:hover {
  border-color: #6B7280;
  color: #374151;
}

.task-create__file-upload {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.task-create__file-input {
  display: none;
}

.task-create__upload-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #2563EB;
  color: #FFFFFF;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.task-create__upload-btn:hover {
  background: #1D4ED8;
}

.task-create__upload-icon {
  width: 20px;
  height: 20px;
}

.task-create__file-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.task-create__file-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  background: #F3F4F6;
  border-radius: 6px;
}

.task-create__file-name {
  flex: 1;
  font-size: 14px;
  color: #111827;
}

.task-create__file-type {
  font-size: 12px;
  color: #6B7280;
  padding: 2px 6px;
  background: #E5E7EB;
  border-radius: 4px;
}

.task-create__file-remove {
  background: none;
  border: none;
  color: #EF4444;
  font-size: 18px;
  cursor: pointer;
  padding: 4px;
  line-height: 1;
}

.task-create__file-remove:hover {
  color: #DC2626;
}

.task-create__no-files {
  color: #666666;
  font-size: 14px;
  text-align: center;
  padding: 16px;
  background: #F3F4F6;
  border-radius: 6px;
  margin-top: 8px;
}
</style>
