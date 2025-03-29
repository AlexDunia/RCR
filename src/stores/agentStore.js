import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAgentStore = defineStore('agentStore', () => {
  // State
  const agents = ref([
    {
      id: 5,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@realestateagency.com',
      phone: '(555) 123-4567',
      avatar: 'https://res.cloudinary.com/example/image/upload/v123456/sarah_johnson.jpg',
      bio: 'Experienced real estate agent specializing in luxury properties with over 10 years in the industry.',
      specialties: ['Luxury Homes', 'Waterfront Properties', 'Investment Properties'],
      licenseNumber: 'RE12345678',
      languages: ['English', 'Spanish'],
      averageRating: 4.8,
      reviews: [
        { id: 1, clientId: 1, rating: 5, comment: 'Excellent service and very knowledgeable!' },
        { id: 2, clientId: 3, rating: 4.5, comment: 'Sarah helped us find our dream home quickly.' }
      ]
    },
    {
      id: 8,
      name: 'Michael Chen',
      email: 'michael.chen@realestateagency.com',
      phone: '(555) 987-6543',
      avatar: 'https://res.cloudinary.com/example/image/upload/v123456/michael_chen.jpg',
      bio: 'Detail-oriented agent with expertise in urban properties and first-time homebuyers.',
      specialties: ['Urban Properties', 'First-Time Homebuyers', 'Condos'],
      licenseNumber: 'RE87654321',
      languages: ['English', 'Mandarin', 'Cantonese'],
      averageRating: 4.9,
      reviews: [
        { id: 3, clientId: 2, rating: 5, comment: 'Michael made the home buying process so easy!' },
        { id: 4, clientId: 4, rating: 4.8, comment: 'Great communication and very responsive.' }
      ]
    }
  ])

  // Getters
  const getAgentById = (id) => {
    return agents.value.find(agent => agent.id === id)
  }

  const getAllAgents = () => {
    return agents.value
  }

  const getTopRatedAgents = () => {
    return [...agents.value]
      .sort((a, b) => b.averageRating - a.averageRating)
      .slice(0, 3) // Return top 3 rated agents
  }

  // Actions
  function addAgent(agent) {
    const newAgent = {
      id: generateAgentId(),
      averageRating: 0,
      reviews: [],
      ...agent
    }

    agents.value.push(newAgent)
    return newAgent.id
  }

  function updateAgent(id, updates) {
    const index = agents.value.findIndex(agent => agent.id === id)

    if (index !== -1) {
      agents.value[index] = {
        ...agents.value[index],
        ...updates
      }
      return true
    }

    return false
  }

  function addReview(agentId, review) {
    const agent = agents.value.find(agent => agent.id === agentId)

    if (agent) {
      const newReview = {
        id: Math.max(0, ...agent.reviews.map(r => r.id)) + 1,
        ...review
      }

      agent.reviews.push(newReview)

      // Recalculate average rating
      agent.averageRating = agent.reviews.reduce((sum, r) => sum + r.rating, 0) / agent.reviews.length

      return newReview.id
    }

    return false
  }

  // Helper method to generate unique agent ID
  function generateAgentId() {
    return Math.max(0, ...agents.value.map(agent => agent.id)) + 1
  }

  return {
    // State
    agents,

    // Getters
    getAgentById,
    getAllAgents,
    getTopRatedAgents,

    // Actions
    addAgent,
    updateAgent,
    addReview
  }
})
