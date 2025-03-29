// src/stores/clientStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useListingStore } from './listingStore'
import { useDocumentStore } from './documents'
import { useAgentStore } from './agentStore'
import { useTourStore } from './tourStore'
import { useTaskStore } from './taskStore'

export const useClientStore = defineStore('clientStore', () => {
  // State
  const clients = ref([
    // Sample client data
    {
      id: 1,
      name: 'Alex Dunia',
      email: 'alex.dunia@example.com',
      profilePicture: 'https://randomuser.me/api/portraits/men/32.jpg',
      bio: 'Looking for luxury real estate properties.',
      status: 'active',
      location: 'Columbia, USA',
      specialty: 'Luxury Real Estate'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      profilePicture: 'https://randomuser.me/api/portraits/women/42.jpg',
      bio: 'Interested in investment properties in the downtown area.',
      status: 'active',
      interests: ['Investment Properties', 'Downtown']
    },
    {
      id: 3,
      name: 'Robert Johnson',
      email: 'robert.johnson@example.com',
      profilePicture: 'https://randomuser.me/api/portraits/men/65.jpg',
      bio: 'Looking for luxury waterfront properties.',
      status: 'active',
      interests: ['Luxury Homes', 'Waterfront']
    },
    {
      id: 4,
      name: 'Maria Garcia',
      email: 'maria.garcia@example.com',
      profilePicture: 'https://randomuser.me/api/portraits/women/28.jpg',
      bio: 'First-time homebuyer looking for a condo.',
      status: 'active',
      interests: ['Condos', 'First-Time Buyer']
    },
    {
      id: 5,
      name: 'James Wilson',
      email: 'james.wilson@example.com',
      profilePicture: 'https://randomuser.me/api/portraits/men/55.jpg',
      bio: 'Relocating from out of state, looking for a quick move-in.',
      status: 'active',
      interests: ['New Construction', 'Quick Move-in']
    },
    {
      id: 6,
      name: 'Emily Chen',
      email: 'emily.chen@example.com',
      profilePicture: 'https://randomuser.me/api/portraits/women/36.jpg',
      bio: 'Looking for a property with rental potential.',
      status: 'inactive',
      interests: ['Investment Properties', 'Rentals']
    }
  ])

  // Client interactions - stored by ID references only for scalability
  const clientInteractions = ref({
    // Example: clientId -> interaction data
    1: {
      mostViewedListings: [101, 102, 103], // Listing IDs
      mostSavedListings: [102, 105],       // Listing IDs
      sharedDocuments: [1, 2],             // Document IDs
      connectedAgents: [5, 8],             // Agent IDs
      connectedClients: [2, 3],            // Other client IDs (referrals, family members, etc.)
      attendedTours: [201, 202],           // Tour IDs
      assignedTasks: [301, 302]            // Task IDs
    },
    2: {
      mostViewedListings: [103, 105],
      mostSavedListings: [103],
      sharedDocuments: [1],
      connectedAgents: [5],
      connectedClients: [1, 4],
      attendedTours: [201],
      assignedTasks: [301]
    },
    3: {
      mostViewedListings: [102, 103],
      mostSavedListings: [103],
      sharedDocuments: [],
      connectedAgents: [8],
      connectedClients: [1],
      attendedTours: [],
      assignedTasks: []
    },
    4: {
      mostViewedListings: [101],
      mostSavedListings: [101],
      sharedDocuments: [2],
      connectedAgents: [5],
      connectedClients: [2],
      attendedTours: [202],
      assignedTasks: [302]
    },
    5: {
      mostViewedListings: [102, 105],
      mostSavedListings: [105],
      sharedDocuments: [],
      connectedAgents: [],
      connectedClients: [],
      attendedTours: [],
      assignedTasks: []
    },
    6: {
      mostViewedListings: [103],
      mostSavedListings: [],
      sharedDocuments: [],
      connectedAgents: [8],
      connectedClients: [],
      attendedTours: [],
      assignedTasks: []
    }
  })

  // Utility function to create empty interactions object
  function initClientInteractions(clientId) {
    if (!clientInteractions.value[clientId]) {
      clientInteractions.value[clientId] = {
        mostViewedListings: [],
        mostSavedListings: [],
        sharedDocuments: [],
        connectedAgents: [],
        connectedClients: [],
        attendedTours: [],
        assignedTasks: []
      }
    }
    return clientInteractions.value[clientId]
  }

  // Getters
  const getClientById = (id) => {
    return clients.value.find(client => client.id === id)
  }

  const getClientFullDetails = (id) => {
    const client = getClientById(id)

    if (!client) return null

    const interactions = clientInteractions.value[id] || {
      mostViewedListings: [],
      mostSavedListings: [],
      sharedDocuments: [],
      connectedAgents: [],
      connectedClients: [],
      attendedTours: [],
      assignedTasks: []
    }

    // Get references to other stores
    const listingStore = useListingStore()
    const documentStore = useDocumentStore()
    const agentStore = useAgentStore()
    const tourStore = useTourStore()
    const taskStore = useTaskStore()

    // Map IDs to full objects from their respective stores
    const fullDetails = {
      ...client,
      interactions: {
        mostViewedListings: interactions.mostViewedListings.map(listingId =>
          listingStore.getListingById(listingId)
        ).filter(Boolean),

        mostSavedListings: interactions.mostSavedListings.map(listingId =>
          listingStore.getListingById(listingId)
        ).filter(Boolean),

        sharedDocuments: interactions.sharedDocuments.map(docId =>
          documentStore.getDocument(docId)
        ).filter(Boolean),

        connectedAgents: interactions.connectedAgents.map(agentId =>
          agentStore.getAgentById(agentId)
        ).filter(Boolean),

        connectedClients: interactions.connectedClients.map(clientId =>
          getClientById(clientId)
        ).filter(Boolean),

        attendedTours: interactions.attendedTours.map(tourId =>
          tourStore.getTourById(tourId)
        ).filter(Boolean),

        assignedTasks: interactions.assignedTasks.map(taskId =>
          taskStore.getTaskById(taskId)
        ).filter(Boolean)
      }
    }

    return fullDetails
  }

  // Helper method to generate unique client ID
  function generateClientId() {
    return Math.max(0, ...clients.value.map(client => client.id)) + 1
  }

  // Actions
  function addClient(client) {
    const newClient = {
      id: generateClientId(),
      ...client
    }

    clients.value.push(newClient)

    // Initialize empty interactions record
    initClientInteractions(newClient.id)

    return newClient.id
  }

  function updateClient(id, updates) {
    const clientIndex = clients.value.findIndex(client => client.id === id)

    if (clientIndex !== -1) {
      clients.value[clientIndex] = {
        ...clients.value[clientIndex],
        ...updates
      }
      return true
    }

    return false
  }

  function trackListingView(clientId, listingId) {
    const interactions = initClientInteractions(clientId)

    // Add to viewed listings if not already there
    if (!interactions.mostViewedListings.includes(listingId)) {
      interactions.mostViewedListings.push(listingId)
    }
  }

  function saveListingForClient(clientId, listingId) {
    const interactions = initClientInteractions(clientId)

    // Add to saved listings if not already there
    if (!interactions.mostSavedListings.includes(listingId)) {
      interactions.mostSavedListings.push(listingId)
      return true
    }

    return false
  }

  function shareDocument(clientId, documentId) {
    const interactions = initClientInteractions(clientId)

    if (!interactions.sharedDocuments.includes(documentId)) {
      interactions.sharedDocuments.push(documentId)
      return true
    }

    return false
  }

  function connectAgent(clientId, agentId) {
    const interactions = initClientInteractions(clientId)

    if (!interactions.connectedAgents.includes(agentId)) {
      interactions.connectedAgents.push(agentId)
      return true
    }

    return false
  }

  function connectClients(clientId1, clientId2) {
    // Initialize if needed
    const interactions1 = initClientInteractions(clientId1)
    const interactions2 = initClientInteractions(clientId2)

    // Create bidirectional connection
    let updated = false

    if (!interactions1.connectedClients.includes(clientId2)) {
      interactions1.connectedClients.push(clientId2)
      updated = true
    }

    if (!interactions2.connectedClients.includes(clientId1)) {
      interactions2.connectedClients.push(clientId1)
      updated = true
    }

    return updated
  }

  function addTourAttendance(clientId, tourId) {
    const interactions = initClientInteractions(clientId)

    if (!interactions.attendedTours.includes(tourId)) {
      interactions.attendedTours.push(tourId)
      return true
    }

    return false
  }

  function assignTask(clientId, taskId) {
    const interactions = initClientInteractions(clientId)

    if (!interactions.assignedTasks.includes(taskId)) {
      interactions.assignedTasks.push(taskId)
      return true
    }

    return false
  }

  return {
    // State - return refs directly for reactivity
    clients,
    clientInteractions,

    // Getters
    getClientById,
    getClientFullDetails,

    // Actions
    addClient,
    updateClient,
    trackListingView,
    saveListingForClient,
    shareDocument,
    connectAgent,
    connectClients,
    addTourAttendance,
    assignTask
  }
})
