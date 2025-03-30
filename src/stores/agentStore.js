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
      location: 'Columbia, USA',
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
      location: 'New York, USA',
      reviews: [
        { id: 3, clientId: 2, rating: 5, comment: 'Michael made the home buying process so easy!' },
        { id: 4, clientId: 4, rating: 4.8, comment: 'Great communication and very responsive.' }
      ]
    },
    {
      id: 10,
      name: 'Jessica Ramirez',
      email: 'jessica.ramirez@realestateagency.com',
      phone: '(555) 789-0123',
      avatar: 'https://res.cloudinary.com/example/image/upload/v123456/jessica_ramirez.jpg',
      bio: 'Passionate about helping clients find their dream homes in vibrant neighborhoods.',
      specialties: ['Historic Homes', 'Downtown Properties', 'First-Time Buyers'],
      licenseNumber: 'RE56781234',
      languages: ['English', 'Spanish', 'Portuguese'],
      averageRating: 4.7,
      location: 'Miami, USA',
      reviews: [
        { id: 5, clientId: 5, rating: 5, comment: 'Jessica was amazing throughout our entire buying process!' },
        { id: 6, clientId: 6, rating: 4.5, comment: 'Very knowledgeable about the local market.' }
      ]
    },
    {
      id: 12,
      name: 'David Thompson',
      email: 'david.thompson@realestateagency.com',
      phone: '(555) 456-7890',
      avatar: 'https://res.cloudinary.com/example/image/upload/v123456/david_thompson.jpg',
      bio: 'Specializing in luxury properties and high-end real estate investments.',
      specialties: ['Luxury Estates', 'Investment Properties', 'Commercial Real Estate'],
      licenseNumber: 'RE34567812',
      languages: ['English', 'French'],
      averageRating: 4.9,
      location: 'Los Angeles, USA',
      reviews: [
        { id: 7, clientId: 7, rating: 5, comment: 'David helped us find the perfect investment property!' },
        { id: 8, clientId: 8, rating: 4.8, comment: 'Extremely professional and knowledgeable.' }
      ]
    },
    {
      id: 15,
      name: 'Olivia Wilson',
      email: 'olivia.wilson@realestateagency.com',
      phone: '(555) 321-0987',
      avatar: 'https://res.cloudinary.com/example/image/upload/v123456/olivia_wilson.jpg',
      bio: 'Expert in suburban family homes and relocation services.',
      specialties: ['Family Homes', 'Relocation Services', 'New Constructions'],
      licenseNumber: 'RE90876543',
      languages: ['English'],
      averageRating: 4.6,
      location: 'Chicago, USA',
      reviews: [
        { id: 9, clientId: 9, rating: 4.5, comment: 'Olivia was so helpful during our relocation process.' },
        { id: 10, clientId: 10, rating: 4.7, comment: 'Found us the perfect family home in our target neighborhood.' }
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
