<template>
  <div class="task-create-container">
    <!-- Custom Header -->
    <header class="task-header">
      <div class="task-header__left">
        <button class="task-header__back-btn" @click="handleBack">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <div class="task-header__title-container">
          <h1 class="task-header__title">Create new task</h1>
          <p class="task-header__subtitle">Here, you can add, remove, edit properties on your profile</p>
        </div>
      </div>
      <div class="task-header__right">
        <button class="task-header__icon-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
        </button>
        <button class="task-header__icon-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
        </button>
        <div class="task-header__user">
          <img src="https://res.cloudinary.com/dnuhjsckk/image/upload/v1739408381/Screenshot_2025-02-13_015617_mhjgby.png" alt="User" class="task-header__avatar">
          <span class="task-header__username">Alex Dunia</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>
      </div>
    </header>

    <!-- Loading Skeleton -->
    <div v-if="loading" class="task-create__loading">
      <div class="skeleton-loader"></div>
    </div>

    <!-- Main Content -->
    <div v-else class="task-create-content">
      <h2 class="task-create__main-title">Create a task</h2>

      <!-- Main Form -->
      <form class="task-create__form" @submit.prevent="handleSubmit">
        <!-- Task Name -->
        <div class="form-group">
          <label for="taskName">Name of task</label>
          <input
            type="text"
            id="taskName"
            v-model="taskData.name"
            placeholder="Visit offshore island"
            required
            @input="handleInputChange"
          />
        </div>

        <!-- Date and Time Selection -->
        <div class="date-time-container">
          <div class="form-group">
            <label for="startDate">Start date</label>
            <div class="custom-select">
              <input
                type="date"
                id="startDate"
                v-model="taskData.startDate"
                required
                @input="handleInputChange"
              />
              <svg class="select-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </div>
          </div>
          <div class="form-group">
            <label for="startTime">Start time</label>
            <div class="custom-select">
              <input
                type="time"
                id="startTime"
                v-model="taskData.startTime"
                required
                @input="handleInputChange"
              />
              <svg class="select-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="date-time-container">
          <div class="form-group">
            <label for="endDate">End date</label>
            <div class="custom-select">
              <input
                type="date"
                id="endDate"
                v-model="taskData.endDate"
                required
                @input="handleInputChange"
              />
              <svg class="select-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </div>
          </div>
          <div class="form-group">
            <label for="endTime">End time</label>
            <div class="custom-select">
              <input
                type="time"
                id="endTime"
                v-model="taskData.endTime"
                required
                @input="handleInputChange"
              />
              <svg class="select-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- Priority Selection -->
        <div class="form-group">
          <label for="priority">Priority status</label>
          <div class="custom-select">
            <select id="priority" v-model="taskData.priority" @change="handleInputChange">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <svg class="select-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </div>
        </div>

        <!-- Agent Selection -->
        <div class="form-group">
          <label>Add an agent</label>
          <div class="custom-select" @click="showAgentModal = true">
            <div class="select-placeholder">
              {{ selectedAgents.length > 0 ? `${selectedAgents.length} agent(s) selected` : 'Select from your contacts who you want to tour' }}
            </div>
            <svg class="select-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </div>
          <!-- Selected Agents List -->
          <div class="selected-items-list" v-if="selectedAgents.length > 0">
            <div v-for="agent in selectedAgents" :key="agent.id" class="selected-item">
              <div class="selected-item-info">
                <img :src="agent.avatar" alt="Agent avatar" class="selected-item-avatar">
                <span class="selected-item-name">{{ agent.name }}</span>
              </div>
              <button class="remove-item-btn" @click.stop="removeAgent(agent.id)">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Client Selection -->
        <div class="form-group">
          <label>Add your client</label>
          <div class="custom-select" @click="showClientModal = true">
            <div class="select-placeholder">
              {{ selectedClients.length > 0 ? `${selectedClients.length} client(s) selected` : 'Select from your contacts who you want to tour' }}
            </div>
            <svg class="select-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </div>
          <!-- Selected Clients List -->
          <div class="selected-items-list" v-if="selectedClients.length > 0">
            <div v-for="client in selectedClients" :key="client.id" class="selected-item">
              <div class="selected-item-info">
                <img :src="client.avatar" alt="Client avatar" class="selected-item-avatar">
                <span class="selected-item-name">{{ client.name }}</span>
              </div>
              <button class="remove-item-btn" @click.stop="removeClient(client.id)">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Form Actions -->
        <div class="form-actions">
          <button type="submit" class="btn btn-primary">
            {{ route.query.draftId ? 'Update Task' : 'Create Task' }}
          </button>
        </div>
      </form>
    </div>

    <!-- Agent and Client Modals -->
    <AgentModal
      :show="showAgentModal"
      :agents="availableAgents"
      :selected-agents="selectedAgents"
      @close="showAgentModal = false"
      @select="handleAgentSelect"
    />

    <ClientModal
      :show="showClientModal"
      :clients="availableClients"
      :selected-clients="selectedClients"
      @close="showClientModal = false"
      @select="handleClientSelect"
    />

    <!-- Draft Confirmation Dialog -->
    <div v-if="showDraftConfirm" class="dialog-overlay">
      <div class="dialog">
        <h3>Save as Draft?</h3>
        <p>You have unsaved changes. Would you like to save your progress as a draft?</p>
        <div class="dialog-actions">
          <button class="btn btn-secondary" @click="handleDraftCancel">No</button>
          <button class="btn btn-primary" @click="handleDraftSave">Yes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch, onBeforeUnmount, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useRoleGuard } from '@/composables/useRoleGuard'
import { useDateValidation } from '@/composables/useDateValidation'
import { useLayoutStore } from '@/stores/layout'
import { useTaskStore } from '@/stores/taskStore'
import { useClientStore } from '@/stores/clientStore'
import { useAgentStore } from '@/stores/agentStore'
import { useConnectionStore } from '@/stores/connectionStore'
import AgentModal from './AgentModal.vue'
import ClientModal from './ClientModal.vue'

const router = useRouter()
const route = useRoute()
const { checkAccess } = useRoleGuard()
const layoutStore = useLayoutStore()
const taskStore = useTaskStore()
const clientStore = useClientStore()
const agentStore = useAgentStore()
const connectionStore = useConnectionStore()
const { ensureFutureDate, isValidFutureDateTime, isValidDateTimeRange } = useDateValidation()

// Loading state
const loading = ref(true)

// Form refs
const taskDescription = ref('Meet at the villa entrance ## Review property features ## Discuss client preferences')

// Calculate tomorrow's date for startDate and endDate
const tomorrow = new Date()
tomorrow.setDate(tomorrow.getDate() + 1)
const tomorrowDate = tomorrow.toISOString().split('T')[0] // Format: YYYY-MM-DD

// Form state and data
const showAgentModal = ref(false)
const showClientModal = ref(false)
const isNavigating = ref(false)
const showDraftConfirm = ref(false)
const navigationGuard = ref(null)
const hasInteracted = ref(false)
const originalTaskData = ref(null)

// Task data reactive object
const taskData = reactive({
  name: 'Visit offshore island',
  startDate: tomorrowDate,
  startTime: '10:00',
  endDate: tomorrowDate,
  endTime: '12:00',
  priority: 'high',
  agents: [1, 2], // IDs of selected agents
  agentDetails: [], // Will be populated by selectedAgents
  clients: [3], // ID of selected client
  clientDetails: [], // Will be populated by selectedClients
  status: 'in_progress',
  attachments: [
    {
      id: 'file1',
      name: 'villa_floorplan.pdf',
      type: 'PDF',
      size: 1024000, // 1MB in bytes
      lastModified: Date.now()
    },
    {
      id: 'file2',
      name: 'villa_photo.jpg',
      type: 'JPG',
      size: 524288, // 512KB in bytes
      lastModified: Date.now()
    }
  ],
  description: []
})

// Replace hardcoded agents with computed property from agentStore with correct format
const availableAgents = computed(() => {
  return agentStore.agents.map(agent => ({
    id: agent.id,
    name: agent.name,
    avatar: agent.avatar || 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739408381/Screenshot_2025-02-13_015617_mhjgby.png',
    email: agent.email
  }));
})

// Replace hardcoded clients with computed property from clientStore
const availableClients = computed(() => {
  return clientStore.clients.map(client => ({
    id: client.id,
    name: client.name,
    avatar: client.profilePicture || 'https://example.com/avatars/default.jpg',
    email: client.email
  }));
})

// Pre-populate selected agents and clients for testing
const selectedAgents = ref([])

// Updated to get client from the clientStore instead of hardcoded data
const selectedClients = ref([])

// Initialize data
taskData.agents = selectedAgents.value.map(agent => agent.id)
taskData.agentDetails = selectedAgents.value

// Initialize selected client and agent if provided in the URL
onMounted(() => {
  // Initialize agents with proper data structure
  if (availableAgents.value.length > 0) {
    // Default to first two agents for demo purposes
    const firstTwoAgents = availableAgents.value.slice(0, 2);
    selectedAgents.value = firstTwoAgents;

    // Update task data with selected agents - no modifications needed
    taskData.agents = selectedAgents.value.map(agent => agent.id);
    taskData.agentDetails = selectedAgents.value;
  }

  // If clientId is provided in URL query, preselect that client
  if (route.query.clientId) {
    const clientId = parseInt(route.query.clientId)
    const client = clientStore.getClientById(clientId)
    if (client) {
      selectedClients.value = [{
        id: client.id,
        name: client.name,
        avatar: client.profilePicture || 'https://example.com/avatars/default.jpg',
        email: client.email
      }]

      // Update taskData with selected client
      taskData.clients = selectedClients.value.map(client => client.id)
      taskData.clientDetails = selectedClients.value
    }
  } else if (clientStore.clients.length > 0) {
    // Otherwise, default to first client for demo purposes (optional, can be removed)
    const defaultClient = clientStore.clients[0]
    selectedClients.value = [{
      id: defaultClient.id,
      name: defaultClient.name,
      avatar: defaultClient.profilePicture || 'https://example.com/avatars/default.jpg',
      email: defaultClient.email
    }]

    // Update taskData with selected client
    taskData.clients = selectedClients.value.map(client => client.id)
    taskData.clientDetails = selectedClients.value
  }

  // Hide the app header and sidebar
  layoutStore.setLayout({
    hideSidebar: true,
    hideHeader: true,
    hideFooter: true,
    background: '#f9fafb'
  })

  // Set up navigation guard to prevent accidental navigation when form has changes
  navigationGuard.value = router.beforeEach((to, from, next) => {
    // Skip confirmation if we're already navigating after user decision
    if (isNavigating.value) {
      isNavigating.value = false
      next()
      return
    }

    if (hasFormData() && hasChanges() && hasInteracted.value) {
      // Show confirmation dialog
      showDraftConfirm.value = true
      // Prevent navigation until dialog is answered
      next(false)
      return
    }
    next() // Allow navigation if no changes or no form data
  })

  loading.value = true

  checkAccess(['agent', 'admin']).then(hasAccess => {
    if (!hasAccess) {
      router.push('/unauthorized')
      return
    }

    const draftId = route.query.draftId
    if (draftId) {
      loadDraftData(parseInt(draftId))
        .then(() => {
          loading.value = false
        })
        .catch(error => {
          console.error('Error loading draft data:', error)
          loading.value = false
        })
    } else {
      // Initialize original data for new tasks with pre-filled values
      originalTaskData.value = {
        name: taskData.name,
        startDate: taskData.startDate,
        startTime: taskData.startTime,
        endDate: taskData.endDate,
        endTime: taskData.endTime,
        priority: taskData.priority,
        agents: [...taskData.agents],
        clients: [...taskData.clients],
        attachments: JSON.parse(JSON.stringify(taskData.attachments)),
        description: taskDescription.value
      }

      setTimeout(() => {
        loading.value = false
      }, 800)
    }
  }).catch(error => {
    console.error('Error checking access:', error)
    loading.value = false
  })
})

onBeforeUnmount(() => {
  // Clean up navigation guard
  if (navigationGuard.value) {
    navigationGuard.value()
  }

  // Restore the default layout
  layoutStore.setLayout({
    hideSidebar: false,
    hideHeader: false,
    hideFooter: false,
    background: '#f9fafb'
  })
})

// Methods
const handleAgentSelect = (agents) => {
  selectedAgents.value = agents
  taskData.agents = agents.map(agent => agent.id)
  taskData.agentDetails = agents
  hasInteracted.value = true
}

const handleClientSelect = (clients) => {
  selectedClients.value = clients
  taskData.clients = clients.map(client => client.id)
  taskData.clientDetails = clients
  hasInteracted.value = true
}

const removeAgent = (agentId) => {
  selectedAgents.value = selectedAgents.value.filter(agent => agent.id !== agentId)
  taskData.agents = selectedAgents.value.map(agent => agent.id)
  taskData.agentDetails = selectedAgents.value
  hasInteracted.value = true
}

const removeClient = (clientId) => {
  selectedClients.value = selectedClients.value.filter(client => client.id !== clientId)
  taskData.clients = selectedClients.value.map(client => client.id)
  taskData.clientDetails = selectedClients.value
  hasInteracted.value = true
}

const handleBack = () => {
  if (hasFormData() && hasChanges() && hasInteracted.value) {
    showDraftConfirm.value = true
  } else {
    isNavigating.value = true
    if (route.query.draftId) {
      if (route.query.from) {
        router.push(`/tasks/${route.query.from}`)
      } else if (route.query.mode === 'edit') {
        router.push(`/tasks/${route.query.draftId}`)
      } else {
        router.push('/tasks/drafts')
      }
    } else {
      router.push('/tasks')
    }
  }
}

const saveDraftChanges = () => {
  const draftId = parseInt(route.query.draftId)
  const startDate = ensureFutureDate(taskData.startDate)
  const endDate = ensureFutureDate(taskData.endDate)

  const descriptionArray = taskDescription.value
    ? taskDescription.value.split('##').map(item => `- ${item.trim()}`).filter(item => item !== '- ')
    : taskStore.getTaskById(draftId)?.description || []

  const updatedDraft = {
    title: taskData.name,
    startDate,
    endDate,
    startTime: taskData.startTime,
    endTime: taskData.endTime,
    priority: taskData.priority,
    agents: taskData.agents,
    agentDetails: selectedAgents.value,
    clients: taskData.clients,
    clientDetails: selectedClients.value,
    status: 'draft',
    attachments: taskData.attachments,
    description: descriptionArray
  }

  taskStore.updateTask(draftId, updatedDraft)
}

const hasFormData = () => {
  // Consider task creation with any actual content worth saving
  if (taskData.name.trim() !== '') return true
  if (taskData.agents.length > 0) return true
  if (taskData.clients.length > 0) return true
  if (taskData.attachments.length > 0) return true
  if (taskDescription.value.trim() !== '') return true

  return false
}

const handleDraftSave = () => {
  try {
    if (route.query.draftId) {
      saveDraftChanges()
    } else {
      const startDate = ensureFutureDate(taskData.startDate)
      const endDate = ensureFutureDate(taskData.endDate)

      const descriptionArray = taskDescription.value
        ? taskDescription.value.split('##').map(item => `- ${item.trim()}`).filter(item => item !== '- ')
        : []

      const draftData = {
        title: taskData.name || 'Untitled Task',
        startDate,
        endDate,
        startTime: taskData.startTime,
        endTime: taskData.endTime,
        priority: taskData.priority,
        agents: taskData.agents,
        agentDetails: selectedAgents.value,
        clients: taskData.clients,
        clientDetails: selectedClients.value,
        status: 'draft',
        isPartiallyComplete: true,
        attachments: taskData.attachments,
        description: descriptionArray
      }

      taskStore.saveAsDraft(draftData)
    }

    isNavigating.value = true
    showDraftConfirm.value = false

    if (route.query.from) {
      router.push(`/tasks/${route.query.from}`)
    } else {
      router.push('/tasks/drafts')
    }
  } catch (error) {
    console.error('Failed to save draft:', error)
    alert('Failed to save draft. Please try again.')
  }
}

const handleDraftCancel = () => {
  showDraftConfirm.value = false
  isNavigating.value = true

  if (route.query.from) {
    router.push(`/tasks/${route.query.from}`)
  } else {
    router.push('/tasks')
  }
}

const handleSubmit = () => {
  try {
    const startDateTime = new Date(`${taskData.startDate} ${taskData.startTime}`)

    if (!isValidFutureDateTime(taskData.startDate, taskData.startTime)) {
      alert('Start date cannot be in the past')
      return
    }

    if (!isValidDateTimeRange(taskData.startDate, taskData.startTime, taskData.endDate, taskData.endTime)) {
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

    // Check if the selected agents and clients are connected
    const areConnected = connectionStore.validateMultipleInteractions(taskData.agents, taskData.clients)
    if (!areConnected) {
      alert('Tasks can only be scheduled between connected agents and clients. Please ensure all clients have a connection with at least one of the selected agents.')
      return
    }

    const descriptionArray = taskDescription.value
      ? taskDescription.value.split('##').map(item => `- ${item.trim()}`).filter(item => item !== '- ')
      : []

    const taskDataForSubmit = {
      title: taskData.name,
      startDate: taskData.startDate,
      endDate: taskData.endDate,
      startTime: taskData.startTime,
      endTime: taskData.endTime,
      priority: taskData.priority,
      agents: taskData.agents,
      agentDetails: selectedAgents.value,
      clients: taskData.clients,
      clientDetails: selectedClients.value,
      attachments: taskData.attachments,
      description: descriptionArray,
      formattedStartDate: startDateTime.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      formattedStartTime: startDateTime.toISOString()
    }

    let taskId
    if (route.query.draftId) {
      const draftId = Number(route.query.draftId)
      taskStore.updateTask(draftId, {...taskDataForSubmit, status: 'scheduled'})
      taskId = draftId
    } else {
      taskId = taskStore.createTask(taskDataForSubmit)
      taskStore.scheduleTask(taskId)
    }

    isNavigating.value = true
    router.push('/tasks/scheduled')
  } catch (error) {
    console.error('Failed to create task:', error)
    alert('Failed to create task. Please try again.')
  }
}

const hasChanges = () => {
  if (!originalTaskData.value) return true

  if (taskData.name !== originalTaskData.value.name) return true
  if (taskData.startDate !== originalTaskData.value.startDate) return true
  if (taskData.startTime !== originalTaskData.value.startTime) return true
  if (taskData.endDate !== originalTaskData.value.endDate) return true
  if (taskData.endTime !== originalTaskData.value.endTime) return true
  if (taskData.priority !== originalTaskData.value.priority) return true
  if (taskDescription.value !== originalTaskData.value.description) return true

  if (taskData.agents.length !== originalTaskData.value.agents.length) return true
  if (taskData.clients.length !== originalTaskData.value.clients.length) return true
  if (taskData.attachments.length !== originalTaskData.value.attachments.length) return true

  for (let i = 0; i < taskData.agents.length; i++) {
    if (!originalTaskData.value.agents.includes(taskData.agents[i])) return true
  }

  for (let i = 0; i < taskData.clients.length; i++) {
    if (!originalTaskData.value.clients.includes(taskData.clients[i])) return true
  }

  for (let i = 0; i < taskData.attachments.length; i++) {
    const attachment = taskData.attachments[i]
    const originalAttachment = originalTaskData.value.attachments.find(a => a.id === attachment.id)
    if (!originalAttachment) return true
  }

  return false
}

const loadDraftData = (draftId) => {
  return new Promise((resolve, reject) => {
    try {
      const draft = taskStore.getTaskById(draftId)
      if (draft) {
        taskData.name = draft.title
        taskData.startDate = ensureFutureDate(draft.startDate)
        taskData.startTime = draft.startTime
        taskData.endDate = ensureFutureDate(draft.endDate)
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

        originalTaskData.value = {
          name: draft.title,
          startDate: taskData.startDate,
          startTime: draft.startTime,
          endDate: taskData.endDate,
          endTime: draft.endTime,
          priority: draft.priority,
          agents: [...draft.agents],
          clients: [...draft.clients],
          attachments: JSON.parse(JSON.stringify(draft.attachments)),
          description: taskDescription.value
        }
        resolve()
      } else {
        reject(new Error('Draft not found'))
      }
    } catch (error) {
      reject(error)
    }
  })
}

// Add form input tracking
const handleInputChange = () => {
  hasInteracted.value = true
}

watch(() => taskData.startDate, (newStartDate) => {
  if (taskData.endDate < newStartDate) {
    taskData.endDate = newStartDate
  }
})
</script>

<style scoped>
.task-create-container {
  max-width: 100%;
  background-color: #f9fafb;
  min-height: 100vh;
  padding-bottom: 40px;
}

/* Header Styles */
.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 24px;
  background-color: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.task-header__left {
  display: flex;
  align-items: center;
}

.task-header__back-btn {
  background: none;
  border: none;
  color: #111827;
  cursor: pointer;
  padding: 8px;
  margin-right: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.task-header__title-container {
  display: flex;
  flex-direction: column;
}

.task-header__title {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0;
  line-height: 1.3;
}

.task-header__subtitle {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
  line-height: 1.4;
}

.task-header__right {
  display: flex;
  align-items: center;
}

.task-header__icon-btn {
  background: #f3f4f6;
  border: none;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  color: #6b7280;
  cursor: pointer;
}

.task-header__user {
  display: flex;
  align-items: center;
  margin-left: 14px;
  cursor: pointer;
}

.task-header__avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 8px;
  object-fit: cover;
}

.task-header__username {
  margin-right: 4px;
  font-size: 14px;
  font-weight: 500;
  color: #111827;
}

/* Main content */
.task-create-content {
  max-width: 800px;
  margin: 30px auto 0;
  padding: 40px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.task-create__main-title {
  font-size: 24px;
  font-weight: 600;
  color: #0F172A;
  margin: 0 0 40px 0;
  text-align: center;
}

.task-create__loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
}

.skeleton-loader {
  width: 100%;
  max-width: 800px;
  height: 600px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 8px;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.task-create__form {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.form-group {
  margin-bottom: 0;
}

.form-group label {
  display: block;
  margin-bottom: 10px;
  font-weight: 500;
  color: #374151;
  font-size: 15px;
}

input, select, textarea {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  background-color: #fff;
  color: #111827;
  height: 48px;
}

input::placeholder {
  color: #9CA3AF;
}

input:focus, select:focus, textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.date-time-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 0;
}

/* Custom Select Styling */
.custom-select {
  position: relative;
}

.custom-select select,
.custom-select input {
  width: 100%;
  appearance: none;
  padding-right: 30px;
  background-color: #ffffff;
  height: 48px;
}

.select-arrow {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: #9CA3AF;
}

.select-placeholder {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  background-color: #fff;
  color: #9CA3AF;
  cursor: pointer;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  height: 48px;
  display: flex;
  align-items: center;
}

/* Form actions */
.form-actions {
  display: flex;
  justify-content: center;
  margin-top: 24px;
}

.btn {
  padding: 14px 36px;
  border-radius: 6px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-primary {
  background-color: #3b82f6;
  color: white;
  border: none;
  min-width: 150px;
}

.btn-primary:hover {
  background-color: #2563eb;
}

.btn-secondary {
  background-color: white;
  color: #4b5563;
  border: 1px solid #d1d5db;
}

.btn-secondary:hover {
  background-color: #f9fafb;
}

/* Dialog */
.dialog-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}

.dialog {
  background-color: white;
  border-radius: 8px;
  padding: 24px;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.dialog h3 {
  margin-top: 0;
  font-size: 18px;
  color: #111827;
}

.dialog-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
}

/* Selected Items List */
.selected-items-list {
  margin-top: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.selected-item {
  display: flex;
  align-items: center;
  background-color: #f3f4f6;
  border-radius: 20px;
  padding: 6px 12px;
  max-width: fit-content;
}

.selected-item-info {
  display: flex;
  align-items: center;
}

.selected-item-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 8px;
  object-fit: cover;
}

.selected-item-name {
  font-size: 14px;
  font-weight: 500;
  color: #111827;
}

.remove-item-btn {
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 0;
  margin-left: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.remove-item-btn:hover {
  color: #ef4444;
}
</style>
