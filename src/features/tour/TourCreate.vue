<template>
  <main class="tour-create" role="main">
    <!-- Header Section -->
    <header class="tour-create__header">
      <div class="tour-create__nav">
        <button class="tour-create__back" @click="handleBack" aria-label="Back to tours">
          <span class="tour-create__back-arrow">&lt;</span>
          {{ isEditMode ? 'Edit tour' : 'Create new tour' }}
        </button>
        <div class="tour-create__subtitle">
          {{ isEditMode ? 'Update your tour details and save changes' : 'Schedule a new property tour' }}
      </div>
    </div>
      <div class="tour-create__profile">
        <!-- Placeholder icons, consider making these functional or removing -->
        <button class="tour-create__icon-btn" aria-label="Messages">
          <svg class="tour-create__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </button>
        <button class="tour-create__icon-btn" aria-label="Notifications">
          <svg class="tour-create__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>
        <div class="tour-create__user">
           <!-- Replace with actual user data -->
          <img
            src="https://res.cloudinary.com/dnuhjsckk/image/upload/v1739408381/Screenshot_2025-02-13_015617_mhjgby.png"
            alt="Profile"
            class="tour-create__avatar"
            @error="handleAvatarError"
          >
          <span class="tour-create__username">Alex Dunia</span>
          <svg class="tour-create__dropdown-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
      </div>
      </div>
    </header>

    <!-- Loading Skeleton -->
    <div v-if="loading" class="tour-create__loading-skeleton">
      <div class="tour-create__skeleton-title"></div>
      <div class="tour-create__skeleton-form">
        <div class="tour-create__skeleton-group">
          <div class="tour-create__skeleton-label"></div>
          <div class="tour-create__skeleton-input"></div>
        </div>
        <div class="tour-create__skeleton-group">
          <div class="tour-create__skeleton-label"></div>
          <div class="tour-create__skeleton-input"></div>
        </div>
         <div class="tour-create__skeleton-group">
          <div class="tour-create__skeleton-label"></div>
          <div class="tour-create__skeleton-input"></div>
        </div>
        <div class="tour-create__skeleton-group">
          <div class="tour-create__skeleton-label"></div>
          <div class="tour-create__skeleton-textarea"></div>
        </div>
        <div class="tour-create__skeleton-group">
          <div class="tour-create__skeleton-label"></div>
          <div class="tour-create__skeleton-select"></div>
        </div>
        <div class="tour-create__skeleton-group">
          <div class="tour-create__skeleton-label"></div>
          <div class="tour-create__skeleton-cards"></div>
        </div>
      </div>
    </div>

    <!-- Main Form Section -->
    <section v-else class="tour-create__content">
      <h1 class="tour-create__title">{{ isEditMode ? 'Edit tour' : 'Create a tour' }}</h1>

      <form class="tour-create__form" @submit.prevent="handleSubmit" role="form" @change="formInputChange" @input="formInputChange">
        <!-- Tour Name/Title -->
        <div class="tour-create__form-group">
          <label for="tourName" class="tour-create__label">Name of tour</label>
            <input
              type="text"
            id="tourName"
            v-model="tourData.title"
            class="tour-create__input"
            :placeholder="isEditMode ? 'Edit tour name' : 'Luxury Condo Showing'"
              required
            aria-required="true"
          >
          </div>

        <!-- Start Date and Time Section -->
        <div class="tour-create__datetime-group">
          <!-- Start Date -->
          <div class="tour-create__form-group tour-create__form-group--half">
            <label for="startDate" class="tour-create__label">Start date</label>
              <input
              type="date"
                id="startDate"
                v-model="tourData.startDate"
                :min="todayDate"
              class="tour-create__input"
                required
              aria-required="true"
            >
            </div>
          <!-- Start Time -->
          <div class="tour-create__form-group tour-create__form-group--half">
            <label for="startTime" class="tour-create__label">Start time</label>
              <input
              type="time"
                id="startTime"
                v-model="tourData.startTime"
              class="tour-create__input"
                required
              aria-required="true"
            >
            </div>
          </div>

        <!-- End Date and Time Section -->
        <div class="tour-create__datetime-group">
          <!-- End Date -->
          <div class="tour-create__form-group tour-create__form-group--half">
            <label for="endDate" class="tour-create__label">End date</label>
              <input
              type="date"
                id="endDate"
                v-model="tourData.endDate"
              :min="tourData.startDate || todayDate"
              class="tour-create__input"
                required
              aria-required="true"
            >
            </div>
          <!-- End Time -->
          <div class="tour-create__form-group tour-create__form-group--half">
            <label for="endTime" class="tour-create__label">End time</label>
              <input
              type="time"
                id="endTime"
                v-model="tourData.endTime"
              class="tour-create__input"
                required
              aria-required="true"
            >
          </div>
        </div>

        <!-- Priority Status -->
        <div class="tour-create__form-group">
          <label for="priority" class="tour-create__label">Priority status</label>
          <select
            id="priority"
            v-model="tourData.priority"
            class="tour-create__select"
            required
            aria-required="true"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <!-- Tour Notes/Description -->
        <div class="tour-create__form-group">
          <label for="tourNotes" class="tour-create__label">Tour Notes (Optional)</label>
          <textarea
            id="tourNotes"
            v-model="tourData.notes"
            class="tour-create__textarea"
            placeholder="Client interested in kitchen layout, check availability of garage..."
            rows="4"
          ></textarea>
            </div>

        <!-- Agent Selection -->
        <div class="tour-create__form-group">
          <label for="agent" class="tour-create__label">Add agent(s)</label>
          <div
            class="tour-create__select-trigger"
            @click="openAgentModal"
          >
            <span v-if="selectedAgents.length > 0">
              {{ selectedAgents.length === 1 ? selectedAgents[0].name : `${selectedAgents.length} agents selected` }}
            </span>
            <span v-else>Select agents participating in the tour</span>
          </div>
          <!-- Selected Agents Preview -->
          <div v-if="selectedAgents.length > 0" class="tour-create__selected-preview">
            <div v-for="agent in selectedAgents" :key="agent.id" class="tour-create__selected-item">
              <img :src="agent.avatar || defaultAvatar" :alt="agent.name" class="tour-create__selected-avatar" @error="handleAvatarError">
              <span class="tour-create__selected-name">{{ agent.name }}</span>
                <button
                  type="button"
                class="tour-create__selected-remove"
                @click.stop="removeAgent(agent)"
                aria-label="Remove agent"
                >
                &times;
                </button>
              </div>
            </div>
          </div>

        <!-- Client Selection -->
        <div class="tour-create__form-group">
          <label for="client" class="tour-create__label">Add client(s)</label>
          <div
            class="tour-create__select-trigger"
            @click="openClientModal"
          >
            <span v-if="selectedClients.length > 0">
              {{ selectedClients.length === 1 ? selectedClients[0].name : `${selectedClients.length} clients selected` }}
            </span>
            <span v-else>Select clients attending the tour</span>
          </div>
          <!-- Selected Clients Preview -->
          <div v-if="selectedClients.length > 0" class="tour-create__selected-preview">
            <div v-for="client in selectedClients" :key="client.id" class="tour-create__selected-item">
              <img :src="client.avatar || defaultAvatar" :alt="client.name" class="tour-create__selected-avatar" @error="handleAvatarError">
              <span class="tour-create__selected-name">{{ client.name }}</span>
                <button
                  type="button"
                class="tour-create__selected-remove"
                @click.stop="removeClient(client)"
                aria-label="Remove client"
                >
                &times;
                </button>
              </div>
            </div>
          </div>

        <!-- Attachment Section -->
         <div class="tour-create__section">
          <h3 class="tour-create__section-title">Attachments</h3>
          <div class="tour-create__file-upload">
            <input
              type="file"
              ref="fileInput"
              @change="handleFileUpload"
              multiple
              class="tour-create__file-input"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.jpg,.jpeg,.png,.gif,.zip,.rar"
            >
            <button type="button" class="tour-create__upload-btn" @click="triggerFileInput">
              <svg class="tour-create__upload-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
              Upload Files
            </button>
        </div>

          <!-- File List -->
          <div v-if="tourData.attachments.length > 0" class="tour-create__file-list">
            <div v-for="(file, index) in tourData.attachments" :key="index" class="tour-create__file-item">
              <span class="tour-create__file-name">{{ file.name }}</span>
              <button type="button" class="tour-create__file-remove" @click="removeFile(index)" aria-label="Remove file">
                &times;
              </button>
            </div>
          </div>
        </div>

         <!-- Action Buttons -->
        <div class="tour-create__actions">
           <button type="button" class="tour-create__btn tour-create__btn--secondary" @click="saveDraft">Save as Draft</button>
          <button type="submit" class="tour-create__btn tour-create__btn--primary">
            {{ isEditMode ? 'Update Tour' : 'Create Tour' }}
          </button>
        </div>
      </form>
    </section>

    <!-- Agent Selection Modal -->
    <AgentModal
      :show="isAgentModalOpen"
      :agents="availableAgents"
      :selected-agents="selectedAgents"
      @close="closeAgentModal"
      @select="handleAgentSelect"
      @remove="removeAgent"
    />

    <!-- Client Selection Modal -->
    <ClientModal
      :show="isClientModalOpen"
      :clients="availableClients"
      :selected-clients="selectedClients"
      @close="closeClientModal"
      @select="handleClientSelect"
      @remove="removeClient"
    />

     <!-- Confirmation Dialog -->
    <div v-if="showConfirmation" class="tour-create__dialog-overlay" @click="closeConfirmation">
      <div class="tour-create__dialog" @click.stop>
        <h3 class="tour-create__dialog-title">{{ confirmationTitle }}</h3>
        <p class="tour-create__dialog-text">{{ confirmationMessage }}</p>
        <div class="tour-create__dialog-actions">
          <button class="tour-create__dialog-btn tour-create__dialog-btn--secondary" @click="handleNoAction">No</button>
          <button class="tour-create__dialog-btn tour-create__dialog-btn--primary" @click="confirmAction">Yes</button>
        </div>
      </div>
    </div>

     <!-- Error Message -->
    <div v-if="errorMessage" class="tour-create__error-message">
      {{ errorMessage }}
    </div>
  </main>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch, onBeforeUnmount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useTourStore } from '@/stores/tourStore'
import AgentModal from './AgentModal.vue'
import ClientModal from './ClientModal.vue'

const router = useRouter()
const route = useRoute()
const tourStore = useTourStore()

const isEditMode = ref(false)
const tourId = ref(null)
const loading = ref(false)
const errorMessage = ref('')
const defaultAvatar = '@/assets/images/default-avatar.png' // Define path to default avatar

// Tour data model
const tourData = reactive({
  title: '',
  startDate: '',
  startTime: '',
  endDate: '',
  endTime: '',
  notes: '',
  priority: 'medium', // Default priority
  agents: [], // Store agent IDs
  clients: [], // Store client IDs
  attachments: [], // Store file objects or metadata
  status: 'scheduled' // Default status for new tours
})

// For Agent/Client selection
const isAgentModalOpen = ref(false)
const isClientModalOpen = ref(false)
const availableAgents = ref([])
const availableClients = ref([])
const selectedAgents = ref([]) // Store full agent objects for display
const selectedClients = ref([]) // Store full client objects for display

// Confirmation Dialog
const showConfirmation = ref(false)
const confirmationTitle = ref('')
const confirmationMessage = ref('')
const pendingAction = ref(null)
const pendingCancelAction = ref(null)

// File input ref
const fileInput = ref(null)

// Add a flag to track form changes and interaction
const hasFormChanges = ref(false)
const hasInteracted = ref(false)

// Store initial form state to compare against
const initialFormState = ref({})

// Set up the initial form state after the form is loaded/populated
const saveInitialFormState = () => {
  initialFormState.value = {
    title: tourData.title,
    startDate: tourData.startDate,
    startTime: tourData.startTime,
    endDate: tourData.endDate,
    endTime: tourData.endTime,
    notes: tourData.notes,
    priority: tourData.priority,
    agents: JSON.stringify(tourData.agents),
    clients: JSON.stringify(tourData.clients),
    attachments: JSON.stringify(tourData.attachments)
  }

  // Initialize flags as false after saving initial state
  hasFormChanges.value = false
  hasInteracted.value = false
}

// Check if form has actual content that would be worth saving
const hasActualContent = () => {
  return (
    tourData.title.trim() !== '' ||
    tourData.notes.trim() !== '' ||
    tourData.agents.length > 0 ||
    tourData.clients.length > 0 ||
    tourData.attachments.length > 0
  )
}

// Compare current form state with initial state
const hasStateChanged = () => {
  return (
    tourData.title !== initialFormState.value.title ||
    tourData.startDate !== initialFormState.value.startDate ||
    tourData.startTime !== initialFormState.value.startTime ||
    tourData.endDate !== initialFormState.value.endDate ||
    tourData.endTime !== initialFormState.value.endTime ||
    tourData.notes !== initialFormState.value.notes ||
    tourData.priority !== initialFormState.value.priority ||
    JSON.stringify(tourData.agents) !== initialFormState.value.agents ||
    JSON.stringify(tourData.clients) !== initialFormState.value.clients ||
    JSON.stringify(tourData.attachments) !== initialFormState.value.attachments
  )
}

// Track form changes and interaction
watch(tourData, () => {
  // Only consider form changed if there is actual content or the state has changed
  if (hasActualContent() && hasStateChanged()) {
    hasFormChanges.value = true
    hasInteracted.value = true
  }
}, { deep: true })

// Reset interaction flag on mount
onMounted(() => {
  // After default values are set
  setTimeout(() => {
    saveInitialFormState()
  }, 100)
})

// Save initial state after existing tour data is loaded
watch([isEditMode, loading], () => {
  if (!loading.value) {
    setTimeout(() => {
      saveInitialFormState()
    }, 100)
  }
})

// Manually track form interaction on user inputs
const formInputChange = () => {
  // Only update if there's actual content worth saving
  if (hasActualContent() && hasStateChanged()) {
    hasInteracted.value = true
    hasFormChanges.value = true
  }
}

// Add a proper navigation guard when the component is mounted
const navigationGuard = ref(null)
let isNavigating = ref(false)

onMounted(() => {
  // Register the navigation guard and store the remove function
  navigationGuard.value = router.beforeEach((to, from, next) => {
    // Skip confirmation if we're already navigating after user decision
    if (isNavigating.value) {
      isNavigating.value = false
      next()
      return
    }

    if (hasInteracted.value) {
      // Show confirmation dialog
      openConfirmation(
        'Unsaved Changes',
        'You have made changes to this form. Do you want to save as draft before leaving?',
        () => {
          // YES - Save before navigating
          saveDraft().then(() => {
            isNavigating.value = true
            next()
          }).catch(() => {
            next(false) // If save fails, stay on page
          })
        },
        () => {
          // NO - Discard changes and navigate
          isNavigating.value = true
          next()
        }
      )
      return false // Prevent navigation until dialog is answered
    }
    next() // No changes, allow navigation
  })

  // Set default dates to today
  tourData.startDate = todayDate.value
  tourData.endDate = todayDate.value

  // Set default times
  const now = new Date()
  const hours = now.getHours().toString().padStart(2, '0')
  const minutes = now.getMinutes().toString().padStart(2, '0')
  tourData.startTime = `${hours}:${minutes}`

  // Set end time 1 hour later
  const endHour = (now.getHours() + 1) % 24
  tourData.endTime = `${endHour.toString().padStart(2, '0')}:${minutes}`
})

onMounted(async () => {
  loading.value = true
  errorMessage.value = ''
  try {
    // Fetch available agents and clients (replace with actual API calls/store actions)
    availableAgents.value = []
    availableClients.value = []

    console.log("Checking route params:", route.params);
    // Check if in edit mode
    if (route.params.id) {
      isEditMode.value = true
      tourId.value = route.params.id
      const existingTour = await tourStore.getTourById(tourId.value) // Ensure store has async fetch or loads data initially
      if (existingTour) {
        // Populate form data
        tourData.title = existingTour.title || ''
        tourData.startDate = existingTour.startDate ? existingTour.startDate.split('T')[0] : '' // Format date if exists
        tourData.startTime = existingTour.startTime || '' // Assuming time is stored directly
        tourData.endDate = existingTour.endDate ? existingTour.endDate.split('T')[0] : '' // Format date if exists
        tourData.endTime = existingTour.endTime || '' // Assuming time is stored directly
        tourData.notes = existingTour.notes || ''
        tourData.priority = existingTour.priority || 'medium'
        tourData.agents = existingTour.agents || []
        tourData.clients = existingTour.clients || []
        tourData.attachments = existingTour.attachments || []
        tourData.status = existingTour.status || 'scheduled'

        // Populate selected agents/clients based on IDs
        selectedAgents.value = availableAgents.value.filter(agent => tourData.agents.includes(agent.id))
        selectedClients.value = availableClients.value.filter(client => tourData.clients.includes(client.id))

      } else {
        errorMessage.value = 'Tour not found.'
        // Optionally redirect or show a more prominent error
      }
    } else {
       // Set default date if needed for create mode
       // tourData.date = todayDate.value;
    }
  } catch (error) {
    console.error('Error initializing tour form:', error)
    errorMessage.value = 'Failed to load tour data or resources. Please try again.'
    // Handle specific errors for agent/client fetching if needed
  } finally {
    loading.value = false
  }
})

// --- Methods ---

// Navigation
const handleBack = () => {
  if (hasInteracted.value) {
    openConfirmation(
      'Unsaved Changes',
      'You have made changes to this form. Do you want to save as draft before leaving?',
      () => {
        // YES - Save before navigating back
        saveDraft().then(() => {
          isNavigating.value = true
          router.go(-1)
        })
      },
      () => {
        // NO - Discard changes and navigate back
        isNavigating.value = true
        router.go(-1)
      }
    )
  } else {
    router.go(-1)
  }
}

// Agent Modal Handling
const openAgentModal = () => { isAgentModalOpen.value = true }
const closeAgentModal = () => { isAgentModalOpen.value = false }
const handleAgentSelect = (agent) => {
  if (!selectedAgents.value.some(a => a.id === agent.id)) {
    selectedAgents.value.push(agent)
    tourData.agents = selectedAgents.value.map(a => a.id) // Update agent IDs in tourData
  }
}
const removeAgent = (agentToRemove) => {
  selectedAgents.value = selectedAgents.value.filter(agent => agent.id !== agentToRemove.id)
  tourData.agents = selectedAgents.value.map(a => a.id) // Update agent IDs in tourData
}

// Client Modal Handling
const openClientModal = () => { isClientModalOpen.value = true }
const closeClientModal = () => { isClientModalOpen.value = false }
const handleClientSelect = (client) => {
  if (!selectedClients.value.some(c => c.id === client.id)) {
    selectedClients.value.push(client)
    tourData.clients = selectedClients.value.map(c => c.id) // Update client IDs in tourData
  }
}
const removeClient = (clientToRemove) => {
  selectedClients.value = selectedClients.value.filter(client => client.id !== clientToRemove.id)
  tourData.clients = selectedClients.value.map(c => c.id) // Update client IDs in tourData
}

// File Handling
const triggerFileInput = () => {
  fileInput.value.click()
}

const handleFileUpload = (event) => {
  const files = Array.from(event.target.files)
  files.forEach(file => {
    // Basic validation (optional)
    const allowedTypes = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.txt', '.jpg', '.jpeg', '.png', '.gif', '.zip', '.rar']
    const maxSize = 5 * 1024 * 1024 // 5MB

    if (tourData.attachments.some(existingFile => existingFile.name === file.name)) {
        alert(`File "${file.name}" is already added.`)
        return;
    }

    if (!allowedTypes.some(type => file.name.toLowerCase().endsWith(type))) {
        alert(`File type for "${file.name}" is not allowed.`);
        return;
    }

    if (file.size > maxSize) {
        alert(`File "${file.name}" exceeds the size limit of 5MB.`);
        return;
    }

    // Store metadata only, not the full file object
    tourData.attachments.push({
        name: file.name,
        size: file.size,
        type: file.type
    })
  })
  // Clear the input value to allow selecting the same file again
  fileInput.value.value = ''
}

const removeFile = (index) => {
  tourData.attachments.splice(index, 1)
}

// Form Submission
const handleSubmit = async () => {
  loading.value = true
  errorMessage.value = ''

  const tourPayload = {
    title: tourData.title,
    startDate: tourData.startDate,
    startTime: tourData.startTime,
    endDate: tourData.endDate,
    endTime: tourData.endTime,
    notes: tourData.notes,
    priority: tourData.priority,
    status: tourData.status,
    agents: selectedAgents.value.map(a => a.id),
    clients: selectedClients.value.map(c => c.id),
    attachments: tourData.attachments // Already storing just the metadata
  }

  try {
    let newTourId = null
    if (isEditMode.value) {
      const success = await tourStore.updateTour(tourId.value, tourPayload)
      if (success) {
        router.push(`/tours/${tourId.value}`) // Go to tour detail page
    } else {
        errorMessage.value = 'Failed to update tour. Please try again.'
      }
    } else {
      // Ensure status is suitable for creation
      tourPayload.status = 'scheduled';
      newTourId = await tourStore.createTour(tourPayload)
      if (newTourId) {
         router.push(`/tours`) // Go back to tour list after creation
      } else {
        errorMessage.value = 'Failed to create tour. Please try again.'
      }
    }
  } catch (error) {
    console.error('Error submitting tour:', error)
    errorMessage.value = `An error occurred: ${error.message || 'Please try again.'}`
  } finally {
    loading.value = false
  }
}

// Save as Draft
const saveDraft = async () => {
    loading.value = true
    errorMessage.value = ''

    const draftPayload = {
        title: tourData.title,
        startDate: tourData.startDate,
        startTime: tourData.startTime,
        endDate: tourData.endDate,
        endTime: tourData.endTime,
        notes: tourData.notes,
        priority: tourData.priority,
        agents: selectedAgents.value.map(a => a.id),
        clients: selectedClients.value.map(c => c.id),
        attachments: tourData.attachments, // Already storing just the metadata
        status: 'draft' // Explicitly set status to draft
    }

    try {
        let draftId = null;
        if (isEditMode.value && tourData.status === 'draft') {
             // If editing an existing draft, update it
             const success = await tourStore.updateTour(tourId.value, draftPayload);
             if (success) {
                 draftId = tourId.value;
             } else {
                  errorMessage.value = 'Failed to update draft. Please try again.';
                  loading.value = false;
                  return;
             }
        } else {
             // Create a new draft
            draftId = await tourStore.createTour(draftPayload);
        }

        if (draftId) {
            router.push('/tours/drafts'); // Navigate to drafts list
        } else {
            errorMessage.value = 'Failed to save draft. Please try again.';
    }
  } catch (error) {
        console.error('Error saving draft:', error);
        errorMessage.value = `An error occurred while saving draft: ${error.message || 'Please try again.'}`;
    } finally {
        loading.value = false;
    }
}

// Confirmation Dialog Logic
const openConfirmation = (title, message, yesAction, noAction) => {
  confirmationTitle.value = title
  confirmationMessage.value = message
  pendingAction.value = yesAction // "Yes" action
  pendingCancelAction.value = noAction // "No" action
  showConfirmation.value = true
}

const closeConfirmation = () => {
  // When clicking outside, stay on the current page
  showConfirmation.value = false
}

const handleNoAction = () => {
  // "No" button action - don't save, execute the no action
  showConfirmation.value = false

  if (pendingCancelAction.value) {
    pendingCancelAction.value()
  }
}

const confirmAction = () => {
  // "Yes" button action - save and continue
  showConfirmation.value = false

  if (pendingAction.value) {
    pendingAction.value()
  }
}

// Handle broken avatar images
const handleAvatarError = (event) => {
  event.target.src = defaultAvatar
}

// Clean up the navigation guard when component is unmounted
onBeforeUnmount(() => {
  // Remove the navigation guard if it exists
  if (navigationGuard.value) {
    navigationGuard.value()
  }
})

// --- Computed Properties ---
const todayDate = computed(() => {
  const today = new Date()
  return today.toISOString().split('T')[0]
})

</script>

<style scoped>
/* Base styles */
.tour-create {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Ensure it takes full height */
   background-color: #f9fafb; /* Match background */
}

/* Header */
.tour-create__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #ffffff;
  border-bottom: 1px solid #e5e7eb;
}

.tour-create__nav {
  display: flex;
  align-items: center;
}

.tour-create__back {
  background: none;
  border: none;
  font-size: 1.125rem; /* 18px */
  font-weight: 600;
  color: #1f2937; /* gray-800 */
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0;
  margin-right: 1rem;
}

.tour-create__back-arrow {
  margin-right: 0.5rem;
  font-size: 1.5rem;
  line-height: 1;
}

.tour-create__subtitle {
  font-size: 0.875rem; /* 14px */
  color: #6b7280; /* gray-500 */
}

.tour-create__profile {
  display: flex;
  align-items: center;
}

.tour-create__icon-btn {
  background: none;
  border: none;
  padding: 0.5rem;
  margin-left: 1rem;
  cursor: pointer;
  color: #6b7280; /* gray-500 */
}

.tour-create__icon {
  width: 1.5rem; /* 24px */
  height: 1.5rem;
}

.tour-create__user {
  display: flex;
  align-items: center;
  margin-left: 1rem;
  position: relative; /* For potential dropdown */
}

.tour-create__avatar {
  width: 2.5rem; /* 40px */
  height: 2.5rem;
  border-radius: 50%;
  margin-right: 0.75rem;
  object-fit: cover;
}

.tour-create__username {
  font-weight: 500;
  color: #374151; /* gray-700 */
}

.tour-create__dropdown-icon {
  width: 1.25rem; /* 20px */
  height: 1.25rem;
  color: #9ca3af; /* gray-400 */
  margin-left: 0.25rem;
}


/* Loading Skeleton */
.tour-create__loading-skeleton {
  padding: 2rem;
}

.tour-create__skeleton-title {
  height: 2.5rem;
  width: 40%;
  background-color: #e5e7eb;
  border-radius: 0.375rem;
  margin-bottom: 2rem;
}

.tour-create__skeleton-form {
  display: grid;
  gap: 1.5rem;
}

.tour-create__skeleton-group {
  display: grid;
  gap: 0.5rem;
}

.tour-create__skeleton-label {
  height: 1rem;
  width: 30%;
  background-color: #e5e7eb;
  border-radius: 0.25rem;
}

.tour-create__skeleton-input,
.tour-create__skeleton-select {
  height: 2.5rem;
  width: 100%;
  background-color: #e5e7eb;
  border-radius: 0.375rem;
}

.tour-create__skeleton-textarea {
  height: 6rem;
  width: 100%;
  background-color: #e5e7eb;
  border-radius: 0.375rem;
}

.tour-create__skeleton-cards {
   height: 4rem;
   width: 100%;
   background-color: #e5e7eb;
   border-radius: 0.375rem;
}

/* Main Content & Form */
.tour-create__content {
  padding: 2rem;
  max-width: 800px; /* Limit form width */
  margin: 2rem auto; /* Center form with space from header */
  width: 90%; /* Responsive width */
  background-color: #ffffff;
  border-radius: 0.5rem; /* 8px */
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}

.tour-create__title {
  font-size: 1.875rem; /* 30px */
  font-weight: 700;
  color: #111827; /* gray-900 */
  margin-bottom: 1.5rem;
}

.tour-create__form {
  display: grid;
  gap: 1.5rem;
}

.tour-create__form-group {
  display: flex;
  flex-direction: column;
}

.tour-create__label {
  font-size: 0.875rem; /* 14px */
  font-weight: 500;
  color: #374151; /* gray-700 */
  margin-bottom: 0.5rem;
}

.tour-create__input,
.tour-create__select,
.tour-create__textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db; /* gray-300 */
  border-radius: 0.375rem; /* 6px */
  font-size: 1rem;
  color: #111827; /* gray-900 */
  background-color: #ffffff;
  box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.05);
  transition: border-color 0.2s ease-in-out;
}

.tour-create__input::placeholder,
.tour-create__textarea::placeholder {
  color: #9ca3af; /* gray-400 */
}

.tour-create__input:focus,
.tour-create__select:focus,
.tour-create__textarea:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
  border-color: #3b82f6; /* blue-500 */
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.4);
}

.tour-create__datetime-group {
  display: flex;
  gap: 1.5rem;
}

.task-create__form-group--half {
    flex: 1; /* Make date/time inputs share space */
}


/* Agent/Client Selection Trigger */
.tour-create__select-trigger {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 1rem;
  color: #6b7280; /* Default text color */
  background-color: #ffffff;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 42px; /* Match input height */
}

.tour-create__select-trigger span:first-child {
   color: #111827; /* Darker text when items are selected */
   font-weight: 500;
}

/* Selected Agent/Client Preview */
.tour-create__selected-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1rem;
}

.tour-create__selected-item {
  display: flex;
  align-items: center;
  background-color: #e5e7eb; /* gray-200 */
  border-radius: 9999px; /* Pill shape */
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
}

.tour-create__selected-avatar {
  width: 1.5rem; /* 24px */
  height: 1.5rem;
  border-radius: 50%;
  margin-right: 0.5rem;
  object-fit: cover;
}

.tour-create__selected-name {
  color: #374151; /* gray-700 */
  font-weight: 500;
}

.tour-create__selected-remove {
  background: none;
  border: none;
  color: #6b7280; /* gray-500 */
  font-size: 1.125rem;
  line-height: 1;
  margin-left: 0.5rem;
  cursor: pointer;
  padding: 0;
}
.tour-create__selected-remove:hover {
  color: #1f2937; /* gray-800 */
}


/* Attachment Section */
.tour-create__section {
  margin-top: 1rem; /* Add some space above the section */
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb; /* Separator */
}

.tour-create__section-title {
  font-size: 1.125rem; /* 18px */
  font-weight: 600;
  color: #1f2937; /* gray-800 */
  margin-bottom: 1rem;
}

.tour-create__file-upload {
  position: relative; /* For absolute positioning of the input */
  margin-bottom: 1rem;
}

.tour-create__file-input {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.tour-create__upload-btn {
  display: inline-flex;
  align-items: center;
  padding: 0.625rem 1.25rem; /* 10px 20px */
  background-color: #4f46e5; /* indigo-600 */
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  font-size: 0.875rem; /* 14px */
  cursor: pointer;
  transition: background-color 0.2s;
}

.tour-create__upload-btn:hover {
  background-color: #4338ca; /* indigo-700 */
}

.tour-create__upload-icon {
  width: 1.25rem; /* 20px */
  height: 1.25rem;
  margin-right: 0.5rem;
}

/* File List */
.tour-create__file-list {
  margin-top: 1rem;
  display: grid;
  gap: 0.75rem;
}

.tour-create__file-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background-color: #f3f4f6; /* gray-100 */
  border: 1px solid #e5e7eb; /* gray-200 */
  border-radius: 0.375rem;
}

.tour-create__file-name {
  font-size: 0.875rem;
  color: #374151;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 1rem; /* Space before remove button */
}

.tour-create__file-remove {
  background: none;
  border: none;
  color: #ef4444; /* red-500 */
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  padding: 0.25rem;
   line-height: 1;
}

.tour-create__file-remove:hover {
  color: #dc2626; /* red-600 */
}


/* Action Buttons */
.tour-create__actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb; /* Separator */
}

.tour-create__btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.375rem;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s, color 0.2s;
}

.tour-create__btn--primary {
  background-color: #2563eb; /* blue-600 */
  color: white;
}
.tour-create__btn--primary:hover {
  background-color: #1d4ed8; /* blue-700 */
}

.tour-create__btn--secondary {
  background-color: #ffffff;
  color: #374151; /* gray-700 */
  border: 1px solid #d1d5db; /* gray-300 */
}
.tour-create__btn--secondary:hover {
  background-color: #f9fafb; /* gray-50 */
  border-color: #9ca3af; /* gray-400 */
}


/* Confirmation Dialog */
.tour-create__dialog-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50; /* Ensure it's above other content */
}

.tour-create__dialog {
  background-color: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  max-width: 400px;
  width: 90%;
}

.tour-create__dialog-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 1rem;
}

.tour-create__dialog-text {
  font-size: 1rem;
  color: #4b5563;
  margin-bottom: 1.5rem;
}

.tour-create__dialog-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.tour-create__dialog-btn {
   padding: 0.625rem 1.25rem;
   border-radius: 0.375rem;
  font-weight: 500;
   font-size: 0.875rem;
  cursor: pointer;
}
.tour-create__dialog-btn--primary {
  background-color: #dc2626; /* red-600 */
  color: white;
  border: none;
}
.tour-create__dialog-btn--primary:hover {
  background-color: #b91c1c; /* red-700 */
}
.tour-create__dialog-btn--secondary {
   background-color: #ffffff;
  color: #374151;
   border: 1px solid #d1d5db;
}
.tour-create__dialog-btn--secondary:hover {
   background-color: #f9fafb;
}

/* Error Message */
.tour-create__error-message {
  margin-top: 1rem;
  color: #dc2626; /* red-600 */
  background-color: #fee2e2; /* red-100 */
  border: 1px solid #fca5a5; /* red-300 */
  padding: 0.75rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
}
</style>
