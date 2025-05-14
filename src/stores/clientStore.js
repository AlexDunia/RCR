// src/stores/clientStore.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useClientStore = defineStore('client', () => {
  // State
  const favoriteClients = ref([
    {
      id: 1,
      name: 'Emily R. Thompson',
      propertyType: 'Looking for Luxury Home',
      location: 'Seattle, USA',
      budget: '$1M - $2M',
      avatar: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1746790261/300_e7yggy.jpg',
      isConnected: true
    },
    {
      id: 2,
      name: 'David Martinez',
      propertyType: 'Seeking Investment Property',
      location: 'Miami, USA',
      budget: '$500K - $800K',
      avatar: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1746790261/300_1_gdilxy.jpg',
      isConnected: false
    },
    {
      id: 3,
      name: 'Sophie Wang',
      propertyType: 'First-Time Buyer',
      location: 'Portland, USA',
      budget: '$300K - $450K',
      avatar: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1746790260/300_3_inul8p.jpg',
      isConnected: true
    }
  ])

  const connectionRequests = ref([
    {
      id: 4,
      clientId: 4,
      name: 'Robert Wilson',
      propertyType: 'Luxury Condo',
      location: 'Chicago, USA',
      budget: '$800K - $1.2M',
      avatar: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1746790260/300_2_rfyiva.jpg',
      status: 'pending'
    }
  ])

  const clients = ref([
    {
      id: 1,
      name: 'Emily R. Thompson',
      email: 'emily.thompson@example.com',
      location: 'Seattle, USA',
      profilePicture: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1746790261/300_e7yggy.jpg',
      avatar: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1746790261/300_e7yggy.jpg',
      preferences: ['Luxury Homes', 'Waterfront View'],
      budget: '$1M - $2M',
      searchStatus: 'active',
      bio: 'Looking for a luxury waterfront property in the Seattle area.',
      propertyViews: [{ id: 1, date: '2024-03-15' }, { id: 2, date: '2024-03-16' }]
    },
    {
      id: 2,
      name: 'David Martinez',
      email: 'david.martinez@example.com',
      location: 'Miami, USA',
      profilePicture: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1746790261/300_1_gdilxy.jpg',
      avatar: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1746790261/300_1_gdilxy.jpg',
      preferences: ['Investment Property', 'Commercial'],
      budget: '$500K - $800K',
      searchStatus: 'active',
      bio: 'Investor looking for commercial properties with good ROI potential.',
      propertyViews: [{ id: 1, date: '2024-03-14' }, { id: 2, date: '2024-03-15' }]
    },
    {
      id: 3,
      name: 'Sophie Wang',
      email: 'sophie.wang@example.com',
      location: 'Portland, USA',
      profilePicture: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1746790260/300_3_inul8p.jpg',
      avatar: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1746790260/300_3_inul8p.jpg',
      preferences: ['Residential', 'First-Time Buyer'],
      budget: '$300K - $450K',
      searchStatus: 'active',
      bio: 'First-time homebuyer looking for a cozy residential property.',
      propertyViews: [{ id: 1, date: '2024-03-13' }, { id: 2, date: '2024-03-14' }]
    },
    {
      id: 4,
      name: 'Robert Wilson',
      email: 'robert.wilson@example.com',
      location: 'Chicago, USA',
      profilePicture: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1746790260/300_2_rfyiva.jpg',
      avatar: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1746790260/300_2_rfyiva.jpg',
      preferences: ['Luxury Condos', 'City Center'],
      budget: '$800K - $1.2M',
      searchStatus: 'active',
      bio: 'Seeking a luxury condo in downtown Chicago with modern amenities.',
      propertyViews: [{ id: 1, date: '2024-03-12' }, { id: 2, date: '2024-03-13' }]
    }
  ])

  // Client interactions tracking
  const clientInteractions = ref({})

  // Getters
  const networkClients = computed(() => {
    return favoriteClients.value.filter(client => client.isConnected)
  })

  const otherClients = computed(() => {
    return favoriteClients.value.filter(client => !client.isConnected)
  })

  // Actions
  function toggleFavorite(clientId) {
    const index = favoriteClients.value.findIndex(client => client.id === clientId)
    if (index !== -1) {
      favoriteClients.value.splice(index, 1)
    } else {
      favoriteClients.value.push({
        id: clientId,
        name: 'New Client',
        propertyType: 'Residential',
        location: 'New York, USA',
        budget: '$400K - $600K',
        avatar: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1746790261/300_e7yggy.jpg',
        isConnected: false
      })
    }
  }

  function sendConnectionRequest(clientId) {
    const client = favoriteClients.value.find(client => client.id === clientId)
    if (client) {
      connectionRequests.value.push({
        id: Date.now(),
        clientId: clientId,
        name: client.name,
        propertyType: client.propertyType,
        location: client.location,
        budget: client.budget,
        avatar: client.avatar,
        status: 'pending'
      })
    }
  }

  function acceptConnection(requestId) {
    const request = connectionRequests.value.find(req => req.id === requestId)
    if (request) {
      const client = favoriteClients.value.find(client => client.id === request.clientId)
      if (client) {
        client.isConnected = true
      }
      const index = connectionRequests.value.findIndex(req => req.id === requestId)
      if (index !== -1) {
        connectionRequests.value.splice(index, 1)
      }
    }
  }

  function rejectConnection(requestId) {
    const index = connectionRequests.value.findIndex(req => req.id === requestId)
    if (index !== -1) {
      connectionRequests.value.splice(index, 1)
    }
  }

  function getAllClients() {
    return clients.value
  }

  function getClientById(id) {
    const numericId = typeof id === 'string' ? parseInt(id, 10) : id
    return clients.value.find(client => client.id === numericId) || null
  }

  function getClientFullDetails(clientId) {
    const client = getClientById(clientId)
    if (!client) return null

    return {
      ...client,
      interactions: clientInteractions.value[clientId] || []
    }
  }

  async function fetchClients() {
    console.log('Fetching clients data...')
    return new Promise(resolve => {
      setTimeout(() => {
        console.log('Clients data fetched successfully')
        resolve(clients.value)
      }, 500)
    })
  }

  function updateClientStatus(clientId, status) {
    const client = clients.value.find(c => c.id === clientId)
    if (client) {
      client.searchStatus = status
    }
  }

  function addClient(clientData) {
    const newId = clients.value.length + 1
    const newClient = {
      id: newId,
      ...clientData,
      searchStatus: 'active'
    }
    clients.value.push(newClient)
    return newClient
  }

  function updateClient(clientId, updates) {
    const client = clients.value.find(c => c.id === clientId)
    if (client) {
      Object.assign(client, updates)
      return true
    }
    return false
  }

  return {
    // State
    favoriteClients,
    connectionRequests,
    clients,
    clientInteractions,

    // Getters
    networkClients,
    otherClients,

    // Actions
    toggleFavorite,
    sendConnectionRequest,
    acceptConnection,
    rejectConnection,
    getAllClients,
    getClientById,
    getClientFullDetails,
    fetchClients,
    updateClientStatus,
    addClient,
    updateClient
  }
})
