import axiosInstance from '../api/axios'
import { useAuthStore } from '../stores/authStore'

export const propertyService = {
  async getProperties(filters = {}) {
    try {
      const response = await axiosInstance.get('/properties', {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Error fetching properties:', error)
      throw error
    }
  },

  async getPropertyById(id) {
    const response = await axiosInstance.get(`/properties/${id}`)
    return response.data
  },

  async createProperty(propertyData) {
    try {
      const authStore = useAuthStore()
      const response = await axiosInstance.post('/properties', propertyData, {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      return response.data
    } catch (error) {
      throw error
    }
  },

  async updateProperty(id, propertyData) {
    try {
      const authStore = useAuthStore()
      const response = await axiosInstance.put(`/properties/${id}`, propertyData, {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      return response.data
    } catch (error) {
      throw error
    }
  },

  async deleteProperty(id) {
    try {
      const authStore = useAuthStore()
      const response = await axiosInstance.delete(`/properties/${id}`, {
        headers: {
          Authorization: `Bearer ${authStore.token}`
        }
      })
      return response.data
    } catch (error) {
      throw error
    }
  },

  async toggleFavorite(id) {
    try {
      const authStore = useAuthStore()
      const response = await axiosInstance.post(`/properties/${id}/favorite`, {}, {
        headers: {
          Authorization: `Bearer ${authStore.token}`
        }
      })
      return response.data
    } catch (error) {
      throw error
    }
  }
}
