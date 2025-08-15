import { defineStore } from 'pinia';
import { useAuthStore } from './authStore';
import axiosInstance from '../api/axios';

export const useFavouritesStore = defineStore('favourites', {
  state: () => ({
    favouriteAgents: [],
    favouriteProperties: [],
    favouriteTrebProperties: [],
    loadingProperties: [],
    error: null
  }),

  getters: {
    isAgentFavourite: (state) => (agentId) => state.favouriteAgents.includes(agentId),
    isPropertyFavourite: (state) => (propertyId) => state.favouriteProperties.some(p => p.id === propertyId),
    isTrebPropertyFavourite: (state) => (listingKey) => state.favouriteTrebProperties.some(p => p.ListingKey === listingKey),
    getAllFavouriteAgents: (state) => state.favouriteAgents,
    getAllFavouriteProperties: (state) => state.favouriteProperties,
    getAllFavouriteTrebProperties: (state) => state.favouriteTrebProperties,
    getAllFavourites: (state) => ({ local: state.favouriteProperties, treb: state.favouriteTrebProperties }),
    isLoading: (state) => (id) => state.loadingProperties.includes(id)
  },

  actions: {
    async initFavourites() {
      try {
        const authStore = useAuthStore();
        if (!authStore.isAuthenticated()) return;

        const response = await axiosInstance.get('/favorites', {
          headers: {
            'Authorization': `Bearer ${authStore.token}`,
          },
        });
        const { favorites } = response.data;
        this.favouriteTrebProperties = favorites
          .filter(f => f.property_type === 'treb')
          .map(f => ({
            ListingKey: f.property_id,
            ...f.details,
            propertyType: 'treb'
          }));
        this.favouriteProperties = favorites
          .filter(f => f.property_type === 'local')
          .map(f => ({
            id: f.property_id,
            ...f.details,
            propertyType: 'local'
          }));
        this.favouriteAgents = JSON.parse(localStorage.getItem('favourite-agents') || '[]');
      } catch (error) {
        console.error('Error loading favorites:', error);
        this.error = error.message || 'Failed to fetch favorites';
      }
    },

    toggleFavouriteAgent(agentId) {
      const index = this.favouriteAgents.indexOf(agentId);
      if (index > -1) this.favouriteAgents.splice(index, 1);
      else this.favouriteAgents.push(agentId);
      localStorage.setItem('favourite-agents', JSON.stringify(this.favouriteAgents));
    },

    async toggleFavouriteProperty(propertyData) {
      try {
        this.loadingProperties.push(propertyData.id);
        this.error = null;
        const authStore = useAuthStore();
        if (!authStore.isAuthenticated()) return;

        const response = await axiosInstance.post('/favorites', {
          property_id: propertyData.id,
          property_type: 'local',
          details: {
            ...propertyData,
            favoritedAt: new Date().toISOString(),
            propertyType: 'local'
          }
        }, {
          headers: {
            'Authorization': `Bearer ${authStore.token}`,
          },
        });
        if (response.status !== 200) throw new Error('Failed to toggle favorite');

        const index = this.favouriteProperties.findIndex(p => p.id === propertyData.id);
        if (index > -1) {
          this.favouriteProperties.splice(index, 1);
        } else {
          this.favouriteProperties.push({
            id: propertyData.id,
            ...propertyData,
            favoritedAt: new Date().toISOString(),
            propertyType: 'local'
          });
        }
      } catch (error) {
        this.error = error.message || 'Failed to toggle favorite';
        throw error;
      } finally {
        this.loadingProperties = this.loadingProperties.filter(id => id !== propertyData.id);
      }
    },

 async toggleFavouriteTrebProperty(property) {
  console.log('Toggle TREB property payload:', property);
  try {
    this.loadingProperties.push(property.ListingKey);
    this.error = null;
    const authStore = useAuthStore();
    if (!authStore.isAuthenticated()) return;

    const response = await axiosInstance.post('/favorites', {
      property_id: String(property.ListingKey), // Ensure string
      property_type: 'treb',
      details: {
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
        propertyType: 'treb'
      }
    }, {
      headers: {
        'Authorization': `Bearer ${authStore.token}`,
      },
    });
    if (response.status !== 200) throw new Error('Failed to toggle TREB favorite');

    const index = this.favouriteTrebProperties.findIndex(p => p.ListingKey === property.ListingKey);
    if (index > -1) {
      this.favouriteTrebProperties.splice(index, 1);
    } else {
      this.favouriteTrebProperties.push({
        ListingKey: property.ListingKey,
        ...property,
        favoritedAt: new Date().toISOString(),
        propertyType: 'treb'
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

    clearAllFavourites() {
      this.favouriteAgents = [];
      this.favouriteProperties = [];
      this.favouriteTrebProperties = [];
      localStorage.removeItem('favourite-agents');
    },

    getPropertyById(propertyId) {
      const localProperty = this.favouriteProperties.find(p => p.id === propertyId);
      if (localProperty) return localProperty;
      const trebProperty = this.favouriteTrebProperties.find(p => p.ListingKey === propertyId);
      return trebProperty || null;
    }
  }
});