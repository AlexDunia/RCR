// stores/propertyStore.js
import { defineStore } from 'pinia';
import { propertyService } from '../services/propertyService';
import axiosInstance from '../api/axios';

export const usePropertyStore = defineStore('propertyStore', {
  state: () => ({
    properties: [],
    currentIndex: 0,
    loading: false,
    error: null,
    singleProperty: null,
    searchResults: [],
    searchMeta: { total: 0, page: 1, perPage: 10 },
    media: {},
    currentProperty: null,
    imageIndices: {},
    filters: {
      type: null,
      minPrice: null,
      maxPrice: null,
      bedrooms: null,
      bathrooms: null,
      status: null,
    },
    trebData: null,
    trebLoading: false,
    trebError: null,
    mediaCache: new Map(),
  }),

  getters: {
    getTrebMediaByListingKey: (state) => (listingKey) => {
      return state.media[listingKey] || [];
    },
    visibleProperties: (state) =>
      state.properties.slice(state.currentIndex, state.currentIndex + 4),
    favoriteProperties: (state) =>
      state.properties.filter((property) => property.isFavorite),
    filteredProperties: (state) => {
      return state.properties.filter((property) => {
        if (state.filters.type && property.type !== state.filters.type) return false;
        if (state.filters.minPrice && property.price < state.filters.minPrice) return false;
        if (state.filters.maxPrice && property.price > state.filters.maxPrice) return false;
        if (state.filters.bedrooms && property.bedrooms !== state.filters.bedrooms) return false;
        if (state.filters.bathrooms && property.bathrooms !== state.filters.bathrooms) return false;
        if (state.filters.status && property.status !== state.filters.status) return false;
        return true;
      });
    },
    getSearchResults: (state) => state.searchResults,
    getSearchMeta: (state) => state.searchMeta,
  },

  actions: {
    async hydrateStore() {
      const storedTreb = localStorage.getItem('trebData');
      const storedLocal = localStorage.getItem('localProperties');
      if (storedTreb) this.trebData = JSON.parse(storedTreb);
      if (storedLocal) this.properties = JSON.parse(storedLocal);
    },

    async fetchProperties() {
      try {
        console.log('Fetching properties in store with filters:', this.filters);
        this.loading = true;
        this.error = null;
        const response = await propertyService.getProperties(this.filters);
        if (response && response.data && Array.isArray(response.data.data)) {
          this.properties = response.data.data.map((property) => ({
            ...property,
            currentImageIndex: 0,
          }));
        } else if (response && Array.isArray(response.data)) {
          this.properties = response.data.map((property) => ({
            ...property,
            currentImageIndex: 0,
          }));
        } else {
          console.log('No valid data in response');
          this.properties = [];
        }
        localStorage.setItem('localProperties', JSON.stringify(this.properties));
      } catch (error) {
        console.error('Error fetching properties in store:', error);
        this.error = error.message || 'Failed to fetch properties';
        this.properties = [];
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async fetchPropertyById(id) {
      try {
        console.log('Fetching property by ID in store:', id);
        this.loading = true;
        this.error = null;
        const response = await propertyService.getPropertyById(id);
        console.log('Property response in store:', response);
        if (response && response.data) {
          const property = {
            ...response.data,
            currentImageIndex: 0,
            images: response.data.media?.images || response.data.images || [],
          };
          console.log('Processed property in store:', property);
          const index = this.properties.findIndex((p) => p.id === id);
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
        console.error('Error fetching property in store:', error);
        this.error = error.message || 'Failed to fetch property';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async searchProperties({ query = '', city = '', minPrice = '', maxPrice = '', bedrooms = '', page = 1, perPage = 10 }) {
      if (!query && !city && !minPrice && !maxPrice && !bedrooms) {
        console.log('No search parameters provided, clearing results');
        this.searchResults = [];
        this.searchMeta = { total: 0, page, perPage };
        this.loading = false;
        return;
      }
      try {
        console.log('Searching properties with params:', { query, city, minPrice, maxPrice, bedrooms, page, perPage });
        this.loading = true;
        const filters = [];
        if (city) filters.push(`City eq '${city}'`);
        if (minPrice) filters.push(`ListPrice ge ${minPrice}`);
        if (maxPrice) filters.push(`ListPrice le ${maxPrice}`);
        if (bedrooms) filters.push(`BedroomsTotal ge ${bedrooms}`);
        const filter = filters.join(' and ');
        const response = await axiosInstance.get('/api/trebsearch', {
          params: {
            search: query,
            filter: filter || undefined,
            page,
            per_page: perPage,
          },
        });
        console.log('Search properties response:', response.data);
        this.searchResults = response.data.data || [];
        this.searchMeta = {
          total: response.data.pagination?.total || 0,
          page: response.data.pagination?.current_page || page,
          perPage: response.data.pagination?.per_page || perPage,
        };
        this.error = null;
      } catch (error) {
        console.error('Error searching TREB properties:', error);
        this.error = error.response?.data?.message || error.message || 'Failed to search properties';
      } finally {
        this.loading = false;
      }
    },

    async createProperty(propertyData) {
      try {
        console.log('Creating property in store:', propertyData);
        this.loading = true;
        this.error = null;
        const data = await propertyService.createProperty(propertyData);
        console.log('Created property in store:', data);
        this.properties.push(data);
        localStorage.setItem('localProperties', JSON.stringify(this.properties));
        return data;
      } catch (error) {
        console.error('Error creating property in store:', error);
        this.error = error.message || 'Failed to create property';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async updateProperty(id, propertyData) {
      try {
        console.log('Updating property in store:', { id, propertyData });
        this.loading = true;
        this.error = null;
        const data = await propertyService.updateProperty(id, propertyData);
        console.log('Updated property in store:', data);
        const index = this.properties.findIndex((p) => p.id === id);
        if (index !== -1) {
          this.properties[index] = data;
        }
        localStorage.setItem('localProperties', JSON.stringify(this.properties));
        return data;
      } catch (error) {
        console.error('Error updating property in store:', error);
        this.error = error.message || 'Failed to update property';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async deleteProperty(id) {
      try {
        console.log('Deleting property in store:', id);
        this.loading = true;
        this.error = null;
        await propertyService.deleteProperty(id);
        console.log('Property deleted in store:', id);
        this.properties = this.properties.filter((p) => p.id !== id);
        localStorage.setItem('localProperties', JSON.stringify(this.properties));
      } catch (error) {
        console.error('Error deleting property in store:', error);
        this.error = error.message || 'Failed to delete property';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async toggleFavorite(propertyId) {
      try {
        console.log('Toggling favorite in store:', propertyId);
        const data = await propertyService.toggleFavoriteById(propertyId);
        console.log('Toggle favorite response in store:', data);
        const property = this.properties.find((p) => p.id === propertyId);
        if (property) {
          property.isFavorite = data.isFavorite;
        }
        localStorage.setItem('localProperties', JSON.stringify(this.properties));
      } catch (error) {
        console.error('Error toggling favorite in store:', error);
        this.error = error.message || 'Failed to toggle favorite';
        throw error;
      }
    },

    nextSlide() {
      console.log('Moving to next slide, currentIndex:', this.currentIndex);
      if (this.currentIndex + 4 < this.properties.length) {
        this.currentIndex += 4;
      }
      console.log('New currentIndex:', this.currentIndex);
    },

    prevSlide() {
      console.log('Moving to previous slide, currentIndex:', this.currentIndex);
      if (this.currentIndex > 0) {
        this.currentIndex -= 4;
      }
      console.log('New currentIndex:', this.currentIndex);
    },

    setFilters(filters) {
      console.log('Setting filters:', filters);
      this.filters = { ...this.filters, ...filters };
      this.fetchProperties();
    },

    clearFilters() {
      console.log('Clearing filters');
      this.filters = {
        type: null,
        minPrice: null,
        maxPrice: null,
        bedrooms: null,
        bathrooms: null,
        status: null,
      };
      this.fetchProperties();
    },

    setPropertyImageIndex(propertyId, index) {
      console.log('Setting image index for property:', { propertyId, index });
      const property = this.properties.find((p) => p.id === propertyId);
      if (property) {
        property.currentImageIndex = index;
      }
    },

    nextPropertyImage(propertyId) {
      console.log('Next image for property:', propertyId);
      const property = this.properties.find((p) => p.id === propertyId);
      if (property && property.images && property.images.length > 0) {
        property.currentImageIndex = (property.currentImageIndex + 1) % property.images.length;
        console.log('New image index:', property.currentImageIndex);
      }
    },

    previousPropertyImage(propertyId) {
      console.log('Previous image for property:', propertyId);
      const property = this.properties.find((p) => p.id === propertyId);
      if (property && property.images && property.images.length > 0) {
        property.currentImageIndex =
          property.currentImageIndex === 0
            ? property.images.length - 1
            : property.currentImageIndex - 1;
        console.log('New image index:', property.currentImageIndex);
      }
    },

    async getTrebData({ listingKey } = {}) {
      try {
        console.log('Fetching TREB data with listingKey:', listingKey);
        this.trebLoading = true;
        this.trebError = null;
        const response = await axiosInstance.get('/api/trebdata', {
          params: { listingKey },
        });
        this.trebData = response.data;
        localStorage.setItem('trebData', JSON.stringify(this.trebData));
        if (this.trebData?.data?.value) {
          await Promise.all(
            this.trebData.data.value.map(async (property) => {
              try {
                const mediaResponse = await this.getTrebPropertyMedia(property.ListingKey);
                if (mediaResponse.length > 0) {
                  property.image = mediaResponse[0].ProxyURL || mediaResponse[0].MediaURL;
                } else {
                  property.image = null;
                }
              } catch (error) {
                console.error(`Failed to fetch media for ${property.ListingKey}:`, error);
                property.image = null;
              }
            })
          );
        }
      } catch (error) {
        console.error('Error fetching TREB data:', error);
        this.trebError = error.message || 'Failed to fetch TREB data';
      } finally {
        this.trebLoading = false;
      }
    },

    async getTrebMedia(listingKey) {
      try {
        console.log('Fetching TREB media for:', listingKey);
        this.loading = true;
        const response = await axiosInstance.get(`/api/trebmedia/${listingKey}`);
        this.media[listingKey] = response.data.data.value;
        console.log('TREB media fetched:', this.media[listingKey]);
      } catch (error) {
        console.error('Error fetching TREB media:', error);
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    async getTrebPropertyMedia(listingKey) {
      try {
        console.log('Fetching TREB property media for:', listingKey);
        if (this.mediaCache.has(listingKey)) {
          return this.mediaCache.get(listingKey);
        }
        const response = await axiosInstance.get(`/api/trebmedia/${listingKey}`, {
          headers: { 'Cache-Control': 'public, max-age=31536000' },
        });
        const mediaData = (response.data?.data?.value || []).map((media) => ({
          ...media,
          ProxyURL: `/api/media/proxy?url=${encodeURIComponent(media.MediaURL)}`,
        }));
        this.mediaCache.set(listingKey, mediaData);
        return mediaData;
      } catch (error) {
        console.error(`Error fetching media for ${listingKey}:`, error);
        return [];
      }
    },

    setTrebPropertyImageIndex(listingKey, index) {
      console.log('Setting TREB image index:', { listingKey, index });
      const property = this.trebData?.data?.value?.find((p) => p.ListingKey === listingKey);
      if (property) {
        if (!this.imageIndices[listingKey]) {
          this.imageIndices[listingKey] = 0;
        }
        this.imageIndices[listingKey] = index;
      }
    },

    nextTrebPropertyImage(listingKey) {
      console.log('Next TREB image for:', listingKey);
      const property = this.trebData?.data?.value?.find((p) => p.ListingKey === listingKey);
      if (property?.mediaData?.length) {
        if (!this.imageIndices[listingKey]) {
          this.imageIndices[listingKey] = 0;
        }
        this.imageIndices[listingKey] = (this.imageIndices[listingKey] + 1) % property.mediaData.length;
        console.log('New TREB image index:', this.imageIndices[listingKey]);
      }
    },

    previousTrebPropertyImage(listingKey) {
      console.log('Previous TREB image for:', listingKey);
      const property = this.trebData?.data?.value?.find((p) => p.ListingKey === listingKey);
      if (property?.mediaData?.length) {
        if (!this.imageIndices[listingKey]) {
          this.imageIndices[listingKey] = 0;
        }
        this.imageIndices[listingKey] =
          this.imageIndices[listingKey] === 0
            ? property.mediaData.length - 1
            : this.imageIndices[listingKey] - 1;
        console.log('New TREB image index:', this.imageIndices[listingKey]);
      }
    },

    getCurrentImageIndex(listingKey) {
      console.log('Getting current image index for:', listingKey);
      return this.imageIndices[listingKey] || 0;
    },
  },
});
