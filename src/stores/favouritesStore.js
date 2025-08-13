import { defineStore } from 'pinia';
// import { useAuthStore } from './authStore';
import { useAuthStore } from './authStore';

export const useFavouritesStore = defineStore('favourites', {
  state: () => ({
    favouriteAgents: [],
    favouriteProperties: [],
    favouriteTrebProperties: [],
    loading: false,
    error: null
  }),

  getters: {
    isAgentFavourite: (state) => (agentId) => state.favouriteAgents.includes(agentId),
    isPropertyFavourite: (state) => (propertyId) => state.favouriteProperties.some(p => p.id === propertyId),
    isTrebPropertyFavourite: (state) => (listingKey) => state.favouriteTrebProperties.some(p => p.ListingKey === listingKey),
    getAllFavouriteAgents: (state) => state.favouriteAgents,
    getAllFavouriteProperties: (state) => state.favouriteProperties,
    getAllFavouriteTrebProperties: (state) => state.favouriteTrebProperties,
    getAllFavourites: (state) => ({ local: state.favouriteProperties, treb: state.favouriteTrebProperties })
  },

  actions: {
    initFavourites() {
      try {
        const storedAgents = localStorage.getItem('favourite-agents');
        const storedProperties = localStorage.getItem('favourite-properties');
        const storedTrebProperties = localStorage.getItem('favourite-treb-properties');
        if (storedAgents) this.favouriteAgents = JSON.parse(storedAgents);
        if (storedProperties) this.favouriteProperties = JSON.parse(storedProperties);
        if (storedTrebProperties) this.favouriteTrebProperties = JSON.parse(storedTrebProperties);
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    },

    toggleFavouriteAgent(agentId) {
      const index = this.favouriteAgents.indexOf(agentId);
      if (index > -1) this.favouriteAgents.splice(index, 1);
      else this.favouriteAgents.push(agentId);
      this.saveFavouriteAgents();
    },

    toggleFavouriteProperty(propertyData) {
      try {
        this.loading = true;
        this.error = null;
        const index = this.favouriteProperties.findIndex(p => p.id === propertyData.id);
        if (index > -1) {
          this.favouriteProperties.splice(index, 1);
        } else {
          this.favouriteProperties.push({
            ...propertyData,
            favoritedAt: new Date().toISOString(),
            propertyType: 'local'
          });
        }
        this.saveFavouriteProperties();
      } catch (error) {
        this.error = error.message || 'Failed to toggle favorite';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    toggleFavouriteTrebProperty(property) {
      try {
        this.loading = true;
        this.error = null;
        const index = this.favouriteTrebProperties.findIndex(p => p.ListingKey === property.ListingKey);
        if (index > -1) {
          this.favouriteTrebProperties.splice(index, 1);
        } else {
          this.favouriteTrebProperties.push({
            ListingKey: property.ListingKey,
            UnparsedAddress: property.UnparsedAddress,
            ListPrice: property.ListPrice,
            BedroomsTotal: property.BedroomsTotal,
            BathroomsFull: property.BathroomsFull,
            LivingArea: property.LivingArea,
            City: property.City,
            StateOrProvince: property.StateOrProvince,
            PropertyType: property.PropertyType || 'Residential',
            image: property.image,
            favoritedAt: new Date().toISOString(),
            propertyType: 'treb'
          });
        }
        this.saveFavouriteTrebProperties();
      } catch (error) {
        this.error = error.message || 'Failed to toggle TREB favorite';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    saveFavouriteAgents() {
      localStorage.setItem('favourite-agents', JSON.stringify(this.favouriteAgents));
    },

    saveFavouriteProperties() {
      localStorage.setItem('favourite-properties', JSON.stringify(this.favouriteProperties));
    },

    saveFavouriteTrebProperties() {
      localStorage.setItem('favourite-treb-properties', JSON.stringify(this.favouriteTrebProperties));
    },

    clearAllFavourites() {
      this.favouriteAgents = [];
      this.favouriteProperties = [];
      this.favouriteTrebProperties = [];
      localStorage.removeItem('favourite-agents');
      localStorage.removeItem('favourite-properties');
      localStorage.removeItem('favourite-treb-properties');
    },

    getPropertyById(propertyId) {
      const localProperty = this.favouriteProperties.find(p => p.id === propertyId);
      if (localProperty) return localProperty;
      const trebProperty = this.favouriteTrebProperties.find(p => p.ListingKey === propertyId);
      return trebProperty || null;
    }
  }
});
