import axiosInstance from '../api/axios';
import { useAuthStore } from '../stores/authStore';

export const propertyService = {
  async getProperties(filters = {}) {
    try {
      const response = await axiosInstance.get('/properties', {
        params: filters,
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching properties:', error);
      throw error;
    }
  },

  async getPropertyById(id) {
    const response = await axiosInstance.get(`/properties/${id}`);
    return response.data;
  },

  async toggleFavorite(propertyType, propertyId, propertyData = null) {
    const authStore = useAuthStore();
    const payload = {
      property_type: propertyType,
      property_id: propertyId,
    };
    if (propertyType === 'treb' && propertyData) {
      payload.property_data = propertyData;
    }
    try {
      const response = await axiosInstance.post('/favorites/toggle', payload, {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error toggling favorite for ${propertyId}:`, error);
      throw error;
    }
  },
  async createProperty(propertyData) {
    const authStore = useAuthStore()
    const response = await axiosInstance.post('/properties', propertyData, {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  },

  async updateProperty(id, propertyData) {
    const authStore = useAuthStore()
    const response = await axiosInstance.put(`/properties/${id}`, propertyData, {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  },

  async deleteProperty(id) {
    const authStore = useAuthStore()
    const response = await axiosInstance.delete(`/properties/${id}`, {
      headers: {
        Authorization: `Bearer ${authStore.token}`
      }
    })
    return response.data
  },

  async toggleFavorite(id) {
    const authStore = useAuthStore()
    const response = await axiosInstance.post(`/properties/${id}/favorite`, {}, {
      headers: {
        Authorization: `Bearer ${authStore.token}`
      }
    })
    return response.data
  }
}
