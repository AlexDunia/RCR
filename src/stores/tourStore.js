import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useTourStore = defineStore('tourStore', () => {
  // State
  const tours = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  // Load tours from localStorage on initialization
  const initTours = () => {
    isLoading.value = true
    try {
      const storedTours = JSON.parse(localStorage.getItem('tours') || '[]')
      tours.value = storedTours
    } catch (err) {
      console.error('Failed to load tours from localStorage:', err)
      error.value = 'Failed to load tours'
    } finally {
      isLoading.value = false
    }
  }

  // Initialize store
  initTours()

  // Watch for changes and persist to localStorage
  watch(tours, (newTours) => {
    localStorage.setItem('tours', JSON.stringify(newTours))
  }, { deep: true })

  // Getters
  const getTourById = (id) => {
    return tours.value.find(tour => tour.id === parseInt(id))
  }

  const getToursByClient = (clientId) => {
    return tours.value.filter(tour =>
      tour.clients.includes(parseInt(clientId))
    )
  }

  const getToursByAgent = (agentId) => {
    return tours.value.filter(tour =>
      tour.agents.includes(parseInt(agentId))
    )
  }

  const getToursByStatus = (status) => {
    return tours.value.filter(tour => tour.status === status)
  }

  const getDraftTours = () => {
    return getToursByStatus('draft')
  }

  const getScheduledTours = () => {
    return getToursByStatus('scheduled')
  }

  const getCompletedTours = () => {
    return getToursByStatus('completed')
  }

  const getInProgressTours = () => {
    return getToursByStatus('in-progress')
  }

  // Actions
  function createTour(tour) {
    isLoading.value = true
    error.value = null

    try {
      const newTour = {
        id: generateTourId(),
        status: 'draft',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        completedAt: null,
        agents: [],
        agentDetails: [],
        clients: [],
        clientDetails: [],
        attachments: [],
        image: tour.image || null,
        lastEdited: null,
        ...tour
      }

      tours.value.push(newTour)
      return newTour.id
    } catch (err) {
      console.error('Failed to create tour:', err)
      error.value = 'Failed to create tour'
      return null
    } finally {
      isLoading.value = false
    }
  }

  function updateTour(id, updates) {
    isLoading.value = true
    error.value = null

    try {
      const index = tours.value.findIndex(tour => tour.id === parseInt(id))

      if (index !== -1) {
        tours.value[index] = {
          ...tours.value[index],
          ...updates,
          updatedAt: new Date().toISOString(),
          lastEdited: new Date().toISOString()
        }
        return true
      }

      return false
    } catch (err) {
      console.error('Failed to update tour:', err)
      error.value = 'Failed to update tour'
      return false
    } finally {
      isLoading.value = false
    }
  }

  function deleteTour(id) {
    isLoading.value = true
    error.value = null

    try {
      const index = tours.value.findIndex(tour => tour.id === parseInt(id))

      if (index !== -1) {
        tours.value.splice(index, 1)
        return true
      }

      return false
    } catch (err) {
      console.error('Failed to delete tour:', err)
      error.value = 'Failed to delete tour'
      return false
    } finally {
      isLoading.value = false
    }
  }

  function completeTour(id) {
    isLoading.value = true
    error.value = null

    try {
      const tour = tours.value.find(tour => tour.id === parseInt(id))

      if (tour) {
        tour.status = 'completed'
        tour.completedAt = new Date().toISOString()
        tour.updatedAt = new Date().toISOString()
        return true
      }

      return false
    } catch (err) {
      console.error('Failed to complete tour:', err)
      error.value = 'Failed to complete tour'
      return false
    } finally {
      isLoading.value = false
    }
  }

  function saveAsDraft(tour) {
    isLoading.value = true
    error.value = null

    try {
      const newTour = {
        id: generateTourId(),
        status: 'draft',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        completedAt: null,
        agents: [],
        agentDetails: [],
        clients: [],
        clientDetails: [],
        attachments: [],
        image: tour.image || null,
        lastEdited: null,
        ...tour
      }

      tours.value.push(newTour)
      return newTour.id
    } catch (err) {
      console.error('Failed to save draft:', err)
      error.value = 'Failed to save draft'
      return null
    } finally {
      isLoading.value = false
    }
  }

  function clearAllDrafts() {
    isLoading.value = true
    error.value = null

    try {
      tours.value = tours.value.filter(tour => tour.status !== 'draft')
      return true
    } catch (err) {
      console.error('Failed to clear drafts:', err)
      error.value = 'Failed to clear drafts'
      return false
    } finally {
      isLoading.value = false
    }
  }

  // Clear all tours (reset data)
  function clearAllTours() {
    isLoading.value = true
    error.value = null

    try {
      tours.value = []
      localStorage.removeItem('tours')
      return true
    } catch (err) {
      console.error('Failed to clear tours:', err)
      error.value = 'Failed to clear tours'
      return false
    } finally {
      isLoading.value = false
    }
  }

  // Helper method to generate unique tour ID
  function generateTourId() {
    return Math.max(0, ...tours.value.map(tour => tour.id)) + 1
  }

  return {
    // State
    tours,
    isLoading,
    error,

    // Initialization
    initTours,

    // Getters
    getTourById,
    getToursByClient,
    getToursByAgent,
    getToursByStatus,
    getDraftTours,
    getScheduledTours,
    getCompletedTours,
    getInProgressTours,

    // Actions
    createTour,
    updateTour,
    deleteTour,
    completeTour,
    saveAsDraft,
    clearAllDrafts,
    clearAllTours
  }
})
