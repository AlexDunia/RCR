import axiosInstance from './axios'
import { useAuthStore } from '../stores/authStore'

/**
 * Favorites API - Complete request infrastructure for backend integration
 *
 * This file contains all the API request methods needed for the favorites functionality.
 * The backend should implement these endpoints to handle favorites operations.
 */

export const favoritesApi = {
  /**
   * Add a property to user's favorites
   *
   * @param {Object} propertyData - The property data to add
   * @param {string} propertyData.property_type - 'local' or 'treb'
   * @param {Object} propertyData.property_data - Full property object
   * @returns {Promise<Object>} API response
   */
  async addToFavorites(propertyData) {
    try {
      const authStore = useAuthStore()
      const response = await axiosInstance.post('/favorites/add', {
        property_type: propertyData.propertyType || 'local',
        property_data: propertyData
      }, {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      })
      return response.data
    } catch (error) {
      console.error('Error adding to favorites:', error)
      throw error
    }
  },

  /**
   * Remove a property from user's favorites
   *
   * @param {string|number} propertyId - The property ID or ListingKey
   * @param {string} propertyType - 'local' or 'treb'
   * @returns {Promise<Object>} API response
   */
  async removeFromFavorites(propertyId, propertyType = 'local') {
    try {
      const authStore = useAuthStore()
      const response = await axiosInstance.post('/favorites/remove', {
        property_id: propertyId,
        property_type: propertyType
      }, {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      })
      return response.data
    } catch (error) {
      console.error('Error removing from favorites:', error)
      throw error
    }
  },

  /**
   * Toggle favorite status (add if not favorited, remove if favorited)
   *
   * @param {string|number} propertyId - The property ID or ListingKey
   * @param {string} propertyType - 'local' or 'treb'
   * @param {Object} propertyData - Full property data (for adding)
   * @returns {Promise<Object>} API response
   */
  async toggleFavorite(propertyId, propertyType = 'local', propertyData = null) {
    try {
      const authStore = useAuthStore()
      const payload = {
        property_id: propertyId,
        property_type: propertyType
      }

      if (propertyData) {
        payload.property_data = propertyData
      }

      const response = await axiosInstance.post('/favorites/toggle', payload, {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      })
      return response.data
    } catch (error) {
      console.error('Error toggling favorite:', error)
      throw error
    }
  },

  /**
   * Get all user's favorites
   *
   * @returns {Promise<Object>} API response with all favorites
   */
  async getFavorites() {
    try {
      const authStore = useAuthStore()
      const response = await axiosInstance.get('/favorites', {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      })
      return response.data
    } catch (error) {
      console.error('Error fetching favorites:', error)
      throw error
    }
  },

  /**
   * Check if a property is favorited by the user
   *
   * @param {string|number} propertyId - The property ID or ListingKey
   * @param {string} propertyType - 'local' or 'treb'
   * @returns {Promise<Object>} API response with favorite status
   */
  async checkFavorite(propertyId, propertyType = 'local') {
    try {
      const authStore = useAuthStore()
      const response = await axiosInstance.post('/favorites/check', {
        property_id: propertyId,
        property_type: propertyType
      }, {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      })
      return response.data
    } catch (error) {
      console.error('Error checking favorite status:', error)
      throw error
    }
  },

  /**
   * Add an agent to user's favorites
   *
   * @param {number} agentId - The agent ID
   * @returns {Promise<Object>} API response
   */
  async addAgentToFavorites(agentId) {
    try {
      const authStore = useAuthStore()
      const response = await axiosInstance.post('/favorites/agents/add', {
        agent_id: agentId
      }, {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      })
      return response.data
    } catch (error) {
      console.error('Error adding agent to favorites:', error)
      throw error
    }
  },

  /**
   * Remove an agent from user's favorites
   *
   * @param {number} agentId - The agent ID
   * @returns {Promise<Object>} API response
   */
  async removeAgentFromFavorites(agentId) {
    try {
      const authStore = useAuthStore()
      const response = await axiosInstance.post('/favorites/agents/remove', {
        agent_id: agentId
      }, {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      })
      return response.data
    } catch (error) {
      console.error('Error removing agent from favorites:', error)
      throw error
    }
  },

  /**
   * Toggle agent favorite status
   *
   * @param {number} agentId - The agent ID
   * @returns {Promise<Object>} API response
   */
  async toggleAgentFavorite(agentId) {
    try {
      const authStore = useAuthStore()
      const response = await axiosInstance.post('/favorites/agents/toggle', {
        agent_id: agentId
      }, {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      })
      return response.data
    } catch (error) {
      console.error('Error toggling agent favorite:', error)
      throw error
    }
  },

  /**
   * Check if an agent is favorited by the user
   *
   * @param {number} agentId - The agent ID
   * @returns {Promise<Object>} API response with favorite status
   */
  async checkAgentFavorite(agentId) {
    try {
      const authStore = useAuthStore()
      const response = await axiosInstance.post('/favorites/agents/check', {
        agent_id: agentId
      }, {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      })
      return response.data
    } catch (error) {
      console.error('Error checking agent favorite status:', error)
      throw error
    }
  },

  /**
   * Get user's favorite agents
   *
   * @returns {Promise<Object>} API response with favorite agents
   */
  async getFavoriteAgents() {
    try {
      const authStore = useAuthStore()
      const response = await axiosInstance.get('/favorites/agents', {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      })
      return response.data
    } catch (error) {
      console.error('Error fetching favorite agents:', error)
      throw error
    }
  },

  /**
   * Sync local favorites with backend
   *
   * @param {Array} localFavorites - Array of local favorite properties
   * @param {Array} trebFavorites - Array of TREB favorite properties
   * @param {Array} agentFavorites - Array of favorite agent IDs
   * @returns {Promise<Object>} API response
   */
  async syncFavorites(localFavorites, trebFavorites, agentFavorites) {
    try {
      const authStore = useAuthStore()
      const response = await axiosInstance.post('/favorites/sync', {
        local_properties: localFavorites,
        treb_properties: trebFavorites,
        agents: agentFavorites
      }, {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      })
      return response.data
    } catch (error) {
      console.error('Error syncing favorites:', error)
      throw error
    }
  },

  /**
   * Clear all user's favorites
   *
   * @returns {Promise<Object>} API response
   */
  async clearAllFavorites() {
    try {
      const authStore = useAuthStore()
      const response = await axiosInstance.delete('/favorites/clear', {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      })
      return response.data
    } catch (error) {
      console.error('Error clearing favorites:', error)
      throw error
    }
  },

  /**
   * Export favorites to different formats
   *
   * @param {string} format - 'pdf', 'csv', or 'json'
   * @returns {Promise<Object>} API response with export data
   */
  async exportFavorites(format = 'pdf') {
    try {
      const authStore = useAuthStore()
      const response = await axiosInstance.get(`/favorites/export/${format}`, {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      })
      return response.data
    } catch (error) {
      console.error('Error exporting favorites:', error)
      throw error
    }
  }
}

export default favoritesApi
