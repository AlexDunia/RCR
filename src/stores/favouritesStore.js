import { defineStore } from 'pinia';
import { useAuthStore } from './authStore';
import axiosInstance from '../api/axios';
import { propertyService } from '../services/propertyService';

export const useFavouritesStore = defineStore('favourites', {
  state: () => ({
    favouriteAgents: [],
    favouriteProperties: [],
    favouriteTrebProperties: [],
    favouritePropertyTypes: [],
    loadingProperties: [],
    error: null,
  }),

  getters: {
    isAgentFavourite: (state) => (agentId) => state.favouriteAgents.includes(agentId),
    isPropertyFavourite: (state) => (propertyId) => state.favouriteProperties.some(p => p.id === propertyId),
    isTrebPropertyFavourite: (state) => (listingKey) => state.favouriteTrebProperties.some(p => p.ListingKey === listingKey),
    isPropertyTypeFavourite: (state) => (propertyType) => state.favouritePropertyTypes.includes(propertyType),
    getAllFavouriteAgents: (state) => state.favouriteAgents,
    getAllFavouriteProperties: (state) => state.favouriteProperties,
    getAllFavouriteTrebProperties: (state) => state.favouriteTrebProperties,
    getAllFavouritePropertyTypes: (state) => state.favouritePropertyTypes,
    getAllFavourites: (state) => ({ local: state.favouriteProperties, treb: state.favouriteTrebProperties }),
    isLoading: (state) => (id) => state.loadingProperties.includes(id),
  },

  actions: {
    async initFavourites() {
      try {
        const authStore = useAuthStore();
        if (!authStore.isAuthenticated()) return;

        console.log('Initializing favorites...');
        const response = await axiosInstance.get('/api/favorites', {
          headers: { Authorization: `Bearer ${authStore.token}` },
        });
        console.log('Favorites response:', response.data);
        const { favorites } = response.data;
        this.favouriteTrebProperties = favorites
          .filter(f => f.property_type === 'treb')
          .map(f => ({
            ListingKey: f.property_id,
            ...f.details,
            propertyType: 'treb',
          }));
        this.favouriteProperties = favorites
          .filter(f => f.property_type === 'local')
          .map(f => ({
            id: f.property_id,
            ...f.details,
            propertyType: 'local',
          }));
        this.favouritePropertyTypes = favorites
          .filter(f => f.property_type === 'property_type')
          .map(f => f.property_id);
        this.favouriteAgents = JSON.parse(localStorage.getItem('favourite-agents') || '[]');
      } catch (error) {
        console.error('Error loading favorites:', error.response?.data || error.message);
        this.error = error.message || 'Failed to fetch favorites';
      }
    },

    toggleFavouriteAgent(agentId) {
      console.log('Toggling favorite agent:', agentId);
      const index = this.favouriteAgents.indexOf(agentId);
      if (index > -1) this.favouriteAgents.splice(index, 1);
      else this.favouriteAgents.push(agentId);
      localStorage.setItem('favourite-agents', JSON.stringify(this.favouriteAgents));
    },

    async toggleFavouriteProperty(propertyData) {
      try {
        console.log('Toggling local favorite:', propertyData.id);
        this.loadingProperties.push(propertyData.id);
        this.error = null;
        const authStore = useAuthStore();
        if (!authStore.isAuthenticated()) return;

        const response = await propertyService.toggleFavorite('local', propertyData.id, {
          ...propertyData,
          favoritedAt: new Date().toISOString(),
          propertyType: 'local',
        });
        console.log('Toggle local favorite response:', response);

        const index = this.favouriteProperties.findIndex(p => p.id === propertyData.id);
        if (index > -1) {
          this.favouriteProperties.splice(index, 1);
        } else {
          this.favouriteProperties.push({
            id: propertyData.id,
            ...propertyData,
            favoritedAt: new Date().toISOString(),
            propertyType: 'local',
          });
        }
      } catch (error) {
        console.error('Toggle local favorite error:', error.response?.data || error.message);
        this.error = error.message || 'Failed to toggle favorite';
        throw error;
      } finally {
        this.loadingProperties = this.loadingProperties.filter(id => id !== propertyData.id);
      }
    },

    async toggleFavouriteTrebProperty(property) {
      try {
        console.log('Toggling TREB favorite:', property.ListingKey);
        this.loadingProperties.push(property.ListingKey);
        this.error = null;
        const authStore = useAuthStore();
        if (!authStore.isAuthenticated()) return;

        const propertyData = {
          ListingKey: String(property.ListingKey),
          UnparsedAddress: property.UnparsedAddress || '',
          ListPrice: Number(property.ListPrice) || 0,
          BedroomsTotal: Number(property.BedroomsTotal) || 0,
          BathroomsFull: Number(property.BathroomsFull) || 0,
          LivingArea: Number(property.LivingArea) || 0,
          City: property.City || '',
          StateOrProvince: property.StateOrProvince || '',
          PropertyType: property.PropertyType || 'Residential',
          image: property.image || null,
          favoritedAt: new Date().toISOString(),
          propertyType: 'treb',
        };

        const response = await propertyService.toggleFavorite('treb', String(property.ListingKey), propertyData);
        console.log('Toggle TREB favorite response:', response);

        const index = this.favouriteTrebProperties.findIndex(p => p.ListingKey === property.ListingKey);
        if (index > -1) {
          this.favouriteTrebProperties.splice(index, 1);
        } else {
          this.favouriteTrebProperties.push({
            ListingKey: property.ListingKey,
            ...propertyData,
          });
        }
      } catch (error) {
        console.error('Toggle TREB favorite error:', error.response?.data || error.message);
        this.error = error.message || 'Failed to toggle TREB favorite';
        throw error;
      } finally {
        this.loadingProperties = this.loadingProperties.filter(id => id !== property.ListingKey);
      }
    },

    async toggleFavouritePropertyType(propertyType) {
      try {
        console.log('Toggling property type favorite:', propertyType);
        this.error = null;
        const authStore = useAuthStore();
        if (!authStore.isAuthenticated()) return;

        const response = await propertyService.toggleFavorite('property_type', propertyType, {
          propertyType,
          favoritedAt: new Date().toISOString(),
          category: 'property_type',
        });
        console.log('Toggle property type favorite response:', response);

        const index = this.favouritePropertyTypes.indexOf(propertyType);
        if (index > -1) {
          this.favouritePropertyTypes.splice(index, 1);
        } else {
          this.favouritePropertyTypes.push(propertyType);
        }
      } catch (error) {
        console.error('Toggle property type favorite error:', error.response?.data || error.message);
        this.error = error.message || 'Failed to toggle property type favorite';
        throw error;
      }
    },

    clearAllFavourites() {
      console.log('Clearing all favorites');
      this.favouriteAgents = [];
      this.favouriteProperties = [];
      this.favouriteTrebProperties = [];
      this.favouritePropertyTypes = [];
      localStorage.removeItem('favourite-agents');
    },

    getPropertyById(propertyId) {
      console.log('Getting property by ID:', propertyId);
      const localProperty = this.favouriteProperties.find(p => p.id === propertyId);
      if (localProperty) return localProperty;
      const trebProperty = this.favouriteTrebProperties.find(p => p.ListingKey === propertyId);
      return trebProperty || null;
    },
  },
});
