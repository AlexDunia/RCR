// src/store/propertyStore.js
import { defineStore } from 'pinia'
import { propertyService } from '../services/propertyService'

export const usePropertyStore = defineStore('propertyStore', {
  state: () => ({
    properties: [],
    currentIndex: 0,
    loading: false,
    error: null,
    currentProperty: null,
    imageIndices: {}, // Store current image index for each property
    filters: {
      type: null,
      minPrice: null,
      maxPrice: null,
      bedrooms: null,
      bathrooms: null,
      status: null
    }
  }),

  getters: {
    visibleProperties: (state) =>
      state.properties.slice(state.currentIndex, state.currentIndex + 4),

    favoriteProperties: (state) =>
      state.properties.filter(property => property.isFavorite),

    filteredProperties: (state) => {
      return state.properties.filter(property => {
        if (state.filters.type && property.type !== state.filters.type) return false
        if (state.filters.minPrice && property.price < state.filters.minPrice) return false
        if (state.filters.maxPrice && property.price > state.filters.maxPrice) return false
        if (state.filters.bedrooms && property.bedrooms !== state.filters.bedrooms) return false
        if (state.filters.bathrooms && property.bathrooms !== state.filters.bathrooms) return false
        if (state.filters.status && property.status !== state.filters.status) return false
        return true
      })
    }
  },

  actions: {
    async fetchProperties() {
      try {
        console.log('Fetching properties...')
        this.loading = true
        this.error = null
        const response = await propertyService.getProperties(this.filters)
        console.log('API Response:', response)
        if (response && response.data) {
          this.properties = response.data.map(property => ({
            ...property,
            currentImageIndex: 0 // Initialize image index for each property
          }))
          console.log('Properties set:', this.properties)
        } else {
          console.log('No data in response')
          this.properties = []
        }
      } catch (error) {
        console.error('Error fetching properties:', error)
        this.error = error.message || 'Failed to fetch properties'
        this.properties = []
        throw error
      } finally {
        this.loading = false
      }
    },

    async fetchPropertyById(id) {
      try {
        this.loading = true;
        this.error = null;
        const response = await propertyService.getPropertyById(id);
        console.log('Property API Response:', response);
        if (response && response.data) {
          const property = {
            ...response.data,
            currentImageIndex: 0,
            images: response.data.media?.images || response.data.images || []
          };
          console.log('Processed Property:', property);
          // Update the property in the store
          const index = this.properties.findIndex(p => p.id === id);
          if (index !== -1) {
            this.properties[index] = property;
          } else {
            this.properties.push(property);
          }
          this.currentProperty = property;
          return property;
        }
        return null;
      } catch (error) {
        console.error('Error fetching property:', error);
        this.error = error.message || 'Failed to fetch property';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async createProperty(propertyData) {
      try {
        this.loading = true
        this.error = null
        const data = await propertyService.createProperty(propertyData)
        this.properties.push(data)
        return data
      } catch (error) {
        this.error = error.message || 'Failed to create property'
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateProperty(id, propertyData) {
      try {
        this.loading = true
        this.error = null
        const data = await propertyService.updateProperty(id, propertyData)
        const index = this.properties.findIndex(p => p.id === id)
        if (index !== -1) {
          this.properties[index] = data
        }
        return data
      } catch (error) {
        this.error = error.message || 'Failed to update property'
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteProperty(id) {
      try {
        this.loading = true
        this.error = null
        await propertyService.deleteProperty(id)
        this.properties = this.properties.filter(p => p.id !== id)
      } catch (error) {
        this.error = error.message || 'Failed to delete property'
        throw error
      } finally {
        this.loading = false
      }
    },

    async toggleFavorite(propertyId) {
      try {
        const data = await propertyService.toggleFavorite(propertyId)
        const property = this.properties.find(p => p.id === propertyId)
        if (property) {
          property.isFavorite = data.isFavorite
        }
      } catch (error) {
        this.error = error.message || 'Failed to toggle favorite'
        throw error
      }
    },

    nextSlide() {
      if (this.currentIndex + 4 < this.properties.length) {
        this.currentIndex += 4
      }
    },

    prevSlide() {
      if (this.currentIndex > 0) {
        this.currentIndex -= 4
      }
    },

    setFilters(filters) {
      this.filters = { ...this.filters, ...filters }
      this.fetchProperties() // Refetch with new filters
    },

    clearFilters() {
      this.filters = {
        type: null,
        minPrice: null,
        maxPrice: null,
        bedrooms: null,
        bathrooms: null,
        status: null
      }
      this.fetchProperties() // Refetch without filters
    },

    setPropertyImageIndex(propertyId, index) {
      const property = this.properties.find(p => p.id === propertyId)
      if (property) {
        property.currentImageIndex = index
      }
    },

    nextPropertyImage(propertyId) {
      const property = this.properties.find(p => p.id === propertyId)
      if (property && property.images && property.images.length > 0) {
        property.currentImageIndex = (property.currentImageIndex + 1) % property.images.length
      }
    },

    previousPropertyImage(propertyId) {
      const property = this.properties.find(p => p.id === propertyId)
      if (property && property.images && property.images.length > 0) {
        property.currentImageIndex = property.currentImageIndex === 0
          ? property.images.length - 1
          : property.currentImageIndex - 1
      }
    }
  }
})
