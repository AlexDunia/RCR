import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTourStore = defineStore('tourStore', () => {
  // State
  const tours = ref([
    {
      id: 201,
      listingId: 101,
      agentId: 5,
      scheduledDateTime: '2024-05-15T14:30:00',
      status: 'scheduled',
      notes: 'Client is particularly interested in the kitchen and bathroom layouts.',
      attendees: [1], // Client IDs
      feedback: {
        clientInterest: 4, // 1-5 scale
        comments: 'Client loved the property but had concerns about the street noise.',
        followUpNeeded: true
      }
    },
    {
      id: 202,
      listingId: 102,
      agentId: 8,
      scheduledDateTime: '2024-05-16T10:00:00',
      status: 'completed',
      notes: 'Client wants to see more of the neighborhood during the tour.',
      attendees: [1, 3], // Client IDs
      feedback: {
        clientInterest: 5, // 1-5 scale
        comments: 'Clients were very excited about the property and asked about making an offer.',
        followUpNeeded: true
      }
    }
  ])

  // Getters
  const getTourById = (id) => {
    return tours.value.find(tour => tour.id === id)
  }

  const getToursByClient = (clientId) => {
    return tours.value.filter(tour => tour.attendees.includes(clientId))
  }

  const getUpcomingTours = () => {
    const now = new Date()
    return tours.value
      .filter(tour => {
        const tourDate = new Date(tour.scheduledDateTime)
        return tourDate > now && tour.status === 'scheduled'
      })
      .sort((a, b) => new Date(a.scheduledDateTime) - new Date(b.scheduledDateTime))
  }

  // Actions
  function scheduleTour(tour) {
    const newTour = {
      id: generateTourId(),
      status: 'scheduled',
      feedback: {
        clientInterest: 0,
        comments: '',
        followUpNeeded: false
      },
      ...tour
    }

    tours.value.push(newTour)
    return newTour.id
  }

  function updateTour(id, updates) {
    const index = tours.value.findIndex(tour => tour.id === id)

    if (index !== -1) {
      tours.value[index] = {
        ...tours.value[index],
        ...updates
      }
      return true
    }

    return false
  }

  function cancelTour(id) {
    const tour = tours.value.find(tour => tour.id === id)

    if (tour && tour.status === 'scheduled') {
      tour.status = 'cancelled'
      return true
    }

    return false
  }

  function completeTour(id, feedback) {
    const tour = tours.value.find(tour => tour.id === id)

    if (tour && tour.status === 'scheduled') {
      tour.status = 'completed'

      if (feedback) {
        tour.feedback = {
          ...tour.feedback,
          ...feedback
        }
      }

      return true
    }

    return false
  }

  function addAttendee(tourId, clientId) {
    const tour = tours.value.find(tour => tour.id === tourId)

    if (tour) {
      if (!tour.attendees.includes(clientId)) {
        tour.attendees.push(clientId)
      }
      return true
    }

    return false
  }

  // Helper method to generate unique tour ID
  function generateTourId() {
    return Math.max(0, ...tours.value.map(tour => tour.id)) + 1
  }

  return {
    // State
    tours,

    // Getters
    getTourById,
    getToursByClient,
    getUpcomingTours,

    // Actions
    scheduleTour,
    updateTour,
    cancelTour,
    completeTour,
    addAttendee
  }
})
