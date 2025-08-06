import axiosInstance from './axios'
import { useAuthStore } from '../stores/authStore'

export const propertyApi = {
  // Get all properties
  async getProperties(filters = {}) {
    try {
      const response = await axiosInstance.get('/properties', { params: filters })
      return response.data
    } catch (error) {
      console.error('Error fetching properties:', error)
      throw error
    }
  },

  // Get property by ID
  async getPropertyById(id) {
    try {
      const response = await axiosInstance.get(`/properties/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching property:', error)
      throw error
    }
  },

  // Toggle favorite status (existing method)
  async toggleFavorite(propertyId) {
    try {
      const authStore = useAuthStore()
      const response = await axiosInstance.post('/favorites', {
        property_id: propertyId
      }, {
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

  // Add property to favorites with full details
  async addToFavorites(propertyData) {
    try {
      console.log('API: Adding to favorites:', propertyData.id || propertyData.ListingKey);
      const authStore = useAuthStore()
      const response = await axiosInstance.post('/favorites', {
        property_id: propertyData.id || propertyData.ListingKey,
        property_type: propertyData.propertyType || 'local'
      }, {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      })
      console.log('API: Successfully added to favorites');
      return response.data
    } catch (error) {
      console.error('Error adding to favorites:', error)
      throw error
    }
  },

  // Remove property from favorites
  async removeFromFavorites(propertyId, propertyType = 'local') {
    try {
      console.log('API: Removing from favorites:', propertyId, propertyType);
      const authStore = useAuthStore()
      const response = await axiosInstance.post('/favorites/remove', {
        property_id: propertyId,
        property_type: propertyType
      }, {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      })
      console.log('API: Successfully removed from favorites');
      return response.data
    } catch (error) {
      console.error('Error removing from favorites:', error)
      throw error
    }
  },

  // Get user's favorites
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

  // Check if property is favorited
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
  }
}

export default propertyApi
