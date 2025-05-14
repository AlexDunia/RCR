import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAgentStore = defineStore('agent', () => {
  // State
  const favoriteAgents = ref([
    {
      id: 1,
      name: 'James T. Whifield',
      experience: '5+ Yr of experience',
      location: 'Columbia, USA',
      specialty: 'Luxury Real Estate',
      avatar: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1746790261/300_e7yggy.jpg',
      isConnected: true
    },
    {
      id: 2,
      name: 'Amanda Rodriguez',
      experience: '8+ Yr of experience',
      location: 'Miami, USA',
      specialty: 'Commercial Properties',
      avatar: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1746790261/300_1_gdilxy.jpg',
      isConnected: false
    },
    {
      id: 3,
      name: 'Michael Chen',
      experience: '3+ Yr of experience',
      location: 'Seattle, USA',
      specialty: 'Residential Properties',
      avatar: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1746790260/300_3_inul8p.jpg',
      isConnected: true
    }
  ])

  const connectionRequests = ref([
    {
      id: 4,
      agentId: 4,
      name: 'Sarah Johnson',
      experience: '7+ Yr of experience',
      location: 'Boston, USA',
      specialty: 'Urban Apartments',
      avatar: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1746790260/300_2_rfyiva.jpg',
      status: 'pending'
    }
  ])

  // Full list of agents
  const agents = ref([
    {
      id: 1,
      name: 'James T. Whifield',
      email: 'james.whifield@example.com',
      location: 'Columbia, USA',
      profilePicture: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1746790261/300_e7yggy.jpg',
      avatar: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1746790261/300_e7yggy.jpg',
      specialties: ['Luxury Homes', 'Waterfront Properties'],
      yearsOfExperience: 8,
      averageRating: 4.8,
      status: 'active',
      bio: 'Luxury real estate specialist with 8 years of experience in high-end properties.',
      reviews: [{ id: 1, rating: 5 }, { id: 2, rating: 5 }, { id: 3, rating: 4.5 }]
    },
    {
      id: 2,
      name: 'Amanda Rodriguez',
      email: 'amanda.rodriguez@example.com',
      location: 'Miami, USA',
      profilePicture: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1746790261/300_1_gdilxy.jpg',
      avatar: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1746790261/300_1_gdilxy.jpg',
      specialties: ['Commercial Properties', 'Investment Properties'],
      yearsOfExperience: 10,
      averageRating: 4.5,
      status: 'active',
      bio: 'Commercial property expert specializing in investment opportunities.',
      reviews: [{ id: 1, rating: 4 }, { id: 2, rating: 5 }, { id: 3, rating: 4.5 }]
    },
    {
      id: 3,
      name: 'Michael Chen',
      email: 'michael.chen@example.com',
      location: 'Seattle, USA',
      profilePicture: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1746790260/300_3_inul8p.jpg',
      avatar: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1746790260/300_3_inul8p.jpg',
      specialties: ['Residential Properties', 'First-Time Buyers'],
      yearsOfExperience: 5,
      averageRating: 4.9,
      status: 'active',
      bio: 'Focused on helping first-time buyers find their perfect home.',
      reviews: [{ id: 1, rating: 5 }, { id: 2, rating: 5 }, { id: 3, rating: 4.7 }]
    },
    {
      id: 4,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      location: 'Boston, USA',
      profilePicture: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1746790260/300_2_rfyiva.jpg',
      avatar: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1746790260/300_2_rfyiva.jpg',
      specialties: ['Urban Apartments', 'Luxury Condos'],
      yearsOfExperience: 7,
      averageRating: 4.6,
      status: 'active',
      bio: 'Urban living specialist with expertise in luxury condos and apartments.',
      reviews: [{ id: 1, rating: 4 }, { id: 2, rating: 5 }, { id: 3, rating: 4.8 }]
    }
  ])

  // Getters
  const networkAgents = computed(() => {
    return favoriteAgents.value.filter(agent => agent.isConnected).map(agent => {
      // Get full agent details from agents array
      const fullAgent = agents.value.find(a => a.id === agent.id);
      return {
        ...agent,
        avatar: fullAgent ? fullAgent.avatar : agent.avatar
      };
    });
  })

  const otherAgents = computed(() => {
    return favoriteAgents.value.filter(agent => !agent.isConnected).map(agent => {
      // Get full agent details from agents array
      const fullAgent = agents.value.find(a => a.id === agent.id);
      return {
        ...agent,
        avatar: fullAgent ? fullAgent.avatar : agent.avatar
      };
    });
  })

  // Actions
  function toggleFavorite(agentId) {
    const index = favoriteAgents.value.findIndex(agent => agent.id === agentId)
    if (index !== -1) {
      favoriteAgents.value.splice(index, 1)
    } else {
      // Get agent details from full agents list
      const agent = agents.value.find(a => a.id === agentId)
      if (agent) {
        favoriteAgents.value.push({
          id: agentId,
          name: agent.name,
          experience: `${agent.yearsOfExperience}+ Yr of experience`,
          location: agent.location,
          specialty: agent.specialties[0],
          avatar: agent.avatar,
          isConnected: false
        })
      } else {
        // Fallback for new agents not in the list
        favoriteAgents.value.push({
          id: agentId,
          name: 'New Agent',
          experience: '2+ Yr of experience',
          location: 'New York, USA',
          specialty: 'Luxury Properties',
          avatar: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1746790261/300_e7yggy.jpg',
          isConnected: false
        })
      }
    }
  }

  function sendConnectionRequest(agentId) {
    const agent = favoriteAgents.value.find(agent => agent.id === agentId)
    if (agent) {
      connectionRequests.value.push({
        id: Date.now(),
        agentId: agentId,
        name: agent.name,
        experience: agent.experience,
        location: agent.location,
        specialty: agent.specialty,
        avatar: agent.avatar,
        status: 'pending'
      })
    }
  }

  function acceptConnection(requestId) {
    const request = connectionRequests.value.find(req => req.id === requestId)
    if (request) {
      // Find agent and update connection status
      const agent = favoriteAgents.value.find(agent => agent.id === request.agentId)
      if (agent) {
        agent.isConnected = true
      }

      // Remove request
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

  // Method to get all agents - adding this method fixes the blank page issue
  function getAllAgents() {
    return agents.value;
  }

  // Method to fetch agents from an API (simulated)
  async function fetchAgents() {
    // In a real app, this would be an API call
    console.log('Fetching agents data...');
    // Using setTimeout to simulate async API call
    return new Promise(resolve => {
      setTimeout(() => {
        console.log('Agents data fetched successfully');
        resolve(agents.value);
      }, 500);
    });
  }

  function updateAgentStatus(agentId, status) {
    const agent = agents.value.find(a => a.id === agentId);
    if (agent) {
      agent.status = status;
    }
  }

  // Method to get a specific agent by ID
  function getAgentById(id) {
    // Convert id to number if it's a string
    const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
    return agents.value.find(agent => agent.id === numericId) || null;
  }

  return {
    favoriteAgents,
    connectionRequests,
    networkAgents,
    otherAgents,
    toggleFavorite,
    sendConnectionRequest,
    acceptConnection,
    rejectConnection,
    getAllAgents,
    fetchAgents,
    updateAgentStatus,
    getAgentById
  }
})
