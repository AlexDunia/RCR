import axiosInstance from '../api/axios';
import { useAuthStore } from '../stores/authStore';

export const propertyService = {
  async getProperties(filters = {}, page = 1) {
    try {
      const cleanFilters = Object.fromEntries(
        Object.entries(filters).filter(([, value]) => value !== null && value !== '')
      );
      console.log('Fetching properties with filters:', { ...cleanFilters, page });
      const response = await axiosInstance.get('/api/properties', {
        params: { ...cleanFilters, page, per_page: 8 }, // Changed from 4 to 8
      });
      console.log('Properties response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching properties:', error.response?.data || error.message);
      throw error;
    }
  },

  async getPropertyById(id) {
    try {
      console.log('Fetching property with ID:', id);
      const response = await axiosInstance.get(`/api/properties/${id}`);
      console.log('Property response:', response.data);
      return response.data;
    } catch (error) {
      console.error(`Error fetching property ${id}:`, error);
      throw error;
    }
  },

  async toggleFavorite(propertyType, propertyId, propertyData = null) {
    const authStore = useAuthStore();
    const payload = {
      property_type: propertyType,
      property_id: String(propertyId),
      details: propertyData || null,
    };
    try {
      console.log('Toggling favorite:', { propertyType, propertyId, payload });
      const response = await axiosInstance.post('/api/favorites', payload, {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      });
      console.log('Toggle favorite response:', response.data);
      return response.data;
    } catch (error) {
      console.error(`Error toggling favorite for ${propertyId}:`, error);
      throw error;
    }
  },

  async createProperty(propertyData) {
    const authStore = useAuthStore();
    try {
      console.log('Creating property with data:', propertyData);
      const response = await axiosInstance.post('/api/properties', propertyData, {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Create property response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating property:', error);
      throw error;
    }
  },

  async updateProperty(id, propertyData) {
    const authStore = useAuthStore();
    try {
      console.log('Updating property:', { id, propertyData });
      const response = await axiosInstance.put(`/api/properties/${id}`, propertyData, {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Update property response:', response.data);
      return response.data;
    } catch (error) {
      console.error(`Error updating property ${id}:`, error);
      throw error;
    }
  },

  async deleteProperty(id) {
    const authStore = useAuthStore();
    try {
      console.log('Deleting property:', id);
      const response = await axiosInstance.delete(`/api/properties/${id}`, {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      });
      console.log('Delete property response:', response.data);
      return response.data;
    } catch (error) {
      console.error(`Error deleting property ${id}:`, error);
      throw error;
    }
  },
};
