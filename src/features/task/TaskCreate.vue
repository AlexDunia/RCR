<script setup>
import { ref, reactive, onMounted, computed, watch, onBeforeUnmount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useRoleGuard } from '@/composables/useRoleGuard'
import { useDateValidation } from '@/composables/useDateValidation'
import { useLayoutStore } from '@/stores/layout'
import AgentModal from './AgentModal.vue'
import ClientModal from './ClientModal.vue'

const router = useRouter()
const route = useRoute()
const { checkAccess } = useRoleGuard()
const layoutStore = useLayoutStore()
const { todayDate, ensureFutureDate, isValidFutureDateTime, isValidDateTimeRange } = useDateValidation()

// Loading state
const loading = ref(true)

// Check if we're in edit mode
const isEditMode = computed(() => !!route.query.draftId)

// Form refs
const fileInput = ref(null)
const taskDescription = ref('Meet at the villa entrance ## Review property features ## Discuss client preferences')

// Calculate tomorrow's date for startDate and endDate
const tomorrow = new Date()
tomorrow.setDate(tomorrow.getDate() + 1)
const tomorrowDate = tomorrow.toISOString().split('T')[0] // Format: YYYY-MM-DD

const taskData = reactive({
  name: 'Tour Beachfront Villa',
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

// Modal states
const isAgentModalOpen = ref(false)
const isClientModalOpen = ref(false)

// Pre-populate selected agents and clients for testing
const selectedAgents = ref([
  {
    id: 1,
    name: 'John Smith',
    avatar: 'https://example.com/avatars/john.jpg'
  },
  {
    id: 2,
    name: 'Emily Davis',
    avatar: 'https://example.com/avatars/emily.jpg'
  }
])

const selectedClients = ref([
  {
    id: 3,
    name: 'Michael Brown',
    avatar: 'https://example.com/avatars/michael.jpg'
  }
])

// Sync selected agents and clients with taskData
taskData.agents = selectedAgents.value.map(agent => agent.id)
taskData.agentDetails = selectedAgents.value
taskData.clients = selectedClients.value.map(client => client.id)
taskData.clientDetails = selectedClients.value

// Dialog state
const showDraftConfirm = ref(false)

// Add originalTaskData to store the initial state
const originalTaskData = ref(null)

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
  if (hasFormData() && hasChanges()) {
    showDraftConfirm.value = true
  } else {
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
  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]')
  const draftId = parseInt(route.query.draftId)
  const draftIndex = tasks.findIndex(t => t.id === draftId)
  if (draftIndex !== -1) {
    const startDate = ensureFutureDate(taskData.startDate)
    const endDate = ensureFutureDate(taskData.endDate)

    const descriptionArray = taskDescription.value
      ? taskDescription.value.split('##').map(item => `- ${item.trim()}`).filter(item => item !== '- ')
      : tasks[draftIndex].description || []
    const updatedDraft = {
      ...tasks[draftIndex],
      ...taskData,
      startDate,
      endDate,
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

const hasFormData = () => {
  if (taskData.name.trim() !== '') return true
  if (taskData.agents.length > 0) return true
  if (taskData.clients.length > 0) return true
  if (taskData.attachments.length > 0) return true
  if (taskDescription.value.trim() !== '') return true

  const today = new Date().toISOString().split('T')[0]
  if (taskData.startDate !== today) return true
  if (taskData.startTime !== '09:00') return true
  if (taskData.endDate !== today) return true
  if (taskData.endTime !== '21:00' && taskData.endTime !== '17:00') return true
  if (taskData.priority !== 'medium') return true

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
        ...taskData,
        startDate,
        endDate,
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
    }

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

    const now = new Date()
    const taskId = route.query.draftId ? Number(route.query.draftId) : Number(Date.now())
    const descriptionArray = taskDescription.value
      ? taskDescription.value.split('##').map(item => `- ${item.trim()}`).filter(item => item !== '- ')
      : []
    const completeTaskData = {
      ...taskData,
      id: taskId,
      title: taskData.name,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
      startedAt: null,
      status: 'scheduled',
      agentDetails: selectedAgents.value,
      clientDetails: selectedClients.value,
      formattedStartDate: startDateTime.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      formattedStartTime: startDateTime.toISOString(),
      attachments: taskData.attachments,
      description: descriptionArray
    }

    console.log('Creating task with ID:', taskId, 'and type:', typeof taskId)

    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]')
    if (route.query.draftId) {
      const draftId = Number(route.query.draftId)
      const taskIndex = tasks.findIndex(t => Number(t.id) === draftId)
      if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1)
      }
    }
    tasks.push(completeTaskData)
    localStorage.setItem('tasks', JSON.stringify(tasks))

    localStorage.setItem('currentTaskDetail', JSON.stringify(completeTaskData))

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
      const tasks = JSON.parse(localStorage.getItem('tasks') || '[]')
      const draft = tasks.find(task => task.id === draftId)
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

watch(() => taskData.startDate, (newStartDate) => {
  if (taskData.endDate < newStartDate) {
    taskData.endDate = newStartDate
  }
})

onMounted(() => {
  setTimeout(() => {
    layoutStore.setLayout({
      hideSidebar: true,
      hideHeader: true,
      background: '#f9fafb'
    })
  }, 50)

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
  layoutStore.setLayout({
    hideSidebar: false,
    hideHeader: false,
    background: '#F9FAFB'
  })
})
</script>